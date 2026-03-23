import logo from './logo.svg';
import './App.css';
import FunctionComp from './component/FunctionComp';
import ClassComp from './component/ClassComp';
import StateComp from './component/StateComp';
import MethodEventComp from './component/MethodEventComp';
import ParentComp from './component/ParentComp';
import ConditionRenComp from './component/ConditionRenComp';
import CssComp from './component/CssComp';
import MyImagesComp from './component/MyImagesComp';
import UserComp from './component/UserComp';
import ErrorBoundaryComp from './component/ErrorBoundaryComp';
import SliderComp from './component/SliderComp';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <h1>Welcome You All In React Session</h1>
      {/* <FunctionComp></FunctionComp> */}
      {/* <FunctionComp  uname="Saran" upost="Software Engineer" />
      <ClassComp ename="Panchashil" epost="Full Stack Developer"></ClassComp> */}
     {/* <StateComp/>
     <MethodEventComp/> */}
     {/* <ParentComp/> */}
     {/* <ConditionRenComp/> */}
     {/* <CssComp/> */}
     {/* <MyImagesComp/> */}
    {/* <ErrorBoundaryComp>
             <UserComp user="Panchashil" />
     </ErrorBoundaryComp>
     <ErrorBoundaryComp>
             <UserComp user="Rahul" />
     </ErrorBoundaryComp>
    <ErrorBoundaryComp>
             <UserComp user="Ganesh" />
     </ErrorBoundaryComp>
     <ErrorBoundaryComp>
             <UserComp user="Prakash" />
     </ErrorBoundaryComp>*/}
     <SliderComp/>
    </div>
  );
}

export default App;
