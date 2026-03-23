import React from 'react'
import ClassComp from '../components/ClassComp'
import FunctionComp from '../components/FunctionComp'


const VirtualDOMComp = () => {
  return (
    <div>
      This is Class Componenet <br />
         <ClassComp u="nirmal" id="5" /> <br /><br />
         This is Function Component <br />
          <FunctionComp uname="nir" id="3" company="dell"/> 
    </div>
  )
}

export default VirtualDOMComp