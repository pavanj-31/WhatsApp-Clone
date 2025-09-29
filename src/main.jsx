import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthWrapper from './components/AuthContext.jsx'
// import PropDrillingSoln from './PropDrillingSoln.jsx'

createRoot(document.getElementById('root')).render(
  <AuthWrapper>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthWrapper>
  // <PropDrillingSoln></PropDrillingSoln>
)
