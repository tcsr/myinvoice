import { useContext } from "react";
import HeaderControls from "../components/header-controls/HeaderControls";
import HeaderProvider, { HeaderContext } from "../context/HeaderContext";
import LatestInvoiceList from "../components/invoice/LatestInvoiceList";

const GenerateInvoiceContent = () => {
  const { selectedSupplier, startDate, endDate } = useContext(HeaderContext);
  return (
    <>
      <HeaderControls title="Generate" />
      <LatestInvoiceList
        heading={"Invoice List"}
        selectedSupplier={selectedSupplier}
        startDate={startDate}
        endDate={endDate}
        showActionButtons={true}
        showGenerateDeleteButtons={true}
        showSubmitAction = {true}
        showViewMoreButton={true}
      />
    </>
  );
};

const GenerateInvoice = () => {
  return (
    <HeaderProvider>
      <GenerateInvoiceContent />
    </HeaderProvider>
  );
};

export default GenerateInvoice;
