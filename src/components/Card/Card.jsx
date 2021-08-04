import { useState } from 'react'

import styles from './Card.module.scss'

function Card({
  id,
  title,
  imageUrl,
  price,
  onFavorite,
  cartItems,
  toggleAddRemoveToCart,
  favorite = false,
}) {
  const checkCartItemsId = () => {
    if (cartItems.find((item) => item.productId === id)) {
      return cartItems.find((item) => item.productId === id).id
    }
    return null
  }

  const cartItemsId = checkCartItemsId()

  const [isAdded, setIsAdded] = useState(cartItemsId ? true : false)

  const [isFavorite, setIsFavorite] = useState(favorite)

  const onClickPlus = () => {
    toggleAddRemoveToCart({ id, cartItemsId, title, imageUrl, price })
    setIsAdded(!isAdded)
  }

  const onClickFavorite = () => {
    onFavorite({ productId: id, title, imageUrl, price })
    setIsFavorite(!isFavorite)
  }

  return (
    <div className={styles.card}>
      <div onClick={onClickFavorite} className={styles.favorite}>
        <img
          src={isFavorite ? '/img/like.svg' : '/img/unlike.svg'}
          alt="Like"
        />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Model 1" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
          alt="Plus"
        />
      </div>
    </div>
  )
}

export default Card
