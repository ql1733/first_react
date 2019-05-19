import axios from "axios";
import {getRedirectPath} from '../util.js'
const REGISTER_SUCESS = 'REGISTER_SUCESS'
const LOGIN_SUCCESS ='LOGIN_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LAOD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
let initState ={
    redirectTo:'',
    msg:'',
    isAuth:'',
    user:'',
    pwd:'',
    type:''
}
//reducer
export function user(state=initState,action){
    switch(action.type){
        case REGISTER_SUCESS:
            return {...state,msg:'',isAuth:true,redirectTo:getRedirectPath(action.payload),...action.payload}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        case LOGIN_SUCCESS:
            return {...state,msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}
        case AUTH_SUCCESS:
            return {...state,msg:'',isAuth:true,redirectTo:getRedirectPath(action.payload),...action.payload}
        case LAOD_DATA:
            return {...state,...action.payload}
        case LOGOUT:
            return {...initState,redirectTo:'/login'}
        default:
            return state
    }

}
function errorMsg(msg){
    return {msg,type:ERROR_MSG}
}
function authSuccess(data){
    return {type:AUTH_SUCCESS,payload:data}
}
function registerSucess(data){
    return {type:REGISTER_SUCESS,payload:data}
}
function loginSuccess(data){
    return {type:LOGIN_SUCCESS,payload:data}
}
export function logoutSubmit(){
    return {type:LOGOUT}
}
export function register({user,pwd,repeatpwd,type}){
    if(!user||!pwd||!type){
        console.log('用户名密码必须输入')
        return errorMsg('用户名密码必须输入')
    }
    if(pwd!==repeatpwd){
        return errorMsg('密码不一致')
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type})
        .then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(registerSucess(user,pwd,type))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
    
}
export function loadData(userinfo){
   return {type:LAOD_DATA,payload:userinfo}
}
export function update(data){
    return dispatch=>{
        axios.post('/user/updata',data)
            .then(res=>{
                if(res.status===200&&res.data.code===0){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg('用户名与密码必须输入')
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
        .then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(loginSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}























