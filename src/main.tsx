import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.tsx'
import './index.css'
import { CookiesProvider } from 'react-cookie';

createRoot(document.getElementById('root')!).render(

  <CookiesProvider>
    <App />
  </CookiesProvider>

)
