import React,{Component} from 'react'
import {Card,WingBlank} from 'antd-mobile'
import {getUserList} from '../../reducer/chatuser.redux.js'
import UserInfo from '../../component/userinfo/userinfo.js'
import {connect} from 'react-redux'
@connect(
    state=>state.chatuser,
    {getUserList}
)
class Genius extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        this.props.getUserList('boss')
    }
    render(){
        return <UserInfo userList={this.props.userList}></UserInfo>
    }
}

export default Genius




































