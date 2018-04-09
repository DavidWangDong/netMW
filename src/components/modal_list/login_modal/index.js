import React, { Component } from "react";
import classnames from "classnames";
import BaseLay from "../../../layout/baseLay";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Validate from "../../../validate/index";
import actions from "../../../actions/index"
import { connect } from "react-redux";
import "./index.css";

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [
        {
          type: "text",
          placeholder: "请输入手机号",
          icon: "fa-mobile",
          isAct: false,
          value: ""
        },
        {
          type: "password",
          placeholder: "请输入密码",
          icon: "fa-lock",
          isAct: false,
          value: ""
        }
      ]
    };
  }

  changeArrValue(val, index, value, key) {
    const arr = [...this.state.info];
    arr[index][key] = value;
    this.setState({ info: arr });
  }

  doLogin() {
    const validate = new Validate();
    // 检查手机号密码是否为空
    const phone_empty_flag = !validate.empty_validate(this.state.info[0].value);
    if (phone_empty_flag) {
      this.props.emit_message({
        type: "ADD_TOAST",
        info: { msg: "错误：手机号码不能为空", isShow: true, type: "error" }
      });
      return;
    }

    const password_empty_flag = !validate.empty_validate(
      this.state.info[1].value
    );
    if (password_empty_flag) {
      this.props.emit_message({
        type: "ADD_TOAST",
        info: { msg: "错误：密码码不能为空", isShow: true, type: "error" }
      });
      return;
    }
    // 检查手机号格式是否正确
    const phone_format_flag = validate.regx_validate(
      /^1[345678]\d{9}$/,
      this.state.info[0].value
    );
    if (!phone_format_flag) {
       this.props.emit_message({
        type: "ADD_TOAST",
        info: { msg: "错误：手机号码格式不正确", isShow: true, type: "error" }
      });
      return;
    } 
    // 都正确提交
    this.props.login({
        url: `/login/cellphone?phone=${this.state.info[0].value}&password=${this.state.info[1].value}`
      });
  }
  render() {
    const style = {};
    const holders = {
      username: "请输入手机号",
      password: "请输入密码"
    };
    return (
      <div className="login_modal" style={style}>
        <div className="login_card pos_abs before">
          <i
            className="fa fa-close pos_abs login_close"
            onClick={this.props.closeModal}
          />
          {this.state.info.map((val, index) => {
            return (
              <div className="form_wrap" key={`inputs_${index}`}>
                <i className={`fa ${val.icon}`} />
                <div className={`input pos_rel ${val.isAct ? "act" : ""}`}>
                  <input
                    placeholder={val.placeholder}
                    type={val.type}
                    onChange={e => {
                      const value = e.target.value;
                      this.changeArrValue(val,index,value,"value");
                    }}
                    onFocus={() => {
                      this.changeArrValue(val, index, true, "isAct");
                    }}
                    onBlur={() => {
                      this.changeArrValue(val, index, false, "isAct");
                    }}
                  />
                  <span className="bottomLine pos_abs" />
                </div>
              </div>
            );
          })}
          <button
            className="login_sub"
            onClick={() => {
              this.doLogin();
            }}
          >
            登录
          </button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    closeModal: (...args) =>
      dispatch({
        type: "CHG_MODAL",
        info: { modalName: "", isShowModal: false }
      }),
    emit_message:(args) => {
      if (args.type=='ADD_TOAST') {
          setTimeout(()=>{
            dispatch({ type: "SHIFT_TOAST", info: null });
          },1000) 
      } 
      dispatch(args)
    },
    login:(args) => {
      dispatch(actions.login(args))
    }
  };
}

LoginModal = connect(null, mapDispatchToProps)(LoginModal);

export default LoginModal;
