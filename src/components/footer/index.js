import React, { Component } from 'react'
import {Container} from "reactstrap"
import {Link} from "react-router-dom"
import "./footer.css"
export default class Footer extends Component {
    render() {
        return (
            <div style = {{borderTop:"0.5px solid gray"}}>
            <Container>
                <div style = {{marginBottom:"50px",paddingTop:'20px'}}>
                <div className = "footer">
                    <div className = "footer-item">
                        <Link to = "/homepage"><img src = "" style = {{width:"30px",height:'30px'}}/><span>ThaiStay</span></Link>
                        <Link to = "/">Chính sách và điều khoản sử dụng</Link>
                        <Link to = "/about-us">Về chúng tôi</Link>
                        <Link to = "/security">Bảo mật</Link>
                    </div>
{/* 
                    <div  className = "footer-item" style = {{display:'flex',justifyContent:"flex-end"}} >
                        <i class="fab fa-facebook-square"></i>
                        <i class="fab fa-youtube"></i>
                    </div> */}
                </div>
                <div>© 2019 ThaiStay. Bản quyền thuộc về tập đoàn ThaiStay Việt Nam. Mọi hành vi sao chép đều là phạm pháp nếu không có sự cho phép bằng văn bản của chúng tôi.</div>
                </div>
            </Container>
            </div>
        )
    }
}
