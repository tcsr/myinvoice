import React, { createContext, useState, useMemo, useCallback } from 'react';
import { API_ENDPOINTS } from '../api/apiEndpoints';
import useApi from '../hooks/useApi';
import CustomModal from "../components/CustomModal/CustomModal";
import CustomGenerateInvoiceModal from "../components/CustomModal/CustomGenerateInvoiceModal";
import { Snackbar, Alert } from '@mui/material';

export const TableContext = createContext();

const TableProvider = ({ children }) => {
    const [table, setTable] = useState(null);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [emailModalOpen, setEmailModalOpen] = useState(false);
    const [isColumnChooserOpen, setIsColumnChooserOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [openGenerateInvoiceModal, setOpenGenerateInvoiceModal] = useState(false);
    const [openDeleteInvoiceModal, setOpenDeleteInvoiceModal] = useState(false);
    const [progress, setProgress] = useState(0);
    const [generationComplete, setGenerationComplete] = useState(false);
    const [deletionComplete, setDeletionComplete] = useState(false);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const { post, del } = useApi();

    const handleGlobalFilterChange = (value) => {
        setGlobalFilter(value || '');
    };

    const resetTableState = () => {
        setPagination({ pageIndex: 0, pageSize: 10 });
        setSorting([]);
        setColumnFilters([]);
        setColumnVisibility({
            counterParty: true,
            docType: true,
            docNumber: true,
            docDate: true,
            generatedNumber: true,
            invoiceType: true,
            invoiceValue: true,
            irbmResponse: true,
        });
        if (table) {
            table.setState((prevState) => ({
                ...prevState,
                rowSelection: {},
            }));
        }
    };

    const handleGenerateInvoice = useCallback(async () => {
        setProgress(0);
        setOpenGenerateInvoiceModal(true);
        setError(null);
        try {
            const response = await post(API_ENDPOINTS.GENERATE_INVOICE, selectedRows, {
                onDownloadProgress: (progressEvent) => {
                    const total = progressEvent.total;
                    const current = progressEvent.loaded;
                    const percentCompleted = Math.floor((current / total) * 100);
                    setProgress(percentCompleted);
                },
            });

            if (response.status === "success") {
                setGenerationComplete(true);
                setSnackbar({ open: true, message: response.message, severity: 'success' });
            } else {
                throw new Error(response.message || "Error in generating selected invoices");
            }
        } catch (error) {
            console.error("Error in generating invoices:", error);
            setError(error.message || 'Error in generating selected invoices');
            setSnackbar({ open: true, message: error.message || 'Error in generating selected invoices', severity: 'error' });
        }
    }, [selectedRows, post]);

    const handleDeleteInvoice = useCallback(async () => {
        setProgress(0);
        setOpenDeleteInvoiceModal(true);
        setError(null);
        try {
            const response = await del(API_ENDPOINTS.DELETE_INVOICE, { ids: selectedRows.map(row => row.id) }, {
                onDownloadProgress: (progressEvent) => {
                    const total = progressEvent.total;
                    const current = progressEvent.loaded;
                    const percentCompleted = Math.floor((current / total) * 100);
                    setProgress(percentCompleted);
                },
            });

            if (response.status === "success") {
                setDeletionComplete(true);
                setSnackbar({ open: true, message: response.message, severity: 'success' });
            } else {
                throw new Error(response.message || "Error deleting invoices");
            }
        } catch (error) {
            setError(error.message || 'Error deleting invoices');
            setSnackbar({ open: true, message: error.message || 'Error deleting invoices', severity: 'error' });
            setOpenDeleteInvoiceModal(false); // Close modal on error
        }
    }, [selectedRows, del]);

    const handleGenerateCloseModal = () => {
        setOpenGenerateInvoiceModal(false);
        setGenerationComplete(false);
        setProgress(0);
    };

    const handleDeleteCloseModal = () => {
        setOpenDeleteInvoiceModal(false);
        setDeletionComplete(false);
        setProgress(0);
    };

    const value = useMemo(() => ({
        table,
        setTable,
        pagination,
        setPagination,
        columnFilters,
        setColumnFilters,
        globalFilter,
        setGlobalFilter,
        sorting,
        setSorting,
        columnVisibility,
        setColumnVisibility,
        emailModalOpen,
        setEmailModalOpen,
        isColumnChooserOpen,
        setIsColumnChooserOpen,
        selectedRows,
        setSelectedRows,
        openGenerateInvoiceModal,
        setOpenGenerateInvoiceModal,
        openDeleteInvoiceModal,
        setOpenDeleteInvoiceModal,
        progress,
        setProgress,
        generationComplete,
        setGenerationComplete,
        deletionComplete,
        setDeletionComplete,
        error,
        setError,
        snackbar,
        setSnackbar,
        handleGlobalFilterChange,
        resetTableState,
        handleGenerateInvoice,
        handleDeleteInvoice,
        handleGenerateCloseModal,
        handleDeleteCloseModal,
    }), [
        table,
        pagination,
        columnFilters,
        globalFilter,
        sorting,
        columnVisibility,
        emailModalOpen,
        isColumnChooserOpen,
        selectedRows,
        openGenerateInvoiceModal,
        openDeleteInvoiceModal,
        progress,
        generationComplete,
        deletionComplete,
        error,
        snackbar,
        handleGenerateInvoice,
        handleDeleteInvoice,
    ]);

    return (
        <TableContext.Provider value={value}>
            {children}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
            <CustomModal
                open={openDeleteInvoiceModal}
                handleClose={handleDeleteCloseModal}
                handleConfirm={resetTableState}
                selectedCount={selectedRows.length}
                progress={progress}
                deletionComplete={deletionComplete}
                error={error}
                handleCompleteAction={handleDeleteCloseModal}
                setError={setError}
                setProgress={setProgress}
            />
            <CustomGenerateInvoiceModal
                open={openGenerateInvoiceModal}
                handleClose={handleGenerateCloseModal}
                handleCompleteAction={handleGenerateCloseModal}
                totalInvoices={selectedRows.length}
                progress={progress}
                generationComplete={generationComplete}
                error={error}
            />
        </TableContext.Provider>
    );
};

export default TableProvider;