import {
  AppWindow,
  Brush,
  Folder,
  Home,
  Image,
  LayoutDashboard,
  Settings,
  ShapesIcon,
  Sparkle,
  Text,
  Wallet,
} from "lucide-react";
import BackgroundSetting from "./Components/BackgroundSetting";
import AddImageSetting from "./Components/AddImageSetting";
import Elements from "./Components/Elements";

export const WorkspaceMenu = [
  {
    name: "Главная",
    icon: Home,
    path: "/workspace",
  },
  {
    name: "Проекты",
    icon: Folder,
    path: "/workspace/projects",
  },
  {
    name: "Шаблоны",
    icon: LayoutDashboard,
    path: "/workspace/template",
  },
];

export const SizeOption = [
  {
    name: "Кружка 200мм",
    width: 567,
    height: 280,
    img: "/cup.png",
    img2: "/fff.png",
  },
  {
    name: "Значек 45мм",
    width: 170,
    height: 170,
    img: "/45.png",
    img2: "/ff.png",
  },
  {
    name: "Значек 56мм",
    width: 211,
    height: 211,
    img: "/56.png",
    img2: "/ff.png",
  },
  {
    name: "Свой размер",
    width: 0,
    height: 0,
    img: "/papyre.png",
  },
];

export const sideBarOptions = [
  {
    name: "Элементы",
    icon: ShapesIcon,
    component: () => <Elements />,
  },
  {
    name: "Изоброжения",
    icon: Image,
    component: () => <AddImageSetting />,
  },
  {
    name: "Текст",
    icon: Text,
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
];

export const ShapeList = [
  {
    name: "Круг",
    icon: "/circle.png",
    type: "circle",
  },
  {
    name: "Квадрат",
    icon: "/sqaure.png",
    type: "rect",
  },
  {
    name: "Треугольник",
    icon: "/trangle.png",
    type: "triangle",
  },
  {
    name: "Линия",
    icon: "/line.png",
    type: "line",
  },
];
