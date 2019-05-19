import React,{Component} from 'react'
import {List,InputItem, NavBar,Icon,Grid} from 'antd-mobile'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import {getChatId} from '../../util.js'
import {getMsgList,sendMsg,receMsg,readMsg} from '../../reducer/chat.redux.js'
//const socket = io('ws://localhost:8089')
@connect(
    state=>state,
    {getMsgList,sendMsg,receMsg,readMsg}
)
class Chat extends Component {
    constructor(props){
        super(props)
        this.state={
            text:'',
            msg:[],
            showEmoji:false
        }
    }
    handlerSubmit(){
        // console.log(this.state.text)
        // socket.emit('sendmsg',{text:this.state.text})
        
        let from = this.props.user._id
        let to = this.props.match.params.user
        let msg = this.state.text
        this.props.sendMsg({from,to,msg})
         this.setState({text:""})

    }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.receMsg()
        }
       
        // socket.on('recemsg',(data)=>{
        //     console.log(data)
        //     this.setState({
        //         msg:[...this.state.msg,data.text]
        //     })
        // })
    }
    componentWillUnmount(){
        let userid = this.props.match.params.user
        this.props.readMsg(userid)
    }
    fixEmoji(){
        setTimeout(()=>{
            window.dispatchEvent(new Event('resize'))
        })
    }
    render(){
        let emoji ='😂 😀 😅 🤣 😋 🤭 🤫 🤔 🤐 😏 😎 😎 🤢 🤮 😵 🤧 😷 🔥 ❤️ 💖 😻 💘 💔 👍 😚 😊 🤔 🤩 😍 😘 😜 🙃 😇 🤑 😤 😡 😫 💀 😩 😭 😰 👌 ✌ ️🤞 🤙 ☝ ️👇 🙏 🤝 💪 👅 🙈 🍇 🍈 🍉 🍌 🍋 🍍 🍎 🍑 🍗 🍔 🍟 🍕 🥣 🍚 🍜'
                    .split(' ').filter(v=>v).map(v=>({text:v}))
        let user = this.props.match.params.user
        let users = this.props.chat.users
        if(!users[user]){
            return null
        }
        let chatid = getChatId(user,this.props.user._id)
        let chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid===chatid)
        return (
            <div id='chat-page'>
                <NavBar 
                mode='dark'
                icon={<Icon type="left" />}
                onLeftClick={()=>{
                    this.props.history.goBack()
                }}
                >
                    {users[user].name}
                </NavBar>
                    
                {chatmsgs.map(v=>{
                    let avatar = require(`../../assets/img/${users[v.from].avatar}.jpg`)
                    return v.from===user?(
                        <List key={v._id}>
                            <List.Item
                            thumb={avatar}
                            >
                                {v.content}
                            </List.Item>
                        </List>
                    ):(
                        <List key={v._id}>
                            <List.Item 
                            extra={<img src={avatar} alt=''/>}
                            className='chat-me'>
                                {v.content}
                            </List.Item>
                        </List>
                    )
                   
                })}
                <div className='stick-footer'>
                    <List>
                        <InputItem
                        placeholder='请输入'
                        value={this.state.text}
                        onChange={
                            v=>{
                                this.setState({text:v})
                            }
                        }
                        extra={
                            <div>

                          <span style={{marginRight:10}} 
                          onClick={()=>{
                              this.setState({
                                  showEmoji:!this.state.showEmoji
                              })
                              this.fixEmoji()
                          }}
                          >😊</span> 
                        <span onClick={()=>this.handlerSubmit()}>发送</span>
                        </div>
                        }
                       
                        >
                        
                        </InputItem>
                    </List>
                   {this.state.showEmoji?
                     <Grid 
                     data={emoji}
                     columnNum={8}
                     carouselMaxRow={3}
                     isCarousel={true}
                     onClick={
                         el=>{
                             this.setState({
                                 text:this.state.text+el.text
                             })
                         }
                     }
                     />
                    :null}
                   
                </div>
            </div>
        )
    }
}
export default Chat