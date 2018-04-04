import React, { Component } from "react";
import classnames from 'classnames';
import BaseLay from '../layout/baseLay'
import '../commonStyles/modal.css'


class LoginModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            info:[
                {type:'text',placeholder:'请输入手机号',icon:'fa-mobile',isAct:false,value:''},
                {type:'password',placeholder:'请输入密码',icon:'fa-lock',isAct:false,value:''}
            ]
        }
    }
    changeArrValue (val,index,value,key){
        const arr = this.state.info.slice();
        arr[index][key]=value;
        this.setState({info:arr});
    }
    render (){
        const style = {
        }
        const holders = {
            username:'请输入手机号',
            password:'请输入密码'
        }
        return <div className="login_modal" style={style}>
            <div className="login_card pos_abs before">
              <i className="fa fa-close pos_abs login_close" />
              {this.state.info.map((val,index)=>{
                  return <div className="form_wrap" key={`inputs_${index}`}>
                      <i className={`fa ${val.icon}`} />
                      <div className={`input pos_rel ${val.isAct?'act':''}`}>
                        <input placeholder={val.placeholder} type={val.type} onFocus={()=>{
                            this.changeArrValue(val,index,true,'isAct');
                        }} onBlur={()=>{
                            this.changeArrValue(val, index, false, "isAct");
                        }}/>
                        <span className="bottomLine pos_abs"></span>
                      </div>
                    </div>;
              })}
             
              <button className="login_sub">登录</button>
            </div>
          </div>;
    }
    
}

const modalList = {
  login: LoginModal
};


class Modal extends Component {
    constructor(props) {
        super(props)
        this.displayName = "modal"
    }




    render () {
        const modalName = modalList[this.props.modalName]
        return <BaseLay displayName={this.displayName}>
                    {modalName}
               </BaseLay>;
               
    }
    
}


export default Modal;