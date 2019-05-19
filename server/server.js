const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const model = require('./model')
const Chat = model.getModel('chat')


io.on('connection',(socket)=>{
    socket.on('sendmsg',(data)=>{
        const {from,to,msg} = data.from
        const chatid = [from,to].sort().join('_')
        let time = new Date().getTime()
        Chat.create({from,to,chatid,content:msg,create_time:time},(err,doc)=>{
           // console.log(doc)
            io.emit('recemsg',Object.assign({},doc._doc))
        })
        
    })
})
const userRouter = require('./user')



app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
app.use('/data',function(err,res){
    res.json({"data":1})
})
server.listen(8089,function(){
    console.log('ok')
})