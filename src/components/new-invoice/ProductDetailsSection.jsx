import React from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

const ProductDetailsSection = ({
  isExpanded,
  toggleExpand,
  rows,
  columns,
  data,
  addRow,
  removeLastRow,
  handleInputChange,
  handleDropdownSelectClassificationChange,
  handleDropdownSelectTaxTypeChange,
  taxTypeOptions,
  classificationOptions,
}) => {
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
                          <Dropdown
                            value={row[col.field]}
                            options={classificationOptions}
                            onChange={(e) =>
                              handleDropdownSelectClassificationChange(
                                e,
                                col.field,
                                rowIndex
                              )
                            }
                            placeholder="Select"
                            style={{ width: "100%" }}
                          />
                        ) : col.field === "taxType" ? (
                          <Dropdown
                            value={row[col.field]}
                            options={taxTypeOptions}
                            onChange={(e) =>
                              handleDropdownSelectTaxTypeChange(
                                e,
                                col.field,
                                rowIndex
                              )
                            }
                            placeholder="Select"
                            style={{ width: "100%" }}
                          />
                        ) : (
                          <InputText
                            type="text"
                            placeholder="Enter"
                            style={{ width: "100%" }}
                            value={row[col.field]}
                            onChange={(e) =>
                              handleInputChange(e, col.field, rowIndex)
                            }
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="button-group">
              <Button
                label="Add Invoice Line"
                icon="pi pi-plus"
                className="p-button-text p-button-primary"
                style={{ color: "#168aad" }}
                onClick={addRow}
              />
              {rows?.length > 1 && (
                <Button
                  label="Remove Invoice Line"
                  icon="pi pi-minus"
                  className="p-button-text p-button-danger"
                  onClick={removeLastRow}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsSection;
