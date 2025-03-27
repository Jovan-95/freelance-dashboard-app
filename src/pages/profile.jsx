import { useContext, useEffect, useState } from "react";
import Navigation from "../components/navigation";
import Context from "../context/context";
import Modal from "../components/Modal";
import Notification from "../components/notification";

function Profile() {
  const { state, dispatch } = useContext(Context);
  const loggedInUser = state.loggedInUsers[0];
  const [isOpen, setIsOpen] = useState(false);
  const [editedUserProfile, setEditedUserProfile] = useState({
    name: loggedInUser.name,
    password: loggedInUser.password,
    id: loggedInUser.id,
  });
  const [activeNotification, setActiveNotification] = useState(false);
  // console.log("registered users", state.users);

  console.log("logged user", loggedInUser);

  function handleEditModal() {
    setIsOpen((prev) => !prev);
  }

  function editUserProfile() {
    console.log("edited", editedUserProfile);
    dispatch({ type: "editUserProfile", payload: editedUserProfile });
    setIsOpen((prev) => !prev);
    setActiveNotification(true);
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
      {activeNotification && (
        <Notification
          message="User edited successfully!"
          type="success"
          duration={3000}
          onClose={() => setActiveNotification(false)}
        />
      )}
    </div>
  );
}

export default Profile;
