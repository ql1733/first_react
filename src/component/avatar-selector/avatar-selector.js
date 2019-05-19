import React ,{Component} from 'react'

import {Grid,List} from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends Component{
    static propTypes = {
        selectAvatar:PropTypes.func
    }
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        let avatarList = ['icon1','icon2','icon3','icon4','icon5','icon6','icon7','icon8','icon9','icon10'].map(
            v=>({
                icon:require(`../../assets/img/${v}.jpg`),
                text:v
            })
        )

        let gridHeader = this.state.icon?
        (<div>
            <span>已选择头像</span>
            <img style ={{width:20}} src={this.state.icon} alt=''/>
        </div>)
        :<div>请选择头像</div>
        return (
            <div>
                <List renderHeader={()=>gridHeader}>
                <Grid data={avatarList}
                columnNum={5}
                onClick={v=>{
                    this.setState(v)
                    this.props.selectAvatar(v.text)
                }}/>
                </List>
            </div>
        )
    }
}

export default AvatarSelector
















