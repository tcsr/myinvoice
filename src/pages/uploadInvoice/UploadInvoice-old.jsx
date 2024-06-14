import React, { useState, useEffect, useRef } from "react";
import filedoc from "../../assets/tray-arrow-up.svg";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "primereact/resources/themes/saga-blue/theme.css";
import "./UploadInvoice.css";
import { API_ENDPOINTS } from "../../api/apiEndpoints";
import CustomModal from "../../components/CustomModal/CustomModal";
import CustomGenerateInvoiceModal from "../../components/CustomModal/CustomGenerateInvoiceModal";
import useApi from "../../hooks/useApi";
import FileUpload from "../../components/FileUploadComponent/FileUpload";

function UploadInvoice() {
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

  //Invoice details
  // const [selectedVersion, setSelectedVersion] = useState(null);
  const [invoiceVersion, setInvoiceVersion] = useState("");
  const [selectedInvoiceType, setSelectedInvoiceType] = useState(null);
  const [invoiceCodeNumber, setInvoiceCodeNumber] = useState("");
  const [invoiceRefNumber, setInvoiceRefNumber] = useState("");
  const [invoiceDateTime, setInvoiceDateTime] = useState(null);
  const [validationDateTime, setValidationDateTime] = useState(null);
  const [supplierDigiSign, setSupplierDigiSign] = useState("");
  const [invoiceCurrencyCode, setInvoiceCurrencyCode] = useState("");
  const [currencyExchangeRate, setCurrencyExchangeRate] = useState("");
  const [billFrequency, setBillFrequency] = useState("");
  const [billPeriod, setBillPeriod] = useState("");
  const [irbmUniqueId, setIrmbUniqueId] = useState("");

  const [supplierSignatureError, setSupplierSignatureError] = useState("");

  //Payment Info

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
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      const payment = data.map((payment) => ({
        label: payment["description"],
        value: payment["code"],
      }));

      setPaymentModeOptions(payment); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error if needed
    }
  };

  const fetchTaxType = async () => {
    try {
      const response = await get(API_ENDPOINTS.GET_CURRENCY_CODE);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();

      const tax = data.map((tax) => ({
        label: tax["Description"],
        value: tax["Code"],
      }));

      setTaxTypeOptions(tax); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error if needed
    }
  };

  const fetchCurrencyCode = async () => {
    try {
      const response = await get(API_ENDPOINTS.GET_CURRENCY_CODE);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();

      const currency = data.map((currency) => ({
        id: currency["id"],
        label: currency["currency"],
        value: currency["code"],
      }));

      setCurrencyCode(currency); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error if needed
    }
  };

  const fetchInvoiceType = async () => {
    try {
      const response = await get(API_ENDPOINTS.GET_INVOICE_TYPE);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      const invoice = data.map((invoice) => ({
        id: invoice["id"],
        label: invoice["description"],
        value: invoice["code"],
      }));

      setInvoiceType(invoice); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error if needed
    }
  };

  const fetchStateData = async () => {
    try {

      const response = await get(API_ENDPOINTS.GET_STATE_CODE);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      console.log("before", data);
      const states = data.map((state) => ({
        id: state["id"],
        label: state["state"],
        value: state["code"],
      }));
      console.log("state options", states);
      setStateOptions(states); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error if needed
    }
  };

  const fetchCountry = async () => {
    try {
      const response = await get(API_ENDPOINTS.GET_COUNTRY_CODE);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      const countries = data.map((country) => ({
        label: country["country"],
        value: country["code"],
      }));
      console.log("state options", countries);
      setCountryOptions(countries); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error if needed
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
      // const finalAmount =
      //   rowTotalAmount - (rowTotalAmount * discountRate) / 100;
      const rowDiscountAmount = rowTotalAmount * (discountRate / 100);

      subtotal += rowSubtotal;
      totalDiscount += rowDiscountAmount;
      totalIncludingTax += rowTotalAmount;
      if (taxRate === 0) {
        amountExemptedFromTax += rowSubtotal;
      }
    });

    // const amountExemptedFromTax = 0;
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
    const value = e.target.value;
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    // Calculate total amount
    const unitPrice = parseFloat(updatedRows[index].unitPrice) || 0;
    const quantity = parseFloat(updatedRows[index].quantity) || 0;
    const taxRate = parseFloat(updatedRows[index].taxRate) || 0;
    const discountRate = parseFloat(updatedRows[index].discount) || 0;

    const subtotal = unitPrice * quantity;
    const discountAmount = (subtotal * discountRate) / 100;
    const subtotalAfterDiscount = subtotal - discountAmount;
    const taxAmount = (subtotalAfterDiscount * taxRate) / 100;
    // const taxAmount = (subtotal * taxRate) / 100;
    const finalAmount = subtotalAfterDiscount + taxAmount;
    const totalAmount = subtotal + taxAmount;
    // const finalAmount = totalAmount - (totalAmount * discountRate) / 100;
    updatedRows[index].discountAmount = discountAmount.toFixed(2);
    updatedRows[index].taxAmount = taxAmount.toFixed(2);
    updatedRows[index].totalAmount = finalAmount.toFixed(2);

    setRows(updatedRows);
  };

  const handleDelete = () => {
    if (!deleting) {
      setDeleting(true);
      // Simulating deletion process with a timeout
      const interval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(interval);
            setDeleting(false);
            setTimeout(() => {
              handleClose();
              // Additional actions after deletion completion
            }, 10000); // Delay for 1 second before closing the modal
            return oldProgress;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500); // Simulated delay for progress update
    } else {
      handleClose();
      // Additional actions for canceling deletion
    }
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
    {
      Code: "001",
      Description: "Breastfeeding equipment",
    },
    {
      Code: "002",
      Description: "Child care centres and kindergartens fees",
    },
    {
      Code: "003",
      Description: "Computer, smartphone or tablet",
    },
    {
      Code: "004",
      Description: "Consolidated e-Invoice",
    },
    {
      Code: "005",
      Description:
        "Construction materials (as specified under Fourth Schedule of the Lembaga Pembangunan Industri Pembinaan Malaysia Act 1994)",
    },
  ];

  const classificationOptions = classification.map((c) => ({
    label: c.Description,
    value: c.Code,
  }));
  const handleDropdownSelectClassificationChange = (event, field, index) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = event.value;

    // Update state or data accordingly
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
    {
      field: "description",
      header: "Description",
      style: { width: "150px" },
    },
    {
      field: "unitPrice",
      header: "Unit Price",
      style: { width: "150px" },
    },
    {
      field: "quantity",
      header: "Qty",
      style: { width: "150px" },
    },
    {
      field: "taxType",
      header: "Tax Type",
      style: { width: "150px" },
    },
    {
      field: "taxRate",
      header: "Tax Rate",
      style: { width: "150px" },
    },
    {
      field: "taxAmount",
      header: "Tax Amount",
      style: { width: "150px" },
    },
    {
      field: "discount",
      header: "Discount",
      style: { width: "150px" },
    },
    {
      field: "totalAmount",
      header: "Total Amount",
      style: { width: "120px" },
    },
  ];

  const data = rows.map((row, index) => ({
    classification: (
      // <Dropdown
      //   value={row.classification}
      //   options={classificationOptions}
      //   onChange={(e) =>
      //     handleDropdownSelectClassificationChange(e, "classification", index)
      //   }
      //   placeholder="Select"
      //   style={{ width: "100%" }}
      // />
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

  const paymentTerms = [
    { label: "Type 1", value: "T1" },
    { label: "Type 2", value: "T2" },
  ];

  const msicBusinessActivityMapping = [
    {
      Code: "00000",
      Description: "NOT APPLICABLE",
      "MSIC Category Reference": "",
    },
    {
      Code: "01111",
      Description: "Growing of maize",
      "MSIC Category Reference": "A",
    },
    {
      Code: "01112",
      Description: "Growing of leguminous crops",
      "MSIC Category Reference": "A",
    },
    {
      Code: "01113",
      Description: "Growing of oil seeds",
      "MSIC Category Reference": "A",
    },
  ];

  const msicCodeOptions = msicBusinessActivityMapping.map((item) => ({
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

  // msicCodeAndBusinessActivityOptions

  const handleSupplierSignFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      // If no file is selected, set an error message and return
      setSupplierSignatureError("Please upload a file.");
      return;
    }

    // Check if file size is greater than 100kb
    if (file.size > 100 * 1024) {
      // Convert kb to bytes
      setSupplierSignatureError(
        "Image size exceeds 100kb. Please upload an image with a maximum size of 100kb."
      );
      // Reset the file input
      event.target.value = null;
      return;
    }

    // File is valid, update the digital signature and clear any error
    setSupplierDigiSign(file.name);
    setSupplierSignatureError("");
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

  const handlePaymentTypeDropdownChange = (e) => {
    setSelectedPaymentTerms(e.value);
  };

  const handleDropdownSelectTaxTypeChange = (event, field, index) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = event.value;

    // Update state or data accordingly
    setRows(updatedRows);
  };

  const handleClearAll = () => {
    console.log("Clear All clicked");
    // Add your clear all logic here
    // Supplier Info
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

    // Buyer Info
    setBuyerName("");
    setBuyerEmailAddress("");
    setBuyerContactNumber("");
    setBuyerAddress("");
    setBuyerCityName("");
    setBuyerTaxIDNumber("");
    setBuyerPassportIdNumber("");
    setBuyerSstRegNumber("");

    // Invoice Details
    setInvoiceVersion("");
    // setSelectedVersion(null);
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

    // Payment Info
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
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    // Add your cancel logic here
  };

  const validateSupplierName = (name) => {
    if (!name) {
      return "Supplier's Name is required";
    }
    if (name.length > 300) {
      return "Supplier's Name must be less than or equal to 300 characters";
    }
    return "";
  };

  const validateSupplierTIN = (tin) => {
    if (!tin) {
      return "Supplier's TIN is required";
    }
    if (tin.length !== 14) {
      return "Supplier's TIN must be exactly 14 characters";
    }
    return "";
  };

  const validateSupplierSSTRegNumber = (sstRegNumber) => {
    if (!sstRegNumber) {
      return "Supplier's SST Registration Number is required";
    }
    if (sstRegNumber.length !== 17) {
      return "Supplier's SST Registration Number must be exactly 17 characters";
    }
    // Additional validation logic if needed
    return "";
  };

  const validateSupplierTourismRegNumber = (tourismRegNumber) => {
    if (!tourismRegNumber) {
      return "Supplier's Tourism Registration Number is required";
    }
    if (tourismRegNumber.length !== 17) {
      return "Supplier's Tourism Registration Number must be exactly 17 characters";
    }
    // Additional validation logic if needed
    return "";
  };

  const validateSupplierEmail = (email) => {
    if (email && !isValidEmail(email)) {
      return "Invalid email format";
    }
    return "";
    // if (!email) {
    //   return "Email is required";
    // } else if (!isValidEmail(email)) {
    //   return "Invalid email format";
    // }
    // return ""; // No error
  };

  const validateSupplierMSICCode = (msicCode) => {
    if (!msicCode) {
      return "Supplier's MSIC Code is required";
    }
    if (msicCode.length !== 5) {
      return "Supplier's MSIC Code must be exactly 5 characters";
    }
    // Additional validation logic if needed
    return "";
  };

  const validateSupplierBusinessActivityDesc = (businessActivityDesc) => {
    if (!businessActivityDesc) {
      return "Supplier's Business Activity Description is required";
    }
    if (businessActivityDesc.length > 300) {
      return "Supplier's Business Activity Description must be less than or equal to 300 characters";
    }
    // Additional validation logic if needed
    return "";
  };

  const validateSupplierAddress = (address) => {
    if (!address) {
      return "Supplier's Address is required";
    }
    // Additional validation logic if needed
    return "";
  };

  const validateSupplierContactNumber = (contactNumber) => {
    if (!contactNumber) {
      return "Supplier's Contact Number is required";
    }
    // Validate if the contact number contains only numeric values
    if (!/^\d+$/.test(contactNumber)) {
      return "Supplier's Contact Number should contain only numeric values";
    }
    // Validate the maximum length of the contact number
    if (contactNumber.length > 20) {
      return "Supplier's Contact Number must be maximum 20 characters";
    }
    return "";
  };

  const validateSupplierTaxIDNumber = (taxIDNumber) => {
    if (!taxIDNumber) {
      return "Supplier's Tax Identification Number is required";
    }
    // Additional validation logic if needed
    return "";
  };
  const validateCityName = (cityName) => {
    if (!cityName) {
      return "City is required";
    }
  };
  const validateSupplierState = (supplierState) => {
    if (!supplierState) {
      return "State is required";
    }
  };
  const validateSupplierCountry = (supplierCountry) => {
    if (!supplierCountry) {
      return "Country is required";
    }
  };

  const validateSupplierPassportIdNumber = (passportIdNumber) => {
    if (!passportIdNumber) {
      return "Supplier's Passport/Identification Number is required";
    }
    // Additional validation logic if needed
    return "";
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    // Regular expression for basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate Buyer's Name
  const validateBuyerName = (buyerName) => {
    if (!buyerName) {
      return "Buyer's Name is required";
    }
    // Additional validation logic if needed
    return "";
  };

  // Validate Buyer's TIN
  const validateBuyerTaxIDNumber = (buyerTaxIDNumber) => {
    if (!buyerTaxIDNumber) {
      return "Buyer's TIN is required";
    }
    // Validate the length of TIN
    if (buyerTaxIDNumber.length !== 14) {
      return "Buyer's TIN must be 14 characters long";
    }
    // Additional validation logic if needed
    return "";
  };

  // Validate Buyer's Registration/Identification/Passport Number
  const validateBuyerPassportIdNumber = (buyerPassportIdNumber) => {
    if (!buyerPassportIdNumber) {
      return "Buyer's Passport/Identification Number is required";
    }
    // Validate the length of Passport/Identification Number
    if (buyerPassportIdNumber.length > 20) {
      return "Buyer's Passport/Identification Number must be maximum 20 characters long";
    }
    // Additional validation logic if needed
    return "";
  };

  // Validate Buyer's SST Registration Number
  const validateBuyerSSTRegNumber = (buyerSstRegNumber) => {
    if (!buyerSstRegNumber) {
      return "Buyer's SST Registration Number is required";
    }
    // Validate the length of SST Registration Number
    if (buyerSstRegNumber.length !== 17) {
      return "Buyer's SST Registration Number must be 17 characters long";
    }
    // Additional validation logic if needed
    return "";
  };

  // Validate Buyer's Email Address
  const validateBuyerEmailAddress = (buyerEmailAddress) => {
    // if (!buyerEmailAddress) {
    //   return "Buyer's Email Address is required";
    // }
    // Validate the format of Email Address using a regular expression
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerEmailAddress)) {
      return "Invalid Email Address format";
    }
    // Additional validation logic if needed
    return "";
  };

  // Validate Buyer's Address
  const validateBuyerAddress = (buyerAddress) => {
    if (!buyerAddress) {
      return "Buyer's Address is required";
    }
    // Additional validation logic if needed
    return "";
  };

  const validateBuyerCity = (buyerCityName) => {
    if (!buyerCityName) {
      return "Buyer's City is required";
    }
    // Additional validation logic if needed
    return "";
  };
  const validateBuyerState = (buyerStateName) => {
    if (!buyerStateName) {
      return "Buyer's State is required";
    }
    // Additional validation logic if needed
    return "";
  };

  const validateBuyerCountry = (buyerCountry) => {
    if (!buyerCountry) {
      return "Buyer's Country is required";
    }
    // Additional validation logic if needed
    return "";
  };

  // Validate Buyer's Contact Number
  const validateBuyerContactNumber = (buyerContactNumber) => {
    if (!buyerContactNumber) {
      return "Buyer's Contact Number is required";
    }
    // Validate if the contact number contains only numeric values
    if (!/^\d+$/.test(buyerContactNumber)) {
      return "Buyer's Contact Number should contain only numeric values";
    }
    // Validate the maximum length of the contact number
    if (buyerContactNumber.length > 20) {
      return "Buyer's Contact Number must be maximum 20 characters";
    }
    return "";
  };

  const validateFields = () => {
    return {
      supplierName: validateSupplierName(supplierName),
      emailAddress: validateSupplierEmail(emailAddress),
      contactNumber: validateSupplierContactNumber(contactNumber),
      address: validateSupplierAddress(address),
      taxIDNumber: validateSupplierTaxIDNumber(taxIDNumber),
      cityName: validateCityName(cityName),
      supplierState: validateSupplierState(supplierState),
      supplierCountry: validateSupplierCountry(supplierCountry),
      passportIdNumber: validateSupplierPassportIdNumber(passportIdNumber),
      sstRegNumber: validateSupplierSSTRegNumber(sstRegNumber),
      tourismRegNumber: validateSupplierTourismRegNumber(tourismRegNumber),
      msicCode: validateSupplierMSICCode(msicCode),
      businessActivityDesc:
        validateSupplierBusinessActivityDesc(businessActivityDesc),
      buyerName: validateBuyerName(buyerName),
      buyerTaxIDNumber: validateBuyerTaxIDNumber(buyerTaxIDNumber),
      buyerPassportIdNumber: validateBuyerPassportIdNumber(
        buyerPassportIdNumber
      ),
      buyerSstRegNumber: validateBuyerSSTRegNumber(buyerSstRegNumber),
      buyerEmailAddress: validateSupplierEmail(buyerEmailAddress),
      buyerAddress: validateBuyerAddress(buyerAddress),
      buyerCityName: validateBuyerCity(buyerCityName),
      buyerStateName: validateBuyerState(buyerStateName),
      buyerCountry: validateBuyerCountry(buyerCountry),
      buyerContactNumber: validateBuyerContactNumber(buyerContactNumber),
      invoiceVersion:
        !invoiceVersion || !/^[0-9]+(\.[0-9]+)*$/.test(invoiceVersion)
          ? "Invoice Version is required and should be in the format x.x"
          : null,
      selectedInvoiceType:
        !selectedInvoiceType || !/^[A-Za-z0-9]+$/.test(selectedInvoiceType)
          ? "Invoice Type is required"
          : null,
      invoiceCodeNumber:
        !invoiceCodeNumber ||
          !/^[A-Za-z0-9]+$/.test(invoiceCodeNumber) ||
          invoiceCodeNumber.length > 50
          ? "Invoice Code/Number is required and should be alphanumeric with a max length of 50"
          : null,
      invoiceDateTime: !invoiceDateTime
        ? "Invoice Date & Time is required"
        : null,
      validationDateTime: !validationDateTime
        ? "Validation Date & Time is required"
        : null,
      supplierSignatureError: !supplierDigiSign
        ? "Supplier’s Digital Signature is required"
        : null,
      invoiceCurrencyCode: !invoiceCurrencyCode
        ? "Invoice Currency Code is required"
        : null,
      currencyExchangeRate:
        !currencyExchangeRate ||
          !/^[0-9]+(\.[0-9]+)?$/.test(currencyExchangeRate)
          ? "Currency Exchange Rate is required and should be a decimal number"
          : null,
      billFrequency:
        billFrequency && billFrequency.length > 50
          ? "Frequency of Billing should have a max length of 50"
          : null,
      billPeriod:
        billPeriod && billPeriod.length > 50
          ? "Billing Period should have a max length of 50"
          : null,
      irbmUniqueId: !irbmUniqueId
        ? "IRBM Unique Identifier Number is required"
        : null,
    };
  };

  const handleSave = () => {
    const errors = validateFields();

    // Update errors state
    setErrors(errors);

    // Check if there are any errors
    const hasErrors = Object.values(errors).some((error) => error !== null);

    if (!hasErrors) {
      // Gather all fields into an object
      const payload = {
        supplierName,
        emailAddress,
        contactNumber,
        address,
        taxIDNumber,
        cityName,
        supplierState,
        supplierCountry,
        passportIdNumber,
        sstRegNumber,
        tourismRegNumber,
        msicCode,
        businessActivityDesc,
        buyerName,
        buyerTaxIDNumber,
        buyerPassportIdNumber,
        buyerSstRegNumber,
        buyerEmailAddress,
        buyerAddress,
        buyerCityName,
        buyerStateName,
        buyerCountry,
        buyerContactNumber,
        invoiceVersion,
        selectedInvoiceType,
        invoiceCodeNumber,
        invoiceDateTime,
        validationDateTime,
        supplierDigiSign,
        invoiceCurrencyCode,
        currencyExchangeRate,
        billFrequency,
        billPeriod,
        irbmUniqueId,
      };
      // Proceed with saving data or making an API call
      // Save data or make API call here
    }
  };

  const handleFileUpload = (files) => {
    setUploadedFiles(files);
  };

  const SupplierSignatureErrorMessage = ({ error }) => {
    return (
      <div className="error-message">
        {error && <span className="error-text">{error}</span>}
      </div>
    );
  };

  return (
    <div className="parent-container">
      <div className="new-invoice-container">
        <p className="new-invoice-title">New Invoice</p>
      </div>
      {/* <button onClick={handleOpenModal}>Delete Invoice</button>
      <button onClick={handleGenerateOpenModal}>Generate Invoice</button> */}
      <div className="flex-container">
        <div className="flex-item">
          <p className="upload-invoice-title">Upload Invoice</p>

          <div className="border-dashed">
            <FileUpload onFileUpload={handleFileUpload} />
          </div>

          <p className="instruction-title">Instructions</p>
          <p className="instruction-text">
            1. Ensure the invoice is clear and well-lit.
          </p>
          <p className="instruction-text">
            2. Wait for the OCR process to complete and review the extracted
            text for accuracy.
          </p>
          <p className="instruction-text">
            3. Confirm and save the extracted data. If needed, edit any
            inaccuracies manually.
          </p>
          <p className="instruction-text">
            4. Ensure the invoice is in a supported file format and free from
            any obstructions or shadows.
          </p>
        </div>
        <div style={{ flex: 7.4 }}>
          <p style={{ color: "#05353D", fontSize: 20, fontWeight: 400 }}>
            Invoice Details
          </p>
          {/* Suppliers info */}
          <div className="accordion-container" onClick={toggleSupplierInfo}>
            <p className="accordion-title-text">Supplier info</p>
            <i
              className={
                isSupplierInfoExpanded
                  ? "pi pi-chevron-down p-button-text transparent-icon expanded"
                  : "pi pi-chevron-up p-button-text transparent-icon collapsed"
              }
            />
          </div>
          {isSupplierInfoExpanded && (
            <div>
              <div className="expanded-container">
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Supplier Name
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="supplierName"
                      placeholder="Enter name"
                      value={supplierName}
                      onChange={(e) => setSupplierName(e.target.value)}
                      className={errors.supplierName ? "p-invalid" : ""}
                    />
                    {errors.supplierName && (
                      <small className="p-error p-error-message">
                        {errors.supplierName}
                      </small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Email Address
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="emailAddress"
                      placeholder="Enter"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className={errors.emailAddress ? "p-invalid" : ""}
                    />
                    {errors.emailAddress && (
                      <small className="p-error">{errors.emailAddress}</small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Contact Number
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="contactNumber"
                      placeholder="Enter"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className={errors.contactNumber ? "p-invalid" : ""}
                    />
                    {errors.contactNumber && (
                      <small className="p-error">{errors.contactNumber}</small>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 5 }}>
                <p style={{ color: "#212121", fontSize: 14 }}>Address</p>
                <div className="p-field">
                  <InputText
                    style={{ width: "99%" }}
                    id="address"
                    placeholder="Enter"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={errors.address ? "p-invalid" : ""}
                  />
                  {errors.address && (
                    <small className="p-error">{errors.address}</small>
                  )}
                </div>
              </div>

              <div className="expanded-container">
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>City Name</p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="cityName"
                      placeholder="Enter"
                      value={cityName}
                      onChange={(e) => setCityName(e.target.value)}
                      className={errors.cityName ? "p-invalid" : ""}
                    />
                    {errors.cityName && (
                      <small className="p-error">{errors.cityName}</small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>State</p>
                  <div className="p-field">
                    <Dropdown
                      style={{ width: 290 }}
                      id="supplierState"
                      value={supplierState}
                      options={stateOptions}
                      onChange={handleStateDropdownChange}
                      placeholder="Select"
                      className={errors.supplierState ? "p-invalid" : ""}
                    />
                    {errors.supplierState && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {errors.supplierState}
                      </small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>Country</p>
                  <div className="p-field">
                    <Dropdown
                      style={{ width: 290 }}
                      id="supplierCountry"
                      value={supplierCountry}
                      options={countryOptions}
                      onChange={handleCountryDropdownChange}
                      placeholder="Select"
                      className={errors.supplierCountry ? "p-invalid" : ""}
                    />
                    {errors.supplierCountry && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {errors.supplierCountry}
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <div className="expanded-container">
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Tax Identification Number
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="taxIDNumber"
                      placeholder="Enter"
                      value={taxIDNumber}
                      onChange={(e) => setTaxIDNumber(e.target.value)}
                      className={errors.taxIDNumber ? "p-invalid" : ""}
                    />
                    {errors.taxIDNumber && (
                      <small className="p-error">{errors.taxIDNumber}</small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Registration/Identification/Passport Number
                  </p>
                  <div className="p-field input-with-checkmark">
                    <InputText
                      style={{ width: 290 }}
                      id="passportIdNumber"
                      placeholder="Enter"
                      value={passportIdNumber}
                      onChange={(e) => setPassportIdNumber(e.target.value)}
                      className={errors.passportIdNumber ? "p-invalid" : ""}
                    />
                    {errors.passportIdNumber && (
                      <small className="p-error">
                        {errors.passportIdNumber}
                      </small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    SST Registration Number
                  </p>
                  <div className="p-field input-with-checkmark">
                    <InputText
                      style={{ width: 290 }}
                      id="sstRegNumber"
                      placeholder="Enter"
                      value={sstRegNumber}
                      onChange={(e) => setSstRegNumber(e.target.value)}
                      className={errors.sstRegNumber ? "p-invalid" : ""}
                    />
                    {errors.sstRegNumber && (
                      <small className="p-error">{errors.sstRegNumber}</small>
                    )}
                  </div>
                </div>
              </div>
              <div className="expanded-container">
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Tourism Registration Number
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="tourismRegNumber"
                      placeholder="Enter"
                      value={tourismRegNumber}
                      onChange={(e) => setTourismRegNumber(e.target.value)}
                      className={errors.tourismRegNumber ? "p-invalid" : ""}
                    />
                    {errors.tourismRegNumber && (
                      <small className="p-error">
                        {errors.tourismRegNumber}
                      </small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>MSIC Code</p>
                  {/* <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="msicCode"
                      placeholder="Enter"
                      value={msicCode}
                      onChange={(e) => setMsicCode(e.target.value)}
                      className={errors.msicCode ? "p-invalid" : ""}
                    />
                    {errors.msicCode && (
                      <small className="p-error">{errors.msicCode}</small>
                    )}
                  </div> */}
                  <div className="p-field">
                    <Dropdown
                      style={{ width: 290 }}
                      id="msicCode"
                      value={msicCode}
                      options={msicCodeOptions}
                      onChange={handleMsicCodeAndBusinessActivityDropdownChange}
                      placeholder="Select"
                      className={errors.msicCode ? "p-invalid" : ""}
                      filter
                      filterBy="label"
                    />
                    {errors.msicCode && (
                      <small className="p-error">{errors.msicCode}</small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Business Activity Description
                  </p>
                  <div className="p-field">
                    <Dropdown
                      style={{ width: 290 }}
                      id="businessActivityDesc"
                      value={businessActivityDesc}
                      options={businessActivityOptions}
                      onChange={handlesetBusinessActivityDescDropdownChange}
                      placeholder="Select"
                      className={errors.businessActivityDesc ? "p-invalid" : ""}
                      filter
                      filterBy="label"
                    />
                    {errors.businessActivityDesc && (
                      <small className="p-error">
                        {errors.businessActivityDesc}
                      </small>
                    )}
                  </div>
                  {/* <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="businessActivityDesc"
                      placeholder="Enter"
                      value={businessActivityDesc}
                      onChange={(e) => setBusinessActivityDesc(e.target.value)}
                      className={errors.businessActivityDesc ? "p-invalid" : ""}
                    />
                    {errors.businessActivityDesc && (
                      <small className="p-error">
                        {errors.businessActivityDesc}
                      </small>
                    )}
                  </div> */}
                </div>
              </div>
            </div>
          )}

          {/* Buyers Info */}
          <div className="accordion-container" onClick={toggleBuyerInfo}>
            <p className="accordion-title-text">Buyer info</p>
            <i
              className={
                isBuyerInfoExpanded
                  ? "pi pi-chevron-down p-button-text transparent-icon expanded"
                  : "pi pi-chevron-up p-button-text transparent-icon collapsed"
              }
            />
          </div>
          {isBuyerInfoExpanded && (
            <div>
              <div className="expanded-container">
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>Buyer Name</p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="buyerName"
                      placeholder="Enter name"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className={errors.buyerName ? "p-invalid" : ""}
                    />
                    {errors.buyerName && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {errors.buyerName}
                      </small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Email Address
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="buyerEmailAddress"
                      placeholder="Enter"
                      value={buyerEmailAddress}
                      onChange={(e) => setBuyerEmailAddress(e.target.value)}
                      className={errors.buyerEmailAddress ? "p-invalid" : ""}
                    />
                    {errors.buyerEmailAddress && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {errors.buyerEmailAddress}
                      </small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Contact Number
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="buyerContactNumber"
                      placeholder="Enter"
                      value={buyerContactNumber}
                      onChange={(e) => setBuyerContactNumber(e.target.value)}
                      className={errors.buyerContactNumber ? "p-invalid" : ""}
                    />
                    {errors.buyerContactNumber && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {errors.buyerContactNumber}
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: "#212121", fontSize: 14 }}>Address</p>
                <div className="p-field">
                  <InputText
                    style={{ width: "99%" }}
                    id="buyerAddress"
                    placeholder="Enter"
                    value={buyerAddress}
                    onChange={(e) => setBuyerAddress(e.target.value)}
                    className={errors.buyerAddress ? "p-invalid" : ""}
                  />
                  {errors.buyerAddress && (
                    <small style={{ textAlign: "left" }} className="p-error">
                      {errors.buyerAddress}
                    </small>
                  )}
                </div>
              </div>
              <div className="expanded-container">
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>City Name</p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="buyerCityName"
                      placeholder="Enter"
                      value={buyerCityName}
                      onChange={(e) => setBuyerCityName(e.target.value)}
                      className={errors.buyerCityName ? "p-invalid" : ""}
                    />
                    {errors.buyerCityName && (
                      <small className="p-error">{errors.buyerCityName}</small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>State</p>
                  <div className="p-field">
                    <Dropdown
                      style={{ width: 290 }}
                      id="buyerStateName"
                      value={buyerStateName}
                      options={stateOptions}
                      onChange={handleBuyerStateDropdownChange}
                      placeholder="Select"
                      className={errors.buyerStateName ? "p-invalid" : ""}
                    />
                    {errors.buyerStateName && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {errors.buyerStateName}
                      </small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>Country</p>
                  <div className="p-field">
                    <Dropdown
                      style={{ width: 290 }}
                      id="buyerCountry"
                      value={buyerCountry}
                      options={countryOptions}
                      onChange={handleBuyerCountryDropdownChange}
                      placeholder="Select"
                      className={errors.buyerCountry ? "p-invalid" : ""}
                    />
                    {errors.buyerCountry && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {errors.buyerCountry}
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <div className="expanded-container">
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Tax Identification Number
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="buyerTaxIDNumber"
                      placeholder="Enter name"
                      value={buyerTaxIDNumber}
                      onChange={(e) => setBuyerTaxIDNumber(e.target.value)}
                      className={errors.buyerTaxIDNumber ? "p-invalid" : ""}
                    />
                    {errors.buyerTaxIDNumber && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {errors.buyerTaxIDNumber}
                      </small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Registration/Identification/Passport Number
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="buyerPassportIdNumber"
                      placeholder="Enter"
                      value={buyerPassportIdNumber}
                      onChange={(e) => setBuyerPassportIdNumber(e.target.value)}
                      className={
                        errors.buyerPassportIdNumber ? "p-invalid" : ""
                      }
                    />
                    {errors.buyerPassportIdNumber && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {errors.buyerPassportIdNumber}
                      </small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14, paddingLeft: 4 }}>
                    SST Registration Number
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="buyerSstRegNumber"
                      placeholder="Enter"
                      value={buyerSstRegNumber}
                      onChange={(e) => setBuyerSstRegNumber(e.target.value)}
                      className={errors.buyerSstRegNumber ? "p-invalid" : ""}
                    />
                    {errors.buyerSstRegNumber && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {errors.buyerSstRegNumber}
                      </small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Invoice Details */}
          <div
            className="accordion-container"
            onClick={toggleInvoiceDetailsInfo}
          >
            <p className="accordion-title-text">Invoice Details</p>
            <i
              className={
                isInvoiceDetailsInfoExpanded
                  ? "pi pi-chevron-down p-button-text transparent-icon expanded"
                  : "pi pi-chevron-up p-button-text transparent-icon collapsed"
              }
            />
          </div>
          {isInvoiceDetailsInfoExpanded && (
            <div>
              <div className="expanded-container">
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Invoice Version
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="invoiceVersion"
                      placeholder="Enter"
                      value={invoiceVersion}
                      onChange={(e) => setInvoiceVersion(e.target.value)}
                      className={errors.invoiceVersion ? "p-invalid" : ""}
                    />
                    {errors.invoiceVersion && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {errors.invoiceVersion}
                      </small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>Invoice Type</p>
                  <div className="p-field">
                    <Dropdown
                      style={{ width: 290 }}
                      id="invoiceType"
                      value={selectedInvoiceType}
                      options={invoiceType}
                      onChange={handleTypeDropdownChange}
                      placeholder="Select"
                      className={errors.selectedInvoiceType ? "p-invalid" : ""}
                    />
                    {errors.selectedInvoiceType && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {errors.selectedInvoiceType}
                      </small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Invoice Code/Number
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="invoiceCodeNumber"
                      placeholder="Enter"
                      value={invoiceCodeNumber}
                      onChange={(e) => setInvoiceCodeNumber(e.target.value)}
                      className={errors.invoiceCodeNumber ? "p-invalid" : ""}
                    />
                    {errors.invoiceCodeNumber && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {errors.invoiceCodeNumber}
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <div className="expanded-container">
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Original Invoice Ref. Number
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="invoiceRefNumber"
                      placeholder="Enter name"
                      value={invoiceRefNumber}
                      onChange={(e) => setInvoiceRefNumber(e.target.value)}
                      className={errors.invoiceRefNumber ? "p-invalid" : ""}
                    />
                    {errors.invoiceRefNumber && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {errors.invoiceRefNumber}
                      </small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Invoice Date & Time
                  </p>
                  <div className="p-field">
                    <Calendar
                      style={{ width: 290 }}
                      id="invoiceDateTime"
                      value={invoiceDateTime}
                      onChange={handleDateChange}
                      showIcon
                      showTime
                      placeholder="Select Date & Time"
                      dateFormat="dd/mm/yy"
                      className={errors.invoiceDateTime ? "p-invalid" : ""}
                    />
                    {errors.invoiceDateTime && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {errors.invoiceDateTime}
                      </small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14, paddingLeft: 4 }}>
                    Date & Time of Validation
                  </p>
                  <div className="p-field">
                    <Calendar
                      style={{ width: 290 }}
                      id="validationDateTime"
                      value={validationDateTime}
                      onChange={handleValidationDateChange}
                      showIcon
                      showTime
                      placeholder="Select Date & Time"
                      dateFormat="dd/mm/yy"
                      className={errors.validationDateTime ? "custom-calendar p-invalid" : "custom-calendar"}
                    />
                    {errors.validationDateTime && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {errors.validationDateTime}
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <div className="expanded-container">
                <div className="flex-container-invoice-details">
                  <div className="flex-item-invoice-details">
                    <p className="label">Supplier’s Digital Signature</p>
                    <div className="p-field custom-input">
                      <InputText
                        className="input-field-digital-sign"
                        value={supplierDigiSign}
                        id="digitalSignature"
                        placeholder="Upload"
                        disabled
                      />
                      <input
                        type="file"
                        id="signatureUpload"
                        className="upload-btn"
                        onChange={handleSupplierSignFileChange}
                      />
                    </div>

                    {errors.supplierDigiSignError && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {errors.supplierDigiSignError}
                      </small>
                    )}

                    {/* Display supplierSignatureError here */}
                    {supplierSignatureError && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {supplierSignatureError}
                      </small>
                    )}
                  </div>

                  <div className="flex-item-invoice-details">
                    <p className="label">Invoice Currency code</p>
                    <div className="p-field">
                      <Dropdown
                        style={{ width: 290 }}
                        id="invoiceCurrencyCode"
                        value={invoiceCurrencyCode}
                        options={currencyCode}
                        onChange={handleDropdownChange}
                        placeholder="Select"
                        className={
                          errors.invoiceCurrencyCode ? "p-invalid" : ""
                        }
                      />
                      {errors.invoiceCurrencyCode && (
                        <small
                          style={{ textAlign: "left" }}
                          className="p-error"
                        >
                          {errors.invoiceCurrencyCode}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="flex-item-invoice-details">
                    <p className="label">Currency Exchange Rate</p>
                    <div className="p-field">
                      <InputText
                        style={{ width: 290 }}
                        id="currencyExchangeRate"
                        placeholder="Enter"
                        value={currencyExchangeRate}
                        onChange={(e) =>
                          setCurrencyExchangeRate(e.target.value)
                        }
                        className={
                          errors.currencyExchangeRate ? "p-invalid" : ""
                        }
                      />
                      {errors.currencyExchangeRate && (
                        <small
                          style={{ textAlign: "left" }}
                          className="p-error"
                        >
                          {errors.currencyExchangeRate}
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="expanded-container">
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Frequency of Billing
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="billFrequency"
                      placeholder="Enter"
                      value={billFrequency}
                      onChange={(e) => setBillFrequency(e.target.value)}
                      className={errors.billFrequency ? "p-invalid" : ""}
                    />
                    {errors.billFrequency && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {errors.billFrequency}
                      </small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Billing Period
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="billPeriod"
                      placeholder="Enter"
                      value={billPeriod}
                      onChange={(e) => setBillPeriod(e.target.value)}
                      className={errors.billPeriod ? "p-invalid" : ""}
                    />
                    {errors.billPeriod && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {errors.billPeriod}
                      </small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14, paddingLeft: 4 }}>
                    IRBM Unique Identifier Number
                  </p>
                  <div className="p-field input-with-checkmark">
                    <InputText
                      style={{ width: 290 }}
                      id="irbmUniqueId"
                      placeholder="Enter"
                      value={irbmUniqueId}
                      onChange={(e) => setIrmbUniqueId(e.target.value)}
                      className={errors.irbmUniqueId ? "p-invalid" : ""}
                    />
                    {errors.irbmUniqueId && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {errors.irbmUniqueId}
                      </small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Product / Service Details */}
          <div
            className="accordion-container"
            onClick={toggleProductDetailsInfo}
          >
            <p className="accordion-title-text">Product / Service Details</p>
            <i
              className={
                isProductDetailsInfoExpanded
                  ? "pi pi-chevron-down p-button-text transparent-icon expanded"
                  : "pi pi-chevron-up p-button-text transparent-icon collapsed"
              }
            />
          </div>
          {isProductDetailsInfoExpanded && (
            <div>
              <DataTable
                value={data}
                scrollable
                style={{ width: "100%", overflowX: "auto", fontSize: "0.9rem" }}
                className="data-table-styles"
              >
                {columns.map((col, index) => (
                  <Column
                    key={index}
                    field={col.field}
                    header={col.header}
                    style={col.style}
                  />
                ))}
              </DataTable>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p
                  style={{ color: "#1E6091", fontSize: 14, cursor: "pointer" }}
                  onClick={addRow}
                >
                  Add Invoice Line
                </p>
                {rows.length > 1 && (
                  <p
                    style={{
                      color: "#FF5252",
                      fontSize: 14,
                      cursor: "pointer",
                    }}
                    onClick={removeLastRow}
                  >
                    Remove Invoice Line
                  </p>
                )}
              </div>
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              marginTop: 15,
            }}
          >
            <div style={{ flex: 5.5 }}>
              <div
                style={{
                  borderBottomColor: "#E0E0E0",
                  borderBottomWidth: 1,
                  borderBottomStyle: "solid",
                }}
              >
                <p style={{ color: "#168AAD", fontSize: 16, fontWeight: 400 }}>
                  Payment Info
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 5,
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div style={{ width: "33%" }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>Payment Mode</p>

                  <div className="p-field">
                    <Dropdown
                      style={{ width: "100%" }}
                      id="invoiceVersion"
                      value={selectedPaymentMode}
                      options={paymentMode}
                      onChange={handlePaymentModeDropdownChange}
                      placeholder="Select"
                    />
                  </div>
                </div>
                <div style={{ width: "33%" }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Payment Terms
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: "100%" }}
                      id="selectedPaymentTerms"
                      placeholder="Enter"
                      value={selectedPaymentTerms}
                      onChange={(e) => setSelectedPaymentTerms(e.target.value)}
                    />
                  </div>
                  {/* <div className="p-field">
                    <Dropdown
                      style={{ width: "100%" }}
                      id="invoiceType"
                      value={selectedPaymentTerms}
                      options={paymentTerms}
                      onChange={handlePaymentTypeDropdownChange}
                      placeholder="Select"
                    />
                  </div> */}
                </div>
                <div style={{ width: "33%" }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Payment Amount
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: "100%" }}
                      id="paymentAmount"
                      placeholder="Enter"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 5,
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div style={{ width: "100%" }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Bank Acc. Number
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: "100%" }}
                      id="bankAccNumber"
                      placeholder="Enter"
                      value={bankAccNumber}
                      onChange={(e) => setBankAccNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 5,
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div style={{ width: "33%" }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>Payment Date</p>

                  <div className="p-field">
                    <InputText
                      style={{ width: "100%" }}
                      id="invoiceCodeNumber"
                      placeholder="Enter"
                      value={paymentDate}
                      onChange={(e) => setPaymentDate(e.target.value)}
                    />
                  </div>
                </div>
                <div style={{ width: "33%" }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Payment Ref. Number
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: "100%" }}
                      id="paymentRefNumber"
                      placeholder="Enter"
                      value={paymentRefNumber}
                      onChange={(e) => setPaymentRefNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div style={{ width: "33%" }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Bill Ref. Number
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: "100%" }}
                      id="billRefNumber"
                      placeholder="Enter"
                      value={billRefNumber}
                      onChange={(e) => setBillRefNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                flex: 4.5,
                backgroundColor: "#FAFAFA",
                padding: "0 16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottomColor: "#E0E0E0",
                  borderBottomWidth: 1,
                  borderBottomStyle: "solid",
                  padding: "8px 0",
                }}
              >
                <p style={{ color: "#616161", fontSize: 14, fontWeight: 400 }}>
                  Subtotal
                </p>
                <p style={{ color: "#616161", fontSize: 14, fontWeight: 400 }}>
                  ${summary.subtotal.toFixed(2)}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottomColor: "#E0E0E0",
                  borderBottomWidth: 1,
                  borderBottomStyle: "solid",
                  padding: "8px 0",
                }}
              >
                <p style={{ color: "#616161", fontSize: 14, fontWeight: 400 }}>
                  Amount Exempted from Tax
                </p>
                <p style={{ color: "#616161", fontSize: 14, fontWeight: 400 }}>
                  ${summary.amountExemptedFromTax.toFixed(2)}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottomColor: "#E0E0E0",
                  borderBottomWidth: 1,
                  borderBottomStyle: "solid",
                  padding: "8px 0",
                }}
              >
                <p style={{ color: "#616161", fontSize: 14, fontWeight: 400 }}>
                  Total Excluding Tax
                </p>
                <p style={{ color: "#616161", fontSize: 14, fontWeight: 400 }}>
                  ${summary.totalExcludingTax.toFixed(2)}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottomColor: "#E0E0E0",
                  borderBottomWidth: 1,
                  borderBottomStyle: "solid",
                  padding: "8px 0",
                }}
              >
                <p style={{ color: "#616161", fontSize: 14, fontWeight: 400 }}>
                  Total Including Tax
                </p>
                <p style={{ color: "#616161", fontSize: 14, fontWeight: 400 }}>
                  ${summary.totalIncludingTax.toFixed(2)}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottomColor: "#E0E0E0",
                  borderBottomWidth: 1,
                  borderBottomStyle: "solid",
                  padding: "8px 0",
                }}
              >
                <p style={{ color: "#616161", fontSize: 14, fontWeight: 400 }}>
                  Discount
                </p>
                <p style={{ color: "#FF5252", fontSize: 14, fontWeight: 400 }}>
                  ${summary.totalDiscount.toFixed(2)}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                }}
              >
                <p style={{ color: "#616161", fontSize: 14, fontWeight: 400 }}>
                  Net Total
                </p>
                <p style={{ color: "#616161", fontSize: 24, fontWeight: 400 }}>
                  ${summary.netTotal.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          borderTopColor: "#E0E0E0",
          borderTopWidth: 1,
          borderTopStyle: "solid",
          marginTop: 20,
        }}
      >
        <div
          style={{ flex: 5, justifyContent: "center", alignItems: "center" }}
        >
          <p
            style={{ color: "#1E6091", fontSize: 14, cursor: "pointer" }}
            onClick={handleClearAll}
          >
            Clear All
          </p>
        </div>
        <div
          style={{ flex: 5, justifyContent: "center", alignItems: "center" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <p
              style={{
                color: "#1E6091",
                fontSize: 14,
                cursor: "pointer",
                marginRight: "0.5rem",
              }}
              // onClick={handleCancel}
              onClick={handleDelete}
            >
              Cancel
            </p>
            <Button
              label="Save"
              rounded
              severity="primary"
              style={{ margin: "0.5rem", backgroundColor: "#1E6091" }}
              onClick={handleSave}
            />
          </div>
        </div>
      </div>

      <CustomModal open={openModal} handleClose={handleCloseModal} />
      <CustomGenerateInvoiceModal
        open={openGenrateInvoiceModal}
        handleClose={handleGenerateCloseModal}
        totalInvoices={totalInvoices}
      />
    </div>
  );
}

export default UploadInvoice;
