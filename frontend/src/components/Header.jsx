import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { toast } from 'react-toastify';

function Header({isUserLoggedIn, setIsUserLoggedIn}) {
  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  async function handleLogout(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/users/logout`);
      // console.log(res.data);
      // alert("Logout Successful");
      toast.success("logout successful")
      localStorage.removeItem("user");
      setIsUserLoggedIn(false);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    const username = localStorage.getItem("user");
    if (username) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [localStorage.getItem("user")]);
  return (
    <header id="header" className="header d-flex align-items-center sticky-top ">
      <div className="container-fluid container-xl position-relative d-flex align-items-center">
        <Link to="/" className="logo d-flex align-items-center me-auto">
          {/* Uncomment the line below if you also wish to use an image logo */}
          {/* <img src="assets/img/logo.png" alt=""> */}
          <h1 className="sitename">Lockify</h1>
        </Link>
        <nav id="navmenu" className="navmenu">
          <ul>
            <li>
              <NavLink to="/"
                className={({ isActive }) => isActive ? "active" : ""}
                end={false}>
                Home
                <br />
              </NavLink>
            </li>
            <li>
              <NavLink to="/about"
                className={({ isActive }) => isActive ? "active" : ""}
                end={false}>About</NavLink>
            </li>
            {/* <li>
          <a href="courses.html">Courses</a>
        </li>
        <li>
          <a href="trainers.html">Trainers</a>
        </li>
        <li>
          <a href="events.html">Events</a>
        </li>
        <li>
          <a href="pricing.html">Pricing</a>
        </li> */}
            {/* <li>
              <NavLink to="/documents"
                className={({ isActive }) => isActive ? "active" : ""}
                end={false}>Documents</NavLink>
            </li> */}
            {isUserLoggedIn ? <><li className="dropdown">
              <a href="#">
                <span>Documents</span>{" "}
                <i className="bi bi-chevron-down toggle-dropdown" />
              </a>
              <ul>
                <li>
                  <Link to="/add-document">Add Document</Link>
                </li>
                <li>
                  <Link to="/documents">All Documents</Link>
                </li>
              </ul>
            </li>
              {/* <li>
              <NavLink to="/websites"
                className={({ isActive }) => isActive ? "active" : ""}
                end={false}>Websites</NavLink>
            </li> */}
              <li className="dropdown">
                <a href="#">
                  <span>Websites</span>{" "}
                  <i className="bi bi-chevron-down toggle-dropdown" />
                </a>
                <ul>
                  <li>
                    <Link to="/add-website">Add Website</Link>
                  </li>
                  <li>
                    <Link to="/websites">All Website</Link>
                  </li>


                </ul>
              </li>
              <li>
                <NavLink to="/subscription"
                  className={({ isActive }) => isActive ? "active" : ""}
                  end={false}>Subscriptions</NavLink>
              </li>
            </> : <></>}
            <li>
              <NavLink to="/feedback"
                className={({ isActive }) => isActive ? "active" : ""}
                end={false}>Feedback</NavLink>
            </li>
            {/* <li className="dropdown">
          <a href="#">
            <span>Dropdown</span>{" "}
            <i className="bi bi-chevron-down toggle-dropdown" />
          </a>
          <ul>
            <li>
              <a href="#">Dropdown 1</a>
            </li>
            <li className="dropdown">
              <a href="#">
                <span>Deep Dropdown</span>{" "}
                <i className="bi bi-chevron-down toggle-dropdown" />
              </a>
              <ul>
                <li>
                  <a href="#">Deep Dropdown 1</a>
                </li>
                <li>
                  <a href="#">Deep Dropdown 2</a>
                </li>
                <li>
                  <a href="#">Deep Dropdown 3</a>
                </li>
                <li>
                  <a href="#">Deep Dropdown 4</a>
                </li>
                <li>
                  <a href="#">Deep Dropdown 5</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Dropdown 2</a>
            </li>
            <li>
              <a href="#">Dropdown 3</a>
            </li>
            <li>
              <a href="#">Dropdown 4</a>
            </li>
          </ul>
        </li> */}
            <li>
              <NavLink to="/contact"
                className={({ isActive }) => isActive ? "active" : ""}
                end={false}>Contact</NavLink>
            </li>
            {isUserLoggedIn ? <li className="dropdown">
              <a href="#">
                <span>Profile</span>{" "}
                <i className="bi bi-chevron-down toggle-dropdown" />
              </a>
              <ul>
                <li>
                  <Link to="/update-profile">Edit Profile</Link>
                </li>
                <li>
                  <Link to="/change-password">Change Password</Link>
                </li>
                <li>
                  <Link to="/change-profile-password">Change Profile Password</Link>
                </li>
                <li>
                  <Link href="#" onClick={handleLogout}>Logout</Link>
                </li>

              </ul>
            </li> : <></>}
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list" />
        </nav>
        {!isUserLoggedIn ? <>
          <Link className="btn-getstarted" to="/register">
            Register
          </Link>
          <Link className="btn-getstarted" to="/login">
            Login
          </Link>
        </> : <></>}
      </div>
    </header>

  )
}

export default Header
