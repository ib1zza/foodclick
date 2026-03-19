import { useEffect } from 'react'
import { useBasketStore } from '../store/useBasketStore'

function formatPrice(value) {
  return `${new Intl.NumberFormat('ru-RU').format(value)} ₽`
}

function BasketModal() {
  const isOpen = useBasketStore((state) => state.isOpen)
  const items = useBasketStore((state) => state.items)
  const closeBasket = useBasketStore((state) => state.closeBasket)
  const increaseItem = useBasketStore((state) => state.increaseItem)
  const decreaseItem = useBasketStore((state) => state.decreaseItem)
  const removeItem = useBasketStore((state) => state.removeItem)
  const clearBasket = useBasketStore((state) => state.clearBasket)
  const totalPrice = items.reduce(
    (total, item) => total + item.priceValue * item.quantity,
    0,
  )

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeBasket()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [closeBasket, isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="basket-modal-overlay"
      role="presentation"
      onClick={closeBasket}
    >
      <section
        className="basket-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Корзина"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="basket-modal__header">
          <div>
            <p className="basket-modal__eyebrow">Ваш заказ</p>
            <h2>Корзина</h2>
          </div>
          <button
            className="basket-modal__close"
            type="button"
            onClick={closeBasket}
          >
            Закрыть
          </button>
        </div>

        {items.length === 0 ? (
          <div className="basket-empty-state">
            <h3>Пока пусто</h3>
            <p>Добавьте товары из магазина, и они сразу появятся здесь.</p>
          </div>
        ) : (
          <>
            <div className="basket-modal__list">
              {items.map((item) => (
                <article className="basket-modal__item" key={item.id}>
                  <div className="basket-modal__item-copy">
                    <span className="basket-modal__tag">{item.tag}</span>
                    <h3>{item.title ?? item.name}</h3>
                    <p>{item.description}</p>
                    {item.selectedOptions?.length ? (
                      <p className="basket-modal__options">
                        {item.selectedOptions.map((option) => option.name).join(', ')}
                      </p>
                    ) : null}
                  </div>

                  <div className="basket-modal__item-side">
                    <strong>{formatPrice(item.priceValue * item.quantity)}</strong>
                    <div className="basket-quantity">
                      <button type="button" onClick={() => decreaseItem(item.id)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => increaseItem(item.id)}>
                        +
                      </button>
                    </div>
                    <button
                      className="basket-remove"
                      type="button"
                      onClick={() => removeItem(item.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="basket-modal__footer">
              <button className="basket-clear" type="button" onClick={clearBasket}>
                Очистить
              </button>

              <div className="basket-modal__summary">
                <div>
                  <span>Итого</span>
                  <strong>{formatPrice(totalPrice)}</strong>
                </div>
                <button className="basket-checkout" type="button">
                  Оформить заказ
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default BasketModal
