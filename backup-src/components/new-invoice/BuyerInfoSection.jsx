import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

const BuyerInfoSection = ({
  isExpanded,
  toggleExpand,
  stateOptions,
  countryOptions,
}) => {
  const { control, formState: { errors } } = useFormContext();

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
                <Controller
                  name="buyer.name"
                  control={control}
                  rules={{ required: "Buyer Name is required" }}
                  render={({ field }) => (
                    <InputText
                      style={{ width: 290 }}
                      id="buyerName"
                      placeholder="Enter name"
                      {...field}
                      className={errors.buyer?.name ? "p-invalid" : ""}
                    />
                  )}
                />
                {errors.buyer?.name && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.buyer?.name.message}
                  </small>
                )}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#212121", fontSize: 14 }}>Email Address</p>
              <div className="p-field">
                <Controller
                  name="buyer.emailAddress"
                  control={control}
                  rules={{ required: "Email Address is required" }}
                  render={({ field }) => (
                    <InputText
                      style={{ width: 290 }}
                      id="buyerEmailAddress"
                      placeholder="Enter"
                      {...field}
                      className={errors.buyer?.emailAddress ? "p-invalid" : ""}
                    />
                  )}
                />
                {errors.buyer?.emailAddress && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.buyer?.emailAddress.message}
                  </small>
                )}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#212121", fontSize: 14 }}>Contact Number</p>
              <div className="p-field">
                <Controller
                  name="buyer.contactNumber"
                  control={control}
                  rules={{ required: "Contact Number is required" }}
                  render={({ field }) => (
                    <InputText
                      style={{ width: 290 }}
                      id="buyerContactNumber"
                      placeholder="Enter"
                      {...field}
                      className={errors.buyer?.contactNumber ? "p-invalid" : ""}
                    />
                  )}
                />
                {errors.buyer?.contactNumber && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.buyer?.contactNumber.message}
                  </small>
                )}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 5 }}>
            <p style={{ color: "#212121", fontSize: 14 }}>Address</p>
            <div className="p-field">
              <Controller
                name="buyer.address"
                control={control}
                rules={{ required: "Address is required" }}
                render={({ field }) => (
                  <InputText
                    style={{ width: "100%" }}
                    id="buyerAddress"
                    placeholder="Enter"
                    {...field}
                    className={errors.buyer?.address ? "p-invalid" : ""}
                  />
                )}
              />
              {errors.buyer?.address && (
                <small style={{ textAlign: "left" }} className="p-error">
                  {errors.buyer?.address.message}
                </small>
              )}
            </div>
          </div>
          <div className="expanded-container">
            <div style={{ flex: 1 }}>
              <p style={{ color: "#212121", fontSize: 14 }}>City Name</p>
              <div className="p-field">
                <Controller
                  name="buyer.cityName"
                  control={control}
                  rules={{ required: "City Name is required" }}
                  render={({ field }) => (
                    <InputText
                      style={{ width: 290 }}
                      id="buyerCityName"
                      placeholder="Enter"
                      {...field}
                      className={errors.buyer?.cityName ? "p-invalid" : ""}
                    />
                  )}
                />
                {errors.buyer?.cityName && (
                  <small className="p-error">{errors.buyer?.cityName.message}</small>
                )}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#212121", fontSize: 14 }}>State</p>
              <div className="p-field">
                <Controller
                  name="buyer.state"
                  control={control}
                  rules={{ required: "State is required" }}
                  render={({ field }) => (
                    <Dropdown
                      style={{ width: 290 }}
                      id="buyerStateName"
                      {...field}
                      options={stateOptions}
                      placeholder="Select"
                      className={errors.buyer?.state ? "p-invalid" : ""}
                    />
                  )}
                />
                {errors.buyer?.state && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.buyer?.state.message}
                  </small>
                )}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#212121", fontSize: 14 }}>Country</p>
              <div className="p-field">
                <Controller
                  name="buyer.country"
                  control={control}
                  rules={{ required: "Country is required" }}
                  render={({ field }) => (
                    <Dropdown
                      style={{ width: 290 }}
                      id="buyerCountry"
                      {...field}
                      options={countryOptions}
                      placeholder="Select"
                      className={errors.buyer?.country ? "p-invalid" : ""}
                    />
                  )}
                />
                {errors.buyer?.country && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.buyer?.country.message}
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
                  name="buyer.taxIDNumber"
                  control={control}
                  rules={{ required: "Tax ID Number is required" }}
                  render={({ field }) => (
                    <InputText
                      style={{ width: 290 }}
                      id="buyerTaxIDNumber"
                      placeholder="Enter name"
                      {...field}
                      className={errors.buyer?.taxIDNumber ? "p-invalid" : ""}
                    />
                  )}
                />
                {errors.buyer?.taxIDNumber && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.buyer?.taxIDNumber.message}
                  </small>
                )}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#212121", fontSize: 14 }}>
                Registration/Identification/Passport Number
              </p>
              <div className="p-field">
                <Controller
                  name="buyer.passportIdNumber"
                  control={control}
                  rules={{ required: "Passport ID Number is required" }}
                  render={({ field }) => (
                    <InputText
                      style={{ width: 290 }}
                      id="buyerPassportIdNumber"
                      placeholder="Enter"
                      {...field}
                      className={errors.buyer?.passportIdNumber ? "p-invalid" : ""}
                    />
                  )}
                />
                {errors.buyer?.passportIdNumber && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.buyer?.passportIdNumber.message}
                  </small>
                )}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#212121", fontSize: 14, paddingLeft: 4 }}>
                SST Registration Number
              </p>
              <div className="p-field">
                <Controller
                  name="buyer.sstRegNumber"
                  control={control}
                  rules={{ required: "SST Registration Number is required" }}
                  render={({ field }) => (
                    <InputText
                      style={{ width: 290 }}
                      id="buyerSstRegNumber"
                      placeholder="Enter"
                      {...field}
                      className={errors.buyer?.sstRegNumber ? "p-invalid" : ""}
                    />
                  )}
                />
                {errors.buyer?.sstRegNumber && (
                  <small style={{ textAlign: "left" }} className="p-error">
                    {errors.buyer?.sstRegNumber.message}
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
