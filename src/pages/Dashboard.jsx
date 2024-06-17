import { useContext } from "react";
import LatestInvoiceList from "../components/invoice/LatestInvoiceList";
import DashboardCard from "../components/dashboard/DashboardCard";

import HeaderControls from "../components/header-controls/HeaderControls";
import HeaderProvider, { HeaderContext } from "../context/HeaderContext";

const DashboardContent = () => {
  const { selectedSupplier, startDate, endDate } = useContext(HeaderContext);
  return (
    <>
      <HeaderControls title="Dashboard" />
      <DashboardCard
        selectedSupplier={selectedSupplier}
        startDate={startDate}
        endDate={endDate}
      />
      <LatestInvoiceList
        heading={"Recently Generated"}
        selectedSupplier={selectedSupplier}
        startDate={startDate}
        endDate={endDate}
      />
    </>
  );
};

const Dashboard = () => {
  return (
    <HeaderProvider>
      <DashboardContent />
    </HeaderProvider>
  );
};

export default Dashboard;
