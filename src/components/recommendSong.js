import React, { Component } from 'react'
import classname from "classnames";
import BaseLay from "../layout/baseLay";
import "../commonStyles/recommendSong.css";
import "whatwg-fetch";
import ApiHost from "../config/apihost";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";


function SingleSong (props) {
    const { name } = props.info;
    let author='';
    let song = props.info.song || props.info
    song.artists.forEach((val, index) => {
      if (index == song.artists.length - 1) {
        author += `${val.name}`;
      } else {
        author += `${val.name}/`;
      }
    });
    const album = song.album.name;
    return <div className="singleSong">
        <div className="songInfo">
          <p className="songName">{name}</p>
          <p className="songAuthor">
            {author}-{album}
          </p>
        </div>
        {props.children}
      </div>;
}



class SongOption extends Component{
  constructor(props) {
    super(props)

  }
  
  render () {

    return <div className="optList">
        <i className="icon fa fa-play" />
        <i className="icon fa fa-heart-o" />
        <i className="icon fa fa-plus" />
        {this.props.isShowDeleteOpt ? <i className="icon fa fa-times" /> : null}
      </div>;
  }
}



class RecommendSongList extends Component {
  constructor(props) {
    super(props);
    this.displayName = "recommend-song";
    this.api = this.props.api|| "/personalized/newsong";
    this.listKey = this.props.listKey || "result";
    this.state={
      dataList:[]
    }
  }

  componentWillMount () {
     fetch(`${ApiHost}${this.api}?r=${Date.now()}`, {
       credentials: "include"
     })
       .then(data => data.json())
       .then(json => {
         console.log(json);
         this.setState({ dataList: json[this.listKey] });
       });
  }

  render() {
    const lists = this.state.dataList.map((val, index) => (
      <SingleSong info={val} key={`recommend_single_song_` + index}>
        <SongOption isShowDeleteOpt={this.props.isShowDeleteOpt} />
      </SingleSong>
    ));
    return <BaseLay displayName={this.displayName}>
        <div className="recommendSong">
          <ReactCSSTransitionGroup
                  transitionName="slideLeft"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}
                >
          {lists}
          </ReactCSSTransitionGroup>
        </div>
      </BaseLay>;
  }
}


export default RecommendSongList;