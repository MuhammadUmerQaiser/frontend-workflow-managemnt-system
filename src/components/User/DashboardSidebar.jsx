// DashboardSidebar.js

import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../helpers/helpers";

const DashboardSidebar = () => {
  const user = isAuthenticated();
  return (
    <>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link
              to={user.role == "Admin" ? "/admin" : "/user"}
              className="nav-link"
            >
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          {user.role == "Admin" && (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link collapsed"
                  data-bs-target="#components-nav"
                  data-bs-toggle="collapse"
                  to=""
                >
                  <i className="bi bi-menu-button-wide"></i>
                  <span>General</span>
                  <i className="bi bi-chevron-down ms-auto"></i>
                </Link>
                <ul
                  id="components-nav"
                  className="nav-content collapse"
                  data-bs-parent="#sidebar-nav"
                >
                  <li>
                    <Link to="/admin/roles">
                      <i className="bi bi-circle"></i>
                      <span>Roles</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/domains">
                      <i className="bi bi-circle"></i>
                      <span>Domains</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/designations">
                      <i className="bi bi-circle"></i>
                      <span>Designations</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/teams">
                      <i className="bi bi-circle"></i>
                      <span>Teams</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/tasks">
                      <i className="bi bi-circle"></i>
                      <span>Tasks</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/grades">
                      <i className="bi bi-circle"></i>
                      <span>Grades</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/admin/employees" className="nav-link">
                  <i className="bi bi-people"></i>
                  <span>Employees</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/history" className="nav-link">
                  <i className="bi bi-people"></i>
                  <span>History</span>
                </Link>
              </li>
            </>
          )}
          {user.role != "Admin" && (
            <>
              <li className="nav-item">
                <Link to="/user/workflow" className="nav-link">
                  <i className="bi bi-people"></i>
                  <span>Workflow</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user/history" className="nav-link">
                  <i className="bi bi-people"></i>
                  <span>History</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </aside>
    </>
  );
};

export default DashboardSidebar;
