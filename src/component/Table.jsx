import React from "react";

const Table = ({ columns = [], data = [], renderActions,renderRow, standardId }) => {

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse rounded-lg shadow-sm bg-white">
        <thead>
          <tr className="bg-gray-200">
            {columns.map((col, index) => (
              <th key={index} className="p-3 border text-center text-gray-700">
                {typeof col === "object" ? col.header : col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={`${standardId}-${item.id || index}`} // Use standardId combined with item.id or index for unique key
                className="even:bg-gray-100 hover:bg-blue-50 transition cursor-pointer"
                onClick={item.onClick || null}
              >
                {/* Render dynamic cell values */}
                
                {(item.values || Object.values(item)).map((value, i) => (
                  <td key={i} className="p-3 border text-center">
                    {value}
                  </td>
                ))}
                {/* Render actions if needed */}
                {renderActions && (
                  <td className="p-3 border text-center">
                    {renderActions(item, standardId)} {/* Pass standardId with renderActions */}
                  </td>

                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (renderActions? 1 : 0)}
                className="p-3 text-center text-gray-500"
              >
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


export default Table;

