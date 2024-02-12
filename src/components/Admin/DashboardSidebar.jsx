// DashboardSidebar.js

import React from 'react';
import { Link } from 'react-router-dom';

const DashboardSidebar = () => {
  return (
    <>
      <aside id="sidebar" class="sidebar">
        <ul class="sidebar-nav" id="sidebar-nav">
          <li class="nav-item">
            <Link to="/admin" class="nav-link">
              <i class="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          <li class="nav-item">
            <Link to="/employees" class="nav-link">
              <i class="bi bi-people"></i>
              <span>Employees</span>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default DashboardSidebar;
