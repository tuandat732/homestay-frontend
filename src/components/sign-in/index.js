import React, { Component } from 'react'
import Footer from "../footer/index"
import axios from 'axios'
import { Container } from "reactstrap"
import { Link,withRouter } from "react-router-dom"
class SignInHost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            role: "guest",
            invalid: false,
        }
    }
    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    setRole = (e) => {
        console.log(e.target.value)
        this.setState({
            role: e.target.value
        })
    }


    onSubmit = async (e) => {
        e.preventDefault()
        if (this.state.role === "host") {
            try{
            const res = await axios.post(`http://localhost:5000/authHost/login`, {
                // TODO truyền email pass
                email: this.state.email,
                pass: this.state.password,
                type:"host"
            })
            if (res.status === 200) {
                // TODO chuyển trang lưu token
                localStorage.setItem("jwt_token_host", res.data.token)
                this.props.history.push(`/homepage`)
                console.log("loginHost")
                this.props.login({
                    id:res.data.id,
                    email:this.state.email,
                    name:res.data.name,
                    avatar:res.data.avatar,
                    type:'host'
                })
            }} catch(error) {
                this.setState({
                    invalid: true,
                })
            }
        } else if (this.state.role === "guest") {
            try{
            const res = await axios.post(`http://localhost:5000/authUser/login`, {
                // TODO truyền email pass
                email: this.state.email,
                pass: this.state.password,
                type:"user"
            })
            if (res.status === 200) {
                // TODO chuyển trang lưu token
                localStorage.setItem("jwt_token_user", res.data.token)
                this.props.history.push(`/homepage`)
                console.log("loginGuest")
                this.props.login({
                    id:res.data.id,
                    email:this.state.email,
                    name:res.data.name,
                    avatar:res.data.avatar,
                    type:'user'
                })

            }} catch(error)  {
                this.setState({
                    invalid: true,
                })
            }
        }
    }

    render() {
        const invalid = this.state.invalid ? <div style={{ color: "red" }}>Tài khoản hoặc mật khẩu không đúng</div> : <div></div>
        return (<>
            <div id="header">

                <img src="https://i-dulich.vnecdn.net/2019/09/25/2-2-1569406982_r_1200x0.jpg" style={{ width: "100%", height: "300px" }} />
            </div>
            <Container style={{ marginTop: "-100px" }}>
                <div id="body" >
                    <form id="sign-in-host-form" onSubmit={this.onSubmit}>
                        <div id="form">
                            <div id='span'>Đăng nhập </div>

                            <div className="input-group">
                                <div>Email</div>
                                <input value={this.state.email} onChange={this.onChangeEmail} />

                            </div>
                            <div className="input-group">
                                <div>Mật khẩu</div>
                                <input value={this.state.password} onChange={this.onChangePassword} type="password" />
                            </div>
                            <div>Đăng nhập với vai trò</div>
                            <div onChange={this.setRole} className="role">
                                <input name="role" type="radio" value="host" />
                                <label>Chủ nhà</label>
                            </div>
                            <div onChange={this.setRole} className="role">
                                <input name="role" type="radio" value="guest" />
                                <label>Khách</label>
                            </div>

                            <button>Đăng nhập</button>
                            <span style={{ height: "40px" }}>{invalid}</span>
                            <div>
                                Không có tài khoản ?<Link to="/sign-up">Đăng kí ngay</Link>
                            </div>
                            {/* <div>
                        Quên tài khoản ?<Link to ="/forgot-password">Tìm tài khoản</Link>
                    </div> */}
                        </div>
                    </form>
                    <div></div>
                    <div id="benefit-review" style={{ marginTop: "100px" }} >
                        <div className="grid-item" >
                            <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flexStart" }}>
                                <img src="./aaaa.jpg" style={{ width: "100px", height: "100px" }} />
                                <div>ĐM quân chó</div>
                                <div style={{ fontSize: "16px", fontWeight: "500" }}>Tiện ích thật là tiện ,bạn có thể làm gì bạn muốn gsfugseiufewuifhwdoscdfrdhetdjnwyrnerynte</div>
                            </div>
                        </div>
                        <div></div>
                        <div className="grid-item">
                            <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flexStart" }}>
                                <img src="./aaaa.jpg" style={{ width: "100px", height: "100px" }} />
                                <div>ĐM quân chó</div>
                                <div style={{ fontSize: "16px", fontWeight: "500" }}>Tiện ích thật là tiện ,bạn có thể làm gì bạn muốn gsfugseiufewuifhwdoscdfrdhetdjnwyrnerynte</div>                            </div>
                        </div>
                        <div className="grid-item">
                            <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flexStart" }}>
                                <img src="./aaaa.jpg" style={{ width: "100px", height: "100px" }} />
                                <div>ĐM quân chó</div>
                                <div style={{ fontSize: "16px", fontWeight: "500" }}>Tiện ích thật là tiện ,bạn có thể làm gì bạn muốn gsfugseiufewuifhwdoscdfrdhetdjnwyrnerynte</div>                            </div>
                        </div>
                        <div></div>
                        <div className="grid-item">
                            <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flexStart" }}>
                                <img src="./aaaa.jpg" style={{ width: "100px", height: "100px" }} />
                                <div>ĐM quân chó</div>
                                <div style={{ fontSize: "16px", fontWeight: "500" }}>Tiện ích thật là tiện ,bạn có thể làm gì bạn muốn gsfugseiufewuifhwdoscdfrdhetdjnwyrnerynte</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

        </>)
    }
}

export default withRouter(SignInHost)