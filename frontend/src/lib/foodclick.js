import { assets, cuisines, footerLinks } from '../data'

export { assets, cuisines, footerLinks }

export const restaurantCuisineMap = {
  fastfood: {
    title: 'Фастфуд',
    search: 'бургер',
  },
  pizza: {
    title: 'Пицца',
    search: 'пицца',
  },
  sushi: {
    title: 'Суши',
    search: 'ролл',
  },
  pasta: {
    title: 'Паста и лапша',
    search: 'лапша',
  },
  desserts: {
    title: 'Десерты',
    search: 'десерт',
  },
  georgia: {
    title: 'Грузия',
    search: 'хинкали',
  },
}

export const categoryImageBySlug = {
  'restorany-i-kafe': assets.burgerArt,
  produkty: assets.groceryArt,
  apteki: assets.pharmacyArt,
  zoomagaziny: assets.petsArt,
  cvety: assets.flowersArt,
  krasota: assets.beautyArt,
  'dlya-doma': assets.homeArt,
  'dlya-detey': assets.kidsArt,
}

export function formatCategoryTitle(categoryName) {
  if (categoryName === 'Рестораны и кафе') {
    return ['Рестораны', 'и кафе']
  }

  return [categoryName]
}

export function formatPrice(value) {
  const amount = Number(value) || 0
  return `${new Intl.NumberFormat('ru-RU').format(amount)} ₽`
}

export function mapProductForBasket(product) {
  const selectedOptions = product.selectedOptions ?? []
  const customizationLabel = selectedOptions.length
    ? selectedOptions.map((option) => option.name).join(', ')
    : ''
  const customizationKey = selectedOptions.length
    ? selectedOptions.map((option) => option.id).sort((left, right) => left - right).join('-')
    : 'default'

  return {
    id: `${product.id}:${customizationKey}`,
    productId: product.id,
    name: product.name,
    title: product.name,
    description: customizationLabel || product.description,
    tag: product.tag ?? (product.type === 'dish' ? 'Блюдо' : 'Товар'),
    price: formatPrice(product.priceValue ?? product.price),
    priceValue: Number(product.priceValue ?? product.price) || 0,
    selectedOptions,
  }
}

export function mapProductForFavorite(product, store) {
  return {
    id: Number(product.id),
    name: product.name,
    description: product.description,
    image_url: product.image_url ?? null,
    price: Number(product.priceValue ?? product.price) || 0,
    type: product.type,
    tag: product.tag ?? null,
    tone: product.tone ?? 'green',
    store: store
      ? {
          slug: store.slug,
          name: store.name,
        }
      : null,
  }
}
