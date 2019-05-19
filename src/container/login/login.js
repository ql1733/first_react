import React, { Component } from 'react';
import Logo from '../../component/logo/logo.js'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../reducer/user.redux.js'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
@connect(
    state=>state.user,
    {login}
)
class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            user:'',
            pwd:''
        }
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
    }
    login(){
        this.props.login(this.state)
      // 
    }
    register(){
        this.props.history.push('./register')
    }
    handleChange(type,val){
        this.setState({
            [type]:val
        })
    }
    render(){
        
        return (
            <div>
                 {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
             <Logo></Logo>   
             <h2>登录</h2>
             <WingBlank>
                 <List>
                 {this.props.msg?<p className="error-msg">{this.props.msg}</p>:''}
                     <InputItem
                     onChange={v=>this.handleChange('user',v)}
                     >用户</InputItem>
                     <WhiteSpace/>
                     <InputItem
                      onChange={v=>this.handleChange('pwd',v)}
                     >密码</InputItem>
                 </List>
                    <Button type="primary" onClick={this.login}>登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Login