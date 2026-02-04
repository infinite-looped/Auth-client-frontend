import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { AuthProvider } from "./features/auth/context/AuthContext";
import App from "./App";
import "./index.css";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
