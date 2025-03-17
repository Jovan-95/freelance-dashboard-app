import { useNavigate } from "react-router-dom";
import Navigation from "../components/navigation";
import { useContext, useEffect, useState } from "react";
import Context from "../context/context";

function Login() {
  const navigate = useNavigate();

  const [loginObj, setLoginObj] = useState({
    name: "",
    password: "",
  });
  const { state, dispatch } = useContext(Context);
  const users = state.users;

  // LocalStorage, check for logged user
  useEffect(() => {
    const loggedInUsers = JSON.parse(localStorage.getItem("loggedInUsers"));
    if (loggedInUsers && loggedInUsers.length > 0) {
      dispatch({ type: "loginUser", payload: loggedInUsers[0] });
    }
  }, [dispatch]);

  function handleLogin() {
    console.log(state);

    const user = users.find(
      (user) =>
        user.name === loginObj.name && user.password === loginObj.password
    );

    if (user) {
      alert("Credential are matching!");
      dispatch({
        type: "loginUser",
        payload: { ...loginObj, isAuthenticated: true, id: user.id },
      });
      navigate("/dashboard");
    } else {
      alert("Wrong credentials!");
    }
  }

  function goToRegister() {
    navigate("/");
  }
  return (
    <>
      <Navigation />
      <div className="login-form-wrapper">
        <h2>LOGIN</h2>

        <div>
          <label>Name:</label>
          <input
            onChange={(e) => setLoginObj({ name: e.target.value })}
            value={loginObj.name}
            type="text"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            onChange={(e) =>
              setLoginObj({ ...loginObj, password: e.target.value })
            }
            value={loginObj.password}
            type="text"
          />
        </div>
        <div>
          <button onClick={handleLogin}>LOGIN</button>
        </div>
        <p>
          Dont have an account?
          <span style={{ cursor: "pointer" }} onClick={goToRegister}>
            Register here!
          </span>
        </p>
      </div>
    </>
  );
}

export default Login;
