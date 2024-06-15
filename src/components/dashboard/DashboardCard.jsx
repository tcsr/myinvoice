import { useEffect, useState } from "react";
import chartbox from "../../assets/images/chart-box-outline.svg";
import filedoc from "../../assets/images/file-document-check-outline.svg";
import filedocalert from "../../assets/images/file-document-alert-outline.svg";
import removeoutline from "../../assets/images/file-document-remove-outline.svg";
import serveroutline from "../../assets/images/server-outline.svg";
import { API_ENDPOINTS } from "../../api/apiEndpoints";
import useApi from "../../hooks/useApi";
import {
  Box,
  Typography,
  Tooltip,
  Divider,
  Skeleton,
  Chip,
  IconButton,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { styled } from "@mui/system";
import dayjs from "dayjs";

const SourceSystemTodayTooltip = ({ data }) => (
  <Box>
    <Typography
      variant="h6"
      sx={{
        fontWeight: "bold",
        marginBottom: "8px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span>In Queue:</span>{" "}
      <span style={{ paddingLeft: "8px" }}>{data.inQueue || 0}</span>
    </Typography>
    <Typography
      variant="body2"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "8px",
      }}
    >
      <span>Source System:</span>{" "}
      <span style={{ paddingLeft: "8px" }}>{data.sourceSystem || 0}</span>
    </Typography>
    <Typography
      variant="body2"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "8px",
      }}
    >
      <span>Manually added:</span>{" "}
      <span style={{ paddingLeft: "8px" }}>{data.manuallyAdded || 0}</span>
    </Typography>
    <Divider sx={{ borderColor: "#FFFFFF", marginY: "8px" }} />
    <Typography
      variant="h6"
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <span>Failed to interface:</span>{" "}
      <span style={{ paddingLeft: "8px" }}>{data.failedToInterface || 0}</span>
    </Typography>
  </Box>
);

const SourceSystemThisMonthTooltip = ({ data }) => (
  <Box>
    <Typography
      variant="h6"
      sx={{
        fontWeight: "bold",
        marginBottom: "8px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span>In Queue:</span>{" "}
      <span style={{ paddingLeft: "8px" }}>{data.inQueue || 0}</span>
    </Typography>
    <Typography
      variant="body2"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "8px",
      }}
    >
      <span>Source System:</span>{" "}
      <span style={{ paddingLeft: "8px" }}>{data.sourceSystem || 0}</span>
    </Typography>
    <Typography
      variant="body2"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "8px",
      }}
    >
      <span>Manually added:</span>{" "}
      <span style={{ paddingLeft: "8px" }}>{data.manuallyAdded || 0}</span>
    </Typography>
    <Divider sx={{ borderColor: "#FFFFFF", marginY: "8px" }} />
    <Typography
      variant="h6"
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <span>Failed to interface:</span>{" "}
      <span style={{ paddingLeft: "8px" }}>{data.failedToInterface || 0}</span>
    </Typography>
  </Box>
);

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .MuiTooltip-tooltip`]: {
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    padding: "12px 20px",
    width: "100%",
    maxWidth: "none",
    borderRadius: "4px",
  },
});

const cardStyles = {
  Summary: {
    backgroundColor: "#EBECEE",
    iconBgColor: "#E0E0E0",
    icon: chartbox,
  },
  Success: {
    backgroundColor: "#DFF3CD",
    iconBgColor: "#BFE79C",
    icon: filedoc,
  },
  Rejected: {
    backgroundColor: "#FFE5EC",
    iconBgColor: "#FFC2D1",
    icon: removeoutline,
  },
  Errors: {
    backgroundColor: "#F5EFFF",
    iconBgColor: "#E5D9F2",
    icon: filedocalert,
  },
  Source: {
    backgroundColor: "#B7E7F6",
    iconBgColor: "#92DBF2",
    icon: serveroutline,
  },
};

const fallbackData = [
  {
    id: 1,
    title: "IRBM Overall Summary",
    code: "Summary",
    today: 0,
    thismonth: 0,
  },
  { id: 2, title: "IRBM Success", code: "Success", today: 0, thismonth: 0 },
  { id: 3, title: "IRBM Rejected", code: "Rejected", today: 0, thismonth: 0 },
  { id: 4, title: "IRBM Errors", code: "Errors", today: 0, thismonth: 0 },
  { id: 5, title: "Source System", code: "Source", today: 0, thismonth: 0 },
];

const DashboardCard = ({ selectedSupplier, startDate, endDate }) => {
  const [cardDetails, setCardDetails] = useState([]);
  const { get, loading, error } = useApi();

  const fetchCardDetails = async () => {
    if (selectedSupplier && startDate && endDate) {
      const queryParams = `supplierCode=${selectedSupplier.code}&startDate=${startDate}&endDate=${endDate}`;

      try {
        const data = await get(
          `${API_ENDPOINTS.GET_CARDS_DETAILS}?${queryParams}`
        );
        setCardDetails(data && data.length > 0 ? data : fallbackData);
      } catch (error) {
        console.log(error);
        setCardDetails(fallbackData);
      }
    } else {
      setCardDetails(fallbackData);
    }
  };

  useEffect(() => {
    fetchCardDetails();
  }, [selectedSupplier, startDate, endDate]);

  const renderSkeleton = () => (
    <div className="grid gap-0 my-4">
      {Array.from(new Array(5)).map((_, index) => (
        <div key={index} className="col">
          <div className="card mb-0" style={{ backgroundColor: "#EBECEE" }}>
            <div className="flex justify-content-between mb-1">
              <div
                className="flex align-items-center justify-content-center border-round"
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Skeleton variant="circular" width={40} height={40} />
              </div>
            </div>
            <Skeleton variant="text" width="80%" height={30} />
            <div style={{ display: "flex" }}>
              <div style={{ flexDirection: "row" }}>
                <Skeleton variant="text" width={40} height={30} />
                <Skeleton variant="text" width={60} height={20} />
              </div>
              <div
                style={{
                  border: "1px solid #cddd",
                  marginLeft: "1.5rem",
                  marginRight: "1.5rem",
                }}
              ></div>
              <div style={{ flexDirection: "row" }}>
                <Skeleton variant="text" width={40} height={30} />
                <Skeleton variant="text" width={60} height={20} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const isSingleMonth = (startDate, endDate) => {
    return (
      dayjs(startDate).month() === dayjs(endDate).month() &&
      dayjs(startDate).year() === dayjs(endDate).year()
    );
  };

  const showTodayAndThisMonth =
    startDate && endDate && isSingleMonth(startDate, endDate);

  if (loading) {
    return renderSkeleton();
  }

  return (
    <div className="grid gap-0 my-4">
      {cardDetails.map((item) => {
        const styles = cardStyles[item.code];
        if (!styles) {
          return <div key={item.id}>Invalid data</div>;
        }

        return (
          <div key={item.id} className="col">
            <div
              className="card mb-0"
              style={{ backgroundColor: styles.backgroundColor }}
            >
              <div className="flex justify-content-between mb-1">
                <div
                  className="flex align-items-center justify-content-center border-round"
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    backgroundColor: styles.iconBgColor,
                  }}
                >
                  <img src={styles.icon} alt={item.code} />
                </div>
                {error && (
                  <Tooltip title="Refresh">
                    <IconButton onClick={fetchCardDetails}>
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
              <div>
                <span className="block text-700 my-3">{item.title}</span>
              </div>
              <div style={{ display: "flex" }}>
                {item.code === "Source" ? (
                  <>
                    <CustomTooltip
                      title={
                        <SourceSystemTodayTooltip
                          data={item?.todayDetails || {}}
                        />
                      }
                    >
                      <div style={{ flexDirection: "row" }}>
                        <div
                          className="text-900 text-xl"
                          style={{ fontWeight: "bold" }}
                        >
                          {item.today.toString().padStart(2, "0")}
                        </div>
                        {showTodayAndThisMonth && (
                          <span className="text-700">Today</span>
                        )}
                      </div>
                    </CustomTooltip>
                    <div
                      style={{
                        border: "1px solid #cddd",
                        marginLeft: "1.5rem",
                        marginRight: "1.5rem",
                      }}
                    ></div>
                    <CustomTooltip
                      title={
                        <SourceSystemThisMonthTooltip
                          data={item?.thisMonthDetails || {}}
                        />
                      }
                    >
                      <div style={{ flexDirection: "row" }}>
                        <div
                          className="text-900 text-xl"
                          style={{ fontWeight: "bold" }}
                        >
                          {item.thismonth.toString().padStart(2, "0")}
                        </div>
                        {showTodayAndThisMonth && (
                          <span className="text-700">This month</span>
                        )}
                      </div>
                    </CustomTooltip>
                  </>
                ) : (
                  <>
                    <div style={{ flexDirection: "row" }}>
                      <div
                        className="text-900 text-xl"
                        style={{ fontWeight: "bold" }}
                      >
                        {item.today.toString().padStart(2, "0")}
                      </div>
                      {showTodayAndThisMonth && (
                        <span className="text-700">Today</span>
                      )}
                    </div>
                    <div
                      style={{
                        border: "1px solid #cddd",
                        marginLeft: "1.5rem",
                        marginRight: "1.5rem",
                      }}
                    ></div>
                    <div style={{ flexDirection: "row" }}>
                      <div
                        className="text-900 text-xl"
                        style={{ fontWeight: "bold" }}
                      >
                        {item.thismonth.toString().padStart(2, "0")}
                      </div>
                      {showTodayAndThisMonth && (
                        <span className="text-700">This month</span>
                      )}
                    </div>
                  </>
                )}
              </div>
              {error && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <Chip
                    label="Failed to load data"
                    style={{ backgroundColor: "rgb(255, 194, 209)" }}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardCard;
