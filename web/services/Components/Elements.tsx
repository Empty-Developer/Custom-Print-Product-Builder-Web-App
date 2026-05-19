"use client";

import React, { useState, useEffect } from 'react';
import Shapes from '../Sharable/Shapes';
import ColorPickerEditor from '../Sharable/ColorPickerEditor';
import { useCanvasHook } from "@/app/(routers)/design/[designId]/page";
import { Trash2 } from "lucide-react";

function Elements() {
  const { canvasEditor } = useCanvasHook();
  const [color, setColor] = useState("#000000");

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    if (!canvasEditor) return;

    const activeObject = canvasEditor.getActiveObject();
    if (activeObject) {
      if (activeObject.type === 'line') {
        activeObject.set({ stroke: newColor });
      } else {
        activeObject.set({ fill: newColor });
      }
      canvasEditor.renderAll();
    }
  };

  useEffect(() => {
    if (!canvasEditor) return;

    const updatePickerColor = () => {
      const activeObject = canvasEditor.getActiveObject();
      if (activeObject) {
        const objectColor = activeObject.type === 'line' 
          ? activeObject.stroke 
          : activeObject.fill;
          
        if (typeof objectColor === 'string') {
          setColor(objectColor);
        }
      }
    };

    canvasEditor.on('selection:created', updatePickerColor);
    canvasEditor.on('selection:updated', updatePickerColor);

    return () => {
      canvasEditor.off('selection:created', updatePickerColor);
      canvasEditor.off('selection:updated', updatePickerColor);
    };
  }, [canvasEditor]);

  const deleteSelectedElement = () => {
    if (!canvasEditor) return;
    const activeObject = canvasEditor.getActiveObject();
    if (activeObject) {
      canvasEditor.remove(activeObject);
      canvasEditor.discardActiveObject();
      canvasEditor.renderAll();
    } else {
      alert("Сначала кликни по фигуре на холсте, чтобы выбрать её!");
    }
  };

  return (
    <div className="w-full max-w-full flex flex-col gap-4 max-h-[82vh] overflow-y-auto px-1 py-1 overflow-x-hidden">

      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Добавить фигуру</h3>
        <Shapes />
      </div>

      <button
        onClick={deleteSelectedElement}
        className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl flex items-center justify-center gap-2 transition-all font-medium text-sm"
      >
        <Trash2 className="h-3.5 w-3.5" />
        Удалить выбранное
      </button>

      <hr className="border-gray-100 my-0.5" />

      <div className="w-full">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Цвет элемента</h3>

        <div className="custom-color-picker-wrapper w-full [&>div]:!w-full [&_.chrome-picker]:!w-full [&_.circle-picker]:!hidden">
          <ColorPickerEditor value={color} onChange={handleColorChange} />
        </div>
      </div>

    </div>
  );
}

export default Elements;