import React, { createContext, useReducer } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorage.jsx";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [users, setUsers] = useLocalStorageState([], "users");
  const [loggedInUsers, setLoggedInUsers] = useLocalStorageState(
    [],
    "loggedInUsers"
  );

  const initialState = {
    users,
    loggedInUsers,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "registerUser": {
        console.log(state);
        const newUser = {
          id: Date.now(),
          name: action.payload.name,
          email: action.payload.email,
          password: action.payload.password,
          confirmPassword: action.payload.confirmPassword,
        };

        const updatedUsers = [...state.users, newUser];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return { ...state, users: updatedUsers };
      }

      case "loginUser": {
        const updatedLoggedInUsers = [...state.loggedInUsers, action.payload];
        localStorage.setItem(
          "loggedInUsers",
          JSON.stringify(updatedLoggedInUsers)
        );
        return { ...state, loggedInUsers: updatedLoggedInUsers };
      }
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    setUsers(state.users);
  }, [state.users, setUsers]);

  React.useEffect(() => {
    setLoggedInUsers(state.loggedInUsers);
  }, [state.loggedInUsers, setLoggedInUsers]);

  return (
    <Context.Provider value={{ dispatch, state }}>{children}</Context.Provider>
  );
};

export default Context;
