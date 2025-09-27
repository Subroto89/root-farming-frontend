import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/router";
import "leaflet/dist/leaflet.css";
import AuthProvider from "./contexts/AuthProvider.jsx";
import "leaflet-geosearch/dist/geosearch.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./contexts/ThemeProvider.jsx";

// 1. Create a client instance
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
