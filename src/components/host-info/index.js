import React, { Component } from 'react'
import {Link} from "react-router-dom"
import {Container} from "reactstrap"
import './hostInfo.css'
export default class HostInfo extends Component {
    state = {
        value : "dashboard"
    }
    onDashBoard = (e)=>{
        this.setState({
            value : "dashboard"
        })
    }
    onMessage = (e)=>{
        this.setState({
            value : "message"
        })
    }
    onUpdate =()=>{
        this.setState({
            value :"update"
        })
    }
    render() {
        const dashBoard = this.state.value == "dashboard"?<div>
                <li><Link onClick = {this.onDashBoard} to = "/host/dash-board">Bảng thông tin</Link></li>
        </div>:
                <li><Link onClick = {this.onDashBoard} to = "/host/dash-board">Bảng thông tin</Link></li>
        const  message = this.state.value == "message"?<div>
                <li><Link onClick = {this.onMessage} to = "/host/message">Tin nhắn</Link></li>
        </div>:
                <li><Link onClick = {this.onMessage} to = "/host/message">Tin nhắn</Link></li>
        const  updateRoom = this.state.value == "update"?<div>
                <li><Link onClick = {this.onUpdate} to = "/host/room-manager">Chỗ ở của bạn</Link></li>
        </div>:
                <li><Link onClick = {this.onUpdate} to = "/host/room-manager">Chỗ ở của bạn</Link></li>

        return (
            <div className = "nav-pills">
            <Container>
            <div className = "nav-pills-host">
            <div>
                {dashBoard}
                {message}
                {updateRoom}

            </div>
            </div>
            </Container>          
            </div>
            
        )
    }
}
