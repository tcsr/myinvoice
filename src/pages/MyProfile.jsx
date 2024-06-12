import { useState, useEffect, useContext } from "react";
import {
  Box,
  Card,
  Divider,
  Typography,
  Button,
  IconButton,
  Tooltip,
  TextField,
  Snackbar,
} from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import VerifiedIcon from "@mui/icons-material/Verified";
import EmailIcon from "@mui/icons-material/Email";
import { UserDetailsContext } from "../context/UserDetailsContext";
import UserAvatar from "../components/user/UserAvatar";
import axios from "axios";

const ProfileCard = styled(Card)(({ theme }) => ({
  maxWidth: "50%",
  marginTop: "10px",
  margin: "auto",
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

const UserDetails = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(3),
  position: "relative",
}));

const UserInfo = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const UserDetailsSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const UploadButton = styled("input")({
  display: "none",
});

const HoverIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  right: 0,
  backgroundColor: "white",
  borderRadius: "50%",
  padding: "4px",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
}));

const MyProfile = () => {
  const { userProfile, userRole, updateUserProfile } =
    useContext(UserDetailsContext);

  const [profileImage, setProfileImage] = useState(null);
  const [newProfileImage, setNewProfileImage] = useState(null); // New profile image in memory
  const [editMode, setEditMode] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [newFirstName, setNewFirstName] = useState(
    userProfile?.firstName || ""
  );
  const [newLastName, setNewLastName] = useState(userProfile?.lastName || "");

  // Store initial values to reset on cancel
  const initialProfileImage = userProfile?.imageUrl;
  const initialFirstName = userProfile?.firstName;
  const initialLastName = userProfile?.lastName;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/api/user/profile");
        updateUserProfile(response.data);
        setProfileImage(response.data.imageUrl);
        setNewFirstName(response.data.firstName);
        setNewLastName(response.data.lastName);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };

    if (!userProfile) {
      fetchUserProfile();
    }
  }, [updateUserProfile, userProfile]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
        setNewProfileImage(file); // Store the new image file in memory
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("firstName", newFirstName);
      formData.append("lastName", newLastName);
      if (newProfileImage) {
        formData.append("profileImage", newProfileImage); // Include the profile image in the request
      }

      const response = await axios.put("/api/user/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      updateUserProfile(response.data);
      setEditMode(false);
      setSnackbar({
        open: true,
        message: "Profile updated successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Failed to update profile", error);
      setSnackbar({
        open: true,
        message: "Failed to update profile",
        severity: "error",
      });
    }
  };

  const handleCancelEdit = () => {
    setNewFirstName(initialFirstName);
    setNewLastName(initialLastName);
    setProfileImage(initialProfileImage);
    setNewProfileImage(null);
    setEditMode(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  const handleEditProfile = () => {
    setNewFirstName(userProfile.firstName);
    setNewLastName(userProfile.lastName);
    setProfileImage(userProfile.imageUrl);
    setEditMode(true);
  };

  if (!userProfile) {
    return <Typography>Loading...</Typography>;
  }

  const { username } = userProfile;
  const fullName =
    newFirstName && newLastName
      ? `${newFirstName} ${newLastName}`
      : newFirstName || newLastName || username || "";

  return (
    <ProfileCard>
      <UserDetails>
        <Box
          sx={{ position: "relative", display: "flex", alignItems: "center" }}
        >
          <UserAvatar
            userName={fullName}
            userImage={profileImage || userProfile?.imageUrl}
            avatarSize={100}
          />
          {editMode && (
            <label htmlFor="upload-profile-image">
              <UploadButton
                accept="image/*"
                id="upload-profile-image"
                type="file"
                onChange={handleImageChange}
              />
              <Tooltip title="Upload Profile Picture">
                <HoverIconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <CameraAltIcon />
                </HoverIconButton>
              </Tooltip>
            </label>
          )}
        </Box>
        <UserInfo>
          {editMode ? (
            <>
              <TextField
                label="First Name"
                value={newFirstName}
                onChange={(e) => setNewFirstName(e.target.value)}
                margin="dense"
              />
              <TextField
                label="Last Name"
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
                margin="dense"
              />
            </>
          ) : (
            <Typography variant="h5">{fullName}</Typography>
          )}
          <Box display="flex" alignItems="center">
            <EmailIcon sx={{ marginRight: 1 }} />
            <Typography color="textSecondary">{userProfile?.email}</Typography>
            {userProfile?.emailVerified && (
              <VerifiedIcon color="primary" sx={{ marginLeft: 1 }} />
            )}
          </Box>
          <Typography color="textSecondary">Role: {userRole}</Typography>
        </UserInfo>
      </UserDetails>
      <Divider />
      <Box mt={3} display="flex" justifyContent="flex-end">
        {editMode ? (
          <>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancelEdit}
              sx={{ borderRadius: "2rem" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveProfile}
              sx={{ borderRadius: "2rem", marginLeft: "1rem" }}
            >
              Save
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={handleEditProfile}
            sx={{ borderRadius: "2rem" }}
          >
            Edit Profile
          </Button>
        )}
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </ProfileCard>
  );
};

export default MyProfile;
