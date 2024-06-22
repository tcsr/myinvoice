import React from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
// Utility function to handle input change and clear error
const handleInputChange = (setter, field, errors, setErrors) => (e) => {
  const value = e.target.value;
  setter(value);
  if (field === "emailAddress") {
    const isValidEmail = validateEmail(value);
    if (!isValidEmail) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "Invalid email format",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: null,
      }));
    }
  } else if (field === "contactNumber") {
    const isValidContactNumber = validateContactNumber(value);
    if (!isValidContactNumber) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "Contact number must be numeric",
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
// Validation function for email format
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};
// Validation function for numeric contact number
const validateContactNumber = (number) => {
  return /^\d+$/.test(number);
};

// Utility function to handle dropdown change and clear error
const handleDropdownChange = (setter, field, errors, setErrors) => (e) => {
  setter(e.value);
  if (errors[field]) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  }
};
const SupplierInfoSection = ({
  isExpanded,
  toggleExpand,
  supplierName,
  setSupplierName,
  emailAddress,
  setEmailAddress,
  contactNumber,
  setContactNumber,
  address,
  setAddress,
  taxIDNumber,
  setTaxIDNumber,
  cityName,
  setCityName,
  supplierState,
  setSupplierState,
  supplierCountry,
  setSupplierCountry,
  passportIdNumber,
  setPassportIdNumber,
  sstRegNumber,
  setSstRegNumber,
  tourismRegNumber,
  setTourismRegNumber,
  msicCode,
  setMsicCode,
  msicCodeOptions,
  businessActivityDesc,
  setBusinessActivityDesc,
  businessActivityOptions,
  stateOptions,
  countryOptions,
  handleStateDropdownChange,
  handleCountryDropdownChange,
  handleMsicCodeAndBusinessActivityDropdownChange,
  handlesetBusinessActivityDescDropdownChange,
  errors,
  setErrors,
}) => {
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
                <InputText
                  id="supplierName"
                  placeholder="Enter name"
                  value={supplierName}
                  onChange={handleInputChange(
                    setSupplierName,
                    "supplierName",
                    errors,
                    setErrors
                  )}
                  className={errors.supplierName ? "p-invalid" : ""}
                />
                {errors.supplierName && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.supplierName}
                  </small>
                )}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#212121", fontSize: 14 }}>Email Address</p>
              <div className="p-field">
                <InputText
                  id="emailAddress"
                  placeholder="Enter"
                  value={emailAddress}
                  onChange={handleInputChange(
                    setEmailAddress,
                    "emailAddress",
                    errors,
                    setErrors
                  )}
                  className={errors.emailAddress ? "p-invalid" : ""}
                />
                {errors.emailAddress && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.emailAddress}
                  </small>
                )}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#212121", fontSize: 14 }}>Contact Number</p>
              <div className="p-field">
                <InputText
                  id="contactNumber"
                  placeholder="Enter"
                  value={contactNumber}
                  onChange={handleInputChange(
                    setContactNumber,
                    "contactNumber",
                    errors,
                    setErrors
                  )}
                  className={errors.contactNumber ? "p-invalid" : ""}
                />
                {errors.contactNumber && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.contactNumber}
                  </small>
                )}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 5 }}>
            <p style={{ color: "#212121", fontSize: 14 }}>Address</p>
            <div className="p-field">
              <InputText
                style={{ width: "100%" }}
                id="address"
                placeholder="Enter"
                value={address}
                onChange={handleInputChange(
                  setAddress,
                  "address",
                  errors,
                  setErrors
                )}
                className={errors.address ? "p-invalid" : ""}
              />
              {errors.address && (
                <small style={{ textAlign: "left" }} className="p-error">
                  {errors.address}
                </small>
              )}
            </div>
          </div>
          <div className="expanded-container">
            <div style={{ flex: 1 }}>
              <p style={{ color: "#212121", fontSize: 14 }}>City Name</p>
              <div className="p-field">
                <InputText
                  id="cityName"
                  placeholder="Enter"
                  value={cityName}
                  onChange={handleInputChange(
                    setCityName,
                    "cityName",
                    errors,
                    setErrors
                  )}
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
                  id="supplierState"
                  value={supplierState}
                  options={stateOptions}
                  onChange={handleDropdownChange(
                    setSupplierState,
                    "supplierState",
                    errors,
                    setErrors
                  )}
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
                  id="supplierCountry"
                  value={supplierCountry}
                  options={countryOptions}
                  onChange={handleDropdownChange(
                    setSupplierCountry,
                    "supplierCountry",
                    errors,
                    setErrors
                  )}
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
                  id="taxIDNumber"
                  placeholder="Enter"
                  value={taxIDNumber}
                  onChange={handleInputChange(
                    setTaxIDNumber,
                    "taxIDNumber",
                    errors,
                    setErrors
                  )}
                  className={errors.taxIDNumber ? "p-invalid" : ""}
                />
                {errors.taxIDNumber && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.taxIDNumber}
                  </small>
                )}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#212121", fontSize: 14 }}>
                Passport ID Number
              </p>
              <div className="p-field">
                <InputText
                  id="passportIdNumber"
                  placeholder="Enter name"
                  value={passportIdNumber}
                  onChange={handleInputChange(
                    setPassportIdNumber,
                    "passportIdNumber",
                    errors,
                    setErrors
                  )}
                  className={errors.passportIdNumber ? "p-invalid" : ""}
                />
                {errors.passportIdNumber && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.passportIdNumber}
                  </small>
                )}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#212121", fontSize: 14 }}>
                SST Registration Number
              </p>
              <div className="p-field">
                <InputText
                  id="sstRegNumber"
                  placeholder="Enter"
                  value={sstRegNumber}
                  onChange={handleInputChange(
                    setSstRegNumber,
                    "sstRegNumber",
                    errors,
                    setErrors
                  )}
                  className={errors.sstRegNumber ? "p-invalid" : ""}
                />
                {errors.sstRegNumber && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.sstRegNumber}
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
                <InputText
                  id="tourismRegNumber"
                  placeholder="Enter"
                  value={tourismRegNumber}
                  onChange={handleInputChange(
                    setTourismRegNumber,
                    "tourismRegNumber",
                    errors,
                    setErrors
                  )}
                  className={errors.tourismRegNumber ? "p-invalid" : ""}
                />
                {errors.tourismRegNumber && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.tourismRegNumber}
                  </small>
                )}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#212121", fontSize: 14 }}>MSIC Code</p>
              <div className="p-field">
                <Dropdown
                  id="msicCode"
                  value={msicCode}
                  options={msicCodeOptions}
                  // onChange={handleDropdownChange(
                  //   setMsicCode,
                  //   "msicCode",
                  //   errors,
                  //   setErrors
                  // )}
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
                  id="businessActivityDesc"
                  value={businessActivityDesc}
                  options={businessActivityOptions}
                  // onChange={handleDropdownChange(
                  //   setBusinessActivityDesc,
                  //   "businessActivityDesc",
                  //   errors,
                  //   setErrors
                  // )}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierInfoSection;
