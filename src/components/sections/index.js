import React, { Component } from 'react'
import RoomItem from '../RoomItem/index'
import Slider from "react-slick";
import axios from "axios"
import Loading from "../Loading/index"

class Sections extends Component {

    state = {
        rooms:[],
        loading:false,
        }

    componentDidMount = async ()=>{
  
      const res = await axios.get(`http://localhost:5000/room/search?${this.props.text}=${this.props.value}`)
      if(res.status === 200){
          this.setState({
              rooms : [...res.data,...res.data]
          })
          this.setState({
            loading:false
          })
      }
        
    }

    render() {
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
          };
        console.log(this.props.data)
        return (
            <div className = "slide-show-homepage">
            <div style = {{fontSize:'24px',fontWeight:"700"}}>{this.props.title}</div>
            <Slider {...settings}>
                {this.state.rooms.map((item,index)=>(
                    <RoomItem key={index} room={item} />
                ))}
            </Slider>
        
            </div>
        )
    }
}

export default Sections
