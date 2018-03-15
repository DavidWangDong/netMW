import React, { Component } from "react";
import classNames from "classnames";
import BaseLay from "../layout/baseLay";
import "../commonStyles/loginOptionList.css";
class LoginOption extends Component {
  constructor(props) {
    super(props);
    this.displayName = "login-option-list";
    this.state = { options: [{ name: "登录", icon: "fa-user", handle: props.onLog }, { name: "登出", icon: "fa-power-off", handle: props.onOut }, { name: "切换", icon: "fa-exchange", handle: props.onEx }] };
  }

  render() {
    if (this.props.isShow)
      {
        return <BaseLay displayName={this.displayName}>
                  <ul>
                {this.state.options.map((val, index) => (
                  <li
                    className="login-item"
                    onClick={val.handle}
                    key={"login_op_" + index}
                  >
                    <i className={`icon fa ${val.icon}`} />
                    <span>{val.name}</span>
                  </li>
                ))}
              </ul>
               </BaseLay>
      }else{
        return null
      }
  }
}

export default LoginOption;
