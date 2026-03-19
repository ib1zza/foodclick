export function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16L21 21" />
    </svg>
  )
}

export function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.8-3.8 11.2-3.8 14 0" />
    </svg>
  )
}

export function CartIcon() {
  return (
    <svg viewBox="0 0 45 43" aria-hidden="true">
      <path d="M1 1H8.81818L14.0564 27.1424C14.2351 28.0412 14.7246 28.8487 15.4393 29.4233C16.1539 29.998 17.0482 30.3033 17.9655 30.2857H36.9636C37.8809 30.3033 38.7751 29.998 39.4898 29.4233C40.2045 28.8487 40.694 28.0412 40.8727 27.1424L44 10.7619H10.7727M18.5909 40.0476C18.5909 41.1259 17.7158 42 16.6364 42C15.5569 42 14.6818 41.1259 14.6818 40.0476C14.6818 38.9693 15.5569 38.0952 16.6364 38.0952C17.7158 38.0952 18.5909 38.9693 18.5909 40.0476ZM40.0909 40.0476C40.0909 41.1259 39.2158 42 38.1364 42C37.0569 42 36.1818 41.1259 36.1818 40.0476C36.1818 38.9693 37.0569 38.0952 38.1364 38.0952C39.2158 38.0952 40.0909 38.9693 40.0909 40.0476Z" />
    </svg>
  )
}

export function Chevron({ direction = 'right' }) {
  return (
    <svg
      className={`chevron chevron-${direction}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M8 4l8 8-8 8" />
    </svg>
  )
}

export function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  )
}

export function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.8l2.5 5 5.5.8-4 3.9 1 5.5-5-2.6-5 2.6 1-5.5-4-3.9 5.5-.8z" />
    </svg>
  )
}
