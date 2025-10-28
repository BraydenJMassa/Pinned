import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { ConfirmationModalProvider } from "./context/ConfirmationModalProvider.tsx";
import { PinModalProvider } from "./context/PinModalProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ConfirmationModalProvider>
        <PinModalProvider>
          <App />
        </PinModalProvider>
      </ConfirmationModalProvider>
    </AuthProvider>
  </StrictMode>
);
