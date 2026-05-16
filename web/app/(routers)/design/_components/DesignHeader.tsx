"use client"

import { UserButton } from '@stackframe/stack'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'

function DesignHeader({ designData }: { designData: any }) {
  const [title, setTitle] = useState(designData?.name || '')
  const updateDesign = useMutation(api.designs.UpdateDesignName)

  useEffect(() => {
    if (designData?.name) {
      setTitle(designData.name)
    }
  }, [designData])

  const handleSaveTitle = async () => {
    if (!title.trim()) {
      toast.warning('Название макета не может быть пустым')
      setTitle(designData.name)
      return
    }

    if (title === designData.name) return

    try {
      await updateDesign({
        id: designData._id,
        name: title.trim()
      })
      toast.success('Название обновлено')
    } catch (error) {
      toast.error('Не удалось сохранить название')
      console.error(error)
    }
  }

  return (
    <div className='p-3 flex justify-between items-center shadow-sm bg-white border-b'>
      <div className='flex items-center gap-4'>
        <Image
          src={'/logo.png'}
          alt='логотип' 
          width={100} 
          height={100} 
          priority
          className='w-[50px] h-[50px] object-contain'
        />
        
        <input 
          placeholder='Название Макета' 
          className='border-b border-transparent hover:border-gray-200 focus:border-blue-500 outline-none px-2 py-1 text-lg font-semibold transition-colors text-gray-800'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSaveTitle}
          onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
        />
      </div>

      <div className='flex items-center gap-4'>
        <UserButton />
      </div>
    </div>
  )
}

export default DesignHeader