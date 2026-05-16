import React from 'react'
import dynamic from 'next/dynamic'
import { ColorResult } from 'react-color'

interface ColorPickerEditorProps {
  value: string;
  onChange?: (color: string) => void;
}

const ChromePicker = dynamic(
  () => import('react-color').then((mod) => mod.ChromePicker),
  { ssr: false }
)

const CirclePicker = dynamic(
  () => import('react-color').then((mod) => mod.CirclePicker),
  { ssr: false }
)

function ColorPickerEditor({ value, onChange }: ColorPickerEditorProps) {
  const handleColorChange = (colorResult: ColorResult) => {
    if (onChange) {
      onChange(colorResult.hex);
    }
  }

  return (
    <div className='space-y-4'>
      <ChromePicker 
        color={value}
        onChange={handleColorChange}
        className='border-r rounded-2xl mb-5'
      />
      <CirclePicker 
        color={value}
        onChange={handleColorChange}
      />
    </div>
  )
}

export default ColorPickerEditor;