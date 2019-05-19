import React,{Component} from 'react'
import {Card,WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
@withRouter
class UserInfo extends Component{
    handleClick(v){
        this.props.history.push(`/chat/${v._id}`)
    }
    render(){
        return (
            <WingBlank>
               {
                this.props.userList.map(v=>(
                   v.avatar?(<Card  
                   key={v._id}
                   onClick={()=>this.handleClick(v)}>
                        <Card.Header
                        title={v.user}
                        thumb={require(`../../assets/img/${v.avatar}.jpg`)}
                        extra={<span>{v.title}</span>}
                        >      
                        </Card.Header>
                    <Card.Body>
                       {v.type==='boss'?<div>
                            公司:<span>{v.company}</span>
                        </div>:null}
                        {v.desc.split('\n').map(n=>(
                            <div key={n}>{n}</div>
                        ))}
                        {v.type==='boss'?<div>
                            薪资:<span>{v.money}</span>
                        </div>:null}
                    </Card.Body>
                   </Card>):null
                ))
               }
           </WingBlank>
        )
    }
}
export default UserInfo