import React, { Component } from 'react'
import classname from "classnames";
import BaseLay from "../layout/baseLay";
import "../commonStyles/recommendSong.css";
import "whatwg-fetch";


function SingleSong (props) {
    return <div className="singleSong">
        <div className="songInfo">
          <p className="songName">记忆中的往事(电视剧《台湾)</p>
          <p className="songAuthor">崔子格-台湾往事 电视剧原声音乐全集</p>
        </div>
        <div className="optList">
          <i className="icon iconfont icon-play_fill" />
          <i className="icon iconfont icon-like" />
          <i className="icon iconfont icon-add" />
        </div>
      </div>;
}

class RecommendSongList extends Component {
  constructor(props) {
    super(props);
    this.displayName = "recommend-song";
  }

  render() {
    return (
      <BaseLay displayName={this.displayName}>
        <div className="recommendSong" >
            <SingleSong></SingleSong>
        </div>
      </BaseLay>
    );
  }
}


export default RecommendSongList;