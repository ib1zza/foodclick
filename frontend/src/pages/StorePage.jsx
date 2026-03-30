import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getStore, getStoreProducts } from '../lib/api'
import { formatPrice, mapProductForBasket, mapProductForFavorite } from '../lib/foodclick'
import { Chevron, StarIcon } from '../components/icons'
import { useBasketStore } from '../store/useBasketStore'
import { useFavoritesStore } from '../store/useFavoritesStore'

const filterChips = [
  { key: 'all', label: 'Все' },
  { key: 'dish', label: 'Блюда' },
  { key: 'product', label: 'Товары' },
  { key: 'customizable', label: 'С конструктором' },
]

function StorePage() {
  const { slug } = useParams()
  const [store, setStore] = useState(null)
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')
  const addItem = useBasketStore((state) => state.addItem)
  const openBasket = useBasketStore((state) => state.openBasket)
  const favorites = useFavoritesStore((state) => state.items)
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  const deferredSearch = useDeferredValue(search)

  useEffect(() => {
    let isMounted = true

    async function loadStorePage() {
      setIsLoading(true)
      setError('')

      try {
        const productType =
          activeFilter === 'dish' || activeFilter === 'product'
            ? activeFilter
            : undefined
        const [storeData, productsData] = await Promise.all([
          getStore(slug),
          getStoreProducts(slug, {
            type: productType,
            search: deferredSearch,
          }),
        ])

        if (!isMounted) {
          return
        }

        setStore(storeData)
        setProducts(productsData.items)
      } catch (requestError) {
        if (!isMounted) {
          return
        }

        setError('Не удалось загрузить магазин')
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    if (slug) {
      void loadStorePage()
    }

    return () => {
      isMounted = false
    }
  }, [activeFilter, deferredSearch, slug])

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'dish') {
      return products.filter((product) => product.type === 'dish')
    }

    if (activeFilter === 'product') {
      return products.filter((product) => product.type === 'product')
    }

    if (activeFilter === 'customizable') {
      return products.filter((product) => product.is_customizable)
    }

    return products
  }, [activeFilter, products])

  if (isLoading) {
    return (
      <main className="foodclick-page store-page">
        <section className="store-hero">
          <div className="store-hero__content">
            <Link className="back-link" to="/">
              <Chevron direction="left" />
              На главную
            </Link>
            <p>Загружаем магазин...</p>
          </div>
        </section>
      </main>
    )
  }

  if (error || !store) {
    return (
      <main className="foodclick-page store-page">
        <section className="store-hero">
          <div className="store-hero__content">
            <Link className="back-link" to="/">
              <Chevron direction="left" />
              На главную
            </Link>
            <p>{error || 'Магазин не найден'}</p>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="foodclick-page store-page">
      <section className="store-hero">
        <div className="store-hero__content">
          <Link className="back-link" to="/">
            <Chevron direction="left" />
            На главную
          </Link>
          <span className="store-badge">{store.category.name}</span>
          <h1>{store.name}</h1>
          <p>{store.description}</p>

          <div className="store-meta">
            <div>
              <strong>{store.delivery_time_text}</strong>
              <span>доставка</span>
            </div>
            <div>
              <strong>{Number(store.rating).toFixed(1)}</strong>
              <span>рейтинг</span>
            </div>
            <div>
              <strong>от {formatPrice(store.min_order_amount)}</strong>
              <span>минимум</span>
            </div>
          </div>
        </div>

        <div className="store-hero__card">
          <div className="store-logo-card">
            <img src={store.logo_url} alt={store.name} />
          </div>
          <div className="store-hero__note">
            <StarIcon />
            <p>Свежая подборка товаров и простая навигация по категориям.</p>
          </div>
        </div>
      </section>

      <section className="store-filters">
        {filterChips.map((chip) => (
          <button
            className={`filter-chip ${activeFilter === chip.key ? 'filter-chip--active' : ''}`}
            type="button"
            key={chip.key}
            onClick={() => setActiveFilter(chip.key)}
          >
            {chip.label}
          </button>
        ))}
      </section>

      <div className="section-search section-search--store">
        <input
          className="section-search__input"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Найти товар в магазине"
        />
      </div>

      <section className="store-layout">
        <div className="product-list">
          {filteredProducts.length === 0 ? (
            <p className="section-state">По выбранному фильтру пока ничего нет.</p>
          ) : (
            filteredProducts.map((product) => {
              const isFavorite = favorites.some((item) => item.id === Number(product.id))

              return (
                <article
                  className={`store-product-card store-product-card--${product.tone ?? 'green'}`}
                  key={product.id}
                >
                <Link className="store-product-card__body" to={`/products/${product.id}`}>
                  <div className="store-product-card__art">
                    {product.image_url ? (
                      <img
                        className="store-product-card__image"
                        src={product.image_url}
                        alt={product.name}
                      />
                    ) : (
                      <div className="store-product-card__placeholder" aria-hidden="true">
                        <span>{product.type === 'dish' ? 'Блюдо' : 'Товар'}</span>
                      </div>
                    )}
                    <div className="store-product-card__overlay" aria-hidden="true" />
                    <span>{product.tag ?? (product.is_customizable ? 'Конструктор' : product.type)}</span>
                  </div>
                  <div className="store-product-card__copy">
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                  </div>
                </Link>
                <div className="store-product-card__footer">
                  <strong>{formatPrice(product.price)}</strong>
                  <div className="store-product-card__actions">
                    <button
                      className={`favorite-toggle ${isFavorite ? 'favorite-toggle--active' : ''}`}
                      type="button"
                      onClick={() =>
                        toggleFavorite(
                          mapProductForFavorite(product, {
                            slug: store.slug,
                            name: store.name,
                          }),
                        )
                      }
                    >
                      {isFavorite ? '★ В избранном' : '☆ В избранное'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        addItem(mapProductForBasket(product))
                        openBasket()
                      }}
                    >
                      Добавить
                    </button>
                  </div>
                </div>
                </article>
              )
            })
          )}
        </div>
      </section>
    </main>
  )
}

export default StorePage
