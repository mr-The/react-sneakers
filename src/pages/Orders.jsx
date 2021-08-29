import { useState, useEffect } from 'react'
import axios from 'axios'

import Card from '../components/Card'

function Orders({ onAddToFavorite, toggleAddRemoveToCart }) {
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])
  const [sorting, setSorting] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(
          'https://60ec7cdda78dc700178adb81.mockapi.io/orders'
        )
        setOrders(data.reverse())
        setLoading(false)
      } catch (err) {
        alert('Error loading data')
      }
    })()
  }, [])

  const handleSorting = () => {
    setSorting(!sorting)
    setOrders(orders.reverse())
  }

  const renderBlock = (items) => {
    const totalSum = items.items.reduce((acc, item) => {
      return acc + item.price
    }, 0)

    return (
      <div className="order-block" key={items.id}>
        <div className="order-title">
          <h3>Заказ #{items.id}</h3>
          <p>на сумму: {totalSum} руб.</p>
        </div>
        {items.items.map((item) => (
          <Card
            key={item.id}
            {...item}
            onFavorite={onAddToFavorite}
            toggleAddRemoveToCart={toggleAddRemoveToCart}
            loading={loading}
          />
        ))}
        <hr width="100%" />
      </div>
    )
  }

  return (
    <div className="content p-20">
      <div className="d-flex justify-between mb-40 align-center  flex-wrap">
        <h1>Мои заказы</h1>
        <p>
          Сортировка: &nbsp;
          <span onClick={handleSorting}>
            {sorting ? 'Сначала новые' : 'Сначала старые'}
          </span>
        </p>
      </div>
      <hr />

      <div className="content-items d-flex flex-wrap">
        {loading
          ? [...Array(4)].map((item, index) => (
              <Card key={index} {...item} loading={loading} />
            ))
          : orders.map((items) => renderBlock(items))}
      </div>
    </div>
  )
}

export default Orders
