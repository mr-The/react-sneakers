function App() {
  return (
    <div className="wrapper clear">
      <div className="overlay">
        <div className="drawer">
          <h2 className="mb-30 d-flex justify-between">
            Корзина{' '}
            <img src="/img/btn-remove.svg" alt="Remove" className="cu-p" />
          </h2>

          <div className="items">
            <div className="cartItem d-flex align-center mb-20">
              <div
                style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }}
                className="cartItemImg"
              ></div>
              <div className="mr-20 flex">
                <p className="mb-5">Кроссовки мужские Nike Blazer Mid Suede</p>
                <b>12 999 руб.</b>
              </div>
              <img
                src="/img/btn-remove.svg"
                alt="Remove"
                className="removeBtn"
              />
            </div>
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
      </div>

      <header className="d-flex justify-between align-center p-40">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="logo" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Самые клёвые кроссовки!</p>
          </div>
        </div>
        <div>
          <ul className="d-flex">
            <li className="mr-30">
              <img width={18} height={18} src="/img/cart.svg" alt="cart" />
              <span>1205 руб.</span>
            </li>
            <li>
              <img width={18} height={18} src="/img/user.svg" alt="user" />
            </li>
          </ul>
        </div>
      </header>
      <div className="content p-40">
        <div className="d-flex justify-between mb-40 align-center">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex">
          <div className="card">
            <div className="favorite">
              <img src="/img/unlike.svg" alt="Unlike" />
            </div>
            <img
              width={133}
              height={112}
              src="/img/sneakers/1.jpg"
              alt="Model 1"
            />
            <h5>Кроссовки мужские Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>12 999 руб.</b>
              </div>
              <button className="button">
                <img width={11} height={11} src="/img/plus.svg" alt="Plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
