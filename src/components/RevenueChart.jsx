import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import HttpContext from "../context/httpContext";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function RevenueChart() {
  const { state } = useContext(HttpContext);

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

  // Prepare chart data
  const data = {
    labels: ["Paid", "Unpaid", "Overdue"], // Categories
    datasets: [
      {
        label: "Revenue by Invoice Status",
        data: [paidRevenue, unpaidRevenue, overdueRevenue], // Total amounts for each category
        backgroundColor: ["#4CAF50", "#FFEB3B", "#F44336"], // Green for paid, yellow for unpaid, red for overdue
        borderColor: ["#4CAF50", "#FFEB3B", "#F44336"], // Border colors to match
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true, // Start the y-axis from zero
        ticks: {
          callback: function (value) {
            return "$" + value; // Format y-axis values as currency
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return "$" + tooltipItem.raw.toFixed(2); // Format tooltips as currency
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h2>Revenue Breakdown</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default RevenueChart;
