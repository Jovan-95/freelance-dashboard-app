import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Register</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
