import React from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

const PaymentInfoSection = ({
  selectedPaymentMode,
  setSelectedPaymentMode,
  selectedPaymentTerms,
  setSelectedPaymentTerms,
  paymentAmount,
  setPaymentAmount,
  bankAccNumber,
  setBankAccNumber,
  paymentDate,
  setPaymentDate,
  paymentRefNumber,
  setPaymentRefNumber,
  billRefNumber,
  setBillRefNumber,
  paymentMode,
  handlePaymentModeDropdownChange,
  errors = {},
}) => {
  return (
    <div className="payment-info-section equal-width border-none">
      <p className="section-title mt-0">Payment Info</p>
      <div className="payment-info-grid">
        <div className="payment-info-item">
          <label htmlFor="paymentMode">Payment Mode</label>
          <Dropdown
            id="paymentMode"
            value={selectedPaymentMode}
            options={paymentMode}
            onChange={handlePaymentModeDropdownChange}
            placeholder="Select"
            style={{ width: "100%" }}
            className={errors.paymentMode ? "p-invalid" : ""}
          />
          {errors.paymentMode && (
            <small style={{ textAlign: "left" }} className="p-error">
              {errors.paymentMode}
            </small>
          )}
        </div>
        <div className="payment-info-item">
          <label htmlFor="paymentTerms">Payment Terms</label>
          <InputText
            id="paymentTerms"
            value={selectedPaymentTerms}
            onChange={(e) => setSelectedPaymentTerms(e.target.value)}
            placeholder="Enter"
            style={{ width: "100%" }}
            className={errors.paymentTerms ? "p-invalid" : ""}
          />
          {errors.paymentTerms && (
            <small style={{ textAlign: "left" }} className="p-error">
              {errors.paymentTerms}
            </small>
          )}
        </div>
        <div className="payment-info-item">
          <label htmlFor="paymentAmount">Payment Amount</label>
          <InputText
            id="paymentAmount"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            placeholder="Enter"
            style={{ width: "100%" }}
            className={errors.paymentAmount ? "p-invalid" : ""}
          />
          {errors.paymentAmount && (
            <small style={{ textAlign: "left" }} className="p-error">
              {errors.paymentAmount}
            </small>
          )}
        </div>
        <div className="payment-info-item">
          <label htmlFor="bankAccNumber">Bank Acc. Number</label>
          <InputText
            id="bankAccNumber"
            value={bankAccNumber}
            onChange={(e) => setBankAccNumber(e.target.value)}
            placeholder="Enter"
            style={{ width: "100%" }}
            className={errors.bankAccNumber ? "p-invalid" : ""}
          />
          {errors.bankAccNumber && (
            <small style={{ textAlign: "left" }} className="p-error">
              {errors.bankAccNumber}
            </small>
          )}
        </div>
        <div className="payment-info-item">
          <label htmlFor="paymentDate">Payment Date</label>
          <Calendar
            id="paymentDate"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.value)}
            placeholder="Enter"
            showIcon
            dateFormat="dd/mm/yy"
            style={{ width: "100%" }}
            className={errors.paymentDate ? "p-invalid" : ""}
          />
          {errors.paymentDate && (
            <small style={{ textAlign: "left" }} className="p-error">
              {errors.paymentDate}
            </small>
          )}
        </div>
        <div className="payment-info-item">
          <label htmlFor="paymentRefNumber">Payment Ref. Number</label>
          <InputText
            id="paymentRefNumber"
            value={paymentRefNumber}
            onChange={(e) => setPaymentRefNumber(e.target.value)}
            placeholder="Enter"
            style={{ width: "100%" }}
            className={errors.paymentRefNumber ? "p-invalid" : ""}
          />
          {errors.paymentRefNumber && (
            <small style={{ textAlign: "left" }} className="p-error">
              {errors.paymentRefNumber}
            </small>
          )}
        </div>
        <div className="payment-info-item">
          <label htmlFor="billRefNumber">Bill Ref. Number</label>
          <InputText
            id="billRefNumber"
            value={billRefNumber}
            onChange={(e) => setBillRefNumber(e.target.value)}
            placeholder="Enter"
            style={{ width: "100%" }}
            className={errors.billRefNumber ? "p-invalid" : ""}
          />
          {errors.billRefNumber && (
            <small style={{ textAlign: "left" }} className="p-error">
              {errors.billRefNumber}
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoSection;
