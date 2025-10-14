import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'
import { LogoutModalProvider } from './context/LogoutModalProvider.tsx'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <LogoutModalProvider>
        <App />
      </LogoutModalProvider>
    </AuthProvider>
  </StrictMode>
)
