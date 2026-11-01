import './App.css'
import { useState, useEffect } from 'react'
import Accordion from './components/Accordion/Accordion'
import Dropdown from './components/Dropdown/Dropdown'
import ProgressBar from './components/ProgressBar/ProgressBar'
import {faq} from './data/dados'
function App() {
  const [progresso, setProgresso] = useState(0);
  const [saltando, setSaltando] = useState(false);


  useEffect(() => {
    if(!saltando) return;

    const id = setInterval(() => {
      setProgresso((atual) => Math.min(atual + 5,100));
    }, 150);
    
    return () => clearInterval(id);
  }, [saltando]);

  useEffect(() => {
    if (progresso >= 100){
      setSaltando(false);
    }
  }, [progresso]);

  function iniciarSalto(){
    setProgresso(0);
    setSaltando(true);
  }

  let textoBotao = "Iniciar salto";
  if (saltando) textoBotao = "Calculando rota...";
  else if (progresso === 100) textoBotao = "Saltar de novo";

  
  return (
    <>
      <header className='cabecalho'>
        <h1>Get to know Star Wars</h1>
        <Dropdown/>
      </header>
      
      <main className='conteudo'>
        <section aria-labelledby='titulo-faq'>
          <h2 id='titulo-faq'>Perguntas Frequentes</h2>
          <Accordion itens={faq}/>
        </section>

        <section aria-labelledby='titulo-hiperespaco'>
          <h2 id='titulo-hiperespaco'>Salto para o hiperespaço</h2>
          <ProgressBar valor={progresso} rotulo='Carregando o hiperdrive' />
          <button className='botao' onClick={iniciarSalto} disabled={saltando}>
            {textoBotao}
          </button>
        </section>
      </main>

      <footer>

      </footer>
    </>
    
  )
}

export default App
