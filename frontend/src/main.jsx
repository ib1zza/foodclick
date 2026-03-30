import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CategoryStoresPage from './pages/CategoryStoresPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import RestaurantCuisinePage from './pages/RestaurantCuisinePage.jsx'
import StorePage from './pages/StorePage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="categories/:slug" element={<CategoryStoresPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="restaurants/:slug" element={<RestaurantCuisinePage />} />
          <Route path="stores/:slug" element={<StorePage />} />
          <Route path="products/:id" element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
