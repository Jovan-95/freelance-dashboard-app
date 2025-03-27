import { useContext, useState } from "react";
import Navigation from "../components/navigation";
import Context from "../context/context";
import Modal from "../components/Modal";

function Profile() {
  const { state, dispatch } = useContext(Context);
  const loggedInUser = state.loggedInUsers[0];
  const [isOpen, setIsOpen] = useState(false);
  const [editedUserProfile, setEditedUserProfile] = useState({
    name: loggedInUser.name,
    password: loggedInUser.password,
    id: loggedInUser.id,
  });

  // console.log("registered users", state.users);

  console.log("logged user", loggedInUser);

  function handleEditModal() {
    setIsOpen((prev) => !prev);
  }

  function editUserProfile() {
    console.log("edited", editedUserProfile);
    dispatch({ type: "editUserProfile", payload: editedUserProfile });
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="wrapper">
      <h1>Profile</h1>
      <Navigation />
      <div className="big-card">
        <h3>NAME:{loggedInUser.name}</h3>
        <h3>PASSWORD:{loggedInUser.password}</h3>
        <h3>ID:{loggedInUser.id}</h3>
        <button onClick={handleEditModal}>Edit user info?</button>
      </div>
      <div className={isOpen ? "d-block" : "d-none"}>
        <Modal>
          <span onClick={handleEditModal} className="close">
            {" "}
            &times;
          </span>
          <div>
            <label>Name:</label>
            <input
              onChange={(e) =>
                setEditedUserProfile({
                  ...editedUserProfile,
                  name: e.target.value,
                })
              }
              value={editedUserProfile.name}
              type="text"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              onChange={(e) =>
                setEditedUserProfile({
                  ...editedUserProfile,
                  password: e.target.value,
                })
              }
              value={editedUserProfile.password}
              type="text"
            />
          </div>
          <button onClick={editUserProfile}>Save changes</button>
        </Modal>
      </div>
    </div>
  );
}

export default Profile;
