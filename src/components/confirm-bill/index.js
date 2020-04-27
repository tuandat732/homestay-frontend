import React, { Component } from 'react'
import { Container } from 'reactstrap'
import "./confirmBill.css"
import {withRouter} from "react-router-dom"
import { PayPalButton } from "react-paypal-button-v2";

// import { MapMarkerAlt } from 'react-icons/fa';
class ConfirmBill extends Component {
    state = {
        start: "00/00/0000",
        end: "00/00/0000",
        day_start: "",
        day_end: "",
        name: "",
        phone: "",
        email: "",
        width: 1400,
        height: 1400,
        resize: true,
        moreDetail: false,
        always: true,
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        sessionStorage.setItem("idGuest",this.props.authed.id)
        let st = new Date(sessionStorage.getItem("start_date"))
        let ed = new Date(sessionStorage.getItem("end_date"))
        let start = st.getDate() + "/" + (st.getMonth() + 1) + "/" + st.getFullYear()
        let end = ed.getDate() + "/" + (ed.getMonth() + 1) + "/" + ed.getFullYear()
        let day_start = st.getDay()
        let day_end = ed.getDay()
        this.setState({
            start: start,
            end: end,
            day_end: day_end,
            day_start: day_start,
        })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    componentDidUpdate() {
        this.updateSize()
    }

    updateSize = () => {
        if (this.state.resize && this.state.width <= 1000) {
            this.setState({
                resize: false
            })
        } else if (!this.state.resize && this.state.width > 1000) {
            this.setState({
                resize: true
            })
        }
    }
 
    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    checkLogin = () => {
        // TODO lấy token gọi api về backEnd lấy username , phone và email 
    }
    changeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    changeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    changePhone = (e) => {
        this.setState({
            phone: e.target.value
        })
    }
    moreDetail = () => {
        this.setState({
            moreDetail: !this.state.moreDetail
        })
    }

    // submit = (e)=> {
    //     e.preventDefault()
    //     console.log("A")
    // }
    onSuccess = () => {
        
        this.props.history.push("/done-success")
    }

    render() {
        const moreDetail = this.state.moreDetail ? <div className="more-detail-active">
            <div className="check-out-info" >
                <div className="check-out-detail" >
                    <div className='title-check-out'>Chi tiết đặt phòng</div>
                    <div className="check-out-bill">
                        <div className="check-out-bill-header">
                            <div>
                                <h4>{sessionStorage.getItem("room_name")}</h4>
                                <div>
                                    {/* <MapMarkerAlt/> */}
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span> Quận 1 , Hồ Chí Minh</span>
                                </div>
                            </div>
                            <div>
                                <img style={{ width: "100%" }} src="http://cdn.hoahoctro.vn/uploads/2018/10/5bc41f947aa93-1.jpg" />
                            </div>
                        </div>
                        <div className="check-out-bill-bodies">
                            <div className="check-out-bill-body">
                                <div><b>{sessionStorage.getItem("night")} đêm </b><div style={{ margin: "0 12px" }}>-</div><span>{this.state.start} - {this.state.end}</span></div>

                            </div>
                            <div className="check-out-bill-body">
                                <div><b>{sessionStorage.getItem("people")} người</b></div>

                            </div>
                        </div>
                        <div className="check-out-bill-footer">
                            <div>
                                <div><span>Giá cho thuê {sessionStorage.getItem("night")} đêm</span></div>
                                <div><span>{sessionStorage.getItem("price")} đ</span></div>
                            </div>
                            <div>
                                <div><span>Phụ phí</span></div>
                                <div><span>{sessionStorage.getItem("extra_price")} đ</span></div>
                            </div>
                            <div>
                                <div><span>Tổng tiền</span></div>
                                <div><span>{sessionStorage.getItem("total_price")} đ</span></div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <div onClick={this.moreDetail} style={{ display: "flex", justifyContent: "center", margin: "12px 0" }} ><i class="fas fa-caret-down"></i></div>
        </div> : <div className="more-detail-deactive"></div>
        const Button = this.state.resize ? <PayPalButton
            amount={sessionStorage.getItem("total_price")}
            onSuccess={(details, data) => {
                // console.log(details)
                // console.log(data)
                this.onSuccess()

                // OPTIONAL: Call your server to save the transaction
                return fetch("/paypal-transaction-complete", {
                    method: "post",
                    body: JSON.stringify({
                        orderId: data.orderID
                    })
                }).then((res) => {
                    console.log(res)
                });
            }}

        // options={{
        // //   clientId: "PRODUCTION_CLIENT_ID"
        // }}
        /> : null
        const ShortInfo = !this.state.resize ?
            <form onSubmit={this.submit}>
                <div className="short-layer" style={{ zIndex: 2 }}>
                    <Container>
                        <div>
                            {moreDetail}
                        </div>
                        <div className="short-check-out-info">
                            <div>
                                <span>{sessionStorage.getItem("total_price")} đ</span>
                                <span onClick={this.moreDetail} style={{ color: "rgb(255, 72, 0)" }}>Chi tiết chỗ ở</span>
                            </div>
                            <div >
                                <PayPalButton
                                    amount={sessionStorage.getItem("total_price")}
                                    onSuccess={(details, data) => {
                                        // console.log(details)
                                        // console.log(data)
                                        this.onSuccess()

                                        // OPTIONAL: Call your server to save the transaction
                                        return fetch("/paypal-transaction-complete", {
                                            method: "post",
                                            body: JSON.stringify({
                                                orderId: data.orderID
                                            })
                                        }).then((res) => {
                                            console.log(res)
                                        });
                                    }}

                                // options={{
                                // //   clientId: "PRODUCTION_CLIENT_ID"
                                // }}
                                />
                            </div>
                        </div>
                    </Container>
                </div></form> : null
        const Resize = this.state.resize ?
            <>
                <div style={{ width: "15%" }}></div>
                <div className="check-out-info" style={{ width: "35%" }}>
                    <div className="check-out-detail">
                        <div className='title-check-out'>Chi tiết đặt phòng</div>
                        <div className="check-out-bill">
                            <div className="check-out-bill-header">
                                <div>
                                    <h4> {sessionStorage.getItem("room_name")}</h4>
                                    <div>
                                        {/* <MapMarkerAlt/> */}
                                        <i class="fas fa-map-marker-alt"></i>
                                        <span> Quận 1 , Hồ Chí Minh</span>
                                    </div>
                                </div>
                                <div>
                                    <img style={{ width: "100%" }} src="http://cdn.hoahoctro.vn/uploads/2018/10/5bc41f947aa93-1.jpg" />
                                </div>
                            </div>
                            <div className="check-out-bill-bodies">
                                <div className="check-out-bill-body">
                                    <div><b>{sessionStorage.getItem("night")} đêm </b><div style={{ margin: "0 12px" }}>-</div><span>{this.state.start}- {this.state.end}</span></div>

                                </div>
                                <div className="check-out-bill-body">
                                    <div><b>{sessionStorage.getItem("people")} người</b></div>

                                </div>
                            </div>
                            <div className="check-out-bill-footer">
                                <div>
                                    <div><span>Giá cho thuê {sessionStorage.getItem("night")} đêm</span></div>
                                    <div><span>{sessionStorage.getItem("price")} đ</span></div>
                                </div>
                                <div>
                                    <div><span>Phụ phí</span></div>
                                    <div><span>{sessionStorage.getItem("extra_price")} đ</span></div>
                                </div>
                                <div>
                                    <div><span>Tổng tiền</span></div>
                                    <div><span>{sessionStorage.getItem("total_price")} đ</span></div>
                                </div>

                            </div>
                            <span style={{ fontSize: "12px", fontWeight: 700 }}>Xuống dưới để thanh toán</span>
                        </div>

                    </div>
                </div>
            </>
            : null


        return (

            <div className="check-out-layer">

                <Container>
                    <form onSubmit={this.submit}>
                        <div className="check-out-form">
                            <div className="check-out-info">
                                <div>
                                    <div className="title-check-out">Thông tin đặt chỗ</div>
                                    <div className="number-guests">
                                        <span><span style={{ color: "#f65e39" }}>* </span>Số khách</span>
                                        <div className="number">
                                            <span>{sessionStorage.getItem("people")} khách</span>
                                        </div>
                                    </div>
                                    <div className="check-out-day">
                                        <div><span>{sessionStorage.getItem("night")} đêm tại  {sessionStorage.getItem("room_name")}</span></div>
                                        <div className="day-in-day-out">
                                            <div>
                                                <div className="day">
                                                    <div className="hr-day" style={{ backgroundColor: "#28ca6e" }}></div>
                                                    <span style={{ fontWeight: '200' }}>Nhận phòng</span>
                                                    <span style={{ fontSize: "16px", fontWeight: "500" }}>{this.state.start}</span>
                                                    <span style={{ fontWeight: "200", fontSize: "12px" }}>{this.state.day_start == 0 ? <>Chủ nhật</> : <>Thứ {this.state.day_start + 1}</>}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="day">
                                                    <div className="hr-day" style={{ backgroundColor: "#fbdb91" }}></div>
                                                    <span style={{ fontWeight: '200' }}>Trả phòng</span>
                                                    <span style={{ fontSize: "16px", fontWeight: "500" }}>{this.state.end}</span>
                                                    <span style={{ fontWeight: "200", fontSize: "12px" }}>{this.state.day_end == 0 ? <>Chủ nhật</> : <>Thứ {this.state.day_end + 1}</>}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='check-out-note'>
                                        <div className="check-out-title-note">Lưu ý đặc biệt</div>
                                        <div>
                                            {sessionStorage.getItem("special_note")}
                                        </div>
                                    </div>
                                </div>

                                <div className="check-out-guest-info">
                                    <div className="title-check-out"><span>Thông tin của bạn</span></div>
                                    <div className="check-out-input-group">
                                        <span><span style={{ color: "#f65e39" }}>* </span>Tên khách hàng</span>
                                        <span>Họ và tên</span>
                                        <div><input type='text' value={this.state.name} onChange={this.changeName} /></div>
                                    </div>

                                    <div className="check-out-input-group">
                                        <span><span style={{ color: "#f65e39" }}>* </span>Số điện thoại</span>
                                        <span></span>
                                        <div><input type='text' value={this.state.phone} onChange={this.changePhone} /></div>
                                    </div>
                                    <div className="check-out-input-group">
                                        <span><span style={{ color: "#f65e39" }}>* </span>Email</span>
                                        <span>VD : email@example.com</span>
                                        <div><input type='text' value={this.state.email} onChange={this.changeEmail} /></div>
                                    </div>
                                </div>

                                {Button}
                            </div>
                            {Resize}

                        </div>
                    </form>
                </Container>
                {ShortInfo}
            </div>

        )
    }
}
export default withRouter(ConfirmBill)