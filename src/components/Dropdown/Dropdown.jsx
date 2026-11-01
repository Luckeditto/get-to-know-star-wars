import { useState, useEffect, useRef } from "react";
import "./Dropdown.css";

function Dropdown({ rotulo, opcoes = [], valorSelecionado, aoSelecionar }) {
  const [aberto, setAberto] = useState(false);

  const dropdownRef = useRef(null);
  const botaoRef = useRef(null);
  const opcoesRef = useRef([]);

  const opcaoAtual = opcoes.find((opcao) => opcao.valor === valorSelecionado);

  
  useEffect(() => {
    if (!aberto) return;

    function lidarComCliqueFora(evento) {
      if (dropdownRef.current && !dropdownRef.current.contains(evento.target)) {
        setAberto(false);
      }
    }

    function lidarComEsc(evento) {
      if (evento.key === "Escape") {
        setAberto(false);
        botaoRef.current?.focus(); 
      }
    }

    document.addEventListener("mousedown", lidarComCliqueFora);
    document.addEventListener("keydown", lidarComEsc);

    
    return () => {
      document.removeEventListener("mousedown", lidarComCliqueFora);
      document.removeEventListener("keydown", lidarComEsc);
    };
  }, [aberto]);

  
  useEffect(() => {
    if (!aberto) return;
    const indice = opcoes.findIndex((opcao) => opcao.valor === valorSelecionado);
    opcoesRef.current[indice >= 0 ? indice : 0]?.focus();
  }, [aberto]);

  function selecionar(valor) {
    aoSelecionar(valor);
    setAberto(false);
    botaoRef.current?.focus();
  }

 
  function lidarComTecladoNasOpcoes(evento, indice) {
    if (evento.key === "ArrowDown") {
      evento.preventDefault();
      opcoesRef.current[(indice + 1) % opcoes.length]?.focus();
    } else if (evento.key === "ArrowUp") {
      evento.preventDefault();
      opcoesRef.current[(indice - 1 + opcoes.length) % opcoes.length]?.focus();
    } else if (evento.key === "Tab") {
      setAberto(false);
    }
  }

  return (
    <div className="dropdown" ref={dropdownRef}>
      
      <button
        ref={botaoRef}
        className="dropdown-gatilho"
        aria-haspopup="true"
        aria-expanded={aberto}
        onClick={() => setAberto((estavaAberto) => !estavaAberto)}
      >
        {rotulo}: <strong>{opcaoAtual?.rotulo}</strong>
        <span className="dropdown-seta" aria-hidden="true">▾</span>
      </button>

      
      {aberto && (
        <ul className="dropdown-menu" role="menu" aria-label={rotulo}>
          {opcoes.map((opcao, indice) => {
            const selecionada = opcao.valor === valorSelecionado;
            return (
              <li key={opcao.valor} role="none">
                <button
                  ref={(elemento) => (opcoesRef.current[indice] = elemento)}
                  role="menuitemradio"
                  aria-checked={selecionada}
                  className={
                    selecionada
                      ? "dropdown-opcao dropdown-opcao-selecionada"
                      : "dropdown-opcao"
                  }
                  onClick={() => selecionar(opcao.valor)}
                  onKeyDown={(evento) => lidarComTecladoNasOpcoes(evento, indice)}
                >
                  {opcao.rotulo}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;