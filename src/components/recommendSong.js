import React, { Component } from 'react'
import classname from "classnames";
import BaseLay from "../layout/baseLay";
import "../commonStyles/recommendSong.css";
import "whatwg-fetch";
import ApiHost from "../config/apihost";
import {connect} from 'react-redux'
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import actions from '../actions/index'


function SingleSong (props) {
    const { name,id } = props.info;
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
        <div className="songInfo" onClick={()=>{props.playSong(song)}}>
          <p className={`songName ${id==props.songInfo.id?'isPlaying':''}`}>{name}</p>
          <p className="songAuthor">
            {author}-{album}
          </p>
        </div>
        {props.children}
      </div>;
}

function mapStateToProps(state){
  return {songInfo:state.player_reducer.curr_info}
}

function mapDispatchToProps(dispatch,ownProps){
    const info = ownProps.info;
    return {playSong:(args)=>{
        dispatch(actions.play_music(info, ownProps.clickIgnore));
    },
    addSongToList:(args)=>{
      dispatch(actions.addSongToList(info))
    },
    deleteSong:()=>{
      dispatch(actions.deleteSong(info));
    }
  
  }
}

SingleSong = connect(mapStateToProps, mapDispatchToProps)(SingleSong);


class SongOption extends Component{
  constructor(props) {
    super(props)

  }
  
  render () {

    return <div className="optList">
        {this.props.iconShow.play?(<i className="icon fa fa-play" />):null}
        {this.props.iconShow.heart?(<i className="icon fa fa-heart-o" />):null}
        {this.props.iconShow.plus?(<i className="icon fa fa-plus" onClick={()=>{this.props.addSongToList()}} />):null}
        {this.props.iconShow.times ? <i className="icon fa fa-times" onClick={()=>{this.props.deleteSong()}} /> : null}
      </div>;
  }
}

SongOption = connect(mapStateToProps, mapDispatchToProps)(SongOption);



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
     if (this.props.getDataFlag){
       return;
     }
     fetch(`${ApiHost}${this.api}?r=${Date.now()}`, {
       credentials: "include"
     })
       .then(data => data.json())
       .then(json => {
         this.setState({ dataList: json[this.listKey] });
       });
  }

  render() {
    const targetParam = this.props.getDataFlag?this.props.dataList:this.state.dataList;
    const lists = targetParam.map((val, index) => (
      <SingleSong info={val} key={`recommend_single_song_` + index} clickIgnore={this.props.clickIgnore}>
        <SongOption iconShow={this.props.iconShow} info={val} />
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