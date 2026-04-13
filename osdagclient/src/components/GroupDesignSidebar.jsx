import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Spreadsheet from "./GroupDesignSpreadsheet.jsx";
import locationData from "../data/locationDatabase.json";

const GroupDesignSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [showPopup, setShowPopup] = useState(false);
  const [activeMode, setActiveMode] = useState("false");
  const [showPopup2, setShowPopup2] = useState(false);

  const [span, setSpan] = useState("");
  const [width, setwidth] = useState("");
  const [angle, setangle] = useState("");

  const [girderSpacing, setGirderSpacing] = useState("");
  const [deckOverhang, setDeckOverhang] = useState("");

  const overallWidth = width ? Number(width) + 5 : 0;

  const [intValue, setIntValue] = useState("");
  const [selected, setSelected] = useState("");

  const isOtherSelected = selected === "option3";

  const [dropdown1, setState] = useState("");
  const [dropdown2, setDistrict] = useState("");

  const selectedData =
    dropdown1 && dropdown2 ? locationData[dropdown1][dropdown2] : null;

  let windSpeed = selectedData?.windSpeed || 0;
  let zone = selectedData?.zone || "";
  let factor = selectedData?.factor || 0;
  let minTemp = selectedData?.minTemp || 0;
  let maxTemp = selectedData?.maxTemp || 0;

  const [sheetData, setSheetData] = useState({
    width: 0,
    girderSpacing: 0,
    numGirders: 0,
    deckOverhang: 0,
  });

  return (
    <div
      className={` ${sidebarOpen ? "flex" : "hidden md:flex"} w-full md:w-[400px] flex-none border-r-0 border-[#94AB38] p-4 bg-white flex flex-col flex-1 sidebar-scroll overflow-y-auto p-4 scroll-smooth`}
    >
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("basic")}
          className={`flex-1 py-2 rounded text-black border-2 border-black ${
            activeTab === "basic"
              ? "bg-[#94AB38]"
              : "bg-white hover:bg-green-100"
          }`}
        >
          Basic Inputs
        </button>

        <button
          onClick={() => setActiveTab("additional")}
          className={`flex-1 py-2 rounded text-black border-2 border-black ${
            activeTab === "additional"
              ? "bg-[#94AB38]"
              : "bg-white hover:bg-green-100"
          }`}
        >
          Additional Inputs
        </button>
      </div>

      {activeTab === "basic" && (
        <div>
          <div>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="mt-8 w-[90%] border-2 border-black rounded py-2 px-3 text-black bg-white focus:outline-none focus:ring-2 "
            >
              <option value="option1">Type of Structure</option>
              <option value="option2">Highway</option>
              <option value="option3">Other</option>
            </select>

            {selected === "option3" && (
              <p className="text-red-400">
                Other structures not included. Note: All remaining inputs
                disabled.
              </p>
            )}
          </div>
          <button
            onClick={() => setShowPopup(true)}
            className="mt-4 p-3 w-[90%] border-2 border-black bg-yellow-400 text-lg hover:bg-yellow-500"
          >
            Project Location
          </button>

          <div className="mt-4 border-2 border-black rounded h-78 w-[]">
            <div className="flex justify-between mb-4">
              <p className="mt-2 ml-1 text-xl mb-2 underline">
                Geometric Details
              </p>
              <button
                onClick={() => setShowPopup2(true)}
                className="bg-yellow-400 mt-1 mr-1 border-2 border-black p-2 hover:bg-yellow-500"
              >
                Modify Additional Geomerty
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-base font-medium ml-2">Span (m):</span>

              <input
                type="number"
                value={span}
                disabled={selected === "option3"}
                onChange={(e) => {
                  const val = e.target.value;
                  setSpan(val === "" ? "" : Number(val));
                }}
                className="border rounded px-2 py-1 text-sm mr-3 w-[45%] disabled:cursor-not-allowed"
              />
            </div>

            <div className="mb-4 ml-4">
              {(Number(span) > 45 || Number(span) < 20) && (
                <p className="text-red-500">Outside the software range.</p>
              )}
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-base font-medium ml-2">
                Carriageway Width (m):
              </span>
              <input
                type="number"
                value={width}
                disabled={selected === "option3"}
                onChange={(e) => {
                  const val = e.target.value;
                  setwidth(val === "" ? "" : Number(val));
                }}
                className="border rounded px-2 py-1 text-sm mr-3 w-[45%] disabled:cursor-not-allowed"
              />
            </div>

            <div className="mb-4 ml-4">
              {(Number(width) >= 24 || Number(width) < 4.25) && (
                <p className="text-red-500">Must be ≥ 4.25 m and &lt; 24 m</p>
              )}
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-base font-medium ml-2">Footpath</span>
              <select className="border rounded px-2 py-1 text-sm mr-3 w-[45%] cursor-pointer ">
                <option>single-sided</option>
                <option>both</option>
                <option>none</option>
              </select>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-base font-medium ml-2">
                Skew Angle (degrees):
              </span>
              <input
                type="number"
                value={angle}
                disabled={selected === "option3"}
                max={100}
                onChange={(e) => {
                  const val = e.target.value;
                  setangle(val === "" ? "" : Number(val));
                }}
                className="border rounded px-2 py-1 text-sm mr-3 w-[45%] disabled:cursor-not-allowed"
              />
            </div>

            <div className="mb-4 ml-4">
              {(Number(angle) > 15 || Number(angle) < -15) && (
                <p className="text-red-500">
                  IRC 24 (2010) requires detailed analysis
                </p>
              )}
            </div>
          </div>

          <div className="mt-3 border-2 border-black rounded h-48 w-[]">
            <p className="mt-2 ml-1 text-xl mb-2 underline">Material Inputs</p>

            <div className="flex items-center justify-between mb-4">
              <span className="text-base font-medium ml-2">Girder</span>
              <select className="border rounded px-2 py-1 text-sm mr-3 w-[45%] cursor-pointer">
                <option>E250</option>
                <option>E350</option>
                <option>E450</option>
              </select>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-base font-medium ml-2">Cross Bracing</span>
              <select className="border rounded px-2 py-1 text-sm mr-3 w-[45%] cursor-pointer">
                <option>E250</option>
                <option>E350</option>
                <option>E450</option>
              </select>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-base font-medium ml-2">Deck</span>
              <select className="border rounded px-2 py-1 text-sm mr-3 w-[45%] cursor-pointer">
                <option>M25</option>
                <option>M30</option>
                <option>M35</option>
                <option>M40</option>
                <option>M45</option>
                <option>M50</option>
                <option>M55</option>
                <option>M60</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-102 border-4 border-yellow-400">
            <h1 className="text-2xl font-bold mb-4">Project Location</h1>

            <div className="flex items-center gap-4 mb-8">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={activeMode === "locationName"}
                  onChange={() =>
                    setActiveMode(
                      activeMode === "locationName" ? "" : "locationName",
                    )
                  }
                />
                Enter Location Name
              </label>

              {activeMode === "locationName" && (
                <div>
                  <select
                    className="border border-gray-300 rounded px-2 py-1 mr-4"
                    value={dropdown1}
                    onChange={(e) => {
                      setState(e.target.value);
                      setDistrict("");
                    }}
                  >
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Gujrat">Gujrat</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="">Select State</option>

                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>

                  <select
                    className="border border-gray-300 rounded px-2 py-1"
                    value={dropdown2}
                    onChange={(e) => setDistrict(e.target.value)}
                  >
                    <option value="">Select District</option>

                    {dropdown1 &&
                      Object.keys(locationData?.[dropdown1] || {}).map(
                        (district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ),
                      )}
                  </select>

                  <div className="pt-8">
                    <ul>
                      <li>
                        Basic Wind Speed (m/s):{" "}
                        <span className="text-green-500">{windSpeed}</span>
                      </li>
                      <li>
                        Seismic Zone:{" "}
                        <span className="text-green-500">{zone}</span>
                      </li>
                      <li>
                        Zone Factor:{" "}
                        <span className="text-green-500">{factor}</span>
                      </li>
                      <li>
                        Min Shade Air Temperature:{" "}
                        <span className="text-green-500">{minTemp}</span>
                      </li>
                      <li>
                        Max Shade Air Temperature:{" "}
                        <span className="text-green-500">{maxTemp}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={activeMode === "tabulateCustom"}
                  onChange={() =>
                    setActiveMode(
                      activeMode === "tabulateCustom" ? "" : "tabulateCustom",
                    )
                  }
                />
                Tabulate Custom Loading Parameters
              </label>

              {activeMode === "tabulateCustom" && (
                <div>
                  <Spreadsheet
                    sheetData={sheetData}
                    setSheetData={setSheetData}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowPopup(false)}
                className="px-3 py-1 bg-red-500 rounded text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showPopup2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Modal Box */}
          <div className="bg-white rounded-lg w-[500px] p-6 relative border-4 border-yellow-400">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Modify Additional Geomerty
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <h3>Girder Spacing:</h3>
                <input
                  type="number"
                  value={girderSpacing}
                  onChange={(e) => {
                    setGirderSpacing(
                      e.target.value === "" ? "" : Number(e.target.value),
                    );
                    setLastChanged("g");
                  }}
                  className="border rounded w-[40%] px-3 py-2"
                />
              </div>

              <div className="mb-4 ml-4">
                {Number(girderSpacing) >= Number(width) + 5 && (
                  <p className="text-red-500">
                    Girder spacing should be less than overall bridge width.
                  </p>
                )}
              </div>

              <div className="flex justify-between">
                <h3>No. of Girders:</h3>

                <input
                  type="text"
                  value={intValue}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "") {
                      setIntValue("");
                      return;
                    }
                    if (!/^\d+$/.test(val)) return;
                    setIntValue(Number(val));
                  }}
                  className="border rounded w-[40%] px-3 py-2"
                />
              </div>

              <div className="flex justify-between">
                <h3>Deck Overhang Width (m):</h3>

                <input
                  type="number"
                  value={width - girderSpacing * intValue}
                  onChange={(e) => {
                    setDeckOverhang(
                      e.target.value === "" ? "" : Number(e.target.value),
                    );
                    setLastChanged("d");
                  }}
                  className="border rounded w-[40%] px-3 py-2"
                />
              </div>
              <div className="mb-4 ml-4">
                {Number(deckOverhang) >= Number(width) + 5 && (
                  <p className="text-red-500">
                    Deck Overhang width should be less than overall bridge
                    width.
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-2">
              <button
                onClick={() => setShowPopup2(false)}
                className="px-3 py-1 bg-red-500 rounded text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "additional" && <div></div>}
    </div>
  );
};

export default GroupDesignSidebar;
