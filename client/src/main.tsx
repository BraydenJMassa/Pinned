import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'
import { ConfirmationModalProvider } from './context/ConfirmationModalProvider.tsx'
import { TodoModalProvider } from './context/TodoModalProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ConfirmationModalProvider>
        <TodoModalProvider>
          <App />
        </TodoModalProvider>
      </ConfirmationModalProvider>
    </AuthProvider>
  </StrictMode>
)
