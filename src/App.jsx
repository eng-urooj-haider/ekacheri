import { BrowserRouter as Router, Routes, Route } from "react-router";

import AppLayout from "./layout/AppLayout";

import ProtectedRoute from "./components/auth/ProtectedRoute";
// import GuestRoute from "./components/auth/GuestRoute";

// import GlobalLoader from "./components/common/GlobalLoader";

import Dashboard from "./pages/Dashboard/Dashboard";
import SignIn from "./pages/AuthPages/SignIn";

// City
import IndexCity from "./pages/city/Index";
import CreateCity from "./pages/city/Create";
import ShowCity from "./pages/city/Show";
import EditCity from "./pages/city/Edit";

// Location
import IndexLocation from "./pages/location/Index";
import CreateLocation from "./pages/location/Create";
import ShowLocation from "./pages/location/Show";
import EditLocation from "./pages/location/Edit";

// Department Focal Person
import IndexDPF from "./pages/dfp/Index";
import CreateDPF from "./pages/dfp/Create";
import ShowDPF from "./pages/dfp/Show";
import EditDPF from "./pages/dfp/Edit";

// Ekacheri
import EkacheriIndex from "./pages/ekacheri/Index";
import EkacheriCreate from "./pages/ekacheri/Create";

export default function App() {
  return (
    <Router>
      {/* <GlobalLoader /> */}

      <Routes>

        {/* Guest Routes */}
        <Route
          path="/login"
          element={
            // <GuestRoute>
              <SignIn />
            // </GuestRoute>
          }
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>

            <Route index element={<Dashboard />} />

            {/* Cities */}
            <Route path="cities">
              <Route index element={<IndexCity />} />
              <Route path="create" element={<CreateCity />} />
              <Route path=":id" element={<ShowCity />} />
              <Route path=":id/edit" element={<EditCity />} />
            </Route>

            {/* Locations */}
            <Route path="locations">
              <Route index element={<IndexLocation />} />
              <Route path="create" element={<CreateLocation />} />
              <Route path=":id" element={<ShowLocation />} />
              <Route path=":id/edit" element={<EditLocation />} />
            </Route>

            {/* Department Focal Persons */}
            <Route path="dfps">
              <Route index element={<IndexDPF />} />
              <Route path="create" element={<CreateDPF />} />
              <Route path=":id" element={<ShowDPF />} />
              <Route path=":id/edit" element={<EditDPF />} />
            </Route>

            {/* Ekacheri */}
            <Route path="ekacheries">
              <Route index element={<EkacheriIndex />} />
              <Route path="create" element={<EkacheriCreate />} />
            </Route>

          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<h1>404 | Page Not Found</h1>} />

      </Routes>
    </Router>
  );
}