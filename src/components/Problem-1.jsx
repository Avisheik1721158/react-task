import React, { useState } from "react";
const Problem1 = () => {
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState("all");
  const [formData, setFormData] = useState({ name: "", status: "" });

  const handleClick = (val) => {
    setShow(val);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.status) {
      setTasks([...tasks, formData]);
      setFormData({ name: "", status: "" });
    }
  };

  const filteredTasks = () => {
    const lowercaseShow = show.toLowerCase();

    if (lowercaseShow === "all") {
      return tasks.sort((a, b) => {
        const order = ["active", "completed"];

        const indexA = order.indexOf(a.status.toLowerCase());
        const indexB = order.indexOf(b.status.toLowerCase());

        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }

        if (indexA === -1 && indexB === -1) {
          return 0;
        }

        return indexA !== -1 ? -1 : 1;
      });
    } else {
      const filtered = tasks.filter(
        (task) => task.status.toLowerCase() === lowercaseShow
      );

      return filtered.sort((a, b) => {
        if (
          a.status.toLowerCase() === "active" &&
          b.status.toLowerCase() !== "active"
        )
          return -1;
        if (
          a.status.toLowerCase() === "completed" &&
          b.status.toLowerCase() !== "completed"
        )
          return 1;
        return 0;
      });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks().map((task, index) => (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
