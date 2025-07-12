import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { BasketProvider } from "./context/BasketContext";
import SelectContext from './context/SelectContext.jsx';
import DataContext from './context/DataContext.jsx';
import LocationContext from './context/LocationContext.jsx';
import { LoadingProvider } from './context/LoadingContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <DataContext>
      <BasketProvider>
        <SelectContext>
          <LocationContext>
            <LoadingProvider>
              <App />
            </LoadingProvider>
          </LocationContext>
        </SelectContext>
      </BasketProvider>
    </DataContext>
  </BrowserRouter >

)
