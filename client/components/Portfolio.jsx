import React from 'react';

const Portfolio = () => (
  <section className="content-section" id="portfolio">
    <div className="container">
      <div id="3js-porfolio"></div>
      <div className="content-section-heading text-center">
        <h3 className="text-secondary mb-0">Portfolio</h3>
        <h2 className="mb-5">What Projects have I Done?</h2>
      </div>
      <div className="row no-gutters">
        <div className="col-lg-6">
          <a className="portfolio-item" href="https://github-fetcher-shehu.herokuapp.com/" target="blank">
            <span className="caption">
              <span className="caption-content">
                <h2>GitHub Repo Fetcher</h2>
                <p className="mb-0">A web app that fetches GitHub Repos and sort's them by most Forks</p>
              </span>
            </span>
            <img className="img-fluid" src="/img/github.jpg" alt=""/>
          </a>
        </div>
        <div className="col-lg-6">
          <a className="portfolio-item" href="https://trade-desk.herokuapp.com/" target="blank">
            <span className="caption">
              <span className="caption-content">
                <h2>GoblinHood</h2>
                <p className="mb-0">A direct clone of the Robinhood website using Service Oriented Architecture!</p>
              </span>
            </span>
            <img className="img-fluid" src="/img/robinhood.jpg" alt="" style={{"objectFit":"contain"}}/>
          </a>
        </div>
        <div className="col-lg-6">
          <a className="portfolio-item" href="#">
            <span className="caption">
              <span className="caption-content">
                <h2>Sprise</h2>
                <p className="mb-0">A website to surprise loved ones!</p>
              </span>
            </span>
            <img className="img-fluid" src="/img/portfolio-3.jpg" alt=""/>
          </a>
        </div>
        <div className="col-lg-6">
          <a className="portfolio-item" href="#">
            <span className="caption">
              <span className="caption-content">
                <h2>SDC</h2>
                <p className="mb-0">Coming Soon.</p>
              </span>
            </span>
            <img className="img-fluid" src="/img/portfolio-1.jpg" alt="" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Portfolio;