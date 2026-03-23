import React, { useState } from 'react';
import ret from '../../shared/images/ret.png';
import dosa from "../../shared/images/dosa.png";

const ToggleComp = () => {
  const [isDosa, setIsDosa] = useState(false);
  const [show, setShow] = useState(false);

  const toggleHandler = () => {
    if (!show) {
      setShow(true);
    } else {
      setIsDosa(!isDosa);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <b>Toggle Images</b> <br /><br />

      <button onClick={toggleHandler}>
        {!show ? 'Show Image' : isDosa ? 'Show ret' : 'Show dosa'}
      </button>

      <br /><br />

      {show && (
        <div>
          {/* This displays the name above the image */}
          <h3 style={{ textTransform: 'capitalize' }}>
            {isDosa ? 'Dosa' : 'Ret'}
          </h3>
          
          <img 
            src={isDosa ? dosa : ret} 
            width="500px" 
            height="250px" 
            alt={isDosa ? 'dosa' : 'ret'} 
          />
        </div>
      )}
    </div>
  );
};

export default ToggleComp;
