import React, { Component } from 'react'
import{ withRouter,Route} from "react-router-dom"
import Homepage from '../Homepage'
import Search from '../Search'
import SearchNav from '../searchNav'
import axios from 'axios'
import { isThisSecond } from 'date-fns'
class Home extends Component {

  

    render() {
        // console.log(this.state.room)
        // const check = !this.state.check?<SearchNav/> :<SearchNav onSearch={this.searchingRoom}/>
        return (<>
                <Route path = {["/homepage","/search",]} render = {()=><SearchNav/>} />
                <Route path = "/search" render = {()=><Search /> }/>
                <Route path = "/homepage" component = {Homepage}/>
                
            </>
         
        )
    }
}
export default withRouter(Home);
