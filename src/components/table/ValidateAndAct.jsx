import React, { useState } from 'react';
import { IconButton, Snackbar, Tooltip } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const ValidateAndAct = ({ table, action, children, message }) => {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const handleAction = () => {
        if (table.getSelectedRowModel().flatRows.length === 0) {
            showSnackbar(message, 'warning');
            return;
        }
        action();
    };

    return (
        <>
            <IconButton onClick={handleAction}>
                {children}
            </IconButton>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MuiAlert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </MuiAlert>
            </Snackbar>
        </>
    );
};

export default ValidateAndAct;
