import React, { Component } from 'react'
import {withRouter} from "react-router-dom"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css"
class BlockPrice extends Component {
    
    state = {
        startDay : undefined,
        endDay : undefined,
        night:0,
        people:1,
        extraPrice:0,
        price:0,
    }
    componentDidUpdate(){
        if(this.props.range.from !== this.state.startDay && this.props.range.to !== this.state.endDay){
            this.setState({
                startDay : this.props.range.from,
                endDay : this.props.range.to,
                night:Number(Math.round((Date.parse(this.props.range.end) - Date.parse(this.props.range.from)) * 0.012 / 1000000)),
            
            })
        }
    }
    changePeople = (e)=>{
        if(Number(e.target.value)>=0)
        {
            this.setState({
                people : e.target.value
            })
        }
        else{
            this.setState({
                people : undefined,
            })
        }
        if(Number(e.target.value) > this.props.room.maxPeople){
            let extraPeople = Number(e.target.value) - this.props.room.maxPeople
            this.setState({
                extraPrice : extraPeople*this.props.room.extraPrice
            })
        }else{
            this.setState({
                extraPrice : 0,
            })
        }
       
    }
    
    submit = ()=>{
        if(this.props.authed.email){
            if( Number(this.state.people) >= 1 &&this.state.endDay !== undefined && this.state.startDay !== undefined){
                console.log("a")
                sessionStorage.setItem("people",this.state.people)
                sessionStorage.setItem("night",this.state.night)
                sessionStorage.setItem("total_price",(this.props.room.price*this.state.night + this.state.extraPrice))
                sessionStorage.setItem("extra_price",this.state.extraPrice)
                sessionStorage.setItem("price",this.props.room.price*this.state.night)
                sessionStorage.setItem("room_name",this.props.room.name)
                sessionStorage.setItem("start_date",this.props.range.start)
                sessionStorage.setItem("end_date",this.props.range.end)
                sessionStorage.setItem("special_note",this.props.room.specialNote)
                sessionStorage.setItem("idHost",this.props.room.idHost)
                sessionStorage.setItem("idRoom",this.props.room._id)
                this.props.history.push(`/check-out`)
            }        
        } else{
            this.props.history.push('/sign-in')
        }
        
    }

    render() {

        console.log(this.state)
        const night = (this.state.night === 0 || this.state.night === NaN)?
        null:<div>{this.state.night}<span>đêm</span></div>
        
        const extraPrice = (this.state.extraPrice>0)?
        <div><span>Phụ phí : {this.state.extraPrice} <span style = {{textDecoration:'underline'}}>đ</span></span></div>:null
        
        const sumPrice= (this.state.night<=0 || this.state.night === NaN)?null:
        <><div><span>Tổng tiền : </span> {this.props.room.price*this.state.night+this.state.extraPrice} <span style = {{textDecoration:'underline'}}>đ</span></div></>
        
        return (
            <div className="block-price">
                <div><span style = {{fontSize:36,fontWeight:600}}>{this.props.room.price}<span style = {{textDecoration:'underline'}}>đ</span></span>/đêm</div>

                <div className="block-price-check-in">
                    <a href = "#calendar-box">

                <label style={{width:"10px"}}                   
                >Ngày đến 
                </label>
                <div>{this.props.range.start !== "undefined"?<>{this.props.range.start}</>:null}</div>
                    </a>
                    
                <a href = "#calendar-box">
                <label 
                    style={{width:"10px"}}
                >Ngày đi</label>
                <div>{this.props.range.end !== "undefined"?<>{this.props.range.end}</>:null}</div>
                </a>
                </div>

                <input type = 'text' value = {this.state.people} onChange = {this.changePeople}/>

                <div> {night}</div>
                <div className="block-extra-price-stay-day">{extraPrice}</div>
                <div className="block-price-stay-day">{sumPrice}</div>
                <div className="block-price-button">
                    <button onClick = {this.submit}>Đặt ngay</button>
                </div>
            </div>
        )
    }
}

export default withRouter(BlockPrice);