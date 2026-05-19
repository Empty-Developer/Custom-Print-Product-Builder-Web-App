"use client";

import React from 'react';
import { ShapeList } from '../Options';
import Image from 'next/image';
import * as fabric from "fabric";
import { useCanvasHook } from '@/app/(routers)/design/[designId]/page';

interface ShapeItem {
  name: string;
  icon: string;
  type: string;
}

function Shapes() {
  const { canvasEditor } = useCanvasHook();

  const onShapeSelect = (shape: ShapeItem) => {
    if (!canvasEditor) {
      console.warn("Холст еще не готов");
      return;
    }

    let fabricObject: fabric.Object | null = null;

    const baseOptions = {
      left: 150,
      top: 150,
      fill: "#000",
      stroke: "#000",
      strokeWidth: 0,
      selectable: true,
      hasControls: true,
      evented: true,
      // @ts-ignore
      isUserImage: true
    };

    switch (shape.type) {
      case 'rect':
        fabricObject = new fabric.Rect({
          ...baseOptions,
          width: 120,
          height: 120,
          rx: 4,
          ry: 4
        });
        break;
        
      case 'circle':
        fabricObject = new fabric.Circle({
          ...baseOptions,
          radius: 60,
        });
        break;
        
      case 'triangle':
        fabricObject = new fabric.Triangle({
          ...baseOptions,
          width: 120,
          height: 110,
        });
        break;

      case 'line':
        fabricObject = new fabric.Line([50, 50, 200, 50], {
          ...baseOptions,
          stroke: "#000",
          strokeWidth: 6,
          strokeLineCap: "round"
        });
        break;

      default:
        console.warn(`Неизвестный тип фигуры: ${shape.type}`);
        return;
    }

    if (fabricObject) {
      canvasEditor.add(fabricObject);
      const objectsCount = canvasEditor.getObjects().length;
      canvasEditor.moveObjectTo(fabricObject, objectsCount - 1);
      canvasEditor.centerObject(fabricObject);
      // @ts-ignore
      const activeMask = canvasEditor.activeClipPath;
      if (activeMask) {
        fabricObject.set({ clipPath: activeMask });
      }

      canvasEditor.setActiveObject(fabricObject);
      canvasEditor.renderAll();
      
      console.log(`Фигура "${shape.name}" успешно добавлена внутри макета!`);
    }
  };

  return (
    <div className="w-full mt-3">
      <div className="grid grid-cols-3 gap-3">
        {ShapeList.map((shape, index) => (
          <div 
            key={index}
            onClick={() => onShapeSelect(shape as ShapeItem)}
            className="p-2 border border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-all flex items-center justify-center bg-gray-50 aspect-square group"
          >
            <Image
              src={shape.icon}
              alt={shape.name}
              width={50}
              height={50}
              className="object-contain group-hover:scale-110 transition-transform duration-200"
            />
          </div>
        ))}    
      </div>
    </div>
  );
}

export default Shapes;