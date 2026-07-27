import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
// import "swiper/swiper-bundle.css";
// import "flatpickr/dist/flatpickr.css";
import App from "./App";
import { LoadingProvider } from "./context/LoadingContext";
import AxiosInterceptor from "./api/AxiosInterceptor.js";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <LoadingProvider>
    <AxiosInterceptor>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AxiosInterceptor>
  </LoadingProvider>,
);
