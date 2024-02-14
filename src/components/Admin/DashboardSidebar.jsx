// DashboardSidebar.js

import React from 'react';
import { Link } from 'react-router-dom';

const DashboardSidebar = () => {
  return (
    <>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link to="/admin" className="nav-link">
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/employees" className="nav-link">
              <i className="bi bi-people"></i>
              <span>Employees</span>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default DashboardSidebar;
