const express = require('express')
const Router = express.Router()
const utils  = require('utility')
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')


Router.get('/info',(req,res)=>{
    const {userid} = req.cookies
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid},{'pwd':0},(err,doc)=>{
        if(err){
            return res.json({code:1})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
})
Router.get('/list',(req,res)=>{
    let {type} = req.query
    User.find({type},function(err,doc){
        if(err){
            return res.json({code:1,msg:'server error'})
        }
        return res.json({code:0,data:doc})
    })
})
Router.get('/getmsglist',(req,res)=>{
    const user = req.cookies.userid
    User.find({},(e,d)=>{
        let users = {}
        d.forEach(v=>{
            users[v._id]={name:v.user,avatar:v.avatar}
        })
        Chat.find({'$or':[{from:user},{to:user}]},(err,doc)=>{
            if(!err){
                return res.json({code:0,msgs:doc,users:users})
            }
        })
    })
   
})
Router.post('/readmsg',(req,res)=>{
    let userid = req.cookies.userid
    let {from} = req.body
    console.log(userid,from)
    Chat.update({from,to:userid},{'$set':{read:true}},{'multi':true},(err,doc)=>{
        if(err){
            return res.json({code:1,msg:'server error'})
        }
        return res.json({code:0,num:doc.nModified})
    })
})
Router.post('/register',(req,res)=>{
    const {user,pwd,type}=req.body
    User.findOne({user:user},(err,doc)=>{
       if(doc){
           return res.json({code:1,msg:'用户名重复'})
       } 
       const userModel = new User({user,type,pwd:md5Pwd(pwd)})
       userModel.save((err,doc)=>{
           if(err){
               return res.json({code:1,msg:'server error'})
           }
           const {user,type,_id}=doc
           res.cookie('userid',_id)
           return res.json({code:0,data:{user,type,_id }})
       })
    })
})
Router.post('/login',(req,res)=>{
    const {user,pwd} = req.body
    User.findOne({user,pwd:md5Pwd(pwd)},{'pwd':0},(err,doc)=>{
        if(!doc){
            return res.json({code:1,msg:"用户不存在"})
        }
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
    })
})
Router.post('/updata',(req,res)=>{
    const {userid} = req.cookies
    if(!userid){
        return res.json({code:1})
    }
    const body=req.body
    User.findByIdAndUpdate(userid,body,(err,doc)=>{
        if(err){
            return res.json({code:1,msg:'server err'})
        }
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        return res.json({code:0,data:data})
    })
})
function md5Pwd(pwd){
    let hash = 'qq&ll*1314and&1590'
    return utils.md5(utils.md5(pwd+hash))
}
module.exports= Router