import { createContext, useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useApi from "../hooks/useApi";
import { API_ENDPOINTS } from "../api/apiEndpoints";
import dayjs from "dayjs";

export const HeaderContext = createContext();

const HeaderProvider = ({ children }) => {
  // const [supplierDetails, setSupplierDetails] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [date, setDate] = useState([null, null]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [refreshDataFlag, setRefreshDataFlag] = useState(false);
  const selectedSupplierRef = useRef(null);

  const { get } = useApi();
  const queryClient = useQueryClient();

  const fetchSupplierDetails = async () => {
    const data = await get(API_ENDPOINTS.GET_SUPPLIER_DETAILS);
    return data;
  };

  const { data: supplierDetails = [], refetch: refetchSupplierDetails } = useQuery({
    queryKey: ['supplierDetails'],
    queryFn: fetchSupplierDetails,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (data.length > 0 && !selectedSupplier) {
        setSelectedSupplier(data[0]);
        selectedSupplierRef.current = data[0];
      }
    },
  });

  useEffect(() => {
    if (supplierDetails.length > 0 && !selectedSupplierRef.current) {
      setSelectedSupplier(supplierDetails[0]);
      selectedSupplierRef.current = supplierDetails[0];
    }
  }, [supplierDetails]);

  const setDefaultDateRange = () => {
    const currentDate = new Date();
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    setDate([firstDay, currentDate]);
    setStartDate(dayjs(firstDay).format("YYYY-MM-DD"));
    setEndDate(dayjs(currentDate).format("YYYY-MM-DD"));
  };

  useEffect(() => {
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
    queryClient.invalidateQueries('cardDetails'); // Invalidate the query for card details
    refetchSupplierDetails();
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
