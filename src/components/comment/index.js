import React, { Component } from 'react'
import axios from 'axios'
import CommentItem from '../commentItem/index'
import { FaStar, FaTimes } from 'react-icons/fa'
import './index.css'
import StarRatingComponent from 'react-star-rating-component';
import { Link } from "react-router-dom"

class Comment extends Component {
    state = {
        listComment: [],
        content: '',
        rating: 0,
        preRate: 0,
        isOpen: false,
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({ rating: nextValue, preRate: nextValue });
    }

    onStarHover(nextValue, prevValue, name) {
        this.setState({
            rating: nextValue
        })
        this.onChangeColor()
    }

    onStarHoverOut(nextValue, prevValue, name) {
        this.setState({
            rating: prevValue
        })
        this.onChangeColorOut()
    }

    onChangeColor = () => {
        const stars = document.getElementsByClassName('dv-star-rating-empty-star');
        for (let i = 0; i < this.state.rating - this.state.preRate; i++) {
            stars[stars.length - i - 1].style.color = "#ffb400"
            stars[stars.length - i - 1].style.transition = "all 0.5s"
        }
    }

    onChangeColorOut = () => {
        const stars = document.getElementsByClassName('dv-star-rating-empty-star');
        for (let i = 0; i < this.state.rating - this.state.preRate; i++) {
            stars[stars.length - i - 1].style.color = "#333"
            stars[stars.length - i - 1].style.transition = "all 0.5s"
        }
    }

    onChange = (e) => { this.setState({ content: e.target.value }) }

    onSubmit = async (e) => {
       
        e.preventDefault()
        const res = await axios.post(`http://localhost:5000/room/cmt/${this.props.idRoom}`, {
            idUser: this.props.idUser,
            rate: this.state.rating,
            content: this.state.content
        })
        if (res.status === 200) {
            let stars = document.getElementsByClassName("dv-star-rating-star")
            for (let i =0;i<stars.length;i++){
                stars[i].className="dv-star-rating-star dv-star-rating-empty-star"
                stars[i].style.color = "#333"
            }
            this.setState({
                content: '',
                rating: 0,
                preRate: 0,
            })
            this.getListComment()
        }
    }

    getListComment = async () => {
        const res = await axios.get(`http://localhost:5000/room/cmt/${this.props.idRoom}`);
        if (res.status === 200)
            this.setState({
                listComment: [...res.data]
            })

        console.log(this.state.listComment)
    }

    onClickGetFullCmt = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    onClickToClose = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    async componentDidMount() {
        const result = await this.getListComment()
    }

    render() {
        const formCmt = this.props.authed.email?
        <form onSubmit={this.onSubmit}>
                            <div className='in'>
                                <div className="rate-star">
                                    <img style={{ width: "50px", height: "50px", borderRadius: "50%" }} src="https://image.shutterstock.com/image-vector/male-default-avatar-profile-gray-260nw-362901362.jpg" />
                                    <div className='name-star'>
                                        <div className='user-name'>{this.props.authed.name}</div>
                                        <StarRatingComponent
                                            name="rate"
                                            renderStarIcon={() => <FaStar />}
                                            starCount={5}
                                            onStarClick={this.onStarClick.bind(this)}
                                            onStarHover={this.onStarHover.bind(this)}
                                            onStarHoverOut={this.onStarHoverOut.bind(this)}
                                        />
                                    </div>
                                </div>
                                <textarea type='input' placeholder="Nhập nhận xét..." value={this.state.content} onChange={this.onChange} />
                            </div>
                            <button>Gửi</button>
                        </form> : <Link to='/sign-in'>Đăng nhập để nhận xét</Link>
        return (
            <>
                <div className={this.state.isOpen ? "comment-tab comment-tab-active" : "comment-tab"}>
                    <div className="icon"><FaTimes style={{ width: "100px", float: "right", marginBottom: "100px" }} onClick={this.onClickToClose} /></div>
                    <hr />
                    <h1 style={{ marginBottom: "30px" }}>{this.state.length} Đánh giá</h1>
                    <div className='list-cmt'>
                        {this.state.listComment.map(item => (
                            <CommentItem key={item.id} comment={item} />
                        ))}
                    </div>
                </div>

                {/* comment form and rate */}
                <div className='comment-full'>
                    <div className="comment-form">
                        {formCmt}
                    </div>

                    <div className="list-comment">
                        {this.state.listComment.map((item,index) => (
                            index<3?<CommentItem key={item.id} comment={item} />:null
                        ))}
                        <div className='get-full-cmt' onClick={this.onClickGetFullCmt}>{this.state.listComment.length - 3>0?`Xem thêm ${this.state.listComment.length-3}`:null}</div>
                    </div>
                </div>
            </>
        )
    }
}


export default Comment;
