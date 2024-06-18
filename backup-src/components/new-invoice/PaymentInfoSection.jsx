import React from "react";
import { useFormContext, Controller } from "react-hook-form";
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
  const { control } = useFormContext();

  return (
    <div className="payment-info-section equal-width">
      <p className="section-title">Payment Info</p>
      <div className="payment-info-grid">
        <div className="payment-info-item">
          <label htmlFor="paymentMode">Payment Mode</label>
          <Controller
            name="payment.mode"
            control={control}
            rules={{ required: "Payment Mode is required" }}
            render={({ field }) => (
              <Dropdown
                id="paymentMode"
                {...field}
                value={selectedPaymentMode}
                options={paymentMode}
                onChange={(e) => {
                  // handlePaymentModeDropdownChange(e);
                  field.onChange(e.value);
                }}
                placeholder="Select"
                style={{ width: "100%" }}
                className={errors.payment?.mode ? "p-invalid" : ""}
              />
            )}
          />
          {errors.payment?.mode && (
            <small style={{ textAlign: "left" }} className="p-error">
              {errors.payment?.mode.message}
            </small>
          )}
        </div>
        <div className="payment-info-item">
          <label htmlFor="paymentTerms">Payment Terms</label>
          <Controller
            name="payment.terms"
            control={control}
            rules={{ required: "Payment Terms are required" }}
            render={({ field }) => (
              <InputText
                id="paymentTerms"
                {...field}
                placeholder="Enter"
                style={{ width: "100%" }}
                className={errors.payment?.terms ? "p-invalid" : ""}
              />
            )}
          />
          {errors.payment?.terms && (
            <small style={{ textAlign: "left" }} className="p-error">
              {errors.payment?.terms.message}
            </small>
          )}
        </div>
        <div className="payment-info-item">
          <label htmlFor="paymentAmount">Payment Amount</label>
          <Controller
            name="payment.amount"
            control={control}
            rules={{ required: "Payment Amount is required" }}
            render={({ field }) => (
              <InputText
                id="paymentAmount"
                {...field}
                placeholder="Enter"
                style={{ width: "100%" }}
                className={errors.payment?.amount ? "p-invalid" : ""}
              />
            )}
          />
          {errors.payment?.amount && (
            <small style={{ textAlign: "left" }} className="p-error">
              {errors.payment?.amount.message}
            </small>
          )}
        </div>
        <div className="payment-info-item">
          <label htmlFor="bankAccNumber">Bank Acc. Number</label>
          <Controller
            name="payment.bankAccNumber"
            control={control}
            rules={{ required: "Bank Account Number is required" }}
            render={({ field }) => (
              <InputText
                id="bankAccNumber"
                {...field}
                placeholder="Enter"
                style={{ width: "100%" }}
                className={errors.payment?.bankAccNumber ? "p-invalid" : ""}
              />
            )}
          />
          {errors.payment?.bankAccNumber && (
            <small style={{ textAlign: "left" }} className="p-error">
              {errors.payment?.bankAccNumber.message}
            </small>
          )}
        </div>
        <div className="payment-info-item">
          <label htmlFor="paymentDate">Payment Date</label>
          <Controller
            name="payment.date"
            control={control}
            rules={{ required: "Payment Date is required" }}
            render={({ field }) => (
              <Calendar
                id="paymentDate"
                {...field}
                placeholder="Enter"
                showIcon
                dateFormat="dd/mm/yy"
                style={{ width: "100%" }}
                className={errors.payment?.date ? "p-invalid" : ""}
              />
            )}
          />
          {errors.payment?.date && (
            <small style={{ textAlign: "left" }} className="p-error">
              {errors.payment?.date.message}
            </small>
          )}
        </div>
        <div className="payment-info-item">
          <label htmlFor="paymentRefNumber">Payment Ref. Number</label>
          <Controller
            name="payment.refNumber"
            control={control}
            rules={{ required: "Payment Reference Number is required" }}
            render={({ field }) => (
              <InputText
                id="paymentRefNumber"
                {...field}
                placeholder="Enter"
                style={{ width: "100%" }}
                className={errors.payment?.refNumber ? "p-invalid" : ""}
              />
            )}
          />
          {errors.payment?.refNumber && (
            <small style={{ textAlign: "left" }} className="p-error">
              {errors.payment?.refNumber.message}
            </small>
          )}
        </div>
        <div className="payment-info-item">
          <label htmlFor="billRefNumber">Bill Ref. Number</label>
          <Controller
            name="payment.billRefNumber"
            control={control}
            rules={{ required: "Bill Reference Number is required" }}
            render={({ field }) => (
              <InputText
                id="billRefNumber"
                {...field}
                placeholder="Enter"
                style={{ width: "100%" }}
                className={errors.payment?.billRefNumber ? "p-invalid" : ""}
              />
            )}
          />
          {errors.payment?.billRefNumber && (
            <small style={{ textAlign: "left" }} className="p-error">
              {errors.payment?.billRefNumber.message}
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoSection;
