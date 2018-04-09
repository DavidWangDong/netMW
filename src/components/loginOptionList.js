import React, { Component } from "react";
import classNames from "classnames";
import BaseLay from "../layout/baseLay";
import {connect} from 'react-redux'
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "../commonStyles/loginOptionList.css";
class LoginOption extends Component {
  constructor(props) {
    super(props);
    this.displayName = "login-option-list";
    this.state = { options: [{ name: "登录", icon: "fa-user", handle: props.onLog },  { name: "刷新", icon: "fa-exchange", handle: props.onEx }] };
  }

  render() {
        
        return <BaseLay displayName={this.displayName}>
                  <ul>
                    {this.state.options.map((val, index) => {
                      if (this.props.info.userId&&index==1){
                        return <li className="login-item" onClick={() => {
                              val.handle(val);
                            }} key={"login_op_" + index}>
                            <i className={`icon fa ${val.icon}`} />
                            <span>{val.name}</span>
                          </li>;
                      }else if (!this.props.info.userId&&index==0){
                         return <li className="login-item" onClick={() => {
                               val.handle(val);
                             }} key={"login_op_" + index}>
                             <i className={`icon fa ${val.icon}`} />
                             <span>{val.name}</span>
                           </li>;
                      }
                      
                    })}
                  </ul>
                </BaseLay>
  }
}

function mapStateToProps (state) {
  return {info:state.login_reducer}
}


export default connect(mapStateToProps)(LoginOption);
