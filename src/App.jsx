import './App.css'
import Accordion from './components/Accordion/Accordion'
import Dropdown from './components/Dropdown/Dropdown'
import {faq} from './data/dados'
function App() {


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
      </main>

      <footer>

      </footer>
    </>
    
  )
}

export default App
