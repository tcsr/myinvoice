import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import useApi from "../../hooks/useApi";
import { API_ENDPOINTS } from "../../api/apiEndpoints";
import MainTableComponent from "../table/MainTableComponent";
import getStatusChip from "../../utils/getStatusChip";
import { truncateText } from '../../utils/index';

const InvoiceList = ({ heading }) => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
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

  const { get } = useApi();

  const fetchInvoiceDetails = async () => {
    setIsLoading(true);
    setIsRefetching(true);

    const queryParams = new URLSearchParams({
      page: pagination.pageIndex,
      size: pagination.pageSize,
      ...(globalFilter && { search: globalFilter }),
      ...(sorting.length > 0 && { sorting: JSON.stringify(sorting) }),
      ...(columnFilters.length > 0 && { filters: JSON.stringify(columnFilters) }),
    });

    try {
      const response = await get(`${API_ENDPOINTS.GET_INVOICE_LIST}?${queryParams}`);
      setData(response.content);
      setRowCount(response.totalElements); // Assuming totalElements is returned from the API
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsRefetching(false);
    }
  };

  useEffect(() => {
    fetchInvoiceDetails();
  }, [
    columnFilters,
    globalFilter,
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
  ]);

  const handleRowClick = (rowId) => {
    // Implement row click handling if needed
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
            <a
              style={{ cursor: "pointer", color: "#1E6091" }}
            >
              {truncateText(cell?.getValue(), 40)}
            </a>
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
      },
      {
        accessorKey: "generatedNumber",
        header: "Generated Number",
        size: 130,
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
        Cell: ({ cell }) => getStatusChip(cell.getValue()),
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
    irbmResponse: "IRBM Response"
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
        fetchData={fetchInvoiceDetails}
        showGenerateDeleteButtons={true}
        showActionButtons={true}
      />
    </>
  );
};

export default InvoiceList;
