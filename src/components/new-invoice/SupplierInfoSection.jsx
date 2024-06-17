import React from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";

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
  supplierSignatureError,
  setSupplierSignatureError,
  handleSupplierSignFileChange,
  supplierDigiSign,
  setSupplierDigiSign,
  errors,
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
                  // style={{ width: 290 }}
                  id="supplierName"
                  placeholder="Enter name"
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
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
                  // style={{ width: 290 }}
                  id="emailAddress"
                  placeholder="Enter"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
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
                  // style={{ width: 290 }}
                  id="contactNumber"
                  placeholder="Enter"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
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
                onChange={(e) => setAddress(e.target.value)}
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
                  //style={{ width: 290 }}
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
                  //style={{ width: 290 }}
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
                  //style={{ width: 290 }}
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
                  //style={{ width: 290 }}
                  id="taxIDNumber"
                  placeholder="Enter"
                  value={taxIDNumber}
                  onChange={(e) => setTaxIDNumber(e.target.value)}
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
                  //style={{ width: 290 }}
                  id="passportIdNumber"
                  placeholder="Enter name"
                  value={passportIdNumber}
                  onChange={(e) => setPassportIdNumber(e.target.value)}
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
                  //style={{ width: 290 }}
                  id="sstRegNumber"
                  placeholder="Enter"
                  value={sstRegNumber}
                  onChange={(e) => setSstRegNumber(e.target.value)}
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
                  //style={{ width: 290 }}
                  id="tourismRegNumber"
                  placeholder="Enter"
                  value={tourismRegNumber}
                  onChange={(e) => setTourismRegNumber(e.target.value)}
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
                  //style={{ width: 290 }}
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
                  //style={{ width: 290 }}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierInfoSection;
