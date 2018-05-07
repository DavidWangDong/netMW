import React, { Component } from "react";
import classNames from "classnames";
import { BrowserRouter as Router, Route, Link ,withRouter} from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import BaseLay from '../layout/baseLay'
import ApiHost from '../config/apihost'
import PropTypes from "prop-types";
import '../commonStyles/search.css'


class SearchResultList extends Component {
  constructor(props) {
    super(props);
  }

  // static contextTypes = {
  //   router: PropTypes.object.isRequired
  // };

  toSearchPage (keyWord){
    
    let finalWord=keyWord?keyWord:this.props.keyWord;
    // // 判断当前页面是否是搜索页
    const {location,history} = this.props
    if (location.pathname=='/searchPage'){
      this.props.getData&&this.props.getData(finalWord)
      this.props.closeList();
    }else{
      history.push({ pathname: "/searchPage", state: {keyWord:finalWord}})
    }
  }


  render() {
    return (
      <div className="search-list pos_abs">
        <ul>
          <li onClick={()=>{this.toSearchPage()}}>
            <a> 搜索'{this.props.keyWord}'</a>
          </li>
          {this.props.dataList.map((val, index) => {
            let author = "";
            let song = val;
            song.artists.forEach((val, index) => {
              if (index == song.artists.length - 1) {
                author += `${val.name}`;
              } else {
                author += `${val.name}/`;
              }
            });
            let finalkeyWord = `${val.name} ${author}`
            return (
              <li key={`search-song-${index}`} onClick={()=>{this.toSearchPage(finalkeyWord);}}>
                <i className="fa fa-search" />
                <p>{finalkeyWord}</p>
              </li>
            );
          })}
          <li
            onClick={() => {
              this.props.closeList();
            }}
          >
            <p className="search-list-close">关闭</p>
          </li>
        </ul>
      </div>
    );
  }
}

SearchResultList = withRouter(SearchResultList);

class Search extends Component {
  constructor(props) {
    super(props);
    this.displayName = "search-music";
    this.input = null;
    this.state = { inputVaue: "", inputIsAct: false,isShowList:false ,resultList:[]};
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
    
    if (value){
      this.setState({ isShowList: true });
      fetch(`${ApiHost}/search/suggest?keywords=${value}&limit=10`)
      .then(data=>data.json())
      .then(json=>{
          console.log(json);
          // 只去歌曲
          try {
            this.setState({
                resultList: [...json.result.songs]
              });
          } catch (error) {
              return Promise.reject(error)
          }
          
      })
      .catch(()=>{
        
      })
    }
    !value && this.setState({ isShowList: false });

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
        <ReactCSSTransitionGroup
          transitionName="fadeIn"
          transitionEnterTimeout={800}
          transitionLeaveTimeout={800}
        >
          {this.state.isShowList ? <SearchResultList getData={this.props.getData} keyWord={this.state.inputVaue} dataList={this.state.resultList} closeList={()=>{this.setState({isShowList:false,inputVaue:''})}} /> : null}
        </ReactCSSTransitionGroup>
        
      </BaseLay>;
  }
}

export default Search;