import { render } from "@testing-library/react"
import { Component } from "react"

class ClassComp extends Component {
    render(){
        return (
            <>
            {`${this.props.u} || ${this.props.id}`}
            </>
        )
    }
}

export default ClassComp