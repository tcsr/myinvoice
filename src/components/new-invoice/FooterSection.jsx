import React from "react";
import { Button } from "primereact/button";

const FooterSection = ({ handleClearAll, handleDelete, handleSave }) => {
    return (
        <div
            style={{
                display: "flex",
                borderTopColor: "#E0E0E0",
                borderTopWidth: 1,
                borderTopStyle: "solid",
                marginTop: 10,
                marginBottom: 20,
                backgroundColor: "white",
            }}
        >
            <div
                style={{ flex: 5, justifyContent: "center", alignItems: "center" }}
            >
                <p
                    style={{ color: "#1E6091", fontSize: 14, cursor: "pointer" }}
                    onClick={handleClearAll}
                >
                    Clear All
                </p>
            </div>
            <div
                style={{ flex: 5, justifyContent: "center", alignItems: "center" }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}
                >
                    <p
                        style={{
                            color: "#1E6091",
                            fontSize: 14,
                            cursor: "pointer",
                            marginRight: "0.5rem",
                        }}
                        onClick={handleDelete}
                    >
                        Cancel
                    </p>
                    <Button
                        label="Save"
                        rounded
                        severity="primary"
                        style={{ margin: "0.5rem", backgroundColor: "#1E6091" }}
                        onClick={handleSave}
                    />
                </div>
            </div>
        </div>
    );
};

export default FooterSection;