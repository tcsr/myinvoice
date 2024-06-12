

// const API_BASE_URL = 'https://dev-einvoice.olamnet.com/api';
const API_BASE_URL = 'http://localhost:3000';

export const API_ENDPOINTS = {
    GET_SUPPLIER_DETAILS: `${API_BASE_URL}/einvoice/getSupplierDetails`,
    GET_CARDS_DETAILS: `${API_BASE_URL}/einvoice/getCardsDetails`,
    GET_INVOICE_LIST: `${API_BASE_URL}/einvoice/invoiceListPaginated`,
    GET_PAYMENT_MODE: `${API_BASE_URL}/master/paymentMode`,
    GENERATE_INVOICE: `${API_BASE_URL}/einvoice/generateInvoices`,
    DELETE_INVOICE: `${API_BASE_URL}/einvoice/deleteInvoices`,
    UPDATE_INVOICE: `${API_BASE_URL}/updateInvoice`,
    SEND_EMAIL: `${API_BASE_URL}/sendEmail`,
    GET_STATE_CODE: `${API_BASE_URL}/master/stateCode`,
    CREATE_INVOICE: `${API_BASE_URL}/einvoice/create`,
    GET_INVOICE_TYPE: `${API_BASE_URL}/master/invoiceType`,
    GET_CURRENCY_CODE: `${API_BASE_URL}/master/currencyCode`,
    GET_COUNTRY_CODE: `${API_BASE_URL}/master/countryCode`,
    GET_MSIC_CODE: `${API_BASE_URL}/master/msicCode`,
};
