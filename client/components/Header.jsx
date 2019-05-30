import React from 'react';

const Header = () => (
  <header className="masthead d-flex">
    <div className="container banner-text my-auto">
      <h1 className="mb-1"><span className="bold">Shehu</span><br /> Olatunji Muhammad</h1>
      <br />
      <h3 className="mb-4">
        <em className="type"></em>
      </h3>
      <ul className="social-icons">
        <li className="">
          <div className="icons" >
            <a href="https://www.linkedin.com/in/M-Shehu/" target="blank">
              <i className="icon-social-linkedin"></i>
            </a>
          </div>
        </li>
        <li className="">
          <div className="icons" >
            <a href="https://github.com/M-Shehu" target="blank">
              <i className="icon-social-github"></i>
            </a>
          </div>
        </li>
        <li className="">
          <div className="icons" >
            <a href="mailto: mag.shehu@gmail.com" target="blank">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </li>
      </ul>
      <a className="btn btn-secondary btn-xl js-scroll-trigger banner-btn" id="banner-btn" href="#about">Come on in</a>
    </div>
    <div className="overlay"></div>
  </header>
);

export default Header;