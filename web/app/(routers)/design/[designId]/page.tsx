"use client"

import { useParams } from 'next/navigation'
import React from 'react'
import DesignHeader from '../_components/DesignHeader'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Loader2Icon } from 'lucide-react'
import SideBar from '../_components/SideBar'

function DesignEditor() {
  const params = useParams()
  const designId = params?.designId as Id<"designs">

  const designData = useQuery(api.designs.GetDesign, 
    designId ? { id: designId } : "skip"
  )

  if (designData === undefined) {
    return (
      <div className='h-screen w-screen flex items-center justify-center gap-2'>
        <Loader2Icon className='animate-spin h-6 w-6 text-primary' />
        <span className='text-sm text-gray-500 font-medium'>Загрузка проекта...</span>
      </div>
    )
  }

  if (designData === null) {
    return (
      <div className='h-screen w-screen flex items-center justify-center flex-col gap-2'>
        <h2 className='text-xl font-bold text-gray-800'>Макет не найден</h2>
        <p className='text-sm text-gray-500'>Возможно, он был удален или ссылка неверна.</p>
      </div>
    )
  }

  return (
    <div>
      <DesignHeader designData={designData}/>
      <SideBar />
    </div>
  )
}

export default DesignEditor