import { useContext } from 'react'

import Card from '../components/Card'
import { AppContext } from '../App'

function Home({
  searchValue,
  onChangeSearchInput,
  setSearchValue,
  toggleAddRemoveToCart,
  onAddToFavorite,
  loading,
}) {
  const { items } = useContext(AppContext)

  const renderItems = () => {
    const filterItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    )

    return (loading ? [...Array(8)] : filterItems).map((item, index) => (
      <Card
        key={index}
        loading={loading}
        {...item}
        onFavorite={onAddToFavorite}
        toggleAddRemoveToCart={toggleAddRemoveToCart}
      />
    ))
  }

  return (
    <div className="content p-20">
      <div className="d-flex justify-between mb-40 align-center  flex-wrap">
        {searchValue ? (
          <h2>Поиск по запросу: "{searchValue}"</h2>
        ) : (
          <h1>Все кроссовки</h1>
        )}

        <div className="search-block">
          <img src="/img/search.svg" alt="Search" />
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск..."
          />
          {searchValue && (
            <img
              src="/img/btn-remove.svg"
              alt="Clear"
              className="clear removeBtn"
              onClick={() => setSearchValue('')}
            />
          )}
        </div>
      </div>

      <div className="content-items d-flex flex-wrap">{renderItems()}</div>
    </div>
  )
}

export default Home
