import React,{Component} from 'react'
import axios from 'axios'
import {Card,WingBlank} from 'antd-mobile'
import {getUserList} from '../../reducer/chatuser.redux.js'
import {connect} from 'react-redux'
import UserInfo from '../../component/userinfo/userinfo.js'
@connect(
    state=>state.chatuser,
    {getUserList}
)
class Boss extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        console.log(this.props)
        this.props.getUserList('genius')
        // axios.get('/user/list?type=genius')
        // .then(res=>{
        //     if(res.data.code===0){
        //         this.setState({data:res.data.data})
        //     }
        // })
    }
    render(){
        return <UserInfo userList={this.props.userList}></UserInfo>
    }
}

export default Boss




































