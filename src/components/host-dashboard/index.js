import React, { Component } from 'react'
import { Container } from "reactstrap"
import { Link ,withRouter} from "react-router-dom"
import ListGuests from "../list-guest"
import axios from "axios"
import DatePicker from "react-datepicker"
import "./hostDashboard.css"
import AwaitGuest from '../host-awaitGuests'

class DashBoard extends Component {
    state = {
        date: new Date().toDateString(),
        listGuest : [],
        listGuestsOfType :[],
        status : "in",
        awaitGuest :[
        ]
    }

    
    async componentDidMount() {
        
        if(!localStorage.getItem("jwt_token_host")){
            this.props.history.push("/sign-in")
        }
        // this.checkLoginHost()
        const hi =  await setTimeout(async ()=>{
            try{
                const result = await this.getListGuests()
                }catch(error){
                    console.log(error)
                }
        },500)
 
    }
    

    onChangeDate = (e) => {
        console.log(e)
        this.setState({
            date: e.toDateString()
        })
        // this.getListGuests();
        

    }
    checkLoginHost = () => {
        // TODO check token from host
    }
    getListGuests = async ()=>{
        console.log(this.props.authed)
        const res = await axios.post(`http://localhost:5000/book/host/list-book`,{
            idHost : this.props.authed.id
        })
        console.log(res)
        this.setState({
            listGuest :  res.data 
        })
        this.checkIn()
        let awaitGst = res.data.filter(element=>{
            if(element.status.doneAccept == false){ 
                 return element;
            }
        })
        console.log(awaitGst)
        this.setState({
            awaitGuest : awaitGst
        })
        
    }

    checkSameDay = (d,d2)=>{
        let day = new Date(d)
        let day2 = new Date(d2)
        if(day.getDate() == day2.getDate() && day.getMonth() == day2.getMonth() &&
            day.getFullYear() == day2.getFullYear()){
                return true;
        }
    }

    checkIn =()=>{
        let data = this.state.listGuest.filter((element)=>{
            if(this.checkSameDay(element.time.start,this.state.date)){
                return element
            }
        })
        console.log(data)
        this.setState({
            listGuestsOfType : data
        })
        console.log(this.state.listGuestsOfType)
        // TODO
        this.setState({
            status : "in"
        })
    }
    checkOut =()=>{
        let data = this.state.listGuest.filter((element)=>{
            if(this.checkSameDay(element.time.end,this.state.date)){
                return element
            }
        })
        console.log(data)
        this.setState({
            listGuestsOfType : data
        })
        // console.log(this.state.listGuestsOfType)
        // TODO
        this.setState({
            status : "out"
        })
    }
    overNight =()=>{
        // TODO
        let data = this.state.listGuest.filter((element)=>{
            if(Date.parse(element.time.end)<Date.parse(this.state.date) && Date.parse(this.state.date)<Date.parse(element.time.end)){
                return element
            }
        })
        console.log(data)
        this.setState({
            listGuestsOfType : data
        })
        // console.log(this.state.listGuestsOfType)
        // TODO
        this.setState({
            status : "over"
        })
    }
    onAccept = async (e)=>{
        console.log(e)
        // const res = await axios.get(`http://localhost:5000/`) 
        let array = this.state.awaitGuest.filter(ele =>ele != e)
        this.setState({
            awaitGuest : array
        })
    }


    render() {
        const activeIn = this.state.status == "in"?
        <div><li onClick = {this.checkIn}>Khách nhận phòng</li></div>        
        :<li onClick = {this.checkIn}>Khách nhận phòng</li>
        
        const activeOut = this.state.status == "out"?
        <div><li onClick = {this.checkOut}>Khách trả phòng</li></div>        
        :<li onClick = {this.checkOut}>Khách trả phòng</li>
        
        const activeOver = this.state.status == "over"?
        <div><li onClick = {this.overNight}>Lưu trú qua đêm</li></div>        
        :<li onClick = {this.overNight}>Lưu trú qua đêm</li>
        return (
            < Container >
                <div className = "add-new-btn"><Link to="/host/add-new-home-stay">
                     <span>+ Thêm chỗ ở mới</span>
                     </Link>
                </div>
                <div className = "boxes" >
                <div className = "box1">
                <div className='booking-calendar-box'>
                    <div className="date-box">
                        <div style = {{fontSize:"24px"}}>{(this.state.date)}</div>
                        <div>
                       
                        <DatePicker id = 'date-pickker' type="date" value={this.state.date} onChange={this.onChangeDate} />
                        <label for = "date-pickker" style = {{width:0,height:0,margin:0}} ><i   style = {{position:"relative",marginLeft:'-36px',zIndex:999}} class="fas fa-angle-down"></i></label>
                        </div>
                    </div>
                    <div className="list-bill">
                        <ul>
                            {activeIn}
                            {activeOut}
                            {activeOver}
                        </ul>
                        <ListGuests listGuestsOfType = {this.state.listGuestsOfType} />                        
                    </div>
            
                </div>
                <div className = "waiting-req">
                    <div style = {{fontSize:"24px",fontWeight:700}}>Yêu cầu đang chờ</div>
                    <ul>
                    {this.state.awaitGuest.map(item=><AwaitGuest awaitGuest = {item} onAccept = {this.onAccept}/>)}
                    </ul>

                </div>
                </div>
                <div className="box2">
                    
                </div>
                </div>
            </Container>
        )
    }
}

export default withRouter(DashBoard)
