import {combineReducers} from 'redux'
import {user} from './reducer/user.redux.js'

import { chatuser } from "./reducer/chatuser.redux.js";
import {chat} from './reducer/chat.redux.js'
export default  combineReducers({user,chatuser,chat})