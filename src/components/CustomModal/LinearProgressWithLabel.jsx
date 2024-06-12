import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

const LinearProgressWithLabel = ({ value }) => {
  return (
    <Box display="flex" alignItems="center" width="100%">
      <Box width="100%" mr={1}>
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{
            height: 5,
            borderRadius: 5,
            "& .MuiLinearProgress-bar": {
              borderRadius: 5,
              background: "linear-gradient(90deg, #168AAD 0%, #52B69A 100%)",
            },
          }}
        />
      </Box>
      {/* <Box minWidth={35}>
        <Typography
          variant="body2"
          color="textSecondary"
        >{`${value}%`}</Typography>
      </Box> */}
    </Box>
  );
};

export default LinearProgressWithLabel;
