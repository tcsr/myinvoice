import React from 'react';
import { Popover, Typography, List, ListItem, ListItemText } from "@mui/material";
import { styled } from "@mui/system";

const StyledPopover = styled(Popover)(({ theme }) => ({
    "& .MuiPaper-root": {
        padding: theme.spacing(2),
        minWidth: '350px',
        maxWidth: '350px',
        overflow: "visible",
        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
        marginTop: theme.spacing(1.5),
        "&::before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            backgroundColor: theme.palette.background.paper,
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
        },
    },
}));

const NotificationPanel = ({ notifications }) => {
    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Notifications
            </Typography>
            {notifications.length > 0 ? (
                <List>
                    {notifications.map((notification) => (
                        <ListItem key={notification.id}>
                            <ListItemText primary={notification.message} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography
                    sx={{
                        color: 'gray',
                        textAlign: 'center',
                        padding: '16px',
                    }}
                >
                    No notifications available
                </Typography>
            )}
        </div>
    );
};

const NotificationPopover = ({ notifications, open, anchorEl, handleClose }) => {
    return (
        <StyledPopover
            id={open ? "notifications-menu" : undefined}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
        >
            <NotificationPanel notifications={notifications} />
        </StyledPopover>
    );
};

export default NotificationPopover;
