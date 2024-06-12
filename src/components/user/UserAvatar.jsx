import { Avatar } from '@mui/material';
import { stringAvatar } from '../../utils/index';

const UserAvatar = ({ userName, userImage, avatarSize = 80 }) => {
    const avatarSx = {
        width: `${avatarSize}px !important`,
        height: `${avatarSize}px !important`,
        fontSize: `${avatarSize / 2.5}px`,
    };

    const fullName = userName || '';

    return userImage ? (
        <Avatar alt={fullName} src={userImage} sx={avatarSx} />
    ) : (
        <Avatar
            {...stringAvatar(fullName)}
            sx={{
                ...stringAvatar(fullName).sx,
                ...avatarSx,
            }}
        />
    );
};

export default UserAvatar;
