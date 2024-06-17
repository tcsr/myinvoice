import { createContext, useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import { API_ENDPOINTS } from "../api/apiEndpoints";
import dayjs from "dayjs";

export const HeaderContext = createContext();

const HeaderProvider = ({ children }) => {
  const [supplierDetails, setSupplierDetails] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [date, setDate] = useState([null, null]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [refreshDataFlag, setRefreshDataFlag] = useState(false);

  const { get } = useApi();

  const fetchSupplierDetails = async () => {
    try {
      const data = await get(API_ENDPOINTS.GET_SUPPLIER_DETAILS);
      setSupplierDetails(data);
      setSelectedSupplier(data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const setDefaultDateRange = () => {
    const currentDate = new Date();
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    // const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    setDate([firstDay, currentDate]);
    setStartDate(dayjs(firstDay).format("YYYY-MM-DD"));
    setEndDate(dayjs(currentDate).format("YYYY-MM-DD"));
  };

  useEffect(() => {
    fetchSupplierDetails();
    setDefaultDateRange();
  }, []);

  useEffect(() => {
    if (date[0] && date[1]) {
      setStartDate(dayjs(date[0]).format("YYYY-MM-DD"));
      setEndDate(dayjs(date[1]).format("YYYY-MM-DD"));
    }
  }, [date]);

  const refreshData = () => {
    setRefreshDataFlag((prevFlag) => !prevFlag); // Toggle flag to trigger useEffect in child components
    setDefaultDateRange();
    fetchSupplierDetails();
  };

  return (
    <HeaderContext.Provider
      value={{
        supplierDetails,
        selectedSupplier,
        setSelectedSupplier,
        date,
        setDate,
        startDate,
        endDate,
        refreshData,
        refreshDataFlag,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;
