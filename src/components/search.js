import React, { Component } from "react";
import classNames from "classnames";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../commonStyles/search.css'

class Search extends Component {
  constructor(props) {
    super(props);
    this.displayName = "search-music";
    this.input = null;
    this.state = { inputVaue: "", inputIsAct: false };
  }

  handleFocus() {
    this.setState({ inputIsAct: true });
  }

  handleBlur() {
    this.setState({ inputIsAct: false });
  }

  refCb(dom) {
    this.input = dom;
  }

  render() {
    let style1 = {
      width: "75%",
      height: "100%",
      border: "none",
      background: "none",
      outline: "none",
      textIndent: ".5em"
    };
    let style2 = {
      width: "25%",
      height: "100%",
      border: "none",
      background: "#1ba40b",
      color: "#fff"
    };
    return (
      <div className={`component ${this.displayName} before pos_rel`}>
        <div className={`${this.displayName}-inner`}>
          <input
            className={`${this.state.inputIsAct ? "act" : ""}`}
            style={style1}
            onFocus={() => {
              this.handleFocus();
            }}
            ref={dom => {
              this.refCb(dom);
            }}
            value={this.state.inputVaue}
            onChange={e => {
              this.setState({ inputVaue: e.target.value });
            }}
            onBlur={() => {
              this.handleBlur();
            }}
          />
          <span style={style2}>
            <i
              className="icon iconfont icon-search"
              style={{ fontSize: "0.5rem" }}
            />
          </span>
        </div>
      </div>
    );
  }
}

export default Search;