import React, { useState } from "react";
import GroupDesignNavbar from "./GroupDesignNavbar";
import GroupDesignSidebar from "./GroupDesignSidebar";
import myImage from "../assets/Bridge-Section.png";

const GroupDesign = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  console.log("sidebarOpen:", sidebarOpen);
  return (
    <div className="w-screen h-screen flex flex-col">
      <GroupDesignNavbar />

      <div className="md:hidden inline-block">
          {!sidebarOpen && (
            <button
              className="md:hidden p-2 m-2 border rounded w-12"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>
          )}
          {sidebarOpen && (
            <button
              className="md:hidden p-2 m-2 border rounded w-12"
              onClick={() => setSidebarOpen(false)}
            >
              X
            </button>
          )}
        
      </div>

      <div className="flex flex h-screen overflow-hidden">

        <GroupDesignSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex-1 bg-gray-600 flex items-center justify-center">
          <img
            src={myImage}
            alt="Model Preview"
            className="max-w-full max-h-full object-contain w-[90%]"
          />
        </div>
      </div>
    </div>
  );
};

export default GroupDesign;
