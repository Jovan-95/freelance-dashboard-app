import React, { createContext, useReducer } from "react";

const HttpContext = createContext();

export const HttpContextProvider = ({ children }) => {
  const initialState = {
    clients: [],
    projects: [],
    invoices: [],
    payments: [],
  };

  function reducer(state, action) {
    switch (action.type) {
      case "test": {
        return;
      }
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <HttpContext.Provider value={{ dispatch, state }}>
      {children}
    </HttpContext.Provider>
  );
};
export default HttpContext;
