import React, { Component } from 'react';
// import {Button} from 'antd-mobile'
import {connect} from 'react-redux'
import axios from 'axios'
import {addGun,removeGun,addGunAsync} from './index.redux'
import 'antd-mobile/dist/antd-mobile.css'
import './App.css';
// import {createStore} from 'redux'




// const mapStatetoProps=(state)=>{
//   return {num:state}
// }
// const actionCreaters = {addGun,removeGun,addGunAsync}
//App = connect(mapStatetoProps,actionCreaters)(App)
@connect(
state=>({num:state}),
{addGun,removeGun,addGunAsync}
)
class App extends Component {
  componentDidMount(){
    axios.get('/data').then(res=>{
      console.log(res)
    })
  }
  render() {
    const num = this.props.num
    const addGun = this.props.addGun
    const removeGun = this.props.removeGun
    const addGunAsync = this.props.addGunAsync
    return (
      <div className="App">
      <h1>现在有机枪{num}</h1>
        <button onClick={addGun}> 申请武器</button>
        <button onClick={removeGun}> 上交武器</button>
        <button onClick={addGunAsync}> delyss武器</button>
      </div>
    );
  }
}

export default App;
