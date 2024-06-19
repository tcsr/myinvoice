import { Button, Menu, MenuItem } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { KeyboardArrowDown as ArrowDownIcon } from "@mui/icons-material";

const NavMenu = ({
    menuState,
    handleMenuOpen,
    handleMenuClose
}) => {
    const location = useLocation();
    const activeStyle = {
        fontWeight: "bold",
        color: "#1E6091",
        borderBottom: "3px solid #1E6091",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    };
    const menuButtonStyle = {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    };

    return (
        <>
            <Button
                component={NavLink}
                to="/home"
                color="inherit"
                sx={{
                    ...menuButtonStyle,
                    ...(location.pathname === "/home" ? activeStyle : {}),
                    textTransform: "none",
                }}
                className="menu-button-style"
            >
                Home
            </Button>
            <Button
                component={NavLink}
                to="/generate"
                aria-controls="generate-menu"
                aria-haspopup="true"
                onClick={(event) => handleMenuOpen("generateMenuAnchorEl", event)}
                color="inherit"
                sx={{
                    ...menuButtonStyle,
                    ...(location.pathname === "/upload-invoice" ||
                        location.pathname === "/view-generate"
                        ? activeStyle
                        : {}),
                    textTransform: "none",
                }}
                className="menu-button-style"
            >
                Generate
                <ArrowDownIcon />
            </Button>
            <Menu
                id="generate-menu"
                anchorEl={menuState.generateMenuAnchorEl}
                open={Boolean(menuState.generateMenuAnchorEl)}
                onClose={() => handleMenuClose("generateMenuAnchorEl")}
            >
                <MenuItem
                    component={NavLink}
                    to="/upload-invoice"
                    onClick={() => handleMenuClose("generateMenuAnchorEl")}
                    sx={location.pathname === "/upload-invoice" ? activeStyle : {}}
                    className="menu-button-style"
                >
                    <AddIcon sx={{ marginRight: 1 }} />
                    Add New
                </MenuItem>
                <MenuItem
                    component={NavLink}
                    to="/generate"
                    onClick={() => handleMenuClose("generateMenuAnchorEl")}
                    sx={location.pathname === "/generate" ? activeStyle : {}}
                    className="menu-button-style"
                >
                    <TextSnippetOutlinedIcon sx={{ marginRight: 1 }} />
                    View
                </MenuItem>
            </Menu>
            <Button
                aria-controls="manage-menu"
                aria-haspopup="true"
                onClick={(event) => handleMenuOpen("manageMenuAnchorEl", event)}
                color="inherit"
                sx={{
                    ...menuButtonStyle,
                    ...(location.pathname === "/view-invoice" ||
                        location.pathname === "/search-invoice"
                        ? activeStyle
                        : {}),
                    textTransform: "none",
                }}
                className="menu-button-style"
            >
                Manage
                <ArrowDownIcon />
            </Button>
            <Menu
                id="manage-menu"
                anchorEl={menuState.manageMenuAnchorEl}
                open={Boolean(menuState.manageMenuAnchorEl)}
                onClose={() => handleMenuClose("manageMenuAnchorEl")}
            >
                <MenuItem
                    component={NavLink}
                    to="/view-invoice"
                    onClick={() => handleMenuClose("manageMenuAnchorEl")}
                    sx={location.pathname === "/view-invoice" ? activeStyle : {}}
                    className="menu-button-style"
                >
                    <TextSnippetOutlinedIcon sx={{ marginRight: 1 }} />
                    View Invoice
                </MenuItem>
                <MenuItem
                    component={NavLink}
                    to="/search-invoice"
                    onClick={() => handleMenuClose("manageMenuAnchorEl")}
                    sx={location.pathname === "/search-invoice" ? activeStyle : {}}
                    className="menu-button-style"
                >
                    <SearchIcon sx={{ marginRight: 1 }} />
                    Search Invoice
                </MenuItem>
            </Menu>
        </>
    );
};

export default NavMenu;
