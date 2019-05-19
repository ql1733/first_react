import React, { Component } from 'react';
import Logo from '../../component/logo/logo.js'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../reducer/user.redux.js'
import {List,InputItem,WingBlank,Radio,WhiteSpace,Button} from 'antd-mobile'
@connect(
state=>state.user,
{register}
)
class Register extends Component{
    
    constructor(props){
        super(props)
        this.state={
            user:'',
            pwd:'',
            repeatpwd:'',
            type:"genius"
        }
        this.handleRegister = this.handleRegister.bind(this)
    }
    handleRegister(){
        this.props.register(this.state)
       // this.props.history.push('/register')
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        const RadioItem = Radio.RadioItem
        return (
            <div>
               {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <Logo></Logo>
                <h2>注册</h2>
                <List>
                    {this.props.msg?<p className="error-msg">{this.props.msg}</p>:''}
                     <InputItem
                     onChange={v=>this.handleChange('user',v)}
                     >用户</InputItem>
                     <WhiteSpace/>
                     <InputItem
                      onChange={v=>this.handleChange('pwd',v)}
                     >密码</InputItem>
                     <WhiteSpace/>
                     <InputItem
                      onChange={v=>this.handleChange('repeatpwd',v)}
                     >确认密码</InputItem>
                     <RadioItem 
                     checked={this.state.type==='genius'}
                     onChange={()=>this.handleChange('type','genius')}>
                         牛人
                     </RadioItem>
                     <RadioItem 
                     checked={this.state.type==='boss'}
                     onChange={()=>this.handleChange('type','boss')}
                     >
                         Boss
                     </RadioItem>
                 </List>
                <WingBlank>
                   
                    <WhiteSpace/>
                    <Button onClick={this.handleRegister} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Register