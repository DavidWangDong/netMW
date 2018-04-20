import React, { Component } from 'react'
import classnames from 'classnames'
import '../commonStyles/microPlayer.css'
import BaseLay from '../layout/baseLay'
import {connect} from 'react-redux'
import PlayList from './playList'
import actions from '../actions/index'

class MicroPlayer extends Component{
    constructor(props) {
        super(props)
        this.displayName='micro-player'
        this.state={
          isShowList:false,
        }
    }
    componentDidMount(){
      const audio = this.props.info.audio;
      const {timeDom} = this
      audio.addEventListener('play',()=>{
        setInterval(()=>{
          let percent = audio.currentTime * 1000 / this.props.info.curr_info.duration * 100;
          timeDom.style.width=`${percent}%`
        },1000/60)
      })
      audio.addEventListener('ended',()=>{
         let {model} = this.props.info
         switch (model) {
           case "ORDER_SONG_SHEET_CIRCLE":
             this.props.next_song();
             break;
           case "ORDER_SONG_SHEET":
             this.props.sheet_song();
             break;
           case "SINGLE_SONG_CIRCLE":
             audio.currentTime = 0;
             audio.play();
             break;
           case "RANDOM_PLAY_CIRCLE":
              this.props.random_song()
              break;
           default:
           this.props.next_song();
             break;
         }
      })
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
        let albumAvatar ;
        try {
          albumAvatar = this.props.info.curr_info.album.picUrl;
        }catch (error){
          albumAvatar = "//tvax4.sinaimg.cn/default/images/default_avatar_male_180.gif";
        }
        return <BaseLay displayName={this.displayName}>
            <div className="micro_player_wrap">
              <div className="song_info">
                <div className="song_avatar animate pos_rel">
                  <img src={albumAvatar} />
                  {this.props.info.status == "LOADING" ? <div className="song-loading-hover pos_abs">
                      <div className="loading-icon" />
                    </div> : null}
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
                <i className="icon fa fa-th-list" onClick={()=>{
                  this.setState({isShowList:!this.state.isShowList})
                }} />
                <i className={`icon fa fa-${this.props.info.status == "PLAYING" ? "pause-circle" : "play-circle"}-o`} onClick={() => {
                    const status = this.props.info.status;
                    if (!status) {
                      return;
                    }
                    if (status === "PAUSED") {
                      this.props.info.audio.play();
                      this.props.chg_status({ status: "PLAYING" });
                      return;
                    }
                    this.props.info.audio.pause();
                    this.props.chg_status({ status: "PAUSED" });
                  }} />
                <i className="icon fa fa-step-forward" onClick={()=>{
                  this.props.next_song()
                }} />
              </div>
            </div>
            <div className="micro-time-track pos_rel">
              <div className="micro-time-track-color pos_abs" style={style} ref={dom => {
                  this.timeDom = dom;
                }} />
            </div>
            <PlayList isShowList={this.state.isShowList} closeList={() => {
                this.setState({ isShowList: false });
              }} />
          </BaseLay>;
            
    }
    
}

function mapStateToProps(state){
  return {info:state.player_reducer}
}
function mapDispatchToProps(dispatch,ownProps){
  return {
    chag_duration:(time)=>{
      const action={
        type:'CHG_STATUS',
        info:{duration:time}
      }
      dispatch(action)
    },
    chg_status:(info)=>{
      const action={
        type:'CHG_STATUS',
        info:{...info}
      }
      dispatch(action)
    },
    next_song:()=>{
      dispatch(actions.playByList());
    },
    random_song:()=>{
      dispatch(actions.playRandom());
    },
    sheet_song:()=>{
      dispatch(actions.playBySongSheet());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MicroPlayer);