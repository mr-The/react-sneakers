import Header from './components/Header'
import Card from './components/Card'
import Drawer from './components/Drawer'

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />

      <div className="content p-40">
        <div className="d-flex justify-between mb-40 align-center">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="content-items d-flex flex-wrap justify-between">
          <Card />
        </div>
      </div>
    </div>
  )
}

export default App
