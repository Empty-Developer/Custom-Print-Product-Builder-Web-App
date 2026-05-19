"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import * as fabric from "fabric";
import { useCanvasHook } from '@/app/(routers)/design/[designId]/page'; // Убедись, что путь к хуку правильный

interface UnsplashImage {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}

function SearchImages() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Достаем редактор холста из твоего глобального стейта
  const { canvasEditor } = useCanvasHook();

  // Функция запроса к Unsplash
  const GetImageList = async (searchInput: string) => {
    if (!searchInput) return;
    
    setLoading(true);
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: searchInput,
          page: 1,
          per_page: 20
        },
        headers: {
          Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
        }
      });

      setImages(response.data.results);
    } catch (error) {
      console.error("Ошибка при поиске картинок в Unsplash:", error);
    } finally {
      setLoading(false);
    }
  };

  // Метод добавления картинки на холст Fabric.js по клику
  const addUnsplashImageToCanvas = (imageUrl: string) => {
    if (!canvasEditor) {
      console.warn("Холст еще не инициализирован");
      return;
    }

    // Используем FabricImage.fromURL из Fabric.js v6. crossOrigin обязателен, чтобы холст не "загрязнялся"
    fabric.FabricImage.fromURL(imageUrl, { crossOrigin: 'anonymous' })
      .then((img) => {
        // Устанавливаем базовую ширину объекта
        img.scaleToWidth(180);

        img.set({
          selectable: true,
          hasControls: true,
          evented: true,
          // @ts-ignore
          isUserImage: true // Помечаем как пользовательский слой
        });

        // Считаем текущее количество пользовательских картинок для сдвига каскадом
        const userImagesCount = canvasEditor.getObjects().filter(
          // @ts-ignore
          (obj) => obj.isUserImage
        ).length;

        // Добавляем объект и поднимаем его на самый верхний z-index слой
        canvasEditor.add(img);
        const objectsCount = canvasEditor.getObjects().length;
        canvasEditor.moveObjectTo(img, objectsCount - 1);
        
        // Центрируем картинку по умолчанию
        canvasEditor.centerObject(img);

        // Если это уже не первая картинка, слегка смещаем ее в сторону и наклоняем
        if (userImagesCount > 0) {
          const offset = userImagesCount * 25;
          img.set({
            left: (img.left || 0) + offset,
            top: (img.top || 0) + offset,
            angle: Math.floor(Math.random() * 20) - 10 // легкий наклон от -10 до 10 градусов
          });
        }

        // Подтягиваем активную маску обрезки кружки или значка из твоего Editor.tsx
        // @ts-ignore
        const activeMask = canvasEditor.activeClipPath;
        if (activeMask) {
          img.set({ clipPath: activeMask });
        }

        // Выделяем добавленный объект маркерами управления и перерисовываем холст
        canvasEditor.setActiveObject(img);
        canvasEditor.renderAll();

        console.log("Картинка Unsplash успешно добавлена на макет товара!");
      })
      .catch((err) => {
        console.error("Не удалось отрисовать картинку Unsplash на холсте:", err);
      });
  };

  useEffect(() => {
    GetImageList("patterns"); 
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      GetImageList(query);
    }
  };

  return (
    <div className="w-full mt-3 flex flex-col gap-4">
      {/* Строка поиска */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Поиск картинок..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border border-gray-300 rounded-xl text-black focus:outline-none focus:border-primary"
        />
        <button 
          onClick={() => GetImageList(query)}
          disabled={loading}
          className="px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 disabled:opacity-50 flex items-center justify-center min-w-[80px]"
        >
          {loading ? "Ищем..." : "Найти"}
        </button>
      </div>

      {/* Сетка картинок */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto p-1">
          {images.map((img) => (
            <div 
              key={img.id} 
              // Навесили клик: при нажатии передаем regular URL для хорошего качества на холсте
              onClick={() => addUnsplashImageToCanvas(img.urls.regular)}
              className="cursor-pointer overflow-hidden rounded-lg border border-gray-200 hover:border-primary transition-all group bg-gray-50 flex items-center justify-center"
            >
              <Image 
                src={img.urls.small} 
                alt={img.alt_description || "Unsplash Image"} 
                width={160}  
                height={160} 
                className="w-full h-[120px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center text-gray-400 text-sm py-4">
            Ничего не найдено. Попробуйте другой запрос.
          </div>
        )
      )}
    </div>
  );
}

export default SearchImages;