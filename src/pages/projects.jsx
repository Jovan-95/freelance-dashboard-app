import { useContext, useEffect, useState } from "react";
import Navigation from "../components/navigation";
import Modal from "../components/Modal";
import HttpContext from "../context/httpContext";

function Projects() {
  const { state, getProjects, getClients, addProject, deleteProject } =
    useContext(HttpContext);

  const [createProjectModal, setCreateProjectModal] = useState(false);

  const [newProjectObj, setNewProjectObj] = useState({
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
  }

  // Project removing
  function handleProjectRemove(project) {
    console.log("Delete Project", project);
    deleteProject(project.id);
  }
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

      <div className="big-card">
        <div className="card-item">
          {state.projects.map((project) => (
            <div key={project.id}>
              <div className="text-info">NAME: {project.name}</div>
              <div className="text-info">STATUS: {project.status}</div>
              <div className="text-info">BUDGET: {project.budget}$</div>
              <button onClick={() => handleProjectRemove(project)}>
                Remove this project?
              </button>
            </div>
          ))}
        </div>
      </div>
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
    </div>
  );
}

export default Projects;
