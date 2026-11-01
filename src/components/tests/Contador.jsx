import { useState } from "react";

function Contador(){
    const [valor,setValor] = useState(0);

    return (
        <div>
            <p>Cliques: {valor}</p>
            <button onClick={() => setValor(valor + 1)}>
                Somar
            </button>
        </div>
    )
}

export default Contador;