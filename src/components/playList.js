import React, { Component } from "react";
import classNames from "classnames";

class Play extends Component {
  constructor(props) {
    super(props);
    this.displayName = "playList";
  }

  render() {
    return (<div className={`component component-${this.displayName}`}>
                播放列表页
            </div>);
  }
}

export default Play;