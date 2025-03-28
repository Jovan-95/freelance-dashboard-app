import { useContext, useEffect, useState } from "react";
import Navigation from "../components/navigation";
import HttpContext from "../context/httpContext";
import Modal from "../components/Modal";
import { jsPDF } from "jspdf";
import Notification from "../components/notification";

function Invoices() {
  const {
    state,
    getInvoices,
    getClients,
    getProjects,
    addInvoice,
    deleteInvoice,
    editInvoice,
  } = useContext(HttpContext);

  const [createInvoiceModal, setCreateInvoiceModal] = useState(false);
  const [editInvoiceModal, setEditInvoiceModal] = useState(false);

  const [invoiceObj, setInvoiceObj] = useState({
    client: "",
    project: "",
    amount: "",
    date: "",
    status: "",
  });

  const [editedInvoice, setEditedInvoice] = useState({
    status: "",
  });

  // Notifications
  const [addInvoiceNotification, setInvoiceNotification] = useState(false);
  const [editInvoiceNotification, setEditInvoiceNotification] = useState(false);
  const [removeInvoiceNotification, setRemoveInvoiceNotification] =
    useState(false);

  useEffect(function () {
    getInvoices();
    getClients();
    getProjects();
  }, []);

  function handleCreateInvoiceModal() {
    setCreateInvoiceModal((prev) => !prev);
  }

  // Add invoice
  function handleAddingNewInvoice() {
    // console.log("new invoice", invoiceObj);
    addInvoice(invoiceObj);
    setCreateInvoiceModal((prev) => !prev);
    setInvoiceNotification(true);
  }

  // Delete invoice
  function handleInvoiceRemove(invoice) {
    // console.log("delete invoice", invoice);
    deleteInvoice(invoice.id);
    setRemoveInvoiceNotification(true);
  }

  function handleInvoiceDownload(invoice) {
    const doc = new jsPDF();
    doc.text(`Invoice ID: ${invoice.id}`, 10, 10);
    doc.text(`Client: ${invoice.client}`, 10, 20);
    doc.text(`Project: ${invoice.project}`, 10, 30);
    doc.text(`Amount: ${invoice.amount} $`, 10, 40);
    doc.text(`Date: ${invoice.date}`, 10, 50);
    doc.text(`Status: ${invoice.status}`, 10, 60);

    doc.save(`invoice-${invoice.id}.pdf`);
  }

  // Edit modal
  function handleEditModalOpen(invoice) {
    setEditInvoiceModal((prev) => !prev);
    setEditedInvoice(invoice);
  }

  // Edit status saving
  function handleEditStatusInvoiceSave() {
    editInvoice(editedInvoice);
    setEditInvoiceModal((prev) => !prev);
    setEditInvoiceNotification(true);
  }

  return (
    <div className="wrapper">
      <h1>Invoices</h1>
      <Navigation />
      <button
        onClick={handleCreateInvoiceModal}
        style={{ marginBottom: "16px" }}
      >
        Create new invoice?
      </button>
      <div className="big-card">
        <div className="card-item">
          {state.invoices.map((invoice) => (
            <div key={invoice.id}>
              <div className="text-info">AMOUNT: {invoice.amount}$</div>
              <div className="text-info">STATUS: {invoice.status}</div>
              <div className="text-info">CLIENT: {invoice.client}</div>
              <div className="text-info">PROJECT: {invoice.project}</div>
              <div className="text-info">DATE: {invoice.date}</div>
              <button
                onClick={() => handleEditModalOpen(invoice)}
                style={{ marginBottom: "16px" }}
              >
                Edit status
              </button>
              <button
                onClick={() => handleInvoiceDownload(invoice)}
                style={{ marginBottom: "16px" }}
              >
                Download this invoice
              </button>
              <button onClick={() => handleInvoiceRemove(invoice)}>
                Remove this invoice
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Edit invoice */}
      <div className={editInvoiceModal ? "d-block" : "d-none"}>
        <Modal>
          <span onClick={handleEditModalOpen} className="close">
            {" "}
            &times;
          </span>
          <div>
            <label>Select status:</label>
            <select
              onChange={(e) =>
                setEditedInvoice({ ...editedInvoice, status: e.target.value })
              }
              value={editedInvoice.status}
            >
              {" "}
              <option value="">Select status:</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="overdue">Overdue</option>
            </select>
            <button
              onClick={handleEditStatusInvoiceSave}
              style={{ marginTop: "16px" }}
            >
              Save changes
            </button>
          </div>
        </Modal>
      </div>
      {/* Add new invoice */}
      <div className={createInvoiceModal ? "d-block" : "d-none"}>
        <Modal>
          <span onClick={handleCreateInvoiceModal} className="close">
            {" "}
            &times;
          </span>
          <div>
            <div>
              <label>Select client:</label>
              <select
                onChange={(e) =>
                  setInvoiceObj({ ...invoiceObj, client: e.target.value })
                }
                value={invoiceObj.client}
              >
                {state.clients.map((client) => (
                  <option key={client.id} value={client.name}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Select project:</label>
              <select
                onChange={(e) =>
                  setInvoiceObj({ ...invoiceObj, project: e.target.value })
                }
                value={invoiceObj.project}
              >
                {state.projects.map((project) => (
                  <option key={project.id} value={project.name}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Amount:</label>
              <input
                onChange={(e) =>
                  setInvoiceObj({ ...invoiceObj, amount: e.target.value })
                }
                value={invoiceObj.amount}
                type="number"
              />
            </div>
            <div>
              <label>Date:</label>
              <input
                onChange={(e) =>
                  setInvoiceObj({ ...invoiceObj, date: e.target.value })
                }
                value={invoiceObj.date}
                type="date"
              />
            </div>
            <div>
              <label>Select status:</label>
              <select
                onChange={(e) =>
                  setInvoiceObj({ ...invoiceObj, status: e.target.value })
                }
                value={invoiceObj.status}
              >
                {" "}
                <option value="">Select status:</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            <button
              onClick={handleAddingNewInvoice}
              style={{ marginTop: "16px" }}
            >
              Add new invoice
            </button>
          </div>
        </Modal>
      </div>
      {addInvoiceNotification && (
        <Notification
          message="Invoice ADDED successfully!"
          type="success"
          duration={3000}
          onClose={() => setInvoiceNotification(false)}
        />
      )}
      {editInvoiceNotification && (
        <Notification
          message="Invoice EDITED successfully!"
          type="success"
          duration={3000}
          onClose={() => setEditInvoiceNotification(false)}
        />
      )}
      {removeInvoiceNotification && (
        <Notification
          message="Invoice EDITED successfully!"
          type="error"
          duration={3000}
          onClose={() => setRemoveInvoiceNotification(false)}
        />
      )}
    </div>
  );
}

export default Invoices;
