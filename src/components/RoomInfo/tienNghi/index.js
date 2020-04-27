import React, { Component } from 'react'
import "./index.css"

export default class TienNghi extends Component {
    render() {
        const tienichgiadinh = this.props.room.ultilities[0].length != 0 ?
            <>


                {this.props.room.ultilities[0].map(item => <div >{item.value}</div>)}

            </>
            :
            null
        const tienichbep = this.props.room.ultilities[1].length != 0 ?
            <>

                {this.props.room.ultilities[1].map(item => <div className="">{item.value}</div>)}
            </>
            :
            null
        const tienichgiaitri = this.props.room.ultilities[2].length != 0 ?
            <>
                {this.props.room.ultilities[2].map(item => <div className="">{item.value}</div>)}
            </>
            :
            null
        return (
            <div className="room-detail-facilities">
                <div className="room-detail-facilities-title">
                    <h3><span>Tiện nghi chỗ ở</span></h3>
                    <span>Giới thiệu về các tiện nghi và dịch vụ tại nơi lưu trú</span>
                </div>
                <div className="room-detail-facilities-specific">
                    
                    <div className="room-detail-facilities-family">
                    <h4>Tiện ích gia đình</h4>
                        <div className="tien-ich">{tienichgiadinh}</div>
                    </div>
                    <div className="room-detail-facilities-kitchen">
                        <h4>Tiện ích bếp</h4>
                        <div className="tien-ich">{tienichbep}</div>
                    </div>
                    <div className="room-detail-facilities-entertainment">

                        <h4>Tiện ích giải trí</h4>
                        <div className="tien-ich">{tienichgiaitri}</div>

                    </div>
                </div>
            </div>
        )
    }
}
