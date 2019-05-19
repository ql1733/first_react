import React,{Component} from 'react'
import { TabBar } from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
@withRouter
@connect(
    state=>state.chat
)
class NavLinkBar extends Component{
    constructor(props){
        super(props)
        this.state={}
       // this.onPress=this.onPress.bind(this)
    }
    onPress(v){
       
        this.props.history.push(v.path)
       
    }
    render(){
        const navList = this.props.data.filter(v=>!v.hide)
        const {pathname} = this.props.location
       // console.log(this.props)
        return (
            <TabBar>
                {
                    navList.map(v=>(
                        <TabBar.Item
                        badge={v.path==='/msg'?this.props.unread:0}
                        key={v.path}
                        title={v.text}
                        icon={{uri:require(`../../assets/img/${v.icon}.jpg`)}}
                        selectedIcon={{uri:require(`../../assets/img/${v.icon}.jpg`)}}
                        selected={pathname===v.path}
                        onPress={this.onPress.bind(this,v)}
                        >

                        </TabBar.Item>
                    ))
                }
            </TabBar>
        )
    }
}

export default NavLinkBar




























