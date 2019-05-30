import React from 'react';

const Services = () => (
  <section className="content-section bg-primary text-white text-center" id="services">
    <div className="container">
      <div className="content-section-heading">
        <h3 className="text-secondary mb-0">Competencies</h3>
        <h2 className="mb-5">What Can I Do?</h2>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
          <span className="service-icon rounded-circle mx-auto mb-3">
            <i className="icon-screen-desktop"></i>
          </span>
          <h4>
            <strong>FullStack Developer</strong>
          </h4>
          <p className="text-faded mb-0">I develop for web. I work with React, Redux, Node, Docker, MongoDB, MySQL and some love. This site is build on React!</p>
        </div>
        <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
          <span className="service-icon rounded-circle mx-auto mb-3">
            <i className="icon-notebook"></i>
          </span>
          <h4>
            <strong>Electronics Engineer</strong>
          </h4>
          <p className="text-faded mb-0">Master's in Electrical Electronics Engineering from the University of Glasgow. So rest assured that I can build you a battle robot from legos</p>
        </div>
        <div className="col-lg-3 col-md-6 mb-5 mb-md-0">
          <span className="service-icon rounded-circle mx-auto mb-3">
            <i className="icon-emotsmile"></i>
          </span>
          <h4>
            <strong>Graphics Designer</strong>
          </h4>
          <p 
            className="text-faded mb-0">I draw shapes and make things look pretty. Click on the icon to check out my previous work.
          </p>
        </div>
        <div className="col-lg-3 col-md-6">
          <span className="service-icon rounded-circle mx-auto mb-3">
            <i className="icon-like"></i>
          </span>
          <h4>
            <strong>Utility Player</strong>
          </h4>
          <p className="text-faded mb-0">I work well with others and can navigate the dynamics of the toughest teams. </p>
        </div>
      </div>
    </div>
  </section>
);

export default Services;
