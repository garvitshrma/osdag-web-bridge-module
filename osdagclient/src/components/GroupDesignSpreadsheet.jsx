import React from "react";

const Spreadsheet = ({ sheetData, setSheetData }) => {
  const updateField = (field, value) => {
    setSheetData((prev) => ({
      ...prev,
      [field]: value === "" ? "" : Number(value),
    }));
  };

  return (
    <div className="p-4 bg-white rounded shadow w-96">
      <table className="w-full border border-gray-300">
        <tbody>
          {/* Wind Speed */}
          <tr className="border">
            <td className="border px-2 py-1">Wind Speed (m/s)</td>
            <td className="border px-2 py-1">
              <input
                type="number"
                value={sheetData.wind}
                onChange={(e) => updateField("wind", e.target.value)}
                className="w-full outline-none"
              />
            </td>
          </tr>

          {/* Seismic Zone */}
          <tr className="border">
            <td className="border px-2 py-1">Seismic Zone</td>
            <td className="border px-2 py-1">
              <input
                type="text"
                value={sheetData.seismic}
                onChange={(e) =>
                  setSheetData((prev) => ({
                    ...prev,
                    seismic: e.target.value,
                  }))
                }
                className="w-full outline-none"
              />
            </td>
          </tr>

          {/* Max Temp */}
          <tr className="border">
            <td className="border px-2 py-1">Max Temp</td>
            <td className="border px-2 py-1">
              <input
                type="number"
                value={sheetData.maxTemp}
                onChange={(e) => updateField("maxTemp", e.target.value)}
                className="w-full outline-none"
              />
            </td>
          </tr>

          {/* Min Temp */}
          <tr className="border">
            <td className="border px-2 py-1">Min Temp</td>
            <td className="border px-2 py-1">
              <input
                type="number"
                value={sheetData.minTemp}
                onChange={(e) => updateField("minTemp", e.target.value)}
                className="w-full outline-none"
              />
            </td>
          </tr>

          {/* Zone Factor */}
          <tr className="border">
            <td className="border px-2 py-1">Zone Factor</td>
            <td className="border px-2 py-1">
              <input
                type="number"
                value={sheetData.factor}
                onChange={(e) => updateField("factor", e.target.value)}
                className="w-full outline-none"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Spreadsheet;