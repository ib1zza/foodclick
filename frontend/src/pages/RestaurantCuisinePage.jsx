import { useDeferredValue, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getStores } from '../lib/api'
import { restaurantCuisineMap } from '../lib/foodclick'
import { Chevron } from '../components/icons'

function RestaurantCuisinePage() {
  const { slug } = useParams()
  const [stores, setStores] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const deferredSearch = useDeferredValue(search)
  const cuisine = restaurantCuisineMap[slug]

  useEffect(() => {
    let isMounted = true

    async function loadStoresByCuisine() {
      if (!cuisine) {
        setError('Категория кухни не найдена')
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError('')

      try {
        const data = await getStores({
          categorySlug: 'restorany-i-kafe',
          search: deferredSearch,
          productSearch: cuisine.search,
        })

        if (!isMounted) {
          return
        }

        setStores(data)
      } catch (requestError) {
        if (!isMounted) {
          return
        }

        setError('Не удалось загрузить рестораны')
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadStoresByCuisine()

    return () => {
      isMounted = false
    }
  }, [cuisine, deferredSearch])

  return (
    <main className="foodclick-page category-page">
      <section className="category-page__shell">
        <Link className="back-link" to="/">
          <Chevron direction="left" />
          На главную
        </Link>

        <div className="section-title">
          <h1>{cuisine?.title ?? 'Рестораны'}</h1>
        </div>

        <div className="section-search section-search--store">
          <input
            className="section-search__input"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Найти ресторан"
          />
        </div>

        {isLoading ? <p className="section-state">Загружаем рестораны...</p> : null}
        {error ? <p className="section-state section-state--error">{error}</p> : null}
        {!isLoading && !error && stores.length === 0 ? (
          <p className="section-state">В этой категории пока нет доступных ресторанов.</p>
        ) : null}

        <div className="category-page__grid">
          {!isLoading && !error
            ? stores.map((store) => (
                <Link className="category-store-card" key={store.slug} to={`/stores/${store.slug}`}>
                  <div className="category-store-card__logo">
                    <img src={store.logo_url} alt={store.name} />
                  </div>

                  <div className="category-store-card__copy">
                    <h2>{store.name}</h2>
                    <p>{store.description}</p>
                  </div>

                  <div className="category-store-card__meta">
                    <span>{store.delivery_time_text}</span>
                    <strong>{Number(store.rating).toFixed(1)}</strong>
                  </div>
                </Link>
              ))
            : null}
        </div>
      </section>
    </main>
  )
}

export default RestaurantCuisinePage
