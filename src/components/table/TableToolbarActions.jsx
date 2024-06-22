import { Box, Typography, Button, Divider } from "@mui/material";
import close_icon from "../../assets/images/close.svg";
import MotionPlayIcon from "../../assets/images/motion-play-outline.svg";

const TableToolbarActions = ({
  table,
  heading,
  onGenerateInvoice,
  onDeleteInvoice,
  showGenerateDeleteButtons = false,
  showInvoiceMetrics = false,
}) => {
  const selectedRows = table
    .getSelectedRowModel()
    .flatRows.map((row) => row.original);

  return (
    <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
      {(!showGenerateDeleteButtons || selectedRows.length === 0) && (
        <Typography variant="h6" sx={{ mr: 2, fontWeight: "600" }}>
          {heading}
        </Typography>
      )}

      {showInvoiceMetrics && (
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "3px" }}>
          <Typography variant="body2" sx={{ mx: 2 }}>
            Success
            <Typography component="span" sx={{ fontWeight: "bold", pl: 1 }}>
              00
            </Typography>
          </Typography>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Typography variant="body2" sx={{ mx: 2 }}>
            Error
            <Typography component="span" sx={{ fontWeight: "bold", pl: 1 }}>
              00
            </Typography>
          </Typography>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Typography variant="body2" sx={{ mx: 2 }}>
            Rejected
            <Typography component="span" sx={{ fontWeight: "bold", pl: 1 }}>
              00
            </Typography>
          </Typography>
        </Box>
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
