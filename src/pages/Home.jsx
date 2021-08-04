import Card from '../components/Card'

function Home({
  items,
  searchValue,
  onChangeSearchInput,
  setSearchValue,
  onAddToCart,
  onRemoveItem,
  toggleAddRemoveToCart,
  cartItems,
  onAddToFavorite,
  favorites,
}) {
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

      <div className="content-items d-flex flex-wrap">
        {items &&
          items
            .filter((item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item, index) => (
              <Card
                key={index}
                id={item.id}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onFavorite={onAddToFavorite}
                toggleAddRemoveToCart={toggleAddRemoveToCart}
                cartItems={cartItems}
                favorite={
                  favorites.find((obj) => obj.productId === item.id) &&
                  favorites.find((obj) => obj.productId === item.id)
                    .productId === item.id
                }
              />
            ))}
      </div>
    </div>
  )
}

export default Home
