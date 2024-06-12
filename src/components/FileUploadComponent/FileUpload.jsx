import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import filedoc from "../../assets/tray-arrow-up.svg";
const FileUpload = ({ onFileUpload }) => {
  const [files, setFiles] = useState([]);
  const [uploadComplete, setUploadComplete] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (uploadComplete) {
        const replace = window.confirm(
          "A file is already uploaded. Do you want to replace it?"
        );
        if (!replace) {
          return;
        }
      }

      //   setFiles(
      //     acceptedFiles.map((file) =>
      //       Object.assign(file, {
      //         preview: URL.createObjectURL(file),
      //       })
      //     )
      //   );
      //   setUploadComplete(true);
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(newFiles);
      setUploadComplete(true);

      // Pass the file data to the parent component
      if (onFileUpload) {
        onFileUpload(newFiles);
      }
    },
    [uploadComplete, onFileUpload]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true, // Disable automatic click behavior
    noKeyboard: true, // Disable keyboard behavior
  });

  return (
    <div style={{ flex: 1 }} onClick={open}>
      {!uploadComplete ? (
        <div {...getRootProps({ className: "dropzone" })} style={dropzoneStyle}>
          <input {...getInputProps()} />
          <img src={filedoc}></img>

          <p className="text-center-large">Drag & Drop or Browse</p>
          <p className="text-center-small">Works best with PDF, JPG, PNG</p>
          <p className="text-center-small">Max 100MB per file.</p>
        </div>
      ) : (
        <div>
          {files.map((file) => (
            <div
              key={file.name}
              style={fileContainerStyle}
              {...getRootProps({ className: "dropzone" })}
            >
              <input {...getInputProps()} />
              {file.type.startsWith("image/") ? (
                <img src={file.preview} alt={file.name} style={fileStyle} />
              ) : (
                <iframe
                  src={file.preview}
                  title={file.name}
                  style={fileStyle}
                ></iframe>
              )}
              {/* <p>{file.name}</p> */}
              {/* <button type="button" onClick={open}>
                Replace Document
              </button> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const dropzoneStyle = {
  borderRadius: "5px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const fileContainerStyle = {
  textAlign: "center",
  padding: "30px",
};

const fileStyle = {
  width: "100%",
  height: "100%",
  // maxWidth: "100%",
  borderRadius: "5px",
};

export default FileUpload;
