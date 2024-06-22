import React from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

// Utility function to handle input change and clear error
const handleInputChange =
  (setter, field, errors, setErrors, validateEmail, validateContactNumber) =>
  (e) => {
    const value = e.target.value;
    setter(value);

    if (field === "buyerEmailAddress") {
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
    } else if (field === "buyerContactNumber") {
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

// Validation function for email format
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// Validation function for numeric contact number
const validateContactNumber = (number) => {
  return /^\d+$/.test(number);
};

const BuyerInfoSection = ({
  isExpanded,
  toggleExpand,
  buyerName,
  setBuyerName,
  buyerEmailAddress,
  setBuyerEmailAddress,
  buyerContactNumber,
  setBuyerContactNumber,
  buyerAddress,
  setBuyerAddress,
  buyerCityName,
  setBuyerCityName,
  buyerStateName,
  setBuyerStateName,
  buyerCountry,
  setBuyerCountry,
  buyerTaxIDNumber,
  setBuyerTaxIDNumber,
  buyerPassportIdNumber,
  setBuyerPassportIdNumber,
  buyerSstRegNumber,
  setBuyerSstRegNumber,
  stateOptions,
  countryOptions,
  handleBuyerStateDropdownChange,
  handleBuyerCountryDropdownChange,
  errors,
  setErrors,
}) => {
  return (
    <div>
      <div className="accordion-container" onClick={toggleExpand}>
        <p className="accordion-title-text">Buyer Info</p>
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
              <p style={{ color: "#212121", fontSize: 14 }}>Buyer Name</p>
              <div className="p-field">
                <InputText
                  id="buyerName"
                  placeholder="Enter name"
                  value={buyerName}
                  onChange={handleInputChange(
                    setBuyerName,
                    "buyerName",
                    errors,
                    setErrors,
                    validateEmail,
                    validateContactNumber
                  )}
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
              <p style={{ color: "#212121", fontSize: 14 }}>Email Address</p>
              <div className="p-field">
                <InputText
                  id="buyerEmailAddress"
                  placeholder="Enter"
                  value={buyerEmailAddress}
                  onChange={handleInputChange(
                    setBuyerEmailAddress,
                    "buyerEmailAddress",
                    errors,
                    setErrors,
                    validateEmail,
                    validateContactNumber
                  )}
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
              <p style={{ color: "#212121", fontSize: 14 }}>Contact Number</p>
              <div className="p-field">
                <InputText
                  id="buyerContactNumber"
                  placeholder="Enter"
                  value={buyerContactNumber}
                  onChange={handleInputChange(
                    setBuyerContactNumber,
                    "buyerContactNumber",
                    errors,
                    setErrors,
                    validateEmail,
                    validateContactNumber
                  )}
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
                onChange={handleInputChange(
                  setBuyerAddress,
                  "buyerAddress",
                  errors,
                  setErrors,
                  validateEmail,
                  validateContactNumber
                )}
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
                  id="buyerCityName"
                  placeholder="Enter"
                  value={buyerCityName}
                  onChange={handleInputChange(
                    setBuyerCityName,
                    "buyerCityName",
                    errors,
                    setErrors,
                    validateEmail,
                    validateContactNumber
                  )}
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
                  id="buyerStateName"
                  value={buyerStateName}
                  options={stateOptions}
                  onChange={handleDropdownChange(
                    setBuyerStateName,
                    "buyerStateName",
                    errors,
                    setErrors
                  )}
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
                  id="buyerCountry"
                  value={buyerCountry}
                  options={countryOptions}
                  onChange={handleDropdownChange(
                    setBuyerCountry,
                    "buyerCountry",
                    errors,
                    setErrors
                  )}
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
                  id="buyerTaxIDNumber"
                  placeholder="Enter name"
                  value={buyerTaxIDNumber}
                  onChange={handleInputChange(
                    setBuyerTaxIDNumber,
                    "buyerTaxIDNumber",
                    errors,
                    setErrors,
                    validateEmail,
                    validateContactNumber
                  )}
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
                  id="buyerPassportIdNumber"
                  placeholder="Enter"
                  value={buyerPassportIdNumber}
                  onChange={handleInputChange(
                    setBuyerPassportIdNumber,
                    "buyerPassportIdNumber",
                    errors,
                    setErrors,
                    validateEmail,
                    validateContactNumber
                  )}
                  className={errors.buyerPassportIdNumber ? "p-invalid" : ""}
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
                  id="buyerSstRegNumber"
                  placeholder="Enter"
                  value={buyerSstRegNumber}
                  onChange={handleInputChange(
                    setBuyerSstRegNumber,
                    "buyerSstRegNumber",
                    errors,
                    setErrors,
                    validateEmail,
                    validateContactNumber
                  )}
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
    </div>
  );
};

export default BuyerInfoSection;
