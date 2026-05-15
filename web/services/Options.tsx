import { Folder, Home, LayoutDashboard, Wallet } from "lucide-react";

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
    name: 'Billing',
    icon: Wallet,
    path: '/workspace/billing'
  }
]

export const SizeOption = [
  {
    name: 'Кружка 125мм',
    width: 170,
    height: 170,
    img: '/cup.png',
  },
  {
    name: 'Значек 45мм',
    width: 170,
    height: 170,
    img: '/45.png',
  },
  {
    name: 'Значек 56мм',
    width: 211,
    height: 211,
    img: '/56.png',
  },
  {
    name: 'Свой размер',
    width: 0,
    height: 0,
    img: '/papyre.png',
  },
]