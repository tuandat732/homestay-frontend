import React, { Component } from 'react'
import "./signUp.css"
import { Container } from "reactstrap"
import Footer from "../footer/index"
import { Link,withRouter } from "react-router-dom"
import axios from 'axios'
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            phone: '',
            last_name: "",
            first_name: "",
            password: "",
            confirm_password: "",
            check_email: true,
            check_phone: true,
            check_last_name: true,
            check_first_name: true,
            check_password: true,
            check_confirm_password: true,
            check_same_email: true,
            imageFile: null,
            avatar :"",
        }
    }


    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
        // const res = await axios.get(``)
        // if(res.status === 200){
        //     if(res.data != null){
        //         this.setState({
        //             check_same_email : false,
        //         })
        //     }else{
        //         this.setState({
        //             check_same_email :true,
        //         })
        //     }
        // }
    }
    onChangePhone = (e) => {
        this.setState({
            phone: e.target.value
        })

    }
    onChangeLastName = (e) => {
        this.setState({
            last_name: e.target.value
        })
    }
    onChangeFirstName = (e) => {
        this.setState({
            first_name: e.target.value
        })
    }
    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    onChangeConfirmPassword = (e) => {
        this.setState({
            confirm_password: e.target.value
        })
    }

    onOutPassword = () => {
        if (this.state.password.length >= 8) {
            this.setState({
                check_password: true,
            })
        } else {
            this.setState({
                check_password: false
            })
        }
    }
    onOutConfirmPassword = () => {
        if (this.state.password === this.state.confirm_password) {
            this.setState({
                check_confirm_password: true,
            })
        } else {
            this.setState({
                check_confirm_password: false
            })
        }
    }

    onOutEmail = (e) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
            this.setState({
                check_email: true
            })
        } else {
            this.setState({
                check_email: false,
            })
        }
    }
    onOutPhone = () => {
        if (this.state.phone.match(/^[0-9]+$/) != null && this.state.phone.length >= 10) {
            this.setState({
                check_phone: true,
            })
        } else {
            this.setState({
                check_phone: false,
            })
        }
    }
    onOutLastName = () => {
        if (this.state.last_name !== "") {
            this.setState({
                check_last_name: true,
            })
        } else {
            this.setState({
                check_last_name: false,
            })
        }
    }
    onOutFirstName = () => {
        if (this.state.first_name !== "") {
            this.setState({
                check_first_name: true,
            })
        } else {
            this.setState({
                check_first_name: false,
            })
        }
    }
    imageFileOnChange = (event) => {
        this.setState({
            imageFile: event.target.files[0]
        })
        console.log(event)
        console.log('a')
        console.log(this.state.imageFile)
    }
    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.check_email &&
            this.state.check_phone &&
            this.state.check_last_name &&
            this.state.check_first_name &&
            this.state.check_password &&
            this.state.check_confirm_password &&
            this.state.check_same_email &&
            this.state.imageFile !== null) {

                console.log(this.state.imageFile)

                let imageURL = "";
            // alert("Succesful")
            // TODO : viết axios truyền state về back
                var form = new FormData();
                form.append("image", this.state.imageFile)
                var settings = {
                    "url": `https://api.imgur.com/3/image`,
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Authorization": "Client-ID 546c25a59c58ad7 "
                    },
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    "contentType": false,
                    "data": form
                };
                const resImg = await axios(settings).then((res) => {
                    imageURL = res.data.data.link;
                   
                })
                this.setState({
                    avatar: imageURL
                })
               console.log(this.state.avatar)
               
            }
         
        
            const res = await axios.post(`http://localhost:5000/auth/register`, {
                email: this.state.email,
                pass: this.state.password,
                confirmPass: this.state.confirm_password,
                name: this.state.first_name + ' ' + this.state.last_name,
                phone: this.state.phone,
                imageURL: this.state.imageURL,
            })
            if (res.status === 200) {
                this.props.history.push("/sign-in")
            } else {
                alert("Đăng kí thất bại")
            }
        }

    


    render() {
        console.log(this.state)
        const checkInValidEmail = this.state.check_email ? null : <div style={{ color: "red" }}>Địa chỉ email không hợp lệ</div>
        const checkInValidPhone = this.state.check_phone ? null : <div style={{ color: "red" }}>Số điện thoại không hợp lệ</div>
        const checkInValidLastName = this.state.check_last_name ? null : <div style={{ color: "red" }}>Vui lòng nhập tên</div>
        const checkInValidFirstName = this.state.check_first_name ? null : <div style={{ color: "red" }}>Vui lòng nhập tên</div>
        const checkInValidPassword = this.state.check_password ? null : <div style={{ color: "red" }}>Mật khẩu phải ít nhất 8 kí tự</div>
        const checkInValidConfirmPassword = this.state.check_confirm_password ? null : <div style={{ color: "red" }}>Xác nhận mật khẩu không đúng</div>
        const checkInvalidSameEmail = this.state.check_same_email ? null : <div style={{ color: "red" }}>Email đã tồn tại</div>
        return (<>
            <div id="header">
                <img src="https://i-dulich.vnecdn.net/2019/09/25/2-2-1569406982_r_1200x0.jpg" style={{ width: "100%", height: "300px" }} />
            </div>

            <Container style={{ marginTop: "-100px" }}>
                <div id="body" >
                    <form onSubmit={this.onSubmit} id="sign-up-form">
                        <div id="form">
                            <div id="span">Đăng kí thành viên</div>
                            <div className="input-group">
                                <label for="input-email">Địa chỉ email</label>
                                <input id="input-email" value={this.state.email} onBlur={this.onOutEmail} onChange={this.onChangeEmail} />
                                <span style={{ height: "24px" }}>{checkInValidEmail}{checkInvalidSameEmail}</span>
                                {/* <span style = {{height:"24px"}}>{checkInvalidSameEmail}</span> */}
                            </div>
                            <div className="input-group">
                                <label for="input-phone">Số điện thoại</label>
                                <input id="input-phone" value={this.state.phone} onBlur={this.onOutPhone} onChange={this.onChangePhone} />
                                <span style={{ height: "24px" }}>{checkInValidPhone}</span>
                            </div>
                            <div className="input-group">
                                <label for="input-lastname">Tên</label>
                                <input id="input-lastname" value={this.state.last_name} onBlur={this.onOutLastName} onChange={this.onChangeLastName} />
                                <span style={{ height: "24px" }}>{checkInValidLastName}</span>
                            </div>
                            <div className="input-group">
                                <label for="input-firstname">Họ và tên đệm</label>
                                <input id="input-firstname" value={this.state.first_name} onBlur={this.onOutFirstName} onChange={this.onChangeFirstName} />
                                <span style={{ height: "24px" }}>{checkInValidFirstName}</span>
                            </div>
                            <div className="input-group">
                                <label for="input-password">Mật khẩu <span style={{ fontSize: "16px", color: "rgb(178, 178, 178 )" }}>(Yêu cầu hơn 8 kí tự,chữ cái đầu viết hoa và có chữ số)</span></label>
                                <input type="password" id="input-password" value={this.state.password} onBlur={this.onOutPassword} onChange={this.onChangePassword} />
                                <span style={{ height: "24px" }}>{checkInValidPassword}</span>
                            </div>
                            <div className="input-group">
                                <label for="input-confirm-password">Xác nhận mật khẩu</label>
                                <input type="password" id="input-confirm-password" value={this.state.confirm_password} onBlur={this.onOutConfirmPassword} onChange={this.onChangeConfirmPassword} />
                                <span style={{ height: "24px" }}>{checkInValidConfirmPassword}</span>
                            </div>
                            <div className="input-group">
                                <label for="avatar">Nhập ảnh</label>
                                <input id="avatar" type="file" name="file" accept=".jpg" onChange={this.imageFileOnChange} style={{ border: "none", paddingLeft: 0, borderRadius: 0 }} />
                                {this.state.imageFile && <img alt="" src={URL.createObjectURL(this.state.imageFile)} style={{ height: '40px', width: "40px" }}></img>}
                            </div>
                            <button>Đăng kí</button>

                            <div>
                                Đã có tài khoản ?<Link to="/sign-in">Đăng nhập ngay</Link>
                            </div>
                        </div>

                    </form>
                    <div></div>
                    <div id="benefit-review">
                        <div className="grid-item">
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

        </>

        )
    }
}
export default  withRouter(SignUp)