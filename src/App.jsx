import { BrowserRouter as Router, Routes, Route } from "react-router";
import { lazy } from "react";
import AppLayout from "./layout/AppLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
// import GuestRoute from "./components/auth/GuestRoute";

import GlobalLoader from "./components/common/GlobalLoader";

import Dashboard from "./pages/Dashboard/Dashboard";
import SignIn from "./pages/AuthPages/SignIn";

const IndexCity = lazy(() => import("./pages/city/Index"));
const CreateCity = lazy(() => import("./pages/city/Create"));
const ShowCity = lazy(() => import("./pages/city/Show"));
const EditCity = lazy(() => import("./pages/city/Edit"));

const IndexLocation = lazy(() => import("./pages/location/Index"));
const CreateLocation = lazy(() => import("./pages/location/Create"));
const ShowLocation = lazy(() => import("./pages/location/Show"));
const EditLocation = lazy(() => import("./pages/location/Edit"));

const IndexDPF = lazy(() => import("./pages/dfp/Index"));
const CreateDPF = lazy(() => import("./pages/dfp/Create"));
const ShowDPF = lazy(() => import("./pages/dfp/Show"));
const EditDPF = lazy(() => import("./pages/dfp/Edit"));

const IndexDepartment = lazy(() => import("./pages/department/Index"));
const CreateDepartment = lazy(() => import("./pages/department/Create"));
const ShowDepartment = lazy(() => import("./pages/department/Show"));
const EditDepartment = lazy(() => import("./pages/department/Edit"));

const EkacheriIndex = lazy(() => import("./pages/ekacheri/Index"));
const EkacheriCreate = lazy(() => import("./pages/ekacheri/Create"));

const ComplaintIndex = lazy(() => import("./pages/complaint/Index"));
const ComplaintCreate = lazy(() => import("./pages/complaint/Create"));

const UserIndex = lazy(() => import("./pages/user/Index"));
const UserCreate = lazy(() => import("./pages/user/Create"));

export default function App() {
  return (
    <Router>
      <GlobalLoader />
      {/* <Suspense fallback={<GlobalLoader />}> */}
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
            {/* Deparments */}
            <Route path="/departments">
              <Route index element={<IndexDepartment />} />
              <Route path="create" element={<CreateDepartment />} />
              <Route path=":id" element={<ShowDepartment />} />
              <Route path=":id/edit" element={<EditDepartment />} />
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
            <Route path="complaints">
              <Route index element={<ComplaintIndex />} />
              <Route path="create" element={<ComplaintCreate />} />
            </Route>
            <Route path="users">
              <Route index element={<UserIndex />} />
              <Route path="create" element={<UserCreate />} />
            </Route>
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<h1>404 | Page Not Found</h1>} />
      </Routes>
      {/* </Suspense> */}
    </Router>
  );
}
