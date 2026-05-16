"use client"

import { WorkspaceMenu } from '@/services/Options'
import { CirclePlus } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'
import CustomDialog from './CustomDialog'

function Sidebar() {

  const path = usePathname()

  return (
    <div className='min-h-screen sticky top-0 shadow-sm border-r p-2'>
      <CustomDialog>
        <div className='p-2 flex items-center flex-col hover:cursor-pointer mb-5'>
          <CirclePlus className='bg-blue-500 text-white rounded-full h-8 w-8'/>
          <h2 className='text-sm text-blue-500'>Создать</h2>
        </div>
      </CustomDialog>

      {WorkspaceMenu.map((menu, index) => (
        <div key={index} className={`p-2 flex items-center flex-col mb-7 group hover:bg-blue-200 rounded-2xl cursor-pointer
          ${menu.path==path&&'bg-blue-200'}
        `}>
          <menu.icon className={`group-hover:text-blue-800 ${menu.path==path&&'bg-blue-200'}`}/>
          <h2 className={`text-sm group-hover:text-blue-800 ${menu.path==path&&'bg-blue-200'}`}>{menu.name}</h2>
        </div>
      ))}
    </div>
  )
}

export default Sidebar