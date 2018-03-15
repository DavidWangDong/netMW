import React, { Component } from 'react'
import classnames from 'classnames'
import '../commonStyles/microPlayer.css'
import BaseLay from '../layout/baseLay'

class MicroPlayer extends Component{
    constructor(props) {
        super(props)
        this.displayName='micro-player'
    }
    render () {

        const style={
          width:'50%'
        }
        return <BaseLay displayName={this.displayName}>
            <div className="micro_player_wrap">
              <div className="song_info">
                <div className="song_avatar animate">
                  <img src="//tvax4.sinaimg.cn/default/images/default_avatar_male_180.gif" />
                </div>
                <div className="song_name_auth">
                  <p className="song_name">Super Love</p>
                  <p className="song_auth">魏延</p>
                </div>
              </div>
              <div className="song_opt">
                <i className="icon fa fa-th-list" />
                <i className="icon fa fa-play-circle-o" />
                <i className="icon fa fa-step-forward" />
              </div>
            </div>
            <div className="micro-time-track pos_rel">
              <div className="micro-time-track-color pos_abs" style={style} />
            </div>
          </BaseLay>;
            
    }
    
}


export default MicroPlayer;