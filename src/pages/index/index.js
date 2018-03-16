import React, { Component } from "react";
import classNames from "classnames";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PlayList from "../../components/playList.js";
import LoginArea from "../../components/loginArea.js";
import MusicOption from "../../components/musicOptions.js";
import Search from "../../components/search.js";
import List from "../../components/list.js";
import RecommendList from "../../components/recommendList.js";
import RecommendSongList from "../../components/recommendSong.js";
import MicroPlayer from "../../components/microPlayer.js";


// layout 布局


import { IndexHeader, IndexFoot, IndexBody } from "../../layout/baseLay";


// 每日推荐   音乐排行   我的歌单

function MusicOptionWrap(props){
  return <div style={{paddingTop:'0.76rem',paddingLeft:'0.96rem',paddingRight:'0.96rem'}}>
              {props.children}
         </div>
}


// 搜索歌曲
function SearchMusic (props){
    return <div
        style={{
          width:"5.48rem",
          margin:'0 auto',
          marginTop:"0.44rem",

        }}
      >
        {props.children}
      </div>;
}

// 推荐歌单
function RecommendedList (props){
  const style = {
    margin:'0 auto',
    marginTop:'0.32rem',
    width:'5.96rem',
    paddingBottom:'0.2rem'
  }
  const tmpStyle = Object.assign({},style,props.style)
  return <div style={tmpStyle}>{props.children}</div>;
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
            <MusicOption />
          </MusicOptionWrap>
          <SearchMusic>
            <Search />
          </SearchMusic>
          <RecommendedList>
            <List listTitle="推荐歌单" minHeight="2.3rem">
              <div style={{ marginTop: "0.2rem" }}>
                <RecommendList />
              </div>
            </List>
          </RecommendedList>
          <RecommendedList style={{ marginTop: "0.1rem" }}>
            <List listTitle="最新音乐" minHeight="2.2rem">
              <div style={{ marginTop: "0.2rem" }}>
                <RecommendSongList isShowDeleteOpt={false} />
              </div>
            </List>
          </RecommendedList>
        </IndexBody>
        <IndexFoot>
            <MicroPlayer>
              
            </MicroPlayer>
        </IndexFoot>
        <Route path={`${this.rootPath}/playList`} component={PlayList} />
      </div>;
  }
}

export default Index;
