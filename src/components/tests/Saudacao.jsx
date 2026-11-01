function Saudacao({ nome, idade = 22 }){
    return (
        <p>
            Olá, {nome}, você tem {idade} anos.
        </p>
    )
}

export default Saudacao;