import React, { Component } from "react"
import classnames from 'classnames'
import BaseLay from '../layout/baseLay'
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Validate from '../validate/index'
import { connect } from "react-redux"
import '../commonStyles/modal.css'

import LoginModal from './modal_list/login_modal/index'
import ToastModal from './modal_list/toast_modal/index'



class Modal extends Component {
    constructor(props) {
        super(props)
        this.displayName = "modal"
    }




    render () {
        let modalName = this.props.modal.modalName;
        let  colModal = null;
        if (this.props.modal.isShowModal){
            switch (modalName) {
                case "login":
                colModal = <LoginModal />;
                break;
                default:
                colModal = null;
                break;
            }
        }
        return <BaseLay displayName={this.displayName}>
                     <ReactCSSTransitionGroup
                        transitionName="zoomIn"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                        >
                         {colModal}
                    </ReactCSSTransitionGroup>

                    <ToastModal />
                </BaseLay>;
                    
    }
    
}

function mapStateToProps(state) {
    return { modal: state.modal_reducer.modal };
}


export default connect(mapStateToProps)(Modal);