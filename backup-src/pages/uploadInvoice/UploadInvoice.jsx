import React, { useState, useEffect } from "react";
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

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FileUploadSection from "../../components/new-invoice/FileUploadSection";
import SupplierInfoSection from "../../components/new-invoice/SupplierInfoSection";
import BuyerInfoSection from "../../components/new-invoice/BuyerInfoSection";
import InvoiceDetailsSection from "../../components/new-invoice/InvoiceDetailsSection";
import ProductDetailsSection from "../../components/new-invoice/ProductDetailsSection";
import PaymentInfoSection from "../../components/new-invoice/PaymentInfoSection";
import SummarySection from "../../components/new-invoice/SummarySection";
import FooterSection from "../../components/new-invoice/FooterSection";

// Validation schema
const validationSchema = yup.object().shape({
  supplier: yup.object().shape({
    name: yup.string().required("Supplier's Name is required"),
    emailAddress: yup.string().email("Invalid email").required("Email Address is required"),
    contactNumber: yup.string().required("Contact Number is required"),
    address: yup.string().required("Address is required"),
    taxIDNumber: yup.string().required("Tax ID Number is required"),
    passportIdNumber: yup.string().required("Passport ID Number is required"),
    sstRegNumber: yup.string().required("SST Registration Number is required"),
    tourismRegNumber: yup.string().required("Tourism Registration Number is required"),
    msicCode: yup.string().required("MSIC Code is required"),
    businessActivityDesc: yup.string().required("Business Activity Description is required"),
    cityName: yup.string().required("City Name is required"),
    state: yup.string().required("Supplier State is required"),
    country: yup.string().required("Supplier Country is required"),
  }),
  buyer: yup.object().shape({
    name: yup.string().required("Buyer Name is required"),
    emailAddress: yup.string().email("Invalid email").required("Email Address is required"),
    contactNumber: yup.string().required("Contact Number is required"),
    address: yup.string().required("Address is required"),
    taxIDNumber: yup.string().required("Tax ID Number is required"),
    passportIdNumber: yup.string().required("Passport ID Number is required"),
    sstRegNumber: yup.string().required("SST Registration Number is required"),
    cityName: yup.string().required("City Name is required"),
    state: yup.string().required("Buyer State is required"),
    country: yup.string().required("Buyer Country is required"),
  }),
  invoice: yup.object().shape({
    version: yup.string().required("Invoice Version is required"),
    type: yup.string().required("Invoice Type is required"),
    codeNumber: yup.string().required("Invoice Code/Number is required"),
    refNumber: yup.string().required("Invoice Reference Number is required"),
    dateTime: yup.date().required("Invoice Date & Time is required"),
    validationDateTime: yup.date().required("Validation Date & Time is required"),
    supplierDigiSign: yup.string().required("Supplier’s Digital Signature is required"),
    currencyCode: yup.string().required("Invoice Currency Code is required"),
    exchangeRate: yup.number().required("Currency Exchange Rate is required"),
    billFrequency: yup.string().required("Frequency of Billing is required"),
    billPeriod: yup.string().required("Billing Period is required"),
    irbmUniqueId: yup.string().required("IRBM Unique Identifier Number is required"),
  }),
  payment: yup.object().shape({
    mode: yup.string().required("Payment Mode is required"),
    terms: yup.string().required("Payment Terms are required"),
    amount: yup.number().required("Payment Amount is required"),
    bankAccNumber: yup.string().required("Bank Account Number is required"),
    date: yup.date().required("Payment Date is required"),
    refNumber: yup.string().required("Payment Reference Number is required"),
    billRefNumber: yup.string().required("Bill Reference Number is required"),
  }),
  productDetailsItems: yup.array().of(
    yup.object().shape({
      classification: yup.string().required("Classification is required"),
      description: yup.string().required("Description is required"),
      unitPrice: yup.number().required("Unit Price is required"),
      quantity: yup.number().required("Quantity is required"),
      taxType: yup.string().required("Tax Type is required"),
      taxRate: yup.number().required("Tax Rate is required"),
      taxAmount: yup.number().required("Tax Amount is required"),
      discount: yup.number().required("Discount is required"),
      totalAmount: yup.number().required("Total Amount is required"),
    })
  ),
  summary: yup.object().shape({
    subtotal: yup.number().required("Subtotal is required"),
    amountExemptedFromTax: yup.number().required("Amount Exempted from Tax is required"),
    totalExcludingTax: yup.number().required("Total Excluding Tax is required"),
    totalIncludingTax: yup.number().required("Total Including Tax is required"),
    totalDiscount: yup.number().required("Total Discount is required"),
    netTotal: yup.number().required("Net Total is required"),
  }),
});


const UploadInvoice = () => {

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

  const totalInvoices = 15;


  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      supplier: {
        name: "",
        emailAddress: "",
        contactNumber: "",
        address: "",
        taxIDNumber: "",
        passportIdNumber: "",
        sstRegNumber: "",
        tourismRegNumber: "",
        msicCode: "",
        businessActivityDesc: "",
        cityName: "",
        state: "",
        country: "",
      },
      buyer: {
        name: "",
        emailAddress: "",
        contactNumber: "",
        address: "",
        taxIDNumber: "",
        passportIdNumber: "",
        sstRegNumber: "",
        cityName: "",
        state: "",
        country: "",
      },
      invoice: {
        version: "",
        type: "",
        codeNumber: "",
        refNumber: "",
        dateTime: null,
        validationDateTime: null,
        supplierDigiSign: "",
        currencyCode: "",
        exchangeRate: "",
        billFrequency: "",
        billPeriod: "",
        irbmUniqueId: "",
      },
      payment: {
        mode: "",
        terms: "",
        amount: "",
        bankAccNumber: "",
        date: null,
        refNumber: "",
        billRefNumber: "",
      },
      productDetailsItems: [
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
      ],
      summary: {
        subtotal: 0,
        amountExemptedFromTax: 0,
        totalExcludingTax: 0,
        totalIncludingTax: 0,
        totalDiscount: 0,
        netTotal: 0,
      },
    },
  });

  const { handleSubmit, reset, watch, setValue } = methods;

  const fetchInitialData = async () => {
    try {
      const [states, countries, invoiceTypes, currencies, taxTypes, paymentModes] = await Promise.all([
        get(API_ENDPOINTS.GET_STATE_CODE),
        get(API_ENDPOINTS.GET_COUNTRY_CODE),
        get(API_ENDPOINTS.GET_INVOICE_TYPE),
        get(API_ENDPOINTS.GET_CURRENCY_CODE),
        get(API_ENDPOINTS.GET_TAX_TYPE),
        get(API_ENDPOINTS.GET_PAYMENT_MODE),
      ]);

      setStateOptions(states.map(({ id, state, code }) => ({ id, label: state, value: code })));
      setCountryOptions(countries.map(({ country, code }) => ({ label: country, value: code })));
      setInvoiceType(invoiceTypes.map(({ id, description, code }) => ({ id, label: description, value: code })));
      setCurrencyCode(currencies.map(({ id, currency, code }) => ({ id, label: currency, value: code })));
      setTaxTypeOptions(taxTypes.map(({ id, description, code }) => ({ id, label: description, value: code })));
      setPaymentModeOptions(paymentModes.map(({ description, code }) => ({ label: description, value: code })));
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const onSubmit = (data) => {
    console.log("Form Data", data);
    // Handle form submission here
  };


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
    calculateSummary();
    fetchPaymentMode();
  }, [rows]);

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

  const handleOpenModal = () => {
    setOpenModal(true);
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
  const [isBuyerInfoExpanded, setBuyerInfoExpanded] = useState(false);
  const [isInvoiceDetailsInfoExpanded, setInvoiceDetailsExpanded] =
    useState(false);
  const [isProductDetailsInfoExpanded, setProductDetailsExpanded] =
    useState(false);

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
    console.log(field, index);
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
    return Object.values(row).every((value) => value !== "");
  };

  const classification = [
    { Code: "001", Description: "Breastfeeding equipment" },
    { Code: "002", Description: "Child care centres and kindergartens fees" },
    { Code: "003", Description: "Computer, smartphone or tablet" },
    { Code: "004", Description: "Consolidated e-Invoice" },
    { Code: "005", Description: "Construction materials" },
  ];

  const classificationOptions = classification.map((c) => ({
    label: c.Description,
    value: c.Code,
  }));

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
  };

  const handleValidationDateChange = (e) => {
    setValidationDateTime(e.value);
  };

  const msicBusinessActivityMapping = [
    { Code: "00000", Description: "NOT APPLICABLE" },
    { Code: "01111", Description: "Growing of maize" },
    { Code: "01112", Description: "Growing of leguminous crops" },
    { Code: "01113", Description: "Growing of oil seeds" },
  ];

  const msicCodeOptions = msicBusinessActivityMapping.map((item, index) => ({
    id: index + 1,
    label: item.Code,
    value: item.Code,
  }));

  const businessActivityOptions = msicBusinessActivityMapping.map((item) => ({
    label: item.Description,
    value: item.Description,
  }));

  const handleMsicCodeAndBusinessActivityDropdownChange = (e) => {
    const selectedCode = e.value;
    setMsicCode(selectedCode);
    const selectedDescription =
      msicBusinessActivityMapping.find((item) => item.Code === selectedCode)
        ?.Description || null;
    setBusinessActivityDesc(selectedDescription);
  };

  const handlesetBusinessActivityDescDropdownChange = (e) => {
    const selectedDescription = e.value;
    setBusinessActivityDesc(selectedDescription);
    const selectedCode =
      msicBusinessActivityMapping.find(
        (item) => item.Description === selectedDescription
      )?.Code || null;
    setMsicCode(selectedCode);
  };

  const handleSupplierSignFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setSupplierSignatureError("Please upload a file.");
      return;
    }

    if (file.size > 100 * 1024) {
      setSupplierSignatureError(
        "Image size exceeds 100kb. Please upload an image with a maximum size of 100kb."
      );
      event.target.value = null;
      return;
    }

    setSupplierDigiSign(file.name);
    setSupplierSignatureError("");
  };

  const handleDropdownChange = (e) => {
    setInvoiceCurrencyCode(e.value);
  };

  const handleStateDropdownChange = (e) => {
    console.log(e);
    // setSupplierState(e.value);
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

  // const handleClearAll = () => {
  //   setSupplierName("");
  //   setEmailAddress("");
  //   setValidationMessage("");
  //   setContactNumber("");
  //   setAddress("");
  //   setTaxIDNumber("");
  //   setCityName("");
  //   setSupplierState("");
  //   setSupplierCountry("");
  //   setPassportIdNumber("");
  //   setSstRegNumber("");
  //   setTourismRegNumber("");
  //   setMsicCode("");
  //   setBusinessActivityDesc("");
  //   setSupplierDigiSign("");
  //   setBuyerName("");
  //   setBuyerEmailAddress("");
  //   setBuyerContactNumber("");
  //   setBuyerAddress("");
  //   setBuyerCityName("");
  //   setBuyerTaxIDNumber("");
  //   setBuyerPassportIdNumber("");
  //   setBuyerSstRegNumber("");
  //   setInvoiceVersion("");
  //   setSelectedInvoiceType(null);
  //   setInvoiceCodeNumber("");
  //   setInvoiceRefNumber("");
  //   setInvoiceDateTime(null);
  //   setValidationDateTime(null);
  //   setSupplierDigiSign("");
  //   setInvoiceCurrencyCode("");
  //   setCurrencyExchangeRate("");
  //   setBillFrequency("");
  //   setBillPeriod("");
  //   setIrmbUniqueId("");
  //   setSelectedPaymentMode(null);
  //   setSelectedPaymentTerms(null);
  //   setPaymentAmount("");
  //   setBankAccNumber("");
  //   setPaymentDate("");
  //   setPaymentRefNumber("");
  //   setBillRefNumber("");
  //   setRows([
  //     {
  //       classification: "",
  //       description: "",
  //       unitPrice: "",
  //       quantity: "",
  //       taxType: "",
  //       taxRate: "",
  //       taxAmount: "",
  //       discount: "",
  //       totalAmount: "",
  //     },
  //   ]);
  // };

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

  const handleSave = async (data) => {
    console.log(data)
    // const validationErrors = validateFields();
    // setErrors(validationErrors);

    // const hasErrors = Object.values(validationErrors).some((error) => error);
    // if (!hasErrors) {
    // const payload = {
    //   supplierName,
    //   emailAddress,
    //   contactNumber,
    //   address,
    //   taxIDNumber,
    //   cityName,
    //   supplierState,
    //   supplierCountry,
    //   passportIdNumber,
    //   sstRegNumber,
    //   tourismRegNumber,
    //   msicCode,
    //   businessActivityDesc,
    //   buyerName,
    //   buyerTaxIDNumber,
    //   buyerPassportIdNumber,
    //   buyerSstRegNumber,
    //   buyerEmailAddress,
    //   buyerAddress,
    //   buyerCityName,
    //   buyerStateName,
    //   buyerCountry,
    //   buyerContactNumber,
    //   invoiceVersion,
    //   selectedInvoiceType,
    //   invoiceCodeNumber,
    //   invoiceRefNumber,
    //   invoiceDateTime,
    //   validationDateTime,
    //   supplierDigiSign,
    //   invoiceCurrencyCode,
    //   currencyExchangeRate,
    //   billFrequency,
    //   billPeriod,
    //   irbmUniqueId,
    // };

    // Save data or make API call here
    // }

    const payload = {
      supplier: {
        name: data.supplier.name,
        emailAddress: data.supplier.emailAddress,
        contactNumber: data.supplier.contactNumber,
        address: data.supplier.address,
        taxIDNumber: data.supplier.taxIDNumber,
        passportIdNumber: data.supplier.passportIdNumber,
        sstRegNumber: data.supplier.sstRegNumber,
        tourismRegNumber: data.supplier.tourismRegNumber,
        msicCode: data.supplier.msicCode,
        businessActivityDesc: data.supplier.businessActivityDesc,
        cityName: data.supplier.cityName,
        state: data.supplier.state,
        country: data.supplier.country,
      },
      buyer: {
        name: data.buyer.name,
        emailAddress: data.buyer.emailAddress,
        contactNumber: data.buyer.contactNumber,
        address: data.buyer.address,
        taxIDNumber: data.buyer.taxIDNumber,
        passportIdNumber: data.buyer.passportIdNumber,
        sstRegNumber: data.buyer.sstRegNumber,
        cityName: data.buyer.cityName,
        state: data.buyer.state,
        country: data.buyer.country,
      },
      invoice: {
        version: data.invoice.version,
        type: data.invoice.type,
        codeNumber: data.invoice.codeNumber,
        refNumber: data.invoice.refNumber,
        dateTime: data.invoice.dateTime,
        validationDateTime: data.invoice.validationDateTime,
        supplierDigiSign: data.invoice.supplierDigiSign,
        currencyCode: data.invoice.currencyCode,
        exchangeRate: data.invoice.exchangeRate,
        billFrequency: data.invoice.billFrequency,
        billPeriod: data.invoice.billPeriod,
        irbmUniqueId: data.invoice.irbmUniqueId,
      },
      payment: {
        mode: data.payment.mode,
        terms: data.payment.terms,
        amount: data.payment.amount,
        bankAccNumber: data.payment.bankAccNumber,
        date: data.payment.date,
        refNumber: data.payment.refNumber,
        billRefNumber: data.payment.billRefNumber,
      },
      productDetailsItems: data.productDetailsItems.map((item) => ({
        classification: item.classification,
        description: item.description,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        taxType: item.taxType,
        taxRate: item.taxRate,
        taxAmount: item.taxAmount,
        discount: item.discount,
        totalAmount: item.totalAmount,
      })),
      summary: {
        subtotal: data.summary.subtotal,
        amountExemptedFromTax: data.summary.amountExemptedFromTax,
        totalExcludingTax: data.summary.totalExcludingTax,
        totalIncludingTax: data.summary.totalIncludingTax,
        totalDiscount: data.summary.totalDiscount,
        netTotal: data.summary.netTotal,
      },
    };

    try {
      await post(API_ENDPOINTS.SUBMIT_INVOICE, payload);
      alert("Invoice submitted successfully!");
      handleClearAll();
    } catch (error) {
      console.error("Error submitting invoice:", error);
      alert("Failed to submit invoice. Please try again.");
    }

  };

  const handleClearAll = () => {
    methods.reset({
      supplier: {
        name: "",
        emailAddress: "",
        contactNumber: "",
        address: "",
        taxIDNumber: "",
        passportIdNumber: "",
        sstRegNumber: "",
        tourismRegNumber: "",
        msicCode: "",
        businessActivityDesc: "",
        cityName: "",
        state: "",
        country: "",
      },
      buyer: {
        name: "",
        emailAddress: "",
        contactNumber: "",
        address: "",
        taxIDNumber: "",
        passportIdNumber: "",
        sstRegNumber: "",
        cityName: "",
        state: "",
        country: "",
      },
      invoice: {
        version: "",
        type: "",
        codeNumber: "",
        refNumber: "",
        dateTime: null,
        validationDateTime: null,
        supplierDigiSign: "",
        currencyCode: "",
        exchangeRate: "",
        billFrequency: "",
        billPeriod: "",
        irbmUniqueId: "",
      },
      payment: {
        mode: "",
        terms: "",
        amount: "",
        bankAccNumber: "",
        date: null,
        refNumber: "",
        billRefNumber: "",
      },
      productDetailsItems: [
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
      ],
      summary: {
        subtotal: 0,
        amountExemptedFromTax: 0,
        totalExcludingTax: 0,
        totalIncludingTax: 0,
        totalDiscount: 0,
        netTotal: 0,
      },
    });
  };


  const handleFileUpload = (files) => {
    setUploadedFiles(files);
  };

  return (
    // <div className="parent-container">
    //   <div className="new-invoice-container">
    //     <p className="new-invoice-title">New Invoice</p>
    //   </div>
    //   <div className="flex-container">
    //     <FileUploadSection handleFileUpload={handleFileUpload} />
    //     <div style={{ flex: 7.4 }}>
    //       <p style={{ color: "#05353D", fontSize: 20, fontWeight: 400 }}>
    //         Invoice Details
    //       </p>
    //       <SupplierInfoSection
    //         isExpanded={isSupplierInfoExpanded}
    //         toggleExpand={toggleSupplierInfo}
    //         supplierName={supplierName}
    //         setSupplierName={setSupplierName}
    //         emailAddress={emailAddress}
    //         setEmailAddress={setEmailAddress}
    //         contactNumber={contactNumber}
    //         setContactNumber={setContactNumber}
    //         address={address}
    //         setAddress={setAddress}
    //         taxIDNumber={taxIDNumber}
    //         setTaxIDNumber={setTaxIDNumber}
    //         cityName={cityName}
    //         setCityName={setCityName}
    //         supplierState={supplierState}
    //         setSupplierState={setSupplierState}
    //         supplierCountry={supplierCountry}
    //         setSupplierCountry={setSupplierCountry}
    //         passportIdNumber={passportIdNumber}
    //         setPassportIdNumber={setPassportIdNumber}
    //         sstRegNumber={sstRegNumber}
    //         setSstRegNumber={setSstRegNumber}
    //         tourismRegNumber={tourismRegNumber}
    //         setTourismRegNumber={setTourismRegNumber}
    //         msicCode={msicCode}
    //         setMsicCode={setMsicCode}
    //         businessActivityDesc={businessActivityDesc}
    //         setBusinessActivityDesc={setBusinessActivityDesc}
    //         supplierDigiSign={supplierDigiSign}
    //         setSupplierDigiSign={setSupplierDigiSign}
    //         stateOptions={stateOptions}
    //         countryOptions={countryOptions}
    //         handleStateDropdownChange={handleStateDropdownChange}
    //         handleCountryDropdownChange={handleCountryDropdownChange}
    //         handleMsicCodeAndBusinessActivityDropdownChange={
    //           handleMsicCodeAndBusinessActivityDropdownChange
    //         }
    //         handlesetBusinessActivityDescDropdownChange={
    //           handlesetBusinessActivityDescDropdownChange
    //         }
    //         supplierSignatureError={supplierSignatureError}
    //         setSupplierSignatureError={setSupplierSignatureError}
    //         handleSupplierSignFileChange={handleSupplierSignFileChange}
    //         errors={errors}
    //       />
    //       <BuyerInfoSection
    //         isExpanded={isBuyerInfoExpanded}
    //         toggleExpand={toggleBuyerInfo}
    //         buyerName={buyerName}
    //         setBuyerName={setBuyerName}
    //         buyerEmailAddress={buyerEmailAddress}
    //         setBuyerEmailAddress={setBuyerEmailAddress}
    //         buyerContactNumber={buyerContactNumber}
    //         setBuyerContactNumber={setBuyerContactNumber}
    //         buyerAddress={buyerAddress}
    //         setBuyerAddress={setBuyerAddress}
    //         buyerCityName={buyerCityName}
    //         setBuyerCityName={setBuyerCityName}
    //         buyerStateName={buyerStateName}
    //         setBuyerStateName={setBuyerStateName}
    //         buyerCountry={buyerCountry}
    //         setBuyerCountry={setBuyerCountry}
    //         buyerTaxIDNumber={buyerTaxIDNumber}
    //         setBuyerTaxIDNumber={setBuyerTaxIDNumber}
    //         buyerPassportIdNumber={buyerPassportIdNumber}
    //         setBuyerPassportIdNumber={setBuyerPassportIdNumber}
    //         buyerSstRegNumber={buyerSstRegNumber}
    //         setBuyerSstRegNumber={setBuyerSstRegNumber}
    //         stateOptions={stateOptions}
    //         countryOptions={countryOptions}
    //         handleBuyerStateDropdownChange={handleBuyerStateDropdownChange}
    //         handleBuyerCountryDropdownChange={handleBuyerCountryDropdownChange}
    //         errors={errors}
    //       />
    //       <InvoiceDetailsSection
    //         isExpanded={isInvoiceDetailsInfoExpanded}
    //         toggleExpand={toggleInvoiceDetailsInfo}
    //         invoiceVersion={invoiceVersion}
    //         setInvoiceVersion={setInvoiceVersion}
    //         selectedInvoiceType={selectedInvoiceType}
    //         setSelectedInvoiceType={setSelectedInvoiceType}
    //         invoiceCodeNumber={invoiceCodeNumber}
    //         setInvoiceCodeNumber={setInvoiceCodeNumber}
    //         invoiceRefNumber={invoiceRefNumber}
    //         setInvoiceRefNumber={setInvoiceRefNumber}
    //         invoiceDateTime={invoiceDateTime}
    //         setInvoiceDateTime={setInvoiceDateTime}
    //         validationDateTime={validationDateTime}
    //         setValidationDateTime={setValidationDateTime}
    //         supplierDigiSign={supplierDigiSign}
    //         setSupplierDigiSign={setSupplierDigiSign}
    //         supplierSignatureError={supplierSignatureError}
    //         setSupplierSignatureError={setSupplierSignatureError}
    //         invoiceCurrencyCode={invoiceCurrencyCode}
    //         setInvoiceCurrencyCode={setInvoiceCurrencyCode}
    //         currencyExchangeRate={currencyExchangeRate}
    //         setCurrencyExchangeRate={setCurrencyExchangeRate}
    //         billFrequency={billFrequency}
    //         setBillFrequency={setBillFrequency}
    //         billPeriod={billPeriod}
    //         setBillPeriod={setBillPeriod}
    //         irbmUniqueId={irbmUniqueId}
    //         setIrmbUniqueId={setIrmbUniqueId}
    //         handleTypeDropdownChange={handleTypeDropdownChange}
    //         handleDropdownChange={handleDropdownChange}
    //         handleSupplierSignFileChange={handleSupplierSignFileChange}
    //         handleDateChange={handleDateChange}
    //         handleValidationDateChange={handleValidationDateChange}
    //         invoiceType={invoiceType}
    //         currencyCode={currencyCode}
    //         errors={errors}
    //       />
    //       <ProductDetailsSection
    //         isExpanded={isProductDetailsInfoExpanded}
    //         toggleExpand={toggleProductDetailsInfo}
    //         rows={rows}
    //         columns={columns}
    //         data={data}
    //         addRow={addRow}
    //         removeLastRow={removeLastRow}
    //         handleInputChange={handleInputChange}
    //         handleDropdownSelectClassificationChange={
    //           handleDropdownSelectClassificationChange
    //         }
    //         handleDropdownSelectTaxTypeChange={
    //           handleDropdownSelectTaxTypeChange
    //         }
    //         taxTypeOptions={taxTypeOptions}
    //         classificationOptions={classificationOptions}
    //       />
    //       <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
    //         <PaymentInfoSection
    //           selectedPaymentMode={selectedPaymentMode}
    //           setSelectedPaymentMode={setSelectedPaymentMode}
    //           selectedPaymentTerms={selectedPaymentTerms}
    //           setSelectedPaymentTerms={setSelectedPaymentTerms}
    //           paymentAmount={paymentAmount}
    //           setPaymentAmount={setPaymentAmount}
    //           bankAccNumber={bankAccNumber}
    //           setBankAccNumber={setBankAccNumber}
    //           paymentDate={paymentDate}
    //           setPaymentDate={setPaymentDate}
    //           paymentRefNumber={paymentRefNumber}
    //           setPaymentRefNumber={setPaymentRefNumber}
    //           billRefNumber={billRefNumber}
    //           setBillRefNumber={setBillRefNumber}
    //           paymentMode={paymentMode}
    //           handlePaymentModeDropdownChange={handlePaymentModeDropdownChange}
    //         />
    //         <SummarySection summary={summary} />
    //       </div>
    //     </div>
    //   </div>
    //   <FooterSection
    //     handleClearAll={handleClearAll}
    //     handleDelete={handleDelete}
    //     handleSave={handleSave}
    //   />
    //   <CustomModal open={openModal} handleClose={handleCloseModal} />
    //   <CustomGenerateInvoiceModal
    //     open={openGenrateInvoiceModal}
    //     handleClose={handleGenerateCloseModal}
    //     totalInvoices={totalInvoices}
    //   />
    // </div>

    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSave)}>
        <div className="parent-container">
          <div className="new-invoice-container">
            <p className="new-invoice-title">New Invoice</p>
          </div>
          <div className="flex-container">
            <FileUploadSection handleFileUpload={handleFileUpload} />
            <div style={{ flex: 7.4 }}>
              <p style={{ color: "#05353D", fontSize: 20, fontWeight: 400 }}>Invoice Details</p>
              <SupplierInfoSection
                isExpanded={isSupplierInfoExpanded}
                toggleExpand={setSupplierInfoExpanded}
                stateOptions={stateOptions}
                countryOptions={countryOptions}
                msicCodeOptions={msicCodeOptions}
                businessActivityOptions={businessActivityOptions}
              />
              <BuyerInfoSection
                isExpanded={isBuyerInfoExpanded}
                toggleExpand={setBuyerInfoExpanded}
                stateOptions={stateOptions}
                countryOptions={countryOptions}
              />
              <InvoiceDetailsSection
                isExpanded={isInvoiceDetailsInfoExpanded}
                toggleExpand={setInvoiceDetailsExpanded}
                invoiceType={invoiceType}
                currencyCode={currencyCode}
              />
              <ProductDetailsSection
                isExpanded={isProductDetailsInfoExpanded}
                toggleExpand={setProductDetailsExpanded}
                taxTypeOptions={taxTypeOptions}
                classificationOptions={classificationOptions}
                handleDropdownSelectClassificationChange={
                  handleDropdownSelectClassificationChange
                }
                handleInputChange={handleInputChange}
                data={data}
                columns={columns}
                rows={rows}
                addRow={addRow}
                removeLastRow={removeLastRow}
              />
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <PaymentInfoSection paymentMode={paymentMode} />
                <SummarySection summary={methods.getValues("summary")} />
              </div>
            </div>
          </div>
          <FooterSection
            handleClearAll={handleClearAll}
            handleDelete={handleOpenModal}
            handleSave={methods.handleSubmit(handleSave)}
          />
          <CustomModal open={openModal} handleClose={handleCloseModal} />
          <CustomGenerateInvoiceModal
            open={openGenrateInvoiceModal}
            handleClose={handleGenerateCloseModal}
            totalInvoices={15}
          />
        </div>
      </form>
    </FormProvider>
  );
}

export default UploadInvoice;
