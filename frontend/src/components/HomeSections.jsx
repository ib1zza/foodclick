import { useDeferredValue, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getPromotions, getStoreCategories, getStores } from "../lib/api";
import {
  assets,
  categoryImageBySlug,
  cuisines,
  formatCategoryTitle,
  restaurantCuisineMap,
} from "../lib/foodclick";
import { Chevron, PlusIcon } from "./icons";
import "swiper/css";
import "swiper/css/navigation";

export function IntroSection() {
  return (
    <section className="intro-section" id="top">
      <h1>Быстрая доставка еды и не только</h1>
      <p>А также дешево и вкусно!</p>
    </section>
  );
}

export function PromoSection() {
  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPromotions() {
      try {
        const data = await getPromotions();

        if (!isMounted) {
          return;
        }

        setPromotions(data);
      } catch (requestError) {
        if (!isMounted) {
          return;
        }

        setError("Не удалось загрузить акции");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadPromotions();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <section className="promo-section promo-section--loading">
        <p className="section-state">Загружаем акции...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="promo-section promo-section--loading">
        <p className="section-state section-state--error">{error}</p>
      </section>
    );
  }

  if (promotions.length === 0) {
    return null;
  }

  return (
    <section className="promo-section">
      <button
        ref={prevButtonRef}
        className="slider-arrow left"
        type="button"
        aria-label="Назад"
      >
        <Chevron direction="left" />
      </button>

      <Swiper
        className="promo-slider"
        modules={[Navigation]}
        slidesPerView={1}
        loop={promotions.length > 1}
        navigation={{
          prevEl: prevButtonRef.current,
          nextEl: nextButtonRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevButtonRef.current;
          swiper.params.navigation.nextEl = nextButtonRef.current;
        }}
      >
        {promotions.map((promotion) => (
          <SwiperSlide key={promotion.id}>
            <Link
              className="promo-slide"
              to={`/stores/${promotion.store.slug}`}
              aria-label={`Открыть магазин ${promotion.store.name}`}
            >
              <img
                className="promo-image"
                src={promotion.image_url}
                alt={promotion.title}
              />
              <div className="promo-overlay" aria-hidden="true" />
              <div className="promo-copy">
                <span className="promo-chip">Акция</span>
                <strong>{promotion.title}</strong>
                <p>{promotion.description}</p>
                <span className="promo-store">{promotion.store.name}</span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        ref={nextButtonRef}
        className="slider-arrow right"
        type="button"
        aria-label="Вперед"
      >
        <Chevron direction="right" />
      </button>
    </section>
  );
}

export function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadCategories() {
      try {
        const data = await getStoreCategories();

        if (!isMounted) {
          return;
        }

        setCategories(data);
      } catch (requestError) {
        if (!isMounted) {
          return;
        }

        setError("Не удалось загрузить категории");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="section-block">
      <div className="wave-line" aria-hidden="true">
        <svg
          width="1440"
          height="1218"
          viewBox="0 0 1440 1218"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_38_172)">
            <path
              d="M-329 27.504C-329 27.504 2.86128 24.6241 105.485 173.892C195.851 305.331 54.9248 442.59 128.822 584.34C278.417 871.289 854.566 494.219 942.195 645.977C1029.82 797.735 1031.81 1001.69 1207.14 1113.16C1353.36 1206.12 1498.4 1163.36 1643 1182.5"
              stroke="#93DB8F"
              stroke-width="55"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_38_172"
              x="-333.226"
              y="0"
              width="1983.84"
              height="1217.76"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_38_172"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_38_172"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>

      <h2>Категории</h2>
      <div className="category-grid">
        {isLoading ? (
          <p className="section-state">Загружаем категории...</p>
        ) : null}
        {error ? (
          <p className="section-state section-state--error">{error}</p>
        ) : null}
        {!isLoading && !error
          ? categories.map((category) => (
              <Link
                className="category-card"
                key={category.slug}
                to={`/categories/${category.slug}`}
              >
                <div className="category-card__image">
                  <img
                    src={
                      categoryImageBySlug[category.slug] ?? assets.groceryArt
                    }
                    alt=""
                  />
                </div>
                <h3>
                  {formatCategoryTitle(category.name).map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h3>
              </Link>
            ))
          : null}
      </div>
    </section>
  );
}

export function StoresSection() {
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    let isMounted = true;

    async function loadStores() {
      try {
        const data = await getStores({
          search: deferredSearch,
        });

        const uniqueStores = [];
        const seenCategories = new Set();

        for (const store of data) {
          const categorySlug = store.category?.slug;

          if (!categorySlug || seenCategories.has(categorySlug)) {
            continue;
          }

          seenCategories.add(categorySlug);
          uniqueStores.push(store);
        }

        if (!isMounted) {
          return;
        }

        setStores(uniqueStores);
      } catch (requestError) {
        if (!isMounted) {
          return;
        }

        setError("Не удалось загрузить магазины");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadStores();

    return () => {
      isMounted = false;
    };
  }, [deferredSearch]);

  return (
    <section className="section-block stores-section">
      <div className="section-title">
        <h2>Магазины</h2>
        <Link to="/categories/restorany-i-kafe" className="view-all">
          Все
          <Chevron direction="right" />
        </Link>
      </div>

      <div className="section-search">
        <input
          className="section-search__input"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Найти магазин"
        />
      </div>

      <div className="store-grid">
        {isLoading ? (
          <p className="section-state">Загружаем магазины...</p>
        ) : null}
        {error ? (
          <p className="section-state section-state--error">{error}</p>
        ) : null}
        {!isLoading && !error && stores.length === 0 ? (
          <p className="section-state">
            По вашему запросу магазины не найдены.
          </p>
        ) : null}
        {!isLoading && !error
          ? stores.map((store) => (
              <Link
                className="store-card"
                key={store.slug}
                to={`/stores/${store.slug}`}
              >
                <div className="store-card__logo">
                  <img src={store.logo_url} alt={store.name} />
                </div>
                <p>{store.delivery_time_text}</p>
              </Link>
            ))
          : null}
      </div>
    </section>
  );
}

export function CuisinesSection() {
  return (
    <section className="wave-section">
      <div className="cuisine-grid">
        {cuisines.map((item) => {
          const slug = Object.entries(restaurantCuisineMap).find(
            ([, value]) => value.title === item.title,
          )?.[0]

          return (
            <Link
              className="cuisine-card"
              key={item.title}
              to={`/restaurants/${slug}`}
            >
              <div className="cuisine-card__icon">
                {item.image ? (
                  <img src={item.image} alt="" />
                ) : (
                  <span>{item.emoji}</span>
                )}
              </div>
              <p>{item.title}</p>
            </Link>
          )
        })}
      </div>
    </section>
  );
}

export function CollectionsSection() {
  return (
    <section className="collections-section">
      <article className="collection-card">
        <div className="collection-card__visual">
          <img src={assets.heartArt} alt="" />
        </div>
        <div className="collection-card__copy">
          <h3>Избранное</h3>
          <p>Пока ничего нет</p>
        </div>
      </article>

      <article className="collection-card">
        <div className="collection-card__visual collection-card__visual--empty">
          <PlusIcon />
        </div>
        <div className="collection-card__copy">
          <h3>Создать</h3>
          <p>Новую подборку</p>
        </div>
      </article>
    </section>
  );
}
