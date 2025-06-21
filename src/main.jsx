import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { BasketProvider } from "./context/BasketContext";

createRoot(document.getElementById('root')).render(
  <BasketProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </BasketProvider>

)
