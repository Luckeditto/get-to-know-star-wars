import { useState, useRef } from "react";
import "./Tabs.css";

function Tabs({ abas = [], rotulo = "Abas" }) {
    const [abaAtiva, setAbaAtiva] = useState(abas[0]?.id);

    const refsBotoes = useRef([]);

    function lidarComTeclado(evento, indiceAtual) {
        let novoIndice = null;

        if (evento.key === "ArrowRight") {
            novoIndice = (indiceAtual + 1) % abas.length;
        } else if (evento.key === "ArrowLeft") {
            novoIndice = (indiceAtual - 1 + abas.length) % abas.length;
        } else if (evento.key === "Home") {
            novoIndice = 0;
        } else if (evento.key === "End") {
            novoIndice = abas.length - 1;
        }

        if (novoIndice === null) return;

        evento.preventDefault();
        setAbaAtiva(abas[novoIndice].id);
        refsBotoes.current[novoIndice]?.focus();
    }

    return (
        <div className="tabs">
            
            <div role="tablist" aria-label={rotulo} className="tabs-lista">
                {abas.map((aba, indice) => {
                    const estaAtiva = aba.id === abaAtiva;
                    return (
                        <button
                            key={aba.id}
                            ref={(elemento) => (refsBotoes.current[indice] = elemento)}
                            id={`aba-${aba.id}`}
                            role="tab"
                            aria-selected={estaAtiva}
                            aria-controls={`painel-aba-${aba.id}`}
                            tabIndex={estaAtiva ? 0 : -1} // Tab entra só na aba ativa; as setas trocam
                            className={estaAtiva ? "tabs-botao tabs-botao-ativo" : "tabs-botao"}
                            onClick={() => setAbaAtiva(aba.id)}
                            onKeyDown={(evento) => lidarComTeclado(evento, indice)}
                        >
                            {aba.rotulo}
                        </button>
                    );
                })}
            </div>

            {/* ===== PAINÉIS: o conteúdo de cada aba; só o ativo aparece ===== */}
            {abas.map((aba) => (
                <div
                    key={aba.id}
                    id={`painel-aba-${aba.id}`}
                    role="tabpanel"
                    aria-labelledby={`aba-${aba.id}`}
                    hidden={aba.id !== abaAtiva}
                    tabIndex={0}
                    className="tabs-painel"
                >
                    <p>{aba.conteudo}</p>
                </div>
            ))}
        </div>
    );

}

export default Tabs;