import { useState, useCallback } from "react";
import { ToastContext } from "./ToastContext";
import Toast from "../components/Toast/Toast";

export function ToastProvider({ children }) {

  const [toasts, setToasts] = useState([]);


  const removerToast = useCallback((id) => {
    setToasts((atual) => atual.filter((toast) => toast.id !== id));
  }, []);

  const mostrarToast = useCallback((tipo, mensagem) => {
    const id = crypto.randomUUID(); // id único
    setToasts((atual) => [...atual, { id, tipo, mensagem }]);
  }, []);

  return (
    <ToastContext.Provider value={{ mostrarToast }}>
      {children}
      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            tipo={toast.tipo}
            mensagem={toast.mensagem}
            aoFechar={removerToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}