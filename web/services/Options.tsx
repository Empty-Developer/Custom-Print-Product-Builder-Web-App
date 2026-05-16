import { AppWindow, Brush, Folder, Home, Image, LayoutDashboard, Settings, ShapesIcon, Sparkle, Text, Wallet } from "lucide-react";
import BackgroundSetting from "./Components/BackgroundSetting";

export const WorkspaceMenu = [
  {
    name: 'Главная',
    icon: Home,
    path: '/workspace'
  },
  {
    name: 'Проекты',
    icon: Folder,
    path: '/workspace/projects'
  },
  {
    name: 'Шаблоны',
    icon: LayoutDashboard,
    path: '/workspace/template'
  },
  {
    name: 'Товары',
    icon: Wallet,
    path: '/workspace/billing'
  }
]

export const SizeOption = [
  {
    name: 'Кружка 200мм',
    width: 756,
    height: 756,
    img: '/cup.png',
    img2: '/fff.png'
  },
  {
    name: 'Значек 45мм',
    width: 170,
    height: 170,
    img: '/45.png',
    img2: '/ff.png'
  },
  {
    name: 'Значек 56мм',
    width: 211,
    height: 211,
    img: '/56.png',
    img2: '/ff.png'
  },
  {
    name: 'Свой размер',
    width: 0,
    height: 0,
    img: '/papyre.png',
  },
]

export const sideBarOptions = [
  {
    name: "Шаблоны",
    icon: AppWindow,
  },
  {
    name: "Элементы",
    icon: ShapesIcon,
  },
  {
    name: "Изоброжения",
    icon: Image,
  },
  {
    name: "Текст",
    icon: Text,
  },
  {
    name: "AI",
    icon: Sparkle,
  },
  {
    name: "Заливка",
    icon: Brush,
    component: () => <BackgroundSetting />,
  },
  {
    name: "Настройки",
    icon: Settings,
  },
]