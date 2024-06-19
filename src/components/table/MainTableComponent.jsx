import { useState, useMemo, useEffect, useContext } from "react";
import { MaterialReactTable } from "material-react-table";
import CircularProgress from "@mui/material/CircularProgress";
import TableConfiguration from "./TableConfiguration";
import { Alert, Snackbar } from "@mui/material";
import Box from "@mui/material/Box";
import { API_ENDPOINTS } from "../../api/apiEndpoints";
import useApi from "../../hooks/useApi";
import CustomModal from "../../components/CustomModal/CustomModal";
import CustomGenerateInvoiceModal from "../../components/CustomModal/CustomGenerateInvoiceModal";
import { HeaderContext } from "../../context/HeaderContext";

const MainTableComponent = ({
  columns,
  data,
  rowCount,
  heading,
  handleRowClick,
  isLoading,
  isRefetching,
  pagination,
  columnFilters,
  globalFilter,
  sorting,
  columnVisibility,
  setColumnFilters,
  setPagination,
  setSorting,
  setColumnVisibility,
  requiredColumns,
  setGlobalFilter,
  showGenerateDeleteButtons,
  showActionButtons,
  showInvoiceMetrics,
  showViewMoreButton,
  showSubmitAction,
  fetchData, // A function prop to refetch data
}) => {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [isColumnChooserOpen, setIsColumnChooserOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(globalFilter || "");
  const { post, del, loading } = useApi();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [openModal, setOpenModal] = useState(false);
  const [openGenerateInvoiceModal, setOpenGenerateInvoiceModal] =
    useState(false);
  const [openDeleteInvoiceModal, setOpenDeleteInvoiceModal] = useState(false);

  const [selectedRows, setSelectedRows] = useState([]); // Store selected rows
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [deletionComplete, setDeletionComplete] = useState(false);
  const [error, setError] = useState(null);

  const { refreshDataFlag } = useContext(HeaderContext);

  useEffect(() => {
    console.log("Refresh triggered");
    handleGlobalFilterChange("");
    resetTableState(table);
  }, [refreshDataFlag]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setGlobalFilter(searchTerm);
      setPagination((prev) => ({ ...prev, pageIndex: 0 })); // Reset to first page on new search
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, setGlobalFilter, setPagination]);

  const handleGlobalFilterChange = (value) => {
    setSearchTerm(value || ""); // Ensure the value is always a string
  };

  const resetTableState = (table) => {
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
    // Reset the row selection state
    table.setState((prevState) => ({
      ...prevState,
      rowSelection: {},
    }));
  };

  const handleGenerateInvoice = async (selectedRows) => {
    setProgress(0);
    setOpenGenerateInvoiceModal(true);
    setError(null);
    try {
      const response = await post(
        API_ENDPOINTS.GENERATE_INVOICE,
        selectedRows,
        {
          onDownloadProgress: (progressEvent) => {
            const total = progressEvent.total;
            const current = progressEvent.loaded;
            const percentCompleted = Math.floor((current / total) * 100);
            setProgress(percentCompleted);
          },
        }
      );

      if (response.status === "Success") {
        setGenerationComplete(true);
        setSnackbar({
          open: true,
          message: response.message,
          severity: "success",
        });
      } else {
        throw new Error(
          response.message || "Error in generating selected invoices"
        );
      }
    } catch (error) {
      console.error("Error in generating invoices:", error);
      setError(error.message || "Error in generating selected invoices");
      setSnackbar({
        open: true,
        message: error.message || "Error in generating selected invoices",
        severity: "error",
      });
    }
  };

  const handleDeleteInvoice = async (selectedRows) => {
    setProgress(0);
    setOpenDeleteInvoiceModal(true);
    setError(null);
    try {
      const idsForDeletion = selectedRows.map((row) => row.id);
      const response = await del(API_ENDPOINTS.DELETE_INVOICE, idsForDeletion, {
        onDownloadProgress: (progressEvent) => {
          const total = progressEvent.total;
          const current = progressEvent.loaded;
          const percentCompleted = Math.floor((current / total) * 100);
          setProgress(percentCompleted);
        },
      });
      if (response.status === "Success") {
        setDeletionComplete(true);
        // setSnackbar({
        //   open: true,
        //   message: response.message,
        //   severity: "success",
        // });
      } else {
        throw new Error(response.message || "Error in deleting invoices");
      }
    } catch (error) {
      setError(error.message || "Error in deleting invoices");
      setSnackbar({
        open: true,
        message: error.message || "Error deleting invoices",
        severity: "error",
      });
      setOpenDeleteInvoiceModal(false); // Close modal on error
    }
  };

  const handleGenerateCompleteAction = (action) => {
    if (action === "close") {
      handleGenerateCloseModal();
    } else if (action === "view") {
      // Implement view invoices logic
      handleGenerateCloseModal();
    }
  };

  const handleDeleteCompleteAction = (action) => {
    if (action === "close") {
      setOpenGenerateInvoiceModal(false);
      setOpenDeleteInvoiceModal(false);
    } else if (action === "view") {
      // Implement view invoices action
    }
    resetTableState(table);
    fetchData(); // Refetch data
  };

  const table = TableConfiguration({
    columns,
    data,
    rowCount,
    heading,
    setIsColumnChooserOpen,
    setEmailModalOpen,
    handleRowClick,
    isLoading,
    isRefetching,
    pagination,
    columnFilters,
    sorting,
    columnVisibility,
    setColumnFilters,
    globalFilter: searchTerm,
    handleGlobalFilterChange,
    setPagination,
    setSorting,
    setColumnVisibility,
    requiredColumns,
    emailModalOpen,
    isColumnChooserOpen,
    showGenerateDeleteButtons,
    showActionButtons,
    showInvoiceMetrics,
    showSubmitAction,
    showViewMoreButton,
    onGenerateInvoice: (selectedRows) => {
      setSelectedRows(selectedRows);
      handleGenerateInvoice(selectedRows);
    },
    onDeleteInvoice: (selectedRows) => {
      setSelectedRows(selectedRows);
      handleDeleteInvoice(selectedRows);
    },
    onSubmitInvoice: (document) => {
      handleInvoiceSumbission(document);
    },
  });

  const handleInvoiceSumbission = async (document) => {
    setIsSubmitting(true);
    try {
      const submitPayload = {
        documents: [
          {
            format: document?.format || "JSON",
            documentHash: document?.documentHash || null,
            codeNumber: document?.codeNumber || null,
            document: document?.invoiceData || null,
          },
        ],
      };
      const response = await post(API_ENDPOINTS.SUBMI_INVOICE, submitPayload);
      if (response?.submissionUid) {
        setIsSubmitting(false);
        setSnackbar({
          open: true,
          message: "Doucment submitted successfully",
          severity: "success",
        });
      } else {
        setIsSubmitting(false);
        let errorMessage = "";
        if (typeof response === "object") {
          errorMessage =
            response?.rejectedDocuments[0]?.error?.message ||
            "Error in Submission";
        } else {
          errorMessage = response;
        }
        setSnackbar({
          open: true,
          message: errorMessage,
          severity: "error",
        });
        throw new Error(response?.message || "Error in Submission");
      }
    } catch (error) {
      let errorMessage = "";
      if (error.code === "ERR_BAD_RESPONSE") {
        errorMessage = error?.message;
      } else if (typeof error === "object") {
        errorMessage =
          error?.rejectedDocuments[0]?.error?.message || "Error in Submission";
      } else {
        errorMessage = error;
      }
      setIsSubmitting(false);
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }
    finally {
      setIsSubmitting(false);
      fetchData();
    }
  };

  useEffect(() => {
    if (snackbar.open) {
      const timer = setTimeout(() => {
        setSnackbar({ ...snackbar, open: false });
      }, 6000); // 6 seconds

      return () => clearTimeout(timer);
    }
  }, [snackbar]);

  const handleGenerateCloseModal = () => {
    resetTableState(table); // Reset the table state
    setOpenGenerateInvoiceModal(false);
    setGenerationComplete(false);
    setProgress(0);
  };

  const handleDeleteCloseModal = () => {
    resetTableState(table); // Reset the table state
    setOpenDeleteInvoiceModal(false);
    setDeletionComplete(false);
    setProgress(0);
  };

  const handleConfirm = () => {
    resetTableState(table);
  };

  const LoaderContent = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "2rem",
          height: "95%",
          width: "95%",
        }}
      >
        <CircularProgress size={35} />
      </Box>
    );
  };

  return (
    <>
      {isSubmitting && <LoaderContent />}
      <MaterialReactTable
        table={table}
        muiTableBodyRowProps={useMemo(
          () => ({
            onClick: () => handleRowClick(row.id),
            sx: {
              cursor: "pointer",
            },
          }),
          [handleRowClick]
        )}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={10000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <CustomModal
        open={openDeleteInvoiceModal}
        handleClose={() => setOpenDeleteInvoiceModal(false)}
        handleConfirm={() => resetTableState(table)}
        selectedCount={selectedRows.length}
        progress={progress}
        deletionComplete={deletionComplete}
        error={error}
        handleCompleteAction={handleDeleteCompleteAction}
        setError={setError}
        setProgress={setProgress}
      />
      <CustomGenerateInvoiceModal
        open={openGenerateInvoiceModal}
        handleClose={handleGenerateCloseModal}
        handleCompleteAction={handleGenerateCompleteAction}
        totalInvoices={selectedRows.length}
        progress={progress}
        generationComplete={generationComplete}
        error={error}
      />
    </>
  );
};

export default MainTableComponent;
