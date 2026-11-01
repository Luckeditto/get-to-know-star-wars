import "./Pagination.css";

function Pagination({ totalPaginas, paginaAtual, aoMudarPagina }) {

  if (totalPaginas <= 1) return null;

  const numeros = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <nav className="pagination" aria-label="Paginação dos filmes">
      <button
        className="pagination-botao"
        onClick={() => aoMudarPagina(paginaAtual - 1)}
        disabled={paginaAtual === 1}
      >
        ‹ Anterior
      </button>

      {numeros.map((numero) => {
        const ehAtual = numero === paginaAtual;
        return (
          <button
            key={numero}
            className={ehAtual ? "pagination-botao pagination-botao-atual" : "pagination-botao"}
            onClick={() => aoMudarPagina(numero)}
            aria-current={ehAtual ? "page" : undefined}
            aria-label={`Ir para a página ${numero}`}
          >
            {numero}
          </button>
        );
      })}

      <button
        className="pagination-botao"
        onClick={() => aoMudarPagina(paginaAtual + 1)}
        disabled={paginaAtual === totalPaginas}
      >
        Próxima ›
      </button>
    </nav>
  );
}

export default Pagination;