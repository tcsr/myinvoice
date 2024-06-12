import { Menu, MenuItem, ListItemIcon, Divider, Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import Logout from "@mui/icons-material/Logout";
import UserProfileCard from "./UserProfileCard";

const AccountMenu = ({
    anchorEl,
    open,
    handleClose,
    userName,
    userImage,
    userRole,
    handleMyProfile,
    handleChangePassword,
    handleLogout
}) => {
    return (
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    minWidth: '350px', // Set a minimum width
                    width: '350px', // Ensure the width is exactly 350px
                    wordBreak: 'break-word', // Ensure long words break correctly
                    overflowWrap: 'break-word', // Ensure text wraps correctly
                    "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    "&::before": {
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
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
            <UserProfileCard userName={userName} userRole={userRole} userImage={userImage} />
            <Divider />
            <MenuItem onClick={handleMyProfile}>
                <ListItemIcon>
                    <PersonOutlineOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit" noWrap>
                    My Profile
                </Typography>
            </MenuItem>
            <MenuItem onClick={handleChangePassword}>
                <ListItemIcon>
                    <TuneOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit" noWrap>
                    Change Password
                </Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit" noWrap>
                    Logout
                </Typography>
            </MenuItem>
        </Menu>
    );
};

export default AccountMenu;
