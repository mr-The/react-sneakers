import Card from '../components/Card'

function Favorites({
  items,
  onAddToFavorite,
  onAddToCart,
  onRemoveItem,
  toggleAddRemoveToCart,
  cartItems,
}) {
  return (
    <div className="content p-20">
      <div className="d-flex justify-between mb-40 align-center  flex-wrap">
        <h1>Мои закладки</h1>
      </div>

      <div className="content-items d-flex flex-wrap">
        {items &&
          items.map((item, index) => (
            <Card
              key={index}
              id={item.productId}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              favorite={true}
              onFavorite={onAddToFavorite}
              toggleAddRemoveToCart={toggleAddRemoveToCart}
              cartItems={cartItems}
              onAddToCart={onAddToCart}
              onRemoveItem={onRemoveItem}
            />
          ))}
      </div>
    </div>
  )
}

export default Favorites
