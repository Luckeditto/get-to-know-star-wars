import "./ProgressBar.css";

function ProgressBar({ valor = 0, rotulo = "Progresso"}){
    const valorSeguro = Math.min(100,Math.max(0,valor));
    const porcentagem = Math.round(valorSeguro);



    return (
        <div className="progress">
            <div className="progress-info">
                <span>{rotulo}</span>
                <span>{porcentagem}%</span>
            </div>

            <div
            className="progress-trilho"
            role="progressbar"
            aria-label={rotulo}
            aria-valuenow={porcentagem}
            aria-valuemin={0}
            aria-valuemax={100}
            >
                {
                    <div className="progress-preenchimento"
                    style={ {width: `${valorSeguro}%`}}
                    />
                }
            </div>
        </div>
    )
}

export default ProgressBar;