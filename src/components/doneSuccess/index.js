import React, { Component } from 'react'
import Axios from 'axios';

export default class DoneSuccess extends Component {
    state={
        idRoom:'',
        idUser: '',
        idHost :'',

        time: {
        start:'',
        end:''
        },
         people:0,
        priceSum: 0,
        night:0,
        name:'',
        status:{
        doneAccept:false,
        donePay: true,
        doneCancel:false
         },
        dateUp: new Date(Date.now()),
        }

    getSession=()=>{
        const roomName = sessionStorage.getItem("room_name");
        const startDate = sessionStorage.getItem("start_date");
        const endDate = sessionStorage.getItem("end_date");
        const totalPrice = sessionStorage.getItem("total_price")
        const people= sessionStorage.getItem('people')
        const night = sessionStorage.getItem("night")
        const idHost = sessionStorage.getItem("idHost")
        const idGuest = sessionStorage.getItem("idGuest")
        const idRoom = sessionStorage.getItem("idRoom")


        this.setState({
            idUser : idGuest,
            idHost : idHost,
            idRoom : idRoom,
            night:night,
            name:roomName,
            people:people,
            time: {
                start:startDate,
                end:endDate
            },
            priceSum: totalPrice,
        })
    }
    
    componentDidMount(){
        this.getSession()
        this.upBill()
        
    }
    upBill = async ()=>{
        const res = await Axios.post(`http://localhost:5000/book/user`,this.state)
        console.log(res)
    }

    render() {
        return (
            <div className="doneSuccess">
                <p>Bạn đã đặt thành công phòng</p>
                <h4>{this.state.name}</h4>
                <p>Thời gian : từ ngày {this.state.time.start} đến ngày {this.state.time.end}</p>

            </div>
        )
    }
}
