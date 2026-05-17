"use client";

import * as fabric from "fabric";
import React, { useEffect, useRef } from "react";
import { SizeOption } from "@/services/Options";
import { useCanvasHook } from "../[designId]/page";

interface EditorProps {
  designData: {
    _id: string;
    name: string;
    width: number;
    height: number;
  };
}

function Editor({ designData }: EditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  const DISPLAY_SIZE = 500;
  const canvasWidth = DISPLAY_SIZE;
  const canvasHeight = DISPLAY_SIZE;
  const printWidth = designData?.width || 500;
  const printHeight = designData?.height || 500;
  const { setCanvasEditor } = useCanvasHook();

  const matchedOption = SizeOption.find(
    (option) => option.width === printWidth && option.height === printHeight,
  );

  const isCustomSize = !matchedOption || matchedOption.width === 0;

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: isCustomSize ? "#ffffff" : "transparent",
    });

    setCanvasEditor(canvas);
    fabricCanvasRef.current = canvas;

    let bgShape: fabric.Object | null = null;
    let itemClipPath: fabric.Object | null = null;

    if (!isCustomSize && matchedOption?.img2) {
      fabric.FabricImage.fromURL(matchedOption.img2)
        .then((img2) => {
          if (designData.name.includes("Кружка")) {
            img2.scaleToWidth(canvasWidth * 0.9);
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

          if (designData.name.includes("Значек")) {
            const badgeRadius = 145;
            const badgeLeft = canvasWidth / 2 - 86;
            const badgeTop = canvasHeight / 2;

            itemClipPath = new fabric.Circle({
              radius: badgeRadius,
              left: badgeLeft,
              top: badgeTop,
              originX: "center",
              originY: "center",
              absolutePositioned: true,
            });

            bgShape = new fabric.Circle({
              radius: badgeRadius,
              left: badgeLeft,
              top: badgeTop,
              originX: "center",
              originY: "center",
              fill: "transparent",
              selectable: false,
              evented: false,
              id: "custom-bg-shape",
            });
          }
          else if (designData.name.includes("Кружка")) {
            const rectWidth = img2.getScaledWidth() * 0.7;
            const rectHeight = img2.getScaledHeight() * 0.83;
            const rectLeft = canvasWidth / 2 - img2.getScaledWidth() * 0.14;
            const rectTop = canvasHeight / 2;

            itemClipPath = new fabric.Rect({
              width: rectWidth,
              height: rectHeight,
              left: rectLeft,
              top: rectTop,
              originX: "center",
              originY: "center",
              absolutePositioned: true,
            });

            bgShape = new fabric.Rect({
              width: rectWidth,
              height: rectHeight,
              left: rectLeft,
              top: rectTop,
              originX: "center",
              originY: "center",
              fill: "transparent",
              selectable: false,
              evented: false,
              id: "custom-bg-shape",
            });
          }

          if (bgShape) {
            canvas.add(bgShape);
            canvas.sendObjectToBack(bgShape);
            canvas.bringObjectForward(bgShape, false);
          }

          const totalObjects = canvas.getObjects().length;
          canvas.getObjects().forEach((obj) => {
            // @ts-ignore
            if (obj.isUserImage) {
              canvas.moveObjectTo(obj, totalObjects - 1);
            }
          });

          if (itemClipPath) {
            // @ts-ignore
            canvas.activeClipPath = itemClipPath;
          }

          canvas.renderAll();

          canvas.renderAll();
        })
        .catch((err) => {
          console.error("Ошибка загрузки элемента товара:", err);
        });
    }

    canvas.renderAll();

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
        setCanvasEditor(null);
      }
    };
  }, [designData, isCustomSize]);

  return (
    <div
      className={`transition-all duration-300 ${
        isCustomSize
          ? "bg-white shadow-2xl rounded-xl border border-gray-200"
          : "bg-transparent"
      }`}
      style={{ width: canvasWidth, height: canvasHeight }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}

export default Editor;
