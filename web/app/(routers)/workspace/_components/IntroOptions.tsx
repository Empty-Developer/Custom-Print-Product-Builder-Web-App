"use client";

import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { SizeOption } from "@/services/Options";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { UserDetailContext } from "@/context/UserDetailContext";
import { toast } from "sonner";

interface SizeOptionType {
  name: string;
  width: number;
  height: number;
  img: string;
}

function IntroOptions() {
  const createDesignRecord = useMutation(api.designs.CreateNewDesign);
  const { userDetail }: any = useContext(UserDetailContext);
  /*
    Used to create new design
  */
  const OnOptionSelect = async (item: SizeOptionType) => {
    if (!userDetail || !userDetail._id) {
      toast('Ошибка: Данные пользователя загружаются...');
      console.error("User detail is null or _id is missing");
      return;
    }

    toast('Загрузка...')
    try {
      const result = await createDesignRecord({
        name: item.name,
        width: Number(item.width),
        height: Number(item.height),
        uid: userDetail._id,
      });
      console.log("Результат:", result);
      // navigation to editor screen
    } catch (error) {
      console.error("Ошибка при создании:", error);
    }
  };

  return (
    <div className="flex flex-col gap-10 mt-5">
      <div className="relative w-full h-[250px] rounded-3xl overflow-hidden shadow-lg">
        <Image
          priority
          fill
          src={"/banner-home.png"}
          alt="баннер"
          className="object-cover z-0"
        />
        <div className="absolute inset-0 z-10 flex flex-col justify-center px-10 md:px-16 bg-black/5">
          <div className="max-w-md">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-md tracking-tight">
              Твой проект
            </h2>
            <p className="text-white/90 text-lg mt-2 drop-shadow-sm max-w-xs leading-snug">
              Создавай уникальные вещи за пару кликов.
            </p>
            <Button className="mt-6 w-fit h-12 px-10 text-md bg-white text-black hover:bg-gray-100 rounded-full font-bold shadow-xl border-none transition-transform active:scale-95">
              Создать
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-gray-800 px-2">
          Выберите формат макета
        </h3>

        <div className="flex flex-wrap gap-6 justify-start">
          {SizeOption.map((item: any, index: number) => (
            <div
              key={index}
              className="group flex flex-col items-center gap-3 cursor-pointer"
              onClick={() => OnOptionSelect(item)}
            >
              <div className="relative overflow-hidden rounded-2xl border-2 border-transparent group-hover:border-primary transition-all bg-white shadow-sm hover:shadow-md">
                <Image
                  src={item.img}
                  alt={item.name}
                  width={160}
                  height={160}
                  className="object-contain p-4 transition-transform group-hover:scale-110 rounded-3xl"
                />
              </div>

              <span className="text-sm font-semibold text-gray-600 group-hover:text-blue-600 transition-colors">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IntroOptions;
