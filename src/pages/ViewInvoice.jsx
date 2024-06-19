import { useContext } from "react";
import HeaderControls from "../components/header-controls/HeaderControls";
import HeaderProvider, { HeaderContext } from "../context/HeaderContext";
import LatestInvoiceList from "../components/invoice/LatestInvoiceList";

const ViewInvoiceContent = () => {
  const { selectedSupplier, startDate, endDate } = useContext(HeaderContext);
  return (
    <>
      <HeaderControls title="View Invoice" />
      <LatestInvoiceList
        heading={"Invoice List"}
        selectedSupplier={selectedSupplier}
        startDate={startDate}
        endDate={endDate}
        showGenerateDeleteButtons={false}
        showActionButtons={true}
        showInvoiceMetrics={true}
        showSubmitAction = {true}
        showViewMoreButton={true}
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
