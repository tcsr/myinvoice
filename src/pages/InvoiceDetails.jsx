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
import { API_ENDPOINTS } from "../api/apiEndpoints";
import useApi from "../hooks/useApi";

const fallbackData = {
  supplierInfo: {
    name: null,
    email: null,
    contact: null,
    address: null,
    taxId: null,
    registrationId: null,
    sstRegistration: null,
    tourismRegistration: null,
    msicCode: null,
    businessDescription: null,
  },
  buyerInfo: {
    name: null,
    email: null,
    contact: null,
    address: null,
    taxId: null,
    registrationId: null,
    sstRegistration: null,
  },
  invoiceDetails: {
    invoiceNumber: null,
    date: null,
    time: null,
    currency: null,
    exchangeRate: null,
    uniqueId: null,
  },
  productDetails: [],
  paymentInfo: {
    paymentMode: null,
    paymentTerms: null,
    paymentAmount: null,
    bankAccount: null,
    paymentDate: null,
    paymentRef: null,
    billRef: null,
  },
};

const InvoiceDetails = () => {
  const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState(fallbackData);
  const { get, loading, error } = useApi();

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await get(`${API_ENDPOINTS.GET_INVOICE_DETAILS}/${id}`);
        setInvoiceData(response);
      } catch (error) {
        console.error('Error fetching invoice data:', error);
        setInvoiceData(fallbackData);
      }
    };
    fetchInvoiceData();
  }, [id, get]);

  const { supplierInfo, buyerInfo, invoiceDetails, productDetails, paymentInfo } = invoiceData;

  return (
    <Box p={3}>
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
                <Grid item xs={8}><Typography>{supplierInfo?.name ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">Email Address</Typography></Grid>
                <Grid item xs={8}><Typography>{supplierInfo?.email ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">Contact Number</Typography></Grid>
                <Grid item xs={8}><Typography>{supplierInfo?.contact ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">Address</Typography></Grid>
                <Grid item xs={8}><Typography>{supplierInfo?.address ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">Tax Identification Number</Typography></Grid>
                <Grid item xs={8}><Typography>{supplierInfo?.taxId ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">Registration/Identification/Passport Number</Typography></Grid>
                <Grid item xs={8}><Typography>{supplierInfo?.registrationId ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">SST Registration Number</Typography></Grid>
                <Grid item xs={8}><Typography>{supplierInfo?.sstRegistration ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">Tourism Registration Number</Typography></Grid>
                <Grid item xs={8}><Typography>{supplierInfo?.tourismRegistration ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">MSIC Code</Typography></Grid>
                <Grid item xs={8}><Typography>{supplierInfo?.msicCode ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">Business Activity Description</Typography></Grid>
                <Grid item xs={8}><Typography>{supplierInfo?.businessDescription ?? 'N/A'}</Typography></Grid>
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
                <Grid item xs={8}><Typography>{buyerInfo?.name ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">Email Address</Typography></Grid>
                <Grid item xs={8}><Typography>{buyerInfo?.email ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">Contact Number</Typography></Grid>
                <Grid item xs={8}><Typography>{buyerInfo?.contact ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">Address</Typography></Grid>
                <Grid item xs={8}><Typography>{buyerInfo?.address ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">Tax Identification Number</Typography></Grid>
                <Grid item xs={8}><Typography>{buyerInfo?.taxId ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">Registration/Identification/Passport Number</Typography></Grid>
                <Grid item xs={8}><Typography>{buyerInfo?.registrationId ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">SST Registration Number</Typography></Grid>
                <Grid item xs={8}><Typography>{buyerInfo?.sstRegistration ?? 'N/A'}</Typography></Grid>
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
                <Grid item xs={8}><Typography>{invoiceDetails?.invoiceNumber ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">Invoice Date & Time</Typography></Grid>
                <Grid item xs={8}><Typography>{invoiceDetails?.date ?? 'N/A'} {invoiceDetails?.time ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">Supplier's Digital Signature</Typography></Grid>
                <Grid item xs={8}><Typography><img src="/path/to/signature.png" alt="Signature" /></Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">Invoice Currency code</Typography></Grid>
                <Grid item xs={8}><Typography>{invoiceDetails?.currency ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">Currency Exchange Rate</Typography></Grid>
                <Grid item xs={8}><Typography>{invoiceDetails?.exchangeRate ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">IRBM Unique Identifier Number</Typography></Grid>
                <Grid item xs={8}><Typography>{invoiceDetails?.uniqueId ?? 'N/A'}</Typography></Grid>
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
                    {productDetails?.length > 0 ? (
                      productDetails.map((product, index) => (
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
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9}><Typography>No product details available</Typography></TableCell>
                      </TableRow>
                    )}
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
                <Grid item xs={8}><Typography>{paymentInfo?.paymentMode ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">Payment Terms</Typography></Grid>
                <Grid item xs={8}><Typography>{paymentInfo?.paymentTerms ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">Payment Amount</Typography></Grid>
                <Grid item xs={8}><Typography>{paymentInfo?.paymentAmount ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">Bank Acc. Number</Typography></Grid>
                <Grid item xs={8}><Typography>{paymentInfo?.bankAccount ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">Payment Date</Typography></Grid>
                <Grid item xs={8}><Typography>{paymentInfo?.paymentDate ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">Payment Ref. Number</Typography></Grid>
                <Grid item xs={8}><Typography>{paymentInfo?.paymentRef ?? 'N/A'}</Typography></Grid>
                <Grid item xs={4}><Typography color="textSecondary">Bill Ref. Number</Typography></Grid>
                <Grid item xs={8}><Typography>{paymentInfo?.billRef ?? 'N/A'}</Typography></Grid>
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
