import { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'

import Header from './components/Header'
import Card from './components/Card'
import Drawer from './components/Drawer'

function App() {
  const [items, setItems] = useState()
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [cardOpened, setCardOpened] = useState(false)

  useEffect(() => {
    axios
      .get('https://60ec7cdda78dc700178adb81.mockapi.io/items')
      .then((res) => setItems(res.data))

    axios
      .get('https://60ec7cdda78dc700178adb81.mockapi.io/cart')
      .then((res) => setCartItems(res.data))
  }, [])

  const onAddToCart = (obj) => {
    axios.post('https://60ec7cdda78dc700178adb81.mockapi.io/cart/', obj)
    setCartItems((prev) => [...prev, obj])
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://60ec7cdda78dc700178adb81.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const onAddToFavorite = (obj) => {
    axios.post('https://60ec7cdda78dc700178adb81.mockapi.io/favorites', obj)
    setFavorites((prev) => [...prev, obj])
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className="wrapper clear">
      {cardOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCardOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      <Header onClickCart={() => setCardOpened(true)} />

      <Route path="/favorites">fdz</Route>

      <div className="content p-20">
        <div className="d-flex justify-between mb-40 align-center  flex-wrap">
          {searchValue ? (
            <h2>Поиск по запросу: "{searchValue}"</h2>
          ) : (
            <h1>Все кроссовки</h1>
          )}

          <div className="search-block">
            <img src="/img/search.svg" alt="Search" />
            <input
              onChange={onChangeSearchInput}
              value={searchValue}
              placeholder="Поиск..."
            />
            {searchValue && (
              <img
                src="/img/btn-remove.svg"
                alt="Clear"
                className="clear removeBtn"
                onClick={() => setSearchValue('')}
              />
            )}
          </div>
        </div>

        <div className="content-items d-flex flex-wrap">
          {items &&
            items
              .filter((item) =>
                item.title.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((item, index) => (
                <Card
                  key={index}
                  title={item.title}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  onFavorite={onAddToFavorite}
                  onPlus={onAddToCart}
                />
              ))}
        </div>
      </div>
    </div>
  )
}

export default App
