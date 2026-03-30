import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../lib/api";
import { Chevron } from "../components/icons";
import {
  formatPrice,
  mapProductForBasket,
  mapProductForFavorite,
} from "../lib/foodclick";
import { useBasketStore } from "../store/useBasketStore";
import { useFavoritesStore } from "../store/useFavoritesStore";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOptionsByGroup, setSelectedOptionsByGroup] = useState({});
  const addItem = useBasketStore((state) => state.addItem);
  const openBasket = useBasketStore((state) => state.openBasket);
  const favorites = useFavoritesStore((state) => state.items);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      setIsLoading(true);
      setError("");

      try {
        const data = await getProduct(id);

        if (!isMounted) {
          return;
        }

        setProduct(data);
        setSelectedOptionsByGroup(
          data.option_groups.reduce((accumulator, group) => {
            accumulator[group.id] = group.options
              .filter((option) => option.is_default)
              .map((option) => option.id);
            return accumulator;
          }, {}),
        );
      } catch (requestError) {
        if (!isMounted) {
          return;
        }

        setError("Не удалось загрузить карточку товара");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (id) {
      void loadProduct();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const selectedOptions = useMemo(() => {
    if (!product) {
      return [];
    }

    return product.option_groups.flatMap((group) =>
      group.options.filter((option) =>
        (selectedOptionsByGroup[group.id] ?? []).includes(option.id),
      ),
    );
  }, [product, selectedOptionsByGroup]);

  const extraPrice = useMemo(
    () =>
      selectedOptions.reduce(
        (total, option) => total + Number(option.price_delta || 0),
        0,
      ),
    [selectedOptions],
  );

  const totalPrice = useMemo(
    () => Number(product?.price || 0) + extraPrice,
    [extraPrice, product?.price],
  );

  const validationErrors = useMemo(() => {
    if (!product?.is_customizable) {
      return [];
    }

    return product.option_groups.flatMap((group) => {
      const selectedCount = (selectedOptionsByGroup[group.id] ?? []).length;

      if (group.is_required && selectedCount < group.min_select) {
        return [
          `Выберите минимум ${group.min_select} в группе "${group.name}"`,
        ];
      }

      if (selectedCount > group.max_select) {
        return [
          `В группе "${group.name}" можно выбрать максимум ${group.max_select}`,
        ];
      }

      return [];
    });
  }, [product, selectedOptionsByGroup]);

  const isFavorite = useMemo(() => {
    if (!product) {
      return false;
    }

    return favorites.some((item) => item.id === Number(product.id));
  }, [favorites, product]);

  function toggleOption(group, optionId) {
    setSelectedOptionsByGroup((currentState) => {
      const currentSelection = currentState[group.id] ?? [];

      if (group.selection_type === "single") {
        return {
          ...currentState,
          [group.id]:
            currentSelection.includes(optionId) && !group.is_required
              ? []
              : [optionId],
        };
      }

      const hasOption = currentSelection.includes(optionId);

      if (hasOption) {
        if (group.is_required && currentSelection.length <= group.min_select) {
          return currentState;
        }

        return {
          ...currentState,
          [group.id]: currentSelection.filter((id) => id !== optionId),
        };
      }

      if (currentSelection.length >= group.max_select) {
        return currentState;
      }

      return {
        ...currentState,
        [group.id]: [...currentSelection, optionId],
      };
    });
  }

  if (isLoading) {
    return (
      <main className="foodclick-page product-page">
        <section className="product-page__shell">
          <p className="section-state">Загружаем товар...</p>
        </section>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="foodclick-page product-page">
        <section className="product-page__shell">
          <p className="section-state section-state--error">
            {error || "Товар не найден"}
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="foodclick-page product-page">
      <section className="product-page__shell">
        <Link className="back-link" to={`/stores/${product.store.slug}`}>
          <Chevron direction="left" />В магазин
        </Link>

        <div className="product-page__grid">
          <article className="product-page__hero">
            <div className="product-page__image-wrap">
              <img
                className="product-page__image"
                src={product.image_url}
                alt={product.name}
              />
            </div>

            <div className="product-page__copy">
              <span className="store-badge">{product.store.name}</span>
              <h1>{product.name}</h1>
              <p>{product.description}</p>

              <div className="product-page__meta">
                <strong>{formatPrice(totalPrice)}</strong>
                <span>{product.type === "dish" ? "Блюдо" : "Товар"}</span>
                {product.is_customizable ? <span>Есть конструктор</span> : null}
              </div>

              {selectedOptions.length > 0 ? (
                <p className="product-page__summary">
                  Выбрано:{" "}
                  {selectedOptions.map((option) => option.name).join(", ")}
                </p>
              ) : null}

              <button
                className="product-page__cta"
                type="button"
                disabled={validationErrors.length > 0}
                onClick={() => {
                  addItem(
                    mapProductForBasket({
                      ...product,
                      selectedOptions,
                      priceValue: totalPrice,
                    }),
                  );
                  openBasket();
                }}
              >
                Добавить в корзину
              </button>

              <button
                className={`product-page__favorite ${isFavorite ? "product-page__favorite--active" : ""}`}
                type="button"
                onClick={() =>
                  toggleFavorite(
                    mapProductForFavorite(product, {
                      slug: product.store.slug,
                      name: product.store.name,
                    }),
                  )
                }
              >
                {isFavorite
                  ? // broken heard
                    "❤ Убрать из избранного"
                  : "❤ Добавить в избранное"}
              </button>

              {validationErrors.length > 0 ? (
                <div className="product-page__validation">
                  {validationErrors.map((validationError) => (
                    <p key={validationError}>{validationError}</p>
                  ))}
                </div>
              ) : null}
            </div>
          </article>

          <section className="product-page__options">
            <h2>Опции</h2>
            {!product.is_customizable || product.option_groups.length === 0 ? (
              <p className="section-state">
                У этого товара нет настраиваемых опций.
              </p>
            ) : (
              <div className="product-options-list">
                {product.option_groups.map((group) => (
                  <article className="product-option-group" key={group.id}>
                    <div className="product-option-group__header">
                      <h3>{group.name}</h3>
                      <p>
                        {group.selection_type === "single"
                          ? "Один вариант"
                          : `До ${group.max_select} вариантов`}
                        {group.is_required
                          ? ", обязательно"
                          : ", необязательно"}
                      </p>
                    </div>

                    <div className="product-option-group__items">
                      {group.options.map((option) => (
                        <button
                          className={`product-option-row ${
                            (selectedOptionsByGroup[group.id] ?? []).includes(
                              option.id,
                            )
                              ? "product-option-row--selected"
                              : ""
                          }`}
                          type="button"
                          key={option.id}
                          onClick={() => toggleOption(group, option.id)}
                        >
                          <div>
                            <strong>{option.name}</strong>
                            {option.is_default ? (
                              <span>По умолчанию</span>
                            ) : null}
                          </div>
                          <span>
                            {Number(option.price_delta) > 0
                              ? `+${formatPrice(option.price_delta)}`
                              : "Бесплатно"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

export default ProductPage;
