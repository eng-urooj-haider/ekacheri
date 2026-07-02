import { createRoot } from "react-dom/client";
import "./index.css";
// import "swiper/swiper-bundle.css";
// import "flatpickr/dist/flatpickr.css";
import App from "./App";
import { LoadingProvider } from "./context/LoadingContext";
import AxiosInterceptor from "./api/AxiosInterceptor";
createRoot(document.getElementById("root")).render(
  <LoadingProvider>
    <AxiosInterceptor>
      <App />
    </AxiosInterceptor>
  </LoadingProvider>,
);
