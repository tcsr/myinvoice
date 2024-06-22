import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useQuery } from '@tanstack/react-query';
import useApi from "../../hooks/useApi";
import { API_ENDPOINTS } from "../../api/apiEndpoints";
import MainTableComponent from "../table/MainTableComponent";
import getStatusChip from "../../utils/getStatusChip";
import { truncateText, formatDateIntoReadableFormat } from "../../utils/index";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DetailsDialog from "../../components/table/DetailsDialog";

const LatestInvoiceList = ({
  heading,
  selectedSupplier,
  startDate,
  endDate,
  showGenerateDeleteButtons = false,
  showActionButtons = false,
  showInvoiceMetrics,
  showSubmitAction = false,
  showViewMoreButton = false,
  source = null
}) => {
  const [data, setData] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnVisibility, setColumnVisibility] = useState({
    counterParty: true,
    docType: true,
    docNumber: true,
    docDate: true,
    generatedNumber: true,
    invoiceType: true,
    invoiceValue: true,
    irbmResponse: true,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const { get } = useApi();

  const fetchLatestInvoiceDetails = useCallback(async () => {
    if (selectedSupplier && startDate && endDate) {
      const queryParams = new URLSearchParams({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
        supplierCode: selectedSupplier.code,
        startDate,
        endDate,
        ...(globalFilter && { searchTerm: globalFilter }),
        ...(sorting.length > 0 && { sorting: JSON.stringify(sorting) }),
        ...(columnFilters.length > 0 && {
          filters: JSON.stringify(columnFilters),
        }),
      });

      const response = await get(`${API_ENDPOINTS.GET_INVOICE_LIST}?${queryParams}`);
      return response;
    }
    return { content: [], totalElements: 0 };
  }, [
    selectedSupplier, startDate, endDate, pagination.pageIndex,
    pagination.pageSize, globalFilter, sorting, columnFilters, get
  ]);

  const { data: queryData, isLoading, refetch, isRefetching } = useQuery({
    queryKey: [
      'invoice-list',
      selectedSupplier,
      startDate,
      endDate,
      columnFilters,
      globalFilter,
      pagination.pageIndex,
      pagination.pageSize,
      sorting,
    ],
    queryFn: fetchLatestInvoiceDetails,
    enabled: !!selectedSupplier && !!startDate && !!endDate,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (queryData) {
      setData(queryData.content);
      setRowCount(queryData.totalElements);
    }
  }, [queryData]);

  const handleRowClick = (rowId) => {
    // Implement row click handling if needed
  };

  const handleInfoClick = (row) => {
    setSelectedRowData(row);
    setOpenDialog(true);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "counterParty",
        header: "Counter Party",
        size: 220,
        Cell: ({ cell, row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
            onClick={() => handleRowClick(row.id)}
          >
            {truncateText(cell?.getValue(), 40)}
            {/* <a style={{ cursor: "pointer", color: "#1E6091" }}>
              {truncateText(cell?.getValue(), 40)}
            </a> */}
          </Box>
        ),
      },
      {
        accessorKey: "docType",
        header: "Doc Type",
        size: 90,
      },
      {
        accessorKey: "docNumber",
        header: "Doc Number",
        size: 120,
      },
      {
        accessorKey: "docDate",
        header: "Doc Date",
        size: 100,
        Cell: ({ cell, row }) => (
          <Box>
            {cell?.getValue()
              ? formatDateIntoReadableFormat(cell?.getValue())
              : "-"}
          </Box>
        ),
      },
      {
        accessorKey: "generatedNumber",
        header: "Generated Number",
        size: 130,
      },
      {
        accessorKey: "generatedOn",
        header: "Generated On",
        size: 130,
        Cell: ({ cell, row }) => (
          <Box>
            {cell?.getValue()
              ? formatDateIntoReadableFormat(cell?.getValue())
              : "-"}
          </Box>
        ),
      },
      {
        accessorKey: "invoiceType",
        header: "Invoice Type",
        size: 70,
      },
      {
        accessorKey: "invoiceValue",
        header: "Invoice Value",
        size: 90,
      },
      {
        accessorKey: "irbmResponse",
        header: "IRBM Response",
        size: 90,
        Cell: ({ cell, row }) => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="View info">
              <IconButton
                size="small"
                onClick={() => handleInfoClick(row.original)}
                sx={{ marginRight: "0.05rem", color: "#1E6091" }}
              >
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
            {getStatusChip(cell.getValue())}
          </Box>
        ),
      },
    ],
    []
  );

  const requiredColumns = {
    counterParty: "Counter Party",
    docType: "Doc Type",
    docNumber: "Doc Number",
    docDate: "Doc Date",
    generatedNumber: "Generated Number",
    invoiceType: "Invoice Type",
    invoiceValue: "Invoice Value",
    irbmResponse: "IRBM Response",
  };

  return (
    <>
      <MainTableComponent
        columns={columns}
        data={data}
        rowCount={rowCount}
        heading={heading}
        handleRowClick={handleRowClick}
        isLoading={isLoading}
        isRefetching={isRefetching}
        pagination={pagination}
        columnFilters={columnFilters}
        globalFilter={globalFilter}
        sorting={sorting}
        columnVisibility={columnVisibility}
        setColumnFilters={setColumnFilters}
        setPagination={setPagination}
        setSorting={setSorting}
        setColumnVisibility={setColumnVisibility}
        requiredColumns={requiredColumns}
        setGlobalFilter={setGlobalFilter}
        fetchData={refetch}
        showGenerateDeleteButtons={showGenerateDeleteButtons}
        showInvoiceMetrics={showInvoiceMetrics}
        showActionButtons={showActionButtons}
        showViewMoreButton={showViewMoreButton}
        showSubmitAction={showSubmitAction}
      />

      <DetailsDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        rowData={selectedRowData}
      />
    </>
  );
};

export default LatestInvoiceList;
