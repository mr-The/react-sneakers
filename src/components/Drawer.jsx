function Drawer({ items, onClose, onRemove }) {
  const onClickOverlay = (e) => {
    if (e.target.className === 'overlay') {
      onClose()
    }
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

        {items.length ? (
          <div className="order-cart">
            <div className="items">
              {items &&
                items.map((item, index) => (
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
                      onClick={() => onRemove(item.id)}
                    />
                  </div>
                ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>21 498 руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 руб.</b>
                </li>
              </ul>

              <button className="greenButton">
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <div className="cartEmpty d-flex align-center justify-center flex flex-column">
            <img
              src="/img/empty-cart.jpg"
              alt="Empty cart"
              className="mb-20"
              width="120px"
              height="120px"
            />
            <h2>Корзина пустая</h2>
            <p className="opacity-6">
              Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ!
            </p>
            <button onClick={onClose} className="greenButton">
              <img src="/img/arrow.svg" alt="Back" />
              Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Drawer
