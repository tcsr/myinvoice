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
import "./UploadInvoice.css";

import CustomModal from "../../components/CustomModal/CustomModal";
import CustomGenerateInvoiceModal from "../../components/CustomModal/CustomGenerateInvoiceModal";

import FileUpload from "../../components/FileUploadComponent/FileUpload";

function UploadInvoice() {
  const [validationMessage, setValidationMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Supplier Info
  const [supplierName, setSupplierName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [taxIDNumber, setTaxIDNumber] = useState("");
  const [passportIdNumber, setPassportIdNumber] = useState("");
  const [sstRegNumber, setSstRegNumber] = useState("");
  const [tourismRegNumber, setTourismRegNumber] = useState("");
  const [msicCode, setMsicCode] = useState("");
  const [businessActivityDesc, setBusinessActivityDesc] = useState("");

  // Buyer Info
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmailAddress, setBuyerEmailAddress] = useState("");
  const [buyerContactNumber, setBuyerContactNumber] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [buyerTaxIDNumber, setBuyerTaxIDNumber] = useState("");
  const [buyerPassportIdNumber, setBuyerPassportIdNumber] = useState("");
  const [buyerSstRegNumber, setBuyerSstRegNumber] = useState("");

  //Invoice details
  const [selectedVersion, setSelectedVersion] = useState(null);
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

  //Payment Info

  const [selectedPaymentMode, setSelectedPaymentMode] = useState(null);
  const [selectedPaymentTerms, setSelectedPaymentTerms] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [bankAccNumber, setBankAccNumber] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentRefNumber, setPaymentRefNumber] = useState("");
  const [billRefNumber, setBillRefNumber] = useState("");

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
    calculateSummary();
  }, [rows]);

  const [openModal, setOpenModal] = useState(false);
  const [openGenrateInvoiceModal, setOpenGenrateInvoiceModal] = useState(false);

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
    // if (isPreviousRowFilled(rows.length - 1)) {
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
    // } else {
    //   alert(
    //     "Please fill out all fields in the previous row before adding a new row."
    //   );
    // }
  };
  const isPreviousRowFilled = (index) => {
    const row = rows[index];
    return Object.values(row).every((value) => value !== "");
  };
  // const isFirstRowFilled = () => {
  //   const firstRow = rows[0];
  //   return Object.values(firstRow).every((value) => value !== "");
  // };

  // const removeRow = (index) => {
  //   const newRows = rows.filter((_, i) => i !== index);
  //   setRows(newRows);
  // };
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
      style: { width: "150px" },
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
      <InputText
        type="text"
        placeholder="Enter"
        style={{ width: "100%" }}
        value={row.taxType}
        onChange={(e) => handleInputChange(e, "taxType", index)}
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
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    if (validateEmail(email)) {
      setEmailAddress(email);
      setValidationMessage("");
    } else {
      setValidationMessage("Please enter a valid email address.");
    }
  };

  const invoiceVersions = [
    { label: "Version 1", value: "v1" },
    { label: "Version 2", value: "v2" },
    { label: "Version 3", value: "v3" },
  ];
  const invoiceType = [
    { label: "Type 1", value: "T1" },
    { label: "Type 2", value: "T2" },
  ];

  const paymentMode = [
    { label: "payment 1", value: "p1" },
    { label: "payment 2", value: "p2" },
    { label: "payment 3", value: "p3" },
  ];
  const paymentTerms = [
    { label: "Type 1", value: "T1" },
    { label: "Type 2", value: "T2" },
  ];

  const handleSupplierSignFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Check if file size is greater than 100kb
      if (file.size > 100 * 1024) {
        // Convert kb to bytes
        alert(
          "Image size exceeds 100kb. Please upload an image with a maximum size of 100kb."
        );
        // Reset the file input
        event.target.value = null;
        return;
      }

      setSupplierDigiSign(file.name);
    } else {
      setSupplierDigiSign("");
    }
  };

  const handleDropdownChange = (e) => {
    setSelectedVersion(e.value);
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
    setBuyerTaxIDNumber("");
    setBuyerPassportIdNumber("");
    setBuyerSstRegNumber("");

    // Invoice Details
    setSelectedVersion(null);
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

  const handleSave = () => {
    console.log("Save clicked", supplierName, emailAddress, contactNumber);
    console.log("Rows Data:", rows);
    onClick = { handleOpen };
    // Add your save logic here
  };
  const handleFileUpload = (files) => {
    setUploadedFiles(files);
  };

  return (
    <div>
      <div className="invoice-container">
        <p className="invoice-title">New Invoice</p>
      </div>
      <button onClick={handleOpenModal}>Delete Invoice</button>
      <button onClick={handleGenerateOpenModal}>Generate Invoice</button>

      <div className="flex-container">
        <div className="flex-item">
          <p className="upload-title">Upload Invoice</p>

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
          <div
            style={{
              borderBottomColor: "#E0E0E0",
              borderBottomWidth: 1,
              borderBottomStyle: "solid",
              justifyContent: "space-between",
              display: "flex",
              alignItems: "center",
            }}
            onClick={toggleSupplierInfo}
          >
            <p style={{ color: "#168AAD", fontSize: 16, fontWeight: 400 }}>
              Supplier info
            </p>
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
              <div
                style={{
                  display: "flex",
                  marginTop: 5,
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Tax Identification Number
                  </p>

                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="supplierName"
                      placeholder="Enter name"
                      value={supplierName}
                      onChange={(e) => setSupplierName(e.target.value)}
                    />
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
                    />
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
                    />
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
                  />
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
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    {" "}
                    Tax Identification Number
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="taxIDNumber"
                      placeholder="Enter name"
                      value={taxIDNumber}
                      onChange={(e) => setTaxIDNumber(e.target.value)}
                    />
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
                    />
                    {/* <i className="pi pi-check checkmark-icon"></i> */}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    {" "}
                    SST Registration Number
                  </p>

                  <div className="p-field input-with-checkmark">
                    <InputText
                      style={{ width: 290 }}
                      id="sstRegNumber"
                      placeholder="Enter"
                      value={sstRegNumber}
                      onChange={(e) => setSstRegNumber(e.target.value)}
                    />
                    {/* <i className="pi pi-check checkmark-icon"></i> */}
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
                    />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>MSIC Code</p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="msicCode"
                      placeholder="Enter"
                      value={msicCode}
                      onChange={(e) => setMsicCode(e.target.value)}
                    />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Business Activity Description
                  </p>

                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="businessActivityDesc"
                      placeholder="Enter"
                      value={businessActivityDesc}
                      onChange={(e) => setBusinessActivityDesc(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Buyers Info */}
          <div
            style={{
              borderBottomColor: "#E0E0E0",
              borderBottomWidth: 1,
              borderBottomStyle: "solid",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onClick={toggleBuyerInfo}
          >
            <p style={{ color: "#168AAD", fontSize: 16, fontWeight: 400 }}>
              Buyer info
            </p>
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
              <div
                style={{
                  display: "flex",
                  marginTop: 5,
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>Buyer Name</p>

                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="buyerName"
                      placeholder="Enter name"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                    />
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
                    />
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
                    />
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
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 5,
                  justifyContent: "space-between",
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    {" "}
                    Tax Identification Number
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="buyerTaxIDNumber"
                      placeholder="Enter name"
                      value={buyerTaxIDNumber}
                      onChange={(e) => setBuyerTaxIDNumber(e.target.value)}
                    />
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
                    />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14, paddingLeft: 4 }}>
                    {" "}
                    SST Registration Number
                  </p>

                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="BuyerSstRegNumber"
                      placeholder="Enter"
                      value={buyerSstRegNumber}
                      onChange={(e) => setBuyerSstRegNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Invoice Details */}
          <div
            style={{
              borderBottomColor: "#E0E0E0",
              borderBottomWidth: 1,
              borderBottomStyle: "solid",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onClick={toggleInvoiceDetailsInfo}
          >
            <p style={{ color: "#168AAD", fontSize: 16, fontWeight: 400 }}>
              Invoice Details
            </p>
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
              <div
                style={{
                  display: "flex",
                  marginTop: 5,
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Invoice Version
                  </p>

                  <div className="p-field">
                    <Dropdown
                      style={{ width: 290 }}
                      id="invoiceVersion"
                      value={selectedVersion}
                      options={invoiceVersions}
                      onChange={handleDropdownChange}
                      placeholder="Select"
                    />
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
                    />
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
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    {" "}
                    Original Invoice Ref. Number
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="invoiceRefNumber"
                      placeholder="Enter name"
                      value={invoiceRefNumber}
                      onChange={(e) => setInvoiceRefNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Invoice Date & Time
                  </p>
                  <div className="p-field">
                    <Calendar
                      className="custom-calendar"
                      style={{ width: 290 }}
                      id="invoiceDateTime"
                      value={invoiceDateTime}
                      onChange={handleDateChange}
                      showIcon
                      showTime
                      placeholder="Select Date & Time"
                      dateFormat="dd/mm/yy"
                    />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14, paddingLeft: 4 }}>
                    {" "}
                    Date & Time of Validation
                  </p>

                  <div className="p-field">
                    <Calendar
                      className="custom-calendar"
                      style={{ width: 290 }}
                      id="invoiceDateTime"
                      value={validationDateTime}
                      onChange={handleValidationDateChange}
                      showIcon
                      showTime
                      placeholder="Select Date & Time"
                      dateFormat="dd/mm/yy"
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
                  </div>
                  <div className="flex-item-invoice-details">
                    <p className="label">Invoice Currency code</p>
                    <div className="p-field">
                      <InputText
                        className="input-field"
                        id="invoiceCurrencyCode"
                        placeholder="Enter"
                        value={invoiceCurrencyCode}
                        onChange={(e) => setInvoiceCurrencyCode(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex-item-invoice-details">
                    <p className="label">Currency Exchange Rate</p>
                    <div className="p-field">
                      <InputText
                        className="input-field"
                        id="currencyExchangeRate"
                        placeholder="Enter"
                        value={currencyExchangeRate}
                        onChange={(e) =>
                          setCurrencyExchangeRate(e.target.value)
                        }
                      />
                    </div>
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
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    {" "}
                    Frequency of Billing
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="billFrequency"
                      placeholder="Enter"
                      value={billFrequency}
                      onChange={(e) => setBillFrequency(e.target.value)}
                    />
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
                    />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14, paddingLeft: 4 }}>
                    {" "}
                    IRBM Unique Identifier Number
                  </p>

                  <div className="p-field input-with-checkmark">
                    <InputText
                      style={{ width: 290 }}
                      id="irbmUniqueId"
                      placeholder="Enter"
                      value={irbmUniqueId}
                      onChange={(e) => setIrmbUniqueId(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            style={{
              borderBottomColor: "#E0E0E0",
              borderBottomWidth: 1,
              borderBottomStyle: "solid",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onClick={toggleProductDetailsInfo}
          >
            <p style={{ color: "#168AAD", fontSize: 16, fontWeight: 400 }}>
              Product / Service Details
            </p>
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
                    <Dropdown
                      style={{ width: "100%" }}
                      id="invoiceType"
                      value={selectedPaymentTerms}
                      options={paymentTerms}
                      onChange={handlePaymentTypeDropdownChange}
                      placeholder="Select"
                    />
                  </div>
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
      {/* <CustomModal
        open={open}
        handleClose={handleClose}
        description="Deleted Successfully"
        deleting={deleting}
        progress={progress}
      /> */}
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
