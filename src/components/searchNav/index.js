import React, { Component } from 'react'
import "./searchNav.css"
import DatePicker from "react-datepicker";
import {withRouter} from "react-router-dom"
import "react-datepicker/dist/react-datepicker.css";
class SearchNav extends Component {
    state = {
        text: null,
        startDate : null,
        endDate :null,
        price : null,
        people:null,
    }

    // componentDidMount(){
        
    // }

    onChangeText = (e)=>{
        this.setState({
            text :e.target.value
        })
    }

    onStartDay = date => {
        this.setState({
          startDate: date
        });
    };
    onEndDay = date => {
        this.setState({
          endDate: date
        });
    };
    onChangePeople = (e)=>{
        this.setState({
            people : Number(e.target.value) 
        })
    }
    onChangePrice = (e)=>{
        this.setState({
            price : Number(e.target.value)
        })
    }

    submit =(e)=>{
        e.preventDefault();
        const {text,startDate,endDate,price,people} = this.state;
        this.props.history.push(`/search?text=${text}&startDate=${startDate}&endDate=${endDate}&price=${price}&people=${people}`)    
    }

    render() {
        // console.log("render o nav")
        // console.log(this.props.query)
        return (
            <form className = "search-form" onSubmit = {this.submit}>
            <div className = "search-nav">
                <div className = "container1">
                    <input type = "text" placeholder ="Tìm kiếm" value = {this.state.text} onChange = {this.onChangeText}/>
                    <div className = "search-date">
                    <DatePicker
                    placeholderText = "Ngày đến"
                    selected={this.state.startDate}
                    onChange={this.onStartDay}
                    />
                    <DatePicker
                    placeholderText = "Ngày đi"
                    selected={this.state.endDate}
                    onChange={this.onEndDay}
                    />
                    </div>
                
                    <input type = "number" placeholder = "Giá" value = {this.state.price} onChange = {this.onChangePrice} />
                    <input type = "number" placeholder = "Khách" value = {this.state.people} onChange = {this.onChangePeople} />

                    <button onClick = {this.submit} >Tìm kiếm</button>
                </div>

            </div>
            </form>
        )
    }
}
export default withRouter(SearchNav)