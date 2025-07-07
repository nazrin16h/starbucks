import Header from './components/header/Header'
import Main from './components/main/Main'
import Footer from './components/footer/Footer'
import { Route, Routes } from 'react-router-dom'
import MenuPage from './components/menu/MenuPage'
import RewardsPage from './components/rewards/RewardsPage'
import GiftCardsPage from './components/giftCards/GiftCardsPage'
import PrevPage from './components/menu/PrevPage'
import FavPage from './components/menu/FavPage'
import MenuFeaturePage from './components/menu/MenuFeaturePage'
import Mapsection from './components/menu/Mapsection'
import DeliverySection from './components/menu/DeliverySection'
import GiftSeeAll from './components/giftCards/GiftSeeAll'
import GiftEcard from './components/giftCards/GiftEcard'
import ProductPage from './components/menu/Details/ProductPage'
import Basket from './components/menu/Basket'
import SignIn from './login/SingIn'
import SignUp from './login/SignUp'
import ScrollToTop from './utils/ScrollToTop'
import Customize from './components/menu/Details/Customize'
import BasketLayout from './layout/BasketLayout'
import Layout from './layout/Layout'
import AuthLayout from './layout/AuthLayout'

function App() {
  return (
    <div className=' flex flex-col min-h-screen'>

      <main className="flex-grow">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
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
            <Route path="/menu/:name/:subname" element={<MenuPage />} />
            <Route path="/menu/product/:subcategory/:productNumber" element={<ProductPage />} />
            <Route path="/customize" element={<Customize />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          <Route element={<BasketLayout />}>
            <Route path="/basket" element={<Basket />} />
          </Route>


        </Routes>
      </main>
    </div>
  )
}

export default App