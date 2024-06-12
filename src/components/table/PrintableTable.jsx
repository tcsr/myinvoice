import React from 'react';

const PrintableTable = ({ rows, columns }) => {
  return (
    <div style={styles.container}>
      {/* <h1 style={styles.heading}>Selected Invoices</h1> */}
      <table style={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessorKey || col.id} style={styles.th}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
              {columns.map((col) => (
                <td key={col.accessorKey || col.id} style={styles.td}>
                  {row.original[col.accessorKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '10px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
    fontSize: '0.8em',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    textAlign: 'left',
    whiteSpace: 'normal', // Enable word wrapping for headers
    wordWrap: 'break-word',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    whiteSpace: 'normal', // Enable word wrapping for cells
    wordWrap: 'break-word',
  },
  evenRow: {
    backgroundColor: '#f9f9f9',
  },
  oddRow: {
    backgroundColor: '#fff',
  },
};

export default PrintableTable;
