import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import DeleteIcon from "../../assets/delete-invoice.svg";
import DeleteSuccessIcon from "../../assets/delete-sucess.svg";
import LinearProgressWithLabel from "./LinearProgressWithLabel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: "none",
  p: 3,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 2,
};

const CustomModal = ({ open, handleClose, handleConfirm, selectedCount, deletionComplete, error, handleCompleteAction }) => {
  const [deleting, setDeleting] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressInterval;

    if (open) {
      setDeleting(true);
      setProgress(0);

      // Simulate progress
      progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(progressInterval);
            return prevProgress;
          } else {
            return prevProgress + 10; // Increment by 10 for smoother progress simulation
          }
        });
      }, 200); // Interval for progress simulation
    }

    return () => {
      clearInterval(progressInterval);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setDeleting(true);
    }
  }, [open]);

  useEffect(() => {
    if (deleting && progress >= 100) {
      // handleConfirm().then(() => {
        setDeleting(false);
      // });
    }
  }, [deleting, progress, handleConfirm]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {deleting ? (
          <>
            <Box mt={2} mb={2} display="flex" justifyContent="center">
              <img
                src={DeleteIcon}
                alt="Delete"
                style={{ width: 80, height: 80 }}
              />
            </Box>
            <Typography
              sx={{
                mt: 1,
                mb: 2,
                textAlign: "center",
                color: "#2E2D2C",
                fontSize: 20,
                fontWeight: "400",
              }}
            >
              Please wait...
            </Typography>
            <Box sx={{ width: "100%", mt: 2 }}>
              <LinearProgressWithLabel value={progress} />
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Typography
                id="modal-modal-description"
                sx={{
                  mt: 2,
                  textAlign: "center",
                  color: "#2E2D2C",
                  fontSize: 14,
                  fontWeight: "400",
                }}
              >
                Deleting invoice..
              </Typography>
              <Typography
                sx={{
                  color: "#2E2D2C",
                  fontSize: 14,
                  fontWeight: "400",
                }}
              >
                {progress}%
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <Box mt={2} mb={2} display="flex" justifyContent="center">
              <img
                src={DeleteSuccessIcon}
                alt="Success"
                style={{ width: 80, height: 80 }}
              />
            </Box>
            <Typography
              id="modal-modal-title"
              sx={{
                mt: 0,
                textAlign: "center",
                color: "#2E2D2C",
                fontSize: 20,
                fontWeight: "400",
              }}
            >
              Deleted Successfully
            </Typography>
            <Button
              onClick={() => handleCompleteAction('close')}
              sx={{ mt: 2, color: "#1E6091", fontSize: "14px" }}
            >
              Ok
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default CustomModal;
