import { Box, Tooltip, IconButton } from "@mui/material";
import UserAvatar from "./UserAvatar";

const AccountSettings = ({ userName, handleClick, open }) => {
    return (
        <Box>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    <UserAvatar userName={userName} userImage={null} avatarSize={35}
                        x
                    />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default AccountSettings;
