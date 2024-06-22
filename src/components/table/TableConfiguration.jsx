import { useEffect, useMemo, useState } from "react";
import { useMaterialReactTable } from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import TableToolbarActions from "./TableToolbarActions";
import TableToolbarInternalActions from "./TableToolbarInternalActions";
import DetailPanel from "./DetailPanel";
import MotionPlayIcon from "../../assets/images/motion-play-outline.svg";
// Icons Imports
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

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
  showSubmitAction = false,
  showViewMoreButton = false,
  showDetailsPanel = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentRow(null);
  };

  const handleViewDetails = () => {
    const { id } = currentRow;
    setAnchorEl(null);
    if (id) {
      navigate(`/invoice-details/${id}`, {
        state: { from: { pathname: location.pathname } },
      });
    }
  };

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
    positionToolbarAlertBanner: "top",
    positionActionsColumn: "last",
    paginationDisplayMode: "pages",
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
      density: "compact",
      pagination: { pageSize: 10, pageIndex: 0 },
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["irbmResponse", "mrt-row-actions"],
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
          emailModalOpen={emailModalOpen}
          isColumnChooserOpen={isColumnChooserOpen}
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
      if (!showDetailsPanel) return undefined;
      const RenderDetailPanel = ({ row }) => <DetailPanel row={row} />;
      RenderDetailPanel.displayName = "RenderDetailPanel";
      return RenderDetailPanel;
    }, [showDetailsPanel]),
    renderRowActions: ({ row }) =>
      showActionButtons ? (
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            gap: "0.35rem",
          }}
        >
          {showSubmitAction && (
            <Tooltip title={"Submit"}>
              <IconButton onClick={() => onSubmitInvoice(row.original)}>
                <img src={MotionPlayIcon} />
              </IconButton>
            </Tooltip>
          )}
          {showViewMoreButton && (
            <IconButton
              aria-controls={open ? "action-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(event) => handleClick(event, row.original)}
              id="action-button"
            >
              <MoreHorizIcon />
            </IconButton>
          )}
          <Menu
            id="action-menu"
            MenuListProps={{
              "aria-labelledby": "action-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
            PaperProps={{
              elevation: 1,
              sx: {
                backgroundColor: "background.paper",
                mt: 1.5,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                width: "200px",
                maxHeight: "110px",
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
          >
            <MenuItem sx={{ height: "30px" }} onClick={handleViewDetails}>
              View Details
            </MenuItem>
          </Menu>
        </div>
      ) : null,
    renderBottomToolbarCustomActions: () => (
      <Box>Total Records : {rowCount}</Box>
    ),
  });

  return table;
};

export default TableConfiguration;
