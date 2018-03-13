import React, { Component } from 'react'
import classname from "classnames";
import BaseLay from "../layout/baseLay";
import "../commonStyles/recommendSong.css";
import "whatwg-fetch";


class RecommendSongList extends Component {
  constructor(props) {
    super(props);
    this.displayName = "recommend-song";
  }

  render() {
    return (
      <BaseLay displayName={this.displayName}>
        <div className="recommendSong" >
            
        </div>
      </BaseLay>
    );
  }
}


export default RecommendSongList;