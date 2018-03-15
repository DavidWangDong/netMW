import React, { Component } from "react";
import classNames from "classnames";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import BaseLay from '../layout/baseLay'
import '../commonStyles/search.css'

class Search extends Component {
  constructor(props) {
    super(props);
    this.displayName = "search-music";
    this.input = null;
    this.state = { inputVaue: "", inputIsAct: false };
  }

  handleFocus() {
    if (this.props.handleFocus){
      this.props.handleFocus(this.state)
      return
    }
    this.setState({ inputIsAct: true });
  }

  handleBlur() {
    if (this.props.handleBlur) {
      this.props.handleBlur(this.state);
      return;
    }
    this.setState({ inputIsAct: false });
  }

  getChange(value){
    if (this.props.getChange) {
      this.props.getChange(value);
      return;
    }
  }

  refCb(dom) {
    this.input = dom;
  }

  render() {
    
    return <BaseLay displayName={this.displayName}>
        <input className={`${this.state.inputIsAct ? "act" : ""} input`} onFocus={() => {
            this.handleFocus();
          }} ref={dom => {
            this.refCb(dom);
          }} value={this.state.inputVaue} onChange={e => {
            this.setState({ inputVaue: e.target.value });
            this.getChange(e.target.value);
          }} onBlur={() => {
            this.handleBlur();
          }} />
        <span className="searchIcon">
          <i className="fa fa-search" style={{ fontSize: "0.35rem" }} />
        </span>
      </BaseLay>;
  }
}

export default Search;