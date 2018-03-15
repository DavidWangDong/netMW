import React, { Component } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import BaseLay from '../layout/baseLay'
import "../commonStyles/musicOpt.css";


function OptItem (props) {
    const style = { display: "flex", flexDirection: "column", fontSize: "0.3rem", textDecoration: "none", color: "#1ba40b", justifyContent: "space-between" };
    return <Link to={props.path} style={style}>
        <i className={`${props.icon}`} style={{ fontSize: "0.6rem" }} />
        <span>{props.name}</span>
      </Link>;
}



class MusicOpt extends Component {
  constructor(props) {
    super(props);
    this.displayName = "music-opt";
    
    let specialIcon ='icon iconfont icon-rili' + (new Date().getDate());


    this.state = { optsList: [{ name: "每日推荐", icon: specialIcon, path: "/index" }, { name: "音乐排行", icon: "fa fa-line-chart", path: "/index" }, { name: "我的歌单", icon: "fa fa-file-text", path: "/index" }] };
  }

  render() {
    return <BaseLay displayName={this.displayName}>
        <div className="music_opt_list">
          {this.state.optsList.map((val, index) => (
            <OptItem
              path={val.path}
              name={val.name}
              icon={val.icon}
              key={"music_opt_list" + index}
            />
          ))}
        </div>
      </BaseLay>;
  }
}

export default MusicOpt;
