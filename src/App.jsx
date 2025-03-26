import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ContextProvider } from "./context/context.jsx"; // Import ContextProvider
import PrivateRoute from "./components/PrivateRoute.jsx";
import { HttpContextProvider } from "./context/httpContext.jsx";

const Register = lazy(() => import("./pages/register.jsx"));
const Login = lazy(() => import("./pages/login.jsx"));
const Dashboard = lazy(() => import("./pages/dashboard.jsx"));
const Projects = lazy(() => import("./pages/projects.jsx"));
const Invoices = lazy(() => import("./pages/invoices.jsx"));
const Insights = lazy(() => import("./pages/insights.jsx"));
const Profile = lazy(() => import("./pages/profile.jsx"));

function App() {
  return (
    <ContextProvider>
      <HttpContextProvider>
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
              <Route
                path="/projects"
                element={
                  <PrivateRoute>
                    <Projects />
                  </PrivateRoute>
                }
              />
              <Route
                path="/invoices"
                element={
                  <PrivateRoute>
                    <Invoices />
                  </PrivateRoute>
                }
              />
              <Route
                path="/insights"
                element={
                  <PrivateRoute>
                    <Insights />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </HttpContextProvider>
    </ContextProvider>
  );
}

export default App;
