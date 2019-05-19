import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'

import {BrowserRouter,Route,Link,Redirect,Switch} from 'react-router-dom'
import './index.css';
import App from './App';
import reducers from './reducer.js'
import axios from 'axios'
import './config.js'
import Login from './container/login/login.js'
import Register from './container/register/register.js'
import BossInfo from './container/bossinfo/bossinfo.js'
import GeniusInfo from './container/geniusinfo/geniusinfo.js'
import AuthRoute from './component/authRoute/authRoute.js'
import * as serviceWorker from './serviceWorker';
import {createStore,applyMiddleware,compose} from 'redux'
import Chat from './component/chat/chat.js'
import Dashboard from './component/dashboard/dashboard';
const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))
// window.devToolsExtension

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
       
        <div>
            <AuthRoute></AuthRoute>
            <Switch>
                <Route path='/bossinfo' component={BossInfo}></Route>
                <Route path='/geniusinfo' component={GeniusInfo}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
                <Route path='/chat/:user' component={Chat}></Route>
                <Route component={Dashboard}></Route>
            </Switch>
           
        </div>
        </BrowserRouter>
        


    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
