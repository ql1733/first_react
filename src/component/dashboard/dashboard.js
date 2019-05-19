import React,{Component} from 'react'

import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navLink/navLink';
import {Switch,Route} from 'react-router-dom'
import Boss from '../../component/boss/boss.js'
import Genius from '../../component/genius/genius.js';
import User from '../../component/user/user.js'
import Msg from '../../component/msg/msg.js'
import {getMsgList,receMsg} from '../../reducer/chat.redux.js'


@connect(
    state=>state,
    {getMsgList,receMsg}
)
class Dashboard extends Component{
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.receMsg()
        }
       
    }
    render(){
       // console.log(this.props)
        let {pathname} = this.props.location
        let user = this.props.user
        let navList = [
            {
                path:'/boss',
                text:'genius',
                icon:'icon1',
                title:'genius列表',
                component:Boss,
                hide:user.type==='genius'
            },
            {
                path:'/genius',
                text:'boss',
                icon:'icon2',
                title:'Boss列表',
                component:Genius,
                hide:user.type==='boss'
            },
            {
                path:'/msg',
                text:'消息',
                icon:'icon3',
                title:'消息列表',
                component:Msg
            },
            {
                path:'/me',
                text:'我',
                icon:'icon4',
                title:'个人中心',
                component:User
            },
        ]
        return (
            <div>
                
                <NavBar className='fixed-header' mode='dard'>
                    {navList.find(v=>v.path===pathname).title}
                </NavBar>
                <div style={{marginTop:45}}>
                    <Switch>
                        {
                            navList.map(v=>(
                                <Route key={v.path} path={v.path} component={v.component}></Route>
                            ))
                        }
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default Dashboard