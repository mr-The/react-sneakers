import { useState, useEffect, createContext } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'

import Header from './components/Header'
import Drawer from './components/Drawer'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Orders from './pages/Orders'

export const AppContext = createContext({})

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [cardOpened, setCardOpened] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)

        const cartItems = await axios.get(
          'https://60ec7cdda78dc700178adb81.mockapi.io/cart'
        )

        const favorites = await axios.get(
          'https://60ec7cdda78dc700178adb81.mockapi.io/favorites'
        )

        const items = await axios.get(
          'https://60ec7cdda78dc700178adb81.mockapi.io/items'
        )

        setCartItems(cartItems.data)
        setFavorites(favorites.data)
        setItems(items.data)
        setLoading(false)
      } catch (err) {
        alert('Error loading data')
      }
    }
    fetchData()
  }, [])

  const sum = cartItems.reduce((acc, item) => acc + Number(item.price), 0)

  const onAddToCart = async (obj) => {
    try {
      const res = await axios.post(
        'https://60ec7cdda78dc700178adb81.mockapi.io/cart/',
        obj
      )
      setCartItems((prev) => [...prev, res.data])
    } catch (err) {
      alert('Не удалось добавить в корзину..')
    }
  }

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://60ec7cdda78dc700178adb81.mockapi.io/cart/${id}`)
      setCartItems((prev) => prev.filter((item) => +item.id !== +id))
    } catch (err) {
      alert('Не удалось удалить из корзины..')
    }
  }

  const toggleAddRemoveToCart = (obj) => {
    if (obj.cartItemsId) {
      onRemoveItem(obj.cartItemsId)
    } else {
      onAddToCart({
        productId: obj.productId,
        title: obj.title,
        imageUrl: obj.imageUrl,
        price: obj.price,
      })
    }
  }

  const checkCartItemsId = (id) => {
    if (cartItems.find((item) => Number(item.productId) === Number(id))) {
      return +cartItems.find((item) => Number(item.productId) === Number(id)).id
    }
    return null
  }

  const onAddToFavorite = async (obj) => {
    try {
      const favorite = favorites.find(
        (favObj) => Number(favObj.productId) === Number(obj.productId)
      )
      if (favorite) {
        axios.delete(
          `https://60ec7cdda78dc700178adb81.mockapi.io/favorites/${favorite.id}`
        )
        setFavorites((prev) =>
          prev.filter((item) => item.productId !== obj.productId)
        )
      } else {
        const sendObj = {
          productId: obj.productId,
          title: obj.title,
          imageUrl: obj.imageUrl,
          price: obj.price,
        }
        const { data } = await axios.post(
          'https://60ec7cdda78dc700178adb81.mockapi.io/favorites',
          sendObj
        )
        setFavorites((prev) => {
          return [...prev, data]
        })
      }
    } catch (err) {
      alert('Не удалось добавить в закладки..')
    }
  }

  const isFavoriteItem = (id) => {
    const isFavorite = favorites.some((obj) => obj.productId === id)
    return isFavorite
  }
  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  }

  return (
    <AppContext.Provider
      value={{
        items,
        favorites,
        checkCartItemsId,
        isFavoriteItem,
        setCardOpened,
      }}
    >
      <div className="wrapper clear">
        {cardOpened && (
          <Drawer
            cartItems={cartItems}
            sum={sum}
            onClose={() => setCardOpened(false)}
            onRemoveItem={onRemoveItem}
          />
        )}
        <Header sum={sum} onClickCart={() => setCardOpened(true)} />

        <Route path="/" exact>
          <Home
            searchValue={searchValue}
            onChangeSearchInput={onChangeSearchInput}
            setSearchValue={setSearchValue}
            toggleAddRemoveToCart={toggleAddRemoveToCart}
            onAddToFavorite={onAddToFavorite}
            loading={loading}
          />
        </Route>
        <Route path="/favorites" exact>
          <Favorites
            onAddToFavorite={onAddToFavorite}
            toggleAddRemoveToCart={toggleAddRemoveToCart}
            loading={loading}
          />
        </Route>
        <Route path="/orders" exact>
          <Orders
            onAddToFavorite={onAddToFavorite}
            toggleAddRemoveToCart={toggleAddRemoveToCart}
          />
        </Route>
      </div>
    </AppContext.Provider>
  )
}

export default App
