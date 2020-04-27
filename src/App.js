import React, { Component } from 'react'
import { Route, BrowserRouter ,withRouter } from "react-router-dom"
import "./App.css"
import Footer from "./components/footer"
import NavBar from "./components//nav-bar"
import SignUp from "./components/sign-up"
import SignIn from "./components/sign-in"
import DashBoard from './components/host-dashboard'
import AddNewHomeStay from './components/host-add-new-home-stay'
import HostInfo from './components/host-info'
import HostMessage from './components/host-message'
import RoomManager from './components/host-updateRoom'
import Homepage from './components/Homepage'
import RoomInfo from './components/RoomInfo'
import axios from 'axios'
import DoneSuccess from "./components/doneSuccess"
import Search from './components/Search'
import SearchNav from './components/searchNav'
import Home from './components/Home'

import ConfirmBill from './components/confirm-bill'

class App extends Component {

  state = {
    id:null,
    email:null,
    name:null,
    avatar:null,
    type:null
  }

  

    async componentWillMount() {  // trc la did mount
    const tokenUser = localStorage.getItem("jwt_token_user");
    const tokenHost = localStorage.getItem("jwt_token_host");
    const email = localStorage.getItem("email")
    const name = localStorage.getItem("name")
    this.setState({
      email:email,
      name:name
    })
    if(tokenHost){
      const current = await this.getCurrentHost(tokenHost)
      this.setState((stage) => ({
        id: current.id,
        email: current.email,
        name:current.name,
        avatar:current.avatar,
        type: current.type
      }))
        axios.defaults.headers.common['Authorization'] = `Bearer ${current.token}`

    } else if(tokenUser) {
      const current = await this.getCurrentUser(tokenUser)
      this.setState((stage) => ({
        id: current.id,
        email: current.email,
        name:current.name,
        avatar:current.avatar,
        type: current.type
      }))
      axios.defaults.headers.common['Authorization'] = `Bearer ${current.token}`
    }
  }

  getCurrentHost = async (token) => {
    try {
      const res = await axios.get('http://localhost:5000/authHost/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data
    } catch (error) {
      throw error
    }
  }

  getCurrentUser = async (token) => {
    try {
      const res = await axios.get('http://localhost:5000/authUser/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data
    } catch (error) {
      throw error
    }
  }

  login= (data)=>{
    this.setState({
      id:data.id,
        email: data.email,
        type: data.type,
        avatar:data.avatar,
        name:data.name
    })
  }

  logout=(bool)=>{
    console.log("this is")
    if(bool){
      this.setState({
        id:null,
        email:null,
        name:null,
        avatar:null,
        type:null
      })
    }
  }
  

  render() {
    console.log(this.state)
    return (

      
        <>
         <BrowserRouter>
          <NavBar authed={this.state} {...this.props} logout={this.logout} />
         
          <Route path="/check-out" render={() => < ConfirmBill authed = {this.state} />} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/sign-in" render={()=><SignIn login={this.login} />} />
          <Route path="/host" component={HostInfo} />
          <Route path="/host/dash-board" render={()=><DashBoard authed = {this.state}/>}/>
          {/* //  : this.props.history.push('/sign-in')} 
            /> */}
          <Route path="/host/add-new-home-stay" render={()=><AddNewHomeStay authed={this.state}/>} />
          <Route path="/host/message" component={HostMessage} />
          <Route path="/host/room-manager" component={RoomManager} />
          <Route path="/" component={Home} />
          <Route path="/room/detail" render={() => <RoomInfo authed={this.state} />} />
          <Route path = "/search" component = {Search}/>
            <Route path = "done-success" component = {DoneSuccess}/>
          <div style={{ zIndex: 1 }} id='footer'>
            <Footer />
          </div>
          </BrowserRouter>
        </>

      
   
    )
  }
}
export default  App