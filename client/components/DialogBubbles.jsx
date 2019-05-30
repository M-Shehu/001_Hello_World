import React, { useState, useEffect } from 'react';

const DialogBubbles = ({ dialogCount }) => {

  const [message, setMessage] = useState('Hello There!');
  const [showContinue, setShowContinue] = useState(true);

  const changeState = (dialogCount) => {
    switch (dialogCount) {
      case 0:
        return 'Hello There!';
      case 1:
        return 'Weclome to my website!';
      case 2:
        return 'Shehu\'s Website I mean';
      case 3:
        return 'My name is Shetron but my friends call me S-tron';
      case 4:
        return 'Check out what I can do! Go on, give me a spin';
      case 5:
        return 'Make sure to send Shehu a message while you\'re at it';
    }
  }
  return (
    <React.Fragment>
      <div className="example-obtuse">
        <p>{changeState(dialogCount)}</p>
      </div>
      {dialogCount < 5 ? <p>Tap to continue</p> : null}
    </React.Fragment>
)};

export default DialogBubbles;