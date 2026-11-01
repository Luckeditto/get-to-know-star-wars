import { createContext, useContext } from "react";

export const ToastContext = createContext(null);

export function useToast() {
  const contexto = useContext(ToastContext);
  if (!contexto) {
    throw new Error("useToast precisa ser usado dentro de <ToastProvider>");
  }
  return contexto;
}