import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Result,List, WhiteSpace, Button} from 'antd-mobile'
import './user.css'
import browserCookie from 'browser-cookies'
import {Redirect} from 'react-router-dom'
import {logoutSubmit} from '../../reducer/user.redux'
@connect(
    state=>state.user,
    {logoutSubmit}
)
class User extends Component{
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout(){
        browserCookie.erase('userid')
        this.props.logoutSubmit()
        window.location.href= window.location.href
    }
    render(){
        console.log(this.props)
        return this.props.user?(
          
            <div>
                  {/* { (this.props.redirectTo&&this.props.redirectTo!=='/login')?<Redirect to={this.props.redirectTo} />:null} */}
                <Result
                img={<img src={require(`../../assets/img/${this.props.avatar}.jpg`)} width={{width:50,height:50}} alt=''/>}
                title={this.props.user}
                message={this.props.type==='boss'?this.props.company:null}
                />
                <List renderHeader={()=>'简介'}>
                    <List.Item multipleLine>
                        {this.props.title}
                        {this.props.desc.split('\n').map(v=><List.Item.Brief key={v}>
                                {v}
                        </List.Item.Brief>)}
                        
                    </List.Item>
                </List>
                <WhiteSpace />
                  
                <Button type="primary" onClick={this.logout}>退出登录</Button>
               
            </div>
        ):null
    }
}

export default User