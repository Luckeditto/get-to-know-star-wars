import "./App.css";
import { useState } from "react";
import Accordion from "./components/Accordion/Accordion";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import Tabs from "./components/Tabs/Tabs";
import FilmCard from "./components/FilmCard/FilmCard";
import Pagination from "./components/Pagination/Pagination";
import Dropdown from "./components/Dropdown/Dropdown";
import { faq, faccoes, filmes, OPCOES_TRILOGIA } from "./data/dados";

const FILMES_POR_PAGINA = 4;

function App() {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [assistidos, setAssistidos] = useState([]);
  const [trilogiaFiltro, setTrilogiaFiltro] = useState("Todas");

  const filmesFiltrados =
    trilogiaFiltro === "Todas"
      ? filmes
      : filmes.filter((filme) => filme.trilogia === trilogiaFiltro);


  const totalPaginas = Math.ceil(filmesFiltrados.length / FILMES_POR_PAGINA);
  const inicio = (paginaAtual - 1) * FILMES_POR_PAGINA;
  const filmesDaPagina = filmesFiltrados.slice(inicio, inicio + FILMES_POR_PAGINA);
  const porcentagemAssistida = (assistidos.length / filmes.length) * 100;

  function alternarAssistido(id) {
    setAssistidos((atual) =>
      atual.includes(id)
        ? atual.filter((idAssistido) => idAssistido !== id)
        : [...atual, id]
    );

  }
  function selecionarTrilogia(valor) {
    setTrilogiaFiltro(valor);
    setPaginaAtual(1);
  }



  return (
    <>
      <header className="cabecalho">
        <h1>Get to Know Star Wars</h1>
        <p>Um guia para quem quer começar a explorar a galáxia.</p>
      </header>

      <main className="conteudo">

        <section aria-labelledby="titulo-faccoes">
          <h2 id="titulo-faccoes">Entenda a galáxia</h2>
          <Tabs abas={faccoes} rotulo="Facções da galáxia" />
        </section>


        <section aria-labelledby="titulo-filmes">
          <h2 id="titulo-filmes">Os filmes</h2>
          <div className="filmes-barra">
            <Dropdown
              rotulo="Trilogia"
              opcoes={OPCOES_TRILOGIA}
              valorSelecionado={trilogiaFiltro}
              aoSelecionar={selecionarTrilogia}
            />
            <p className="filmes-contagem">
              {filmesFiltrados.length} {filmesFiltrados.length === 1 ? "filme" : "filmes"}
            </p>
          </div>


          <ul className="filmes-grade">
            {filmesDaPagina.map((filme) => (
              <li key={filme.id}>
                <FilmCard
                  filme={filme}
                  assistido={assistidos.includes(filme.id)}
                  aoAlternarAssistido={alternarAssistido}
                />
              </li>
            ))}
          </ul>

          <Pagination
            totalPaginas={totalPaginas}
            paginaAtual={paginaAtual}
            aoMudarPagina={setPaginaAtual}
          />
        </section>


        <section aria-labelledby="titulo-maratona">
          <h2 id="titulo-maratona">Sua maratona</h2>
          <p>
            Você assistiu {assistidos.length} de {filmes.length} filmes.
          </p>
          <ProgressBar valor={porcentagemAssistida} rotulo="Filmes assistidos" />
        </section>


        <section aria-labelledby="titulo-faq">
          <h2 id="titulo-faq">Ainda com dúvidas?</h2>
          <Accordion itens={faq} />
        </section>
      </main>

      <footer className="rodape">
        <p>
          Projeto acadêmico de Lucas Araújo. Star Wars é marca registrada da
          Lucasfilm; este site não tem afiliação oficial.
        </p>
      </footer>


    </>
  );
}

export default App;