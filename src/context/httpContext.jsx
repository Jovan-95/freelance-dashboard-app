import React, { act, createContext, useReducer } from "react";

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
      case "DELETE_CLIENT":
        return {
          ...state,
          clients: state.clients.filter(
            (client) => client.id !== action.payload
          ),
        };
      case "ADD_CLIENT":
        return { ...state, clients: [...state.clients, action.payload] };
      case "EDIT_CLIENT":
        return {
          ...state,
          clients: state.clients.map((client) =>
            client.id === action.payload.id ? action.payload : client
          ),
        };
      case "DELETE_PROJECT":
        return {
          ...state,
          projects: state.projects.filter(
            (project) => project.id !== action.payload
          ),
        };
      case "ADD_PROJECT":
        return { ...state, projects: [...state.projects, action.payload] };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  // Get clients, HTTP req
  async function getClients() {
    try {
      const res = await fetch("http://localhost:5000/clients");
      if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
      const data = await res.json();
      // console.log("Clients:", data);
      dispatch({ type: "SET_CLIENTS", payload: data });
    } catch (err) {
      console.log(err);
    }
  }

  // Get projects, HTTP req
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

  // Get invoices, HTTP req
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

  // Get payments, HTTP req
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

  // We call this inside the page because of app optimization
  // useEffect(() => {
  //   getClients();
  //   getProjects();
  //   getInvoices();
  //   getPayments();
  // }, []);

  // Delete (client) HTTP req
  async function deleteClient(clientID) {
    try {
      const res = await fetch(`http://localhost:5000/clients/${clientID}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`${res.status}, ${res.statusText}`);
      }
      // const data = await res.json();

      dispatch({ type: "DELETE_CLIENT", payload: clientID });
    } catch (err) {
      console.log(err);
    }
  }

  // Add client, HTTP req (POST)
  async function addClient(newClient) {
    try {
      const res = await fetch("http://localhost:5000/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClient),
      });
      if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
      const data = await res.json();
      // console.log(data);
      dispatch({ type: "ADD_CLIENT", payload: newClient });
    } catch (err) {
      console.log(err);
    }
  }

  // Edit client, HTTP req (PUT)
  async function editClient(client) {
    try {
      const res = await fetch(`http://localhost:5000/clients/${client.id}`, {
        method: "PUT", // HTTP method for updating data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      });

      if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
      const data = await res.json();
      // console.log("Updated User:", data);
      dispatch({ type: "EDIT_CLIENT", payload: client });
    } catch (err) {
      console.log(err);
    }
  }

  //// Projects

  // Delete project, HTTP req (DELETE)
  async function deleteProject(projectID) {
    try {
      const res = await fetch(`http://localhost:5000/projects/${projectID}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`${res.status}, ${res.statusText}`);
      }
      // const data = await res.json();

      dispatch({ type: "DELETE_PROJECT", payload: projectID });
    } catch (err) {
      console.log(err);
    }
  }

  // Add project, HTTP req (POST)
  async function addProject(newProject) {
    try {
      const res = await fetch("http://localhost:5000/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });
      if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
      const data = await res.json();
      // console.log(data);
      dispatch({ type: "ADD_PROJECT", payload: newProject });
    } catch (err) {
      console.log(err);
    }
  }

  // Edit project, HTTP req (PUT)

  return (
    <HttpContext.Provider
      value={{
        state,
        dispatch,
        getClients,
        getProjects,
        getInvoices,
        getPayments,
        deleteClient,
        addClient,
        editClient,
        addProject,
        deleteProject,
      }}
    >
      {children}
    </HttpContext.Provider>
  );
};
export default HttpContext;
