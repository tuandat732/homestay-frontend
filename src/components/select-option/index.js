import React, { Component } from 'react'
// import array from "../../env/HostUltilities"
export default class SelectOption extends Component {
    render() {
        return (<>
            {this.props.options.map(option => <option value = {option} >{option}</option>)}
            </>
        )
    }
}
