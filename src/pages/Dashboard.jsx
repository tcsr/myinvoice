import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import LatestInvoiceList from "../components/invoice/LatestInvoiceList";
import useApi from "../hooks/useApi";
import { API_ENDPOINTS } from "../api/apiEndpoints";
import DashboardCard from "../components/dashboard/DashboardCard";
import dayjs from "dayjs";

const Dashboard = () => {
  const [supplierDetails, setSupplierDetails] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [date, setDate] = useState([null, null]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [viewDate, setViewDate] = useState(new Date());

  const { get } = useApi();
  const navigate = useNavigate();

  const handleAddInvoices = () => {
    navigate("/upload-invoice");
  };

  useEffect(() => {
    fetchSupplierDetails();
    setDefaultDateRange();
  }, []);

  const fetchSupplierDetails = async () => {
    try {
      const data = await get(API_ENDPOINTS.GET_SUPPLIER_DETAILS);
      setSupplierDetails(data);
      setSelectedSupplier(data[0]);
      setDefaultDateRange();
    } catch (error) {
      console.log(error);
    }
  };

  const setDefaultDateRange = () => {
    const currentDate = new Date();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    setDate([firstDay, currentDate]);
    setStartDate(dayjs(firstDay).format('YYYY-MM-DD'));
    setEndDate(dayjs(currentDate).format('YYYY-MM-DD'));
    setViewDate(firstDay); // Set the view date to the first day of the current month
  };

  const reset = async () => {
    await fetchSupplierDetails();
    setDefaultDateRange();
  };

  useEffect(() => {
    if (date[0] && date[1]) {
      setStartDate(dayjs(date[0]).format('YYYY-MM-DD'));
      setEndDate(dayjs(date[1]).format('YYYY-MM-DD'));
    }
  }, [date]);

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
      <div className="text-700 mb-2">Dashboard</div>
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
            dateFormat={"dd M yy"}
            onChange={(e) => setDate(e.value)}
            numberOfMonths={2}
            selectionMode="range"
            showIcon
            maxDate={new Date()} // Disable future dates
            viewDate={viewDate} // Set the view date to the first day of the current month
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
              border: "1px solid rgba(0, 0, 0, 0.38)"
            }}
            onClick={reset} // Call reset method
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
      <DashboardCard selectedSupplier={selectedSupplier} startDate={startDate} endDate={endDate} />
      <div className="m-1">
        <LatestInvoiceList heading={"Recently Generated"} selectedSupplier={selectedSupplier} startDate={startDate} endDate={endDate} />
      </div>
    </>
  );
};

export default Dashboard;
