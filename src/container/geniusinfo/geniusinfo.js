import React,{Component} from 'react'
import {NavBar,InputItem,TextareaItem,WingBlank,Radio,WhiteSpace,Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector.js'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../reducer/user.redux.js'
@connect(
state=>state.user,
{update}
)
class GeniusInfo extends Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            company:'',
            money:'',
            desc:'',
            avatar:''
        }
        this.selectAvatar = this.selectAvatar.bind(this)
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    selectAvatar(e){
        this.setState({
            avatar:e
        })
    }
    render(){
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return(
            <div>
                {redirect&&redirect!==path?<Redirect to={this.props.redirectTo}/>:null}
                <NavBar mode="dark">genius信息完善</NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar}></AvatarSelector>
                <InputItem
                onChange={v=>this.handleChange('title',v)}
                >
                求职岗位
                </InputItem>
                <WhiteSpace />
                <WhiteSpace />
                <TextareaItem
                rows={3}
                autoHeight
                title='个人简介'
                onChange={v=>this.handleChange('desc',v)}
                >
                
                </TextareaItem>
                <WhiteSpace />
                <WingBlank>
                   
                    <WhiteSpace/>
                    <Button  type="primary" onClick={
                        ()=>this.props.update(this.state)
                    }>提交</Button>
                </WingBlank>
            </div>
        ) 
    }
}
export default GeniusInfo
























