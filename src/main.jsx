import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { StateProviderWrapper } from './context/StateProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StateProviderWrapper>
      <App />
    </StateProviderWrapper>
  </StrictMode>,
)
