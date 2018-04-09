import React, { Component } from "react";
import classnames from "classnames";
import BaseLay from "../../../layout/baseLay";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { connect } from "react-redux";
import "./index.css";


function ToastItem (props) {
    const icon_class = {
        success:'fa-check-circle-o',
        error:'fa-times-circle-o',
        wraning:'fa-info-circle'
    }
    return <div className={`toastItem ${props.type}`}>
        <div className="toastItemInner">
            <i className={`fa ${icon_class[props.type]}`} />
            <span className="message">{props.message}</span>
        </div>
    </div>
}

class Toast extends Component {
  constructor(props) {
    super(props);
    this.displayName = "toast-modal";
  }

  render() {
    const toasts = this.props.toastlist.map((val, index) => {
      const { type, msg } = val;
      return val.isShow ? <ToastItem type={type} message={msg} /> : null;
    });
    return <BaseLay displayName={this.displayName}>
            <ReactCSSTransitionGroup 
                transitionName="slideLeft"
                transitionEnterTimeout={600}
                transitionLeaveTimeout={600}
            >
                {toasts}
            </ReactCSSTransitionGroup>
          </BaseLay>;
  }
}

function mapStateToProps (state){
    return { toastlist: state.modal_reducer.toast };
}

export default connect(mapStateToProps)(Toast);
