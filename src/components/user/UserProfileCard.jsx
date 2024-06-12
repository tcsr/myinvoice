import { Box, Typography } from '@mui/material';
import UserAvatar from './UserAvatar';

const UserProfileCard = ({ userName, userRole, userImage }) => {
    return (
        <Box
            sx={{
                padding: '20px',
                margin: '5px',
                marginTop: '1px',
                display: 'flex',
                borderRadius: '7px',
                alignItems: 'center',
                backgroundColor: '#1E6091',
                backgroundImage: 'linear-gradient(to right, #34A0A4 , #168AAD)',
            }}
        >
            <UserAvatar
                userName={userName}
                userImage={''}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        color: 'white',
                        fontWeight: 'bold',
                    }}
                >
                    {userName}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'white',
                        opacity: 0.8,
                    }}
                >
                    {userRole}
                </Typography>
            </Box>
        </Box>
    );
};

export default UserProfileCard;