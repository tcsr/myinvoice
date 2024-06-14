import React from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

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
    errors
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
                <div className="expanded-container">
                    <div style={{ flex: 1 }}>
                        <p style={{ color: "#212121", fontSize: 14 }}>Buyer Name</p>
                        <div className="p-field">
                            <InputText
                                style={{ width: 290 }}
                                id="buyerName"
                                placeholder="Enter name"
                                value={buyerName}
                                onChange={(e) => setBuyerName(e.target.value)}
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
                                style={{ width: 290 }}
                                id="buyerEmailAddress"
                                placeholder="Enter"
                                value={buyerEmailAddress}
                                onChange={(e) => setBuyerEmailAddress(e.target.value)}
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
                                style={{ width: 290 }}
                                id="buyerContactNumber"
                                placeholder="Enter"
                                value={buyerContactNumber}
                                onChange={(e) => setBuyerContactNumber(e.target.value)}
                                className={errors.buyerContactNumber ? "p-invalid" : ""}
                            />
                            {errors.buyerContactNumber && (
                                <small style={{ textAlign: "left" }} className="p-error">
                                    {errors.buyerContactNumber}
                                </small>
                            )}
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
                                className={errors.buyerAddress ? "p-invalid" : ""}
                            />
                            {errors.buyerAddress && (
                                <small style={{ textAlign: "left" }} className="p-error">
                                    {errors.buyerAddress}
                                </small>
                            )}
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <p style={{ color: "#212121", fontSize: 14 }}>City Name</p>
                        <div className="p-field">
                            <InputText
                                style={{ width: 290 }}
                                id="buyerCityName"
                                placeholder="Enter"
                                value={buyerCityName}
                                onChange={(e) => setBuyerCityName(e.target.value)}
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
                                style={{ width: 290 }}
                                id="buyerStateName"
                                value={buyerStateName}
                                options={stateOptions}
                                onChange={handleBuyerStateDropdownChange}
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
                                style={{ width: 290 }}
                                id="buyerCountry"
                                value={buyerCountry}
                                options={countryOptions}
                                onChange={handleBuyerCountryDropdownChange}
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
                    <div style={{ flex: 1 }}>
                        <p style={{ color: "#212121", fontSize: 14 }}>
                            Tax Identification Number
                        </p>
                        <div className="p-field">
                            <InputText
                                style={{ width: 290 }}
                                id="buyerTaxIDNumber"
                                placeholder="Enter name"
                                value={buyerTaxIDNumber}
                                onChange={(e) => setBuyerTaxIDNumber(e.target.value)}
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
                                style={{ width: 290 }}
                                id="buyerPassportIdNumber"
                                placeholder="Enter"
                                value={buyerPassportIdNumber}
                                onChange={(e) => setBuyerPassportIdNumber(e.target.value)}
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
                                style={{ width: 290 }}
                                id="buyerSstRegNumber"
                                placeholder="Enter"
                                value={buyerSstRegNumber}
                                onChange={(e) => setBuyerSstRegNumber(e.target.value)}
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
            )}
        </div>
    );
};

export default BuyerInfoSection;
