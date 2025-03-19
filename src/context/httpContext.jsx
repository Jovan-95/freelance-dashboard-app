import React, { createContext, useEffect, useReducer } from "react";

// Endpoints:
// http://localhost:5000/clients
// http://localhost:5000/projects
// http://localhost:5000/invoices
// http://localhost:5000/payments

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
      case "SET_CLIENTS":
        return { ...state, clients: action.payload };
      case "SET_PROJECTS":
        return { ...state, projects: action.payload };
      case "SET_INVOICES":
        return { ...state, invoices: action.payload };
      case "SET_PAYMENTS":
        return { ...state, payments: action.payload };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  // Get clients
  async function getClients() {
    try {
      const res = await fetch("http://localhost:5000/clients");
      if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
      const data = await res.json();
      console.log("Clients:", data);
      dispatch({ type: "SET_CLIENTS", payload: data });
    } catch (err) {
      console.log(err);
    }
  }

  // Get projects
  async function getProjects() {
    try {
      const res = await fetch("http://localhost:5000/projects");
      if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
      const data = await res.json();
      dispatch({ type: "SET_PROJECTS", payload: data });

      // console.log("Projects:", data);
    } catch (err) {
      console.log(err);
    }
  }

  // Get invoices
  async function getInvoices() {
    try {
      const res = await fetch("http://localhost:5000/invoices");
      if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
      const data = await res.json();
      dispatch({ type: "SET_INVOICES", payload: data });

      // console.log("Invoices:", data);
    } catch (err) {
      console.log(err);
    }
  }

  // Get payments
  async function getPayments() {
    try {
      const res = await fetch("http://localhost:5000/payments");
      if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
      const data = await res.json();
      dispatch({ type: "SET_PAYMENTS", payload: data });

      // console.log("Payments:", data);
    } catch (err) {
      console.log(err);
    }
  }

  // Call all HTTP req onLoad
  useEffect(() => {
    getClients();
    getProjects();
    getInvoices();
    getPayments();
  }, []);

  return (
    <HttpContext.Provider
      value={{
        state,
        dispatch,
        getClients,
        getProjects,
        getInvoices,
        getPayments,
      }}
    >
      {children}
    </HttpContext.Provider>
  );
};
export default HttpContext;
