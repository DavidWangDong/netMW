import React, { Component, bindActionCreators } from "react";
import classNames from "classnames";
import '../commonStyles/loginArea.css'
import BaseLay from '../layout/baseLay'
import LoginOption from './loginOptionList'
import {connect} from 'react-redux'
import ApiHost from "../config/apihost"



const actions = {
  login:function(args){
    return function(dispatch,getState){
      const state = getState();
      if (state.login_reducer.userId){
          return;
      }
      console.log(args);
      fetch(`${ApiHost}${args['url']}`)
          .then(data => data.json())
          .then(json => {
            console.log(json);
            const { nickname, userId, avatarUrl } = json.profile;
            dispatch({
              type: "LOGIN",
              info: { nickname, userId, avatarUrl }
            });
        });
    }
  }
}


class LoginArea extends Component {
  constructor(props) {
    super(props);
    this.displayName = "login-area";
    this.state={
      isShow_opts:false,
    }
    this.api = "/login/cellphone?phone=18656150387&password=wang12345dong";
  }

  // 点击登录
  handleLog (){
    console.log('登录')
  }

  // 点击退出
  handleOut (){
    console.log("登出");
  }

  // 点击切换
  handleEx (){
    console.log("切换");
  }

  render() {
    return <BaseLay displayName={this.displayName}>
        <div className="avatar animate">
          <img src={this.props.info.avatarUrl} />>
        </div>
        <div className="user-name">{this.props.info.nickname}</div>
        <div className="login-option pos_rel" onClick={() => this.setState({
              isShow_opts: !this.state.isShow_opts
            })}>
          <i className="icon fa fa-gear listIcon" />
          <LoginOption isShow={this.state.isShow_opts} onLog={this.props.handleLog} onOut={this.props.handleOut} onEx={this.props.handleEx} />
        </div>
      </BaseLay>;
  }
}
function mapStateToProps(state){
    return {info:state.login_reducer};
}
function mapDispatchToProps(dispatch,ownProps) {
  return { handleLog: (...args) => dispatch(actions.login({
          url: "/login/cellphone?phone=18656150387&password=wang12345dong",
          ...args
        })) };
  
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginArea)
// export default LoginArea;
