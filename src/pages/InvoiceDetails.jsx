import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { API_ENDPOINTS } from "../api/apiEndpoints";
import useApi from "../hooks/useApi";
import Loading from "../components/loader/Loading";
import { useNavigate, useLocation } from "react-router-dom";
import FileUpload from "../components/FileUploadComponent/FileUpload";
import no_data from '../assets/images/no-data.png';

const InvoiceDetails = () => {
  const { id } = useParams();

  const [invoiceData, setInvoiceData] = useState({});
  const { get, post, del, loading, error } = useApi();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await get(
          `${API_ENDPOINTS.GET_INVOICE_DETAILS}/${id}`
        );
        console.log(response);
        setInvoiceData(response);
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      }
    };
    fetchInvoiceData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  const { supplier, buyer, invoice, productDetailsItems, payment, summary } =
    invoiceData;

  const handleBack = () => {
    const previousPath = location.state?.from?.pathname;
    if (previousPath === "/view-invoice" || previousPath === "/generate") {
      navigate(-1);
    } else {
      navigate("/home");
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onCancelHandler = () => {
    scrollToTop();
  };

  const handleFileUpload = () => {};

  return (
    <>
      <Box mt={1} display="flex" justifyContent="space-between">
        <Button variant="text" color="primary" onClick={handleBack}>
          Go Back
        </Button>
      </Box>
      <div className="invoice-details-container">
        <Box p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Typography variant="h5" gutterBottom>
                Invoice Details
              </Typography>

              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ bgcolor: "white", color: "primary.main" }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    Supplier info
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Divider />
                  <Grid container spacing={2} mt={1}>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        Supplier Name
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{supplier?.name || "N/A"}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        Email Address
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{supplier?.emailAddress || "N/A"}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        Contact Number
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>
                        {supplier?.contactNumber || "N/A"}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">Address</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{supplier?.address || "N/A"}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        Tax Identification Number
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{supplier?.taxIDNumber || "N/A"}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        Registration/Identification/Passport Number
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>
                        {supplier?.passportIdNumber || "N/A"}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        SST Registration Number
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{supplier?.sstRegNumber || "N/A"}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        Tourism Registration Number
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>
                        {supplier?.tourismRegistration || "N/A"}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">MSIC Code</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{supplier?.msicCode || "N/A"}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        Business Activity Description
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>
                        {supplier?.businessDescription || "N/A"}
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ bgcolor: "white", color: "primary.main" }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    Buyer info
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Divider />
                  <Grid container spacing={2} mt={1}>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">Buyer Name</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{buyer?.name || "N/A"}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        Email Address
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{buyer?.emailAddress || "N/A"}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        Contact Number
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{buyer?.contactNumber || "N/A"}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">Address</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{buyer?.address || "N/A"}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        Tax Identification Number
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{buyer?.taxIDNumber || "N/A"}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        Registration/Identification/Passport Number
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>
                        {buyer?.passportIdNumber || "N/A"}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        SST Registration Number
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{buyer?.sstRegNumber || "N/A"}</Typography>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ bgcolor: "white", color: "primary.main" }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    Invoice Details
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Divider />
                  <Grid container spacing={2} mt={1}>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        Original Invoice Ref. Number
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{invoice?.refNumber || "N/A"}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        Invoice Date & Time
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{invoice?.dateTime || "N/A"}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        Supplier's Digital Signature
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>
                        {/* <img src="/path/to/signature.png" alt="Signature" /> */}
                        {"N/A"}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        Invoice Currency code
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{invoice?.currencyCode || "N/A"}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        Currency Exchange Rate
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{invoice?.exchangeRate || "N/A"}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        IRBM Unique Identifier Number
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{invoice?.irbmUniqueId || "N/A"}</Typography>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ bgcolor: "white", color: "primary.main" }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    Product / Service Details
                  </Typography>
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
                        {productDetailsItems?.map((product, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {product.classification || "N/A"}
                            </TableCell>
                            <TableCell>
                              {product.description || "N/A"}
                            </TableCell>
                            <TableCell>{product.unitPrice || "N/A"}</TableCell>
                            <TableCell>{product.quantity || "N/A"}</TableCell>
                            <TableCell>{product.taxType || "N/A"}</TableCell>
                            <TableCell>{product.taxRate || "N/A"}</TableCell>
                            <TableCell>{product.taxAmount || "N/A"}</TableCell>
                            <TableCell>{product.discount || "N/A"}</TableCell>
                            <TableCell>
                              {product.totalAmount || "N/A"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>

              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ bgcolor: "white", color: "primary.main" }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    Payment Info
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Divider />
                  <Grid container spacing={2} mt={1}>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        Payment Mode
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{payment?.mode || "N/A"}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        Payment Terms
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{payment?.terms || "N/A"}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        Payment Amount
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{payment?.amount || "N/A"}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        Bank Acc. Number
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{payment?.bankAccNumber || "N/A"}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        Payment Date
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{payment?.date || "N/A"}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        Payment Ref. Number
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{payment?.refNumber || "N/A"}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">
                        Bill Ref. Number
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{payment?.billRefNumber || "N/A"}</Typography>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ bgcolor: "white", color: "primary.main" }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    Invoice Image
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Divider />
                  <Grid item xs={12} md={12}>
                    {/* <Typography
                      variant="h6"
                      sx={{ marginBottom: "10px", marginTop: "10px" }}
                      gutterBottom
                    >
                      Invoice Image
                    </Typography> */}
                  </Grid>
                  <Grid item xs={12} md={12} sx={{display: 'flex', justifyContent: 'flex-start'}}>
                    {/* <FileUpload onFileUpload={handleFileUpload} />
                     */}

                     <img src={no_data} />
                  </Grid>
                  {/* <Grid item xs={12} md={6}>
                    <Box>
                      <Typography variant="h6" sx={{ textAlign: "left" }}>
                        Instructions
                      </Typography>
                      <Box
                        border={1}
                        borderColor="grey.300"
                        p={2}
                        mb={3}
                        sx={{
                          borderStyle: "dotted",
                          height: "auto",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          paragraph
                        >
                          1. Ensure the invoice is clear and well-lit.
                          <br />
                          2. Wait for the OCR process to complete and review the
                          extracted text for accuracy.
                          <br />
                          3. Confirm and save the extracted data. If needed,
                          edit any inaccuracies manually.
                          <br />
                          4. Ensure the invoice is in a supported file format
                          and free from any obstructions or shadows.
                        </Typography>
                      </Box>
                    </Box>
                  </Grid> */}
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>

          <Box mt={5} display="flex" justifyContent="space-between">
            <Button variant="text" color="primary" onClick={handleBack}>
              Go Back
            </Button>
            <Box>
              {/* <Button variant="text" color="primary" onClick={onCancelHandler}>
              Cancel
            </Button> */}
              {/* <Button variant="contained" color="primary" sx={{ ml: 2 }}>
              Save
            </Button> */}
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default InvoiceDetails;
