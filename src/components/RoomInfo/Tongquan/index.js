import React, { Component } from 'react'
import "./index.css"


export default class TongQuan extends Component {
    
    render() {

        return (
            
            <div className="room-detail-survey">
                
                <div className="room-detail-survey-room-name">
                    <h1>{this.props.room.name}</h1>
                </div>
              
                <div className="room-detail-survey-info">
                    <div className="room-detail-survey-address">
                        <span className="">{this.props.room.city} - </span>
                        <span>{this.props.room.district} - </span>
                        <span>{this.props.room.country}</span>
                    </div>
                    <div className="room-detail-survey-house-type">
                        <span className="">{this.props.room.typeHouse}  - </span>
                        <span>{this.props.room.size} m<sup>2</sup></span>
                    </div>
                    <div className="room-detail-survey-room-type">
                        <span>{this.props.room.typeRoom}  - </span>
                        <span>{this.props.room.bedRooms} phòng ngủ  - </span>
                        <span>{this.props.room.livingRooms} phòng khách </span>
                        <span>(tối đa {this.props.room.maxPeople} người)</span>
                    </div>
                </div>

                <p className="room-detail-survey-specific-detail"><span>{this.props.room.detailinfo}</span>
                </p>
            </div>
        )
    }
}
