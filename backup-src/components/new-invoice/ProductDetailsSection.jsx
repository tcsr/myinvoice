import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

const ProductDetailsSection = ({
    isExpanded,
    toggleExpand,
    rows,
    columns,
    addRow,
    removeLastRow,
    handleInputChange,
    taxTypeOptions,
    classificationOptions,
}) => {
    const { control, formState: { errors }, setValue } = useFormContext();

    return (
        <div>
            <div className="accordion-container" onClick={toggleExpand}>
                <p className="accordion-title-text">Product Details</p>
                <i
                    className={
                        isExpanded
                            ? "pi pi-chevron-down p-button-text transparent-icon expanded"
                            : "pi pi-chevron-up p-button-text transparent-icon collapsed"
                    }
                />
            </div>
            {isExpanded && (
                <div className="expanded-container">
                    <div style={{ marginTop: 20 }}>
                        <table className="product-details-table">
                            <thead>
                                <tr>
                                    {columns.map((col) => (
                                        <th key={col.field} style={col.style}>
                                            {col.header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {columns.map((col) => (
                                            <td key={col.field}>
                                                {col.field === "classification" ? (
                                                    <Controller
                                                        name={`productDetailsItems[${rowIndex}].${col.field}`}
                                                        control={control}
                                                        rules={{ required: "Classification is required" }}
                                                        render={({ field }) => (
                                                            <Dropdown
                                                                {...field}
                                                                value={field.value || ""}
                                                                options={classificationOptions}
                                                                onChange={(e) => {
                                                                    field.onChange(e.value);
                                                                    setValue(`productDetailsItems[${rowIndex}].${col.field}`, e.value);
                                                                }}
                                                                placeholder="Select"
                                                                style={{ width: "100%" }}
                                                                className={errors.productDetailsItems?.[rowIndex]?.[col.field] ? "p-invalid" : ""}
                                                            />
                                                        )}
                                                    />
                                                ) : col.field === "taxType" ? (
                                                    <Controller
                                                        name={`productDetailsItems[${rowIndex}].${col.field}`}
                                                        control={control}
                                                        rules={{ required: "Tax Type is required" }}
                                                        render={({ field }) => (
                                                            <Dropdown
                                                                {...field}
                                                                value={field.value || ""}
                                                                options={taxTypeOptions}
                                                                onChange={(e) => {
                                                                    field.onChange(e.value);
                                                                    setValue(`productDetailsItems[${rowIndex}].${col.field}`, e.value);
                                                                }}
                                                                placeholder="Select"
                                                                style={{ width: "100%" }}
                                                                className={errors.productDetailsItems?.[rowIndex]?.[col.field] ? "p-invalid" : ""}
                                                            />
                                                        )}
                                                    />
                                                ) : (
                                                    <Controller
                                                        name={`productDetailsItems[${rowIndex}].${col.field}`}
                                                        control={control}
                                                        rules={{ required: `${col.header} is required` }}
                                                        render={({ field }) => (
                                                            <InputText
                                                                {...field}
                                                                type="text"
                                                                placeholder="Enter"
                                                                style={{ width: "100%" }}
                                                                value={field.value || ""}
                                                                onChange={(e) => {
                                                                    field.onChange(e.target.value);
                                                                    handleInputChange(e, col.field, rowIndex);
                                                                    setValue(`productDetailsItems[${rowIndex}].${col.field}`, e.target.value);
                                                                }}
                                                                className={errors.productDetailsItems?.[rowIndex]?.[col.field] ? "p-invalid" : ""}
                                                            />
                                                        )}
                                                    />
                                                )}
                                                {errors.productDetailsItems?.[rowIndex]?.[col.field] && (
                                                    <small style={{ textAlign: "left" }} className="p-error">
                                                        {errors.productDetailsItems[rowIndex][col.field].message}
                                                    </small>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="button-group">
                            <Button
                                label="Add Row"
                                icon="pi pi-plus"
                                className="p-button-text p-button-success"
                                onClick={addRow}
                            />
                            <Button
                                label="Remove Row"
                                icon="pi pi-minus"
                                className="p-button-text p-button-danger"
                                onClick={removeLastRow}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailsSection;
