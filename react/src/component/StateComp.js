import React, { Component } from "react";

class StateComp extends Component {
  constructor() {
    super();

    this.state = {
      ename: "Panchashil",
      esallary: 77000,
    };

    setTimeout(()=>{
    // this.setState({ename:"Panchashil Wankhede",esallary:this.state.esallary+3000});
    this.setState((prevState)=>({ename:'Panchashil Wankhede',esallary:prevState.esallary+3000}));
    },2000)
  }

  render() {
    return (
      <div>
        <h2>This is State Component</h2>
        <div>Emp Name is :{this.state.ename}</div>
        <div>Emp Sallary is :{this.state.esallary}</div>
      </div>
    );
  }
}

export default StateComp;
