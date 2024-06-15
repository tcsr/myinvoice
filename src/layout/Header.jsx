/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Badge from "@mui/material/Badge";
import keycloak from "../config/keycloak";
import NotificationPopover from "../components/user/NotificationPopover";
import AccountMenu from "../components/user/AccountMenu";
import NavMenu from "../components/navbar/NavMenu";
import AccountSettings from "../components/user/AccountSettings";
import { UserDetailsContext } from "../context/UserDetailsContext";
import Logo from "../assets/images/einvoice_logo.svg";

const Header = () => {
  const navigate = useNavigate();
  const notifications = [];
  const { userProfile, userRole } = useContext(UserDetailsContext);

  const [formattedUserName, setFormattedUserName] = useState("");
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [menuAnchors, setMenuAnchors] = useState({
    manageMenuAnchorEl: null,
    generateMenuAnchorEl: null,
    userMenuAnchorEl: null,
  });

  useEffect(() => {
    if (userProfile) {
      const { firstName, lastName, username } = userProfile;
      setFormattedUserName(firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || username || "");
    }
  }, [userProfile]);

  const handleNotificationsClick = (event) => setNotificationsAnchorEl(event.currentTarget);
  const handleCloseNotifications = () => setNotificationsAnchorEl(null);
  const handleAccountMenuClick = (event) => setAccountMenuAnchorEl(event.currentTarget);
  const handleCloseAccountMenu = () => setAccountMenuAnchorEl(null);

  const handleMenuOpen = (menuName, event) => {
    setMenuAnchors((prevState) => ({ ...prevState, [menuName]: event.currentTarget }));
  };

  const handleMenuClose = (menuName) => {
    setMenuAnchors((prevState) => ({ ...prevState, [menuName]: null }));
  };

  const handleMyProfile = () => {
    handleCloseAccountMenu();
    navigate("/my-profile");
  };

  const handleChangePassword = () => {
    handleCloseAccountMenu();
    navigate("/change-password");
  };

  const handleLogout = () => {
    handleCloseAccountMenu();
    keycloak.logout();
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: "white", color: "black" }} className="top-nav-bar">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ textDecoration: "none", color: "inherit" }}>
          <img src={Logo} alt="logo" width="120px" />
        </Typography>
        <Box sx={{ display: "flex", flexGrow: 1, marginLeft: 2 }}>
          <NavMenu menuState={menuAnchors} handleMenuOpen={handleMenuOpen} handleMenuClose={handleMenuClose} />
        </Box>
        <IconButton
          edge="end"
          aria-controls={notificationsAnchorEl ? "notifications-menu" : undefined}
          aria-haspopup="true"
          color="inherit"
          onClick={handleNotificationsClick}
        >
          <Badge badgeContent={notifications.length} color="primary">
            <NotificationsNoneOutlinedIcon />
          </Badge>
        </IconButton>
        <NotificationPopover
          notifications={notifications}
          open={Boolean(notificationsAnchorEl)}
          anchorEl={notificationsAnchorEl}
          handleClose={handleCloseNotifications}
        />
        <AccountSettings userName={formattedUserName} handleClick={handleAccountMenuClick} open={Boolean(accountMenuAnchorEl)} />
        <AccountMenu
          anchorEl={accountMenuAnchorEl}
          open={Boolean(accountMenuAnchorEl)}
          handleClose={handleCloseAccountMenu}
          userName={formattedUserName}
          userImage={null}
          userRole={userRole}
          handleMyProfile={handleMyProfile}
          handleChangePassword={handleChangePassword}
          handleLogout={handleLogout}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
