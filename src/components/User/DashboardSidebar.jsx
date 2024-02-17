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
                <Link to="/admin/employees" className="nav-link">
                  <i className="bi bi-people"></i>
                  <span>Employees</span>
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
