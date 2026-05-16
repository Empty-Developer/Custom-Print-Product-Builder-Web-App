"use client"

import React, { useState } from "react";
import { sideBarOptions } from "@/services/Options";
import SideBarSettings from "./SideBarSettings";

function SideBar() {
  const [selectedOption, setSelectedOption] = useState<string>(sideBarOptions[0]?.name || "");

  return (
    <div className="flex h-screen bg-white border-r">      
      <div className="p-3 w-[120px] border-r flex flex-col gap-3 flex-shrink-0">
        {sideBarOptions?.map((menu: any, index: number) => {
          const Icon = menu.icon;
          const isSelected = selectedOption === menu.name;

          return (
            <div 
              key={index} 
              onClick={() => setSelectedOption(menu.name)}
              className={`p-3 flex flex-col items-center justify-center cursor-pointer rounded-2xl transition-all duration-200
                ${isSelected 
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`}
            >
              {Icon && <Icon className={`h-6 w-6 ${isSelected ? "text-blue-600" : "text-gray-500"}`} />}
              
              <h2 className="text-xs mt-2 text-center leading-tight select-none">
                {menu.name}
              </h2>
            </div>
          );
        })}
      </div>

      <SideBarSettings selectedOption={selectedOption}/>
      
    </div>
  );
}

export default SideBar;