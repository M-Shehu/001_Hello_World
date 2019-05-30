import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import DialogBubbles from './DialogBubbles';
import RobotButtons from './RobotButtons';
import axios from 'axios';
// import RoundButtons from './RoundButtons';


let count;

const ContactMe = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [buttonText, setButtonText] = useState('Send Message');
  const [sent, setSent] = useState(false);
  const [height, setHeight] = useState('auto');
  const [dialogCount, setDialogCount] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  let containerHeight;
  const nameInput = React.createRef();
  const messageInput = React.createRef();
  const emailInput = React.createRef();

  const setExtraHeight = (extra) => {
    containerHeight = document.getElementById('bottom-container').clientHeight;
    setHeight(containerHeight + extra);
  };

  const checkDeviceSize = (isDesktop) => {
    if (isDesktop.matches) { // If media query matches
      setExtraHeight(100);
      window.onresize = setExtraHeight(100);
    } else {
      setExtraHeight(550);
      window.onresize = setExtraHeight(550);
    }
  };
  
  useEffect(() => {
    var isDesktop = window.matchMedia("(min-width: 992px)")
    checkDeviceSize(isDesktop) // Call listener function at run time
    isDesktop.addListener(checkDeviceSize) // Attach listener function on state changes
  });

  const bubbleClicked = (e) => {
    dialogCount < 5 ? setDialogCount(dialogCount + 1) : null; 
    dialogCount === 4 ? document.getElementById("robot-buttons").style.display = "inline-block" : null;
  }

  const resetForm = () => {
    setName('');
    setMessage('');
    setEmail('');
    setButtonText('Message Sent');
  }

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('https://83yt95hn8b.execute-api.us-west-1.amazonaws.com/dev/contact', {
      name: name,
      email: email,
      message: message
    })
    .then(() => {
      setSent(true);
      resetForm();
    })
    .catch( () => {
    console.log('Message not sent')
  })
  }


  return (
    <React.Fragment>
      <div style={{position:"relative", minHeight:"100vh", height: height, display: "block"}}>
        <section id="bottom-container">
          <div className="container text-center"  id="contact-container">
            <div className="content-section-heading" id="contact-heading">
              <h3 className="text-secondary mb-0">Contact Me</h3>
              <h2 className="mb-5">Let's Talk</h2>
            </div>
            <div id="contact-robot-container">
              <div id="robot-container">
                <ul id="robot-buttons">
                  <RobotButtons /> 
                </ul>
                <div id="dialog-bubble" onClick={bubbleClicked}>
                  <DialogBubbles dialogCount={dialogCount}/>
                </div>
              </div>
    
              <div id="contact">
                <form className="contact-form">
    
                  <div className="input-field">
                    <label className="message-name" htmlFor="message-name">Your Name</label>
                    <input onChange={e => setName(e.target.value)} ref={nameInput} onClick={e => nameInput.current.focus()} name="name" className="message-name" type="text" placeholder="Your Name" value={name}/>
                  </div>  
    
                  <div className="input-field">
                    <label className="message-email" htmlFor="message-email">Your Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} ref={emailInput} onClick={e => emailInput.current.focus()} name="email" className="message-email" type="email" placeholder="your@email.com" required value={email} />
                  </div>
                  <div className="input-field">
                    <label className="message" htmlFor="message-input">Your Message</label>
                    <textarea onChange={e => setMessage(e.target.value)} ref={messageInput} onClick={e => messageInput.current.focus()} name="message" className="message-input" type="text" placeholder="Please write your message here" value={message} required/>
                  </div>
                  <div className="button--container">
                      <button type="submit" className="btn btn-secondary" onClick={onSubmit}>{ buttonText }</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <div id="robot"></div>
        <footer className="footer text-center" id="copyright">
          <div style={{"position": "relative", "left": "-50%"}}>
            <div className="container">
              <p className="text-muted small mb-0">Copyright &copy; Muhammad O. Shehu 2019</p>
            </div>
          </div>
        </footer>
      </div>
    </React.Fragment>
)};

export default ContactMe;
export { count };