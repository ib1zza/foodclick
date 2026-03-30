import burgerCategoryImage from './assets/images/markets_categories/fastfoodcombo.png'
import groceryCategoryImage from './assets/images/markets_categories/foodbasketwithgroceries.png'
import pharmacyCategoryImage from './assets/images/markets_categories/pharmacyshop.png'
import petsCategoryImage from './assets/images/markets_categories/dogandcatlyingonapillow.png'
import flowersCategoryImage from './assets/images/markets_categories/vasewithflowers.png'
import beautyCategoryImage from './assets/images/markets_categories/cosmeticsandshoppingbag.png'
import homeCategoryImage from './assets/images/markets_categories/isometricviewofyoungwomansketchingfurniture.png'
import kidsCategoryImage from './assets/images/markets_categories/kidspool.png'

import pizzaCuisineImage from './assets/images/restoraunts_categories/sliceofpizza.png'
import sushiCuisineImage from './assets/images/restoraunts_categories/sushiset.png'
import dessertCuisineImage from './assets/images/restoraunts_categories/pieceofcake.png'
import georgiaCuisineImage from './assets/images/restoraunts_categories/baozibun.png'
import promoImage from './assets/images/restoraunts_categories/sushiset.png'
import logoLeafImage from './assets/images/restoraunts_categories/burger.png'
import basketIconImage from './assets/images/heart.png'

import heartImage from './assets/images/heart.png'
import courierImage from './assets/images/characterwithasushihead.png'
import vkImage from './assets/images/socials/vk.png'
import rutubeImage from './assets/images/socials/rutube.png'
import telegramImage from './assets/images/socials/tg.png'

export const assets = {
  promoImage,
  logoLeaf: logoLeafImage,
  basketIcon: basketIconImage,
  burgerArt: burgerCategoryImage,
  groceryArt: groceryCategoryImage,
  pharmacyArt: pharmacyCategoryImage,
  petsArt: petsCategoryImage,
  flowersArt: flowersCategoryImage,
  beautyArt: beautyCategoryImage,
  homeArt: homeCategoryImage,
  kidsArt: kidsCategoryImage,
  pyaterochka: groceryCategoryImage,
  perekrestok: groceryCategoryImage,
  vkusvill: groceryCategoryImage,
  auchan: groceryCategoryImage,
  lenta: groceryCategoryImage,
  gorzdrav: pharmacyCategoryImage,
  flowwow: flowersCategoryImage,
  azbuka: groceryCategoryImage,
  pizzaIcon: pizzaCuisineImage,
  sushiIcon: sushiCuisineImage,
  dessertIcon: dessertCuisineImage,
  georgiaIcon: georgiaCuisineImage,
  heartArt: heartImage,
  vkIcon: vkImage,
  rutubeIcon: rutubeImage,
  telegramIcon: telegramImage,
  courierArt: courierImage,
}

export const categories = [
  { title: 'Рестораны\nи кафе', image: assets.burgerArt },
  { title: 'Продукты', image: assets.groceryArt },
  { title: 'Аптеки', image: assets.pharmacyArt },
  { title: 'Зоомагазины', image: assets.petsArt },
  { title: 'Цветы', image: assets.flowersArt },
  { title: 'Красота', image: assets.beautyArt },
  { title: 'Для дома', image: assets.homeArt },
  { title: 'Для детей', image: assets.kidsArt },
]

export const stores = [
  {
    slug: 'vkusvill',
    name: 'ВкусВилл',
    image: assets.vkusvill,
    time: '30-40 мин',
    badge: 'Популярно',
    subtitle: 'Доставка продуктов и готовой еды рядом с вами',
  },
  {
    slug: 'pyaterochka',
    name: 'Пятёрочка',
    image: assets.pyaterochka,
    time: '1.5-2 ч',
    badge: 'Супермаркет',
    subtitle: 'Базовые продукты и товары для дома',
  },
  {
    slug: 'perekrestok',
    name: 'Перекрёсток',
    image: assets.perekrestok,
    time: '1-1.5 ч',
    badge: 'Супермаркет',
    subtitle: 'Большой выбор и быстрая доставка',
  },
  {
    slug: 'auchan',
    name: 'Ашан',
    image: assets.auchan,
    time: '40-50 мин',
    badge: 'Гипермаркет',
    subtitle: 'Повседневные покупки за один заказ',
  },
  {
    slug: 'lenta',
    name: 'Лента',
    image: assets.lenta,
    time: '40-1 ч',
    badge: 'Супермаркет',
    subtitle: 'Скидки и товары на каждый день',
  },
  {
    slug: 'gorzdrav',
    name: 'Горздрав',
    image: assets.gorzdrav,
    time: '40-50 мин',
    badge: 'Аптека',
    subtitle: 'Аптечные товары и витамины',
  },
  {
    slug: 'flowwow',
    name: 'Flowwow',
    image: assets.flowwow,
    time: '1.5-2ч',
    badge: 'Цветы',
    subtitle: 'Букеты и подарки на заказ',
  },
  {
    slug: 'azbuka',
    name: 'Азбука вкуса',
    image: assets.azbuka,
    time: '1-1.5 ч',
    badge: 'Премиум',
    subtitle: 'Деликатесы и готовые блюда',
  },
]

export const cuisines = [
  { title: 'Фастфуд', emoji: '🍔' },
  { title: 'Пицца', image: assets.pizzaIcon },
  { title: 'Суши', image: assets.sushiIcon },
  { title: 'Паста и лапша', emoji: '🍜' },
  { title: 'Десерты', image: assets.dessertIcon },
  { title: 'Грузия', image: assets.georgiaIcon },
]

export const footerLinks = [
  'Ответы на вопросы',
  'Контакты',
  'Правила и соглашения',
  'Умный импорт',
  'Политика конфиденциальности',
]

export const featuredProducts = [
  {
    id: 1,
    title: 'Авокадо ролл',
    description: 'Нежный ролл с авокадо, огурцом и сливочным сыром.',
    price: '329 ₽',
    priceValue: 329,
    tone: 'green',
    tag: 'Хит',
  },
  {
    id: 2,
    title: 'Боул с лососем',
    description: 'Рис, лосось, эдамаме, манго и фирменный соус.',
    price: '489 ₽',
    priceValue: 489,
    tone: 'orange',
    tag: 'Новинка',
  },
  {
    id: 3,
    title: 'Моти клубничный',
    description: 'Легкий десерт с кремовой начинкой и ягодным акцентом.',
    price: '219 ₽',
    priceValue: 219,
    tone: 'pink',
    tag: 'Десерт',
  },
  {
    id: 4,
    title: 'Комбо на вечер',
    description: 'Сет из роллов, соуса и двух напитков для компании.',
    price: '1 190 ₽',
    priceValue: 1190,
    tone: 'blue',
    tag: 'Выгодно',
  },
]
