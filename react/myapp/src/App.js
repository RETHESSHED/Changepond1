import { useState } from 'react';
//import './App.css';
import ClassComp from './components/ClassComp'
import FunctionComp from './components/FunctionComp';
import StateComp from './components/StateComp';
import MethodEventComp from './components/MethodEventComp';
import RethuComp from './components/RethuComp';
import RethuInc from './components/RethuInc';
import MyImagesComp from './components/MyImagesComp';
//import ErroBoundaryComp from './components/ErroBoundaryComp';
import ToggleComp from './components/task/ToggleComp';
import Toggle6Comp from './components/task/Toggle6Comp';
import MultiToggleComp from './components/task/MultiToggleComp';
import ClickCountComp from './components/day3/clickCountComp';
import HoverCountComp from './components/day3/HoverCountComp';
import CompLifeCycle from './components/day3/CompLifeCycle';


function App() {
  // let [first, setfirst] = useState(0)
  

  return (
    <div className="App">
      <div className='navbar'> 
        {/* <div style={{ textAlign : 'center'}}> */}

          {/* <ClassComp u="nirmal" id="5" /><br />  */}
          {/* <FunctionComp uname="nir" id="3" company="dell"/> */}

          {/* {<ClickCountComp />} */}
          {/* {<HoverCountComp /> } */}
          {/* <StateComp /> */}
          {/* <MethodEventComp />  */}

          {/* // <RethuComp />
          // <RethuFun  fname="Rethu" lname="ed" email= "rethu@gmail.com" contact= "9876543210"city= "Chennai"/> */}

        {/* <RethuInc />  */}

        {/* <MyimagesComp /> */}
        {/* <ErroBoundaryComp /> */}
        <ToggleComp />
         {/* <MultiToggleComp /> */}

        {/* <CompLifeCycle newColor="Green" /> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default App;
