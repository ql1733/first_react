import React,{Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'
@connect(
    state=>state
)
class Msg extends Component{
    getLast(arr){
        return arr[arr.length-1]
    }
    render(){
        if(this.props.chat.chatmsg.length===0){
            return null
        }
        let userid = this.props.user._id
        let msgGroup = {}
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid]=msgGroup[v.chatid]||[]
            msgGroup[v.chatid].push(v)
        })
        let userInfo = this.props.chat.users
        console.log(msgGroup)
        let chatList = Object.values(msgGroup).sort((a,b)=>{
            let a_last = this.getLast(a).create_time
            let b_last = this.getLast(b).create_time
            return b_last-a_last
        })
        
        return (
           <div> 
               
                {
                    chatList.map(v=>{
                        let lastItem = this.getLast(v)
                        let targetId = v[0].from===userid?v[0].to:v[0].from
                       let unreadNum = v.filter(v=>!v.read&&v.to===userid).length
                        if(!userInfo[targetId]){
                            return null
                        }
                        return (
                            <List
                            key={lastItem._id}>
                            <List.Item
                             extra={<Badge text={unreadNum}></Badge>}
                             thumb={require(`../../assets/img/${userInfo[targetId].avatar}.jpg`)}
                             arrow="horizontal"
                             onClick={()=>{
                                 this.props.history.push(`/chat/${targetId}`)
                             }}
                            >
                                {lastItem.content}
                                <List.Item.Brief>
                                    {userInfo[targetId].name}
                                </List.Item.Brief>
                            </List.Item>
                            </List>
                        )
                    })
                }
              
           </div>
        )
    }
}

export default Msg