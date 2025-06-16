import Header from './components/header/Header'
import Main from './components/main/Main'
import Footer from './components/footer/Footer'
import { Route, Routes } from 'react-router-dom'
import MenuPage from './components/menu/MenuPage'
import RewardsPage from './components/menu/rewards/RewardsPage'
import GiftCardsPage from './components/giftCards/GiftCardsPage'
import PrevPage from './components/menu/PrevPage'
import FavPage from './components/menu/FavPage'
import MenuFeaturePage from './components/menu/MenuFeaturePage'
import Mapsection from './components/menu/Mapsection'
import DeliverySection from './components/menu/DeliverySection'
import GiftSeeAll from './components/giftCards/GiftSeeAll'
import GiftEcard from './components/giftCards/GiftEcard'
import CategoryContent from './components/menu/CategoryContent'

function App() {
  return (
    <div className=' flex flex-col min-h-screen'>
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/giftCards" element={<GiftCardsPage />} />
          <Route path="/previousPage" element={<PrevPage />} />
          <Route path="/favouritePage" element={<FavPage />} />
          <Route path="/feature" element={<MenuFeaturePage />} />
          <Route path="/mapSection" element={<Mapsection />} />
          <Route path="/delivery" element={<DeliverySection />} />
          <Route path="/see-all" element={<GiftSeeAll />} />
          <Route path="/Ecard" element={<GiftEcard />} />
          <Route path="/menu/:category/:subcategory" element={<CategoryContent />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App