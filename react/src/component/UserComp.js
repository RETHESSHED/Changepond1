import React from 'react'

const UserComp = (props) => {

    if(props.user==="Ganesh"){
      throw new("Not A User");
    }
    return <div className='text-primary bg-info'>{props.user}</div>
}

export default UserComp
