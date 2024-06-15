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
  width: "80%",
  margin: "20px auto",
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#f9f9f9",
  [theme.breakpoints.down('sm')]: {
    width: "95%",
    padding: theme.spacing(2),
  },
}));

const UserDetails = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  marginBottom: theme.spacing(3),
  position: "relative",
}));

const UserInfo = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    alignItems: "center",
    textAlign: "center",
  },
}));

const EditableFields = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: "1fr",
  },
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
  const { userProfile, userRole } = useContext(UserDetailsContext);

  const [profileImage, setProfileImage] = useState(null);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    if (userProfile) {
      setProfileImage(userProfile.imageUrl);
      setNewFirstName(userProfile.firstName);
      setNewLastName(userProfile.lastName);
      setEmail(userProfile.email);
      setPhoneNumber(userProfile.phoneNumber || "");
      setStreet(userProfile.address?.street || "");
      setCity(userProfile.address?.city || "");
      setState(userProfile.address?.state || "");
      setPostalCode(userProfile.address?.postalCode || "");
      setCountry(userProfile.address?.country || "");
      setCompanyName(userProfile.company?.name || "");
      setPosition(userProfile.company?.position || "");
      setDepartment(userProfile.company?.department || "");
    }
  }, [userProfile]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
        setNewProfileImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    if (
      !newFirstName ||
      !newLastName ||
      !email ||
      !phoneNumber ||
      !street ||
      !city ||
      !state ||
      !postalCode ||
      !country ||
      !companyName ||
      !position ||
      !department
    ) {
      setSnackbar({
        open: true,
        message: "All fields are required",
        severity: "error",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("firstName", newFirstName);
      formData.append("lastName", newLastName);
      formData.append("email", email);
      formData.append("phoneNumber", phoneNumber);
      formData.append("street", street);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("postalCode", postalCode);
      formData.append("country", country);
      formData.append("companyName", companyName);
      formData.append("position", position);
      formData.append("department", department);

      if (newProfileImage) {
        formData.append("profileImage", newProfileImage);
      }

      await axios.put("/api/user/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

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
    if (userProfile) {
      setNewFirstName(userProfile.firstName);
      setNewLastName(userProfile.lastName);
      setEmail(userProfile.email);
      setPhoneNumber(userProfile.phoneNumber || "");
      setStreet(userProfile.address?.street || "");
      setCity(userProfile.address?.city || "");
      setState(userProfile.address?.state || "");
      setPostalCode(userProfile.address?.postalCode || "");
      setCountry(userProfile.address?.country || "");
      setCompanyName(userProfile.company?.name || "");
      setPosition(userProfile.company?.position || "");
      setDepartment(userProfile.company?.department || "");
      setProfileImage(userProfile.imageUrl);
      setNewProfileImage(null);
    }
    setEditMode(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  const handleEditProfile = () => {
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <UserAvatar
            userName={fullName}
            userImage={profileImage || userProfile?.imageUrl}
            avatarSize={100}
          />
          <UserInfo>
            <Typography variant="h5">{fullName}</Typography>
            <Box display="flex" alignItems="center">
              <EmailIcon sx={{ marginRight: 1 }} />
              <Typography color="textSecondary">{userProfile?.email}</Typography>
              {userProfile?.emailVerified && (
                <VerifiedIcon color="primary" sx={{ marginLeft: 1 }} />
              )}
            </Box>
            <Typography color="textSecondary">Role: {userRole}</Typography>
          </UserInfo>
        </Box>
        <Box>
          {editMode ? (
            <>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancelEdit}
                sx={{ borderRadius: "2rem", marginRight: 1 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveProfile}
                sx={{ borderRadius: "2rem" }}
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
      </UserDetails>
      <EditableFields>
        <TextField
          label="First Name"
          value={newFirstName}
          onChange={(e) => setNewFirstName(e.target.value)}
          margin="dense"
          disabled={!editMode}
          InputProps={{
            readOnly: !editMode,
            style: !editMode ? { color: 'rgba(0, 0, 0, 0.6)' } : {},
          }}
        />
        <TextField
          label="Last Name"
          value={newLastName}
          onChange={(e) => setNewLastName(e.target.value)}
          margin="dense"
          disabled={!editMode}
          InputProps={{
            readOnly: !editMode,
            style: !editMode ? { color: 'rgba(0, 0, 0, 0.6)' } : {},
          }}
        />
        <TextField
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="dense"
          fullWidth
          disabled={!editMode}
          InputProps={{
            readOnly: !editMode,
            style: !editMode ? { color: 'rgba(0, 0, 0, 0.6)' } : {},
          }}
        />
        <TextField
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          margin="dense"
          fullWidth
          disabled={!editMode}
          InputProps={{
            readOnly: !editMode,
            style: !editMode ? { color: 'rgba(0, 0, 0, 0.6)' } : {},
          }}
        />
        <TextField
          label="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          margin="dense"
          fullWidth
          disabled={!editMode}
          InputProps={{
            readOnly: !editMode,
            style: !editMode ? { color: 'rgba(0, 0, 0, 0.6)' } : {},
          }}
        />
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          margin="dense"
          fullWidth
          disabled={!editMode}
          InputProps={{
            readOnly: !editMode,
            style: !editMode ? { color: 'rgba(0, 0, 0, 0.6)' } : {},
          }}
        />
        <TextField
          label="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          margin="dense"
          fullWidth
          disabled={!editMode}
          InputProps={{
            readOnly: !editMode,
            style: !editMode ? { color: 'rgba(0, 0, 0, 0.6)' } : {},
          }}
        />
        <TextField
          label="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          margin="dense"
          fullWidth
          disabled={!editMode}
          InputProps={{
            readOnly: !editMode,
            style: !editMode ? { color: 'rgba(0, 0, 0, 0.6)' } : {},
          }}
        />
        <TextField
          label="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          margin="dense"
          fullWidth
          disabled={!editMode}
          InputProps={{
            readOnly: !editMode,
            style: !editMode ? { color: 'rgba(0, 0, 0, 0.6)' } : {},
          }}
        />
        <TextField
          label="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          margin="dense"
          fullWidth
          disabled={!editMode}
          InputProps={{
            readOnly: !editMode,
            style: !editMode ? { color: 'rgba(0, 0, 0, 0.6)' } : {},
          }}
        />
        <TextField
          label="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          margin="dense"
          fullWidth
          disabled={!editMode}
          InputProps={{
            readOnly: !editMode,
            style: !editMode ? { color: 'rgba(0, 0, 0, 0.6)' } : {},
          }}
        />
        <TextField
          label="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          margin="dense"
          fullWidth
          disabled={!editMode}
          InputProps={{
            readOnly: !editMode,
            style: !editMode ? { color: 'rgba(0, 0, 0, 0.6)' } : {},
          }}
        />
      </EditableFields>
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
