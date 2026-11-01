import './App.css'
import { useState, useEffect } from 'react'
import Accordion from './components/Accordion/Accordion'
import Dropdown from './components/Dropdown/Dropdown'
import ProgressBar from './components/ProgressBar/ProgressBar'
import Tabs from "./components/Tabs/Tabs";
import { faq, faccoes } from './data/dados'
function App() {
  const [progresso, setProgresso] = useState(0);
  const [saltando, setSaltando] = useState(false);


  useEffect(() => {
    if (!saltando) return;

    const id = setInterval(() => {
      setProgresso((atual) => Math.min(atual + 5, 100));
    }, 150);

    return () => clearInterval(id);
  }, [saltando]);

  useEffect(() => {
    if (progresso >= 100) {
      setSaltando(false);
    }
  }, [progresso]);

  function iniciarSalto() {
    setProgresso(0);
    setSaltando(true);
  }

  let textoBotao = "Iniciar salto";
  if (saltando) textoBotao = "Calculando rota...";
  else if (progresso === 100) textoBotao = "Saltar de novo";


  return (
  <>
    <header className="cabecalho">
      <h1>Get to Know Star Wars</h1>
      <p>Um guia para quem quer começar a explorar a galáxia.</p>
    </header>

    <main className="conteudo">
      {/* 1. Quem é quem */}
      <section aria-labelledby="titulo-faccoes">
        <h2 id="titulo-faccoes">Entenda a galáxia</h2>
        <Tabs abas={faccoes} rotulo="Facções da galáxia" />
      </section>

      {/* 2. Escolher o que assistir */}
      <section aria-labelledby="titulo-filmes">
        <h2 id="titulo-filmes">Os filmes</h2>
        {/* Dropdown (filtro por trilogia) */}
        {/* Cards dos filmes da página atual, com botão "Marcar como assistido" */}
        {/* Pagination */}
      </section>

      {/* 3. Acompanhar o progresso */}
      <section aria-labelledby="titulo-maratona">
        <h2 id="titulo-maratona">Sua maratona</h2>
        {/* <ProgressBar valor={porcentagemAssistida} rotulo="Filmes assistidos" /> */}
      </section>

      {/* 4. Dúvidas */}
      <section aria-labelledby="titulo-faq">
        <h2 id="titulo-faq">Ainda com dúvidas?</h2>
        <Accordion itens={faq} />
      </section>
    </main>

    <footer>{/* créditos */}</footer>

    {/* Toasts ficam aqui, fixos no canto da tela */}
  </>
);
}

export default App
