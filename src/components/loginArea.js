import React, { Component } from "react";
import classNames from "classnames";
import '../commonStyles/loginArea.css'
import BaseLay from '../layout/baseLay'
import LoginOption from './loginOptionList'





class LoginArea extends Component {
  constructor(props) {
    super(props);
    this.displayName = "login-area";
    this.state={
      isShow_opts:false,
    }
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
          <img src="//tvax4.sinaimg.cn/default/images/default_avatar_male_180.gif" />>
        </div>
        <div className="user-name">用户名称</div>
        <div className="login-option pos_rel" onClick={() => this.setState({
              isShow_opts: !this.state.isShow_opts
            })}>
          <i className="icon fa fa-gear listIcon" />
          <LoginOption isShow={this.state.isShow_opts} onLog={arg => {
              this.handleLog();
            }} onOut={arg => {
              this.handleOut();
            }} onEx={arg => {
              this.handleEx();
            }} />
        </div>
      </BaseLay>;
  }
}

export default LoginArea;
