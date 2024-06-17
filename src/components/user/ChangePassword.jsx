import { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  LinearProgress,
  IconButton,
  InputAdornment,
  Tooltip,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../api/apiEndpoints";
import useApi from "../../hooks/useApi";
import { UserDetailsContext } from "../../context//UserDetailsContext";
import keycloak from "../../config/keycloak";

const ChangePasswordCard = styled(Card)(({ theme }) => ({
  maxWidth: 500,
  margin: "auto",
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
  },
}));

const passwordCriteria = {
  minLength: 8,
  maxLength: 16,
  uppercase: true,
  lowercase: true,
  digit: true,
  specialChar: true,
};

const validatePassword = (password, criteria) => {
  const { minLength, maxLength, uppercase, lowercase, digit, specialChar } =
    criteria;
  const regexParts = [
    `.{${minLength},${maxLength}}`,
    uppercase ? "(?=.*[A-Z])" : "",
    lowercase ? "(?=.*[a-z])" : "",
    digit ? "(?=.*\\d)" : "",
    specialChar ? "(?=.*[@$!%*?&])" : "",
  ];
  const passwordRegex = new RegExp(`^${regexParts.join("")}$`);
  return passwordRegex.test(password);
};

const getPasswordStrength = (password, criteria) => {
  let strength = 0;
  if (password.length >= criteria.minLength) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/\d/.test(password)) strength += 1;
  if (/[@$!%*?&]/.test(password)) strength += 1;
  return strength;
};

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    currentPassword: "",
    newPassword: [],
    confirmPassword: "",
    form: "",
  });
  const [success, setSuccess] = useState("");
  const [touched, setTouched] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const navigate = useNavigate();
  const { userProfile } = useContext(UserDetailsContext);
  const { post, del, loading } = useApi();

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const handlePasswordChange = (field, value) => {
    switch (field) {
      case "currentPassword":
        setCurrentPassword(value);
        break;
      case "newPassword":
        setNewPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
    validateField(field);
  };

  const validateField = (field) => {
    switch (field) {
      case "currentPassword":
        if (!currentPassword) {
          setError((prev) => ({
            ...prev,
            currentPassword: "Current password is required.",
          }));
        } else if (currentPassword.length < passwordCriteria.minLength) {
          setError((prev) => ({
            ...prev,
            currentPassword: `Current password must be at least ${passwordCriteria.minLength} characters long.`,
          }));
        } else {
          setError((prev) => ({ ...prev, currentPassword: "" }));
        }
        break;
      case "newPassword":
        if (!newPassword) {
          setError((prev) => ({
            ...prev,
            newPassword: ["New password is required."],
          }));
        } else {
          const newPasswordErrors = [];
          if (newPassword.length < passwordCriteria.minLength) {
            newPasswordErrors.push(
              `Must be at least ${passwordCriteria.minLength} characters long.`
            );
          }
          if (!/[A-Z]/.test(newPassword)) {
            newPasswordErrors.push(
              "Must contain at least one uppercase letter."
            );
          }
          if (!/[a-z]/.test(newPassword)) {
            newPasswordErrors.push(
              "Must contain at least one lowercase letter."
            );
          }
          if (!/\d/.test(newPassword)) {
            newPasswordErrors.push("Must contain at least one digit.");
          }
          if (!/[@$!%*?&]/.test(newPassword)) {
            newPasswordErrors.push(
              "Must contain at least one special character."
            );
          }
          setError((prev) => ({ ...prev, newPassword: newPasswordErrors }));
        }
        break;
      case "confirmPassword":
        if (!confirmPassword) {
          setError((prev) => ({
            ...prev,
            confirmPassword: "Confirm new password is required.",
          }));
        } else if (confirmPassword !== newPassword) {
          setError((prev) => ({
            ...prev,
            confirmPassword: "New password and confirm password do not match.",
          }));
        } else {
          setError((prev) => ({ ...prev, confirmPassword: "" }));
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before checking errors
    ["currentPassword", "newPassword", "confirmPassword"].forEach((field) => {
      validateField(field);
      setTouched((prev) => ({ ...prev, [field]: true }));
    });

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword ||
      error.currentPassword ||
      error.newPassword.length > 0 ||
      error.confirmPassword
    ) {
      setError((prev) => ({
        ...prev,
        form: "Please fix the errors before submitting.",
      }));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError((prev) => ({
        ...prev,
        form: "New password and confirm password do not match.",
      }));
      return;
    }

    const payload = {
      username: userProfile?.username,
      currentPassword: currentPassword,
      newPassword: newPassword,
    };

    try {
      const response = await post(API_ENDPOINTS.CHANGE_PASSWORD, payload);
      if (response.status === "Success") {
        setSnackbar({
          open: true,
          message:
            "Password changed succesfully. You will be redirected to login screen, please login with your new password",
          severity: "success",
        });
        setTimeout(() => {
          keycloak.logout();
        }, 2000);
      } else {
        throw new Error(
          response.message || "Error occured while changing the password"
        );
      }
    } catch (error) {
      setError(error.message || "Error occured while changing the password");
      setSnackbar({
        open: true,
        message: error.message || "Error occured while changing the password",
        severity: "error",
      });
    }
  };

  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError({
      currentPassword: "",
      newPassword: [],
      confirmPassword: "",
      form: "",
    });
    setSuccess("");
    setTouched({
      currentPassword: false,
      newPassword: false,
      confirmPassword: false,
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const passwordStrength = getPasswordStrength(newPassword, passwordCriteria);
  const passwordStrengthLabel = [
    "Very Weak",
    "Weak",
    "Moderate",
    "Strong",
    "Very Strong",
  ];
  const passwordStrengthColors = [
    "#ff1744",
    "#ff9100",
    "#29b6f6",
    "#4caf50",
    "#2e7d32",
  ];

  return (
    <ChangePasswordCard>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Change Password
        </Typography>
        {error.form && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.form}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <StyledTextField
            label="Current Password"
            type={showPasswords.currentPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={currentPassword}
            onChange={(e) =>
              handlePasswordChange("currentPassword", e.target.value)
            }
            onBlur={() => handleBlur("currentPassword")}
            onKeyUp={() => validateField("currentPassword")}
            onKeyDown={() => validateField("currentPassword")}
            error={!!error.currentPassword}
            helperText={touched.currentPassword && error.currentPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title={
                      showPasswords.currentPassword
                        ? "Hide Password"
                        : "Show Password"
                    }
                  >
                    <IconButton
                      onClick={() =>
                        togglePasswordVisibility("currentPassword")
                      }
                      edge="end"
                      tabIndex={-1}
                    >
                      {showPasswords.currentPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          <StyledTextField
            label="New Password"
            type={showPasswords.newPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) =>
              handlePasswordChange("newPassword", e.target.value)
            }
            onBlur={() => handleBlur("newPassword")}
            onKeyUp={() => validateField("newPassword")}
            onKeyDown={() => validateField("newPassword")}
            error={!!error.newPassword.length}
            helperText={
              touched.newPassword && error.newPassword.length ? (
                <>
                  {error.newPassword.includes("New password is required.") && (
                    <Typography>New password is required.</Typography>
                  )}
                  <ul style={{ margin: 0, padding: "0 0 0 20px" }}>
                    {error.newPassword
                      .filter((err) => err !== "New password is required.")
                      .map((err, index) => (
                        <li key={index}>{err}</li>
                      ))}
                  </ul>
                </>
              ) : null
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title={
                      showPasswords.newPassword
                        ? "Hide Password"
                        : "Show Password"
                    }
                  >
                    <IconButton
                      onClick={() => togglePasswordVisibility("newPassword")}
                      edge="end"
                      tabIndex={-1}
                    >
                      {showPasswords.newPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          {newPassword && (
            <>
              <LinearProgress
                variant="determinate"
                value={(passwordStrength / 5) * 100}
                sx={{
                  mt: 1,
                  mb: 1,
                  bgcolor: "#e0e0e0",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor:
                      passwordStrengthColors[passwordStrength - 1],
                  },
                  height: "10px",
                  borderRadius: "5px",
                }}
              />
              <Typography
                variant="body2"
                color={passwordStrengthColors[passwordStrength - 1]}
                sx={{ mb: 1 }}
              >
                {passwordStrengthLabel[passwordStrength - 1]}
              </Typography>
            </>
          )}
          <StyledTextField
            label="Confirm New Password"
            type={showPasswords.confirmPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) =>
              handlePasswordChange("confirmPassword", e.target.value)
            }
            onBlur={() => handleBlur("confirmPassword")}
            onKeyUp={() => validateField("confirmPassword")}
            onKeyDown={() => validateField("confirmPassword")}
            error={!!error.confirmPassword}
            helperText={touched.confirmPassword && error.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title={
                      showPasswords.confirmPassword
                        ? "Hide Password"
                        : "Show Password"
                    }
                  >
                    <IconButton
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                      edge="end"
                      tabIndex={-1}
                    >
                      {showPasswords.confirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          <Box mt={2} sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
              fullWidth
              sx={{ borderRadius: "2rem", height: "50px" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ borderRadius: "2rem", height: "50px" }}
            >
              Change Password
            </Button>
          </Box>
        </form>
      </CardContent>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={9000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ChangePasswordCard>
  );
};

export default ChangePassword;
