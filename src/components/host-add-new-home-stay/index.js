import React, { Component } from 'react'
import { Container } from "reactstrap"
import SelectOption from "../select-option"
import UploadImage from '../host-image-upload'
import CheckBox from '../check-box';
import "./newRoom.css"
import Axios from 'axios';
import Loading from '../Loading/index'
export default class AddNewHomeStay extends Component {
    state = {
        checkres:false,
        idHost: this.props.authed.id,
        // TODO : truyền idHost
        name: "",
        key: 0,

        city: "",
        district: "",
        detail: "",

        price: 0,
        extraPrice: 0,
        image: [],
        imageURL: [],
        present: "",
        specialNote: "",
        guide: "",
        policy: '',
        maxPeople: 0,
        standardPeople: 0,
        size: 0,
        bedRooms: 0,
        bathRooms: 0,
        bedNumber: 0,
        typeHouse: "Biệt Thự",
        typeRoom: 'Nguyên Căn',
        typeBed: "Futon",

        ultilities: [
            [
                { id: 1, value: "Phù hợp với trẻ em", name: "Dành cho gia đình", isChecked: false },
                { id: 2, value: "Đệm bổ sung", name: "Dành cho gia đình", isChecked: false },
                { id: 3, value: "Không hút thuốc", name: "Dành cho gia đình", isChecked: false },
            ],

            [
                { id: 4, value: "Bếp điện", name: "Tiện ích bếp", isChecked: false },
                { id: 5, value: "Lò vi sóng", name: "Tiện ích bếp", isChecked: false },
                { id: 6, value: "Tủ lạnh", name: "Tiện ích bếp", isChecked: false },
                { id: 7, value: "Bếp ga", name: "Tiện ích bếp", isChecked: false },
            ],
            [
                { id: 8, value: "Cho thú cưng", name: "Hoạt động giải trí", isChecked: false },
                { id: 9, value: "BBQ", name: "Hoạt động giải trí", isChecked: false },
                { id: 10, value: "Cảnh quan đẹp", name: "Hoạt động giải trí", isChecked: false },
                { id: 11, value: "Hướng biển", name: "Hoạt động giải trí", isChecked: false },
                { id: 12, value: "Gần sân golf", name: "Hoạt động giải trí", isChecked: false },
                { id: 13, value: "Câu cá", name: "Hoạt động giải trí", isChecked: false },
                { id: 14, value: "Bể bơi chung", name: "Hoạt động giải trí", isChecked: false },
                { id: 15, value: "Bể bơi cá nhân", name: "Hoạt động giải trí", isChecked: false },
            ],
            [
                { id: 16, value: "Ban công", name: "Tiện ích phòng", isChecked: false },
                { id: 17, value: "Cửa sổ", name: "Tiện ích phòng", isChecked: false },
                { id: 18, value: "Nhà bếp", name: "Tiện ích phòng", isChecked: false },
            ],
            [
                { id: 19, value: "Wifi", name: "Tiện ích", isChecked: false },
                { id: 20, value: "TV", name: "Tiện ích", isChecked: false },
                { id: 21, value: "Điều hòa", name: "Tiện ích", isChecked: false },
                { id: 22, value: "Máy giặt", name: "Tiện ích", isChecked: false },
                { id: 23, value: "Dầu gội, dầu xả", name: "Tiện ích", isChecked: false },
                { id: 24, value: "Giấy vệ sinh", name: "Tiện ích", isChecked: false },
                { id: 25, value: "Giấy ăn", name: "Tiện ích", isChecked: false },
                { id: 26, value: "Nước khoáng", name: "Tiện ích", isChecked: false },
                { id: 27, value: "Khăn tắm", name: "Tiện ích", isChecked: false },
                { id: 28, value: "Kem đánh răng", name: "Tiện ích", isChecked: false },
                { id: 29, value: "Xà phòng tắm", name: "Tiện ích", isChecked: false },
                { id: 30, value: "Thang máy", name: "Tiện ích", isChecked: false },
                { id: 31, value: "Máy sấy", name: "Tiện ích", isChecked: false },
                { id: 32, value: "Internet", name: "Tiện ích", isChecked: false },
            ],
            [
                { id: 33, value: "Máy chiếu phim", name: "Tiện ích nổi bật", isChecked: false },
                { id: 34, value: "Ghế massage", name: "Tiện ích nổi bật", isChecked: false },
                { id: 35, value: "Smart TV", name: "Tiện ích nổi bật", isChecked: false },
                { id: 36, value: "Tủ đựng rượu", name: "Tiện ích nổi bật", isChecked: false },
            ],
        ]

    }
    changeName = (e) => { this.setState({ name: e.target.value }) }
    changeMaxPeople = (e) => { if (e.target.value > 0) this.setState({ maxPeople: (Number)(e.target.value) }) }
    changeStandardPeople = (e) => { if (e.target.value > 0 && e.target.value <= this.state.maxPeople) { this.setState({ standardPeople: (Number)(e.target.value) }) } }
    changeSize = (e) => { if (e.target.value > 0) { this.setState({ size: (Number)(e.target.value) }) } }
    changeBedRooms = (e) => { if (e.target.value > 0) { this.setState({ bedRooms: (Number)(e.target.value) }) } }
    changeBathRooms = (e) => { if (e.target.value > 0) { this.setState({ bathRooms: (Number)(e.target.value) }) } }
    changeBedNumber = (e) => { if (e.target.value > 0) { this.setState({ bedNumber: (Number)(e.target.value) }) } }
    changeTypeHouse = (e) => { this.setState({ typeHouse: e.target.value }) }
    changeTypeRoom = (e) => { this.setState({ typeRoom: e.target.value }) }
    changeBedType = (e) => { this.setState({ typeBed: e.target.value }) }
    changePrice = (e) => { if (e.target.value > 0) { this.setState({ price: Number(e.target.value) }) } }
    changeExtraPrice = (e) => { if (e.target.value > 0) this.setState({ extraPrice: (Number)(e.target.value) }) }
    changeCity = (e) => { this.setState({ city: e.target.value }) }
    changeDistrict = (e) => { this.setState({ district: e.target.value }) }
    changeDetail = (e) => { this.setState({ detail: e.target.value }) }
    changeSpecialNote = (e) => { this.setState({ specialNote: e.target.value }) }
    changePresent = (e) => { this.setState({ present: e.target.value }) }
    changeGuide = (e) => { this.setState({ guide: e.target.value }) }
    changePolicy = (e) => { this.setState({ policy: e.target.value }) }
    imageArrayOnChange = (e) => {
        this.setState({
            image: [...this.state.image, ...e.target.files]
        })
    }
    onDeleteImage = (image) => {
        this.setState({
            image: this.state.image.filter(ele => ele != image)
        })
    }

    handleCheckChieldElement = (event) => {

        let ultilities = this.state.ultilities
        ultilities.forEach(ultility => ultility.forEach(ultility => {
            {
                if (ultility.value === event.target.value)
                    ultility.isChecked = event.target.checked
            }
        }))
        this.setState({ ultilities: ultilities })
    }

    submit = async (e) => {
        console.log("click")
        e.preventDefault()
        this.setState({
            checkres:true
        })

        let array = []
        // alert("Succesful")
        // TODO : viết axios truyền state về back
        for (let i = 0; i < this.state.image.length; i++) {
            var form = new FormData();
            form.append("image", this.state.image[i])
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

            const resImg = await Axios(settings).then((res) => {
                array.push(res.data.data.link)
            })
            this.setState({
                imageURL: array
            })
            console.log(this.state.imageURL)
        }

        const res = await Axios.post(`http://localhost:5000/room`, {
            ...this.state
        })

        this.setState({
            checkres:false
        })
       
        if (res.status === 200) {
            alert("Đăng phòng thành công")
        } else {
            alert("Đăng phòng thất bại")
        }
    }



    render() {
        console.log(this.state)
        return (
            <div className = "up-new">
            <form onSubmit={this.submit}>
                <Container>
                    <div className="info-form">
                        <div className="title">Thông Tin Cơ Bản</div>
                        <div className="form">
                            <div className="input-info">
                                <label>Tên phòng</label>
                                <input required type="text" value={this.state.name} onChange={this.changeName} />

                            </div>
                            <div className="input-info">
                                <label>Loại Chỗ Ở </label>
                                <select onChange={this.changeTypeHouse} required="true">
                                    <SelectOption options={['Biệt Thự', 'Căn Hộ Studio', "Chung Cư", 'Nhà Riêng', 'Căn Hộ Dịch Vụ']} />
                                </select>
                            </div>
                            <div className="input-info">
                                <label>Loại Phòng</label>
                                <select onChange={this.changeTypeRoom} required="true">
                                    <SelectOption options={["Nguyên Căn", "Phòng Riêng"]} />
                                </select>
                            </div>
                            <div className="input-info">
                                <label>Số Khách Tối Đa</label>
                                <input required="true" type="number" value={this.state.maxPeople} onChange={this.changeMaxPeople} />
                            </div>
                            <div className="input-info">
                                <label>Số Khách Tiêu Chuẩn<span>(phải nhỏ hơn số khách tối đa)</span></label>

                                <input required="true" type="number" value={this.state.standardPeople} onChange={this.changeStandardPeople} />
                            </div>
                            <div className="input-info" >
                                <label>Diện Tích Chỗ Ở (m2) </label>
                                <input required="true" type="number" value={this.state.size} onChange={this.changeSize} />
                            </div>
                        </div>
                    </div>




                    <div className="info-form">
                        <div className="title">Phòng Và Giường</div>
                        <div className="form">
                            <div className="input-info" >
                                <label>Số Phòng Ngủ</label>
                                <input required="true" type="number" value={this.state.bedRooms} onChange={this.changeBedRooms} />
                            </div>
                            <div className="input-info" >
                                <label>Số Phòng Tắm</label>
                                <input required="true" type="number" value={this.state.bathRooms} onChange={this.changeBathRooms} />
                            </div>
                            <div className="input-info" >
                                <label>Số Giường</label>
                                <input required="true" type="number" value={this.state.bedNumber} onChange={this.changeBedNumber} />
                            </div>
                            <div className="input-info" >
                                <label>Loại Giường</label>
                                <select onChange={this.changeBedType} required="true">
                                    <SelectOption options={['Futon', 'Couch', 'Real Bed', 'Sofa Bed', 'King size', 'Queen Size', 'Twins Bed', 'Bunk bed']} />
                                </select>
                            </div>
                        </div>
                    </div>




                    <div className="info-form">
                        <div className="title" >Giá Và Chính Sách</div>
                        <div className="form">
                            <div className="input-info" >
                                <label>Giá Phòng / 1 Đêm </label>
                                <input required="true" type="number" value={this.state.price} onChange={this.changePrice} />
                            </div>
                            <div className="input-info" >
                                <label>Phí sử dụng nền tảng</label>
                                <input required="true" type="text" value="3%" />
                            </div>
                            <div className="input-info" >
                                <label>Phí Thêm Khách </label>
                                <input required="true" type="number" value={this.state.extraPrice} onChange={this.changeExtraPrice} />
                            </div>
                        </div>
                    </div>

                    <div className="info-form">
                        <label class="upload-img" for="upload-img">Chọn Ảnh</label>
                        <small>Chọn nhiều hơn 5 ảnh</small>
                        <input id="upload-img" type="file" name="file" accept=".jpg" multiple onChange={this.imageArrayOnChange} />
                        <div style={{ width: "100%", minHeight: 200, borderRadius: "10px", border: "1px solid gray" }}>
                            <div className="images" style={{ display: 'flex', flexWrap: 'wrap', overflow: "visible" }}>
                                {this.state.image && this.state.image.map((image) => <UploadImage delete={this.onDeleteImage} imageURL={image} ></UploadImage>)}
                            </div>
                        </div>

                    </div>


                    <div className="info-form">
                        <div className="title">Địa Chỉ</div>
                        <div className="form">
                            <div className="input-info" >
                                <label>Thành Phố / Tỉnh</label>
                                <input required="true" type="text" value={this.state.city} onChange={this.changeCity} />
                            </div>
                            <div className="input-info" >
                                <label>Quận / Huyện</label>
                                <input required="true" type="text" value={this.state.district} onChange={this.changeDistrict} />
                            </div>
                            <div className="input-info" >
                                <label>Địa Chỉ Cụ Thể</label>
                                <input required="true" type="text" value={this.state.detail} onChange={this.changeDetail} />
                            </div>
                        </div>
                    </div>


                    <div className="info-form">
                        <div className="title">Tiện Ích</div>
                        <div className="ultilities-box">
                            <div className="ultilities-type">Dành cho gia đình</div>
                            <div className="ultilities">
                                {
                                    this.state.ultilities[0].map((ultility) => {
                                        return (<CheckBox handleCheckChieldElement={this.handleCheckChieldElement}  {...ultility} />)
                                    })
                                }
                            </div>
                        </div>

                        <div className="ultilities-box">
                            <div className="ultilities-type" >Tiện ích bếp</div>
                            <div className="ultilities">
                                {
                                    this.state.ultilities[1].map((ultility) => {
                                        return (<CheckBox handleCheckChieldElement={this.handleCheckChieldElement}  {...ultility} />)
                                    })
                                }
                            </div>
                        </div>

                        <div className="ultilities-box">
                            <div className="ultilities-type" >Hoạt động giải trí</div>
                            <div className="ultilities">
                                {
                                    this.state.ultilities[2].map((ultility) => {
                                        return (<CheckBox handleCheckChieldElement={this.handleCheckChieldElement}  {...ultility} />)
                                    })
                                }
                            </div>
                        </div>

                        <div className="ultilities-box">
                            <div className="ultilities-type">Tiện ích phòng</div>
                            <div className="ultilities">
                                {
                                    this.state.ultilities[3].map((ultility) => {
                                        return (<CheckBox handleCheckChieldElement={this.handleCheckChieldElement}  {...ultility} />)
                                    })
                                }
                            </div>
                        </div>

                        <div className="ultilities-box">
                            <div className="ultilities-type">Tiện ích</div>
                            <div className="ultilities">
                                {
                                    this.state.ultilities[4].map((ultility) => {
                                        return (<CheckBox handleCheckChieldElement={this.handleCheckChieldElement}  {...ultility} />)
                                    })
                                }
                            </div>
                        </div>

                        <div className="ultilities-box">
                            <div className="ultilities-type">Tiện ích nổi bật</div>
                            <div className="ultilities">
                                {
                                    this.state.ultilities[5].map((ultility) => {
                                        return (<CheckBox handleCheckChieldElement={this.handleCheckChieldElement}  {...ultility} />)
                                    })
                                }
                            </div>
                        </div>
                    </div>



                    <div className="info-form">
                        <div className="title">Chi Tiết</div>
                        <div className="text-area" >
                            <label>Miêu Tả Chi Tiết</label>
                            <textarea placeholder="Ví dụ : Tiện ích phòng gồm những gì, khung cảnh xung quanh, cửa hàng tiện ích gần đó" required="true" type="text" value={this.state.present} onChange={this.changePresent} />
                        </div>
                        <div className="text-area" >
                            <label>Chính sách</label>
                            <textarea placeholder="Chính sách về chỗ ở và đặt phòng" required="true" type="text" value={this.state.policy} onChange={this.changePolicy} />
                        </div>
                        <div className="text-area" >
                            <label>Lưu Ý Đặc Biệt</label>
                            <textarea placeholder="Những lưu ý đặc biệt về chỗ ở" required="true" type="text" value={this.state.specialNote} onChange={this.changeSpecialNote} />
                        </div>
                        <div className="text-area" >
                            <label>Hướng Dẫn Đặt Phòng</label>
                            <textarea placeholder="Nội dung" required="true" type="text" value={this.state.guide} onChange={this.changeGuide} />
                        </div>
                    </div>


                    <div id="post-room">
                        {this.state.checkres?<Loading style={{position:"fixed",top:'200px',left:"50%"}}/>:<input id="post-room-btn" type='submit' />}
                    </div>
                    {/* <button onClick = {this.submit}>Submit</button> */}
                </Container>
            </form>
            </div>
        )
    }
}
