import React, { Component } from 'react';
import classNames from 'classnames'
import { BrowserRouter as Router , Route, Link ,Redirect} from "react-router-dom";

import Index from "./pages/index/index"
import DayRecommend from "./pages/dayRecommend/index"
import OrderList from "./pages/orderList";
import SongSheet from "./pages/songSheet";
import SingleSheet from "./pages/singleSheet";

import Modal from './components/modal'

import './App.css'
import actions from "./actions/index";
import { connect } from "react-redux";
import add_toast from "./commonjs/add_toast"


class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fixHeight();
     this.props.refreshLog({ url: "/login/refresh" });
  }

  fixHeight() {
    let r1 = window.innerWidth / 640;
    if (r1 < 1) {
      document.getElementsByTagName("html")[0].style.fontSize = 100 * r1 + "px";
    } else {
      document.getElementsByTagName("html")[0].style.fontSize = 100 + "px";
    }
    document.getElementsByTagName("body")[0].style.height =
      window.innerHeight + "px";
  }


  render() {
    return <div className="App" style={{ height: window.innerHeight }}>
        <Modal />
        <Route exact path="/" render={()=><Redirect to='/index'/>}/>
        <Route path="/index" component={Index} />
        <Route path="/dayRecommend" render={props => {
            if (this.props.userInfo.userId) {
              return <DayRecommend />;
            } else {
              this.props.noLogin({
                type: "ADD_TOAST",
                info: {
                  type: "error",
                  msg: "尚未登录,请先登录",
                  isShow: true
                }
              });
              return <Redirect to={{ pathname: "/index", state: { from: this.props.location } }} />;
            }
          }} />
        <Route path="/orderList" component={OrderList} />
        <Route path="/songSheet" render={props => {
            if (this.props.userInfo.userId) {
              return <SongSheet />;
            } else {
              this.props.noLogin({
                type: "ADD_TOAST",
                info: {
                  type: "error",
                  msg: "尚未登录,请先登录",
                  isShow: true
                }
              });
              return <Redirect to={{ pathname: "/index", state: { from: this.props.location } }} />;
            }
          }} />
        <Route path='/singleSheet' component={SingleSheet} />
      </div>;
  }
}


function mapStateToProps(state) {
  return { userInfo: state.login_reducer };
}
function mapDispatchToProps(dispatch, ownProps) {
  return {
    refreshLog: args => dispatch(actions.loginEx(args)),
    noLogin: args => {
      add_toast(dispatch, args);
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
