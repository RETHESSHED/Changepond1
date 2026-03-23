import React, { Component, PureComponent } from 'react'

class MyPureComp extends PureComponent {

    render() {
        console.log("my pure component");
        return (
            <div>
               <h2>This is MyPure Component</h2> 
               <p>My Name is : {this.props.myname}</p>
            </div>
        )
    }
}

export default MyPureComp
