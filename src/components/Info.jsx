import { useContext } from 'react'

import { AppContext } from '../App'

const Info = ({ title, description, image }) => {
  const { setCardOpened } = useContext(AppContext)

  return (
    <div className="cartEmpty d-flex align-center justify-center flex flex-column">
      <img src={image} alt="Empty cart" className="mb-20" width="120px" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => setCardOpened(false)} className="greenButton">
        <img src="/img/arrow.svg" alt="Back" />
        Вернуться назад
      </button>
    </div>
  )
}

export default Info
