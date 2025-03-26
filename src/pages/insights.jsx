import { useContext, useEffect } from "react";
import Navigation from "../components/navigation";
import HttpContext from "../context/httpContext";
import RevenueChart from "../components/RevenueChart";

function Insights() {
  const { state, getInvoices } = useContext(HttpContext);

  useEffect(function () {
    getInvoices();
  }, []);

  // Filter invoices by status
  const paidInvoices = state.invoices.filter(
    (invoice) => invoice.status === "paid"
  );
  const unpaidInvoices = state.invoices.filter(
    (invoice) => invoice.status === "unpaid"
  );
  const overdueInvoices = state.invoices.filter(
    (invoice) => invoice.status === "overdue"
  );

  // Calculate the total revenue for each status
  const paidRevenue = paidInvoices.reduce(
    (prev, current) => prev + +current.amount,
    0
  );
  const unpaidRevenue = unpaidInvoices.reduce(
    (prev, current) => prev + +current.amount,
    0
  );
  const overdueRevenue = overdueInvoices.reduce(
    (prev, current) => prev + +current.amount,
    0
  );

  return (
    <div className="wrapper">
      <h1>Insights</h1>
      <Navigation />
      <div className="big-card">
        <div>
          Total number of paid invoices: <strong>{paidRevenue}$</strong>
        </div>
        <div>
          Total number of unpaid invoices: <strong>{unpaidRevenue}$</strong>
        </div>
        <div>
          Total number of overdue invoices: <strong>{overdueRevenue}$</strong>
        </div>
        <div>
          <RevenueChart />
        </div>
      </div>
    </div>
  );
}

export default Insights;
