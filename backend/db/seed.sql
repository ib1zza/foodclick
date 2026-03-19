TRUNCATE TABLE
  promotions,
  product_options,
  product_option_groups,
  products,
  stores,
  store_categories
RESTART IDENTITY CASCADE;

INSERT INTO store_categories (slug, name, sort_order)
VALUES
  ('restorany-i-kafe', 'Рестораны и кафе', 1),
  ('produkty', 'Продукты', 2),
  ('apteki', 'Аптеки', 3),
  ('zoomagaziny', 'Зоомагазины', 4),
  ('cvety', 'Цветы', 5),
  ('krasota', 'Красота', 6),
  ('dlya-doma', 'Для дома', 7),
  ('dlya-detey', 'Для детей', 8);

INSERT INTO stores (
  category_id,
  slug,
  name,
  description,
  logo_url,
  banner_url,
  delivery_time_text,
  delivery_time_min,
  delivery_time_max,
  rating,
  min_order_amount
)
SELECT category_id, slug, name, description, logo_url, banner_url, delivery_time_text, delivery_time_min, delivery_time_max, rating, min_order_amount
FROM (
  VALUES
    (
      (SELECT id FROM store_categories WHERE slug = 'restorany-i-kafe'),
      'roll-and-bowl',
      'Roll & Bowl',
      'Роллы, боулы и горячие блюда с настраиваемым составом.',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
      '25-35 мин',
      25,
      35,
      4.80,
      500.00
    ),
    (
      (SELECT id FROM store_categories WHERE slug = 'restorany-i-kafe'),
      'burger-point',
      'Burger Point',
      'Бургеры, картофель и стритфуд-комбо.',
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=80',
      '20-30 мин',
      20,
      30,
      4.70,
      450.00
    ),
    (
      (SELECT id FROM store_categories WHERE slug = 'restorany-i-kafe'),
      'pizza-station',
      'Pizza Station',
      'Тонкая пицца, сырные бортики и семейные наборы.',
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=80',
      '25-40 мин',
      25,
      40,
      4.75,
      600.00
    ),
    (
      (SELECT id FROM store_categories WHERE slug = 'restorany-i-kafe'),
      'sushi-wave',
      'Sushi Wave',
      'Классические и запеченные роллы, суши и сеты.',
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1600&q=80',
      '30-45 мин',
      30,
      45,
      4.85,
      700.00
    ),
    (
      (SELECT id FROM store_categories WHERE slug = 'restorany-i-kafe'),
      'noodle-lab',
      'Noodle Lab',
      'Вок, лапша, паста и азиатские боулы.',
      'https://images.unsplash.com/photo-1617622141573-7c4f5d2f7d5f?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=1600&q=80',
      '25-35 мин',
      25,
      35,
      4.65,
      500.00
    ),
    (
      (SELECT id FROM store_categories WHERE slug = 'restorany-i-kafe'),
      'sweet-room',
      'Sweet Room',
      'Десерты, пирожные и сладкие наборы к чаю.',
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1600&q=80',
      '20-30 мин',
      20,
      30,
      4.90,
      350.00
    ),
    (
      (SELECT id FROM store_categories WHERE slug = 'restorany-i-kafe'),
      'georgia-taste',
      'Georgia Taste',
      'Хинкали, хачапури и домашняя грузинская кухня.',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80',
      '35-50 мин',
      35,
      50,
      4.88,
      700.00
    ),
    (
      (SELECT id FROM store_categories WHERE slug = 'produkty'),
      'vkusvill-market',
      'ВкусВилл Маркет',
      'Свежие продукты и готовая еда на каждый день.',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80',
      '30-45 мин',
      30,
      45,
      4.70,
      900.00
    ),
    (
      (SELECT id FROM store_categories WHERE slug = 'apteki'),
      'gorzdrav-express',
      'Горздрав Экспресс',
      'Аптечные товары, витамины и уходовые средства.',
      'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1600&q=80',
      '35-50 мин',
      35,
      50,
      4.60,
      0.00
    ),
    (
      (SELECT id FROM store_categories WHERE slug = 'zoomagaziny'),
      'lapki-hvosty',
      'Лапки и Хвосты',
      'Корма, игрушки и товары для питомцев.',
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1600&q=80',
      '40-60 мин',
      40,
      60,
      4.90,
      700.00
    ),
    (
      (SELECT id FROM store_categories WHERE slug = 'cvety'),
      'florist-studio',
      'Florist Studio',
      'Букеты, композиции и подарки к важным поводам.',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1600&q=80',
      '60-90 мин',
      60,
      90,
      4.85,
      1500.00
    ),
    (
      (SELECT id FROM store_categories WHERE slug = 'krasota'),
      'beauty-lab',
      'Beauty Lab',
      'Уходовая косметика и товары для красоты.',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80',
      '45-70 мин',
      45,
      70,
      4.75,
      1200.00
    ),
    (
      (SELECT id FROM store_categories WHERE slug = 'dlya-doma'),
      'home-hub',
      'Home Hub',
      'Товары для уборки, кухни и повседневного быта.',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
      '50-80 мин',
      50,
      80,
      4.55,
      1000.00
    ),
    (
      (SELECT id FROM store_categories WHERE slug = 'dlya-detey'),
      'kids-island',
      'Kids Island',
      'Игрушки, питание и полезные мелочи для детей.',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1600&q=80',
      '50-75 мин',
      50,
      75,
      4.65,
      1300.00
    )
) AS seeded (
  category_id,
  slug,
  name,
  description,
  logo_url,
  banner_url,
  delivery_time_text,
  delivery_time_min,
  delivery_time_max,
  rating,
  min_order_amount
);

INSERT INTO promotions (
  store_id,
  title,
  description,
  image_url,
  sort_order
)
SELECT store_id, title, description, image_url, sort_order
FROM (
  VALUES
    (
      (SELECT id FROM stores WHERE slug = 'sushi-wave'),
      'Сет недели',
      'Скидка 20% на большие сеты роллов до конца недели.',
      'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1600&q=80',
      1
    ),
    (
      (SELECT id FROM stores WHERE slug = 'pizza-station'),
      'Вторая пицца за полцены',
      'При заказе двух больших пицц вторая идёт со скидкой 50%.',
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=80',
      2
    ),
    (
      (SELECT id FROM stores WHERE slug = 'sweet-room'),
      'Десерт в подарок',
      'К заказу от 1500 рублей добавим фирменный эклер бесплатно.',
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1600&q=80',
      3
    ),
    (
      (SELECT id FROM stores WHERE slug = 'vkusvill-market'),
      'Свежая корзина',
      'Соберите продуктовую корзину недели со скидкой на избранные товары.',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80',
      4
    )
) AS seeded (
  store_id,
  title,
  description,
  image_url,
  sort_order
);

INSERT INTO products (
  store_id,
  type,
  name,
  slug,
  description,
  image_url,
  price,
  old_price,
  currency,
  tag,
  tone,
  is_customizable,
  sort_order
)
SELECT store_id, type, name, slug, description, image_url, price, old_price, 'RUB', tag, tone, is_customizable, sort_order
FROM (
  VALUES
    ((SELECT id FROM stores WHERE slug = 'roll-and-bowl'), 'dish', 'Авокадо ролл', 'avokado-roll', 'Нежный ролл с авокадо, огурцом и сливочным сыром.', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80', 329.00, NULL, 'Хит', 'green', TRUE, 1),
    ((SELECT id FROM stores WHERE slug = 'roll-and-bowl'), 'dish', 'Боул с лососем', 'boul-s-lososem', 'Рис, лосось, эдамаме, манго и фирменный соус.', 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80', 489.00, NULL, 'Новинка', 'orange', TRUE, 2),
    ((SELECT id FROM stores WHERE slug = 'roll-and-bowl'), 'dish', 'Моти клубничный', 'moti-klubnichnyy', 'Легкий десерт с кремовой начинкой и ягодным акцентом.', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80', 219.00, NULL, 'Десерт', 'pink', FALSE, 3),
    ((SELECT id FROM stores WHERE slug = 'roll-and-bowl'), 'dish', 'Комбо на вечер', 'kombo-na-vecher', 'Сет из роллов, соуса и двух напитков для компании.', 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80', 1190.00, 1290.00, 'Выгодно', 'blue', FALSE, 4),
    ((SELECT id FROM stores WHERE slug = 'burger-point'), 'dish', 'Бургер классический', 'burger-klassicheskiy', 'Сочная говяжья котлета, сыр чеддер и фирменный соус.', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', 390.00, NULL, 'Хит', 'orange', FALSE, 1),
    ((SELECT id FROM stores WHERE slug = 'burger-point'), 'dish', 'Комбо бургер и фри', 'kombo-burger-i-fri', 'Бургер, картофель фри и напиток.', 'https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=800&q=80', 520.00, NULL, 'Комбо', 'blue', FALSE, 2),
    ((SELECT id FROM stores WHERE slug = 'burger-point'), 'dish', 'Чикен бургер', 'chiken-burger', 'Куриное филе в хрустящей панировке и свежие овощи.', 'https://images.unsplash.com/photo-1606755962773-d324e9a13086?auto=format&fit=crop&w=800&q=80', 350.00, NULL, NULL, 'green', FALSE, 3),
    ((SELECT id FROM stores WHERE slug = 'pizza-station'), 'dish', 'Пицца Маргарита', 'pizza-margarita', 'Томаты, моцарелла и базилик на тонком тесте.', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80', 540.00, NULL, 'Классика', 'green', FALSE, 1),
    ((SELECT id FROM stores WHERE slug = 'pizza-station'), 'dish', 'Пицца Пепперони', 'pizza-pepperoni', 'Пепперони, моцарелла и насыщенный томатный соус.', 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80', 690.00, NULL, 'Хит', 'orange', FALSE, 2),
    ((SELECT id FROM stores WHERE slug = 'pizza-station'), 'dish', 'Пицца Четыре сыра', 'pizza-chetyre-syra', 'Моцарелла, дорблю, пармезан и сливочный соус.', 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80', 760.00, NULL, NULL, 'blue', FALSE, 3),
    ((SELECT id FROM stores WHERE slug = 'sushi-wave'), 'dish', 'Ролл Филадельфия', 'roll-filadelfiya', 'Лосось, сливочный сыр и рис.', 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80', 540.00, NULL, 'Популярно', 'pink', FALSE, 1),
    ((SELECT id FROM stores WHERE slug = 'sushi-wave'), 'dish', 'Ролл Дракон', 'roll-drakon', 'Угорь, авокадо, соус унаги и кунжут.', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80', 620.00, NULL, NULL, 'green', FALSE, 2),
    ((SELECT id FROM stores WHERE slug = 'sushi-wave'), 'dish', 'Сет суши мини', 'set-sushi-mini', 'Ассорти из роллов и суши на двоих.', 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80', 990.00, NULL, 'Сет', 'blue', FALSE, 3),
    ((SELECT id FROM stores WHERE slug = 'noodle-lab'), 'dish', 'Лапша удон с курицей', 'lapsha-udon-s-kuricey', 'Удон, овощи, курица и соус терияки.', 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=800&q=80', 470.00, NULL, 'Вок', 'orange', FALSE, 1),
    ((SELECT id FROM stores WHERE slug = 'noodle-lab'), 'dish', 'Паста Альфредо', 'pasta-alfredo', 'Фетучини в сливочном соусе с пармезаном.', 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80', 520.00, NULL, NULL, 'green', FALSE, 2),
    ((SELECT id FROM stores WHERE slug = 'noodle-lab'), 'dish', 'Рамен с курицей', 'ramen-s-kuricey', 'Насыщенный бульон, лапша и куриное филе.', 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=800&q=80', 560.00, NULL, 'Суп', 'blue', FALSE, 3),
    ((SELECT id FROM stores WHERE slug = 'sweet-room'), 'dish', 'Шоколадный десерт', 'shokoladnyy-desert', 'Нежный десерт с тёмным шоколадом и кремом.', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80', 260.00, NULL, 'Десерт', 'pink', FALSE, 1),
    ((SELECT id FROM stores WHERE slug = 'sweet-room'), 'dish', 'Тирамису', 'tiramisu', 'Классический итальянский десерт с кофе и маскарпоне.', 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80', 290.00, NULL, NULL, 'orange', FALSE, 2),
    ((SELECT id FROM stores WHERE slug = 'sweet-room'), 'dish', 'Эклер ванильный', 'ekler-vanilnyy', 'Воздушное заварное тесто с кремовой начинкой.', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80', 190.00, NULL, NULL, 'blue', FALSE, 3),
    ((SELECT id FROM stores WHERE slug = 'georgia-taste'), 'dish', 'Хинкали с говядиной', 'hinkali-s-govyadinoy', 'Сочные хинкали с мясной начинкой и бульоном.', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', 420.00, NULL, 'Традиция', 'green', FALSE, 1),
    ((SELECT id FROM stores WHERE slug = 'georgia-taste'), 'dish', 'Хачапури по-аджарски', 'hachapuri-po-adzharski', 'Лодочка с сыром сулугуни, яйцом и сливочным маслом.', 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&w=800&q=80', 530.00, NULL, 'Хит', 'orange', FALSE, 2),
    ((SELECT id FROM stores WHERE slug = 'georgia-taste'), 'dish', 'Сациви с курицей', 'sacivi-s-kuricey', 'Курица в ореховом соусе с пряными специями.', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', 510.00, NULL, NULL, 'blue', FALSE, 3),

    ((SELECT id FROM stores WHERE slug = 'vkusvill-market'), 'product', 'Молоко 3.2%', 'moloko-32', 'Пастеризованное молоко 930 мл.', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80', 119.00, NULL, NULL, 'green', FALSE, 1),
    ((SELECT id FROM stores WHERE slug = 'vkusvill-market'), 'product', 'Хлеб цельнозерновой', 'hleb-celnozernovoy', 'Свежий хлеб на закваске.', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80', 89.00, NULL, NULL, 'orange', FALSE, 2),
    ((SELECT id FROM stores WHERE slug = 'vkusvill-market'), 'product', 'Йогурт греческий', 'yogurt-grecheskiy', 'Натуральный йогурт без сахара.', 'https://images.unsplash.com/photo-1571212515416-fca088b559cf?auto=format&fit=crop&w=800&q=80', 99.00, 119.00, 'Скидка', 'blue', FALSE, 3),

    ((SELECT id FROM stores WHERE slug = 'gorzdrav-express'), 'product', 'Витамин C 1000', 'vitamin-c-1000', 'Шипучие таблетки, 20 шт.', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80', 450.00, NULL, NULL, 'green', FALSE, 1),
    ((SELECT id FROM stores WHERE slug = 'gorzdrav-express'), 'product', 'Пантенол спрей', 'pantenol-sprey', 'Средство для ухода за кожей.', 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=800&q=80', 389.00, NULL, NULL, 'orange', FALSE, 2),
    ((SELECT id FROM stores WHERE slug = 'gorzdrav-express'), 'product', 'Термометр электронный', 'termometr-elektronnyy', 'Быстрое измерение температуры.', 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80', 690.00, NULL, NULL, 'blue', FALSE, 3),

    ((SELECT id FROM stores WHERE slug = 'lapki-hvosty'), 'product', 'Корм для кошек', 'korm-dlya-koshek', 'Сухой корм с курицей, 1.5 кг.', 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?auto=format&fit=crop&w=800&q=80', 890.00, NULL, 'Популярно', 'green', FALSE, 1),
    ((SELECT id FROM stores WHERE slug = 'lapki-hvosty'), 'product', 'Игрушка для собаки', 'igrushka-dlya-sobaki', 'Прочная игрушка-канат.', 'https://images.unsplash.com/photo-1560743641-3914f2c45636?auto=format&fit=crop&w=800&q=80', 320.00, NULL, NULL, 'orange', FALSE, 2),
    ((SELECT id FROM stores WHERE slug = 'lapki-hvosty'), 'product', 'Наполнитель комкующийся', 'napolnitel-komkuyushchiysya', 'Минеральный наполнитель, 5 л.', 'https://images.unsplash.com/photo-1615485737457-5b7df4dd4e1d?auto=format&fit=crop&w=800&q=80', 540.00, NULL, NULL, 'blue', FALSE, 3),

    ((SELECT id FROM stores WHERE slug = 'florist-studio'), 'product', 'Букет из роз', 'buket-iz-roz', '15 красных роз в крафтовой упаковке.', 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80', 2490.00, NULL, 'Бестселлер', 'pink', FALSE, 1),
    ((SELECT id FROM stores WHERE slug = 'florist-studio'), 'product', 'Тюльпаны микс', 'tyulpany-miks', 'Весенний букет из 21 тюльпана.', 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=800&q=80', 1790.00, NULL, NULL, 'green', FALSE, 2),
    ((SELECT id FROM stores WHERE slug = 'florist-studio'), 'product', 'Открытка ручной работы', 'otkrytka-ruchnoy-raboty', 'Открытка с нейтральным поздравлением.', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80', 190.00, NULL, NULL, 'orange', FALSE, 3),

    ((SELECT id FROM stores WHERE slug = 'beauty-lab'), 'product', 'Шампунь для объема', 'shampun-dlya-obema', 'Шампунь с мягкой формулой, 400 мл.', 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80', 690.00, NULL, NULL, 'pink', FALSE, 1),
    ((SELECT id FROM stores WHERE slug = 'beauty-lab'), 'product', 'Крем для рук', 'krem-dlya-ruk', 'Увлажняющий крем с маслом ши.', 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&q=80', 350.00, NULL, NULL, 'orange', FALSE, 2),
    ((SELECT id FROM stores WHERE slug = 'beauty-lab'), 'product', 'Маска для лица', 'maska-dlya-lica', 'Тканевая маска с гиалуроновой кислотой.', 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=80', 220.00, NULL, 'Уход', 'blue', FALSE, 3),

    ((SELECT id FROM stores WHERE slug = 'home-hub'), 'product', 'Средство для посуды', 'sredstvo-dlya-posudy', 'Концентрированное средство 500 мл.', 'https://images.unsplash.com/photo-1583947582886-f40ec95dd752?auto=format&fit=crop&w=800&q=80', 210.00, NULL, NULL, 'green', FALSE, 1),
    ((SELECT id FROM stores WHERE slug = 'home-hub'), 'product', 'Набор губок', 'nabor-gubok', '6 губок для кухни.', 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80', 145.00, NULL, NULL, 'orange', FALSE, 2),
    ((SELECT id FROM stores WHERE slug = 'home-hub'), 'product', 'Аромасвеча', 'aromasvecha', 'Свеча с ароматом хлопка и ванили.', 'https://images.unsplash.com/photo-1602872030219-ad2b9b45d8ea?auto=format&fit=crop&w=800&q=80', 590.00, 690.00, 'Уют', 'pink', FALSE, 3),

    ((SELECT id FROM stores WHERE slug = 'kids-island'), 'product', 'Пюре яблоко-груша', 'pyure-yabloko-grusha', 'Детское фруктовое пюре, 90 г.', 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80', 79.00, NULL, NULL, 'green', FALSE, 1),
    ((SELECT id FROM stores WHERE slug = 'kids-island'), 'product', 'Конструктор мини', 'konstruktor-mini', 'Набор для детей от 4 лет.', 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80', 890.00, NULL, 'Игрушка', 'blue', FALSE, 2),
    ((SELECT id FROM stores WHERE slug = 'kids-island'), 'product', 'Влажные салфетки', 'vlazhnye-salfetki', 'Гипоаллергенные салфетки, 120 шт.', 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80', 159.00, NULL, NULL, 'orange', FALSE, 3)
) AS seeded (
  store_id,
  type,
  name,
  slug,
  description,
  image_url,
  price,
  old_price,
  tag,
  tone,
  is_customizable,
  sort_order
);

INSERT INTO product_option_groups (
  product_id,
  name,
  selection_type,
  is_required,
  min_select,
  max_select,
  sort_order
)
VALUES
  ((SELECT id FROM products WHERE slug = 'avokado-roll'), 'Убрать из состава', 'multiple', FALSE, 0, 3, 1),
  ((SELECT id FROM products WHERE slug = 'avokado-roll'), 'Соус', 'single', TRUE, 1, 1, 2),
  ((SELECT id FROM products WHERE slug = 'avokado-roll'), 'Добавить ингредиенты', 'multiple', FALSE, 0, 2, 3),
  ((SELECT id FROM products WHERE slug = 'boul-s-lososem'), 'Основа', 'single', TRUE, 1, 1, 1),
  ((SELECT id FROM products WHERE slug = 'boul-s-lososem'), 'Соус', 'single', FALSE, 0, 1, 2),
  ((SELECT id FROM products WHERE slug = 'boul-s-lososem'), 'Топпинги', 'multiple', FALSE, 0, 3, 3);

INSERT INTO product_options (
  group_id,
  name,
  price_delta,
  is_default,
  sort_order
)
VALUES
  ((SELECT id FROM product_option_groups WHERE product_id = (SELECT id FROM products WHERE slug = 'avokado-roll') AND name = 'Убрать из состава'), 'Без лука', 0.00, FALSE, 1),
  ((SELECT id FROM product_option_groups WHERE product_id = (SELECT id FROM products WHERE slug = 'avokado-roll') AND name = 'Убрать из состава'), 'Без соуса', 0.00, FALSE, 2),
  ((SELECT id FROM product_option_groups WHERE product_id = (SELECT id FROM products WHERE slug = 'avokado-roll') AND name = 'Убрать из состава'), 'Без кунжута', 0.00, FALSE, 3),
  ((SELECT id FROM product_option_groups WHERE product_id = (SELECT id FROM products WHERE slug = 'avokado-roll') AND name = 'Соус'), 'Терияки', 0.00, TRUE, 1),
  ((SELECT id FROM product_option_groups WHERE product_id = (SELECT id FROM products WHERE slug = 'avokado-roll') AND name = 'Соус'), 'Острый соус', 20.00, FALSE, 2),
  ((SELECT id FROM product_option_groups WHERE product_id = (SELECT id FROM products WHERE slug = 'avokado-roll') AND name = 'Добавить ингредиенты'), 'Добавить сыр', 45.00, FALSE, 1),
  ((SELECT id FROM product_option_groups WHERE product_id = (SELECT id FROM products WHERE slug = 'avokado-roll') AND name = 'Добавить ингредиенты'), 'Добавить авокадо', 60.00, FALSE, 2),
  ((SELECT id FROM product_option_groups WHERE product_id = (SELECT id FROM products WHERE slug = 'boul-s-lososem') AND name = 'Основа'), 'Белый рис', 0.00, TRUE, 1),
  ((SELECT id FROM product_option_groups WHERE product_id = (SELECT id FROM products WHERE slug = 'boul-s-lososem') AND name = 'Основа'), 'Киноа', 50.00, FALSE, 2),
  ((SELECT id FROM product_option_groups WHERE product_id = (SELECT id FROM products WHERE slug = 'boul-s-lososem') AND name = 'Соус'), 'Фирменный', 0.00, TRUE, 1),
  ((SELECT id FROM product_option_groups WHERE product_id = (SELECT id FROM products WHERE slug = 'boul-s-lososem') AND name = 'Соус'), 'Спайси', 15.00, FALSE, 2),
  ((SELECT id FROM product_option_groups WHERE product_id = (SELECT id FROM products WHERE slug = 'boul-s-lososem') AND name = 'Топпинги'), 'Эдамаме', 35.00, FALSE, 1),
  ((SELECT id FROM product_option_groups WHERE product_id = (SELECT id FROM products WHERE slug = 'boul-s-lososem') AND name = 'Топпинги'), 'Манго', 40.00, FALSE, 2),
  ((SELECT id FROM product_option_groups WHERE product_id = (SELECT id FROM products WHERE slug = 'boul-s-lososem') AND name = 'Топпинги'), 'Халапеньо', 20.00, FALSE, 3);
