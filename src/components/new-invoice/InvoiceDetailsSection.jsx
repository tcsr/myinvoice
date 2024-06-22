import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
// Utility function to handle input change and clear error
const handleInputChange =
  (setter, field, errors, setErrors, validateNumeric) => (e) => {
    const value = e.target.value;
    setter(value);

    if (field === "currencyExchangeRate") {
      const isValidNumber = validateNumeric(value);
      if (!isValidNumber) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: "Currency Exchange Rate must be numeric",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: null,
        }));
      }
    } else if (errors[field]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: null,
      }));
    }
  };

// Utility function to handle dropdown change and clear error
const handleDropdownChange = (setter, field, errors, setErrors) => (e) => {
  setter(e.value);
  if (errors[field]) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: null,
    }));
  }
};

// Validation function for numeric values
const validateNumeric = (value) => {
  return /^\d+(\.\d+)?$/.test(value);
};
const handleDateChange = (value) => {
  setInvoiceDateTime(value); // Update state with the selected date/time object
  if (errors.invoiceDateTime) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      invoiceDateTime: null, // Clear error if there was one
    }));
  }
};

const handleValidationDateChange = (value) => {
  setValidationDateTime(value); // Update state with the selected date/time object
  if (errors.validationDateTime) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      validationDateTime: null, // Clear error if there was one
    }));
  }
};

const InvoiceDetailsSection = ({
  isExpanded,
  toggleExpand,
  invoiceVersion,
  setInvoiceVersion,
  selectedInvoiceType,
  setSelectedInvoiceType,
  invoiceCodeNumber,
  setInvoiceCodeNumber,
  invoiceRefNumber,
  setInvoiceRefNumber,
  invoiceDateTime,
  setInvoiceDateTime,
  validationDateTime,
  setValidationDateTime,
  supplierDigiSign,
  setSupplierDigiSign,
  supplierSignatureError,
  setSupplierSignatureError,
  invoiceCurrencyCode,
  setInvoiceCurrencyCode,
  currencyExchangeRate,
  setCurrencyExchangeRate,
  billFrequency,
  setBillFrequency,
  billPeriod,
  setBillPeriod,
  irbmUniqueId,
  setIrmbUniqueId,
  handleTypeDropdownChange,
  handleDropdownChange,
  handleSupplierSignFileChange,
  handleDateChange,
  handleValidationDateChange,
  invoiceType,
  currencyCode,
  calendarRef,
  errors,
  setErrors,
}) => {
  // const [supplierSignatureError, setSupplierSignatureError] = useState("");
  return (
    <div>
      <div className="accordion-container" onClick={toggleExpand}>
        <p className="accordion-title-text">Invoice Details</p>
        <i
          className={
            isExpanded
              ? "pi pi-chevron-down p-button-text transparent-icon expanded"
              : "pi pi-chevron-up p-button-text transparent-icon collapsed"
          }
        />
      </div>
      {isExpanded && (
        <div className="expanded-container">
          <div style={{ flex: 1 }}>
            <p style={{ color: "#212121", fontSize: 14 }}>Invoice Version</p>
            <div className="p-field">
              <InputText
                style={{ width: 290 }}
                id="invoiceVersion"
                placeholder="Enter"
                value={invoiceVersion}
                onChange={handleInputChange(
                  setInvoiceVersion,
                  "invoiceVersion",
                  errors,
                  setErrors,
                  validateNumeric
                )}
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
                // onChange={handleDropdownChange(
                //   setSelectedInvoiceType,
                //   "selectedInvoiceType",
                //   errors,
                //   setErrors
                // )}
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
                onChange={handleInputChange(
                  setInvoiceCodeNumber,
                  "invoiceCodeNumber",
                  errors,
                  setErrors,
                  validateNumeric
                )}
                className={errors.invoiceCodeNumber ? "p-invalid" : ""}
              />
              {errors.invoiceCodeNumber && (
                <small style={{ textAlign: "left" }} className="p-error">
                  {errors.invoiceCodeNumber}
                </small>
              )}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#212121", fontSize: 14 }}>
              Original Invoice Ref. Number
            </p>
            <div className="p-field">
              <InputText
                style={{ width: 290 }}
                id="invoiceRefNumber"
                placeholder="Enter"
                value={invoiceRefNumber}
                onChange={handleInputChange(
                  setInvoiceRefNumber,
                  "invoiceRefNumber",
                  errors,
                  setErrors,
                  validateNumeric
                )}
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
                ref={calendarRef}
                style={{ width: 290 }}
                id="invoiceDateTime"
                value={invoiceDateTime}
                onChange={handleDateChange}
                showIcon
                showTime
                placeholder="Select Date & Time"
                dateFormat="dd/mm/yy"
                className={errors.invoiceDateTime ? "p-invalid" : ""}
                appendTo={"self"}
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
                ref={calendarRef}
                style={{ width: 290 }}
                id="validationDateTime"
                value={validationDateTime}
                onChange={handleValidationDateChange}
                showIcon
                showTime
                placeholder="Select Date & Time"
                dateFormat="dd/mm/yy"
                className={errors.validationDateTime ? "p-invalid" : ""}
                appendTo={"self"}
              />
              {errors.validationDateTime && (
                <small style={{ textAlign: "left" }} className="p-error">
                  {errors.validationDateTime}
                </small>
              )}
            </div>
          </div>
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
              {errors.supplierDigiSign && (
                <small style={{ textAlign: "left" }} className="p-error">
                  {errors.supplierDigiSign}
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
                  // onChange={handleDropdownChange(
                  //   setInvoiceCurrencyCode,
                  //   "invoiceCurrencyCode",
                  //   errors,
                  //   setErrors
                  // )}
                  onChange={handleDropdownChange}
                  placeholder="Select"
                  className={errors.invoiceCurrencyCode ? "p-invalid" : ""}
                />
                {errors.invoiceCurrencyCode && (
                  <small style={{ textAlign: "left" }} className="p-error">
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
                  onChange={handleInputChange(
                    setCurrencyExchangeRate,
                    "currencyExchangeRate",
                    errors,
                    setErrors,
                    validateNumeric
                  )}
                  className={errors.currencyExchangeRate ? "p-invalid" : ""}
                />
                {errors.currencyExchangeRate && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.currencyExchangeRate}
                  </small>
                )}
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#212121", fontSize: 14 }}>
              Frequency of Billing
            </p>
            <div className="p-field">
              <InputText
                style={{ width: 290 }}
                id="billFrequency"
                placeholder="Enter name"
                value={billFrequency}
                onChange={handleInputChange(
                  setBillFrequency,
                  "billFrequency",
                  errors,
                  setErrors,
                  validateNumeric
                )}
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
            <p style={{ color: "#212121", fontSize: 14 }}>Billing Period</p>
            <div className="p-field">
              <InputText
                style={{ width: 290 }}
                id="billPeriod"
                placeholder="Enter"
                value={billPeriod}
                onChange={handleInputChange(
                  setBillPeriod,
                  "billPeriod",
                  errors,
                  setErrors,
                  validateNumeric
                )}
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
            <p style={{ color: "#212121", fontSize: 14 }}>
              IRBM Unique Identifier Number
            </p>
            <div className="p-field">
              <InputText
                style={{ width: 290 }}
                id="irbmUniqueId"
                placeholder="Enter name"
                value={irbmUniqueId}
                onChange={handleInputChange(
                  setIrmbUniqueId,
                  "irbmUniqueId",
                  errors,
                  setErrors,
                  validateNumeric
                )}
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
      )}
    </div>
  );
};

export default InvoiceDetailsSection;
