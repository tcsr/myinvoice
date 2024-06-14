import React from "react";
import FileUpload from "../FileUploadComponent/FileUpload";

const FileUploadSection = ({ handleFileUpload }) => {
    return (
        <div className="flex-item">
            <p className="upload-invoice-title">Upload Invoice</p>
            <div className="border-dashed">
                <FileUpload onFileUpload={handleFileUpload} />
            </div>
            <p className="instruction-title">Instructions</p>
            <p className="instruction-text">1. Ensure the invoice is clear and well-lit.</p>
            <p className="instruction-text">2. Wait for the OCR process to complete and review the extracted text for accuracy.</p>
            <p className="instruction-text">3. Confirm and save the extracted data. If needed, edit any inaccuracies manually.</p>
            <p className="instruction-text">4. Ensure the invoice is in a supported file format and free from any obstructions or shadows.</p>
        </div>
    );
};

export default FileUploadSection;