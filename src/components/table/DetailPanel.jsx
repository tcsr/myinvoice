import { Box, Typography } from "@mui/material";
import getStatusChip from "../../utils/getStatusChip";
import QRCode from "react-qr-code";
import { formatDateIntoReadableFormat } from "../../utils/index";

const DetailPanel = ({ row }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 2, backgroundColor: '#f5f5f5' }}>
            <Box sx={{ marginRight: 4 }}>
                <div style={{ height: "130px", width: "130px" }}>
                    <QRCode
                        size={100}
                        style={{ height: "100%", width: "100%" }}
                        value={row.original.generatedNumber}
                        viewBox={`0 0 256 256`}
                    />
                </div>
            </Box>
            <Box>
                <Typography variant="h6" sx={{ marginBottom: 1 }}>{row.original.counterParty}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', width: '120px' }}>IRBM:</Typography>
                    <Typography variant="body2">{row.original.docNumber}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', width: '120px' }}>Ack Number:</Typography>
                    <Typography variant="body2">{row.original.generatedNumber}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', width: '120px' }}>Ack Date:</Typography>
                    <Typography variant="body2">{formatDateIntoReadableFormat(row.original.docDate)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', width: '120px' }}>Status:</Typography>
                    {getStatusChip(row.original.irbmResponse)}
                </Box>
            </Box>
        </Box>
    );
};

export default DetailPanel;
