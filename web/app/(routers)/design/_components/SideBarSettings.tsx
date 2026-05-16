"use client"

import React from 'react'

interface SideBarSettingsProps {
  selectedOption: string;
}

function SideBarSettings({ selectedOption }: SideBarSettingsProps) {
  return (
    <div className='w-[280px] p-5 h-screen bg-gray-50/50 flex flex-col border-r'>
      <h2 className='text-xl font-bold text-gray-800 tracking-tight capitalize'>
        {selectedOption || "Настройки"}
      </h2>
      <p className='text-xs text-gray-400 mt-1 mb-4'>
        Параметры и инструменты.
      </p>
      <hr className='border-gray-200/60 mb-6' />
      
    </div>
  )
}

export default SideBarSettings;