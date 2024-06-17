import { useMemo } from "react";
import { useMaterialReactTable } from "material-react-table";
import { IconButton, Tooltip } from "@mui/material";
import TableToolbarActions from "./TableToolbarActions";
import TableToolbarInternalActions from "./TableToolbarInternalActions";
import DetailPanel from "./DetailPanel";
import close_icon from "../../assets/images/close.svg";
import MotionPlayIcon from "../../assets/images/motion-play-outline.svg";
//Material UI Imports
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  lighten,
} from "@mui/material";

//Icons Imports
import { AccountCircle, Send } from "@mui/icons-material";

const TableConfiguration = ({
  columns,
  data,
  rowCount,
  heading,
  setIsColumnChooserOpen,
  setEmailModalOpen,
  handleExportData,
  handleRowClick,
  isLoading,
  isRefetching,
  pagination,
  columnFilters,
  globalFilter,
  sorting,
  columnVisibility,
  setColumnFilters,
  handleGlobalFilterChange,
  setPagination,
  setSorting,
  setColumnVisibility,
  requiredColumns,
  emailModalOpen,
  isColumnChooserOpen,
  onGenerateInvoice,
  onDeleteInvoice,
  onSubmitInvoice,
  showGenerateDeleteButtons,
  showActionButtons,
  showInvoiceMetrics,
}) => {
  const table = useMaterialReactTable({
    columns,
    data,
    manualPagination: true,
    manualFiltering: false,
    manualSorting: false,
    rowCount,
    enableStickyHeader: true,
    enableColumnActions: false,
    enableRowSelection: true,
    enableRowActions: showActionButtons,
    manualExpanding: true,
    state: {
      isLoading,
      showProgressBars: isRefetching,
      pagination,
      columnFilters,
      globalFilter,
      sorting,
      columnVisibility,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: handleGlobalFilterChange,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    positionToolbarAlertBanner: "bottom",
    positionActionsColumn: "last",
    paginationDisplayMode: "pages",
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
      density: "compact",
      pagination: { pageSize: 10, pageIndex: 0 },
      columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'],
        right: ['irbmResponse','mrt-row-actions'],
      },
    },
    muiCircularProgressProps: {
      color: "primary",
      thickness: 5,
      size: 55,
    },
    muiSkeletonProps: {
      animation: "wave",
      height: 28,
    },
    muiPaginationProps: {
      showFirstButton: true,
      showLastButton: true,
    },
    muiSearchTextFieldProps: {
      placeholder: "Enter keyword to search...",
      value: globalFilter || "",
      sx: { minWidth: "20rem" },
      variant: "outlined",
      onChange: (e) => handleGlobalFilterChange(e.target.value),
      // InputProps: {
      //     endAdornment: globalFilter ? (
      //         <Tooltip title="Clear Search">
      //             <IconButton onClick={() => handleGlobalFilterChange('')}>
      //                 <img src={close_icon} />
      //             </IconButton>
      //         </Tooltip>
      //     ) : null,
      // },
    },
    muiSelectCheckboxProps: ({ row }) => ({
      size: "small",
      sx: { textAlign: "center" },
    }),
    muiSelectAllCheckboxProps: {
      size: "small",
    },
    muiFilterTextFieldProps: {
      variant: "outlined",
    },
    renderTopToolbarCustomActions: useMemo(() => {
      const TopToolbarCustomActions = ({ table }) => (
        <TableToolbarActions
          table={table}
          heading={heading}
          onGenerateInvoice={onGenerateInvoice}
          onDeleteInvoice={onDeleteInvoice}
          showGenerateDeleteButtons={showGenerateDeleteButtons}
          showInvoiceMetrics={showInvoiceMetrics}
        />
      );
      TopToolbarCustomActions.displayName = "TopToolbarCustomActions";
      return TopToolbarCustomActions;
    }, [
      heading,
      onGenerateInvoice,
      onDeleteInvoice,
      showGenerateDeleteButtons,
      showInvoiceMetrics,
    ]),
    renderToolbarInternalActions: useMemo(() => {
      const ToolbarInternalActions = ({ table }) => (
        <TableToolbarInternalActions
          table={table}
          setIsColumnChooserOpen={setIsColumnChooserOpen}
          setEmailModalOpen={setEmailModalOpen}
          handleExportData={handleExportData}
          requiredColumns={requiredColumns}
          columns={columns}
          data={data}
          emailModalOpen={emailModalOpen} // Pass emailModalOpen
          isColumnChooserOpen={isColumnChooserOpen} // Pass isColumnChooserOpen
        />
      );
      ToolbarInternalActions.displayName = "ToolbarInternalActions";
      return ToolbarInternalActions;
    }, [
      setIsColumnChooserOpen,
      setEmailModalOpen,
      handleExportData,
      requiredColumns,
      columns,
      data,
      emailModalOpen,
      isColumnChooserOpen,
    ]),
    renderDetailPanel: useMemo(() => {
      const RenderDetailPanel = ({ row }) => <DetailPanel row={row} />;
      RenderDetailPanel.displayName = "RenderDetailPanel";
      return RenderDetailPanel;
    }, []),
    renderRowActions: ({ row }) =>
      showActionButtons ? (
        <>
          <Tooltip title={"Submit"}>
            <IconButton onClick={() => onSubmitInvoice(row.original)}>
              <img src={MotionPlayIcon} />
            </IconButton>
          </Tooltip>
        </>
      ) : null,
    renderRowActionMenuItems: ({ closeMenu }) =>
      showActionButtons
        ? [
            <MenuItem
              key={0}
              onClick={() => {
                closeMenu();
              }}
              sx={{ m: 0 }}
            >
              View Details
            </MenuItem>,
            <MenuItem
              key={1}
              onClick={() => {
                // View profile logic...
                closeMenu();
              }}
              sx={{ m: 0 }}
            >
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              View Profile
            </MenuItem>,
            <MenuItem
              key={2}
              onClick={() => {
                // Send email logic...
                closeMenu();
              }}
              sx={{ m: 0 }}
            >
              <ListItemIcon>
                <Send />
              </ListItemIcon>
              Send Email
            </MenuItem>,
          ]
        : [],
  });

  return table;
};

export default TableConfiguration;
