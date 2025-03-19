import { useContext } from "react";
import Navigation from "../components/navigation";
import HttpContext from "../context/httpContext";

function Dashboard() {
  const { dispatch, state } = useContext(HttpContext);
  console.log(state);
  return (
    <>
      <h1>Dashboard </h1>
      <Navigation />
      <div>
        <h2>Clients</h2>
        {state.clients.map((client) => (
          <div>
            <div>{client.name}</div>
            <div>{client.email}</div>
            <div>{client.company}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
