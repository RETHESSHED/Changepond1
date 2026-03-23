import React from 'react'

const MyReactMemoComp = (props) => {
    console.log("this is React memo comp");
    return (
        <div>
           <h2>This is MyReactMemoComp</h2> 
           <p>My Name is :{props.myname}</p>
        </div>
    )
}

export default React.memo(MyReactMemoComp);
