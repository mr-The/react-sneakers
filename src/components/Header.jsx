import { Link } from 'react-router-dom'

function Header({ sum, onClickCart }) {
  return (
    <header className="d-flex justify-between align-center p-20">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="logo" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Самые клёвые кроссовки!</p>
          </div>
        </div>
      </Link>
      <div>
        <ul className="d-flex">
          <li onClick={onClickCart} className="mr-30 cu-p">
            <img width={18} height={18} src="/img/cart.svg" alt="Корзина" />
            <span>{sum} руб.</span>
          </li>
          <li className="mr-20 cu-p">
            <Link to="/favorites">
              <img width={18} height={18} src="/img/heart.svg" alt="Закладки" />
            </Link>
          </li>
          <li>
            <img
              width={18}
              height={18}
              src="/img/user.svg"
              alt="Пользователь"
            />
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header