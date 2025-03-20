import { useNavigate } from "react-router-dom";
import Navigation from "../components/navigation";
import { useState, useContext } from "react";
import Context from "../context/context";

export default function Register() {
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();
  const [userObj, setUserObj] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return regex.test(email);
  };

  function handleRegisterUser(e) {
    e.preventDefault();

    if (
      userObj.name === "" ||
      userObj.email === "" ||
      userObj.password === "" ||
      userObj.confirmPassword === ""
    )
      return alert("Fill all fields!");

    if (userObj.name.length <= 2) {
      return alert("Name need to have 3 or more chars!");
    }

    if (userObj.password.length <= 6) {
      return alert("Password needs to be longer!");
    }

    if (userObj.password !== userObj.confirmPassword) {
      return alert("Password are not matching!");
    }

    if (!validateEmail(userObj.email)) {
      return alert("Invalid Email!");
    }

    dispatch({ type: "registerUser", payload: userObj });

    // Reset states

    setUserObj({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    navigate("/login");
  }

  function goToLogin() {
    navigate("/login");
  }

  return (
    <div className="auth-wrapper">
      {/* <Navigation /> */}
      <div className="form-wrapper">
        <form>
          <h1>Register </h1>
          <div className="input-wrapper">
            <label htmlFor="name">Full Name:</label>
            <input
              onChange={(e) => setUserObj({ ...userObj, name: e.target.value })}
              value={userObj.name}
              type="text"
              id="name"
              name="name"
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="email">Email:</label>
            <input
              onChange={(e) =>
                setUserObj({ ...userObj, email: e.target.value })
              }
              value={userObj.email}
              type="email"
              id="email"
              name="email"
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password:</label>
            <input
              onChange={(e) =>
                setUserObj({ ...userObj, password: e.target.value })
              }
              value={userObj.password}
              type="password"
              id="password"
              name="password"
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              onChange={(e) =>
                setUserObj({ ...userObj, confirmPassword: e.target.value })
              }
              value={userObj.confirmPassword}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
            />
          </div>

          <button onClick={handleRegisterUser} type="submit">
            Register
          </button>
          <p>
            Already have an account?{" "}
            <span style={{ cursor: "pointer" }} onClick={goToLogin}>
              Login here!
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
