import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Modal,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ColumnChooser = ({ table, isOpen, onClose, handleSave, showSelectDeselectAll = false }) => {
    const [columnsState, setColumnsState] = useState([]);
    const [originalColumnsState, setOriginalColumnsState] = useState([]);

    useEffect(() => {
        const columns = table.getAllColumns().map(column => ({
            id: column.id,
            header: column.columnDef.header,
            enableHiding: column.getIsVisible(),
        }));
        setColumnsState(columns);
        setOriginalColumnsState(columns);
    }, [table]);

    const handleChange = (columnId) => {
        setColumnsState(columnsState.map(column =>
            column.id === columnId ? { ...column, enableHiding: !column.enableHiding } : column
        ));
    };

    const handleSaveClick = () => {
        handleSave(columnsState);
        setOriginalColumnsState(columnsState); // Update the original state on save
        onClose();
    };

    const handleClose = () => {
        setColumnsState(originalColumnsState); // Revert to the original state on close or cancel
        onClose();
    };

    const handleSelectAll = () => {
        setColumnsState(columnsState.map(column => ({ ...column, enableHiding: true })));
    };

    const handleDeselectAll = () => {
        setColumnsState(columnsState.map(column => ({ ...column, enableHiding: false })));
    };

    const handleModalClick = (event) => {
        event.stopPropagation();
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
            BackdropProps={{
                onClick: handleModalClick,
            }}
        >
            <Box onClick={handleModalClick}
                sx={{
                    width: 320,
                    height: '100vh',
                    bgcolor: 'background.paper',
                    p: 2,
                    boxShadow: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: 0,
                }}
            >
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6">Column Chooser</Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Selected columns will be visible on the grid.
                    </Typography>
                    <Divider />
                    {showSelectDeselectAll &&
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                            <Button onClick={handleSelectAll} color="primary">
                                Select All
                            </Button>
                            <Button onClick={handleDeselectAll} color="primary">
                                Deselect All
                            </Button>
                        </Box>
                    }
                    <Divider />
                    <List sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
                        {columnsState.map((column) => (
                            <ListItem key={column.id} button onClick={() => handleChange(column.id)} sx={{ padding: '3px !important' }}>
                                <ListItemIcon sx={{ minWidth: '30px' }}>
                                    <Checkbox
                                        edge="start"
                                        checked={column.enableHiding}
                                        onChange={() => handleChange(column.id)}
                                        color="primary"
                                    />
                                </ListItemIcon>
                                <ListItemText primary={column.header} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, borderRadius: '2rem', height: '40px' }}>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleSaveClick} variant="contained" color="primary" sx={{ ml: 2, borderRadius: '2rem', height: '40px' }}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default ColumnChooser;
