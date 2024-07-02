# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


==============UserDetailsContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import useApi from '../hooks/useApi';

export const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {
    const { get, post } = useApi();
    const [userProfile, setUserProfile] = useState(null);
    const [userRole, setUserRole] = useState("");

    const updateUserProfile = (profile) => {
        setUserProfile(profile);
        setUserRole(profile.userRole || 'Invoice Admin');
    };

    const loadUserProfile = async (username) => {
        try {
            const profileData = await get(`/api/user/getUserDetails?username=${username}`);
            const imageResponse = await get(`/api/user/getProfileImage?userName=${username}`);
            const base64Image = imageResponse.imageBase64;
            const imageName = imageResponse.imageName;
            const imageUrl = base64ToDataUrl(base64Image, imageName);

            updateUserProfile({
                ...profileData,
                imageUrl: imageUrl,
            });
        } catch (error) {
            console.error("Failed to fetch user profile", error);
        }
    };

    const handleProfileImageUpload = async (username, file) => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('file', file);

        try {
            const response = await post('/api/user/uploadProfileImage', formData);
            const imageUrl = response.imageUrl;

            updateUserProfile({
                ...userProfile,
                imageUrl: imageUrl,
            });

            return imageUrl;
        } catch (error) {
            console.error('Failed to upload profile image', error);
            throw error;
        }
    };

    useEffect(() => {
        const username = "chandra"; // Replace with actual username logic
        loadUserProfile(username);
    }, []);

    return (
        <UserDetailsContext.Provider value={{ userProfile, userRole, updateUserProfile, loadUserProfile, handleProfileImageUpload }}>
            {children}
        </UserDetailsContext.Provider>
    );
};

// Utility function to convert base64 string to Data URL
const base64ToDataUrl = (base64, fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    const mimeType = extension === 'jpg' || extension === 'jpeg' ? 'image/jpeg' : 
                      extension === 'png' ? 'image/png' : 
                      extension === 'gif' ? 'image/gif' : 
                      extension === 'bmp' ? 'image/bmp' : 
                      'application/octet-stream';
    return `data:${mimeType};base64,${base64}`;
};

// Hook to use the user details context
export const useUserDetails = () => useContext(UserDetailsContext);

export default UserDetailsProvider;


=====================App.jsx

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './AppRoutes';
import KeycloakProvider from './context/KeycloakProvider';
import UserDetailsProvider from './context/UserDetailsContext';

const App = () => {
  return (
    <>
      <KeycloakProvider>
        <UserDetailsProvider>
          <Router>
            <CssBaseline />
            <Header />
            <div className="border-none layout-main-container">
              <AppRoutes />
            </div>
          </Router>
          <Footer />
        </UserDetailsProvider>
      </KeycloakProvider>
    </>
  );
};

export default App;


========================MyProfile.jsx

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
  const { userProfile, userRole, updateUserProfile, handleProfileImageUpload } = useContext(UserDetailsContext);
  const [profileImage, setProfileImage] = useState(null);
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

  useEffect(() => {
    if (userProfile) {
      const finalUserDetails = {
        firstName: userProfile.firstName || "",
        lastName: userProfile.lastName || "",
        email: userProfile.email || "",
        phoneNumber: userProfile.phoneNumber || "",
        street: userProfile.address?.street || "",
        city: userProfile.address?.city || "",
        state: userProfile.address?.state || "",
        postalCode: userProfile.address?.postalCode || "",
        country: userProfile.address?.country || "",
        companyName: userProfile.company?.name || "",
        position: userProfile.company?.position || "",
        department: userProfile.company?.department || "",
      };

      setInitialValues(finalUserDetails);
      reset(finalUserDetails);
      setProfileImage(userProfile.imageUrl);
    }
  }, [userProfile, reset]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const imageUrl = await handleProfileImageUpload('chandra', file); // Replace 'chandra' with the actual username if it's dynamic
        setProfileImage(imageUrl);
        setSnackbar({
          open: true,
          message: "Profile image updated successfully",
          severity: "success",
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to upload profile image",
          severity: "error",
        });
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      const profileData = {
        ...data,
        imageUrl: profileImage,
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

      updateUserProfile(profileData);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to update profile",
        severity: "error",
      });
    }
  };

  const handleCancelEdit = () => {
    reset(initialValues);
    setProfileImage(userProfile.imageUrl);
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


============= MainTableComponent

import React, { useState, useMemo } from "react";
import { Box } from "@mui/material";
import MaterialReactTable from "material-react-table";
import TableConfigRowActions from "./TableConfigRowActions";
import InvoiceLogModal from "./InvoiceLogModal";

const MainTableComponent = ({
  columns,
  data,
  rowCount,
  heading,
  handleRowClick,
  isLoading,
  isRefetching,
  pagination,
  columnFilters,
  globalFilter,
  sorting,
  columnVisibility,
  setColumnFilters,
  setPagination,
  setSorting,
  setColumnVisibility,
  requiredColumns,
  setGlobalFilter,
  showGenerateDeleteButtons,
  showInvoiceMetrics,
  showActionButtons,
  showViewMoreButton,
  showSubmitAction,
  showDetailsPanel,
  fetchData,
}) => {
  const [openLogModal, setOpenLogModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleViewLogs = (row) => {
    setSelectedRowData(row);
    setOpenLogModal(true);
  };

  const table = useMemo(
    () => ({
      columns,
      data,
      rowCount,
      pagination,
      columnFilters,
      globalFilter,
      sorting,
      columnVisibility,
      isLoading,
      isRefetching,
      setColumnFilters,
      setGlobalFilter,
      setPagination,
      setSorting,
      setColumnVisibility,
    }),
    [
      columns,
      data,
      rowCount,
      pagination,
      columnFilters,
      globalFilter,
      sorting,
      columnVisibility,
      isLoading,
      isRefetching,
      setColumnFilters,
      setGlobalFilter,
      setPagination,
      setSorting,
      setColumnVisibility,
    ]
  );

  return (
    <div>
      <MaterialReactTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        enableRowActions
        renderRowActions={({ row }) => (
          <TableConfigRowActions
            row={row.original}
            showActionButtons={true}
            showSubmitAction={showSubmitAction}
            showViewMoreButton={showViewMoreButton}
            handleViewDetails={() => handleRowClick(row.original.id)}
            handleViewLogs={() => handleViewLogs(row.original)}
            setSnackbar={setSnackbar}
            fetchData={fetchData}
            resetTableState={resetTableState}
            table={table}
          />
        )}
      />
      {selectedRowData && (
        <InvoiceLogModal
          open={openLogModal}
          onClose={() => setOpenLogModal(false)}
          invoiceDetails={selectedRowData}
        />
      )}
    </div>
  );
};

export default MainTableComponent;

======================TableConfigRowActions


import { useState, memo } from "react";
import { IconButton, Tooltip, Menu, MenuItem, Fade } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MotionPlayIcon from "../../assets/images/motion-play-outline.svg";
import InvoiceSubmissionHandler from "./InvoiceSubmissionHandler";
import LoaderContent from "./LoaderContent";

const TableConfigRowActions = memo((
    {
        row,
        showActionButtons,
        showSubmitAction,
        showViewMoreButton,
        handleViewDetails,
        handleViewLogs,
        setSnackbar,
        fetchData,
        resetTableState,
        table,
    }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentRow, setCurrentRow] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [documentToSubmit, setDocumentToSubmit] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setCurrentRow(row);
    };

    const handleSubmitInvoice = (document) => {
        setIsSubmitting(true);
        setDocumentToSubmit(document);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setCurrentRow(null);
    };

    return (
        <div>
            {isSubmitting && <LoaderContent />}
            {documentToSubmit && (
                <InvoiceSubmissionHandler
                    document={documentToSubmit}
                    setSnackbar={setSnackbar}
                    fetchData={fetchData}
                    setIsSubmitting={setIsSubmitting}
                    resetTableState={resetTableState}
                    table={table}
                />
            )}
            {showActionButtons ? (
                <div style={{ display: "flex", flexWrap: "nowrap", gap: "0.35rem" }}>
                    {showSubmitAction && (
                        <Tooltip title={"Submit"}>
                            <IconButton onClick={() => handleSubmitInvoice(row.original)}>
                                <img src={MotionPlayIcon} />
                            </IconButton>
                        </Tooltip>
                    )}
                    {showViewMoreButton && (
                        <IconButton
                            aria-controls={open ? "action-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={(event) => handleClick(event, row.original)}
                            id="action-button"
                        >
                            <MoreHorizIcon />
                        </IconButton>
                    )}
                    <Menu
                        id="action-menu"
                        MenuListProps={{ "aria-labelledby": "action-button" }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                        PaperProps={{
                            elevation: 1,
                            sx: {
                                backgroundColor: "background.paper",
                                mt: 1.5,
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                width: "200px",
                                maxHeight: "110px",
                                "& .MuiAvatar-root": { width: 32, height: 32, ml: -0.5, mr: 1 },
                                "&:before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0,
                                },
                            },
                        }}
                    >
                        <MenuItem sx={{ height: "30px" }} onClick={handleViewDetails}>
                            View Details
                        </MenuItem>
                        <MenuItem sx={{ height: "30px" }} onClick={() => handleViewLogs(row)}>
                            View Logs
                        </MenuItem>
                    </Menu>
                </div>
            ) : null}
        </div>
    );
}
);

TableConfigRowActions.displayName = "TableConfigRowActions";

export default TableConfigRowActions;

      
