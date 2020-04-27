import React, { Component } from 'react'

export default class GuestList extends Component {
    
    
    render() {

        const showGuest = this.props.listGuestsOfType.map(item=><div>
                <div>{item.user.name}</div>
                
            </div>)
        const check = this.props.listGuestsOfType.length!=0?showGuest:<div>Không có phòng đặt</div>
        return (
            <div className = 'guests'>
                {check}
            </div>
        )
    }
}
