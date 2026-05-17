"use client";

import React, { useRef, useState } from "react";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { useCanvasHook } from "@/app/(routers)/design/[designId]/page";
import * as fabric from "fabric";
import { Loader2Icon, Trash2 } from "lucide-react";

const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

const authenticator = async () => {
  try {
    const response = await fetch("/api/imagekit-auth");
    if (!response.ok) throw new Error("Authentication request failed");
    return await response.json();
  } catch (err: any) {
    throw new Error(`Authentication failed: ${err.message}`);
  }
};

function UploadImage() {
  const ikUploadRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const { canvasEditor } = useCanvasHook();

  const onUploadStart = () => {
    setLoading(true);
  };

  const onError = (err: any) => {
    setLoading(false);
    console.error("Ошибка при работе с ImageKit:", err);
  };

  const onSuccess = (res: any) => {
    setLoading(false);
    
    if (!canvasEditor) {
      console.error("Холст еще не готов");
      return;
    }

    console.log("Успешно загружено в ImageKit. Ссылка:", res.url);

    fabric.FabricImage.fromURL(res.url, { 
      crossOrigin: 'anonymous' 
    })
    .then((img) => {
      img.scaleToWidth(180);
      
      img.set({
        selectable: true,
        hasControls: true,
        evented: true,
        // @ts-ignore
        isUserImage: true
      });

      const userImagesCount = canvasEditor.getObjects().filter(
        // @ts-ignore
        (obj) => obj.isUserImage
      ).length;

      canvasEditor.add(img);

      const objectsCount = canvasEditor.getObjects().length;
      canvasEditor.moveObjectTo(img, objectsCount - 1);

      canvasEditor.centerObject(img);

      if (userImagesCount > 0) {
        const offset = userImagesCount * 25;
        img.set({
          left: (img.left || 0) + offset,
          top: (img.top || 0) + offset,
          angle: Math.floor(Math.random() * 20) - 10
        });
      }

      // @ts-ignore
      const activeMask = canvasEditor.activeClipPath;
      if (activeMask) {
        img.set({ clipPath: activeMask });
      }

      canvasEditor.setActiveObject(img);
      canvasEditor.renderAll();
      
      console.log(`Добавлено изображений на макет: ${userImagesCount + 1}`);
    })
    .catch((err) => {
      console.error("Ошибка Fabric.js при рендере:", err);
    });
  };

  const deleteSelectedImage = () => {
    if (!canvasEditor) return;

    const activeObject = canvasEditor.getActiveObject();

    if (activeObject) {
      canvasEditor.remove(activeObject);
      canvasEditor.discardActiveObject();
      canvasEditor.renderAll();
    } else {
      alert("Сначала кликни по картинке на холсте, чтобы выбрать её!");
    }
  };

  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <div className="flex flex-col gap-3">
        <div 
          onClick={() => !loading && ikUploadRef.current?.click()}
          className={`p-3 bg-primary text-white rounded-2xl text-center cursor-pointer select-none flex items-center justify-center gap-2 transition-opacity ${
            loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
          }`}
        >
          {loading ? (
            <>
              <Loader2Icon className="h-5 w-5 animate-spin" />
              <span>Загрузка...</span>
            </>
          ) : (
            <h2>Загрузить Изображение</h2>
          )}
        </div>

        <button
          onClick={deleteSelectedImage}
          className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl flex items-center justify-center gap-2 transition-all font-medium text-sm"
        >
          <Trash2 className="h-4 w-4" />
          Удалить выбранное
        </button>

        <IKUpload
          ref={ikUploadRef}
          onError={onError}
          onSuccess={onSuccess}
          onUploadStart={onUploadStart}
          style={{ display: "none" }}
        />
      </div>
    </ImageKitProvider>
  );
}

export default UploadImage;