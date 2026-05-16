"use client"

import React, { useState } from "react";
import { sideBarOptions } from "@/services/Options";
import SideBarSettings from "./SideBarSettings";

function SideBar() {
  // ИСПРАВЛЕНО: Теперь в стейте хранится весь объект, а не просто строка name
  const [selectedOption, setSelectedOption] = useState<any>(sideBarOptions[0] || null);

  return (
    <div className="flex h-screen bg-white border-r">      
      {/* Левая панель с иконками */}
      <div className="p-3 w-[120px] border-r flex flex-col gap-3 flex-shrink-0">
        {sideBarOptions?.map((menu: any, index: number) => {
          const Icon = menu.icon;
          // ИСПРАВЛЕНО: Сравниваем имена внутри объектов
          const isSelected = selectedOption?.name === menu.name;

          return (
            <div 
              key={index} 
              // ИСПРАВЛЕНО: Записываем в стейт объект menu целиком
              onClick={() => setSelectedOption(menu)}
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