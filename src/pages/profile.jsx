import { useContext } from "react";
import Navigation from "../components/navigation";
import Context from "../context/context";

function Profile() {
  const { state } = useContext(Context);
  const loggedInUser = state.loggedInUsers[0];

  console.log("registered users", state.users);

  console.log("logged user", loggedInUser);
  return (
    <div className="wrapper">
      <h1>Profile</h1>
      <Navigation />
      <div className="big-card">
        <div>NAME:{loggedInUser.name}</div>
        <div>PASSWORD:{loggedInUser.password}</div>
        <div>ID:{loggedInUser.id}</div>
        <button>Edit user info?</button>
      </div>
    </div>
  );
}

export default Profile;
