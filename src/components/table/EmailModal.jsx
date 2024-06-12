import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography, Chip } from "@mui/material";
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";

const EmailChip = styled(Chip)({
    borderRadius: '20px',
    height: '32px',
    fontSize: '14px',
    '& .MuiChip-label': {
        paddingLeft: '12px',
        paddingRight: '12px',
    },
    '& .MuiChip-deleteIcon': {
        color: 'gray',
    },
});

const EmailModal = ({ open, handleClose, handleSend }) => {
    const [emailData, setEmailData] = useState({
        to: [],
        cc: [],
        subject: "",
        body: "",
    });

    const [errors, setErrors] = useState({});
    const [currentTo, setCurrentTo] = useState("");
    const [currentCc, setCurrentCc] = useState("");

    const handleAddEmail = (type) => (event) => {
        if (event.key === "Enter" || event.key === " " || event.key === "," || event.key === "Tab") {
            event.preventDefault();
            addEmail(type, event.target.value.trim());
        }
    };

    const handleBlur = (type) => () => {
        addEmail(type, type === "to" ? currentTo : currentCc);
    };

    const addEmail = (type, email) => {
        if (email) {
            if (validateEmail(email)) {
                setEmailData((prevData) => ({
                    ...prevData,
                    [type]: [...prevData[type], email],
                }));
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [type]: "",
                }));
                if (type === "to") {
                    setCurrentTo("");
                } else {
                    setCurrentCc("");
                }
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [type]: "Invalid email address",
                }));
            }
        }
    };

    const handleDeleteEmail = (type, index) => () => {
        setEmailData((prevData) => ({
            ...prevData,
            [type]: prevData[type].filter((_, i) => i !== index),
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "currentTo") {
            setCurrentTo(value);
            if (value && !validateEmail(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    to: "Invalid email address",
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    to: "",
                }));
            }
        } else if (name === "currentCc") {
            setCurrentCc(value);
            if (value && !validateEmail(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    cc: "Invalid email address",
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    cc: "",
                }));
            }
        } else {
            setEmailData((prevData) => ({ ...prevData, [name]: value }));
            setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validate = () => {
        const newErrors = {};

        if (!emailData.to.length) {
            newErrors.to = "To field is required";
        }

        if (!emailData.subject) {
            newErrors.subject = "Subject is required";
        } else if (emailData.subject.length > 255) {
            newErrors.subject = "Subject cannot exceed 255 characters";
        }

        if (!emailData.body) {
            newErrors.body = "Body is required";
        } else if (emailData.body.length > 5000) {
            newErrors.body = "Body cannot exceed 5000 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSendEmail = () => {
        if (validate()) {
            handleSend(emailData);
            handleCloseModal();
        }
    };

    const handleCloseModal = () => {
        setEmailData({
            to: [],
            cc: [],
            subject: "",
            body: "",
        });
        setCurrentTo("");
        setCurrentCc("");
        setErrors({});
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
            BackdropProps={{ onClick: (e) => e.stopPropagation() }}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <Typography variant="h6" component="h2" id="modal-title">
                    Send Email
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                    {emailData.to.map((email, index) => (
                        <EmailChip
                            key={index}
                            label={email}
                            onDelete={handleDeleteEmail("to", index)}
                            deleteIcon={<CloseIcon />}
                        />
                    ))}
                    <TextField
                        label="To"
                        name="currentTo"
                        fullWidth
                        margin="normal"
                        value={currentTo}
                        onChange={handleChange}
                        onKeyDown={handleAddEmail("to")}
                        onBlur={handleBlur("to")}
                        error={!!errors.to}
                        helperText={errors.to}
                        sx={{ flexGrow: 1, minWidth: 120 }}
                        FormHelperTextProps={{ style: { textAlign: 'left', marginLeft: 0 } }}
                    />
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                    {emailData.cc.map((email, index) => (
                        <EmailChip
                            key={index}
                            label={email}
                            onDelete={handleDeleteEmail("cc", index)}
                            deleteIcon={<CloseIcon />}
                        />
                    ))}
                    <TextField
                        label="CC"
                        name="currentCc"
                        fullWidth
                        margin="normal"
                        value={currentCc}
                        onChange={handleChange}
                        onKeyDown={handleAddEmail("cc")}
                        onBlur={handleBlur("cc")}
                        error={!!errors.cc}
                        helperText={errors.cc}
                        sx={{ flexGrow: 1, minWidth: 120 }}
                        FormHelperTextProps={{ style: { textAlign: 'left', marginLeft: 0 } }}
                    />
                </Box>
                <TextField
                    label="Subject"
                    name="subject"
                    fullWidth
                    margin="normal"
                    value={emailData.subject}
                    onChange={handleChange}
                    error={!!errors.subject}
                    helperText={errors.subject}
                    FormHelperTextProps={{ style: { textAlign: 'left', marginLeft: 0 } }}
                />
                <TextField
                    label="Body"
                    name="body"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    value={emailData.body}
                    onChange={handleChange}
                    error={!!errors.body}
                    helperText={errors.body}
                    FormHelperTextProps={{ style: { textAlign: 'left', marginLeft: 0 } }}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                    <Button onClick={handleCloseModal} variant="outlined" sx={{ mr: 2, borderRadius: '2rem', minWidth: '7rem', height: '45px' }} startIcon={<CancelIcon />}>
                        Cancel
                    </Button>
                    <Button onClick={handleSendEmail} variant="contained" color="primary" sx={{ borderRadius: '2rem', minWidth: '7rem', height: '45px' }} startIcon={<SendIcon />}>
                        Send
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EmailModal;
