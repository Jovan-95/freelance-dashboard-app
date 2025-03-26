import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "../components/Modal";
import Context from "../context/context";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useContext(Context);

  function handleLogoutModal() {
    setIsOpen((prev) => !prev);
  }

  function handleLogoutUser() {
    console.log("logout");
    dispatch({ type: "logoutUser" });
  }

  return (
    <div className="nav-wrapper">
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/projects">Projects</NavLink>
          </li>
          <li>
            <NavLink to="/invoices">Invoices</NavLink>
          </li>
          <li>
            <NavLink to="/insights">Insights</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/">Register</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li
            style={{ color: "white", fontWeight: "700", cursor: "pointer" }}
            onClick={handleLogoutModal}
          >
            LOGOUT
          </li>
        </ul>
        <div className={isOpen ? "d-block" : "d-none"}>
          <Modal>
            <div>Are you sure you want to logout?</div>
            <button onClick={handleLogoutUser}>Logout</button>
          </Modal>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
