"use client";

import React, { ReactNode, useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Loader, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

function CustomDialog({ children }: { children: ReactNode }) {
  const [name, setName] = useState<string>("");
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { userDetail }: any = useContext(UserDetailContext);
  const createDesignRecord = useMutation(api.designs.CreateNewDesign);
  const router = useRouter();

  const onCreate = async () => {
    if (!userDetail || !userDetail._id) {
      toast.error("Ошибка: Данные пользователя загружаются...");
      return;
    }

    if (!name || width <= 0 || height <= 0) {
      toast.warning("Пожалуйста, заполните все поля корректно");
      return;
    }

    const loadingToast = toast.loading("Создание макета...");
    setLoading(true);
    try {
      const result = await createDesignRecord({
        name: name,
        width: Number(width),
        height: Number(height),
        uid: userDetail._id as any,
      });

      toast.dismiss(loadingToast);
      toast.success("Макет успешно создан!");
      setLoading(false);
      router.push("/design/" + result);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Ошибка при создании");
      console.error("Ошибка:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            Создать свой холст
          </DialogTitle>
          <DialogDescription>
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Укажите параметры вашего будущего дизайна
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Название
                  </label>
                  <Input
                    placeholder="Например: Постер для печати"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Ширина (px)
                    </label>
                    <Input
                      type="number"
                      placeholder="500"
                      onChange={(e) => setWidth(Number(e.target.value))}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Высота (px)
                    </label>
                    <Input
                      type="number"
                      placeholder="500"
                      onChange={(e) => setHeight(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button
                  onClick={onCreate}
                  disabled={loading}
                  className="w-full rounded-full py-5 font-bold shadow-lg transition-all active:scale-95"
                >
                  {loading ? (
                    <Loader2Icon className="animate-spin"></Loader2Icon>
                  ) : (
                    "Создать макет"
                  )}
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CustomDialog;
