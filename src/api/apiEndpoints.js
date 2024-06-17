const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
    GET_SUPPLIER_DETAILS: `${API_BASE_URL}/einvoice/getSupplierDetails`,
    GET_CARDS_DETAILS: `${API_BASE_URL}/einvoice/getCardsDetails`,
    GET_INVOICE_LIST: `${API_BASE_URL}/einvoice/invoiceListPaginated`,
    GET_PAYMENT_MODE: `${API_BASE_URL}/master/paymentMode`,
    GENERATE_INVOICE: `${API_BASE_URL}/einvoice/generateInvoices`,
    SUBMI_INVOICE: `${API_BASE_URL}/einvoice/myInvoiceSubmit`,
    DELETE_INVOICE: `${API_BASE_URL}/einvoice/deleteInvoice`,
    UPDATE_INVOICE: `${API_BASE_URL}/updateInvoice`,
    SEND_EMAIL: `${API_BASE_URL}/sendEmail`,
    GET_STATE_CODE: `${API_BASE_URL}/master/stateCode`,
    CREATE_INVOICE: `${API_BASE_URL}/einvoice/create`,
    GET_INVOICE_TYPE: `${API_BASE_URL}/master/invoiceType`,
    GET_CURRENCY_CODE: `${API_BASE_URL}/master/currencyCode`,
    GET_COUNTRY_CODE: `${API_BASE_URL}/master/countryCode`,
    GET_MSIC_CODE: `${API_BASE_URL}/master/msicCode`,
    GET_TAX_TYPE: `${API_BASE_URL}/master/taxtype`,
    CHANGE_PASSWORD: `${API_BASE_URL}/user/change-password`,
};
