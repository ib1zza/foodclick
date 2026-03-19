const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

async function getJson(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  return response.json()
}

export function getStoreCategories() {
  return getJson('/store-categories')
}

export function getPromotions() {
  return getJson('/promotions')
}

export function getStores(params = {}) {
  const searchParams = new URLSearchParams()

  if (params.categorySlug) {
    searchParams.set('category_slug', params.categorySlug)
  }

  if (params.search) {
    searchParams.set('search', params.search)
  }

  if (params.productSearch) {
    searchParams.set('product_search', params.productSearch)
  }

  const query = searchParams.toString()
  return getJson(`/stores${query ? `?${query}` : ''}`)
}

export function getStore(slug) {
  return getJson(`/stores/${slug}`)
}

export function getStoreProducts(slug, params = {}) {
  const searchParams = new URLSearchParams()

  if (params.type) {
    searchParams.set('type', params.type)
  }

  if (params.search) {
    searchParams.set('search', params.search)
  }

  const query = searchParams.toString()
  return getJson(`/stores/${slug}/products${query ? `?${query}` : ''}`)
}

export function getProduct(id) {
  return getJson(`/products/${id}`)
}

export function searchProducts(params = {}) {
  const searchParams = new URLSearchParams()

  if (params.search) {
    searchParams.set('search', params.search)
  }

  if (params.limit) {
    searchParams.set('limit', String(params.limit))
  }

  const query = searchParams.toString()
  return getJson(`/products${query ? `?${query}` : ''}`)
}
