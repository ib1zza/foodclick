import { useDeferredValue, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchProducts } from "../lib/api";
import { formatPrice } from "../lib/foodclick";
import { useBasketStore } from "../store/useBasketStore";
import { CartIcon, SearchIcon, UserIcon } from "./icons";

function Header() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const deferredSearch = useDeferredValue(search);
  const navigate = useNavigate();
  const items = useBasketStore((state) => state.items);
  const openBasket = useBasketStore((state) => state.openBasket);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    let isMounted = true;

    async function loadResults() {
      if (deferredSearch.trim().length < 2) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const data = await searchProducts({
          search: deferredSearch,
          limit: 6,
        });

        if (!isMounted) {
          return;
        }

        setResults(data);
        setIsOpen(true);
      } catch (requestError) {
        if (!isMounted) {
          return;
        }

        setResults([]);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadResults();

    return () => {
      isMounted = false;
    };
  }, [deferredSearch]);

  function openProduct(productId) {
    setIsOpen(false);
    setSearch("");
    navigate(`/products/${productId}`);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (results[0]) {
      openProduct(results[0].id);
    }
  }

  return (
    <header className="header-wrapper">
      <div className="fc-header">
        <Link className="fc-brand" to="/">
          <span>ФудКлик</span>
        </Link>

        <form className="fc-search" onSubmit={handleSubmit}>
          <SearchIcon />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onBlur={() => {
              window.setTimeout(() => {
                setIsOpen(false);
              }, 120);
            }}
            onFocus={() => {
              if (results.length > 0) {
                setIsOpen(true);
              }
            }}
            placeholder="Поиск товаров по всем магазинам"
          />

          {isOpen && (search.trim().length >= 2 || isLoading) ? (
            <div className="search-dropdown">
              {isLoading ? (
                <p className="search-dropdown__state">Ищем товары...</p>
              ) : null}
              {!isLoading && results.length === 0 ? (
                <p className="search-dropdown__state">Ничего не найдено</p>
              ) : null}
              {!isLoading
                ? results.map((product) => (
                    <button
                      className="search-dropdown__item"
                      type="button"
                      key={product.id}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => openProduct(product.id)}
                    >
                      <div>
                        <strong>{product.name}</strong>
                        <span>{product.store.name}</span>
                      </div>
                      <span>{formatPrice(product.price)}</span>
                    </button>
                  ))
                : null}
            </div>
          ) : null}
        </form>

        <div className="fc-actions">
          <Link className="icon-button" to="/register" aria-label="Профиль">
            <UserIcon />
          </Link>
          <Link
            className="icon-button icon-button--favorite"
            to="/favorites"
            aria-label="Избранное"
          >
            ❤
          </Link>
          <button
            className="icon-button icon-button--basket"
            type="button"
            aria-label="Корзина"
            onClick={openBasket}
          >
            <CartIcon />
            {itemCount > 0 ? (
              <span className="basket-counter">{itemCount}</span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
