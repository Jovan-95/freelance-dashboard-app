import { useContext, useEffect, useState } from "react";
import Navigation from "../components/navigation";
import Modal from "../components/Modal";
import HttpContext from "../context/httpContext";
import Notification from "../components/notification";

function Projects() {
  const {
    state,
    getProjects,
    getClients,
    addProject,
    deleteProject,
    editProject,
  } = useContext(HttpContext);

  const [createProjectModal, setCreateProjectModal] = useState(false);
  const [editProjectModal, setEditProjectModal] = useState(false);

  // Notifications
  const [addProjectNotification, setAddProjectNotification] = useState(false);
  const [removeProjectNotification, setRemoveProjectNotification] =
    useState(false);
  const [editProjectNotification, setEditProjectNotification] = useState(false);

  // Filter by status
  const [filteredProjects, setFilteredProjects] = useState(state.projects);

  const [newProjectObj, setNewProjectObj] = useState({
    name: "",
    description: "",
    client: "",
    startDate: "",
    deadline: "",
    status: "",
    budget: "",
  });

  const [editedProject, setEditedProject] = useState({
    name: "",
    description: "",
    client: "",
    startDate: "",
    deadline: "",
    status: "",
    budget: "",
  });

  useEffect(function () {
    getProjects();
    getClients();
  }, []);

  function handleCreateProjectModal() {
    setCreateProjectModal((prev) => !prev);
  }

  function handleProjectCreation() {
    // console.log("New Project", newProjectObj);
    addProject(newProjectObj);
    setNewProjectObj({
      name: "",
      description: "",
      client: "",
      startDate: "",
      deadline: "",
      status: "",
      budget: "",
    });
    setCreateProjectModal((prev) => !prev);
    setAddProjectNotification(true);
  }

  // Project removing
  function handleProjectRemove(project) {
    console.log("Delete Project", project);
    deleteProject(project.id);
    setRemoveProjectNotification(true);
  }

  // Edit modal open
  function handleProjectEditModal(project) {
    setEditProjectModal((prev) => !prev);
    setEditedProject(project);
  }

  // Edit modal saving
  function handleEditedProjectSaving() {
    console.log("Saving!", editedProject);
    setEditProjectModal((prev) => !prev);
    editProject(editedProject);
    setEditProjectNotification(true);
  }

  // Filter project by status
  function handleProjectFilter(e) {
    const value = e.target.value;

    if (value === "") {
      setFilteredProjects(state.projects); // Show all projects if no filter is selected
    } else {
      setFilteredProjects(
        state.projects.filter((project) => project.status === value)
      );
    }
  }
  useEffect(() => {
    setFilteredProjects(state.projects);
  }, [state.projects]);

  return (
    <div className="wrapper">
      <h1>Projects</h1>
      <Navigation />
      <button
        onClick={handleCreateProjectModal}
        style={{ marginBottom: "16px" }}
      >
        Create new project?
      </button>

      <div style={{ marginBottom: "16px" }}>
        <select onChange={(e) => handleProjectFilter(e)}>
          <option value="">Filter by status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="big-card">
        <div className="card-item">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div key={project.id}>
                <div className="text-info">NAME: {project.name}</div>
                <div className="text-info">
                  DESCRIPTION: {project.description}
                </div>

                <div className="text-info">STATUS: {project.status}</div>
                <div className="text-info">CLIENT: {project.client}$</div>
                <div className="text-info">STARTDATE: {project.startDate}$</div>
                <div className="text-info">DEADLINE: {project.deadline}$</div>

                <div className="text-info">BUDGET: {project.budget}$</div>
                <button onClick={() => handleProjectEditModal(project)}>
                  Edit this project?
                </button>
                <button
                  style={{ marginTop: "16px" }}
                  onClick={() => handleProjectRemove(project)}
                >
                  Remove this project?
                </button>
              </div>
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </div>
      </div>
      {/* Edit Project Modal */}
      <div className={editProjectModal ? "d-block" : "d-none"}>
        <Modal>
          <span onClick={handleProjectEditModal} className="close">
            {" "}
            &times;
          </span>
          <div>
            <div>
              <label>NAME:</label>
              <input
                onChange={(e) =>
                  setEditedProject({ ...editedProject, name: e.target.value })
                }
                value={editedProject.name}
                type="text"
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                onChange={(e) =>
                  setEditedProject({
                    ...editedProject,
                    description: e.target.value,
                  })
                }
                value={editedProject.description}
                type="text"
              />
            </div>
            <div>
              <label>Select client:</label>
              <select
                onChange={(e) =>
                  setEditedProject({ ...editedProject, client: e.target.value })
                }
                value={editedProject.client}
              >
                {state.clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Start Date:</label>
              <input
                onChange={(e) =>
                  setEditedProject({
                    ...editedProject,
                    startDate: e.target.value,
                  })
                }
                value={editedProject.startDate}
                type="date"
              />
            </div>
            <div>
              <label>Deadline:</label>
              <input
                onChange={(e) =>
                  setEditedProject({
                    ...editedProject,
                    deadline: e.target.value,
                  })
                }
                value={editedProject.deadline}
                type="date"
              />
            </div>
            <div>
              <label>Select status:</label>
              <select
                onChange={(e) =>
                  setEditedProject({
                    ...editedProject,
                    status: e.target.value,
                  })
                }
                value={editedProject.status}
              >
                <option value="">Set status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div>
              <label>Amount</label>
              <input
                onChange={(e) =>
                  setEditedProject({
                    ...editedProject,
                    budget: e.target.value,
                  })
                }
                value={editedProject.budget}
                type="number"
              />
            </div>
            <button
              onClick={handleEditedProjectSaving}
              style={{ marginTop: "16px" }}
            >
              Save changes
            </button>
          </div>
        </Modal>
      </div>

      {/* Create Project Modal */}
      <div className={createProjectModal ? "d-block" : "d-none"}>
        <Modal>
          <span onClick={handleCreateProjectModal} className="close">
            {" "}
            &times;
          </span>
          <div>
            <div>
              <label>NAME:</label>
              <input
                onChange={(e) =>
                  setNewProjectObj({ ...newProjectObj, name: e.target.value })
                }
                value={newProjectObj.name}
                type="text"
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                onChange={(e) =>
                  setNewProjectObj({
                    ...newProjectObj,
                    description: e.target.value,
                  })
                }
                value={newProjectObj.description}
                type="text"
              />
            </div>
            <div>
              <label>Select client:</label>
              <select
                onChange={(e) =>
                  setNewProjectObj({ ...newProjectObj, client: e.target.value })
                }
              >
                {state.clients.map((client) => (
                  <option key={client.id}>{client.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Start Date:</label>
              <input
                onChange={(e) =>
                  setNewProjectObj({
                    ...newProjectObj,
                    startDate: e.target.value,
                  })
                }
                value={newProjectObj.startDate}
                type="date"
              />
            </div>
            <div>
              <label>Deadline:</label>
              <input
                onChange={(e) =>
                  setNewProjectObj({
                    ...newProjectObj,
                    deadline: e.target.value,
                  })
                }
                value={newProjectObj.deadline}
                type="date"
              />
            </div>
            <div>
              <label>Select status:</label>
              <select
                onChange={(e) =>
                  setNewProjectObj({
                    ...newProjectObj,
                    status: e.target.value,
                  })
                }
                value={newProjectObj.status}
              >
                <option value="">Set status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div>
              <label>Amount</label>
              <input
                onChange={(e) =>
                  setNewProjectObj({
                    ...newProjectObj,
                    budget: Number(e.target.value),
                  })
                }
                value={newProjectObj.budget}
                type="number"
              />
            </div>
            <button
              onClick={handleProjectCreation}
              style={{ marginTop: "16px" }}
            >
              Create project
            </button>
          </div>
        </Modal>
      </div>
      {addProjectNotification && (
        <Notification
          message="Project ADDED successfully!"
          type="success"
          duration={3000}
          onClose={() => setAddProjectNotification(false)}
        />
      )}
      {removeProjectNotification && (
        <Notification
          message="Project REMOVED successfully!"
          type="error"
          duration={3000}
          onClose={() => setRemoveProjectNotification(false)}
        />
      )}
      {editProjectNotification && (
        <Notification
          message="Project EDITED successfully!"
          type="success"
          duration={3000}
          onClose={() => setEditProjectNotification(false)}
        />
      )}
    </div>
  );
}

export default Projects;
