import { useContext, useEffect, useState } from "react";
import Navigation from "../components/navigation";
import HttpContext from "../context/httpContext";
import Modal from "../components/Modal";

function Dashboard() {
  const [openAddClientModal, setIsAddClientModal] = useState(false);
  const [openEditClientModal, setIsOpenEditClientModal] = useState(false);
  const [newClientObj, setNewClientObj] = useState({
    name: "",
    email: "",
    company: "",
  });

  const [editedClient, setEditedClient] = useState({
    name: "",
    email: "",
    company: "",
  });

  const {
    dispatch,
    state,
    getClients,
    getProjects,
    getPayments,
    getInvoices,
    deleteClient,
    addClient,
    editClient,
  } = useContext(HttpContext);

  useEffect(function () {
    getClients();
    getProjects();
    getPayments();
    getInvoices();
  }, []);
  console.log(state);

  // Get only active projects
  const activeProjects = state.projects.filter(
    (project) => project.status === "active"
  );

  // Get only pending invoices
  const pendingInvoices = state.invoices.filter(
    (invoice) => invoice.status === "pending"
  );

  // Get only paid invoices
  const paidInvoices = state.invoices.filter(
    (invoice) => invoice.status === "paid"
  );

  // Calc only paid invoices
  const sum = paidInvoices.reduce(function (prev, current) {
    return prev + +current.amount;
  }, 0);

  // Removing client from backend
  function handleClientRemoving(client) {
    console.log(client);
    deleteClient(client.id);
  }

  // Open AddClient modal
  function handleAddClientModal() {
    setIsAddClientModal((prev) => !prev);
  }

  // Closing addClient modal
  function handleClosingAddClientModal() {
    setIsAddClientModal((prev) => !prev);
  }

  // Client adding
  function handleAddClient() {
    addClient({ ...newClientObj, id: Date.now() });
    setNewClientObj({ name: "", email: "", company: "" });
    setIsAddClientModal(false); // Close modal after adding
  }

  // Edit client modal open
  function handleEditClientModal(client) {
    setEditedClient(client);
    setIsOpenEditClientModal(true);
    console.log("Edit", editedClient);
  }

  // Edit clietn modal close
  function handleEditClientModalClosing() {
    setIsOpenEditClientModal(false);
  }

  // Editing client
  function handleEditingClient() {
    setEditedClient((prevState) => {
      editClient(prevState);
      return prevState;
    });
  }
  return (
    <div className="dashboard-wrapper">
      <h1>Dashboard </h1>
      <Navigation />
      <div className="card-wrapper">
        <div className="card-item">
          <button onClick={handleAddClientModal} style={{ marginTop: "8px" }}>
            ADD CLIENT
          </button>
          <h2>Clients:</h2>
          {state.clients.map((client) => (
            <div key={client.id}>
              <div className="text-info">NAME:{client.name}</div>
              <div className="text-info">EMAIL:{client.email}</div>
              <div className="text-info">COMPANY:{client.company}</div>
              <button onClick={() => handleClientRemoving(client)}>
                Remove client
              </button>
              <button
                onClick={() => handleEditClientModal(client)}
                style={{ marginTop: "8px" }}
              >
                Edit client
              </button>
              <div className={openEditClientModal ? "d-block" : "d-none"}>
                <Modal>
                  <span
                    onClick={handleEditClientModalClosing}
                    className="close"
                  >
                    {" "}
                    &times;
                  </span>
                  <div>
                    <h3>Edit client</h3>
                    <div>
                      <label>Name:</label>
                      <input
                        onChange={(e) =>
                          setEditedClient({
                            ...editedClient,
                            name: e.target.value,
                          })
                        }
                        value={editedClient.name}
                        type="text"
                      />
                    </div>
                    <div>
                      <label>Email:</label>
                      <input
                        onChange={(e) =>
                          setEditedClient({
                            ...editedClient,
                            email: e.target.value,
                          })
                        }
                        value={editedClient.email}
                        type="text"
                      />
                    </div>
                    <div>
                      <label>Company:</label>
                      <input
                        onChange={(e) =>
                          setEditedClient({
                            ...editedClient,
                            company: e.target.value,
                          })
                        }
                        value={editedClient.company}
                        type="text"
                      />
                    </div>
                    <div style={{ marginTop: "8px" }}>
                      <button onClick={handleEditingClient}>
                        Save changes
                      </button>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          ))}

          <div className="text-info">
            Total number of clients: {state.clients.length}
          </div>
          <div className={openAddClientModal ? "d-block" : "d-none"}>
            <Modal>
              <span onClick={handleClosingAddClientModal} className="close">
                {" "}
                &times;
              </span>
              <div>
                <h3>Add client</h3>
                <div>
                  <label>Name:</label>
                  <input
                    onChange={(e) =>
                      setNewClientObj({ ...newClientObj, name: e.target.value })
                    }
                    value={newClientObj.name}
                    type="text"
                  />
                </div>
                <div>
                  <label>Email:</label>
                  <input
                    onChange={(e) =>
                      setNewClientObj({
                        ...newClientObj,
                        email: e.target.value,
                      })
                    }
                    value={newClientObj.email}
                    type="text"
                  />
                </div>
                <div>
                  <label>Company:</label>
                  <input
                    onChange={(e) =>
                      setNewClientObj({
                        ...newClientObj,
                        company: e.target.value,
                      })
                    }
                    value={newClientObj.company}
                    type="text"
                  />
                </div>
                <div style={{ marginTop: "16px" }}>
                  <button onClick={handleAddClient}>ADD CLIENT</button>
                </div>
              </div>
            </Modal>
          </div>
        </div>

        <div className="card-item">
          <h2>Projects:</h2>
          {state.projects.map((project) => (
            <div key={project.id}>
              <div>
                <div className="text-info">NAME:{project.name}</div>
                <div className="text-info">STATUS:{project.status}</div>
              </div>
            </div>
          ))}
          <div className="text-info">
            Total number of active projects: {activeProjects.length}
          </div>
        </div>
        <div className="card-item">
          <h2>Payments:</h2>
          {state.payments.map((payment) => (
            <div key={payment.id}>
              <div className="text-info">AMOUNT: {payment.amount}</div>
              <div className="text-info">DATE: {payment.date}</div>
            </div>
          ))}
        </div>
        <div className="card-item">
          <h2>Invoices:</h2>
          {state.invoices.map((invoice) => (
            <div key={invoice.id}>
              <div className="text-info">AMOUNT: {invoice.amount}</div>
              <div className="text-info">DueDate: {invoice.dueDate}</div>
              <div className="text-info">STATUS: {invoice.status}</div>
            </div>
          ))}
          <div className="text-info">
            Total number of pending invoices: {pendingInvoices.length}
          </div>
          <div className="text-info">
            Total earnings - paid invoices: {sum}$
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
