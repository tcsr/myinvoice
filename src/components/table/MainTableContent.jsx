import React, { useEffect, useContext, forwardRef } from 'react';
import { MaterialReactTable } from 'material-react-table';
import TableConfiguration from './TableConfiguration';
import { TableContext } from '../../context/TableContext';

const MainTableContent = forwardRef(({
    columns,
    data,
    rowCount,
    heading,
    handleRowClick,
    isLoading,
    isRefetching,
    showGenerateDeleteButtons,
    showActionButtons,
    showInvoiceMetrics,
    fetchData, // A function prop to refetch data
}, ref) => {
    const {
        setTable,
        selectedRows,
        setSelectedRows,
        handleGenerateInvoice,
        handleDeleteInvoice,
    } = useContext(TableContext);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (ref && ref.current) {
            setTable(ref.current);
        }
    }, [setTable, ref]);

    return (
        <MaterialReactTable
            {...TableConfiguration({
                columns,
                data,
                rowCount,
                heading,
                handleExportData: () => {}, // Implement as needed
                handleRowClick,
                isLoading,
                isRefetching,
                requiredColumns: [], // Pass required columns
                showGenerateDeleteButtons,
                showActionButtons,
                showInvoiceMetrics,
                onGenerateInvoice: (selectedRows) => {
                    setSelectedRows(selectedRows);
                    handleGenerateInvoice();
                },
                onDeleteInvoice: (selectedRows) => {
                    setSelectedRows(selectedRows);
                    handleDeleteInvoice();
                },
            })}
            ref={ref}
        />
    );
});

MainTableContent.displayName = 'MainTableContent';

export default MainTableContent;
