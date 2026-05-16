import { createContext, Dispatch, SetStateAction } from "react";

interface CanvasContextType {
  canvasEditor: any;
  setCanvasEditor: Dispatch<SetStateAction<any>>;
}

export const CanvasContext = createContext<CanvasContextType | undefined>(undefined);