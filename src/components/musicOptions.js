import React, { Component } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "../commonStyles/musicOpt.css";


function OptItem (props) {
    const style = { display: "flex", flexDirection: "column" ,fontSize:'0.3rem',textDecoration:'none',color:'#1ba40b'};
    return <Link to={props.path} style={style}>
        <i className={`icon iconfont ${props.icon}`} style={{ fontSize: "0.6rem" }} />
        <span>{props.name}</span>
      </Link>;
}



class MusicOpt extends Component {
  constructor(props) {
    super(props);
    this.displayName = "music-opt";
    
    let specialIcon ='icon-rili' + (new Date().getDate());


    this.state = { optsList: [{ name: "每日推荐", icon: specialIcon, path: "/index" }, { name: "音乐排行", icon: "icon-order_fill", path: "/index" }, { name: "我的歌单", icon: "icon-task_fill", path: "/index" }] };
  }

  render() {
    return <div className={`component ${this.displayName} before pos_rel`}>
        <div className={`${this.displayName}-inner`}>
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
        </div>
      </div>;
  }
}

export default MusicOpt;
