import React, { Component } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "../commonStyles/musicOpt.css";


function OptItem (props) {
    const style={
        display:'flex',
        flexDirection:'row'
    }
    return <Link to={props.path}>
                <i className={`icon iconfont ${props.icon}`}></i>
                <span>{props.name}</span>
           </Link>
}



class MusicOpt extends Component {
  constructor(props) {
    super(props);
    this.displayName = "music-opt";
  }

  render() {
    return (
      <div className={`component ${this.displayName} before pos_rel`}>
            <div className={`${this.displayName}-inner`}>
                <div className="music_opt_list">

                </div>
            </div>
      </div>
    );
  }
}

export default MusicOpt;
