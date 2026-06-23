import { BrowserRouter as Router, Routes, Route } from "react-router";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Dashboard/Home";
import Calendar from "./pages/Dashboard/Calender.jsx";
import ViewUser from "./pages/Dashboard/ViewUser";
import EditUser from "./pages/Dashboard/EditUser";

export default function App() {
  return <>
      <Router>
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/users/:id" element={<ViewUser />} />
            <Route path="/users/:id/edit" element={<EditUser />} />
          </Route>
        </Routes>
      </Router>
    </>;
}