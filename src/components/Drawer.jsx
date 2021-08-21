import { useState } from 'react'
import axios from 'axios'

import Info from './Info'

function Drawer({ cartItems, sum, onClose, onRemoveItem }) {
  let createdOrder

  const onClickOverlay = (e) => {
    if (e.target.className === 'overlay') {
      onClose()
    }
  }

  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      createdOrder = await axios
        .post('https://60ec7cdda78dc700178adb81.mockapi.io/orders', {
          items: cartItems,
        })
        .then((res) => res.data)

      setOrderId(createdOrder.id)
      for (const i in cartItems) {
        onRemoveItem(cartItems[i].id)
      }

      setOrderComplete(true)
    } catch (err) {
      alert('Не удалось оформить заказ..')
    }
    setIsLoading(false)
  }

  return (
    <div className="overlay" onClick={onClickOverlay}>
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img
            src="/img/btn-remove.svg"
            alt="Close"
            className="cu-p"
            onClick={onClose}
          />
        </h2>

        {cartItems.length ? (
          <div className="order-cart">
            <div className="items">
              {cartItems &&
                cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="cartItem d-flex align-center mb-20"
                  >
                    <div
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                      className="cartItemImg"
                    ></div>
                    <div className="mr-20 flex">
                      <p className="mb-5">{item.title}</p>
                      <b>{item.price} руб.</b>
                    </div>
                    <img
                      src="/img/btn-remove.svg"
                      alt="Remove"
                      className="removeBtn"
                      onClick={() => onRemoveItem(item.id)}
                    />
                  </div>
                ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{sum} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{(sum * 0.05).toFixed()} руб.</b>
                </li>
              </ul>

              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={orderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={
              orderComplete
                ? `Ваш заказ #${orderId} скоро будет отправлен.`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ!'
            }
            image={
              orderComplete ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'
            }
          />
        )}
      </div>
    </div>
  )
}

export default Drawer
