import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Table, TableBody, TableCell, TableRow, TableContainer, Paper } from '@mui/material';

const DetailsDialog = ({ open, onClose, rowData }) => {

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            onClose();
        }
    };
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>IRBM Response Details</DialogTitle>
            <DialogContent dividers>
                {rowData && (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="subtitle2">Counter Party</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">{rowData.counterParty}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="subtitle2">Doc Type</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">{rowData.docType}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="subtitle2">Doc Number</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">{rowData.docNumber}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="subtitle2">Doc Date</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">{rowData.docDate}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="subtitle2">Generated Number</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">{rowData.generatedNumber}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="subtitle2">Invoice Type</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">{rowData.invoiceType}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="subtitle2">Invoice Value</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">{rowData.invoiceValue}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="subtitle2">IRBM Response</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">{rowData.irbmResponse}</Typography>
                                    </TableCell>
                                </TableRow>
                                {(rowData.irbmResponse === 'Error' || rowData.irbmResponse === 'Rejected') && (
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="subtitle2" color="error">Reason</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" color="error">{rowData.reason}</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DetailsDialog;
