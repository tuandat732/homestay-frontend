import React, { Component } from 'react'
import loadingGif from "./loading.gif"
class Loading extends Component {
    render() {
        return (
            <div style={{height:50,textAlign:"center"}}>
                <img src={loadingGif} ></img>
            </div>
        )
    }
}

export default Loading
