import { useState } from "react";
import srb from "../../assets/srb.png";
import profile_image from "../../assets/img/profile-img.jpg";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../helpers/helpers";

const DashboardHeader = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const user = isAuthenticated();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    document.body.classList.toggle("toggle-sidebar", !sidebarVisible);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('auth');
    navigate('/login')
  }
  return (
    <>
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo d-flex align-items-center">
            <img src={srb} alt="" />
            <span className="d-none d-lg-block">SRB</span>
          </a>
          <i className="bi bi-list toggle-sidebar-btn" onClick={toggleSidebar}></i>
        </div>

        {/* <div className="search-bar">
          <form
            className="search-form d-flex align-items-center"
            method="POST"
            action="#"
          >
            <input
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
            />
            <button type="submit" title="Search">
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div> */}

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="#"
                data-bs-toggle="dropdown"
              >
                {/* <img src={profile_image} alt="Profile" className="rounded-circle" /> */}
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  {user.name}
                </span>{" "}
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>{user.name}</h6>
                  <span>{user.role}</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    to={`/${user.role == 'Admin' ? 'admin' : 'user'}/profile`}
                  >
                    <i className="bi bi-person"></i>
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a className="dropdown-item d-flex align-items-center" href="#" onClick={() => logout()}>
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default DashboardHeader;
