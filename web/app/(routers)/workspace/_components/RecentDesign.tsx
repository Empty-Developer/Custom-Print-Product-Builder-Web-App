"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react"

function RecentDesign() {
  const [designList, setDesignList] = useState([]);

  return (
    <div className="mt-10">
      <h2 className="font-bold text-2xl text-gray-800 tracking-tight">
        Недавние Работы
      </h2>

      {designList.length === 0 ? (
        <div className="mt-6 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-[2rem] p-12 bg-gray-50/50 transition-all hover:bg-gray-50">
          {/* Увеличенная картинка с легким эффектом прозрачности */}
          <div className="relative w-[200px] h-[200px] mb-6 opacity-80">
            <Image 
              src={"/time.png"} 
              alt="No designs yet" 
              fill
              className="object-contain"
            />
          </div>

          <div className="flex flex-col items-center gap-2 mb-8">
            <p className="text-xl font-semibold text-gray-700">
              Здесь пока пусто
            </p>
            <p className="text-center text-gray-500 max-w-[280px] leading-relaxed">
              У вас еще нет сохраненных дизайнов. Самое время Сделать Дизайн!
            </p>
          </div>

          <Button className="rounded-full px-8 py-6 text-lg font-bold shadow-lg shadow-primary/20 transition-transform active:scale-95 flex gap-2">
            <Plus className="w-5 h-5" />
            Создать Новый
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        </div>
      )}
    </div>
  );
}

export default RecentDesign;