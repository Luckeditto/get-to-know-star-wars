import "./FilmCard.css";

function FilmCard({ filme, assistido, aoAlternarAssistido }) {
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

      <button
        className="botao"
        aria-pressed={assistido}
        onClick={() => aoAlternarAssistido(filme.id)}
      >
        {assistido ? "✔ Assistido" : "Marcar como assistido"}
      </button>
    </article>
  );
}

export default FilmCard;