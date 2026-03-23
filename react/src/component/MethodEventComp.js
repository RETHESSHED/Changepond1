
import React, { Component } from "react";

class MethodEventComp extends Component{

    constructor(){
        super();
        this.state={
            salary:10000
        }
    }

    updateSal=()=>{
     this.setState((prevSat)=>({salary:prevSat.salary+1000}));
    }

    greet=()=>{
       window.alert("Good Morning My Dear Friends")
    }
    welcome=(...std)=>{
       window.alert(`Welcome You ${std} In My React Session. `)
    }

    render(){
        return <div>
            <h2>This is Method Event Component</h2>
            <button type="button" onClick={this.greet}>Greet</button>{" "}
            <button type="button" onClick={()=>this.greet()}>Greet2</button>{" "}
            <button type="button" onClick={()=>this.welcome("Rojar","Rahul")}>Welcome</button>
            <h2 onMouseOver={()=>this.welcome("Stephan","Sanjay")}>hover Mouse over me</h2>
            
            <p>Salary is <strong>{this.state.salary}</strong></p>
            <button type="button" onClick={()=>this.updateSal()}>Increment Salary</button>{" "}
        </div>
    }   
}

export default MethodEventComp;