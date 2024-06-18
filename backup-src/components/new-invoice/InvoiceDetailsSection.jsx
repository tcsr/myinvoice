import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

const InvoiceDetailsSection = ({
  isExpanded,
  toggleExpand,
  invoiceType,
  currencyCode,
  handleTypeDropdownChange,
  handleDropdownChange,
  handleSupplierSignFileChange,
  handleDateChange,
  handleValidationDateChange,
  supplierSignatureError,
}) => {
  const { control, formState: { errors } } = useFormContext();

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
              <Controller
                name="invoice.version"
                control={control}
                rules={{ required: "Invoice Version is required" }}
                render={({ field }) => (
                  <InputText
                    style={{ width: 290 }}
                    id="invoiceVersion"
                    placeholder="Enter"
                    {...field}
                    className={errors.invoice?.version ? "p-invalid" : ""}
                  />
                )}
              />
              {errors.invoice?.version && (
                <small style={{ textAlign: "left" }} className="p-error">
                  {errors.invoice?.version.message}
                </small>
              )}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#212121", fontSize: 14 }}>Invoice Type</p>
            <div className="p-field">
              <Controller
                name="invoice.type"
                control={control}
                rules={{ required: "Invoice Type is required" }}
                render={({ field }) => (
                  <Dropdown
                    style={{ width: 290 }}
                    id="invoiceType"
                    {...field}
                    options={invoiceType}
                    onChange={(e) => {
                    //   handleTypeDropdownChange(e);
                      field.onChange(e.value);
                    }}
                    placeholder="Select"
                    className={errors.invoice?.type ? "p-invalid" : ""}
                  />
                )}
              />
              {errors.invoice?.type && (
                <small style={{ textAlign: "left" }} className="p-error">
                  {errors.invoice?.type.message}
                </small>
              )}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#212121", fontSize: 14 }}>
              Invoice Code/Number
            </p>
            <div className="p-field">
              <Controller
                name="invoice.codeNumber"
                control={control}
                rules={{ required: "Invoice Code/Number is required" }}
                render={({ field }) => (
                  <InputText
                    style={{ width: 290 }}
                    id="invoiceCodeNumber"
                    placeholder="Enter"
                    {...field}
                    className={errors.invoice?.codeNumber ? "p-invalid" : ""}
                  />
                )}
              />
              {errors.invoice?.codeNumber && (
                <small style={{ textAlign: "left" }} className="p-error">
                  {errors.invoice?.codeNumber.message}
                </small>
              )}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#212121", fontSize: 14 }}>
              Original Invoice Ref. Number
            </p>
            <div className="p-field">
              <Controller
                name="invoice.refNumber"
                control={control}
                rules={{ required: "Original Invoice Ref. Number is required" }}
                render={({ field }) => (
                  <InputText
                    style={{ width: 290 }}
                    id="invoiceRefNumber"
                    placeholder="Enter"
                    {...field}
                    className={errors.invoice?.refNumber ? "p-invalid" : ""}
                  />
                )}
              />
              {errors.invoice?.refNumber && (
                <small style={{ textAlign: "left" }} className="p-error">
                  {errors.invoice?.refNumber.message}
                </small>
              )}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#212121", fontSize: 14 }}>
              Invoice Date & Time
            </p>
            <div className="p-field">
              <Controller
                name="invoice.dateTime"
                control={control}
                rules={{ required: "Invoice Date & Time is required" }}
                render={({ field }) => (
                  <Calendar
                    style={{ width: 290 }}
                    id="invoiceDateTime"
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                    //   handleDateChange(e);
                      field.onChange(e.value);
                    }}
                    showIcon
                    showTime
                    placeholder="Select Date & Time"
                    dateFormat="dd/mm/yy"
                    className={errors.invoice?.dateTime ? "p-invalid" : ""}
                  />
                )}
              />
              {errors.invoice?.dateTime && (
                <small style={{ textAlign: "left" }} className="p-error">
                  {errors.invoice?.dateTime.message}
                </small>
              )}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#212121", fontSize: 14, paddingLeft: 4 }}>
              Date & Time of Validation
            </p>
            <div className="p-field">
              <Controller
                name="invoice.validationDateTime"
                control={control}
                rules={{ required: "Date & Time of Validation is required" }}
                render={({ field }) => (
                  <Calendar
                    style={{ width: 290 }}
                    id="validationDateTime"
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                    //   handleValidationDateChange(e);
                      field.onChange(e.value);
                    }}
                    showIcon
                    showTime
                    placeholder="Select Date & Time"
                    dateFormat="dd/mm/yy"
                    className={errors.invoice?.validationDateTime ? "p-invalid" : ""}
                  />
                )}
              />
              {errors.invoice?.validationDateTime && (
                <small style={{ textAlign: "left" }} className="p-error">
                  {errors.invoice?.validationDateTime.message}
                </small>
              )}
            </div>
          </div>
          <div className="flex-container-invoice-details">
            <div className="flex-item-invoice-details">
              <p className="label">Supplier’s Digital Signature</p>
              <div className="p-field custom-input">
                <Controller
                  name="invoice.supplierDigiSign"
                  control={control}
                  rules={{ required: "Supplier’s Digital Signature is required" }}
                  render={({ field }) => (
                    <>
                      <InputText
                        className="input-field-digital-sign"
                        value={field.value}
                        id="digitalSignature"
                        placeholder="Upload"
                        disabled
                      />
                      <input
                        type="file"
                        id="signatureUpload"
                        className="upload-btn"
                        onChange={(e) => {
                        //   handleSupplierSignFileChange(e);
                          field.onChange(e.target.files[0]?.name);
                        }}
                      />
                    </>
                  )}
                />
                {supplierSignatureError && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {supplierSignatureError}
                  </small>
                )}
              </div>
            </div>
            <div className="flex-item-invoice-details">
              <p className="label">Invoice Currency code</p>
              <div className="p-field">
                <Controller
                  name="invoice.currencyCode"
                  control={control}
                  rules={{ required: "Invoice Currency Code is required" }}
                  render={({ field }) => (
                    <Dropdown
                      style={{ width: 290 }}
                      id="invoiceCurrencyCode"
                      {...field}
                      options={currencyCode}
                      onChange={(e) => {
                        // handleDropdownChange(e);
                        field.onChange(e.value);
                      }}
                      placeholder="Select"
                      className={errors.invoice?.currencyCode ? "p-invalid" : ""}
                    />
                  )}
                />
                {errors.invoice?.currencyCode && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.invoice?.currencyCode.message}
                  </small>
                )}
              </div>
            </div>
            <div className="flex-item-invoice-details">
              <p className="label">Currency Exchange Rate</p>
              <div className="p-field">
                <Controller
                  name="invoice.exchangeRate"
                  control={control}
                  rules={{ required: "Currency Exchange Rate is required" }}
                  render={({ field }) => (
                    <InputText
                      style={{ width: 290 }}
                      id="currencyExchangeRate"
                      placeholder="Enter"
                      {...field}
                      className={errors.invoice?.exchangeRate ? "p-invalid" : ""}
                    />
                  )}
                />
                {errors.invoice?.exchangeRate && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.invoice?.exchangeRate.message}
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
              <Controller
                name="invoice.billFrequency"
                control={control}
                rules={{ required: "Frequency of Billing is required" }}
                render={({ field }) => (
                  <InputText
                    style={{ width: 290 }}
                    id="billFrequency"
                    placeholder="Enter name"
                    {...field}
                    className={errors.invoice?.billFrequency ? "p-invalid" : ""}
                  />
                )}
              />
              {errors.invoice?.billFrequency && (
                <small style={{ textAlign: "left" }} className="p-error">
                  {errors.invoice?.billFrequency.message}
                </small>
              )}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#212121", fontSize: 14 }}>Billing Period</p>
            <div className="p-field">
              <Controller
                name="invoice.billPeriod"
                control={control}
                rules={{ required: "Billing Period is required" }}
                render={({ field }) => (
                  <InputText
                    style={{ width: 290 }}
                    id="billPeriod"
                    placeholder="Enter"
                    {...field}
                    className={errors.invoice?.billPeriod ? "p-invalid" : ""}
                  />
                )}
              />
              {errors.invoice?.billPeriod && (
                <small style={{ textAlign: "left" }} className="p-error">
                  {errors.invoice?.billPeriod.message}
                </small>
              )}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#212121", fontSize: 14 }}>
              IRBM Unique Identifier Number
            </p>
            <div className="p-field">
              <Controller
                name="invoice.irbmUniqueId"
                control={control}
                rules={{ required: "IRBM Unique Identifier Number is required" }}
                render={({ field }) => (
                  <InputText
                    style={{ width: 290 }}
                    id="irbmUniqueId"
                    placeholder="Enter name"
                    {...field}
                    className={errors.invoice?.irbmUniqueId ? "p-invalid" : ""}
                  />
                )}
              />
              {errors.invoice?.irbmUniqueId && (
                <small style={{ textAlign: "left" }} className="p-error">
                  {errors.invoice?.irbmUniqueId.message}
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
