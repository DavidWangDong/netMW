import React, { Component, bindActionCreators } from "react";
import classNames from "classnames";
import '../commonStyles/loginArea.css'
import BaseLay from '../layout/baseLay'
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import LoginOption from './loginOptionList'
import {connect} from 'react-redux'
import actions from "../actions/index"






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

  // 点击刷新
  handleEx (){
    console.log("切换");
  }

  render() {
    let  option = this.state.isShow_opts?(<LoginOption isShow={this.state.isShow_opts} onLog={this.props.handleLog} onOut={this.props.handleOut} onEx={this.props.handleEx} key={this.displayName+'_trans'} />):(null)
    return <BaseLay displayName={this.displayName}>
        <div className="avatar animate">
          <img src={`${this.props.info.avatarUrl}?param=200y200`} />>
        </div>
        <div className="user-name">{this.props.info.nickname}</div>
        <div className="login-option pos_rel" onClick={() => this.setState({
              isShow_opts: !this.state.isShow_opts
            })}>
          <i className="icon fa fa-gear listIcon" />
          <ReactCSSTransitionGroup
                  transitionName="zoomIn"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}
                >
                {option}

          </ReactCSSTransitionGroup>
        </div>
      </BaseLay>;
  }
}
function mapStateToProps(state){
    return {info:state.login_reducer};
}
function mapDispatchToProps(dispatch,ownProps) {
  return { handleLog: (...args) => dispatch(actions.proxy_login({
          ...args
        })), handleEx: () => dispatch(actions.loginEx({
          url: "/login/refresh"
        })) };
  
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginArea)
