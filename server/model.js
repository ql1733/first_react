const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/boss'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){
    console.log('mongo')
})
const models = {
    user:{
        'user':{'type':String,require:true},
        'pwd':{'type':String,require:true},
        'type':{'type':String,require:true},
        'avatar':{'type':String},
        'desc':{'type':String},
        'title':{'type':String},
        'company':{'type':String},
        'money':{'type':String}
    },
    chat:{
        'chatid':{'type':String,require:true},
        'read':{'type':Boolean,default:false},
        'from':{'type':String,require:true},
        'to':{'type':String,require:true},
        'content':{'type':String,require:true,default:''},
        'create_time':{'type':Number,default:new Date().getTime()}
    }
}

for(let i in models){
    mongoose.model(i,new mongoose.Schema(models[i]))
}
module.exports={
    getModel:function(name){
        return mongoose.model(name)
    }
}
