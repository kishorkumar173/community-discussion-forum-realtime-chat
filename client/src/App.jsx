import {
  Routes,
  Route,
} from "react-router-dom";
import Notifications
from "./pages/Notifications";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CreateDiscussion from "./pages/CreateDiscussion";
import DiscussionDetails from "./pages/DiscussionDetails";

function App() {
  return (
    <Routes>

      {/* Auth */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Main */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

      <Route
        path="/create-discussion"
        element={
          <CreateDiscussion />
        }
      />

      <Route
        path="/discussion/:id"
        element={
          <DiscussionDetails />
        }
      />

      {/* Default */}
      <Route
        path="/"
        element={<Login />}
      />
<Route
  path="/notifications"
  element={
    <Notifications />
  }
/>
    </Routes>
  );
}

export default App;