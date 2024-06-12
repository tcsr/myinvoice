import React, { useState, useEffect, useRef } from "react";
import filedoc from "../../assets/tray-arrow-up.svg";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "primereact/resources/themes/saga-blue/theme.css";
import "./UploadInvoice.css";
import { API_ENDPOINTS } from "../../api/apiEndpoints";
import CustomModal from "../../components/CustomModal/CustomModal";
import CustomGenerateInvoiceModal from "../../components/CustomModal/CustomGenerateInvoiceModal";
import useApi from "../../hooks/useApi";
import FileUpload from "../../components/FileUploadComponent/FileUpload";

function UploadInvoice() {
  const { get, post, del, loading, error } = useApi();
  const [validationMessage, setValidationMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Supplier Info
  const [supplierName, setSupplierName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [taxIDNumber, setTaxIDNumber] = useState("");
  const [cityName, setCityName] = useState("");
  const [supplierState, setSupplierState] = useState("");
  const [supplierCountry, setSupplierCountry] = useState("");
  const [passportIdNumber, setPassportIdNumber] = useState("");
  const [sstRegNumber, setSstRegNumber] = useState("");
  const [tourismRegNumber, setTourismRegNumber] = useState("");
  const [msicCode, setMsicCode] = useState(null);
  const [businessActivityDesc, setBusinessActivityDesc] = useState("");

  // Buyer Info
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmailAddress, setBuyerEmailAddress] = useState("");
  const [buyerContactNumber, setBuyerContactNumber] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [buyerCityName, setBuyerCityName] = useState("");
  const [buyerStateName, setBuyerStateName] = useState("");
  const [buyerCountry, setBuyerCountry] = useState("");

  const [buyerTaxIDNumber, setBuyerTaxIDNumber] = useState("");
  const [buyerPassportIdNumber, setBuyerPassportIdNumber] = useState("");
  const [buyerSstRegNumber, setBuyerSstRegNumber] = useState("");

  //Invoice details
  // const [selectedVersion, setSelectedVersion] = useState(null);
  const [invoiceVersion, setInvoiceVersion] = useState("");
  const [selectedInvoiceType, setSelectedInvoiceType] = useState(null);
  const [invoiceCodeNumber, setInvoiceCodeNumber] = useState("");
  const [invoiceRefNumber, setInvoiceRefNumber] = useState("");
  const [invoiceDateTime, setInvoiceDateTime] = useState(null);
  const [validationDateTime, setValidationDateTime] = useState(null);
  const [supplierDigiSign, setSupplierDigiSign] = useState("");
  const [invoiceCurrencyCode, setInvoiceCurrencyCode] = useState("");
  const [currencyExchangeRate, setCurrencyExchangeRate] = useState("");
  const [billFrequency, setBillFrequency] = useState("");
  const [billPeriod, setBillPeriod] = useState("");
  const [irbmUniqueId, setIrmbUniqueId] = useState("");

  const [supplierSignatureError, setSupplierSignatureError] = useState("");

  //Payment Info

  const [selectedPaymentMode, setSelectedPaymentMode] = useState(null);
  const [selectedPaymentTerms, setSelectedPaymentTerms] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [bankAccNumber, setBankAccNumber] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentRefNumber, setPaymentRefNumber] = useState("");
  const [billRefNumber, setBillRefNumber] = useState("");

  const [stateOptions, setStateOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [invoiceType, setInvoiceType] = useState([]);
  const [currencyCode, setCurrencyCode] = useState([]);
  const [taxTypeOptions, setTaxTypeOptions] = useState([]);
  const [paymentMode, setPaymentModeOptions] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [openGenrateInvoiceModal, setOpenGenrateInvoiceModal] = useState(false);
  const [errors, setErrors] = useState({});

  const totalInvoices = 15;
  const [rows, setRows] = useState([
    {
      classification: "",
      description: "",
      unitPrice: "",
      quantity: "",
      taxType: "",
      taxRate: "",
      taxAmount: "",
      discount: "",
      totalAmount: "",
    },
  ]);
  const [summary, setSummary] = useState({
    subtotal: 0,
    amountExemptedFromTax: 0,
    totalExcludingTax: 0,
    totalIncludingTax: 0,
    totalDiscount: 0,
    netTotal: 0,
  });
  useEffect(() => {
    fetchStateData();
    fetchCountry();
    fetchInvoiceType();
    fetchCurrencyCode();
    fetchTaxType();
    calculateSummary();
    fetchPaymentMode();
  }, [rows]);
  const fetchPaymentMode = async () => {
    try {
      // const response = await get(API_ENDPOINTS.GET_PAYMENT_MODE);
      // if (!response.ok) {
      //   throw new Error("Failed to fetch");
      // }
      // const data = await response.json();
      const data = [
        {
          id: 1,
          code: "01",
          description: "Cash",
        },
        {
          id: 2,
          code: "02",
          description: "Cheque",
        },
        {
          id: 3,
          code: "03",
          description: "Bank Transfer",
        },
        {
          id: 4,
          code: "04",
          description: "Credit Card",
        },
        {
          id: 5,
          code: "05",
          description: "Debit Card",
        },
        {
          id: 6,
          code: "06",
          description: "e-Wallet / Digital Wallet",
        },
        {
          id: 7,
          code: "07",
          description: "Digital Bank",
        },
        {
          id: 8,
          code: "08",
          description: "Others",
        },
      ];

      const payment = data.map((payment) => ({
        label: payment["description"],
        value: payment["code"],
      }));

      setPaymentModeOptions(payment); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error if needed
    }
  };
  const fetchTaxType = async () => {
    try {
      // const response = await get(API_ENDPOINTS.GET_CURRENCY_CODE);
      // if (!response.ok) {
      //   throw new Error("Failed to fetch");
      // }
      // const data = await response.json();
      const data = [
        {
          Code: "01",
          Description: "Sales Tax",
        },
        {
          Code: "02",
          Description: "Service Tax",
        },
        {
          Code: "03",
          Description: "Tourism Tax",
        },
        {
          Code: "04",
          Description: "High-Value Goods Tax",
        },
        {
          Code: "05",
          Description: "Sales Tax on Low Value Goods",
        },
        {
          Code: "06",
          Description: "Not Applicable",
        },
        {
          Code: "E",
          Description: "Tax exemption (where applicable)",
        },
      ];

      const tax = data.map((tax) => ({
        label: tax["Description"],
        value: tax["Code"],
      }));

      setTaxTypeOptions(tax); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error if needed
    }
  };
  const fetchCurrencyCode = async () => {
    try {
      // const response = await get(API_ENDPOINTS.GET_CURRENCY_CODE);
      // if (!response.ok) {
      //   throw new Error("Failed to fetch");
      // }
      // const data = await response.json();
      const data = [
        {
          id: 1,
          code: "AED",
          currency: "UAE Dirham",
        },
        {
          id: 2,
          code: "AFN",
          currency: "Afghani",
        },
        {
          id: 3,
          code: "ALL",
          currency: "Lek",
        },
        {
          id: 4,
          code: "AMD",
          currency: "Armenian Dram",
        },
        {
          id: 5,
          code: "ANG",
          currency: "Netherlands Antillean Guilder",
        },
        {
          id: 6,
          code: "AOA",
          currency: "Kwanza",
        },
        {
          id: 7,
          code: "ARS",
          currency: "Argentine Peso",
        },
        {
          id: 8,
          code: "AUD",
          currency: "Australian Dollar",
        },
        {
          id: 9,
          code: "AWG",
          currency: "Aruban Florin",
        },
        {
          id: 10,
          code: "AZN",
          currency: "Azerbaijan Manat",
        },
        {
          id: 11,
          code: "BAM",
          currency: "Convertible Mark",
        },
        {
          id: 12,
          code: "BBD",
          currency: "Barbados Dollar",
        },
        {
          id: 13,
          code: "BDT",
          currency: "Taka",
        },
        {
          id: 14,
          code: "BGN",
          currency: "Bulgarian Lev",
        },
        {
          id: 15,
          code: "BHD",
          currency: "Bahraini Dinar",
        },
        {
          id: 16,
          code: "BIF",
          currency: "Burundi Franc",
        },
        {
          id: 17,
          code: "BMD",
          currency: "Bermudian Dollar",
        },
        {
          id: 18,
          code: "BND",
          currency: "Brunei Dollar",
        },
        {
          id: 19,
          code: "BOB",
          currency: "Boliviano",
        },
        {
          id: 20,
          code: "BOV",
          currency: "Mvdol",
        },
        {
          id: 21,
          code: "BRL",
          currency: "Brazilian Real",
        },
        {
          id: 22,
          code: "BSD",
          currency: "Bahamian Dollar",
        },
        {
          id: 23,
          code: "BTN",
          currency: "Ngultrum",
        },
        {
          id: 24,
          code: "BWP",
          currency: "Pula",
        },
        {
          id: 25,
          code: "BYN",
          currency: "Belarusian Ruble",
        },
        {
          id: 26,
          code: "BZD",
          currency: "Belize Dollar",
        },
        {
          id: 27,
          code: "CAD",
          currency: "Canadian Dollar",
        },
        {
          id: 28,
          code: "CDF",
          currency: "Congolese Franc",
        },
        {
          id: 29,
          code: "CHE",
          currency: "WIR Euro",
        },
        {
          id: 30,
          code: "CHF",
          currency: "Swiss Franc",
        },
        {
          id: 31,
          code: "CHW",
          currency: "WIR Franc",
        },
        {
          id: 32,
          code: "CLF",
          currency: "Unidad de Fomento",
        },
        {
          id: 33,
          code: "CLP",
          currency: "Chilean Peso",
        },
        {
          id: 34,
          code: "CNY",
          currency: "Yuan Renminbi",
        },
        {
          id: 35,
          code: "COP",
          currency: "Colombian Peso",
        },
        {
          id: 36,
          code: "COU",
          currency: "Unidad de Valor Real",
        },
        {
          id: 37,
          code: "CRC",
          currency: "Costa Rican Colon",
        },
        {
          id: 38,
          code: "CUC",
          currency: "Peso Convertible",
        },
        {
          id: 39,
          code: "CUP",
          currency: "Cuban Peso",
        },
        {
          id: 40,
          code: "CVE",
          currency: "Cabo Verde Escudo",
        },
        {
          id: 41,
          code: "CZK",
          currency: "Czech Koruna",
        },
        {
          id: 42,
          code: "DJF",
          currency: "Djibouti Franc",
        },
        {
          id: 43,
          code: "DKK",
          currency: "Danish Krone",
        },
        {
          id: 44,
          code: "DOP",
          currency: "Dominican Peso",
        },
        {
          id: 45,
          code: "DZD",
          currency: "Algerian Dinar",
        },
        {
          id: 46,
          code: "EGP",
          currency: "Egyptian Pound",
        },
        {
          id: 47,
          code: "ERN",
          currency: "Nakfa",
        },
        {
          id: 48,
          code: "ETB",
          currency: "Ethiopian Birr",
        },
        {
          id: 49,
          code: "EUR",
          currency: "Euro",
        },
        {
          id: 50,
          code: "FJD",
          currency: "Fiji Dollar",
        },
        {
          id: 51,
          code: "FKP",
          currency: "Falkland Islands Pound",
        },
        {
          id: 52,
          code: "GBP",
          currency: "Pound Sterling",
        },
        {
          id: 53,
          code: "GEL",
          currency: "Lari",
        },
        {
          id: 54,
          code: "GHS",
          currency: "Ghana Cedi",
        },
        {
          id: 55,
          code: "GIP",
          currency: "Gibraltar Pound",
        },
        {
          id: 56,
          code: "GMD",
          currency: "Dalasi",
        },
        {
          id: 57,
          code: "GNF",
          currency: "Guinean Franc",
        },
        {
          id: 58,
          code: "GTQ",
          currency: "Quetzal",
        },
        {
          id: 59,
          code: "GYD",
          currency: "Guyana Dollar",
        },
        {
          id: 60,
          code: "HKD",
          currency: "Hong Kong Dollar",
        },
        {
          id: 61,
          code: "HNL",
          currency: "Lempira",
        },
        {
          id: 62,
          code: "HTG",
          currency: "Gourde",
        },
        {
          id: 63,
          code: "HUF",
          currency: "Forint",
        },
        {
          id: 64,
          code: "IDR",
          currency: "Rupiah",
        },
        {
          id: 65,
          code: "ILS",
          currency: "New Israeli Sheqel",
        },
        {
          id: 66,
          code: "INR",
          currency: "Indian Rupee",
        },
        {
          id: 67,
          code: "IQD",
          currency: "Iraqi Dinar",
        },
        {
          id: 68,
          code: "IRR",
          currency: "Iranian Rial",
        },
        {
          id: 69,
          code: "ISK",
          currency: "Iceland Krona",
        },
        {
          id: 70,
          code: "JMD",
          currency: "Jamaican Dollar",
        },
        {
          id: 71,
          code: "JOD",
          currency: "Jordanian Dinar",
        },
        {
          id: 72,
          code: "JPY",
          currency: "Yen",
        },
        {
          id: 73,
          code: "KES",
          currency: "Kenyan Shilling",
        },
        {
          id: 74,
          code: "KGS",
          currency: "Som",
        },
        {
          id: 75,
          code: "KHR",
          currency: "Riel",
        },
        {
          id: 76,
          code: "KMF",
          currency: "Comorian Franc ",
        },
        {
          id: 77,
          code: "KPW",
          currency: "North Korean Won",
        },
        {
          id: 78,
          code: "KRW",
          currency: "Won",
        },
        {
          id: 79,
          code: "KWD",
          currency: "Kuwaiti Dinar",
        },
        {
          id: 80,
          code: "KYD",
          currency: "Cayman Islands Dollar",
        },
        {
          id: 81,
          code: "KZT",
          currency: "Tenge",
        },
        {
          id: 82,
          code: "LAK",
          currency: "Lao Kip",
        },
        {
          id: 83,
          code: "LBP",
          currency: "Lebanese Pound",
        },
        {
          id: 84,
          code: "LKR",
          currency: "Sri Lanka Rupee",
        },
        {
          id: 85,
          code: "LRD",
          currency: "Liberian Dollar",
        },
        {
          id: 86,
          code: "LSL",
          currency: "Loti",
        },
        {
          id: 87,
          code: "LYD",
          currency: "Libyan Dinar",
        },
        {
          id: 88,
          code: "MAD",
          currency: "Moroccan Dirham",
        },
        {
          id: 89,
          code: "MDL",
          currency: "Moldovan Leu",
        },
        {
          id: 90,
          code: "MGA",
          currency: "Malagasy Ariary",
        },
        {
          id: 91,
          code: "MKD",
          currency: "Denar",
        },
        {
          id: 92,
          code: "MMK",
          currency: "Kyat",
        },
        {
          id: 93,
          code: "MNT",
          currency: "Tugrik",
        },
        {
          id: 94,
          code: "MOP",
          currency: "Pataca",
        },
        {
          id: 95,
          code: "MRU",
          currency: "Ouguiya",
        },
        {
          id: 96,
          code: "MUR",
          currency: "Mauritius Rupee",
        },
        {
          id: 97,
          code: "MVR",
          currency: "Rufiyaa",
        },
        {
          id: 98,
          code: "MWK",
          currency: "Malawi Kwacha",
        },
        {
          id: 99,
          code: "MXN",
          currency: "Mexican Peso",
        },
        {
          id: 100,
          code: "MXV",
          currency: "Mexican Unidad de Inversion (UDI)",
        },
        {
          id: 101,
          code: "MYR",
          currency: "Malaysian Ringgit",
        },
        {
          id: 102,
          code: "MZN",
          currency: "Mozambique Metical",
        },
        {
          id: 103,
          code: "NAD",
          currency: "Namibia Dollar",
        },
        {
          id: 104,
          code: "NGN",
          currency: "Naira",
        },
        {
          id: 105,
          code: "NIO",
          currency: "Cordoba Oro",
        },
        {
          id: 106,
          code: "NOK",
          currency: "Norwegian Krone",
        },
        {
          id: 107,
          code: "NPR",
          currency: "Nepalese Rupee",
        },
        {
          id: 108,
          code: "NZD",
          currency: "New Zealand Dollar",
        },
        {
          id: 109,
          code: "OMR",
          currency: "Rial Omani",
        },
        {
          id: 110,
          code: "PAB",
          currency: "Balboa",
        },
        {
          id: 111,
          code: "PEN",
          currency: "Sol",
        },
        {
          id: 112,
          code: "PGK",
          currency: "Kina",
        },
        {
          id: 113,
          code: "PHP",
          currency: "Philippine Peso",
        },
        {
          id: 114,
          code: "PKR",
          currency: "Pakistan Rupee",
        },
        {
          id: 115,
          code: "PLN",
          currency: "Zloty",
        },
        {
          id: 116,
          code: "PYG",
          currency: "Guarani",
        },
        {
          id: 117,
          code: "QAR",
          currency: "Qatari Rial",
        },
        {
          id: 118,
          code: "RON",
          currency: "Romanian Leu",
        },
        {
          id: 119,
          code: "RSD",
          currency: "Serbian Dinar",
        },
        {
          id: 120,
          code: "RUB",
          currency: "Russian Ruble",
        },
        {
          id: 121,
          code: "RWF",
          currency: "Rwanda Franc",
        },
        {
          id: 122,
          code: "SAR",
          currency: "Saudi Riyal",
        },
        {
          id: 123,
          code: "SBD",
          currency: "Solomon Islands Dollar",
        },
        {
          id: 124,
          code: "SCR",
          currency: "Seychelles Rupee",
        },
        {
          id: 125,
          code: "SDG",
          currency: "Sudanese Pound",
        },
        {
          id: 126,
          code: "SEK",
          currency: "Swedish Krona",
        },
        {
          id: 127,
          code: "SGD",
          currency: "Singapore Dollar",
        },
        {
          id: 128,
          code: "SHP",
          currency: "Saint Helena Pound",
        },
        {
          id: 129,
          code: "SLE",
          currency: "Leone",
        },
        {
          id: 130,
          code: "SLL",
          currency: "Leone",
        },
        {
          id: 131,
          code: "SOS",
          currency: "Somali Shilling",
        },
        {
          id: 132,
          code: "SRD",
          currency: "Surinam Dollar",
        },
        {
          id: 133,
          code: "SSP",
          currency: "South Sudanese Pound",
        },
        {
          id: 134,
          code: "STN",
          currency: "Dobra",
        },
        {
          id: 135,
          code: "SVC",
          currency: "El Salvador Colon",
        },
        {
          id: 136,
          code: "SYP",
          currency: "Syrian Pound",
        },
        {
          id: 137,
          code: "SZL",
          currency: "Lilangeni",
        },
        {
          id: 138,
          code: "THB",
          currency: "Baht",
        },
        {
          id: 139,
          code: "TJS",
          currency: "Somoni",
        },
        {
          id: 140,
          code: "TMT",
          currency: "Turkmenistan New Manat",
        },
        {
          id: 141,
          code: "TND",
          currency: "Tunisian Dinar",
        },
        {
          id: 142,
          code: "TOP",
          currency: "Pa’anga",
        },
        {
          id: 143,
          code: "TRY",
          currency: "Turkish Lira",
        },
        {
          id: 144,
          code: "TTD",
          currency: "Trinidad and Tobago Dollar",
        },
        {
          id: 145,
          code: "TWD",
          currency: "New Taiwan Dollar",
        },
        {
          id: 146,
          code: "TZS",
          currency: "Tanzanian Shilling",
        },
        {
          id: 147,
          code: "UAH",
          currency: "Hryvnia",
        },
        {
          id: 148,
          code: "UGX",
          currency: "Uganda Shilling",
        },
        {
          id: 149,
          code: "USD",
          currency: "US Dollar",
        },
        {
          id: 150,
          code: "USN",
          currency: "US Dollar (Next day)",
        },
        {
          id: 151,
          code: "UYI",
          currency: "Uruguay Peso en Unidades Indexadas (UI)",
        },
        {
          id: 152,
          code: "UYU",
          currency: "Peso Uruguayo",
        },
        {
          id: 153,
          code: "UYW",
          currency: "Unidad Previsional",
        },
        {
          id: 154,
          code: "UZS",
          currency: "Uzbekistan Sum",
        },
        {
          id: 155,
          code: "VED",
          currency: "Bolívar Soberano",
        },
        {
          id: 156,
          code: "VES",
          currency: "Bolívar Soberano",
        },
        {
          id: 157,
          code: "VND",
          currency: "Dong",
        },
        {
          id: 158,
          code: "VUV",
          currency: "Vatu",
        },
        {
          id: 159,
          code: "WST",
          currency: "Tala",
        },
        {
          id: 160,
          code: "XAF",
          currency: "CFA Franc BEAC",
        },
        {
          id: 161,
          code: "XAG",
          currency: "Silver",
        },
        {
          id: 162,
          code: "XAU",
          currency: "Gold",
        },
        {
          id: 163,
          code: "XBA",
          currency: "Bond Markets Unit European Composite Unit (EURCO)",
        },
        {
          id: 164,
          code: "XBB",
          currency: "Bond Markets Unit European Monetary Unit (E.M.U.-6)",
        },
        {
          id: 165,
          code: "XBC",
          currency: "Bond Markets Unit European Unit of Account 9 (E.U.A.-9)",
        },
        {
          id: 166,
          code: "XBD",
          currency: "Bond Markets Unit European Unit of Account 17 (E.U.A.-17)",
        },
        {
          id: 167,
          code: "XCD",
          currency: "East Caribbean Dollar",
        },
        {
          id: 168,
          code: "XDR",
          currency: "SDR (Special Drawing Right)",
        },
        {
          id: 169,
          code: "XOF",
          currency: "CFA Franc BCEAO",
        },
        {
          id: 170,
          code: "XPD",
          currency: "Palladium",
        },
        {
          id: 171,
          code: "XPF",
          currency: "CFP Franc",
        },
        {
          id: 172,
          code: "XPT",
          currency: "Platinum",
        },
        {
          id: 173,
          code: "XSU",
          currency: "Sucre",
        },
        {
          id: 174,
          code: "XTS",
          currency: "Codes specifically reserved for testing purposes",
        },
        {
          id: 175,
          code: "XUA",
          currency: "ADB Unit of Account",
        },
        {
          id: 176,
          code: "XXX",
          currency:
            "The codes assigned for transactions where no currency is involved",
        },
        {
          id: 177,
          code: "YER",
          currency: "Yemeni Rial",
        },
        {
          id: 178,
          code: "ZAR",
          currency: "Rand",
        },
        {
          id: 179,
          code: "ZMW",
          currency: "Zambian Kwacha",
        },
        {
          id: 180,
          code: "ZWL",
          currency: "Zimbabwe Dollar",
        },
      ];

      const currency = data.map((currency) => ({
        id: currency["id"],
        label: currency["currency"],
        value: currency["code"],
      }));

      setCurrencyCode(currency); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error if needed
    }
  };
  const fetchInvoiceType = async () => {
    try {
      // const response = await get(API_ENDPOINTS.GET_INVOICE_TYPE);
      // if (!response.ok) {
      //   throw new Error("Failed to fetch");
      // }
      // const data = await response.json();
      const data = [
        {
          id: 1,
          code: "01",
          description: "Invoice",
        },
        {
          id: 2,
          code: "02",
          description: "Credit Note",
        },
        {
          id: 3,
          code: "03",
          description: "Debit Note",
        },
        {
          id: 4,
          code: "04",
          description: "Refund Note",
        },
        {
          id: 5,
          code: "11",
          description: "Self-billed Invoice",
        },
        {
          id: 6,
          code: "12",
          description: "Self-billed Credit Note",
        },
        {
          id: 7,
          code: "13",
          description: "Self-billed Debit Note",
        },
        {
          id: 8,
          code: "14",
          description: "Self-billed Refund Note",
        },
        {
          id: 9,
          code: "01",
          description: "Cash",
        },
        {
          id: 10,
          code: "02",
          description: "Cheque",
        },
        {
          id: 11,
          code: "03",
          description: "Bank Transfer",
        },
        {
          id: 12,
          code: "04",
          description: "Credit Card",
        },
        {
          id: 13,
          code: "05",
          description: "Debit Card",
        },
        {
          id: 14,
          code: "06",
          description: "e-Wallet / Digital Wallet",
        },
        {
          id: 15,
          code: "07",
          description: "Digital Bank",
        },
        {
          id: 16,
          code: "08",
          description: "Others",
        },
        {
          id: 17,
          code: "01",
          description: "Cash",
        },
        {
          id: 18,
          code: "02",
          description: "Cheque",
        },
        {
          id: 19,
          code: "03",
          description: "Bank Transfer",
        },
        {
          id: 20,
          code: "04",
          description: "Credit Card",
        },
        {
          id: 21,
          code: "05",
          description: "Debit Card",
        },
        {
          id: 22,
          code: "06",
          description: "e-Wallet / Digital Wallet",
        },
        {
          id: 23,
          code: "07",
          description: "Digital Bank",
        },
        {
          id: 24,
          code: "08",
          description: "Others",
        },
        {
          id: 25,
          code: "01",
          description: "Invoice",
        },
        {
          id: 26,
          code: "02",
          description: "Credit Note",
        },
        {
          id: 27,
          code: "03",
          description: "Debit Note",
        },
        {
          id: 28,
          code: "04",
          description: "Refund Note",
        },
        {
          id: 29,
          code: "11",
          description: "Self-billed Invoice",
        },
        {
          id: 30,
          code: "12",
          description: "Self-billed Credit Note",
        },
        {
          id: 31,
          code: "13",
          description: "Self-billed Debit Note",
        },
        {
          id: 32,
          code: "14",
          description: "Self-billed Refund Note",
        },
      ];

      const invoice = data.map((invoice) => ({
        id: invoice["id"],
        label: invoice["description"],
        value: invoice["code"],
      }));

      setInvoiceType(invoice); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error if needed
    }
  };

  const fetchStateData = async () => {
    try {
      // https://dev-einvoice.olamnet.com/api/einvoice/getCardsDetails
      // const response = await get(API_ENDPOINTS.GET_STATE_CODE);
      // if (!response.ok) {
      //   throw new Error("Failed to fetch");
      // }
      // const data = await response.json();
      const data = [
        {
          id: 1,
          code: "00",
          state: "All States",
        },
        {
          id: 2,
          code: "01",
          state: "Johor",
        },
        {
          id: 3,
          code: "02",
          state: "Kedah",
        },
        {
          id: 4,
          code: "03",
          state: "Kelantan",
        },
        {
          id: 5,
          code: "04",
          state: "Melaka",
        },
        {
          id: 6,
          code: "05",
          state: "Negeri Sembilan",
        },
        {
          id: 7,
          code: "06",
          state: "Pahang",
        },
        {
          id: 8,
          code: "07",
          state: "Pulau Pinang",
        },
        {
          id: 9,
          code: "08",
          state: "Perak",
        },
        {
          id: 10,
          code: "09",
          state: "Perlis",
        },
        {
          id: 11,
          code: "10",
          state: "Selangor",
        },
        {
          id: 12,
          code: "11",
          state: "Terengganu",
        },
        {
          id: 13,
          code: "12",
          state: "Sabah",
        },
        {
          id: 14,
          code: "13",
          state: "Sarawak",
        },
        {
          id: 15,
          code: "14",
          state: "Wilayah Persekutuan Kuala Lumpur",
        },
        {
          id: 16,
          code: "15",
          state: "Wilayah Persekutuan Labuan",
        },
        {
          id: 17,
          code: "16",
          state: "Wilayah Persekutuan Putrajaya",
        },
        {
          id: 18,
          code: "17",
          state: "Not Applicable",
        },
      ];
      console.log("before", data);
      const states = data.map((state) => ({
        id: state["id"],
        label: state["state"],
        value: state["code"],
      }));
      console.log("state options", states);
      setStateOptions(states); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error if needed
    }
  };

  const fetchCountry = async () => {
    try {
      // const response = await get(API_ENDPOINTS.GET_COUNTRY_CODE);
      // if (!response.ok) {
      //   throw new Error("Failed to fetch");
      // }
      // const data = await response.json();
      const countryData = [
        {
          id: 1,
          code: "ABW",
          country: "ARUBA",
        },
        {
          id: 2,
          code: "AFG",
          country: "AFGHANISTAN",
        },
        {
          id: 3,
          code: "AGO",
          country: "ANGOLA",
        },
        {
          id: 4,
          code: "AIA",
          country: "ANGUILLA",
        },
        {
          id: 5,
          code: "ALA",
          country: "ALAND ISLANDS",
        },
        {
          id: 6,
          code: "ALB",
          country: "ALBANIA",
        },
        {
          id: 7,
          code: "AND",
          country: "ANDORA",
        },
        {
          id: 8,
          code: "ARE",
          country: "UNITED ARAB EMIRATES",
        },
        {
          id: 9,
          code: "ARG",
          country: "ARGENTINA",
        },
        {
          id: 10,
          code: "ARM",
          country: "ARMENIA",
        },
        {
          id: 11,
          code: "ASM",
          country: "AMERICAN SAMOA",
        },
        {
          id: 12,
          code: "ATA",
          country: "ANTARCTICA",
        },
        {
          id: 13,
          code: "ATF",
          country: "FRENCH SOUTHERN TERRITORIES",
        },
        {
          id: 14,
          code: "ATG",
          country: "ANTIGUA AND BARBUDA",
        },
        {
          id: 15,
          code: "AUS",
          country: "AUSTRALIA",
        },
        {
          id: 16,
          code: "AUT",
          country: "AUSTRIA",
        },
        {
          id: 17,
          code: "AZE",
          country: "AZERBAIDJAN",
        },
        {
          id: 18,
          code: "BDI",
          country: "BURUNDI",
        },
        {
          id: 19,
          code: "BEL",
          country: "BELGIUM",
        },
        {
          id: 20,
          code: "BEN",
          country: "BENIN",
        },
        {
          id: 21,
          code: "BES",
          country: "BONAIRE, SINT EUSTATIUS AND SABA",
        },
        {
          id: 22,
          code: "BFA",
          country: "BURKINA FASO",
        },
        {
          id: 23,
          code: "BGD",
          country: "BANGLADESH",
        },
        {
          id: 24,
          code: "BGR",
          country: "BULGARIA",
        },
        {
          id: 25,
          code: "BHR",
          country: "BAHRAIN",
        },
        {
          id: 26,
          code: "BHS",
          country: "BAHAMAS",
        },
        {
          id: 27,
          code: "BIH",
          country: "BOSNIA AND HERZEGOVINA",
        },
        {
          id: 28,
          code: "BLM",
          country: "SAINT BARTHELEMY",
        },
        {
          id: 29,
          code: "BLR",
          country: "BELARUS",
        },
        {
          id: 30,
          code: "BLZ",
          country: "BELIZE",
        },
        {
          id: 31,
          code: "BMU",
          country: "BERMUDA",
        },
        {
          id: 32,
          code: "BOL",
          country: "BOLIVIA",
        },
        {
          id: 33,
          code: "BRA",
          country: "BRAZIL",
        },
        {
          id: 34,
          code: "BRB",
          country: "BARBADOS",
        },
        {
          id: 35,
          code: "BRN",
          country: "BRUNEI DARUSSALAM",
        },
        {
          id: 36,
          code: "BTN",
          country: "BHUTAN",
        },
        {
          id: 37,
          code: "BVT",
          country: "BOUVET ISLAND",
        },
        {
          id: 38,
          code: "BWA",
          country: "BOTSWANA",
        },
        {
          id: 39,
          code: "CAF",
          country: "CENTRAL AFRICAN REPUBLIC",
        },
        {
          id: 40,
          code: "CAN",
          country: "CANADA",
        },
        {
          id: 41,
          code: "CCK",
          country: "COCOS ISLAND",
        },
        {
          id: 42,
          code: "CHE",
          country: "SWITZERLAND",
        },
        {
          id: 43,
          code: "CHL",
          country: "CHILE",
        },
        {
          id: 44,
          code: "CHN",
          country: "CHINA",
        },
        {
          id: 45,
          code: "CIV",
          country: "COTE D'IVOIRE",
        },
        {
          id: 46,
          code: "CMR",
          country: "CAMEROON",
        },
        {
          id: 47,
          code: "COD",
          country: "CONGO, THE DEMOCRATIC REPUBLIC",
        },
        {
          id: 48,
          code: "COG",
          country: "CONGO",
        },
        {
          id: 49,
          code: "COK",
          country: "COOK ISLANDS",
        },
        {
          id: 50,
          code: "COL",
          country: "COLOMBIA",
        },
        {
          id: 51,
          code: "COM",
          country: "COMOROS",
        },
        {
          id: 52,
          code: "CPV",
          country: "CAPE VERDE",
        },
        {
          id: 53,
          code: "CRI",
          country: "COSTA RICA",
        },
        {
          id: 54,
          code: "CUB",
          country: "CUBA",
        },
        {
          id: 55,
          code: "CUW",
          country: "CURACAO",
        },
        {
          id: 56,
          code: "CXR",
          country: "CHRISTMAS ISLANDS",
        },
        {
          id: 57,
          code: "CYM",
          country: "CAYMAN ISLANDS",
        },
        {
          id: 58,
          code: "CYP",
          country: "CYPRUS",
        },
        {
          id: 59,
          code: "CZE",
          country: "CZECH REPUBLIC",
        },
        {
          id: 60,
          code: "DEU",
          country: "GERMANY",
        },
        {
          id: 61,
          code: "DJI",
          country: "DJIBOUTI",
        },
        {
          id: 62,
          code: "DMA",
          country: "DOMINICA",
        },
        {
          id: 63,
          code: "DNK",
          country: "DENMARK",
        },
        {
          id: 64,
          code: "DOM",
          country: "DOMINICAN REPUBLIC",
        },
        {
          id: 65,
          code: "DZA",
          country: "ALGERIA",
        },
        {
          id: 66,
          code: "ECU",
          country: "ECUADOR",
        },
        {
          id: 67,
          code: "EGY",
          country: "EGYPT",
        },
        {
          id: 68,
          code: "ERI",
          country: "ERITREA",
        },
        {
          id: 69,
          code: "ESH",
          country: "WESTERN SAHARA",
        },
        {
          id: 70,
          code: "ESP",
          country: "SPAIN",
        },
        {
          id: 71,
          code: "EST",
          country: "ESTONIA",
        },
        {
          id: 72,
          code: "ETH",
          country: "ETHIOPIA",
        },
        {
          id: 73,
          code: "FIN",
          country: "FINLAND",
        },
        {
          id: 74,
          code: "FJI",
          country: "FIJI",
        },
        {
          id: 75,
          code: "FLK",
          country: "FALKLAND ISLANDS (MALVINAS)",
        },
        {
          id: 76,
          code: "FRA",
          country: "FRANCE",
        },
        {
          id: 77,
          code: "FRO",
          country: "FAEROE ISLANDS",
        },
        {
          id: 78,
          code: "FSM",
          country: "MICRONESIA, FEDERATED STATES OF",
        },
        {
          id: 79,
          code: "GAB",
          country: "GABON",
        },
        {
          id: 80,
          code: "GBR",
          country: "UNITED KINGDOM",
        },
        {
          id: 81,
          code: "GEO",
          country: "GEORGIA",
        },
        {
          id: 82,
          code: "GGY",
          country: "GUERNSEY",
        },
        {
          id: 83,
          code: "GHA",
          country: "GHANA",
        },
        {
          id: 84,
          code: "GIB",
          country: "GIBRALTAR",
        },
        {
          id: 85,
          code: "GIN",
          country: "GUINEA",
        },
        {
          id: 86,
          code: "GLP",
          country: "GUADELOUPE",
        },
        {
          id: 87,
          code: "GMB",
          country: "GAMBIA",
        },
        {
          id: 88,
          code: "GNB",
          country: "GUINEA-BISSAU",
        },
        {
          id: 89,
          code: "GNQ",
          country: "EQUATORIAL GUINEA",
        },
        {
          id: 90,
          code: "GRC",
          country: "GREECE",
        },
        {
          id: 91,
          code: "GRD",
          country: "GRENADA",
        },
        {
          id: 92,
          code: "GRL",
          country: "GREENLAND",
        },
        {
          id: 93,
          code: "GTM",
          country: "GUATEMALA",
        },
        {
          id: 94,
          code: "GUF",
          country: "FRENCH GUIANA",
        },
        {
          id: 95,
          code: "GUM",
          country: "GUAM",
        },
        {
          id: 96,
          code: "GUY",
          country: "GUYANA",
        },
        {
          id: 97,
          code: "HKG",
          country: "HONG KONG",
        },
        {
          id: 98,
          code: "HMD",
          country: "HEARD AND MCDONALD ISLANDS",
        },
        {
          id: 99,
          code: "HND",
          country: "HONDURAS",
        },
        {
          id: 100,
          code: "HRV",
          country: "CROATIA",
        },
        {
          id: 101,
          code: "HTI",
          country: "HAITI",
        },
        {
          id: 102,
          code: "HUN",
          country: "HUNGARY",
        },
        {
          id: 103,
          code: "IDN",
          country: "INDONESIA",
        },
        {
          id: 104,
          code: "IMN",
          country: "ISLE OF MAN",
        },
        {
          id: 105,
          code: "IND",
          country: "INDIA",
        },
        {
          id: 106,
          code: "IOT",
          country: "BRITISH INDIAN OCEAN TERRITORY",
        },
        {
          id: 107,
          code: "IRL",
          country: "IRELAND",
        },
        {
          id: 108,
          code: "IRN",
          country: "IRAN",
        },
        {
          id: 109,
          code: "IRQ",
          country: "IRAQ",
        },
        {
          id: 110,
          code: "ISL",
          country: "ICELAND",
        },
        {
          id: 111,
          code: "ISR",
          country: "ISRAEL",
        },
        {
          id: 112,
          code: "ITA",
          country: "ITALY",
        },
        {
          id: 113,
          code: "JAM",
          country: "JAMAICA",
        },
        {
          id: 114,
          code: "JEY",
          country: "JERSEY (CHANNEL ISLANDS)",
        },
        {
          id: 115,
          code: "JOR",
          country: "JORDAN",
        },
        {
          id: 116,
          code: "JPN",
          country: "JAPAN",
        },
        {
          id: 117,
          code: "KAZ",
          country: "KAZAKHSTAN",
        },
        {
          id: 118,
          code: "KEN",
          country: "KENYA",
        },
        {
          id: 119,
          code: "KGZ",
          country: "KYRGYZSTAN",
        },
        {
          id: 120,
          code: "KHM",
          country: "CAMBODIA",
        },
        {
          id: 121,
          code: "KIR",
          country: "KIRIBATI",
        },
        {
          id: 122,
          code: "KNA",
          country: "ST.KITTS AND NEVIS",
        },
        {
          id: 123,
          code: "KOR",
          country: "THE REPUBLIC OF KOREA",
        },
        {
          id: 124,
          code: "KWT",
          country: "KUWAIT",
        },
        {
          id: 125,
          code: "LAO",
          country: "LAOS",
        },
        {
          id: 126,
          code: "LBN",
          country: "LEBANON",
        },
        {
          id: 127,
          code: "LBR",
          country: "LIBERIA",
        },
        {
          id: 128,
          code: "LBY",
          country: "LIBYAN ARAB JAMAHIRIYA",
        },
        {
          id: 129,
          code: "LCA",
          country: "SAINT LUCIA",
        },
        {
          id: 130,
          code: "LIE",
          country: "LIECHTENSTEIN",
        },
        {
          id: 131,
          code: "LKA",
          country: "SRI LANKA",
        },
        {
          id: 132,
          code: "LSO",
          country: "LESOTHO",
        },
        {
          id: 133,
          code: "LTU",
          country: "LITHUANIA",
        },
        {
          id: 134,
          code: "LUX",
          country: "LUXEMBOURG",
        },
        {
          id: 135,
          code: "LVA",
          country: "LATVIA",
        },
        {
          id: 136,
          code: "MAC",
          country: "MACAO",
        },
        {
          id: 137,
          code: "MAF",
          country: "SAINT MARTIN (FRENCH PART)",
        },
        {
          id: 138,
          code: "MAR",
          country: "MOROCCO",
        },
        {
          id: 139,
          code: "MCO",
          country: "MONACO",
        },
        {
          id: 140,
          code: "MDA",
          country: "MOLDOVA, REPUBLIC OF",
        },
        {
          id: 141,
          code: "MDG",
          country: "MADAGASCAR",
        },
        {
          id: 142,
          code: "MDV",
          country: "MALDIVES",
        },
        {
          id: 143,
          code: "MEX",
          country: "MEXICO",
        },
        {
          id: 144,
          code: "MHL",
          country: "MARSHALL ISLANDS",
        },
        {
          id: 145,
          code: "MKD",
          country: "MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF",
        },
        {
          id: 146,
          code: "MLI",
          country: "MALI",
        },
        {
          id: 147,
          code: "MLT",
          country: "MALTA",
        },
        {
          id: 148,
          code: "MMR",
          country: "MYANMAR",
        },
        {
          id: 149,
          code: "MNE",
          country: "MONTENEGRO",
        },
        {
          id: 150,
          code: "MNG",
          country: "MONGOLIA",
        },
        {
          id: 151,
          code: "MNP",
          country: "NORTHERN MARIANA ISLANDS",
        },
        {
          id: 152,
          code: "MOZ",
          country: "MOZAMBIQUE",
        },
        {
          id: 153,
          code: "MRT",
          country: "MAURITANIA",
        },
        {
          id: 154,
          code: "MSR",
          country: "MONTSERRAT",
        },
        {
          id: 155,
          code: "MTQ",
          country: "MARTINIQUE",
        },
        {
          id: 156,
          code: "MUS",
          country: "MAURITIUS",
        },
        {
          id: 157,
          code: "MWI",
          country: "MALAWI",
        },
        {
          id: 158,
          code: "MYS",
          country: "MALAYSIA",
        },
        {
          id: 159,
          code: "MYT",
          country: "MAYOTTE",
        },
        {
          id: 160,
          code: "NAM",
          country: "NAMIBIA",
        },
        {
          id: 161,
          code: "NCL",
          country: "NEW CALEDONIA",
        },
        {
          id: 162,
          code: "NER",
          country: "NIGER",
        },
        {
          id: 163,
          code: "NFK",
          country: "NORFOLK ISLAND",
        },
        {
          id: 164,
          code: "NGA",
          country: "NIGERIA",
        },
        {
          id: 165,
          code: "NIC",
          country: "NICARAGUA",
        },
        {
          id: 166,
          code: "NIU",
          country: "NIUE",
        },
        {
          id: 167,
          code: "NLD",
          country: "NETHERLANDS",
        },
        {
          id: 168,
          code: "NOR",
          country: "NORWAY",
        },
        {
          id: 169,
          code: "NPL",
          country: "NEPAL",
        },
        {
          id: 170,
          code: "NRU",
          country: "NAURU",
        },
        {
          id: 171,
          code: "NZL",
          country: "NEW ZEALAND",
        },
        {
          id: 172,
          code: "OMN",
          country: "OMAN",
        },
        {
          id: 173,
          code: "PAK",
          country: "PAKISTAN",
        },
        {
          id: 174,
          code: "PAN",
          country: "PANAMA",
        },
        {
          id: 175,
          code: "PCN",
          country: "PITCAIRN",
        },
        {
          id: 176,
          code: "PER",
          country: "PERU",
        },
        {
          id: 177,
          code: "PHL",
          country: "PHILIPPINES",
        },
        {
          id: 178,
          code: "PLW",
          country: "PALAU",
        },
        {
          id: 179,
          code: "PNG",
          country: "PAPUA NEW GUINEA",
        },
        {
          id: 180,
          code: "POL",
          country: "POLAND",
        },
        {
          id: 181,
          code: "PRI",
          country: "PUERTO RICO",
        },
        {
          id: 182,
          code: "PRK",
          country: "DEMOC.PEOPLES REP.OF KOREA",
        },
        {
          id: 183,
          code: "PRT",
          country: "PORTUGAL",
        },
        {
          id: 184,
          code: "PRY",
          country: "PARAGUAY",
        },
        {
          id: 185,
          code: "PSE",
          country: "PALESTINIAN TERRITORY, OCCUPIED",
        },
        {
          id: 186,
          code: "PYF",
          country: "FRENCH POLYNESIA",
        },
        {
          id: 187,
          code: "QAT",
          country: "QATAR",
        },
        {
          id: 188,
          code: "REU",
          country: "REUNION",
        },
        {
          id: 189,
          code: "ROU",
          country: "ROMANIA",
        },
        {
          id: 190,
          code: "RUS",
          country: "RUSSIAN FEDERATION (USSR)",
        },
        {
          id: 191,
          code: "RWA",
          country: "RWANDA",
        },
        {
          id: 192,
          code: "SAU",
          country: "SAUDI ARABIA",
        },
        {
          id: 193,
          code: "SDN",
          country: "SUDAN",
        },
        {
          id: 194,
          code: "SEN",
          country: "SENEGAL",
        },
        {
          id: 195,
          code: "SGP",
          country: "SINGAPORE",
        },
        {
          id: 196,
          code: "SGS",
          country: "SOUTH GEORGIA AND THE SOUTH SANDWICH ISLAND",
        },
        {
          id: 197,
          code: "SHN",
          country: "ST. HELENA",
        },
        {
          id: 198,
          code: "SJM",
          country: "SVALBARD AND JAN MAYEN ISLANDS",
        },
        {
          id: 199,
          code: "SLB",
          country: "SOLOMON ISLANDS",
        },
        {
          id: 200,
          code: "SLE",
          country: "SIERRA LEONE",
        },
        {
          id: 201,
          code: "SLV",
          country: "EL SALVADOR",
        },
        {
          id: 202,
          code: "SMR",
          country: "SAN MARINO",
        },
        {
          id: 203,
          code: "SOM",
          country: "SOMALIA",
        },
        {
          id: 204,
          code: "SPM",
          country: "ST. PIERRE AND MIQUELON",
        },
        {
          id: 205,
          code: "SRB",
          country: "SERBIA & MONTENEGRO",
        },
        {
          id: 206,
          code: "SSD",
          country: "SOUTH SUDAN",
        },
        {
          id: 207,
          code: "STP",
          country: "SAO TOME AND PRINCIPE",
        },
        {
          id: 208,
          code: "SUR",
          country: "SURINAME",
        },
        {
          id: 209,
          code: "SVK",
          country: "SLOVAK REPUBLIC",
        },
        {
          id: 210,
          code: "SVN",
          country: "SLOVENIA",
        },
        {
          id: 211,
          code: "SWE",
          country: "SWEDEN",
        },
        {
          id: 212,
          code: "SWZ",
          country: "ESWATINI, KINGDOM OF (SWAZILAND)",
        },
        {
          id: 213,
          code: "SXM",
          country: "SINT MAARTEN (DUTCH PART)",
        },
        {
          id: 214,
          code: "SYC",
          country: "SEYCHELLES",
        },
        {
          id: 215,
          code: "SYR",
          country: "SYRIAN ARAB REPUBLIC",
        },
        {
          id: 216,
          code: "TCA",
          country: "TURKS AND CAICOS ISLANDS",
        },
        {
          id: 217,
          code: "TCD",
          country: "CHAD",
        },
        {
          id: 218,
          code: "TGO",
          country: "TOGO",
        },
        {
          id: 219,
          code: "THA",
          country: "THAILAND",
        },
        {
          id: 220,
          code: "TJK",
          country: "TAJIKISTAN",
        },
        {
          id: 221,
          code: "TKL",
          country: "TOKELAU",
        },
        {
          id: 222,
          code: "TKM",
          country: "TURKMENISTAN",
        },
        {
          id: 223,
          code: "TLS",
          country: "TIMOR-LESTE",
        },
        {
          id: 224,
          code: "TON",
          country: "TONGA",
        },
        {
          id: 225,
          code: "TTO",
          country: "TRINIDAD AND TOBAGO",
        },
        {
          id: 226,
          code: "TUN",
          country: "TUNISIA",
        },
        {
          id: 227,
          code: "TUR",
          country: "TURKIYE",
        },
        {
          id: 228,
          code: "TUV",
          country: "TUVALU",
        },
        {
          id: 229,
          code: "TWN",
          country: "TAIWAN",
        },
        {
          id: 230,
          code: "TZA",
          country: "TANZANIA UNITED REPUBLIC",
        },
        {
          id: 231,
          code: "UGA",
          country: "UGANDA",
        },
        {
          id: 232,
          code: "UKR",
          country: "UKRAINE",
        },
        {
          id: 233,
          code: "UMI",
          country: "UNITED STATES MINOR OUTLYING ISLANDS",
        },
        {
          id: 234,
          code: "URY",
          country: "URUGUAY",
        },
        {
          id: 235,
          code: "USA",
          country: "UNITED STATES OF AMERICA",
        },
        {
          id: 236,
          code: "UZB",
          country: "UZBEKISTAN",
        },
        {
          id: 237,
          code: "VAT",
          country: "VATICAN CITY STATE (HOLY SEE)",
        },
        {
          id: 238,
          code: "VCT",
          country: "SAINT VINCENT AND GRENADINES",
        },
        {
          id: 239,
          code: "VEN",
          country: "VENEZUELA",
        },
        {
          id: 240,
          code: "VGB",
          country: "VIRGIN ISLANDS(BRITISH)",
        },
        {
          id: 241,
          code: "VIR",
          country: "VIRGIN ISLANDS(US)",
        },
        {
          id: 242,
          code: "VNM",
          country: "VIETNAM",
        },
        {
          id: 243,
          code: "VUT",
          country: "VANUATU",
        },
        {
          id: 244,
          code: "WLF",
          country: "WALLIS AND FUTUNA ISLANDS",
        },
        {
          id: 245,
          code: "WSM",
          country: "SAMOA",
        },
        {
          id: 246,
          code: "YEM",
          country: "YEMEN",
        },
        {
          id: 247,
          code: "ZAF",
          country: "SOUTH AFRICA",
        },
        {
          id: 248,
          code: "ZMB",
          country: "ZAMBIA",
        },
        {
          id: 249,
          code: "ZWE",
          country: "ZIMBABWE",
        },
      ];

      const countries = countryData.map((country) => ({
        label: country["country"],
        value: country["code"],
      }));
      console.log("state options", countries);
      setCountryOptions(countries); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error if needed
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleGenerateOpenModal = () => {
    setOpenGenrateInvoiceModal(true);
  };

  const handleGenerateCloseModal = () => {
    setOpenGenrateInvoiceModal(false);
  };
  const calculateSummary = () => {
    let subtotal = 0;
    let totalDiscount = 0;
    let totalIncludingTax = 0;
    let amountExemptedFromTax = 0;

    rows.forEach((row) => {
      const unitPrice = parseFloat(row.unitPrice) || 0;
      const quantity = parseFloat(row.quantity) || 0;
      const taxRate = parseFloat(row.taxRate) || 0;
      const discountRate = parseFloat(row.discount) || 0;

      const rowSubtotal = unitPrice * quantity;
      const rowTaxAmount = (rowSubtotal * taxRate) / 100;

      const rowTotalAmount = rowSubtotal + rowTaxAmount;
      // const finalAmount =
      //   rowTotalAmount - (rowTotalAmount * discountRate) / 100;
      const rowDiscountAmount = rowTotalAmount * (discountRate / 100);

      subtotal += rowSubtotal;
      totalDiscount += rowDiscountAmount;
      totalIncludingTax += rowTotalAmount;
      if (taxRate === 0) {
        amountExemptedFromTax += rowSubtotal;
      }
    });

    // const amountExemptedFromTax = 0;
    const totalExcludingTax = subtotal;
    const netTotal = totalIncludingTax - totalDiscount;

    setSummary({
      subtotal,
      amountExemptedFromTax,
      totalExcludingTax,
      totalIncludingTax,
      totalDiscount,
      netTotal,
    });
  };
  const [isSupplierInfoExpanded, setSupplierInfoExpanded] = useState(true);
  const [isBuyerInfoExpanded, setBuyerInfoExpanded] = useState(false);
  const [isInvoiceDetailsInfoExpanded, setInvoiceDetailsExpanded] =
    useState(false);
  const [isProductDetailsInfoExpanded, setProductDetailsExpanded] =
    useState(false);

  const toggleSupplierInfo = () => {
    setSupplierInfoExpanded(!isSupplierInfoExpanded);
  };

  const toggleBuyerInfo = () => {
    setBuyerInfoExpanded(!isBuyerInfoExpanded);
  };
  const toggleInvoiceDetailsInfo = () => {
    setInvoiceDetailsExpanded(!isInvoiceDetailsInfoExpanded);
  };
  const toggleProductDetailsInfo = () => {
    setProductDetailsExpanded(!isProductDetailsInfoExpanded);
  };

  const handleInputChange = (e, field, index) => {
    const value = e.target.value;
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    // Calculate total amount
    const unitPrice = parseFloat(updatedRows[index].unitPrice) || 0;
    const quantity = parseFloat(updatedRows[index].quantity) || 0;
    const taxRate = parseFloat(updatedRows[index].taxRate) || 0;
    const discountRate = parseFloat(updatedRows[index].discount) || 0;

    const subtotal = unitPrice * quantity;
    const discountAmount = (subtotal * discountRate) / 100;
    const subtotalAfterDiscount = subtotal - discountAmount;
    const taxAmount = (subtotalAfterDiscount * taxRate) / 100;
    // const taxAmount = (subtotal * taxRate) / 100;
    const finalAmount = subtotalAfterDiscount + taxAmount;
    const totalAmount = subtotal + taxAmount;
    // const finalAmount = totalAmount - (totalAmount * discountRate) / 100;
    updatedRows[index].discountAmount = discountAmount.toFixed(2);
    updatedRows[index].taxAmount = taxAmount.toFixed(2);
    updatedRows[index].totalAmount = finalAmount.toFixed(2);

    setRows(updatedRows);
  };

  const handleDelete = () => {
    if (!deleting) {
      setDeleting(true);
      // Simulating deletion process with a timeout
      const interval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(interval);
            setDeleting(false);
            setTimeout(() => {
              handleClose();
              // Additional actions after deletion completion
            }, 10000); // Delay for 1 second before closing the modal
            return oldProgress;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500); // Simulated delay for progress update
    } else {
      handleClose();
      // Additional actions for canceling deletion
    }
  };

  const addRow = () => {
    if (isPreviousRowFilled(rows.length - 1)) {
      setRows([
        ...rows,
        {
          classification: "",
          description: "",
          unitPrice: "",
          quantity: "",
          taxType: "",
          taxRate: "",
          taxAmount: "",
          discount: "",
          totalAmount: "",
        },
      ]);
    } else {
      alert(
        "Please fill out all fields in the previous row before adding a new row."
      );
    }
  };
  const isPreviousRowFilled = (index) => {
    const row = rows[index];
    return Object.values(row).every((value) => value !== "");
  };
  const classification = [
    {
      Code: "001",
      Description: "Breastfeeding equipment",
    },
    {
      Code: "002",
      Description: "Child care centres and kindergartens fees",
    },
    {
      Code: "003",
      Description: "Computer, smartphone or tablet",
    },
    {
      Code: "004",
      Description: "Consolidated e-Invoice",
    },
    {
      Code: "005",
      Description:
        "Construction materials (as specified under Fourth Schedule of the Lembaga Pembangunan Industri Pembinaan Malaysia Act 1994)",
    },
  ];

  const classificationOptions = classification.map((c) => ({
    label: c.Description,
    value: c.Code,
  }));
  const handleDropdownSelectClassificationChange = (event, field, index) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = event.value;

    // Update state or data accordingly
    setRows(updatedRows);
  };

  const removeLastRow = () => {
    if (rows.length > 1) {
      const newRows = rows.slice(0, -1);
      setRows(newRows);
    }
  };
  const columns = [
    {
      field: "classification",
      header: "Classification",
      style: { width: "100px" },
    },
    {
      field: "description",
      header: "Description",
      style: { width: "150px" },
    },
    {
      field: "unitPrice",
      header: "Unit Price",
      style: { width: "150px" },
    },
    {
      field: "quantity",
      header: "Qty",
      style: { width: "150px" },
    },
    {
      field: "taxType",
      header: "Tax Type",
      style: { width: "150px" },
    },
    {
      field: "taxRate",
      header: "Tax Rate",
      style: { width: "150px" },
    },
    {
      field: "taxAmount",
      header: "Tax Amount",
      style: { width: "150px" },
    },
    {
      field: "discount",
      header: "Discount",
      style: { width: "150px" },
    },
    {
      field: "totalAmount",
      header: "Total Amount",
      style: { width: "120px" },
    },
  ];

  const data = rows.map((row, index) => ({
    classification: (
      // <Dropdown
      //   value={row.classification}
      //   options={classificationOptions}
      //   onChange={(e) =>
      //     handleDropdownSelectClassificationChange(e, "classification", index)
      //   }
      //   placeholder="Select"
      //   style={{ width: "100%" }}
      // />
      <InputText
        type="text"
        placeholder="Enter"
        style={{ width: "100%" }}
        value={row.classification}
        onChange={(e) => handleInputChange(e, "classification", index)}
      />
    ),
    description: (
      <InputText
        type="text"
        placeholder="Enter"
        style={{ width: "100%" }}
        value={row.description}
        onChange={(e) => handleInputChange(e, "description", index)}
      />
    ),
    unitPrice: (
      <InputText
        type="text"
        placeholder="Enter"
        style={{ width: "100%" }}
        value={row.unitPrice}
        onChange={(e) => handleInputChange(e, "unitPrice", index)}
      />
    ),
    quantity: (
      <InputText
        type="text"
        placeholder="Enter"
        style={{ width: "100%" }}
        value={row.quantity}
        onChange={(e) => handleInputChange(e, "quantity", index)}
      />
    ),
    taxType: (
      <Dropdown
        value={row.taxType}
        options={taxTypeOptions}
        onChange={(e) => handleDropdownSelectTaxTypeChange(e, "taxType", index)}
        placeholder="Select"
        style={{ width: "100%" }}
      />
    ),
    taxRate: (
      <InputText
        type="text"
        placeholder="Enter"
        style={{ width: "100%" }}
        value={row.taxRate}
        onChange={(e) => handleInputChange(e, "taxRate", index)}
      />
    ),
    taxAmount: (
      <InputText
        type="text"
        placeholder="Enter"
        style={{ width: "100%" }}
        value={row.taxAmount}
        onChange={(e) => handleInputChange(e, "taxAmount", index)}
      />
    ),
    discount: (
      <InputText
        type="text"
        placeholder="Enter"
        style={{ width: "100%" }}
        value={row.discount}
        onChange={(e) => handleInputChange(e, "discount", index)}
      />
    ),
    totalAmount: (
      <InputText
        type="text"
        placeholder="Enter"
        style={{ width: "100%" }}
        value={row.totalAmount}
        onChange={(e) => handleInputChange(e, "totalAmount", index)}
      />
    ),
  }));

  const handleDateChange = (e) => {
    setInvoiceDateTime(e.value);
  };

  const handleValidationDateChange = (e) => {
    setValidationDateTime(e.value);
  };

  // const newPaymentMethods = [
  //   { Code: "01", "Payment Method": "Cash" },
  //   { Code: "02", "Payment Method": "Cheque" },
  //   { Code: "03", "Payment Method": "Bank Transfer" },
  //   { Code: "04", "Payment Method": "Credit Card" },
  //   { Code: "05", "Payment Method": "Debit Card" },
  //   { Code: "06", "Payment Method": "e-Wallet / Digital Wallet" },
  //   { Code: "07", "Payment Method": "Digital Bank" },
  //   { Code: "08", "Payment Method": "Others" },
  // ];

  // const paymentMode = newPaymentMethods.map((method) => ({
  //   label: method["Payment Method"],
  //   value: method["Code"],
  // }));
  const paymentTerms = [
    { label: "Type 1", value: "T1" },
    { label: "Type 2", value: "T2" },
  ];
  // const currencyCode = [
  //   { label: "Dollar", value: "T1" },
  //   { label: "Rupe", value: "T2" },
  // ];
  // const stateData = [
  //   { Code: "00", State: "All States" },
  //   { Code: "01", State: "Johor" },
  //   { Code: "02", State: "Kedah" },
  //   { Code: "03", State: "Kelantan" },
  //   { Code: "04", State: "Melaka" },
  //   { Code: "05", State: "Negeri Sembilan" },
  //   { Code: "06", State: "Pahang" },
  //   { Code: "07", State: "Pulau Pinang" },
  //   { Code: "08", State: "Perak" },
  //   { Code: "09", State: "Perlis" },
  //   { Code: "10", State: "Selangor" },
  //   { Code: "11", State: "Terengganu" },
  //   { Code: "12", State: "Sabah" },
  //   { Code: "13", State: "Sarawak" },
  //   { Code: "14", State: "Wilayah Persekutuan Kuala Lumpur" },
  //   { Code: "15", State: "Wilayah Persekutuan Labuan" },
  //   { Code: "16", State: "Wilayah Persekutuan Putrajaya" },
  //   { Code: "17", State: "Not Applicable" },
  // ];

  // const stateOptions = stateData.map((state) => ({
  //   label: state["State"],
  //   value: state["Code"],
  // }));

  // const msicCodeAndBusinessActivityOptions = [
  //   {
  //     Code: "00000",
  //     Description: "NOT APPLICABLE",
  //     "MSIC Category Reference": "",
  //   },
  //   {
  //     Code: "01111",
  //     Description: "Growing of maize",
  //     "MSIC Category Reference": "A",
  //   },
  //   {
  //     Code: "01112",
  //     Description: "Growing of leguminous crops",
  //     "MSIC Category Reference": "A",
  //   },
  //   {
  //     Code: "01113",
  //     Description: "Growing of oil seeds",
  //     "MSIC Category Reference": "A",
  //   },
  // ].map((item) => ({
  //   label: `${item.Code} - ${item.Description}`,
  //   value: item.Code,
  // }));
  const msicBusinessActivityMapping = [
    {
      Code: "00000",
      Description: "NOT APPLICABLE",
      "MSIC Category Reference": "",
    },
    {
      Code: "01111",
      Description: "Growing of maize",
      "MSIC Category Reference": "A",
    },
    {
      Code: "01112",
      Description: "Growing of leguminous crops",
      "MSIC Category Reference": "A",
    },
    {
      Code: "01113",
      Description: "Growing of oil seeds",
      "MSIC Category Reference": "A",
    },
  ];

  const msicCodeOptions = msicBusinessActivityMapping.map((item) => ({
    label: item.Code,
    value: item.Code,
  }));

  const businessActivityOptions = msicBusinessActivityMapping.map((item) => ({
    label: item.Description,
    value: item.Description,
  }));

  const handleMsicCodeAndBusinessActivityDropdownChange = (e) => {
    const selectedCode = e.value;
    setMsicCode(selectedCode);
    const selectedDescription =
      msicBusinessActivityMapping.find((item) => item.Code === selectedCode)
        ?.Description || null;
    setBusinessActivityDesc(selectedDescription);
  };
  const handlesetBusinessActivityDescDropdownChange = (e) => {
    const selectedDescription = e.value;
    setBusinessActivityDesc(selectedDescription);
    const selectedCode =
      msicBusinessActivityMapping.find(
        (item) => item.Description === selectedDescription
      )?.Code || null;
    setMsicCode(selectedCode);
  };

  // msicCodeAndBusinessActivityOptions

  const handleSupplierSignFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      // If no file is selected, set an error message and return
      setSupplierSignatureError("Please upload a file.");
      return;
    }

    // Check if file size is greater than 100kb
    if (file.size > 100 * 1024) {
      // Convert kb to bytes
      setSupplierSignatureError(
        "Image size exceeds 100kb. Please upload an image with a maximum size of 100kb."
      );
      // Reset the file input
      event.target.value = null;
      return;
    }

    // File is valid, update the digital signature and clear any error
    setSupplierDigiSign(file.name);
    setSupplierSignatureError("");
  };

  const handleDropdownChange = (e) => {
    setInvoiceCurrencyCode(e.value);
  };
  const handleStateDropdownChange = (e) => {
    setSupplierState(e.value);
  };
  const handleBuyerStateDropdownChange = (e) => {
    setBuyerStateName(e.value);
  };
  const handleCountryDropdownChange = (e) => {
    setSupplierCountry(e.value);
  };
  const handleBuyerCountryDropdownChange = (e) => {
    setBuyerCountry(e.value);
  };

  const handleTypeDropdownChange = (e) => {
    setSelectedInvoiceType(e.value);
  };

  const handlePaymentModeDropdownChange = (e) => {
    setSelectedPaymentMode(e.value);
  };

  const handlePaymentTypeDropdownChange = (e) => {
    setSelectedPaymentTerms(e.value);
  };

  const handleDropdownSelectTaxTypeChange = (event, field, index) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = event.value;

    // Update state or data accordingly
    setRows(updatedRows);
  };

  const handleClearAll = () => {
    console.log("Clear All clicked");
    // Add your clear all logic here
    // Supplier Info
    setSupplierName("");
    setEmailAddress("");
    setValidationMessage("");
    setContactNumber("");
    setAddress("");
    setTaxIDNumber("");
    setCityName("");
    setSupplierState("");
    setSupplierCountry("");
    setPassportIdNumber("");
    setSstRegNumber("");
    setTourismRegNumber("");
    setMsicCode("");
    setBusinessActivityDesc("");

    // Buyer Info
    setBuyerName("");
    setBuyerEmailAddress("");
    setBuyerContactNumber("");
    setBuyerAddress("");
    setBuyerCityName("");
    setBuyerTaxIDNumber("");
    setBuyerPassportIdNumber("");
    setBuyerSstRegNumber("");

    // Invoice Details
    setInvoiceVersion("");
    // setSelectedVersion(null);
    setSelectedInvoiceType(null);
    setInvoiceCodeNumber("");
    setInvoiceRefNumber("");
    setInvoiceDateTime(null);
    setValidationDateTime(null);
    setSupplierDigiSign("");
    setInvoiceCurrencyCode("");
    setCurrencyExchangeRate("");
    setBillFrequency("");
    setBillPeriod("");
    setIrmbUniqueId("");

    // Payment Info
    setSelectedPaymentMode(null);
    setSelectedPaymentTerms(null);
    setPaymentAmount("");
    setBankAccNumber("");
    setPaymentDate("");
    setPaymentRefNumber("");
    setBillRefNumber("");

    setRows([
      {
        classification: "",
        description: "",
        unitPrice: "",
        quantity: "",
        taxType: "",
        taxRate: "",
        taxAmount: "",
        discount: "",
        totalAmount: "",
      },
    ]);
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    // Add your cancel logic here
  };

  const validateSupplierName = (name) => {
    if (!name) {
      return "Supplier's Name is required";
    }
    if (name.length > 300) {
      return "Supplier's Name must be less than or equal to 300 characters";
    }
    return "";
  };

  const validateSupplierTIN = (tin) => {
    if (!tin) {
      return "Supplier's TIN is required";
    }
    if (tin.length !== 14) {
      return "Supplier's TIN must be exactly 14 characters";
    }
    return "";
  };

  const validateSupplierSSTRegNumber = (sstRegNumber) => {
    if (!sstRegNumber) {
      return "Supplier's SST Registration Number is required";
    }
    if (sstRegNumber.length !== 17) {
      return "Supplier's SST Registration Number must be exactly 17 characters";
    }
    // Additional validation logic if needed
    return "";
  };

  const validateSupplierTourismRegNumber = (tourismRegNumber) => {
    if (!tourismRegNumber) {
      return "Supplier's Tourism Registration Number is required";
    }
    if (tourismRegNumber.length !== 17) {
      return "Supplier's Tourism Registration Number must be exactly 17 characters";
    }
    // Additional validation logic if needed
    return "";
  };

  const validateSupplierEmail = (email) => {
    if (email && !isValidEmail(email)) {
      return "Invalid email format";
    }
    return "";
    // if (!email) {
    //   return "Email is required";
    // } else if (!isValidEmail(email)) {
    //   return "Invalid email format";
    // }
    // return ""; // No error
  };

  const validateSupplierMSICCode = (msicCode) => {
    if (!msicCode) {
      return "Supplier's MSIC Code is required";
    }
    if (msicCode.length !== 5) {
      return "Supplier's MSIC Code must be exactly 5 characters";
    }
    // Additional validation logic if needed
    return "";
  };

  const validateSupplierBusinessActivityDesc = (businessActivityDesc) => {
    if (!businessActivityDesc) {
      return "Supplier's Business Activity Description is required";
    }
    if (businessActivityDesc.length > 300) {
      return "Supplier's Business Activity Description must be less than or equal to 300 characters";
    }
    // Additional validation logic if needed
    return "";
  };

  const validateSupplierAddress = (address) => {
    if (!address) {
      return "Supplier's Address is required";
    }
    // Additional validation logic if needed
    return "";
  };

  const validateSupplierContactNumber = (contactNumber) => {
    if (!contactNumber) {
      return "Supplier's Contact Number is required";
    }
    // Validate if the contact number contains only numeric values
    if (!/^\d+$/.test(contactNumber)) {
      return "Supplier's Contact Number should contain only numeric values";
    }
    // Validate the maximum length of the contact number
    if (contactNumber.length > 20) {
      return "Supplier's Contact Number must be maximum 20 characters";
    }
    return "";
  };

  const validateSupplierTaxIDNumber = (taxIDNumber) => {
    if (!taxIDNumber) {
      return "Supplier's Tax Identification Number is required";
    }
    // Additional validation logic if needed
    return "";
  };
  const validateCityName = (cityName) => {
    if (!cityName) {
      return "City is required";
    }
  };
  const validateSupplierState = (supplierState) => {
    if (!supplierState) {
      return "State is required";
    }
  };
  const validateSupplierCountry = (supplierCountry) => {
    if (!supplierCountry) {
      return "Country is required";
    }
  };

  const validateSupplierPassportIdNumber = (passportIdNumber) => {
    if (!passportIdNumber) {
      return "Supplier's Passport/Identification Number is required";
    }
    // Additional validation logic if needed
    return "";
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    // Regular expression for basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate Buyer's Name
  const validateBuyerName = (buyerName) => {
    if (!buyerName) {
      return "Buyer's Name is required";
    }
    // Additional validation logic if needed
    return "";
  };

  // Validate Buyer's TIN
  const validateBuyerTaxIDNumber = (buyerTaxIDNumber) => {
    if (!buyerTaxIDNumber) {
      return "Buyer's TIN is required";
    }
    // Validate the length of TIN
    if (buyerTaxIDNumber.length !== 14) {
      return "Buyer's TIN must be 14 characters long";
    }
    // Additional validation logic if needed
    return "";
  };

  // Validate Buyer's Registration/Identification/Passport Number
  const validateBuyerPassportIdNumber = (buyerPassportIdNumber) => {
    if (!buyerPassportIdNumber) {
      return "Buyer's Passport/Identification Number is required";
    }
    // Validate the length of Passport/Identification Number
    if (buyerPassportIdNumber.length > 20) {
      return "Buyer's Passport/Identification Number must be maximum 20 characters long";
    }
    // Additional validation logic if needed
    return "";
  };

  // Validate Buyer's SST Registration Number
  const validateBuyerSSTRegNumber = (buyerSstRegNumber) => {
    if (!buyerSstRegNumber) {
      return "Buyer's SST Registration Number is required";
    }
    // Validate the length of SST Registration Number
    if (buyerSstRegNumber.length !== 17) {
      return "Buyer's SST Registration Number must be 17 characters long";
    }
    // Additional validation logic if needed
    return "";
  };

  // Validate Buyer's Email Address
  const validateBuyerEmailAddress = (buyerEmailAddress) => {
    // if (!buyerEmailAddress) {
    //   return "Buyer's Email Address is required";
    // }
    // Validate the format of Email Address using a regular expression
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerEmailAddress)) {
      return "Invalid Email Address format";
    }
    // Additional validation logic if needed
    return "";
  };

  // Validate Buyer's Address
  const validateBuyerAddress = (buyerAddress) => {
    if (!buyerAddress) {
      return "Buyer's Address is required";
    }
    // Additional validation logic if needed
    return "";
  };

  const validateBuyerCity = (buyerCityName) => {
    if (!buyerCityName) {
      return "Buyer's City is required";
    }
    // Additional validation logic if needed
    return "";
  };
  const validateBuyerState = (buyerStateName) => {
    if (!buyerStateName) {
      return "Buyer's State is required";
    }
    // Additional validation logic if needed
    return "";
  };

  const validateBuyerCountry = (buyerCountry) => {
    if (!buyerCountry) {
      return "Buyer's Country is required";
    }
    // Additional validation logic if needed
    return "";
  };

  // Validate Buyer's Contact Number
  const validateBuyerContactNumber = (buyerContactNumber) => {
    if (!buyerContactNumber) {
      return "Buyer's Contact Number is required";
    }
    // Validate if the contact number contains only numeric values
    if (!/^\d+$/.test(buyerContactNumber)) {
      return "Buyer's Contact Number should contain only numeric values";
    }
    // Validate the maximum length of the contact number
    if (buyerContactNumber.length > 20) {
      return "Buyer's Contact Number must be maximum 20 characters";
    }
    return "";
  };

  const validateFields = () => {
    return {
      supplierName: validateSupplierName(supplierName),
      emailAddress: validateSupplierEmail(emailAddress),
      contactNumber: validateSupplierContactNumber(contactNumber),
      address: validateSupplierAddress(address),
      taxIDNumber: validateSupplierTaxIDNumber(taxIDNumber),
      cityName: validateCityName(cityName),
      supplierState: validateSupplierState(supplierState),
      supplierCountry: validateSupplierCountry(supplierCountry),
      passportIdNumber: validateSupplierPassportIdNumber(passportIdNumber),
      sstRegNumber: validateSupplierSSTRegNumber(sstRegNumber),
      tourismRegNumber: validateSupplierTourismRegNumber(tourismRegNumber),
      msicCode: validateSupplierMSICCode(msicCode),
      businessActivityDesc:
        validateSupplierBusinessActivityDesc(businessActivityDesc),
      buyerName: validateBuyerName(buyerName),
      buyerTaxIDNumber: validateBuyerTaxIDNumber(buyerTaxIDNumber),
      buyerPassportIdNumber: validateBuyerPassportIdNumber(
        buyerPassportIdNumber
      ),
      buyerSstRegNumber: validateBuyerSSTRegNumber(buyerSstRegNumber),
      buyerEmailAddress: validateSupplierEmail(buyerEmailAddress),
      buyerAddress: validateBuyerAddress(buyerAddress),
      buyerCityName: validateBuyerCity(buyerCityName),
      buyerStateName: validateBuyerState(buyerStateName),
      buyerCountry: validateBuyerCountry(buyerCountry),
      buyerContactNumber: validateBuyerContactNumber(buyerContactNumber),
      invoiceVersion:
        !invoiceVersion || !/^[0-9]+(\.[0-9]+)*$/.test(invoiceVersion)
          ? "Invoice Version is required and should be in the format x.x"
          : null,
      selectedInvoiceType:
        !selectedInvoiceType || !/^[A-Za-z0-9]+$/.test(selectedInvoiceType)
          ? "Invoice Type is required"
          : null,
      invoiceCodeNumber:
        !invoiceCodeNumber ||
        !/^[A-Za-z0-9]+$/.test(invoiceCodeNumber) ||
        invoiceCodeNumber.length > 50
          ? "Invoice Code/Number is required and should be alphanumeric with a max length of 50"
          : null,
      invoiceDateTime: !invoiceDateTime
        ? "Invoice Date & Time is required"
        : null,
      validationDateTime: !validationDateTime
        ? "Validation Date & Time is required"
        : null,
      supplierSignatureError: !supplierDigiSign
        ? "Supplier’s Digital Signature is required"
        : null,
      invoiceCurrencyCode: !invoiceCurrencyCode
        ? "Invoice Currency Code is required"
        : null,
      currencyExchangeRate:
        !currencyExchangeRate ||
        !/^[0-9]+(\.[0-9]+)?$/.test(currencyExchangeRate)
          ? "Currency Exchange Rate is required and should be a decimal number"
          : null,
      billFrequency:
        billFrequency && billFrequency.length > 50
          ? "Frequency of Billing should have a max length of 50"
          : null,
      billPeriod:
        billPeriod && billPeriod.length > 50
          ? "Billing Period should have a max length of 50"
          : null,
      irbmUniqueId: !irbmUniqueId
        ? "IRBM Unique Identifier Number is required"
        : null,
    };
  };

  const handleSave = () => {
    const errors = validateFields();

    // Update errors state
    setErrors(errors);

    // Check if there are any errors
    const hasErrors = Object.values(errors).some((error) => error !== null);

    if (!hasErrors) {
      // Gather all fields into an object
      const payload = {
        supplierName,
        emailAddress,
        contactNumber,
        address,
        taxIDNumber,
        cityName,
        supplierState,
        supplierCountry,
        passportIdNumber,
        sstRegNumber,
        tourismRegNumber,
        msicCode,
        businessActivityDesc,
        buyerName,
        buyerTaxIDNumber,
        buyerPassportIdNumber,
        buyerSstRegNumber,
        buyerEmailAddress,
        buyerAddress,
        buyerCityName,
        buyerStateName,
        buyerCountry,
        buyerContactNumber,
        invoiceVersion,
        selectedInvoiceType,
        invoiceCodeNumber,
        invoiceDateTime,
        validationDateTime,
        supplierDigiSign,
        invoiceCurrencyCode,
        currencyExchangeRate,
        billFrequency,
        billPeriod,
        irbmUniqueId,
      };
      // Proceed with saving data or making an API call
      // Save data or make API call here
    }
  };

  const handleFileUpload = (files) => {
    setUploadedFiles(files);
  };

  const SupplierSignatureErrorMessage = ({ error }) => {
    return (
      <div className="error-message">
        {error && <span className="error-text">{error}</span>}
      </div>
    );
  };

  return (
    <div className="parent-container">
      <div className="new-invoice-container">
        <p className="new-invoice-title">New Invoice</p>
      </div>
      {/* <button onClick={handleOpenModal}>Delete Invoice</button>
      <button onClick={handleGenerateOpenModal}>Generate Invoice</button> */}
      <div className="flex-container">
        <div className="flex-item">
          <p className="upload-invoice-title">Upload Invoice</p>

          <div className="border-dashed">
            <FileUpload onFileUpload={handleFileUpload} />
          </div>

          <p className="instruction-title">Instructions</p>
          <p className="instruction-text">
            1. Ensure the invoice is clear and well-lit.
          </p>
          <p className="instruction-text">
            2. Wait for the OCR process to complete and review the extracted
            text for accuracy.
          </p>
          <p className="instruction-text">
            3. Confirm and save the extracted data. If needed, edit any
            inaccuracies manually.
          </p>
          <p className="instruction-text">
            4. Ensure the invoice is in a supported file format and free from
            any obstructions or shadows.
          </p>
        </div>
        <div style={{ flex: 7.4 }}>
          <p style={{ color: "#05353D", fontSize: 20, fontWeight: 400 }}>
            Invoice Details
          </p>
          {/* Suppliers info */}
          <div className="accordion-container" onClick={toggleSupplierInfo}>
            <p className="accordion-title-text">Supplier info</p>
            <i
              className={
                isSupplierInfoExpanded
                  ? "pi pi-chevron-down p-button-text transparent-icon expanded"
                  : "pi pi-chevron-up p-button-text transparent-icon collapsed"
              }
            />
          </div>
          {isSupplierInfoExpanded && (
            <div>
              <div className="expanded-container">
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Supplier Name
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="supplierName"
                      placeholder="Enter name"
                      value={supplierName}
                      onChange={(e) => setSupplierName(e.target.value)}
                      className={errors.supplierName ? "p-invalid" : ""}
                    />
                    {errors.supplierName && (
                      <small className="p-error p-error-message">
                        {errors.supplierName}
                      </small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Email Address
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="emailAddress"
                      placeholder="Enter"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className={errors.emailAddress ? "p-invalid" : ""}
                    />
                    {errors.emailAddress && (
                      <small className="p-error">{errors.emailAddress}</small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Contact Number
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="contactNumber"
                      placeholder="Enter"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className={errors.contactNumber ? "p-invalid" : ""}
                    />
                    {errors.contactNumber && (
                      <small className="p-error">{errors.contactNumber}</small>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 5 }}>
                <p style={{ color: "#212121", fontSize: 14 }}>Address</p>
                <div className="p-field">
                  <InputText
                    style={{ width: "99%" }}
                    id="address"
                    placeholder="Enter"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={errors.address ? "p-invalid" : ""}
                  />
                  {errors.address && (
                    <small className="p-error">{errors.address}</small>
                  )}
                </div>
              </div>

              <div className="expanded-container">
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>City Name</p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
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
                      style={{ width: 290 }}
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
                      style={{ width: 290 }}
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
                      style={{ width: 290 }}
                      id="taxIDNumber"
                      placeholder="Enter"
                      value={taxIDNumber}
                      onChange={(e) => setTaxIDNumber(e.target.value)}
                      className={errors.taxIDNumber ? "p-invalid" : ""}
                    />
                    {errors.taxIDNumber && (
                      <small className="p-error">{errors.taxIDNumber}</small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Registration/Identification/Passport Number
                  </p>
                  <div className="p-field input-with-checkmark">
                    <InputText
                      style={{ width: 290 }}
                      id="passportIdNumber"
                      placeholder="Enter"
                      value={passportIdNumber}
                      onChange={(e) => setPassportIdNumber(e.target.value)}
                      className={errors.passportIdNumber ? "p-invalid" : ""}
                    />
                    {errors.passportIdNumber && (
                      <small className="p-error">
                        {errors.passportIdNumber}
                      </small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    SST Registration Number
                  </p>
                  <div className="p-field input-with-checkmark">
                    <InputText
                      style={{ width: 290 }}
                      id="sstRegNumber"
                      placeholder="Enter"
                      value={sstRegNumber}
                      onChange={(e) => setSstRegNumber(e.target.value)}
                      className={errors.sstRegNumber ? "p-invalid" : ""}
                    />
                    {errors.sstRegNumber && (
                      <small className="p-error">{errors.sstRegNumber}</small>
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
                      style={{ width: 290 }}
                      id="tourismRegNumber"
                      placeholder="Enter"
                      value={tourismRegNumber}
                      onChange={(e) => setTourismRegNumber(e.target.value)}
                      className={errors.tourismRegNumber ? "p-invalid" : ""}
                    />
                    {errors.tourismRegNumber && (
                      <small className="p-error">
                        {errors.tourismRegNumber}
                      </small>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>MSIC Code</p>
                  {/* <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="msicCode"
                      placeholder="Enter"
                      value={msicCode}
                      onChange={(e) => setMsicCode(e.target.value)}
                      className={errors.msicCode ? "p-invalid" : ""}
                    />
                    {errors.msicCode && (
                      <small className="p-error">{errors.msicCode}</small>
                    )}
                  </div> */}
                  <div className="p-field">
                    <Dropdown
                      style={{ width: 290 }}
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
                      style={{ width: 290 }}
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
                  {/* <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="businessActivityDesc"
                      placeholder="Enter"
                      value={businessActivityDesc}
                      onChange={(e) => setBusinessActivityDesc(e.target.value)}
                      className={errors.businessActivityDesc ? "p-invalid" : ""}
                    />
                    {errors.businessActivityDesc && (
                      <small className="p-error">
                        {errors.businessActivityDesc}
                      </small>
                    )}
                  </div> */}
                </div>
              </div>
            </div>
          )}

          {/* Buyers Info */}
          <div className="accordion-container" onClick={toggleBuyerInfo}>
            <p className="accordion-title-text">Buyer info</p>
            <i
              className={
                isBuyerInfoExpanded
                  ? "pi pi-chevron-down p-button-text transparent-icon expanded"
                  : "pi pi-chevron-up p-button-text transparent-icon collapsed"
              }
            />
          </div>
          {isBuyerInfoExpanded && (
            <div>
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
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Email Address
                  </p>
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
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Contact Number
                  </p>
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
              <div className="expanded-container">
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
              </div>
              <div className="expanded-container">
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
                      className={
                        errors.buyerPassportIdNumber ? "p-invalid" : ""
                      }
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
            </div>
          )}

          {/* Invoice Details */}
          <div
            className="accordion-container"
            onClick={toggleInvoiceDetailsInfo}
          >
            <p className="accordion-title-text">Invoice Details</p>
            <i
              className={
                isInvoiceDetailsInfoExpanded
                  ? "pi pi-chevron-down p-button-text transparent-icon expanded"
                  : "pi pi-chevron-up p-button-text transparent-icon collapsed"
              }
            />
          </div>
          {isInvoiceDetailsInfoExpanded && (
            <div>
              <div className="expanded-container">
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Invoice Version
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="invoiceVersion"
                      placeholder="Enter"
                      value={invoiceVersion}
                      onChange={(e) => setInvoiceVersion(e.target.value)}
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
                      onChange={(e) => setInvoiceCodeNumber(e.target.value)}
                      className={errors.invoiceCodeNumber ? "p-invalid" : ""}
                    />
                    {errors.invoiceCodeNumber && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {errors.invoiceCodeNumber}
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <div className="expanded-container">
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Original Invoice Ref. Number
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="invoiceRefNumber"
                      placeholder="Enter name"
                      value={invoiceRefNumber}
                      onChange={(e) => setInvoiceRefNumber(e.target.value)}
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
                      style={{ width: 290 }}
                      id="invoiceDateTime"
                      value={invoiceDateTime}
                      onChange={handleDateChange}
                      showIcon
                      showTime
                      placeholder="Select Date & Time"
                      dateFormat="dd/mm/yy"
                      className={errors.invoiceDateTime ? "p-invalid" : ""}
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
                      style={{ width: 290 }}
                      id="validationDateTime"
                      value={validationDateTime}
                      onChange={handleValidationDateChange}
                      showIcon
                      showTime
                      placeholder="Select Date & Time"
                      dateFormat="dd/mm/yy"
                      className={errors.validationDateTime ? "custom-calendar p-invalid" : "custom-calendar"}
                    />
                    {errors.validationDateTime && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {errors.validationDateTime}
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <div className="expanded-container">
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

                    {errors.supplierDigiSignError && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {errors.supplierDigiSignError}
                      </small>
                    )}

                    {/* Display supplierSignatureError here */}
                    {supplierSignatureError && (
                      <small style={{ textAlign: "left" }} className="p-error">
                        {supplierSignatureError}
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
                        onChange={handleDropdownChange}
                        placeholder="Select"
                        className={
                          errors.invoiceCurrencyCode ? "p-invalid" : ""
                        }
                      />
                      {errors.invoiceCurrencyCode && (
                        <small
                          style={{ textAlign: "left" }}
                          className="p-error"
                        >
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
                        onChange={(e) =>
                          setCurrencyExchangeRate(e.target.value)
                        }
                        className={
                          errors.currencyExchangeRate ? "p-invalid" : ""
                        }
                      />
                      {errors.currencyExchangeRate && (
                        <small
                          style={{ textAlign: "left" }}
                          className="p-error"
                        >
                          {errors.currencyExchangeRate}
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="expanded-container">
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Frequency of Billing
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="billFrequency"
                      placeholder="Enter"
                      value={billFrequency}
                      onChange={(e) => setBillFrequency(e.target.value)}
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
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Billing Period
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: 290 }}
                      id="billPeriod"
                      placeholder="Enter"
                      value={billPeriod}
                      onChange={(e) => setBillPeriod(e.target.value)}
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
                  <p style={{ color: "#212121", fontSize: 14, paddingLeft: 4 }}>
                    IRBM Unique Identifier Number
                  </p>
                  <div className="p-field input-with-checkmark">
                    <InputText
                      style={{ width: 290 }}
                      id="irbmUniqueId"
                      placeholder="Enter"
                      value={irbmUniqueId}
                      onChange={(e) => setIrmbUniqueId(e.target.value)}
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
            </div>
          )}
          {/* Product / Service Details */}
          <div
            className="accordion-container"
            onClick={toggleProductDetailsInfo}
          >
            <p className="accordion-title-text">Product / Service Details</p>
            <i
              className={
                isProductDetailsInfoExpanded
                  ? "pi pi-chevron-down p-button-text transparent-icon expanded"
                  : "pi pi-chevron-up p-button-text transparent-icon collapsed"
              }
            />
          </div>
          {isProductDetailsInfoExpanded && (
            <div>
              <DataTable
                value={data}
                scrollable
                style={{ width: "100%", overflowX: "auto", fontSize: "0.9rem" }}
                className="data-table-styles"
              >
                {columns.map((col, index) => (
                  <Column
                    key={index}
                    field={col.field}
                    header={col.header}
                    style={col.style}
                  />
                ))}
              </DataTable>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p
                  style={{ color: "#1E6091", fontSize: 14, cursor: "pointer" }}
                  onClick={addRow}
                >
                  Add Invoice Line
                </p>
                {rows.length > 1 && (
                  <p
                    style={{
                      color: "#FF5252",
                      fontSize: 14,
                      cursor: "pointer",
                    }}
                    onClick={removeLastRow}
                  >
                    Remove Invoice Line
                  </p>
                )}
              </div>
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              marginTop: 15,
            }}
          >
            <div style={{ flex: 5.5 }}>
              <div
                style={{
                  borderBottomColor: "#E0E0E0",
                  borderBottomWidth: 1,
                  borderBottomStyle: "solid",
                }}
              >
                <p style={{ color: "#168AAD", fontSize: 16, fontWeight: 400 }}>
                  Payment Info
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 5,
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div style={{ width: "33%" }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>Payment Mode</p>

                  <div className="p-field">
                    <Dropdown
                      style={{ width: "100%" }}
                      id="invoiceVersion"
                      value={selectedPaymentMode}
                      options={paymentMode}
                      onChange={handlePaymentModeDropdownChange}
                      placeholder="Select"
                    />
                  </div>
                </div>
                <div style={{ width: "33%" }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Payment Terms
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: "100%" }}
                      id="selectedPaymentTerms"
                      placeholder="Enter"
                      value={selectedPaymentTerms}
                      onChange={(e) => setSelectedPaymentTerms(e.target.value)}
                    />
                  </div>
                  {/* <div className="p-field">
                    <Dropdown
                      style={{ width: "100%" }}
                      id="invoiceType"
                      value={selectedPaymentTerms}
                      options={paymentTerms}
                      onChange={handlePaymentTypeDropdownChange}
                      placeholder="Select"
                    />
                  </div> */}
                </div>
                <div style={{ width: "33%" }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Payment Amount
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: "100%" }}
                      id="paymentAmount"
                      placeholder="Enter"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 5,
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div style={{ width: "100%" }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Bank Acc. Number
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: "100%" }}
                      id="bankAccNumber"
                      placeholder="Enter"
                      value={bankAccNumber}
                      onChange={(e) => setBankAccNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 5,
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div style={{ width: "33%" }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>Payment Date</p>

                  <div className="p-field">
                    <InputText
                      style={{ width: "100%" }}
                      id="invoiceCodeNumber"
                      placeholder="Enter"
                      value={paymentDate}
                      onChange={(e) => setPaymentDate(e.target.value)}
                    />
                  </div>
                </div>
                <div style={{ width: "33%" }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Payment Ref. Number
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: "100%" }}
                      id="paymentRefNumber"
                      placeholder="Enter"
                      value={paymentRefNumber}
                      onChange={(e) => setPaymentRefNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div style={{ width: "33%" }}>
                  <p style={{ color: "#212121", fontSize: 14 }}>
                    Bill Ref. Number
                  </p>
                  <div className="p-field">
                    <InputText
                      style={{ width: "100%" }}
                      id="billRefNumber"
                      placeholder="Enter"
                      value={billRefNumber}
                      onChange={(e) => setBillRefNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                flex: 4.5,
                backgroundColor: "#FAFAFA",
                padding: "0 16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottomColor: "#E0E0E0",
                  borderBottomWidth: 1,
                  borderBottomStyle: "solid",
                  padding: "8px 0",
                }}
              >
                <p style={{ color: "#616161", fontSize: 14, fontWeight: 400 }}>
                  Subtotal
                </p>
                <p style={{ color: "#616161", fontSize: 14, fontWeight: 400 }}>
                  ${summary.subtotal.toFixed(2)}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottomColor: "#E0E0E0",
                  borderBottomWidth: 1,
                  borderBottomStyle: "solid",
                  padding: "8px 0",
                }}
              >
                <p style={{ color: "#616161", fontSize: 14, fontWeight: 400 }}>
                  Amount Exempted from Tax
                </p>
                <p style={{ color: "#616161", fontSize: 14, fontWeight: 400 }}>
                  ${summary.amountExemptedFromTax.toFixed(2)}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottomColor: "#E0E0E0",
                  borderBottomWidth: 1,
                  borderBottomStyle: "solid",
                  padding: "8px 0",
                }}
              >
                <p style={{ color: "#616161", fontSize: 14, fontWeight: 400 }}>
                  Total Excluding Tax
                </p>
                <p style={{ color: "#616161", fontSize: 14, fontWeight: 400 }}>
                  ${summary.totalExcludingTax.toFixed(2)}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottomColor: "#E0E0E0",
                  borderBottomWidth: 1,
                  borderBottomStyle: "solid",
                  padding: "8px 0",
                }}
              >
                <p style={{ color: "#616161", fontSize: 14, fontWeight: 400 }}>
                  Total Including Tax
                </p>
                <p style={{ color: "#616161", fontSize: 14, fontWeight: 400 }}>
                  ${summary.totalIncludingTax.toFixed(2)}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottomColor: "#E0E0E0",
                  borderBottomWidth: 1,
                  borderBottomStyle: "solid",
                  padding: "8px 0",
                }}
              >
                <p style={{ color: "#616161", fontSize: 14, fontWeight: 400 }}>
                  Discount
                </p>
                <p style={{ color: "#FF5252", fontSize: 14, fontWeight: 400 }}>
                  ${summary.totalDiscount.toFixed(2)}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                }}
              >
                <p style={{ color: "#616161", fontSize: 14, fontWeight: 400 }}>
                  Net Total
                </p>
                <p style={{ color: "#616161", fontSize: 24, fontWeight: 400 }}>
                  ${summary.netTotal.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          borderTopColor: "#E0E0E0",
          borderTopWidth: 1,
          borderTopStyle: "solid",
          marginTop: 20,
        }}
      >
        <div
          style={{ flex: 5, justifyContent: "center", alignItems: "center" }}
        >
          <p
            style={{ color: "#1E6091", fontSize: 14, cursor: "pointer" }}
            onClick={handleClearAll}
          >
            Clear All
          </p>
        </div>
        <div
          style={{ flex: 5, justifyContent: "center", alignItems: "center" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <p
              style={{
                color: "#1E6091",
                fontSize: 14,
                cursor: "pointer",
                marginRight: "0.5rem",
              }}
              // onClick={handleCancel}
              onClick={handleDelete}
            >
              Cancel
            </p>
            <Button
              label="Save"
              rounded
              severity="primary"
              style={{ margin: "0.5rem", backgroundColor: "#1E6091" }}
              onClick={handleSave}
            />
          </div>
        </div>
      </div>
      {/* <CustomModal
        open={open}
        handleClose={handleClose}
        description="Deleted Successfully"
        deleting={deleting}
        progress={progress}
      /> */}
      <CustomModal open={openModal} handleClose={handleCloseModal} />
      <CustomGenerateInvoiceModal
        open={openGenrateInvoiceModal}
        handleClose={handleGenerateCloseModal}
        totalInvoices={totalInvoices}
      />
    </div>
  );
}

export default UploadInvoice;
