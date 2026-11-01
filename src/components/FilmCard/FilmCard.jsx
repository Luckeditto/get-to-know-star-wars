import "./FilmCard.css";
import { useToast } from "../../context/ToastContext";

function FilmCard({ filme, assistido, aoAlternarAssistido }) {
  const { mostrarToast } = useToast();

  function lidarComClique() {
    aoAlternarAssistido(filme.id);
    if (assistido) {
      mostrarToast("info", `"${filme.titulo}" saiu da sua maratona.`);
    } else {
      mostrarToast("sucesso", `"${filme.titulo}" marcado como assistido!`);
    }
  }

  return (
    <article className={assistido ? "film-card film-card-assistido" : "film-card"}>
      <p className="film-card-etiqueta">
        {filme.episodio ? `Episódio ${filme.episodio}` : "Derivado"}
      </p>
      <h3 className="film-card-titulo">{filme.titulo}</h3>
      <p className="film-card-info">
        {filme.ano} · {filme.diretor}
      </p>
      <p className="film-card-sinopse">{filme.sinopse}</p>

      {/* aria-pressed: informa ao leitor de tela se o botão está "ligado" */}
      <button className="botao" aria-pressed={assistido} onClick={lidarComClique}>
        {assistido ? "✔ Assistido" : "Marcar como assistido"}
      </button>
    </article>
  );
}

export default FilmCard;