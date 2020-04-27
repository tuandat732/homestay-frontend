import React, { Component } from 'react'
import './index.css'
import {Link ,Route, withRouter} from "react-router-dom"
// import {react} from 'react-icons/fa';
class RoomItem extends Component {
    constructor(props){
        super(props);
    }
    getRoomDetail = ()=>{
        this.props.history.push(`/room/detail/${this.props.room._id}`)
    }
    render() {
        // console.log(1)
        const {city,district,name,imageURL,typeHouse,price,standardPeople,bedRooms,bathRooms} = this.props.room;
        // console.log(city,district,name,imageURL,typeHouse,price,standardPeople,bedRooms,bathRooms)
        return (
        
            <div className='room-item' onClick ={this.getRoomDetail}>
                <div>
                <img style = {{width:"270px",height:"190px"}}src={imageURL[0]}/>
                </div>
                <div className = "homepage-room-specific">
                    <div className= "room-item-typehouse">{typeHouse}</div>
                    <div className = "room-item-name">
                         <i class="fab fa-react"></i>
                         <div>{name}</div>
                    </div>
                    <div className = 'room-item-numbers'>
                        <span>{standardPeople} khách - {bedRooms} phòng ngủ - {bathRooms} phòng tắm</span>
                    </div>
                    <div className = "room-item-price"><span>{price} <span style = {{textDecoration:"underline"}}>đ</span>/đêm</span></div>
                    <div className = "room-item-address">
                        <span>{city}, {district}</span>
                    </div>
                </div>
                
            </div>
            
        )
    }
}

export default withRouter(RoomItem)
