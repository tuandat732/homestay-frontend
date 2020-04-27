import React, { Component } from 'react'
import { FaStar } from 'react-icons/fa'
import "./index.css"

class CommentItem extends Component {
    getStart = (number) => {
        let arrayStars = []
        for (let i = 0; i < 5; i++) {
            i < number ? arrayStars.push(true) : arrayStars.push(false)
        }
        return arrayStars
    }
    render() {
        const { content, userName, rate, avaUser, subTime } = this.props.comment
        return (
            <div className="comment-item">
                <div className='comment-user'>
                    <img src={avaUser} />
                    <div className='user-time'>
                        <div className="user">
                            <span>{userName} . </span>
                            <div>
                            {this.getStart(rate).map(item => (
                                item ? <FaStar style={{ color: "#ffb025" }} /> : <FaStar style={{ color: "#888" }} />
                            ))}
                            </div>
                        </div>
                        <div className="time">
                            {subTime}
                        </div>
                    </div>
                </div>
                <div className='comment-content'>
                    {content}
                </div>
                <hr/>
            </div>
        )
    }
}

export default CommentItem
