"use client"

import React from 'react'

interface SideBarOptionType {
  name: string;
  icon: React.ComponentType<any>;
  component?: React.ReactNode;
}

interface SideBarSettingsProps {
  selectedOption: SideBarOptionType | null;
}

function SideBarSettings({ selectedOption }: SideBarSettingsProps) {
  return (
    <div className='w-[280px] p-5 h-screen bg-gray-50/50 flex flex-col border-r'>
      <h2 className='text-xl font-bold text-gray-800 tracking-tight capitalize'>
        {selectedOption ? selectedOption.name : "Настройки"}
      </h2>
      <p className='text-xs text-gray-400 mt-1 mb-4'>Параметры и инструменты.</p>
      <hr className='border-gray-200/60 mb-6' />
            {selectedOption?.component && typeof selectedOption.component === 'function'
        ? selectedOption.component()
        : selectedOption?.component
      }
    </div>
  )
}

export default SideBarSettings;