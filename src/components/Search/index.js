import React, { Component } from 'react'
import queryString from 'query-string'
import axios from "axios"
import RoomItem from '../RoomItem';
import "./search.css"
export default class Search extends Component {
    state = {
        text: null,
        startDate : null,
        endDate :null,
        price : null,
        people:null,
        room:[],
        location:null
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(window.location.search,this.state.location)
        if (this.state.location != window.location.search) {
            this.fetchSearchResult();
        }
    }

    componentDidMount(){
        this.fetchSearchResult()
    }

    fetchSearchResult = async () => {
        const {text,startDate,endDate,price,people} = queryString.parse(window.location.search);
        const res = await axios.get(`http://localhost:5000/room/search?text=${text}&startDate=${startDate}&endDate=${endDate}&price=${price}&people=${people}`)
        console.log(res.data)
        if(res.status ===200){
            this.setState({
                room : res.data,
                location:window.location.search
            })
        }
    }

    searchingRoom = async ()=>{
        const {text,startDate,endDate,price,people} = this.state
        const res = await axios.get(`http://localhost:5000/room/search?text=${text}&&startDate=${startDate}&&endDate=${endDate}&&price=${price}&&people=${people}`)
        if(res.status ===200){
            this.setState({
                room : res.data,
                search:false,
            })
        }
    }


    render() {
        {console.log(this.state.room)}
        return (
            <div className = "search-body">
            <div className = "container1">
            <div className = "search-result">
                <div>
               {this.state.room.map(room =><RoomItem room = {room}/>)} 
                </div>
            </div>
            </div>
            </div>
        )
    }
}
