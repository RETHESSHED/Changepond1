import React, { Component } from "react";

class ClassComp extends Component{

    render(){
        return (<div>
            <h2>This is Class Component</h2>
            <p>My Name is <strong>{this.props.ename}</strong>,
            I am <strong>{this.props.epost}</strong> </p>
        </div>)
        
    }
}

export default ClassComp;

