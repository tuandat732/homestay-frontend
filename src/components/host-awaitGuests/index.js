import React, { Component } from 'react'

export default class AwaitGuest extends Component {
    onAccept = () =>{
        this.props.onAccept(this.props.awaitGuest)
    }
    render() {
        return (
           <div className = "await-guest">
               <div>
                    {this.props.awaitGuest.user.name}
                </div>
                <button onClick = {this.onAccept}>Nhận</button>
           </div>
        )
    }
}
