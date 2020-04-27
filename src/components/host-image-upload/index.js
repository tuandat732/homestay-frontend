import React, { Component } from 'react'

export default class UploadImage extends Component {
    onDeleteImage = ()=>{
        this.props.delete(this.props.imageURL)
    }
    render() {
        return (
            <div>
                {<img alt = "" src = {URL.createObjectURL(this.props.imageURL)} style  =  {{height :150,width:150,margin:'10px'}}></img> }
                <i class="far fa-trash-alt" onClick = {this.onDeleteImage}></i>
            </div>
        )
    }
}
