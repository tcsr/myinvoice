import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const Loading = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f5f5f5', // Light background color
            }}
        >
            <CircularProgress
                size={60}
                thickness={4}
                sx={{
                    color: '#1E6091', // Primary color
                    mb: 2, // Margin bottom
                }}
            />
            <Typography
                variant="h6"
                component="div"
                sx={{
                    color: '#1E6091', // Primary color
                }}
            >
                Loading...
            </Typography>
        </Box>
    );
};

export default Loading;
