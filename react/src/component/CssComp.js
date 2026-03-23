import React from 'react';
import './externalstyle.css';
import demo from './mycss.module.css';

const CssComp = () => {

 const mycssprop={
        color:"blue",
        fontSize:"20px",
        textTransform:"uppercase"
    }
    return (
        <div>
            {/* use of enternal css  */}
           <h2 style={{color:"red",backgroundColor:"aqua"}}>This is Css Component</h2> 
           <div style={mycssprop}>Panchashil Wankhede</div>
           {/* use of external css  */}
           <h2 className='txt-danger'>Hello Friends</h2>
           <h2 className='txt-success'>Welcome In Changepond</h2>
           {/* use of module css  */}
           <div className={demo.special}>hi</div>
        </div>
    )
}

export default CssComp
