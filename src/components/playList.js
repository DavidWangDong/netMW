import React, { Component } from "react";
import classNames from "classnames";
import '../commonStyles/playList.css'
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import RecommendSong from './recommendSong'
import {connect} from 'react-redux'

class Play extends Component {
  constructor(props) {
    super(props);
    this.displayName = "playList";
    this.state={
      hoverHeight:0
    }
  }
  componentDidMount(){
    this.setState({hoverHeight:this.hoverDom.getBoundingClientRect().top+'px'})
  }
  render() {
    const style = { height: this.props.isShowList?this.state.hoverHeight:0  };
    return <div className={`component component-${this.displayName} pos_abs`} ref={dom => {
          this.hoverDom = dom;
        }}>
        <ReactCSSTransitionGroup 
          transitionName='fadeIn'
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
           {this.props.isShowList ? <div style={style} className="playlist-hover pos_abs" onClick={() => {
              this.props.closeList && this.props.closeList();
            }} /> : ""}
        </ReactCSSTransitionGroup>
       
           <ReactCSSTransitionGroup 
            transitionName='slideInUp'
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
          {this.props.isShowList ? <div className="playlist-inner pos_abs">
              <div className="playlist-header">
                <span className="opt-collect">收藏全部</span>
                <span className="opt-count">播放列表({this.props.list.length})</span>
                <span className="opt-clear">清空</span>
              </div>
              <div className="playlist-wrap">
                  <RecommendSong getDataFlag={true} dataList={this.props.list} clickIgnore={true} iconShow={{play:false,heart:true,plus:false,times:true}}>

                  </RecommendSong>
              </div>
            </div> : ""}
        </ReactCSSTransitionGroup>
      </div>;
  }
}

function mapStateToProps(state){
  return {list:state.playlist_reducer.playlist}
}

export default connect(mapStateToProps)(Play);