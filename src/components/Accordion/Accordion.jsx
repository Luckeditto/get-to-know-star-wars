import { useState } from "react";
import "./Accordion.css";

function Accordion({ itens = [] }) {
    const [idAberto, setIdAberto] = useState(null);

    function alternar(id) {
        if (id === idAberto) {
            setIdAberto(null);
        } else {
            setIdAberto(id);
        }
    }

    return (
        <div className="accordion">
            {itens.map((item) => {
                const estaAberto = item.id === idAberto;
                const idBotao = `accordion-botao-${item.id}`;
                const idPainel = `accordion-painel-${item.id}`;
                return (
                    <div key={item.id} className='accordion-item'>
                        <h3>
                            <button
                            id={idBotao} 
                            onClick={() => alternar(item.id)}
                            aria-expanded={estaAberto}
                            aria-controls={idPainel}
                            >
                                {item.titulo}
                            </button>
                        </h3>

                        <div 
                        id={idPainel}
                        role="region"
                        aria-labelledby={idBotao}
                        aria-hidden={!estaAberto}
                        className={
                            estaAberto ? 'accordion-painel accordion-painel-open' 
                            : 'accordion-painel'}
                        >
                            {item.conteudo}
                        </div>

                    </div>
                )
            }
            )}
        </div>
    )
}

export default Accordion;