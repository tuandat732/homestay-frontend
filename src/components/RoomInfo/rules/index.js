import React, { Component } from 'react'
import "./index.css"
export default class Rules extends Component {
    state={
        checkIn:"12:am",
        checkOut:"10:am"
    }

    render() {
        
        return (
            <div className="room-detail-rules">
                <h3 className="room-detail-rules-title">
                    <span>Nội quy và chính sách về chỗ ở</span>
                </h3>
                <div className="room-detail-rules-cancel-room">
                    <h4>
                        <span>Chính sách</span>
                    </h4>
                    <div>{this.props.room.policy}</div>
                </div>
                <div className="room-detail-rules-special-note">
                    <h4>
                        <span>Lưu ý đặc biệt</span>
                    </h4>
                    <div>{this.props.room.specialNote}</div>
                </div>
                <div className="room-detail-rules-time-checkin">
                    <h4>
                        <span>Thời gian nhận phòng</span>
                    </h4>

                    <div className="room-detail-rules-time-takeroom">
                        <div><span>Nhận phòng</span></div>
                        <div className="check-in-time">{this.state.checkIn}</div>
                    </div>
                    <div className="room-detail-rules-time-leftroom">
                        <div><span>Trả phòng</span></div>
                        <div className="check-out-time">{this.state.checkOut}</div>
                    </div>
                </div>
            </div>
        )
    }
}
