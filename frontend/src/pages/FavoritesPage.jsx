import { Link } from 'react-router-dom'
import { Chevron } from '../components/icons'
import { formatPrice } from '../lib/foodclick'
import { useFavoritesStore } from '../store/useFavoritesStore'

function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.items)
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite)
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites)

  return (
    <main className="foodclick-page favorites-page">
      <section className="favorites-page__shell">
        <Link className="back-link" to="/">
          <Chevron direction="left" />
          На главную
        </Link>

        <div className="favorites-page__header">
          <div>
            <h1>Избранные товары</h1>
            <p>
              {favorites.length > 0
                ? `Сохранено товаров: ${favorites.length}`
                : 'Пока ничего не добавлено'}
            </p>
          </div>
          {favorites.length > 0 ? (
            <button
              className="favorites-page__clear"
              type="button"
              onClick={clearFavorites}
            >
              Очистить
            </button>
          ) : null}
        </div>

        {favorites.length === 0 ? (
          <div className="favorites-page__empty">
            <p>Добавьте товары в избранное на страницах магазина или товара.</p>
          </div>
        ) : (
          <div className="favorites-page__grid">
            {favorites.map((item) => (
              <article
                className={`store-product-card store-product-card--${item.tone ?? 'green'}`}
                key={item.id}
              >
                <Link className="store-product-card__body" to={`/products/${item.id}`}>
                  <div className="store-product-card__art">
                    {item.image_url ? (
                      <img
                        className="store-product-card__image"
                        src={item.image_url}
                        alt={item.name}
                      />
                    ) : (
                      <div className="store-product-card__placeholder" aria-hidden="true">
                        <span>{item.type === 'dish' ? 'Блюдо' : 'Товар'}</span>
                      </div>
                    )}
                    <div className="store-product-card__overlay" aria-hidden="true" />
                    <span>{item.tag ?? (item.type === 'dish' ? 'Блюдо' : 'Товар')}</span>
                  </div>
                  <div className="store-product-card__copy">
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                    {item.store ? (
                      <p className="favorites-page__store">{item.store.name}</p>
                    ) : null}
                  </div>
                </Link>
                <div className="store-product-card__footer">
                  <strong>{formatPrice(item.price)}</strong>
                  <button
                    className="favorite-toggle favorite-toggle--active"
                    type="button"
                    onClick={() => removeFavorite(item.id)}
                  >
                    Убрать
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default FavoritesPage

