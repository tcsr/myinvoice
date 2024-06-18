import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Grid,
    Typography,
    Paper,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const dummyData = {
    supplierInfo: {
        name: "Donnie",
        email: "Donnie.Cummerata64@hotmail.com",
        contact: "296.610.0959",
        address: "83020 Oberbrunner Alley, Lake Salvatore 09965",
        taxId: "978-1-4215-1982-1",
        registrationId: "74473-6438",
        sstRegistration: "978-1-4215-1982-1",
        tourismRegistration: "12288",
        msicCode: "12288",
        businessDescription: "Lorem ipsum",
    },
    buyerInfo: {
        name: "Hazel",
        email: "Hazel_Hilpert@gmail.com",
        contact: "905-841-7366",
        address: "9137 Mitchell Extension, Arvada 42165",
        taxId: "978-1-4215-1982-1",
        registrationId: "37396-9249",
        sstRegistration: "978-1-4215-1982-1",
    },
    invoiceDetails: {
        invoiceNumber: "563",
        date: "2022/11/11",
        time: "14:30:55",
        currency: "MYR",
        exchangeRate: "85.00",
        uniqueId: "547",
    },
    productDetails: [
        {
            classification: "Lorem ipsum",
            description: "Lorem ipsum dolor",
            unitPrice: 86,
            quantity: 51,
            taxType: "18",
            taxRate: "86",
            taxAmount: "86",
            discount: "8 %",
            totalAmount: 40.622,
        },
    ],
    paymentInfo: {
        paymentMode: "Select",
        paymentTerms: "Enter",
        paymentAmount: 547,
        bankAccount: "978-0-7070-1242-1",
        paymentDate: "21/11/04",
        paymentRef: "547",
        billRef: "547",
    },
};

const InvoiceDetails = () => {
    const { id } = useParams();
    const [invoiceData, setInvoiceData] = useState(dummyData);

    useEffect(() => {
        // You can replace this with an actual API call to fetch the invoice data
        // const fetchInvoiceData = async () => {
        //   try {
        //     const response = await axios.get(`/api/invoices/${id}`);
        //     setInvoiceData(response.data);
        //   } catch (error) {
        //     console.error('Error fetching invoice data:', error);
        //   }
        // };

        // fetchInvoiceData();
    }, [id]);

    if (!invoiceData) {
        return <Typography sx={{ fontWeight: 'bold' }}>Loading...</Typography>;
    }

    const { supplierInfo, buyerInfo, invoiceDetails, productDetails, paymentInfo } = invoiceData;

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>New Invoice</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom>Upload Invoice</Typography>
                    <Box
                        border={1}
                        borderColor="grey.300"
                        p={2}
                        mb={3}
                        sx={{ borderStyle: 'dotted', height: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        <img src="/path/to/invoice-image.png" alt="Invoice" style={{ width: '100%', height: 'auto', maxHeight: '400px', marginBottom: '10px' }} />
                        <Typography variant="h6" sx={{ textAlign: 'left' }}>
                            Instructions
                        </Typography>
                        <Typography variant="body2" color="textSecondary" paragraph>
                            1. Ensure the invoice is clear and well-lit.
                            <br />
                            2. Wait for the OCR process to complete and review the extracted text for accuracy.
                            <br />
                            3. Confirm and save the extracted data. If needed, edit any inaccuracies manually.
                            <br />
                            4. Ensure the invoice is in a supported file format and free from any obstructions or shadows.
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h5" gutterBottom>Invoice Details</Typography>

                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: 'white', color: 'primary.main' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Supplier info</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider />
                            <Grid container spacing={2} mt={1}>
                                <Grid item xs={4}><Typography color="textSecondary">Supplier Name</Typography></Grid>
                                <Grid item xs={8}><Typography>{supplierInfo?.name}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">Email Address</Typography></Grid>
                                <Grid item xs={8}><Typography>{supplierInfo?.email}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">Contact Number</Typography></Grid>
                                <Grid item xs={8}><Typography>{supplierInfo?.contact}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">Address</Typography></Grid>
                                <Grid item xs={8}><Typography>{supplierInfo?.address}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">Tax Identification Number</Typography></Grid>
                                <Grid item xs={8}><Typography>{supplierInfo?.taxId}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">Registration/Identification/Passport Number</Typography></Grid>
                                <Grid item xs={8}><Typography>{supplierInfo?.registrationId}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">SST Registration Number</Typography></Grid>
                                <Grid item xs={8}><Typography>{supplierInfo?.sstRegistration}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">Tourism Registration Number</Typography></Grid>
                                <Grid item xs={8}><Typography>{supplierInfo?.tourismRegistration}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">MSIC Code</Typography></Grid>
                                <Grid item xs={8}><Typography>{supplierInfo?.msicCode}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">Business Activity Description</Typography></Grid>
                                <Grid item xs={8}><Typography>{supplierInfo?.businessDescription}</Typography></Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: 'white', color: 'primary.main' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Buyer info</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider />
                            <Grid container spacing={2} mt={1}>
                                <Grid item xs={4}><Typography color="textSecondary">Buyer Name</Typography></Grid>
                                <Grid item xs={8}><Typography>{buyerInfo?.name}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">Email Address</Typography></Grid>
                                <Grid item xs={8}><Typography>{buyerInfo?.email}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">Contact Number</Typography></Grid>
                                <Grid item xs={8}><Typography>{buyerInfo?.contact}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">Address</Typography></Grid>
                                <Grid item xs={8}><Typography>{buyerInfo?.address}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">Tax Identification Number</Typography></Grid>
                                <Grid item xs={8}><Typography>{buyerInfo?.taxId}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">Registration/Identification/Passport Number</Typography></Grid>
                                <Grid item xs={8}><Typography>{buyerInfo?.registrationId}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">SST Registration Number</Typography></Grid>
                                <Grid item xs={8}><Typography>{buyerInfo?.sstRegistration}</Typography></Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: 'white', color: 'primary.main' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Invoice Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider />
                            <Grid container spacing={2} mt={1}>
                                <Grid item xs={4}><Typography color="textSecondary">Original Invoice Ref. Number</Typography></Grid>
                                <Grid item xs={8}><Typography>{invoiceDetails?.invoiceNumber}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">Invoice Date & Time</Typography></Grid>
                                <Grid item xs={8}><Typography>{invoiceDetails?.date} {invoiceDetails?.time}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">Supplier's Digital Signature</Typography></Grid>
                                <Grid item xs={8}><Typography><img src="/path/to/signature.png" alt="Signature" /></Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">Invoice Currency code</Typography></Grid>
                                <Grid item xs={8}><Typography>{invoiceDetails?.currency}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">Currency Exchange Rate</Typography></Grid>
                                <Grid item xs={8}><Typography>{invoiceDetails?.exchangeRate}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">IRBM Unique Identifier Number</Typography></Grid>
                                <Grid item xs={8}><Typography>{invoiceDetails?.uniqueId}</Typography></Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: 'white', color: 'primary.main' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Product / Service Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider />
                            <TableContainer component={Paper} sx={{ mt: 2 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Classification</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell>Unit Price</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell>Tax Type</TableCell>
                                            <TableCell>Tax Rate</TableCell>
                                            <TableCell>Tax Amount</TableCell>
                                            <TableCell>Discount</TableCell>
                                            <TableCell>Total Amount</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {productDetails?.map((product, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{product.classification}</TableCell>
                                                <TableCell>{product.description}</TableCell>
                                                <TableCell>{product.unitPrice}</TableCell>
                                                <TableCell>{product.quantity}</TableCell>
                                                <TableCell>{product.taxType}</TableCell>
                                                <TableCell>{product.taxRate}</TableCell>
                                                <TableCell>{product.taxAmount}</TableCell>
                                                <TableCell>{product.discount}</TableCell>
                                                <TableCell>{product.totalAmount}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: 'white', color: 'primary.main' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Payment Info</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider />
                            <Grid container spacing={2} mt={1}>
                                <Grid item xs={4}><Typography color="textSecondary">Payment Mode</Typography></Grid>
                                <Grid item xs={8}><Typography>{paymentInfo?.paymentMode}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">Payment Terms</Typography></Grid>
                                <Grid item xs={8}><Typography>{paymentInfo?.paymentTerms}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">Payment Amount</Typography></Grid>
                                <Grid item xs={8}><Typography>{paymentInfo?.paymentAmount}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">Bank Acc. Number</Typography></Grid>
                                <Grid item xs={8}><Typography>{paymentInfo?.bankAccount}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">Payment Date</Typography></Grid>
                                <Grid item xs={8}><Typography>{paymentInfo?.paymentDate}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">Payment Ref. Number</Typography></Grid>
                                <Grid item xs={8}><Typography>{paymentInfo?.paymentRef}</Typography></Grid>
                                <Grid item xs={4}><Typography color="textSecondary">Bill Ref. Number</Typography></Grid>
                                <Grid item xs={8}><Typography>{paymentInfo?.billRef}</Typography></Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>

            <Box mt={5} display="flex" justifyContent="space-between">
                <Button variant="text" color="primary">Clear All</Button>
                <Box>
                    <Button variant="text" color="primary">Cancel</Button>
                    <Button variant="contained" color="primary" sx={{ ml: 2 }}>Save</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default InvoiceDetails;
