import { Component, useState } from "react";

class RethuInc extends Component{
    defaultVal = 1000;
    constructor(){
        super();
        this.state={num: this.defaultVal}
        
    }
    IncNum=()=>{
        this.setState((prevSat)=> ({
            num: prevSat.num + 1000
        }))
    }
    ResNum=()=>{
        this.setState((prevSat)=>({
            num: this.defaultVal
        }))
    }
    DecNum=()=> {
        this.setState((prevSat)=>({
            num: prevSat.num-1000
        }))
    }

    render(){
        return (
            <div>
                {`Count : ${this.state.num}  `} <br />
                <button type="button" onClick={()=> this.IncNum()}> Increment</button>
                <button type="button" onClick={()=> this.DecNum()}>Decrement</button>
                <button type="button" onClick={()=> this.ResNum()}> Reset</button>

            </div>
        )
    }
}

export default RethuInc