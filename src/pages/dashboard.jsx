import { useContext, useEffect, useState } from "react";
import Navigation from "../components/navigation";
import HttpContext from "../context/httpContext";
import Modal from "../components/Modal";

function Dashboard() {
  const [openAddClientModal, setIsAddClientModal] = useState(false);

  const {
    dispatch,
    state,
    getClients,
    getProjects,
    getPayments,
    getInvoices,
    deleteClient,
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

  return (
    <div className="dashboard-wrapper">
      <h1>Dashboard </h1>
      <Navigation />
      <div className="card-wrapper">
        <div className="card-item">
          <h2>Clients</h2>
          {state.clients.map((client) => (
            <div key={client.id}>
              <div>NAME:{client.name}</div>
              <div>EMAIL:{client.email}</div>
              <div>COMPANY:{client.company}</div>
              <button onClick={() => handleClientRemoving(client)}>
                Remove client
              </button>
              <button
                onClick={handleAddClientModal}
                style={{ marginTop: "8px" }}
              >
                Add client
              </button>
            </div>
          ))}
          <div>Total number of clients: {state.clients.length}</div>
        </div>
        <div className={openAddClientModal ? "d-block" : "d-none"}>
          <Modal>
            <span className="close"> &times;</span>
            <div>test</div>
          </Modal>
        </div>
        <div className="card-item">
          <h2>Projects</h2>
          {state.projects.map((project) => (
            <div key={project.id}>
              <div>
                <div>NAME:{project.name}</div>
                <div>STATUS:{project.status}</div>
              </div>
            </div>
          ))}
          <div>Total number of active projects: {activeProjects.length}</div>
        </div>
        <div className="card-item">
          <h2>Payments</h2>
          {state.payments.map((payment) => (
            <div key={payment.id}>
              <div>AMOUNT: {payment.amount}</div>
              <div>DATE: {payment.date}</div>
            </div>
          ))}
        </div>
        <div className="card-item">
          <h2>Invoices</h2>
          {state.invoices.map((invoice) => (
            <div key={invoice.id}>
              <div>AMOUNT: {invoice.amount}</div>
              <div>DueDate: {invoice.dueDate}</div>
              <div>STATUS: {invoice.status}</div>
            </div>
          ))}
          <div>Total number of pending invoices: {pendingInvoices.length}</div>
          <div>Total earnings - paid invoices: {sum}$</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
