

const ChildComp=(props)=>{

    const {uname,usalary} = props; // destructuring of props
    return (<div>
        <h2>This is Child Component</h2>
        <div>Employee Name:<strong>{uname}</strong></div>
        <div>Employee Salary:<strong>{usalary}</strong></div>
        <button type="button" onClick={()=>props.updateSal()}>update State data</button>
    </div>)
}
export default ChildComp