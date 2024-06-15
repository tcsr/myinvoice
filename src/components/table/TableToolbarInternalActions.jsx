import { Box, IconButton, Tooltip } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import { MRT_ShowHideColumnsButton, MRT_ToggleFiltersButton } from "material-react-table";
import EmailModal from './EmailModal';
import ColumnChooser from './ColumnChooser';
import download_icon from "../../assets/images/arrow-download.svg";
import send_email_icon from "../../assets/images/email-arrow-right-outline.svg";
import { mkConfig, generateCsv, download } from 'export-to-csv';
import PrintableTable from './PrintableTable';
import { useRef } from "react";


const TableToolbarInternalActions = ({
  table,
  setIsColumnChooserOpen,
  setEmailModalOpen,
  emailModalOpen,
  isColumnChooserOpen,
  columns,
  data,
  requiredColumns = {}, // Add a default value
}) => {

  const selectedRows = table.getSelectedRowModel().flatRows;
  const rowsSelected = selectedRows.length > 0;
  const printRef = useRef(null); // Create a ref to hold the printable content

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
    filename: 'Invoice-list',
    headers: Object.values(requiredColumns),
  });

  const filterDataForCSV = (data) => {
    return data.map((row) => {
      const filteredRow = {};
      Object.keys(requiredColumns).forEach((key) => {
        filteredRow[requiredColumns[key]] = row[key];
      });
      return filteredRow;
    });
  };

  const handleExportData = () => {
    const filteredData = filterDataForCSV(data);
    const csv = generateCsv(csvConfig)(filteredData);
    download(csvConfig)(csv);
    table.setState((prevState) => ({
      ...prevState,
      rowSelection: {},
    }));
  };

  const handleSendEmail = (emailData) => {
    // Implement email sending logic
    console.log(emailData);
  };

  const handleSaveColumns = (columnsState) => {
    columnsState.forEach(column => {
      console.log(column);
      table.getColumn(column.id)?.toggleVisibility(column.enableHiding);
    });
  };

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    // Reset the table selection state
    table.setState((prevState) => ({
      ...prevState,
      rowSelection: {},
    }));

    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write('<html><head><title>Print Invoice</title>');
    doc.write(`
      <style>
        body {
          margin: 10px;
          font-family: Arial, sans-serif;
        }
        table {
          border-collapse: collapse;
          width: 100%;
          height: auto;
          font-size: 0.8em;
        }
        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: left;
          word-wrap: break-word;
          white-space: normal;
        }
        th {
          background-color: #f2f2f2;
        }
        h1 {
          text-align: center;
          margin-bottom: 20px;
        }
      </style>
    `);
    doc.write('</head><body>');
    doc.write(printContent);
    doc.write('</body></html>');
    doc.close();

    const printWindow = iframe.contentWindow;
    printWindow.focus();
    printWindow.print();

    printWindow.onafterprint = () => {
      document.body.removeChild(iframe);
    };
  };

  const selectValidationMessage = 'Pleasse select one or more invoices';

  return (
    <>
      <Box sx={{ p: 1 }}>
        <Tooltip title={rowsSelected ? "Print" : selectValidationMessage}>
          <span>
            <IconButton
              className="mx-1"
              onClick={() => {
                if (rowsSelected) {
                  // window.print();
                  handlePrint();
                }
              }}
              disabled={!rowsSelected}
            >
              <PrintIcon />
            </IconButton>
          </span>
        </Tooltip>
        <MRT_ShowHideColumnsButton table={table} className="mx-1" onClick={() => setIsColumnChooserOpen(true)} />
        <MRT_ToggleFiltersButton table={table} className="mx-1" />
        <Tooltip title={rowsSelected ? "Send Email" : selectValidationMessage}>
          <span>
            <IconButton
              onClick={() => {
                if (rowsSelected) {
                  setEmailModalOpen(true);
                }
              }}
              className="mx-1"
              disabled={!rowsSelected}
              sx={{ opacity: rowsSelected ? 1 : 0.5 }}
            >
              <img src={send_email_icon} />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={rowsSelected ? "Download" : selectValidationMessage}>
          <span>
            <IconButton
              onClick={() => {
                if (rowsSelected) {
                  handleExportData();
                }
              }}
              className="ml-1"
              disabled={!rowsSelected}
              sx={{ opacity: rowsSelected ? 1 : 0.5 }}
            >
              <img src={download_icon} />
            </IconButton>
          </span>
        </Tooltip>
      </Box>

      <div style={{ display: 'none' }}>
        <div ref={printRef}>
          <PrintableTable rows={selectedRows} columns={columns} />
        </div>
      </div>

      <EmailModal
        open={emailModalOpen}
        handleClose={() => setEmailModalOpen(false)}
        handleSend={handleSendEmail}
      />
      <ColumnChooser
        isOpen={isColumnChooserOpen}
        onClose={() => setIsColumnChooserOpen(false)}
        table={table}
        handleSave={handleSaveColumns}
      />
    </>
  );
};

export default TableToolbarInternalActions;
