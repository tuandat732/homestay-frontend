
import axios from "axios"
import React, { Component } from 'react'
import Comment from '../comment/index'
import TongQuan from "../RoomInfo/Tongquan/index"
import DanhGia from "../RoomInfo/danhGia/index"
import GiaPhong from "../RoomInfo/giaPhong/index"
import Rules from "../RoomInfo/rules/index"
import TienNghi from "../RoomInfo/tienNghi/index"
import { Container } from "reactstrap"
import "./index.css"
import BlockPrice from "../RoomInfo/blockPrice/index"
import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Slider from "react-slick";

export default class RoomInfo extends Component {
    static defaultProps = {
        numberOfMonths: 2,

    };
    state = {
        disabled_day: [],
        selectedRange: [],
        from: undefined,
        to: undefined,
        time: [
            {
                from: `Wed Oct 09 2019 12:00:00 GMT+0700 (Indochina Time)`,
                to: "Fri Oct 11 2019 12:00:00 GMT+0700 (Indochina Time)",
            },
            {
                from: `Sun Oct 13 2019 12:00:00 GMT+0700 (Indochina Time)`,
                to: "Thu Oct 17 2019 12:00:00 GMT+0700 (Indochina Time)",
            },
            {
                from: `Wed Oct 23 2019 12:00:00 GMT+0700 (Indochina Time)`,
                to: "Mon Oct 28 2019 12:00:00 GMT+0700 (Indochina Time)",
            },
        ],

        resize: true,
        room: {
            idHost: "truyền sau",
            name: "Thái Room",
            key: "",
            imageURL: [],
            city: "Hà Nội",
            district: "Ba Đình",
            country: "Việt Nam",
            detail: "",
            typeHouse: "Biệt Thự",
            typeRoom: 'Nguyên Căn',
            typeBed: "Futon",
            maxPeople: 10,
            standardPeople: 7,
            size: 0,
            livingRooms: 0,
            bedRooms: 0,
            bathRooms: 0,
            bedNumber: 0,
            detailinfo: "ưhfduysagfuasdbfsfbfsadgyfagfjknf,s.dfkbfhso;d",

            checkIn: "12 pm",
            checkOut: "4 am",
            specialNote: "Lưu ý đặc biệt",
            policyCancelRoom: "Trung bình: Miễn phí hủy phòng trong vòng 48h sau khi đặt phòng thành công và trước 5 ngày so với thời gian check-in. Sau đó, hủy phòng trước 5 ngày so với thời gian check-in, được hoàn lại 100% tổng số tiền đã trả (trừ phí dịch vụ).",

            price: 12000,
            extraPrice: 1000,
            minNight: 1,
            roomPriceNote: "Giá có thể tăng vào cuối tuần hoặc ngày lễ",

            present: "",
            guide: "",

            block: [
                {
                    night: 1,
                    price: 2,
                    startDate: "31/10",
                    endDate: "1/11",
                }
            ],

            ultilities: [
                [
                    { id: 1, value: "Phù hợp với trẻ em", name: "Dành cho gia đình", isChecked: false },
                    { id: 2, value: "Đệm bổ sung", name: "Dành cho gia đình", isChecked: false },
                ],

                [
                    { id: 4, value: "Bếp điện", name: "Tiện ích bếp", isChecked: false },
                    { id: 6, value: "Tủ lạnh", name: "Tiện ích bếp", isChecked: false },
                    { id: 7, value: "Bếp ga", name: "Tiện ích bếp", isChecked: false },
                ],
                [
                    { id: 8, value: "Cho thú cưng", name: "Hoạt động giải trí", isChecked: false },
                    { id: 9, value: "BBQ", name: "Hoạt động giải trí", isChecked: false },
                    { id: 10, value: "Cảnh quan đẹp", name: "Hoạt động giải trí", isChecked: false },
                ],
                [
                    { id: 16, value: "Ban công", name: "Tiện ích phòng", isChecked: false },
                ],
                [
                    { id: 19, value: "Wifi", name: "Tiện ích", isChecked: false },
                    { id: 30, value: "Thang máy", name: "Tiện ích", isChecked: false },
                    { id: 31, value: "Máy sấy", name: "Tiện ích", isChecked: false },
                    { id: 32, value: "Internet", name: "Tiện ích", isChecked: false },
                ],
                [
                    { id: 33, value: "Máy chiếu phim", name: "Tiện ích nổi bật", isChecked: false },
                    { id: 35, value: "Smart TV", name: "Tiện ích nổi bật", isChecked: false },
                ],
            ]
        },
        idRoom: null,
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.getDetailRoom()
        let disabled_day = [];
        let selectedRange = [];
        let now = {
            before : new Date()
        }
        for (let i = 0; i < this.state.time.length; i++) {

            let from = new Date(this.state.time[i].from)
            let to = new Date(this.state.time[i].to)
            let disable = {
                from: from,
                to: to,
            }

            disabled_day.push(disable)
            const range = DateUtils.addDayToRange(from, disable);
            const range2 = DateUtils.addDayToRange(to, range);
            selectedRange.push(range2)
        }
        // console.log("a")
        // console.log(disabled_day)
        disabled_day.push(now)
        this.setState({
            disabled_day: disabled_day,
            selectedRange: selectedRange,
        })
      

    }

    handleDayClick =(day)=> {
        console.log(day)
        console.log(this.state)
        const range = DateUtils.addDayToRange(day, this.state);
        let count = 0;

        for (let i = 0; i < this.state.selectedRange.length; i++) {
            if (DateUtils.isDayInRange(day, this.state.selectedRange[i]) === true) {
                count = 1;
            }
            if (DateUtils.isDayInRange(this.state.selectedRange[i].from, range) === true) {
                count = 2;
            }
        }
        console.log(range)
        if (count === 0) {
            this.setState(range)

        }
        if (count == 2) {
            this.setState({
                from: undefined,
                to: undefined,
            })
        }
        // this.haveChoosenDays()
    }

    handleResetClick = () => {
        this.setState({
            from: undefined,
            to: undefined,
        })
        // this.haveChoosenDays()
    }


    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    componentDidUpdate() {
        this.updateSize()
    }

    updateSize = () => {
        if (this.state.resize && this.state.width <= 1024) {
            this.setState({
                resize: false
            })
        } else if (!this.state.resize && this.state.width > 1024) {
            this.setState({
                resize: true
            })
        }
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }



    getUrl = () => {
        const url = window.location.href
        console.log(url)
        console.log(url.split("/")[url.split("/").length - 1])
        return url.split("/")[url.split("/").length - 1]
    }

    getDetailRoom = async () => {
        const res = await axios.get(`http://localhost:5000/room/${this.getUrl()}`)
        // const time = await axios.get(`http://localhost:5000/book/${this.getURL()}`)
        this.setState({
            room: res.data,
            //  time :time.data,
        })
      
        // console.log(res.data)

    }
    // haveChoosenDays = (choosenDays) => {
    //     this.setState({
    //         from: choosenDays.from,
    //         to: choosenDays.to,
    //     })
    //     console.log(this.state.from, this.state.to)
    // }





    render() {
        console.log(this.state)
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
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
        }
        const reSize = this.state.resize ? <><div style={{ width: '15%' }}></div>
            <div className="room-detail-block-price"><BlockPrice authed = {this.props.authed} range = {{
                from : this.state.from,
                to : this.state.to,
                start : String(this.state.from),
                end : String(this.state.to)
            }} room={this.state.room}></BlockPrice>
            </div></>
            : null
        return (
            <div>
                <div className="slide-show-img">
                    <Slider {...settings}>
                        {this.state.room.imageURL.map((url) => <img src={url} />)}
                    </Slider>
                </div>
                <Container>
                    <div className="room-detail-info">

                        <div className="room-detail-all-room-info" >
                            <TongQuan room={this.state.room} />
                            <TienNghi room={this.state.room} />
                            <GiaPhong room={this.state.room} />
                            <DanhGia />
                            <Rules room={this.state.room} />


                        {/* Đây là lịch */}
                        <div id = "calendar-box">
                            <div className="RangeExample">
                                <p>
                                    {!from && !to && 'Chọn ngày bắt đầu.'}
                                    {from && !to && 'Chọn ngày kết thúc.'}
                                    {from &&
                                        to &&
                                        `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
                                    {from && to && (
                                        <button className="link" onClick={this.handleResetClick}>
                                            Reset
            </button>
                                    )}
                                </p>
                                <DayPicker
                                    className="Selectable"
                                    numberOfMonths={this.props.numberOfMonths}
                                    selectedDays={[from, { from, to }]}
                                    modifiers={modifiers}
                                    onDayClick={this.handleDayClick}
                                    disabledDays={this.state.disabled_day}

                                />
                                <Helmet>
                                    <style>{`
  .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .Selectable .DayPicker-Day {
    border-radius: 0 !important;
  }
  .Selectable .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .Selectable .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  ..DayPicker-Day--disabled{
      background-color: red !important;
  }
`}</style>
                                </Helmet>
                            </div>
                    </div>
                            
                            <Comment authed={this.props.authed} idRoom={this.getUrl()} idUser="5d9d957aa2cba007747c437b" />

                        </div >
                        {reSize}
                    </div>


                </Container>
            </div>
        )
    }
}
