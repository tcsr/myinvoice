import { useContext } from "react";
import HeaderControls from "../components/header-controls/HeaderControls";
import HeaderProvider, { HeaderContext } from "../context/HeaderContext";
// import LatestInvoiceList from "../components/invoice/LatestInvoiceList";
import ViewInvoiceList from "../components/invoice/ViewInvoiceList";

const ViewInvoiceContent = () => {
  const { selectedSupplier, startDate, endDate } = useContext(HeaderContext);
  return (
    <>
      <HeaderControls title="View Invoice" />
      <ViewInvoiceList
        heading={"Invoice List"}
        selectedSupplier={selectedSupplier}
        startDate={startDate}
        endDate={endDate}
        showGenerateDeleteButtons={false}
        showActionButtons={true}
        showInvoiceMetrics={true}
        showSubmitAction={false}
        showViewMoreButton={true}
        showDetailsPanel={true}
      />
    </>
  );
};

const GenerateInvoice = () => {
  return (
    <HeaderProvider>
      <ViewInvoiceContent />
    </HeaderProvider>
  );
};

export default GenerateInvoice;
