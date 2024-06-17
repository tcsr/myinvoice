import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import { HeaderContext } from "../../context/HeaderContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const HeaderControls = ({ title }) => {
  const {
    supplierDetails,
    selectedSupplier,
    setSelectedSupplier,
    date,
    setDate,
    refreshData,
  } = useContext(HeaderContext);

  const navigate = useNavigate();
  const handleAddInvoices = () => {
    navigate("/upload-invoice");
  };

  const selectedSupplierTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div>{option.code + " " + option.name}</div>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const supplierOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option.code + " " + option.name}</div>
      </div>
    );
  };

  return (
    <>
      <div className="mb-2 page-header">{title}</div>
      <div
        className="mb-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <Dropdown
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.value)}
            options={supplierDetails}
            optionLabel="name"
            placeholder="Select"
            className="w-full border-none"
            style={{ borderRadius: "2rem" }}
            valueTemplate={selectedSupplierTemplate}
            itemTemplate={supplierOptionTemplate}
          />
        </div>
        <div className="flex">
          <Calendar
            className="w-full md:w-17rem mr-3 custom-calendar"
            value={date}
            dateFormat="dd M yy"
            onChange={(e) => setDate(e.value)}
            numberOfMonths={2}
            selectionMode="range"
            showIcon
          />
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            sx={{
              borderRadius: "2rem",
              marginRight: "1rem",
              textTransform: "none",
              fontWeight: "100",
              letterSpacing: "1px",
              color: "#4b5563",
              border: "1px solid rgba(0, 0, 0, 0.38)",
            }}
            onClick={refreshData}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: "2rem",
              textTransform: "none",
              height: "45px",
              fontWeight: "100",
              letterSpacing: "1px",
            }}
            onClick={handleAddInvoices}
          >
            Add Invoice
          </Button>
        </div>
      </div>
    </>
  );
};

export default HeaderControls;
