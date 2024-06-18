import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";

const SupplierInfoSection = ({
  isExpanded,
  toggleExpand,
  stateOptions,
  countryOptions,
  handleStateDropdownChange,
  handleCountryDropdownChange,
  handleMsicCodeAndBusinessActivityDropdownChange,
  handlesetBusinessActivityDescDropdownChange,
  supplierSignatureError,
  setSupplierSignatureError,
  handleSupplierSignFileChange,
  msicCodeOptions,
  businessActivityOptions,
}) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div>
      <div className="accordion-container" onClick={toggleExpand}>
        <p className="accordion-title-text">Supplier Info</p>
        <i
          className={
            isExpanded
              ? "pi pi-chevron-down p-button-text transparent-icon expanded"
              : "pi pi-chevron-up p-button-text transparent-icon collapsed"
          }
        />
      </div>
      {isExpanded && (
        <div>
          <div className="expanded-container">
            <div style={{ flex: 1 }}>
              <p style={{ color: "#212121", fontSize: 14 }}>Supplier Name</p>
              <div className="p-field">
                <Controller
                  name="supplier.name"
                  control={control}
                  rules={{ required: "Supplier's Name is required" }}
                  render={({ field }) => (
                    <InputText
                      style={{ width: 290 }}
                      id="supplierName"
                      placeholder="Enter name"
                      {...field}
                      className={errors.supplier?.name ? "p-invalid" : ""}
                    />
                  )}
                />
                {errors.supplier?.name && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.supplier?.name.message}
                  </small>
                )}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#212121", fontSize: 14 }}>Email Address</p>
              <div className="p-field">
                <Controller
                  name="supplier.emailAddress"
                  control={control}
                  rules={{ required: "Email Address is required" }}
                  render={({ field }) => (
                    <InputText
                      style={{ width: 290 }}
                      id="emailAddress"
                      placeholder="Enter"
                      {...field}
                      className={errors.supplier?.emailAddress ? "p-invalid" : ""}
                    />
                  )}
                />
                {errors.supplier?.emailAddress && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.supplier?.emailAddress.message}
                  </small>
                )}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#212121", fontSize: 14 }}>Contact Number</p>
              <div className="p-field">
                <Controller
                  name="supplier.contactNumber"
                  control={control}
                  rules={{ required: "Contact Number is required" }}
                  render={({ field }) => (
                    <InputText
                      style={{ width: 290 }}
                      id="contactNumber"
                      placeholder="Enter"
                      {...field}
                      className={errors.supplier?.contactNumber ? "p-invalid" : ""}
                    />
                  )}
                />
                {errors.supplier?.contactNumber && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.supplier?.contactNumber.message}
                  </small>
                )}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 5 }}>
            <p style={{ color: "#212121", fontSize: 14 }}>Address</p>
            <div className="p-field">
              <Controller
                name="supplier.address"
                control={control}
                rules={{ required: "Address is required" }}
                render={({ field }) => (
                  <InputText
                    style={{ width: "100%" }}
                    id="address"
                    placeholder="Enter"
                    {...field}
                    className={errors.supplier?.address ? "p-invalid" : ""}
                  />
                )}
              />
              {errors.supplier?.address && (
                <small style={{ textAlign: "left" }} className="p-error">
                  {errors.supplier?.address.message}
                </small>
              )}
            </div>
          </div>
          <div className="expanded-container">
            <div style={{ flex: 1 }}>
              <p style={{ color: "#212121", fontSize: 14 }}>City Name</p>
              <div className="p-field">
                <Controller
                  name="supplier.cityName"
                  control={control}
                  rules={{ required: "City Name is required" }}
                  render={({ field }) => (
                    <InputText
                      style={{ width: 290 }}
                      id="cityName"
                      placeholder="Enter"
                      {...field}
                      className={errors.supplier?.cityName ? "p-invalid" : ""}
                    />
                  )}
                />
                {errors.supplier?.cityName && (
                  <small className="p-error">{errors.supplier?.cityName.message}</small>
                )}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#212121", fontSize: 14 }}>State</p>
              <div className="p-field">
                <Controller
                  name="supplier.state"
                  control={control}
                  rules={{ required: "State is required" }}
                  render={({ field }) => (
                    <Dropdown
                      style={{ width: 290 }}
                      id="supplierState"
                      {...field}
                      options={stateOptions}
                      // onChange={handleStateDropdownChange}
                      placeholder="Select"
                      className={errors.supplier?.state ? "p-invalid" : ""}
                    />
                  )}
                />
                {errors.supplier?.state && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.supplier?.state.message}
                  </small>
                )}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#212121", fontSize: 14 }}>Country</p>
              <div className="p-field">
                <Controller
                  name="supplier.country"
                  control={control}
                  rules={{ required: "Country is required" }}
                  render={({ field }) => (
                    <Dropdown
                      style={{ width: 290 }}
                      id="supplierCountry"
                      {...field}
                      options={countryOptions}
                      // onChange={handleCountryDropdownChange}
                      placeholder="Select"
                      className={errors.supplier?.country ? "p-invalid" : ""}
                    />
                  )}
                />
                {errors.supplier?.country && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.supplier?.country.message}
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
                <Controller
                  name="supplier.taxIDNumber"
                  control={control}
                  rules={{ required: "Tax ID Number is required" }}
                  render={({ field }) => (
                    <InputText
                      style={{ width: 290 }}
                      id="taxIDNumber"
                      placeholder="Enter"
                      {...field}
                      className={errors.supplier?.taxIDNumber ? "p-invalid" : ""}
                    />
                  )}
                />
                {errors.supplier?.taxIDNumber && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.supplier?.taxIDNumber.message}
                  </small>
                )}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#212121", fontSize: 14 }}>
                Passport ID Number
              </p>
              <div className="p-field">
                <Controller
                  name="supplier.passportIdNumber"
                  control={control}
                  rules={{ required: "Passport ID Number is required" }}
                  render={({ field }) => (
                    <InputText
                      style={{ width: 290 }}
                      id="passportIdNumber"
                      placeholder="Enter name"
                      {...field}
                      className={errors.supplier?.passportIdNumber ? "p-invalid" : ""}
                    />
                  )}
                />
                {errors.supplier?.passportIdNumber && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.supplier?.passportIdNumber.message}
                  </small>
                )}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#212121", fontSize: 14 }}>
                SST Registration Number
              </p>
              <div className="p-field">
                <Controller
                  name="supplier.sstRegNumber"
                  control={control}
                  rules={{ required: "SST Registration Number is required" }}
                  render={({ field }) => (
                    <InputText
                      style={{ width: 290 }}
                      id="sstRegNumber"
                      placeholder="Enter"
                      {...field}
                      className={errors.supplier?.sstRegNumber ? "p-invalid" : ""}
                    />
                  )}
                />
                {errors.supplier?.sstRegNumber && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.supplier?.sstRegNumber.message}
                  </small>
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
                <Controller
                  name="supplier.tourismRegNumber"
                  control={control}
                  rules={{ required: "Tourism Registration Number is required" }}
                  render={({ field }) => (
                    <InputText
                      style={{ width: 290 }}
                      id="tourismRegNumber"
                      placeholder="Enter"
                      {...field}
                      className={errors.supplier?.tourismRegNumber ? "p-invalid" : ""}
                    />
                  )}
                />
                {errors.supplier?.tourismRegNumber && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.supplier?.tourismRegNumber.message}
                  </small>
                )}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#212121", fontSize: 14 }}>MSIC Code</p>
              <div className="p-field">
                <Controller
                  name="supplier.msicCode"
                  control={control}
                  rules={{ required: "MSIC Code is required" }}
                  render={({ field }) => (
                    <Dropdown
                      style={{ width: 290 }}
                      id="msicCode"
                      {...field}
                      options={msicCodeOptions}
                      // onChange={handleMsicCodeAndBusinessActivityDropdownChange}
                      placeholder="Select MSIC Code"
                      className={errors.supplier?.msicCode ? "p-invalid" : ""}
                    />
                  )}
                />
                {errors.supplier?.msicCode && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.supplier?.msicCode.message}
                  </small>
                )}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#212121", fontSize: 14 }}>
                Business Activity Description
              </p>
              <div className="p-field">
                <Controller
                  name="supplier.businessActivityDesc"
                  control={control}
                  rules={{ required: "Business Activity Description is required" }}
                  render={({ field }) => (
                    <Dropdown
                      style={{ width: 290 }}
                      id="businessActivityDesc"
                      {...field}
                      options={businessActivityOptions}
                      // onChange={handlesetBusinessActivityDescDropdownChange}
                      placeholder="Select Business Activity"
                      className={errors.supplier?.businessActivityDesc ? "p-invalid" : ""}
                    />
                  )}
                />
                {errors.supplier?.businessActivityDesc && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.supplier?.businessActivityDesc.message}
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierInfoSection;
