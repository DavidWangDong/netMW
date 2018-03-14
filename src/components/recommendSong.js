import React, { Component } from 'react'
import classname from "classnames";
import BaseLay from "../layout/baseLay";
import "../commonStyles/recommendSong.css";
import "whatwg-fetch";
import ApiHost from "../config/apihost";


function SingleSong (props) {
    const { name } = props.info;
    let author='';
    props.info.song.artists.forEach((val,index)=>{
        if (index==props.info.song.artists.length-1){
          author += `${val.name}`;
        }else{
          author+=(`${val.name}/`)
        }
    })
    const album=props.info.song.album.name
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
        <i className="icon iconfont icon-play_fill" />
        <i className="icon iconfont icon-like" />
        <i className="icon iconfont icon-add" />
        {this.props.isShowDeleteOpt?<i className="icon iconfont icon-round_close_fill_light" />:null}
      </div>;
  }
}



class RecommendSongList extends Component {
  constructor(props) {
    super(props);
    this.displayName = "recommend-song";
    this.api = "/personalized/newsong";
    this.state={
      dataList:[]
    }
  }

  componentWillMount () {
     fetch(`${ApiHost}${this.api}`)
       .then(data => data.json())
       .then(json => {
         console.log(json);
         this.setState({ dataList: json.result });
       });
  }

  render() {
    return <BaseLay displayName={this.displayName}>
        <div className="recommendSong">
          {this.state.dataList.map((val, index) => (
            <SingleSong info={val} key={`recommend_single_song_` + index}>
              <SongOption isShowDeleteOpt={this.props.isShowDeleteOpt} />
            </SingleSong>
          ))}
        </div>
      </BaseLay>;
  }
}


export default RecommendSongList;