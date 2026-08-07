import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AppToaster from "./components/AppToaster.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <AppToaster />
  </StrictMode>,
);
