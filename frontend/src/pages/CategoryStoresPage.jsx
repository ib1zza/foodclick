import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getStoreCategories, getStores } from '../lib/api'
import { Chevron } from '../components/icons'

function CategoryStoresPage() {
  const { slug } = useParams()
  const [stores, setStores] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const deferredSearch = useDeferredValue(search)

  useEffect(() => {
    let isMounted = true

    async function loadCategoryPage() {
      setIsLoading(true)
      setError('')

      try {
        const [categoryData, storeData] = await Promise.all([
          getStoreCategories(),
          getStores({
            categorySlug: slug,
            search: deferredSearch,
          }),
        ])

        if (!isMounted) {
          return
        }

        setCategories(categoryData)
        setStores(storeData)
      } catch (requestError) {
        if (!isMounted) {
          return
        }

        setError('Не удалось загрузить список предприятий')
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    if (slug) {
      void loadCategoryPage()
    }

    return () => {
      isMounted = false
    }
  }, [deferredSearch, slug])

  const currentCategory = useMemo(
    () => categories.find((category) => category.slug === slug),
    [categories, slug],
  )

  return (
    <main className="foodclick-page category-page">
      <section className="category-page__shell">
        <Link className="back-link" to="/">
          <Chevron direction="left" />
          На главную
        </Link>

        <div className="section-title">
          <h1>{currentCategory?.name ?? 'Категория'}</h1>
        </div>

        <div className="section-search section-search--store">
          <input
            className="section-search__input"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Найти предприятие"
          />
        </div>

        {isLoading ? <p className="section-state">Загружаем предприятия...</p> : null}
        {error ? <p className="section-state section-state--error">{error}</p> : null}
        {!isLoading && !error && stores.length === 0 ? (
          <p className="section-state">В этой категории пока нет доступных предприятий.</p>
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

export default CategoryStoresPage
