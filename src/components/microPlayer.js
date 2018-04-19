import React, { Component } from 'react'
import classnames from 'classnames'
import '../commonStyles/microPlayer.css'
import BaseLay from '../layout/baseLay'
import {connect} from 'react-redux'

class MicroPlayer extends Component{
    constructor(props) {
        super(props)
        this.displayName='micro-player'
    }
    render () {
        const style={
          width:this.props.info.duration
        }

         let author = "未知";
         let song = this.props.info.curr_info
         if (song.artists){
           author=''
            song.artists.forEach((val, index) => {
              if (index == song.artists.length - 1) {
                author += `${val.name}`;
              } else {
                author += `${val.name}/`;
              }
            });
         }
         const album = song.album?song.album.name:'未知';
        return <BaseLay displayName={this.displayName}>
            <div className="micro_player_wrap">
              <div className="song_info">
                <div className="song_avatar animate">
                  <img src={this.props.info.curr_info.avatar ? this.props.info.curr_info.avatar : "//tvax4.sinaimg.cn/default/images/default_avatar_male_180.gif"} />
                </div>
                <div className="song_name_auth">
                  <p className="song_name">
                    {this.props.info.curr_info.name
                      ? this.props.info.curr_info.name
                      : "未知"}
                  </p>
                  <p className="song_auth">{author}</p>
                </div>
              </div>
              <div className="song_opt">
                <i className="icon fa fa-th-list" />
                <i className={`icon fa fa-${this.props.info.status == "PLAYING" ? "pause-circle" : "play-circle"}-o`} />
                <i className="icon fa fa-step-forward" />
              </div>
            </div>
            <div className="micro-time-track pos_rel">
              <div className="micro-time-track-color pos_abs" style={style} />
            </div>
          </BaseLay>;
            
    }
    
}

function mapStateToProps(state){
  return {info:state.player_reducer}
}

export default connect(mapStateToProps)(MicroPlayer);