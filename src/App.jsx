import { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'

import Header from './components/Header'
import Home from './pages/Home'
import Drawer from './components/Drawer'
import Favorites from './pages/Favorites'

function App() {
  const [items, setItems] = useState()
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [cardOpened, setCardOpened] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const items = await axios.get(
          'https://60ec7cdda78dc700178adb81.mockapi.io/items'
        )

        const cartItems = await axios.get(
          'https://60ec7cdda78dc700178adb81.mockapi.io/cart'
        )

        const favorites = await axios.get(
          'https://60ec7cdda78dc700178adb81.mockapi.io/favorites'
        )

        setCartItems(cartItems.data)
        setFavorites(favorites.data)
        setItems(items.data)
      } catch (err) {
        alert('Error loading data')
      }
    }
    fetchData()
  }, [])

  const sum = cartItems.reduce((acc, item) => acc + Number(item.price), 0)

  const onAddToCart = async (obj) => {
    const res = await axios.post(
      'https://60ec7cdda78dc700178adb81.mockapi.io/cart/',
      obj
    )
    setCartItems((prev) => [...prev, res.data])
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://60ec7cdda78dc700178adb81.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const toggleAddRemoveToCart = (obj) => {
    if (obj.cartItemsId) {
      onRemoveItem(obj.cartItemsId)
    } else {
      onAddToCart({
        productId: obj.id,
        title: obj.title,
        imageUrl: obj.imageUrl,
        price: obj.price,
      })
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      const favorite = favorites.find(
        (favObj) => Number(favObj.productId) === Number(obj.productId || obj.id)
      )
      if (favorite) {
        axios.delete(
          `https://60ec7cdda78dc700178adb81.mockapi.io/favorites/${favorite.id}`
        )
        setFavorites((prev) =>
          prev.filter((item) => item.productId !== obj.productId)
        )
        console.log(favorite && favorite.id, obj, favorites)
      } else {
        const { data } = await axios.post(
          'https://60ec7cdda78dc700178adb81.mockapi.io/favorites',
          obj
        )
        setFavorites((prev) => {
          return [...prev, data]
        })
      }
    } catch (err) {
      alert('Не удалось добавить в закладки..')
    }
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className="wrapper clear">
      {cardOpened && (
        <Drawer
          items={cartItems}
          sum={sum}
          onClose={() => setCardOpened(false)}
          onRemoveItem={onRemoveItem}
        />
      )}
      <Header sum={sum} onClickCart={() => setCardOpened(true)} />

      <Route path="/" exact>
        <Home
          items={items}
          searchValue={searchValue}
          onChangeSearchInput={onChangeSearchInput}
          setSearchValue={setSearchValue}
          toggleAddRemoveToCart={toggleAddRemoveToCart}
          cartItems={cartItems}
          onAddToFavorite={onAddToFavorite}
          favorites={favorites}
        />
      </Route>
      <Route path="/favorites" exact>
        <Favorites
          items={favorites}
          onAddToFavorite={onAddToFavorite}
          toggleAddRemoveToCart={toggleAddRemoveToCart}
          cartItems={cartItems}
        />
      </Route>
    </div>
  )
}

export default App
