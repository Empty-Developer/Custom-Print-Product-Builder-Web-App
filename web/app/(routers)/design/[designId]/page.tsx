"use client"

import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import DesignHeader from '../_components/DesignHeader'
import SideBar from '../_components/SideBar'
import Editor from '../_components/Editor'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Loader2Icon } from 'lucide-react'

function DesignEditor() {
  const params = useParams()
  const designId = params?.designId as Id<"designs">

  const designData = useQuery(api.designs.GetDesign, 
    designId ? { id: designId } : "skip"
  )

  if (designData === undefined) {
    return (
      <div className='h-screen w-screen flex items-center justify-center gap-2 bg-gray-50'>
        <Loader2Icon className='animate-spin h-6 w-6 text-blue-600' />
        <span className='text-sm text-gray-500 font-medium'>Загрузка проекта...</span>
      </div>
    )
  }

  if (designData === null) {
    return (
      <div className='h-screen w-screen flex items-center justify-center flex-col gap-2 bg-gray-50'>
        <h2 className='text-xl font-bold text-gray-800'>Макет не найден</h2>
        <p className='text-sm text-gray-500'>Возможно, он был удален или ссылка неверна.</p>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-100">
      <DesignHeader designData={designData}/>
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <div className="flex-1 flex items-center justify-center p-12 overflow-auto">
          <Editor designData={designData} />
        </div>

      </div>
    </div>
  )
}

export default DesignEditor