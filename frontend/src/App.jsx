import { Outlet } from 'react-router-dom'
import BasketModal from './components/BasketModal'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="foodclick-app">
      <div className="foodclick-page-shell">
        <Header />
        <Outlet />
      </div>
      <BasketModal />
      <Footer />
    </div>
  )
}

export default App
