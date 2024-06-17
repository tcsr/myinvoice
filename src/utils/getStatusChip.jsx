import { Chip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { green, red, grey, orange } from "@mui/material/colors";

const getStatusChip = (status) => {
  const chipStyle = {
    height: "28px",
    padding: "0 8px",
    fontSize: "14px",
    fontWeight: "600",
    borderRadius: "16px",
  };

  switch (status) {
    case "Success":
      return (
        <Chip
          icon={
            <CheckCircleOutlineIcon style={{ color: green[600], fontSize: "18px" }} />
          }
          label="Success"
          style={{
            backgroundColor: green[50],
            color: green[600],
            ...chipStyle,
          }}
        />
      );
    case "Error":
      return (
        <Chip
          icon={<ErrorOutlineIcon style={{ color: red[600], fontSize: "18px" }} />}
          label="Error"
          style={{
            backgroundColor: red[50],
            color: red[600],
            ...chipStyle,
          }}
        />
      );
    case "Rejected":
      return (
        <Chip
          icon={<NotInterestedOutlinedIcon style={{ color: grey[600], fontSize: "18px" }} />}
          label="Rejected"
          style={{
            backgroundColor: grey[200],
            color: grey[600],
            ...chipStyle,
          }}
        />
      );
    case "In Queue":
      return (
        <Chip
          icon={
            <ListAltOutlinedIcon style={{ color: grey[600], fontSize: "18px" }} />
          }
          label="In Queue"
          style={{
            backgroundColor: grey[100],
            color: grey[600],
            ...chipStyle,
          }}
        />
      );
    case "In Progress":
      return (
        <Chip
          icon={<AccessTimeIcon style={{ color: orange[600], fontSize: "18px" }} />}
          label="In Progress"
          style={{
            backgroundColor: orange[50],
            color: orange[600],
            ...chipStyle,
          }}
        />
      );
    default:
      return (
        <Chip
          label="Unknown"
          style={{
            backgroundColor: grey[500],
            color: "white",
            ...chipStyle,
          }}
        />
      );
  }
};

export default getStatusChip;
