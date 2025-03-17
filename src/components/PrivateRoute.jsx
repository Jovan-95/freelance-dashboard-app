import { Navigate } from "react-router";
import Context from "../context/context";
import { useContext } from "react";

export default function PrivateRoute({ children }) {
  const { state } = useContext(Context);

  const isAuthenticated = state.loggedInUsers.length > 0;

  return isAuthenticated ? children : <Navigate to="/" />;
}
