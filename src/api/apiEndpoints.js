

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_BASE_URL = 'http://localhost:3000';

export const API_ENDPOINTS = {
    GET_SUPPLIER_DETAILS: `${API_BASE_URL}/einvoice/getSupplierDetails`,
    GET_CARDS_DETAILS: `${API_BASE_URL}/einvoice/getCardsDetails`,
    GET_INVOICE_LIST: `${API_BASE_URL}/einvoice/invoiceListPaginated`,
    GET_PAYMENT_MODE: `${API_BASE_URL}/dropdown/paymentMode`,
    GENERATE_INVOICE: `${API_BASE_URL}/einvoice/generateInvoices`,
    DELETE_INVOICE: `${API_BASE_URL}/einvoice/deleteInvoices`,
    UPDATE_INVOICE: `${API_BASE_URL}/updateInvoice`,
    SEND_EMAIL: `${API_BASE_URL}/sendEmail`,
};
