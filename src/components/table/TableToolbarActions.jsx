import { Box, Typography, Button } from "@mui/material";
import close_icon from "../../assets/close.svg";
import MotionPlayIcon from "../../assets/motion-play-outline.svg";

const TableToolbarActions = ({ table, heading, onGenerateInvoice, onDeleteInvoice, showGenerateDeleteButtons = false}) => {
    const selectedRows = table.getSelectedRowModel().flatRows.map(row => row.original);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
            {(!showGenerateDeleteButtons || selectedRows.length === 0) && (
                <Typography variant="h6" sx={{ mr: 2, fontWeight: '600' }}>
                    {heading}
                </Typography>
            )}

            {showGenerateDeleteButtons && selectedRows.length > 0 && (
                <>
                    <Button
                        startIcon={<img src={MotionPlayIcon} />}
                        onClick={() => onGenerateInvoice(selectedRows)}
                    >
                        Generate Invoice
                    </Button>
                    <Button
                        onClick={() => onDeleteInvoice(selectedRows)}
                        className="ml-3"
                        color="error"
                        startIcon={<img src={close_icon} />}
                    >
                        Delete Invoice
                    </Button>
                </>
            )}
        </Box>
    );
};

export default TableToolbarActions;
