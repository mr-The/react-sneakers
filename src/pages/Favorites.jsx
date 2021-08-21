import { useContext } from 'react'

import Card from '../components/Card'
import { AppContext } from '../App'

function Favorites({ onAddToFavorite, toggleAddRemoveToCart, loading }) {
  const { favorites } = useContext(AppContext)

  return (
    <div className="content p-20">
      <div className="d-flex justify-between mb-40 align-center  flex-wrap">
        <h1>Мои закладки</h1>
      </div>

      <div className="content-items d-flex flex-wrap">
        {(loading ? [...Array(4)] : favorites).map((item, index) => (
          <Card
            key={index}
            {...item}
            onFavorite={onAddToFavorite}
            toggleAddRemoveToCart={toggleAddRemoveToCart}
            loading={loading}
          />
        ))}
      </div>
    </div>
  )
}

export default Favorites
