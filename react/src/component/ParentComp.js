import React, { Component } from "react";
import ChildComp from "./ChildComp";
import MyPureComp from "./MyPureComp";
import MyReactMemoComp from "./MyReactMemoComp";

class ParentComp extends Component{
   constructor(){
    super();
    this.state={
     empName:"Panchashil",
     empSal:10000
     }
   }

updateState=()=>{
    this.setState((prevState)=>({empName:"Panchashil Wankhede",empSal:prevState.empSal+1000}));
}
   render(){
     const {empName,empSal} = this.state; //destructuring state
     console.log("this is parent component");
    return <div>
        <h2>This is Parent Component</h2>
        <div>Employee Name:<strong>{empName}</strong></div>
        <div>Employee Salary:<strong>{empSal}</strong></div>
        <button type="button" onClick={()=>this.updateState()}>Update State Data</button>
    <hr/>
    {/* <ChildComp uname={empName} usalary={empSal} updateSal={this.updateState}></ChildComp> */}
     <MyPureComp myname={empName}></MyPureComp>
     <MyReactMemoComp myname={empName} />
    </div>
   }

}

export default ParentComp;