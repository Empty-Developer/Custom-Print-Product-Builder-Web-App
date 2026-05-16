"use client"

import React, { useState } from 'react'
import ColorPickerEditor from '../Sharable/ColorPickerEditor'
import { useCanvasHook } from '@/app/(routers)/design/[designId]/page'

function BackgroundSetting() {
  const [bgColor, setBgColor] = useState('#ffffff')
  const { canvasEditor } = useCanvasHook()

  const onColorChange = (color: string) => {
    
    if (canvasEditor) {
      const objects = canvasEditor.getObjects();
      const targetBgShape = objects.find((obj: any) => obj.id === 'custom-bg-shape');

      if (targetBgShape) {
        targetBgShape.set({ fill: color });
        canvasEditor.renderAll();
      } else {
        canvasEditor.backgroundColor = color;
        canvasEditor.renderAll();
      }
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-start py-2">
      <ColorPickerEditor
        value={bgColor}
        onChange={(v) => onColorChange(v)}
      />
    </div>
  )
}

export default BackgroundSetting;