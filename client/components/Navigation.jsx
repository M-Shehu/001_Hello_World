import React, { useState } from 'react';

const Navigation = () => {

  const [isOpen, setIsOpen] = useState(false);

  function openNav() {
    setIsOpen(!isOpen);
    document.getElementById("sidebar-wrapper").style.width = "250px";
    document.getElementById("entire-page").style.marginRight = "250px";
  }

  function closeNav() {
    setIsOpen(!isOpen);
    document.getElementById("sidebar-wrapper").style.width = "0";
    document.getElementById("entire-page").style.marginRight = "0";
  }

  return (
    <React.Fragment>

    <a className="menu-toggle rounded" href="#" >
      <i className="fas fa-bars"></i>
    </a>
    <div id="sidebar-wrapper" >
      <ul className="sidebar-nav">
        <li className="sidebar-brand">
          <a className="js-scroll-trigger" href="#page-top">Check Me Out!</a>
        </li>
        <li className="sidebar-nav-item">
          <a className="js-scroll-trigger" href="#page-top">Home Page</a>
        </li>
        <li className="sidebar-nav-item">
          <a className="js-scroll-trigger" href="#about">About Me</a>
        </li>
        <li className="sidebar-nav-item">
          <a className="js-scroll-trigger" href="#services">Resume</a>
        </li>
        <li className="sidebar-nav-item">
          <a className="js-scroll-trigger" href="#portfolio">Portfolio</a>
        </li>
        <li className="sidebar-nav-item">
          <a className="js-scroll-trigger" href="#contact">Contact Me</a>
        </li>
      </ul>
    </div>
  </React.Fragment>
)};

// document.getElementById('sidebar-wrapper').addEventListener('click', openNav);
export default Navigation;