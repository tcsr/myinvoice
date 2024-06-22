import React, { useState, useEffect, useRef } from "react";
import filedoc from "../../assets/images/tray-arrow-up.svg";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import "./UploadInvoice.css";
import { API_ENDPOINTS } from "../../api/apiEndpoints";
import CustomModal from "../../components/CustomModal/CustomModal";
import CustomGenerateInvoiceModal from "../../components/CustomModal/CustomGenerateInvoiceModal";
import useApi from "../../hooks/useApi";
import FileUploadSection from "../../components/new-invoice/FileUploadSection";
import SupplierInfoSection from "../../components/new-invoice/SupplierInfoSection";
import BuyerInfoSection from "../../components/new-invoice/BuyerInfoSection";
import InvoiceDetailsSection from "../../components/new-invoice/InvoiceDetailsSection";
import ProductDetailsSection from "../../components/new-invoice/ProductDetailsSection";
import PaymentInfoSection from "../../components/new-invoice/PaymentInfoSection";
import SummarySection from "../../components/new-invoice/SummarySection";
import FooterSection from "../../components/new-invoice/FooterSection";
import { Alert, Snackbar } from "@mui/material";

function UploadInvoice() {
  const calendarRef = useRef(null);
  const { get, post, del, loading, error } = useApi();
  const [validationMessage, setValidationMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Supplier Info
  const [supplierName, setSupplierName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [taxIDNumber, setTaxIDNumber] = useState("");
  const [cityName, setCityName] = useState("");
  const [supplierState, setSupplierState] = useState("");
  const [supplierCountry, setSupplierCountry] = useState("");
  const [passportIdNumber, setPassportIdNumber] = useState("");
  const [sstRegNumber, setSstRegNumber] = useState("");
  const [tourismRegNumber, setTourismRegNumber] = useState("");
  const [msicCode, setMsicCode] = useState(null);
  const [businessActivityDesc, setBusinessActivityDesc] = useState("");
  const [supplierDigiSign, setSupplierDigiSign] = useState("");

  // Buyer Info
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmailAddress, setBuyerEmailAddress] = useState("");
  const [buyerContactNumber, setBuyerContactNumber] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [buyerCityName, setBuyerCityName] = useState("");
  const [buyerStateName, setBuyerStateName] = useState("");
  const [buyerCountry, setBuyerCountry] = useState("");

  const [buyerTaxIDNumber, setBuyerTaxIDNumber] = useState("");
  const [buyerPassportIdNumber, setBuyerPassportIdNumber] = useState("");
  const [buyerSstRegNumber, setBuyerSstRegNumber] = useState("");

  // Invoice details
  const [invoiceVersion, setInvoiceVersion] = useState("");
  const [selectedInvoiceType, setSelectedInvoiceType] = useState(null);
  const [invoiceCodeNumber, setInvoiceCodeNumber] = useState("");
  const [invoiceRefNumber, setInvoiceRefNumber] = useState("");
  const [invoiceDateTime, setInvoiceDateTime] = useState(null);
  const [validationDateTime, setValidationDateTime] = useState(null);
  const [invoiceCurrencyCode, setInvoiceCurrencyCode] = useState("");
  const [currencyExchangeRate, setCurrencyExchangeRate] = useState("");
  const [billFrequency, setBillFrequency] = useState("");
  const [billPeriod, setBillPeriod] = useState("");
  const [irbmUniqueId, setIrmbUniqueId] = useState("");

  const [supplierSignatureError, setSupplierSignatureError] = useState("");

  // Payment Info
  const [selectedPaymentMode, setSelectedPaymentMode] = useState(null);
  const [selectedPaymentTerms, setSelectedPaymentTerms] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [bankAccNumber, setBankAccNumber] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentRefNumber, setPaymentRefNumber] = useState("");
  const [billRefNumber, setBillRefNumber] = useState("");

  const [stateOptions, setStateOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [invoiceType, setInvoiceType] = useState([]);
  const [currencyCode, setCurrencyCode] = useState([]);
  const [taxTypeOptions, setTaxTypeOptions] = useState([]);
  const [paymentMode, setPaymentModeOptions] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [openGenrateInvoiceModal, setOpenGenrateInvoiceModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [
    msicCodeAndBusinessActivityOptions,
    setMsicCodeAndBusinessActivityOptions,
  ] = useState([]);
  const [msicCodeOptions, setMsicCodeOptions] = useState([]);
  const [businessActivityOptions, setBusinessActivityOptions] = useState([]);
  const [classificationOptions, setClassificationOptions] = useState([]);
  const totalInvoices = 15;
  const [rows, setRows] = useState([
    {
      classification: "",
      description: "",
      unitPrice: "",
      quantity: "",
      taxType: "",
      taxRate: "",
      taxAmount: "",
      discount: "",
      totalAmount: "",
    },
  ]);
  const [summary, setSummary] = useState({
    subtotal: 0,
    amountExemptedFromTax: 0,
    totalExcludingTax: 0,
    totalIncludingTax: 0,
    totalDiscount: 0,
    netTotal: 0,
  });

  useEffect(() => {
    fetchStateData();
    fetchCountry();
    fetchInvoiceType();
    fetchCurrencyCode();
    fetchTaxType();
    fetchPaymentMode();
    calculateSummary();
    fetchMsicCode();
    fetchClassificationList();
  }, [rows]);

  const fetchClassificationList = async () => {
    try {
      const response = await get(API_ENDPOINTS.GET_CLASSIFICATION);

      if (!response) {
        throw new Error("Failed to fetch");
      }
      const classification = response;
      const data = classification.map((c) => ({
        id: c.id,
        label: c.description,
        value: c.code,
      }));
      setClassificationOptions(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchMsicCode = async () => {
    try {
      const response = await get(API_ENDPOINTS.GET_MSIC_CODE);

      if (!response) {
        throw new Error("Failed to fetch");
      }
      const msicBusinessActivityMapping = response;

      setMsicCodeAndBusinessActivityOptions(msicBusinessActivityMapping);
      const msicCodeOptions = msicBusinessActivityMapping.map((item) => ({
        id: item.id,
        label: item.code,
        value: item.code,
        category: item.category,
      }));

      const businessActivityOptions = msicBusinessActivityMapping.map(
        (item) => ({
          id: item.id,
          label: item.description,
          value: item.description,
          category: item.category,
        })
      );

      setMsicCodeOptions(msicCodeOptions);
      setBusinessActivityOptions(businessActivityOptions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleMsicCodeAndBusinessActivityDropdownChange = (e) => {
    const selectedCode = e.value;
    setMsicCode(selectedCode);
    const selectedDescription =
      msicCodeAndBusinessActivityOptions.find(
        (item) => item.code === selectedCode
      )?.description || null;
    setBusinessActivityDesc(selectedDescription);
  };

  const handlesetBusinessActivityDescDropdownChange = (e) => {
    const selectedDescription = e.value;
    setBusinessActivityDesc(selectedDescription);
    const selectedCode =
      msicCodeAndBusinessActivityOptions.find(
        (item) => item.description === selectedDescription
      )?.code || null;
    setMsicCode(selectedCode);
  };
  const fetchPaymentMode = async () => {
    try {
      const response = await get(API_ENDPOINTS.GET_PAYMENT_MODE);

      if (!response) {
        throw new Error("Failed to fetch");
      }
      const data = response;
      const payment = data.map((payment) => ({
        label: payment["description"],
        value: payment["code"],
      }));

      setPaymentModeOptions(payment);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTaxType = async () => {
    try {
      const response = await get(API_ENDPOINTS.GET_TAX_TYPE);
      if (!response) {
        throw new Error("Failed to fetch");
      }
      const data = response;

      const tax = data.map((tax) => ({
        label: tax["description"],
        value: tax["code"],
      }));

      setTaxTypeOptions(tax);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCurrencyCode = async () => {
    try {
      const response = await get(API_ENDPOINTS.GET_CURRENCY_CODE);
      if (!response) {
        throw new Error("Failed to fetch");
      }
      const data = response;

      const currency = data.map((currency) => ({
        id: currency["id"],
        label: currency["currency"],
        value: currency["code"],
      }));

      setCurrencyCode(currency);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchInvoiceType = async () => {
    try {
      const response = await get(API_ENDPOINTS.GET_INVOICE_TYPE);
      if (!response) {
        throw new Error("Failed to fetch");
      }
      const data = response;
      const invoice = data.map((invoice) => ({
        id: invoice["id"],
        label: invoice["description"],
        value: invoice["code"],
      }));

      setInvoiceType(invoice);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchStateData = async () => {
    try {
      const response = await get(API_ENDPOINTS.GET_STATE_CODE);

      if (!response) {
        throw new Error("Failed to fetch");
      }
      const data = response;
      const states = data.map((state) => ({
        id: state["id"],
        label: state["state"],
        value: state["code"],
      }));
      setStateOptions(states);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCountry = async () => {
    try {
      const response = await get(API_ENDPOINTS.GET_COUNTRY_CODE);
      if (!response) {
        throw new Error("Failed to fetch");
      }
      const data = response;
      const countries = data.map((country) => ({
        label: country["country"],
        value: country["code"],
      }));
      setCountryOptions(countries);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleGenerateOpenModal = () => {
    setOpenGenrateInvoiceModal(true);
  };

  const handleGenerateCloseModal = () => {
    setOpenGenrateInvoiceModal(false);
  };

  const handleDropdownSelectTaxTypeChange = (event, field, index) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = event.value;

    // Update state or data accordingly
    setRows(updatedRows);
  };

  const calculateSummary = () => {
    let subtotal = 0;
    let totalDiscount = 0;
    let totalIncludingTax = 0;
    let amountExemptedFromTax = 0;

    rows.forEach((row) => {
      const unitPrice = parseFloat(row.unitPrice) || 0;
      const quantity = parseFloat(row.quantity) || 0;
      const taxRate = parseFloat(row.taxRate) || 0;
      const discountRate = parseFloat(row.discount) || 0;

      const rowSubtotal = unitPrice * quantity;
      const rowTaxAmount = (rowSubtotal * taxRate) / 100;

      const rowTotalAmount = rowSubtotal + rowTaxAmount;
      const rowDiscountAmount = rowTotalAmount * (discountRate / 100);

      subtotal += rowSubtotal;
      totalDiscount += rowDiscountAmount;
      totalIncludingTax += rowTotalAmount;
      if (taxRate === 0) {
        amountExemptedFromTax += rowSubtotal;
      }
    });

    const totalExcludingTax = subtotal;
    const netTotal = totalIncludingTax - totalDiscount;

    setSummary({
      subtotal,
      amountExemptedFromTax,
      totalExcludingTax,
      totalIncludingTax,
      totalDiscount,
      netTotal,
    });
  };

  const [isSupplierInfoExpanded, setSupplierInfoExpanded] = useState(true);
  const [isBuyerInfoExpanded, setBuyerInfoExpanded] = useState(true);
  const [isInvoiceDetailsInfoExpanded, setInvoiceDetailsExpanded] =
    useState(true);
  const [isProductDetailsInfoExpanded, setProductDetailsExpanded] =
    useState(true);

  const toggleSupplierInfo = () => {
    setSupplierInfoExpanded(!isSupplierInfoExpanded);
  };

  const toggleBuyerInfo = () => {
    setBuyerInfoExpanded(!isBuyerInfoExpanded);
  };
  const toggleInvoiceDetailsInfo = () => {
    setInvoiceDetailsExpanded(!isInvoiceDetailsInfoExpanded);
  };
  const toggleProductDetailsInfo = () => {
    setProductDetailsExpanded(!isProductDetailsInfoExpanded);
  };

  const handleInputChange = (e, field, index) => {
    const value = e.target.value;
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    const unitPrice = parseFloat(updatedRows[index].unitPrice) || 0;
    const quantity = parseFloat(updatedRows[index].quantity) || 0;
    const taxRate = parseFloat(updatedRows[index].taxRate) || 0;
    const discountRate = parseFloat(updatedRows[index].discount) || 0;

    const subtotal = unitPrice * quantity;
    const discountAmount = (subtotal * discountRate) / 100;
    const subtotalAfterDiscount = subtotal - discountAmount;
    const taxAmount = (subtotalAfterDiscount * taxRate) / 100;
    const finalAmount = subtotalAfterDiscount + taxAmount;

    updatedRows[index].discountAmount = discountAmount.toFixed(2);
    updatedRows[index].taxAmount = taxAmount.toFixed(2);
    updatedRows[index].totalAmount = finalAmount.toFixed(2);

    setRows(updatedRows);
  };

  const handleDelete = () => {
    setOpenModal(true);
  };

  const addRow = () => {
    if (isPreviousRowFilled(rows.length - 1)) {
      setRows([
        ...rows,
        {
          classification: "",
          description: "",
          unitPrice: "",
          quantity: "",
          taxType: "",
          taxRate: "",
          taxAmount: "",
          discount: "",
          totalAmount: "",
        },
      ]);
    } else {
      alert(
        "Please fill out all fields in the previous row before adding a new row."
      );
    }
  };

  const isPreviousRowFilled = (index) => {
    const row = rows[index];
    return Object.entries(row).every(([key, value]) => {
      if (key === "discount") {
        return true;
      }
      return value !== "";
    });
  };

  const handleDropdownSelectClassificationChange = (event, field, index) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = event.value;
    setRows(updatedRows);
  };

  const removeLastRow = () => {
    if (rows.length > 1) {
      const newRows = rows.slice(0, -1);
      setRows(newRows);
    }
  };

  const columns = [
    {
      field: "classification",
      header: "Classification",
      style: { width: "100px" },
    },
    { field: "description", header: "Description", style: { width: "150px" } },
    { field: "unitPrice", header: "Unit Price", style: { width: "150px" } },
    { field: "quantity", header: "Qty", style: { width: "150px" } },
    { field: "taxType", header: "Tax Type", style: { width: "150px" } },
    { field: "taxRate", header: "Tax Rate", style: { width: "150px" } },
    { field: "taxAmount", header: "Tax Amount", style: { width: "150px" } },
    { field: "discount", header: "Discount", style: { width: "150px" } },
    { field: "totalAmount", header: "Total Amount", style: { width: "120px" } },
  ];

  const data = rows.map((row, index) => ({
    classification: (
      <InputText
        type="text"
        placeholder="Enter"
        style={{ width: "100%" }}
        value={row.classification}
        onChange={(e) => handleInputChange(e, "classification", index)}
      />
    ),
    description: (
      <InputText
        type="text"
        placeholder="Enter"
        style={{ width: "100%" }}
        value={row.description}
        onChange={(e) => handleInputChange(e, "description", index)}
      />
    ),
    unitPrice: (
      <InputText
        type="text"
        placeholder="Enter"
        style={{ width: "100%" }}
        value={row.unitPrice}
        onChange={(e) => handleInputChange(e, "unitPrice", index)}
      />
    ),
    quantity: (
      <InputText
        type="text"
        placeholder="Enter"
        style={{ width: "100%" }}
        value={row.quantity}
        onChange={(e) => handleInputChange(e, "quantity", index)}
      />
    ),
    taxType: (
      <Dropdown
        value={row.taxType}
        options={taxTypeOptions}
        onChange={(e) => handleDropdownSelectTaxTypeChange(e, "taxType", index)}
        placeholder="Select"
        style={{ width: "100%" }}
      />
    ),
    taxRate: (
      <InputText
        type="text"
        placeholder="Enter"
        style={{ width: "100%" }}
        value={row.taxRate}
        onChange={(e) => handleInputChange(e, "taxRate", index)}
      />
    ),
    taxAmount: (
      <InputText
        type="text"
        placeholder="Enter"
        style={{ width: "100%" }}
        value={row.taxAmount}
        onChange={(e) => handleInputChange(e, "taxAmount", index)}
      />
    ),
    discount: (
      <InputText
        type="text"
        placeholder="Enter"
        style={{ width: "100%" }}
        value={row.discount}
        onChange={(e) => handleInputChange(e, "discount", index)}
      />
    ),
    totalAmount: (
      <InputText
        type="text"
        placeholder="Enter"
        style={{ width: "100%" }}
        value={row.totalAmount}
        onChange={(e) => handleInputChange(e, "totalAmount", index)}
      />
    ),
  }));

  const handleDateChange = (e) => {
    setInvoiceDateTime(e.value);
    if (calendarRef.current) {
      calendarRef.current.hide();
    }
  };

  const handleValidationDateChange = (e) => {
    setValidationDateTime(e.value);
    if (calendarRef.current) {
      calendarRef.current.hide();
    }
  };

  const handleSupplierSignFileChange = (event) => {
    const file = event.target.files[0];
    // if (!file) {
    //   // setSupplierSignatureError("Please upload a file.");
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     supplierDigiSign: "Supplier’s Digital Signature is required",
    //   }));
    //   console.log("No file uploaded");
    //   return;
    // }

    if (file.size > 100 * 1024) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        supplierDigiSign:
          "Image size exceeds 100kb. Please upload an image with a maximum size of 100kb.",
      }));
      event.target.value = null;
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");
    };
    reader.readAsDataURL(file);

    setSupplierDigiSign(file.name);
    setErrors((prevErrors) => ({
      ...prevErrors,
      supplierDigiSign: "",
    }));
    // setSupplierSignatureError("");
  };

  const handleDropdownChange = (e) => {
    setInvoiceCurrencyCode(e.value);
  };

  const handleStateDropdownChange = (e) => {
    setSupplierState(e.value);
  };

  const handleBuyerStateDropdownChange = (e) => {
    setBuyerStateName(e.value);
  };

  const handleCountryDropdownChange = (e) => {
    setSupplierCountry(e.value);
  };

  const handleBuyerCountryDropdownChange = (e) => {
    setBuyerCountry(e.value);
  };

  const handleTypeDropdownChange = (e) => {
    setSelectedInvoiceType(e.value);
  };

  const handlePaymentModeDropdownChange = (e) => {
    setSelectedPaymentMode(e.value);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClearAll = () => {
    setSupplierName("");
    setEmailAddress("");
    setValidationMessage("");
    setContactNumber("");
    setAddress("");
    setTaxIDNumber("");
    setCityName("");
    setSupplierState("");
    setSupplierCountry("");
    setPassportIdNumber("");
    setSstRegNumber("");
    setTourismRegNumber("");
    setMsicCode("");
    setBusinessActivityDesc("");
    setSupplierDigiSign("");
    setBuyerName("");
    setBuyerEmailAddress("");
    setBuyerContactNumber("");
    setBuyerAddress("");
    setBuyerCityName("");
    setBuyerStateName("");
    setBuyerCountry("");
    setBuyerTaxIDNumber("");
    setBuyerPassportIdNumber("");
    setBuyerSstRegNumber("");
    setInvoiceVersion("");
    setSelectedInvoiceType(null);
    setInvoiceCodeNumber("");
    setInvoiceRefNumber("");
    setInvoiceDateTime(null);
    setValidationDateTime(null);
    setSupplierDigiSign("");
    setInvoiceCurrencyCode("");
    setCurrencyExchangeRate("");
    setBillFrequency("");
    setBillPeriod("");
    setIrmbUniqueId("");
    setSelectedPaymentMode(null);
    setSelectedPaymentTerms(null);
    setPaymentAmount("");
    setBankAccNumber("");
    setPaymentDate("");
    setPaymentRefNumber("");
    setBillRefNumber("");
    setRows([
      {
        classification: "",
        description: "",
        unitPrice: "",
        quantity: "",
        taxType: "",
        taxRate: "",
        taxAmount: "",
        discount: "",
        totalAmount: "",
      },
    ]);
    setErrors({});
    scrollToTop();
  };

  const validateFields = () => {
    return {
      supplierName: supplierName ? "" : "Supplier's Name is required",
      emailAddress: emailAddress ? "" : "Email Address is required",
      contactNumber: contactNumber ? "" : "Contact Number is required",
      address: address ? "" : "Address is required",
      taxIDNumber: taxIDNumber ? "" : "Tax ID Number is required",
      cityName: cityName ? "" : "City Name is required",
      supplierState: supplierState ? "" : "Supplier State is required",
      supplierCountry: supplierCountry ? "" : "Supplier Country is required",
      passportIdNumber: passportIdNumber
        ? ""
        : "Passport ID Number is required",
      sstRegNumber: sstRegNumber ? "" : "SST Registration Number is required",
      tourismRegNumber: tourismRegNumber
        ? ""
        : "Tourism Registration Number is required",
      msicCode: msicCode ? "" : "MSIC Code is required",
      businessActivityDesc: businessActivityDesc
        ? ""
        : "Business Activity Description is required",
      buyerName: buyerName ? "" : "Buyer Name is required",
      buyerTaxIDNumber: buyerTaxIDNumber
        ? ""
        : "Buyer Tax ID Number is required",
      buyerPassportIdNumber: buyerPassportIdNumber
        ? ""
        : "Buyer Passport ID Number is required",
      buyerSstRegNumber: buyerSstRegNumber
        ? ""
        : "Buyer SST Registration Number is required",
      buyerEmailAddress: buyerEmailAddress
        ? ""
        : "Buyer Email Address is required",
      buyerAddress: buyerAddress ? "" : "Buyer Address is required",
      buyerCityName: buyerCityName ? "" : "Buyer City Name is required",
      buyerStateName: buyerStateName ? "" : "Buyer State Name is required",
      buyerCountry: buyerCountry ? "" : "Buyer Country is required",
      buyerContactNumber: buyerContactNumber
        ? ""
        : "Buyer Contact Number is required",
      invoiceVersion: invoiceVersion ? "" : "Invoice Version is required",
      selectedInvoiceType: selectedInvoiceType
        ? ""
        : "Invoice Type is required",
      invoiceCodeNumber: invoiceCodeNumber
        ? ""
        : "Invoice Code/Number is required",
      invoiceDateTime: invoiceDateTime ? "" : "Invoice Date & Time is required",
      validationDateTime: validationDateTime
        ? ""
        : "Validation Date & Time is required",
      supplierDigiSign: supplierDigiSign
        ? ""
        : "Supplier’s Digital Signature is required",
      invoiceCurrencyCode: invoiceCurrencyCode
        ? ""
        : "Invoice Currency Code is required",
      currencyExchangeRate: currencyExchangeRate
        ? ""
        : "Currency Exchange Rate is required",
      billFrequency: billFrequency ? "" : "Frequency of Billing is required",
      billPeriod: billPeriod ? "" : "Billing Period is required",
      irbmUniqueId: irbmUniqueId
        ? ""
        : "IRBM Unique Identifier Number is required",
    };
  };

  const handleSave = async () => {
    const validationErrors = validateFields();
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some((error) => error);
    if (!hasErrors) {
      const payload = {
        supplier: {
          name: supplierName,
          emailAddress: emailAddress,
          contactNumber: contactNumber,
          address: address,
          taxIDNumber: taxIDNumber,
          passportIdNumber: passportIdNumber,
          sstRegNumber: sstRegNumber,
          tourismRegNumber: tourismRegNumber,
          msicCode: msicCode,
          businessActivityDesc: businessActivityDesc,
          cityName: cityName,
          state: supplierState,
          country: supplierCountry,
        },
        buyer: {
          name: buyerName,
          emailAddress: buyerEmailAddress,
          contactNumber: buyerContactNumber,
          address: buyerAddress,
          taxIDNumber: buyerTaxIDNumber,
          passportIdNumber: buyerPassportIdNumber,
          sstRegNumber: buyerSstRegNumber,
          cityName: buyerCityName,
          state: buyerStateName,
          country: buyerCountry,
        },
        invoice: {
          version: invoiceVersion,
          type: selectedInvoiceType,
          codeNumber: invoiceCodeNumber,
          refNumber: invoiceRefNumber,
          dateTime: invoiceDateTime,
          validationDateTime: validationDateTime,
          supplierDigiSign: supplierDigiSign,
          currencyCode: invoiceCurrencyCode,
          exchangeRate: currencyExchangeRate,
          billFrequency: billFrequency,
          billPeriod: billPeriod,
          irbmUniqueId: irbmUniqueId,
        },
        payment: {
          mode: selectedPaymentMode,
          terms: selectedPaymentTerms,
          amount: paymentAmount,
          bankAccNumber: bankAccNumber,
          date: paymentDate,
          refNumber: paymentRefNumber,
          billRefNumber: billRefNumber,
        },
        productDetailsItems: rows,
        summary: summary,
      };
      try {
        const response = await post(API_ENDPOINTS.CREATE_INVOICE, payload);
        if (response?.status == "Success") {
          setSnackbar({
            open: true,
            message: response.message,
            severity: "success",
          });
          handleClearAll();
        }
      } catch (apiError) {
        setSnackbar({
          open: true,
          message: apiError.message,
          severity: "error",
        });
        console.error("API Error:", apiError);
      }
    }
  };

  const handleFileUpload = (files) => {
    setUploadedFiles(files);
  };

  return (
    <>
      <div className="new-invoice-container">
        <p className="new-invoice-title">New Invoice</p>
      </div>
      <div className="parent-container">
        <div className="flex-container">
          <FileUploadSection handleFileUpload={handleFileUpload} />
          <div style={{ flex: 7.4 }}>
            <p style={{ color: "#05353D", fontSize: 20, fontWeight: 400 }}>
              Invoice Details
            </p>
            <SupplierInfoSection
              isExpanded={isSupplierInfoExpanded}
              toggleExpand={toggleSupplierInfo}
              supplierName={supplierName}
              setSupplierName={setSupplierName}
              emailAddress={emailAddress}
              setEmailAddress={setEmailAddress}
              contactNumber={contactNumber}
              setContactNumber={setContactNumber}
              address={address}
              setAddress={setAddress}
              taxIDNumber={taxIDNumber}
              setTaxIDNumber={setTaxIDNumber}
              cityName={cityName}
              setCityName={setCityName}
              supplierState={supplierState}
              setSupplierState={setSupplierState}
              supplierCountry={supplierCountry}
              setSupplierCountry={setSupplierCountry}
              passportIdNumber={passportIdNumber}
              setPassportIdNumber={setPassportIdNumber}
              sstRegNumber={sstRegNumber}
              setSstRegNumber={setSstRegNumber}
              tourismRegNumber={tourismRegNumber}
              setTourismRegNumber={setTourismRegNumber}
              msicCode={msicCode}
              setMsicCode={setMsicCode}
              msicCodeOptions={msicCodeOptions}
              businessActivityDesc={businessActivityDesc}
              businessActivityOptions={businessActivityOptions}
              setBusinessActivityDesc={setBusinessActivityDesc}
              // supplierDigiSign={supplierDigiSign}
              // setSupplierDigiSign={setSupplierDigiSign}
              stateOptions={stateOptions}
              countryOptions={countryOptions}
              handleStateDropdownChange={handleStateDropdownChange}
              handleCountryDropdownChange={handleCountryDropdownChange}
              handleMsicCodeAndBusinessActivityDropdownChange={
                handleMsicCodeAndBusinessActivityDropdownChange
              }
              handlesetBusinessActivityDescDropdownChange={
                handlesetBusinessActivityDescDropdownChange
              }
              supplierSignatureError={supplierSignatureError}
              setSupplierSignatureError={setSupplierSignatureError}
              handleSupplierSignFileChange={handleSupplierSignFileChange}
              errors={errors}
              setErrors={setErrors}
            />
            <BuyerInfoSection
              isExpanded={isBuyerInfoExpanded}
              toggleExpand={toggleBuyerInfo}
              buyerName={buyerName}
              setBuyerName={setBuyerName}
              buyerEmailAddress={buyerEmailAddress}
              setBuyerEmailAddress={setBuyerEmailAddress}
              buyerContactNumber={buyerContactNumber}
              setBuyerContactNumber={setBuyerContactNumber}
              buyerAddress={buyerAddress}
              setBuyerAddress={setBuyerAddress}
              buyerCityName={buyerCityName}
              setBuyerCityName={setBuyerCityName}
              buyerStateName={buyerStateName}
              setBuyerStateName={setBuyerStateName}
              buyerCountry={buyerCountry}
              setBuyerCountry={setBuyerCountry}
              buyerTaxIDNumber={buyerTaxIDNumber}
              setBuyerTaxIDNumber={setBuyerTaxIDNumber}
              buyerPassportIdNumber={buyerPassportIdNumber}
              setBuyerPassportIdNumber={setBuyerPassportIdNumber}
              buyerSstRegNumber={buyerSstRegNumber}
              setBuyerSstRegNumber={setBuyerSstRegNumber}
              stateOptions={stateOptions}
              countryOptions={countryOptions}
              handleBuyerStateDropdownChange={handleBuyerStateDropdownChange}
              handleBuyerCountryDropdownChange={
                handleBuyerCountryDropdownChange
              }
              errors={errors}
              setErrors={setErrors}
            />
            <InvoiceDetailsSection
              isExpanded={isInvoiceDetailsInfoExpanded}
              toggleExpand={toggleInvoiceDetailsInfo}
              invoiceVersion={invoiceVersion}
              setInvoiceVersion={setInvoiceVersion}
              selectedInvoiceType={selectedInvoiceType}
              setSelectedInvoiceType={setSelectedInvoiceType}
              invoiceCodeNumber={invoiceCodeNumber}
              setInvoiceCodeNumber={setInvoiceCodeNumber}
              invoiceRefNumber={invoiceRefNumber}
              setInvoiceRefNumber={setInvoiceRefNumber}
              invoiceDateTime={invoiceDateTime}
              setInvoiceDateTime={setInvoiceDateTime}
              validationDateTime={validationDateTime}
              setValidationDateTime={setValidationDateTime}
              supplierDigiSign={supplierDigiSign}
              setSupplierDigiSign={setSupplierDigiSign}
              supplierSignatureError={supplierSignatureError}
              setSupplierSignatureError={setSupplierSignatureError}
              invoiceCurrencyCode={invoiceCurrencyCode}
              setInvoiceCurrencyCode={setInvoiceCurrencyCode}
              currencyExchangeRate={currencyExchangeRate}
              setCurrencyExchangeRate={setCurrencyExchangeRate}
              billFrequency={billFrequency}
              setBillFrequency={setBillFrequency}
              billPeriod={billPeriod}
              setBillPeriod={setBillPeriod}
              irbmUniqueId={irbmUniqueId}
              setIrmbUniqueId={setIrmbUniqueId}
              handleTypeDropdownChange={handleTypeDropdownChange}
              handleDropdownChange={handleDropdownChange}
              handleSupplierSignFileChange={handleSupplierSignFileChange}
              handleDateChange={handleDateChange}
              handleValidationDateChange={handleValidationDateChange}
              invoiceType={invoiceType}
              currencyCode={currencyCode}
              calendarRef={calendarRef}
              errors={errors}
              setErrors={setErrors}
            />
            <ProductDetailsSection
              isExpanded={isProductDetailsInfoExpanded}
              toggleExpand={toggleProductDetailsInfo}
              rows={rows}
              columns={columns}
              data={data}
              addRow={addRow}
              removeLastRow={removeLastRow}
              handleInputChange={handleInputChange}
              handleDropdownSelectClassificationChange={
                handleDropdownSelectClassificationChange
              }
              handleDropdownSelectTaxTypeChange={
                handleDropdownSelectTaxTypeChange
              }
              taxTypeOptions={taxTypeOptions}
              classificationOptions={classificationOptions}
            />
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <PaymentInfoSection
                selectedPaymentMode={selectedPaymentMode}
                setSelectedPaymentMode={setSelectedPaymentMode}
                selectedPaymentTerms={selectedPaymentTerms}
                setSelectedPaymentTerms={setSelectedPaymentTerms}
                paymentAmount={paymentAmount}
                setPaymentAmount={setPaymentAmount}
                bankAccNumber={bankAccNumber}
                setBankAccNumber={setBankAccNumber}
                paymentDate={paymentDate}
                setPaymentDate={setPaymentDate}
                paymentRefNumber={paymentRefNumber}
                setPaymentRefNumber={setPaymentRefNumber}
                billRefNumber={billRefNumber}
                setBillRefNumber={setBillRefNumber}
                paymentMode={paymentMode}
                handlePaymentModeDropdownChange={
                  handlePaymentModeDropdownChange
                }
              />
              <SummarySection summary={summary} />
            </div>
          </div>
        </div>
        <FooterSection
          handleClearAll={handleClearAll}
          handleDelete={handleDelete}
          handleSave={handleSave}
        />
        <CustomModal open={openModal} handleClose={handleCloseModal} />
        <CustomGenerateInvoiceModal
          open={openGenrateInvoiceModal}
          handleClose={handleGenerateCloseModal}
          totalInvoices={totalInvoices}
        />
        <Snackbar
          open={snackbar.open}
          autoHideDuration={9000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}

export default UploadInvoice;
