import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ContextProvider } from "./context/context.jsx"; // Import ContextProvider
import PrivateRoute from "./components/PrivateRoute.jsx";

const Register = lazy(() => import("./pages/register.jsx"));
const Login = lazy(() => import("./pages/login.jsx"));
const Dashboard = lazy(() => import("./pages/dashboard.jsx"));

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Suspense fallback={<h2>Loading...</h2>}>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
