import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { UserProvider } from "./context/UserContext";
// import "swiper/swiper-bundle.css";
// import "flatpickr/dist/flatpickr.css";
import App from "./App";
import { LoadingProvider } from "./context/LoadingContext";
import AxiosInterceptor from "./api/AxiosInterceptor.js";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <LoadingProvider>
    <AxiosInterceptor>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
      <ReactQueryDevtools initialIsOpen={true} />
          <App />
        </UserProvider>
      </QueryClientProvider>
    </AxiosInterceptor>
  </LoadingProvider>,
);