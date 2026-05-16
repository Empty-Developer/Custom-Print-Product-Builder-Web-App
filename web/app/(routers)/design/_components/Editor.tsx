"use client"

import * as fabric from 'fabric'
import React, { useEffect, useRef } from 'react'
import { SizeOption } from '@/services/Options'

interface EditorProps {
  designData: {
    _id: string;
    name: string;
    width: number;
    height: number; // Реальные размеры для печати (например, 170 или 211)
  };
}

function Editor({ designData }: EditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null)
  const DISPLAY_SIZE = 500; 
  const canvasWidth = DISPLAY_SIZE;
  const canvasHeight = DISPLAY_SIZE;
  const printWidth = designData?.width || 500;
  const printHeight = designData?.height || 500;

  const matchedOption = SizeOption.find(
    (option) => option.width === printWidth && option.height === printHeight
  );

  const isCustomSize = !matchedOption || matchedOption.width === 0;

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: isCustomSize ? '#ffffff' : 'transparent',
    })

    fabricCanvasRef.current = canvas;
    let itemClipPath: fabric.Object | null = null;

    if (!isCustomSize && matchedOption?.img2) {
      fabric.FabricImage.fromURL(matchedOption.img2).then((img2) => {
        if (designData.name.includes('Кружка')) {
          img2.scaleToWidth(canvasWidth * 0.90);
        } else {
          img2.scaleToWidth(canvasWidth * 0.95);
        }
        
        img2.set({
          selectable: false,
          evented: false,
        });

        canvas.add(img2);
        canvas.centerObject(img2);
        canvas.sendObjectToBack(img2);

        // setting for badge
        if (designData.name.includes('Значек')) {
          
          const badgeRadius = 145;
          const badgeLeft = (canvasWidth / 2) - 86;
          const badgeTop = canvasHeight / 2;

          itemClipPath = new fabric.Circle({
            radius: badgeRadius, 
            left: badgeLeft,
            top: badgeTop,
            originX: 'center',
            originY: 'center',
            absolutePositioned: true
          });
        } 
        
        // setting for cup
        else if (designData.name.includes('Кружка')) {
          itemClipPath = new fabric.Rect({
            width: img2.getScaledWidth() * 0.70, 
            height: img2.getScaledHeight() * 0.83, 
            left: (canvasWidth / 2) - (img2.getScaledWidth() * 0.14), 
            top: canvasHeight / 2,
            originX: 'center',
            originY: 'center',
            absolutePositioned: true
          });
        }

        if (itemClipPath && text) {
          text.set({ clipPath: itemClipPath });
          canvas.renderAll();
        }

        canvas.renderAll();
      }).catch((err) => {
        console.error("Ошибка загрузки элемента товара:", err);
      });
    }

    const text = new fabric.IText('Перетащи меня', {
      top: canvasHeight / 2 - 15,
      fontSize: 18,
      fill: isCustomSize ? '#000000' : '#1e293b',
    });
    
    canvas.add(text);
    canvas.centerObjectH(text);
    
    if (!isCustomSize && designData.name.includes('Значек')) {
      text.set({ left: canvasWidth * 0.25 });
    }

    canvas.on('object:added', (e) => {
      const obj = e.target;
      if (obj && obj !== canvas.getObjects()[0] && itemClipPath) {
        obj.set({ clipPath: itemClipPath });
        canvas.renderAll();
      }
    });

    canvas.renderAll();

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    }
  }, [designData, isCustomSize])

  return (
    <div 
      className={`transition-all duration-300 ${
        isCustomSize 
          ? 'bg-white shadow-2xl rounded-xl border border-gray-200' 
          : 'bg-transparent'
      }`}
      style={{ width: canvasWidth, height: canvasHeight }}
    >
      <canvas ref={canvasRef} />
    </div>
  )
}

export default Editor;