import { useContext, useState } from 'react'
import ContentLoader from 'react-content-loader'

import { AppContext } from '../../App'
import styles from './Card.module.scss'

import { buttonClickAnimate } from '../../utils/buttonClickAnimate'

function Card({
  productId,
  title,
  imageUrl,
  price,
  onFavorite,
  toggleAddRemoveToCart,
  loading = false,
}) {
  const { checkCartItemsId, isFavoriteItem } = useContext(AppContext)

  const cartItemsId = checkCartItemsId && checkCartItemsId(productId)
  const favorite = isFavoriteItem(productId)

  const [modal, setModal] = useState(false)

  const onClickPlus = (e) => {
    buttonClickAnimate(e)
    e.stopPropagation()
    toggleAddRemoveToCart({
      productId,
      cartItemsId,
      title,
      imageUrl,
      price,
    })
  }

  const onClickFavorite = (e) => {
    buttonClickAnimate(e)
    e.stopPropagation()
    onFavorite({ productId, title, imageUrl, price })
  }

  const closeModal = (e) => {
    if (e.target.className === 'overlay' || 'close') {
      setModal(!modal)
    }
  }

  const Loader = () => (
    <ContentLoader
      speed={2}
      width={230}
      height={265}
      viewBox="0 0 230 265"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
      <rect x="0" y="167" rx="4" ry="4" width="155" height="15" />
      <rect x="0" y="187" rx="4" ry="4" width="100" height="15" />
      <rect x="0" y="234" rx="4" ry="4" width="80" height="32" />
      <rect x="123" y="234" rx="10" ry="10" width="32" height="32" />
    </ContentLoader>
  )

  const ModalPopup = () => {
    return (
      <div className="overlay" onClick={closeModal}>
        <div className={styles.modal}>
          <div>
            <div onClick={onClickFavorite} className={styles.favorite}>
              <img
                data-type="shadow"
                src={favorite ? '/img/like.svg' : '/img/unlike.svg'}
                alt="Like"
              />
            </div>
            <img width="266px" height="224px" src={imageUrl} alt={title} />
          </div>

          <div className={styles.description}>
            <span className={`close ${styles.close}`}>&times;</span>
            <h3>{title}</h3>
            <p>
              Описание: <br /> {title}
            </p>
            <div
              className="d-flex justify-between align-center"
              style={{ flex: 1 }}
            >
              <div className="d-flex flex-column">
                <span>
                  Цена: <b>{price} руб.</b>
                </span>
              </div>
              <img
                data-type="line"
                className={styles.plus}
                onClick={onClickPlus}
                src={cartItemsId ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
                alt="Plus"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {modal && ModalPopup()}

      <div
        onClick={() => {
          setModal(true)
        }}
        className={styles.card}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <div onClick={onClickFavorite} className={styles.favorite}>
              <img
                data-type="shadow"
                src={favorite ? '/img/like.svg' : '/img/unlike.svg'}
                alt="Like"
              />
            </div>
            <img width="100%" height="100%" src={imageUrl} alt={title} />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{price} руб.</b>
              </div>
              <img
                data-type="line"
                className={styles.plus}
                onClick={onClickPlus}
                src={cartItemsId ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
                alt="Plus"
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Card
