import React, { Component } from 'react'
import "./index.css"

export default class GiaPhong extends Component {
    render() {
        return (
            <div className="room-detail-price">
                <div className="room-detail-stay-price">
                    <h2><span>Giá phòng</span></h2>
                    <p>{this.props.room.roomPriceNote}</p>
                    <p>{this.props.room.price}</p>
                </div>
                <div className="room-detail-extra-price">
                    <p><span>Phí khách tăng thêm</span></p>
                    <p className="extra-price">{this.props.room.extraPrice}</p>
                </div>
                <div className="room-detail-price-minnight">
                    <p><span>Số đêm tối thiểu</span></p>
                    <p className="minNight">{this.props.room.minNight}</p>
                </div>


            </div>
        )
    }
}
