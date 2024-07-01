import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import DocumentIcon from '@mui/icons-material/InsertDriveFile';

const InvoiceLogModal = ({ open, onClose, invoiceDetails = {} }) => {
    const {
        supplierName = "Unknown Supplier",
        invoiceType = "Unknown Type",
        uploadTime = "N/A",
        uploadDate = "N/A",
        portalToMyinvoisTime = "N/A",
        portalToMyinvoisDate = "N/A",
        myinvoisToPortalTime = "N/A",
        myinvoisToPortalDate = "N/A",
        storeTime = "N/A",
        storeDate = "N/A",
    } = invoiceDetails;

    const timelineEvents = [
        { label: 'Uploaded from SAP', time: uploadTime, date: uploadDate },
        { label: 'Portal to Myinvois', time: portalToMyinvoisTime, date: portalToMyinvoisDate },
        { label: 'Myinvois to Portal', time: myinvoisToPortalTime, date: myinvoisToPortalDate },
        { label: 'Store in Database', time: storeTime, date: storeDate },
    ];

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Invoice Log
                <Typography variant="subtitle1">
                    Invoice: {supplierName} - {invoiceType}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Timeline position="alternate">
                    {timelineEvents.map((event, index) => (
                        <TimelineItem key={index}>
                            <TimelineOppositeContent
                                sx={{ m: 'auto 0' }}
                                align="right"
                                variant="body2"
                                color="text.secondary"
                            >
                                {event.time} <br /> {event.date}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineConnector />
                                <TimelineDot>
                                    <DocumentIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                <Typography variant="h6" component="span">
                                    {event.label}
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default InvoiceLogModal;
