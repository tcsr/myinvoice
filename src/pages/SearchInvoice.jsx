import { useState, useEffect } from "react";
import search_icon from "../assets/search_icon.svg";
import { Box, Typography } from "@mui/material";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

const SearchInvoice = () => {
  const [selectedSearchType, setSelectedSearchType] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const searchTypes = [
    { id: 1, name: "Search by IRBM", code: "irbm" },
    { id: 2, name: "Search by Invoice", code: "ivoice" },
  ];

  useEffect(() => {
    setSelectedSearchType(searchTypes[0]);
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <div>
          <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
            <Typography variant="h6" sx={{ mr: 2, fontWeight: "600" }}>
              Search Invoice
            </Typography>
          </Box>
        </div>
        <div style={{ display: "flex" }}>
          <Dropdown
            value={selectedSearchType}
            onChange={(e) => setSelectedSearchType(e.value)}
            options={searchTypes}
            optionLabel="name"
            placeholder="Select Search Type"
            className="w-full"
            style={{ marginRight: "2rem" }}
          />
          <span className="p-input-icon-right">
            <i className="pi pi-search" />
            <InputText
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Enter IRBN to search e-invoice..."
              style={{ width: "100%", minWidth: "30rem" }}
            />
          </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div
          style={{
            height: "100vh",
            background: "white",
            marginTop: "10rem",
            marginBottom: "5rem",
          }}
        >
          <img src={search_icon} />
          <Box>
            <Typography variant="h6" sx={{ mr: 2, fontWeight: "600" }}>
              Search IRBM
            </Typography>
          </Box>
          <Box></Box>
        </div>
      </div>
    </>
  );
};

export default SearchInvoice;
