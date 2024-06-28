import { useEffect, useContext, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  IconButton,
  Tooltip,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import { useForm, Controller } from "react-hook-form";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import VerifiedIcon from "@mui/icons-material/Verified";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import { UserDetailsContext } from "../context/UserDetailsContext";
import UserAvatar from "../components/user/UserAvatar";
import axios from "axios";

const ProfileCard = styled(Card)(({ theme }) => ({
  width: "80%",
  margin: "20px auto",
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down("sm")]: {
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
  [theme.breakpoints.down("sm")]: {
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
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const UploadButton = styled("input")({
  display: "none",
});

const AvatarContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
}));

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
  const [initialValues, setInitialValues] = useState({});

  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      companyName: "",
      position: "",
      department: "",
    },
  });

  // Mimic API call to fetch user details on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/getUserDetails?username=chandra');
        const userDetails = response.data;

        const finalUserDetails = {
          firstName: userDetails?.firstName || userProfile?.firstName || "",
          lastName: userDetails?.lastName || userProfile?.lastName || "",
          email: userDetails?.email || userProfile?.email || "",
          phoneNumber: userDetails?.phoneNumber || "",
          street: userDetails?.address?.street || "",
          city: userDetails?.address?.city || "",
          state: userDetails?.address?.state || "",
          postalCode: userDetails?.address?.postalCode || "",
          country: userDetails?.address?.country || "",
          companyName: userDetails?.company?.name || "",
          position: userDetails?.company?.position || "",
          department: userDetails?.company?.department || "",
        };

        setProfileImage(userDetails?.imageUrl || userProfile?.imageUrl);
        setInitialValues(finalUserDetails);

        reset(finalUserDetails);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    if (userProfile) {
      fetchUserDetails();
    }
  }, [reset, userProfile]);

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

  const onSubmit = async (data) => {
    try {
      const profileData = {
        ...data,
        profileImage: newProfileImage ? profileImage : userProfile.imageUrl
      };

      await axios.post("/api/user/saveUserDetails", profileData, {
        headers: { "Content-Type": "application/json" },
      });

      setEditMode(false);
      setSnackbar({
        open: true,
        message: "Profile updated successfully",
        severity: "success",
      });

      // Update initial values after successful save
      setInitialValues(data);
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
    // Reset to initial values
    reset(initialValues);
    setProfileImage(userProfile.imageUrl);
    setNewProfileImage(null);
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
    initialValues.firstName && initialValues.lastName
      ? `${initialValues.firstName} ${initialValues.lastName}`
      : initialValues.firstName || initialValues.lastName || username || "";

  return (
    <ProfileCard>
      <UserDetails>
        <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
          <AvatarContainer>
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
          </AvatarContainer>
          <UserInfo>
            <Typography variant="h5">{fullName}</Typography>
            <Box display="flex" alignItems="center">
              <MailOutlineIcon sx={{ marginRight: 1 }} />
              <Typography color="textSecondary">{initialValues.email}</Typography>
              {userProfile?.emailVerified && (
                <VerifiedIcon sx={{ marginLeft: 1, color: 'green' }} />
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
                size="large"
                startIcon={<ClearIcon />}
                sx={{ borderRadius: "2rem", marginRight: 1 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSubmit(onSubmit)}
                size="large"
                sx={{ borderRadius: "2rem" }}
              >
                Save
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<EditIcon />}
              onClick={handleEditProfile}
              sx={{ borderRadius: "2rem" }}
            >
              Edit Profile
            </Button>
          )}
        </Box>
      </UserDetails>
      {Object.keys(errors).length > 0 && (
        <Box sx={{ marginBottom: 2 }}>
          <Alert severity="error">
            Please correct the following errors:
            <ul>
              {Object.entries(errors).map(([field, error]) => (
                <li key={field}>{error.message}</li>
              ))}
            </ul>
          </Alert>
        </Box>
      )}
      <EditableFields>
        <Controller
          name="firstName"
          control={control}
          rules={{ required: "First name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="First Name"
              margin="dense"
              error={!!errors.firstName}
              helperText={errors.firstName ? errors.firstName.message : ""}
              disabled={!editMode}
              InputProps={{
                readOnly: !editMode,
                style: { color: "black" },
              }}
              onBlur={field.onBlur}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          rules={{ required: "Last name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Last Name"
              margin="dense"
              error={!!errors.lastName}
              helperText={errors.lastName ? errors.lastName.message : ""}
              disabled={!editMode}
              InputProps={{
                readOnly: !editMode,
                style: { color: "black" },
              }}
              onBlur={field.onBlur}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email address is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email Address"
              margin="dense"
              fullWidth
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
              disabled={!editMode}
              InputProps={{
                readOnly: !editMode,
                style: { color: "black" },
              }}
              onBlur={field.onBlur}
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          rules={{
            required: "Phone number is required",
            pattern: {
              value: /^\+?[1-9]\d{1,14}$/,
              message: "Invalid phone number",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone Number"
              margin="dense"
              fullWidth
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber ? errors.phoneNumber.message : ""}
              disabled={!editMode}
              InputProps={{
                readOnly: !editMode,
                style: { color: "black" },
              }}
              onBlur={field.onBlur}
            />
          )}
        />
        <Controller
          name="street"
          control={control}
          rules={{ required: "Street is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Street"
              margin="dense"
              fullWidth
              error={!!errors.street}
              helperText={errors.street ? errors.street.message : ""}
              disabled={!editMode}
              InputProps={{
                readOnly: !editMode,
                style: { color: "black" },
              }}
              onBlur={field.onBlur}
            />
          )}
        />
        <Controller
          name="city"
          control={control}
          rules={{ required: "City is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="City"
              margin="dense"
              fullWidth
              error={!!errors.city}
              helperText={errors.city ? errors.city.message : ""}
              disabled={!editMode}
              InputProps={{
                readOnly: !editMode,
                style: { color: "black" },
              }}
              onBlur={field.onBlur}
            />
          )}
        />
        <Controller
          name="state"
          control={control}
          rules={{ required: "State is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="State"
              margin="dense"
              fullWidth
              error={!!errors.state}
              helperText={errors.state ? errors.state.message : ""}
              disabled={!editMode}
              InputProps={{
                readOnly: !editMode,
                style: { color: "black" },
              }}
              onBlur={field.onBlur}
            />
          )}
        />
        <Controller
          name="postalCode"
          control={control}
          rules={{ required: "Postal code is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Postal Code"
              margin="dense"
              fullWidth
              error={!!errors.postalCode}
              helperText={errors.postalCode ? errors.postalCode.message : ""}
              disabled={!editMode}
              InputProps={{
                readOnly: !editMode,
                style: { color: "black" },
              }}
              onBlur={field.onBlur}
            />
          )}
        />
        <Controller
          name="country"
          control={control}
          rules={{ required: "Country is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Country"
              margin="dense"
              fullWidth
              error={!!errors.country}
              helperText={errors.country ? errors.country.message : ""}
              disabled={!editMode}
              InputProps={{
                readOnly: !editMode,
                style: { color: "black" },
              }}
              onBlur={field.onBlur}
            />
          )}
        />
        <Controller
          name="companyName"
          control={control}
          rules={{ required: "Company name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Company Name"
              margin="dense"
              fullWidth
              error={!!errors.companyName}
              helperText={errors.companyName ? errors.companyName.message : ""}
              disabled={!editMode}
              InputProps={{
                readOnly: !editMode,
                style: { color: "black" },
              }}
              onBlur={field.onBlur}
            />
          )}
        />
        <Controller
          name="position"
          control={control}
          rules={{ required: "Position is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Position"
              margin="dense"
              fullWidth
              error={!!errors.position}
              helperText={errors.position ? errors.position.message : ""}
              disabled={!editMode}
              InputProps={{
                readOnly: !editMode,
                style: { color: "black" },
              }}
              onBlur={field.onBlur}
            />
          )}
        />
        <Controller
          name="department"
          control={control}
          rules={{ required: "Department is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Department"
              margin="dense"
              fullWidth
              error={!!errors.department}
              helperText={errors.department ? errors.department.message : ""}
              disabled={!editMode}
              InputProps={{
                readOnly: !editMode,
                style: { color: "black" },
              }}
              onBlur={field.onBlur}
            />
          )}
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
