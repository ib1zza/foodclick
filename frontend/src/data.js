export const assets = {
  promoImage:
    'https://www.figma.com/api/mcp/asset/8cc22fc4-8693-4af8-9879-6af422cf43be',
  logoLeaf:
    'https://www.figma.com/api/mcp/asset/8b9c06d4-6cd4-4729-8c9f-bdb4074db6e2',
  basketIcon:
    'https://www.figma.com/api/mcp/asset/e191e279-6da8-44c4-8fd1-1d24bb27348b',
  burgerArt:
    'https://www.figma.com/api/mcp/asset/6e7dae9d-0f2b-4c14-943c-63cf8e39d516',
  groceryArt:
    'https://www.figma.com/api/mcp/asset/16ed976c-44d5-4383-8355-4b7d1b08b103',
  pharmacyArt:
    'https://www.figma.com/api/mcp/asset/c41122d2-cc41-4eee-8465-8dd5616a038c',
  petsArt:
    'https://www.figma.com/api/mcp/asset/af44ba7e-1af4-48cd-ab7a-65aa36921101',
  flowersArt:
    'https://www.figma.com/api/mcp/asset/2440840a-bca2-43fc-b5a0-a421f2e63574',
  beautyArt:
    'https://www.figma.com/api/mcp/asset/84685dd4-8e21-429d-b195-70b50501a374',
  homeArt:
    'https://www.figma.com/api/mcp/asset/fd1dc09a-0a9c-493a-8444-ab88d4172cff',
  kidsArt:
    'https://www.figma.com/api/mcp/asset/2b953881-4c13-4718-bd40-227103b959b7',
  pyaterochka:
    'https://www.figma.com/api/mcp/asset/a1e8545a-96de-44d7-a3b5-149322b644d9',
  perekrestok:
    'https://www.figma.com/api/mcp/asset/f9170002-175b-431e-b015-c81df611b2d7',
  vkusvill:
    'https://www.figma.com/api/mcp/asset/0e1f6e74-ff04-4b24-82a8-54b0ecfcd03a',
  auchan:
    'https://www.figma.com/api/mcp/asset/08aa2c4a-b73e-46b3-bbbe-7c5d74b05b1b',
  lenta:
    'https://www.figma.com/api/mcp/asset/1e20067b-91c7-4a73-9649-501aaa074d59',
  gorzdrav:
    'https://www.figma.com/api/mcp/asset/c751d2cc-7aba-4242-9285-edd2431d1bed',
  flowwow:
    'https://www.figma.com/api/mcp/asset/17c6dfdc-0a8f-4477-98b6-5dd635094334',
  azbuka:
    'https://www.figma.com/api/mcp/asset/dfa595e9-893e-436f-b9b5-48b946981629',
  pizzaIcon:
    'https://www.figma.com/api/mcp/asset/9852ac21-884d-45ce-ae7e-2de482f33dba',
  sushiIcon:
    'https://www.figma.com/api/mcp/asset/05a3e636-b121-4a2b-9177-1eeaf078c42b',
  dessertIcon:
    'https://www.figma.com/api/mcp/asset/6b04f42c-5d37-419a-9450-0c36ced41446',
  georgiaIcon:
    'https://www.figma.com/api/mcp/asset/dea93c7d-2173-4828-aa39-ef2ca5857423',
  heartArt:
    'https://www.figma.com/api/mcp/asset/81cceb77-cd0e-43e6-825d-6f99b77a1cf2',
  vkIcon:
    'https://www.figma.com/api/mcp/asset/a1f27569-efec-4e9b-abdd-8c2de9343097',
  rutubeIcon:
    'https://www.figma.com/api/mcp/asset/f7d9bc62-187e-4a36-aad0-9457f1131da6',
  telegramIcon:
    'https://www.figma.com/api/mcp/asset/9a7fee7f-57e6-4f59-b852-9422b9675b61',
  courierArt:
    'https://www.figma.com/api/mcp/asset/659633c6-36cc-49be-8660-c2a9a63a9ea7',
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
