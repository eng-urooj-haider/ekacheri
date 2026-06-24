import { BrowserRouter as Router, Routes, Route } from "react-router";
import AppLayout from "./layout/AppLayout";
// import Home from "./pages/Dashboard/City.jsx";
import IndexCity from "./pages/city/Index.jsx";
import CreateCity from "./pages/city/Create.jsx";
import ShowCity from "./pages/city/Show.jsx";
import EditCity from "./pages/city/Edit.jsx";
import IndexLocation from "./pages/location/Index.jsx";
import CreateLocation from "./pages/location/Create.jsx";
import ShowLocation from "./pages/location/Show.jsx";
import EditLocation from "./pages/location/Edit.jsx";
import IndexDPF from "./pages/dfp/Index.jsx";
import CreateDPF from "./pages/dfp/Create.jsx";
import ShowDPF from "./pages/dfp/Show.jsx";
import EditDPF from "./pages/dfp/Edit.jsx";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            {/* <Route index path="/" element={<Home />} /> */}
            <Route path="/cities" element={<IndexCity />} />
            <Route path="cities/create" element={<CreateCity />} />
            <Route path="cities/:id" element={<ShowCity />} />
            <Route path="cities/:id/edit" element={<EditCity />} />
            <Route path="/locations" element={<IndexLocation />} />
            <Route path="locations/create" element={<CreateLocation />} />
            <Route path="locations/:id" element={<ShowLocation />} />
            <Route path="locations/:id/edit" element={<EditLocation />} />
            <Route path="/dfps" element={<IndexDPF />} />
            <Route path="dfps/create" element={<CreateDPF />} />
            <Route path="dfps/:id" element={<ShowDPF />} />
            <Route path="dfps/:id/edit" element={<EditDPF />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
