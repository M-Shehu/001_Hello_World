import React from 'react';
import Navigation from './Navigation';
import Header from './Header';
import About from './About';
import Services from './Services';
import ResumeCallout from './ResumeCallout';
import Portfolio from './Portfolio';
import ScrollToTop from './ScrollToTop';
import Footer from './Footer';
import ContactMe from './ContactMe';
// import '../helpers/RobotController';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div id="page-top">
        <Navigation />
        <div id="entire-page">
          <Header />
          <About />
          <Services />
          <ResumeCallout />
          <Portfolio />
          <ContactMe />
          <ScrollToTop />
        </div>
      </div>
    )
  }
}

export default App;