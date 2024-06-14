import { useEffect, useState } from "react";
import useApi from "./useApi";
import { API_ENDPOINTS } from "../api/apiEndpoints"

const useInvoiceData = () => {
    const { get } = useApi();
    const [stateOptions, setStateOptions] = useState([]);
    const [countryOptions, setCountryOptions] = useState([]);
    const [invoiceType, setInvoiceType] = useState([]);
    const [currencyCode, setCurrencyCode] = useState([]);
    const [taxTypeOptions, setTaxTypeOptions] = useState([]);
    const [paymentMode, setPaymentModeOptions] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await Promise.all([
            fetchStateData(),
            fetchCountry(),
            fetchInvoiceType(),
            fetchCurrencyCode(),
            fetchTaxType(),
            fetchPaymentMode()
        ]);
    };

    const fetchStateData = async () => {
        try {
            const response = await get(API_ENDPOINTS.GET_STATE_CODE);
            if (!response) {
                throw new Error("Failed to fetch");
            }
            const data = response;
            const states = data.map(state => ({
                id: state.id,
                label: state.state,
                value: state.code
            }));
            setStateOptions(states);
        } catch (error) {
            console.error("Error fetching state data:", error);
        }
    };

    const fetchCountry = async () => {
        try {
            const response = await get(API_ENDPOINTS.GET_COUNTRY_CODE);
            if (!response) {
                throw new Error("Failed to fetch");
            }
            const data = response;
            const countries = data.map(country => ({
                label: country.country,
                value: country.code
            }));
            setCountryOptions(countries);
        } catch (error) {
            console.error("Error fetching country data:", error);
        }
    };

    const fetchInvoiceType = async () => {
        try {
            const response = await get(API_ENDPOINTS.GET_INVOICE_TYPE);
            if (!response) {
                throw new Error("Failed to fetch");
            }
            const data = response;
            const invoice = data.map(invoice => ({
                id: invoice.id,
                label: invoice.description,
                value: invoice.code
            }));
            setInvoiceType(invoice);
        } catch (error) {
            console.error("Error fetching invoice type data:", error);
        }
    };

    const fetchCurrencyCode = async () => {
        try {
            const response = await get(API_ENDPOINTS.GET_CURRENCY_CODE);
            if (!response) {
                throw new Error("Failed to fetch");
            }
            const data = response;
            const currency = data.map(currency => ({
                id: currency.id,
                label: currency.currency,
                value: currency.code
            }));
            setCurrencyCode(currency);
        } catch (error) {
            console.error("Error fetching currency code data:", error);
        }
    };

    const fetchTaxType = async () => {
        try {
            const response = await get(API_ENDPOINTS.GET_TAX_TYPE);
            if (!response) {
                throw new Error("Failed to fetch");
            }
            const data = response;
            const tax = data.map(tax => ({
                label: tax.Description,
                value: tax.Code
            }));
            setTaxTypeOptions(tax);
        } catch (error) {
            console.error("Error fetching tax type data:", error);
        }
    };

    const fetchPaymentMode = async () => {
        try {
            const response = await get(API_ENDPOINTS.GET_PAYMENT_MODE);
            if (!response) {
                throw new Error("Failed to fetch");
            }
            const data = response;
            const payment = data.map(payment => ({
                label: payment.description,
                value: payment.code
            }));
            setPaymentModeOptions(payment);
        } catch (error) {
            console.error("Error fetching payment mode data:", error);
        }
    };

    return {
        stateOptions,
        countryOptions,
        invoiceType,
        currencyCode,
        taxTypeOptions,
        paymentMode
    };
};

export default useInvoiceData;
