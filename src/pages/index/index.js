import React, { Component } from "react";
import classNames from "classnames";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PlayList from "../../components/playList.js";
import LoginArea from "../../components/loginArea.js";
import MusicOption from "../../components/musicOptions.js";


// layout 布局

// 头部
function  IndexHeader (props){
   return <div style={{ width: "100%", height: "0.9rem" }}>
            {props.children}
          </div>;
}

// 内容部分
function IndexBody (props) {
  return <div style={{ width: "100%", top:'1rem',left:0,right:0,bottom:'1.24rem',overflowY:'auto',overflowX:'hidden',background:'#fff' }} className="pos_abs" >
            {props.children}
         </div>
}


// 每日推荐   音乐排行   我的歌单

function MusicOptionWrap(props){
  return <div style={{paddingTop:'0.76rem',paddingLeft:'0.96rem',paddingRight:'0.96rem'}}>
              {props.children}
         </div>
}


class Index extends Component {
  constructor(props) {
    super(props);
    this.displayName = "index";
    this.rootPath = "/index"
  }

  render() {
    return <div className={`page page-${this.displayName} pos_rel`}>
            <IndexHeader>
              <LoginArea />
            </IndexHeader>
            <IndexBody>
                <MusicOptionWrap>
                   <MusicOption></MusicOption>
                </MusicOptionWrap>
            </IndexBody>
        <Route path={`${this.rootPath}/playList`} component={PlayList} />
      </div>;
  }
}

export default Index;
