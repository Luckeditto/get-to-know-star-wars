import { useEffect } from "react";
import "./Toast.css";

const ICONES = {
  sucesso: "✔",
  erro: "✖",
  info: "ℹ",
};

function Toast({ id, tipo = "info", mensagem, aoFechar, duracao = 4000 }) {
  
  useEffect(() => {
    const timer = setTimeout(() => aoFechar(id), duracao);
    return () => clearTimeout(timer); 
  }, [id, aoFechar, duracao]);

  return (
    <div
      className={`toast toast-${tipo}`}
      role={tipo === "erro" ? "alert" : "status"} 
    >
      <span className="toast-icone" aria-hidden="true">
        {ICONES[tipo]}
      </span>
      <p className="toast-mensagem">{mensagem}</p>
      <button
        className="toast-fechar"
        onClick={() => aoFechar(id)}
        aria-label="Fechar notificação"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;