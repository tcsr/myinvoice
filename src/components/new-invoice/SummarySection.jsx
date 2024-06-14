import React from "react";

const SummarySection = ({ summary }) => {
  return (
    <div className="summary-section equal-width">
      <p className="section-title">Summary</p>
      <div className="summary-item">
        <span className="summary-label">Subtotal:</span>
        <span className="summary-value">${summary.subtotal.toFixed(2)}</span>
      </div>
      <div className="summary-item">
        <span className="summary-label">Amount Exempted from Tax:</span>
        <span className="summary-value">${summary.amountExemptedFromTax.toFixed(2)}</span>
      </div>
      <div className="summary-item">
        <span className="summary-label">Total Excluding Tax:</span>
        <span className="summary-value">${summary.totalExcludingTax.toFixed(2)}</span>
      </div>
      <div className="summary-item">
        <span className="summary-label">Total Including Tax:</span>
        <span className="summary-value">${summary.totalIncludingTax.toFixed(2)}</span>
      </div>
      <div className="summary-item">
        <span className="summary-label">Discount:</span>
        <span className="summary-value">-${summary.totalDiscount.toFixed(2)}</span>
      </div>
      <div className="summary-item">
        <span className="summary-label">Net Total:</span>
        <span className="summary-value">${summary.netTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default SummarySection;
