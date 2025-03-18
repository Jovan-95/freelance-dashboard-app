import Navigation from "../components/navigation";

// Endpoints:
// http://localhost:5000/clients
// http://localhost:5000/projects
// http://localhost:5000/invoices
// http://localhost:5000/payments

function Dashboard() {
  return (
    <>
      <h1>Dashboard </h1>
      <Navigation />
    </>
  );
}

export default Dashboard;
