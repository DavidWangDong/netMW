import React, { Component } from "react";
import classNames from "classnames";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PageHeader from '../../components/pageHeader'
import MicroPlayer from "../../components/microPlayer.js";
import HeaderPic from '../../components/headerPic.js';
import RecommendSongList from "../../components/recommendSong";
import { IndexHeader, IndexFoot, IndexBody } from "../../layout/baseLay";


// 头图
function HeaderWrap (props){
    const defau = {
        width:'95%',
        margin:'0 auto',
        marginTop:'0.15rem'
    }
    const style = Object.assign({},defau,props.style)
    return <div style={style}>{props.children}</div>;
}

function  ListWrap(props) {
    const style = {
        marginTop:'0.46rem'
    }
    return <HeaderWrap style={style}>
        {props.children}
    </HeaderWrap>
}


// 信息
function DayRecommendInfo(props){
    const defau = {
        width:'100%',
        height:'100%',
        top:0,
        left:0,
        display:'flex',
        alignItems:'center'
    }
    const style = Object.assign({}, defau, props.style);
    const style2 = {
        width:'30%',
    }
     const style3 = { 
         width: "50%" ,
         fontSize:'0.27rem',
         textAlign:'left',
         color:'#dbf9d3'
    };
    return <div style={style} className="before pos_abs">
        <span className="day-time" style={style2}>
          <i className="icon iconfont icon-rili5" style={{ fontSize: "1.2rem", color: "#fbf86a" }} />
        </span>
        <p className="recommendDiscription" style={style3}>
          {props.info}
        </p>
      </div>;
}


class DayRecommend extends Component{
    constructor(props) {
        super(props)
        this.displayName='day-recommend'
    }


    render (){
        return <div className={`page page-${this.displayName} pos_rel`}>
            <IndexHeader style={{ height: "0.78rem", background: "#fff" }}>
              <PageHeader path="/index" title="每日推荐" />
            </IndexHeader>
            <IndexBody style={{ top: "0.8rem" }}>
              <HeaderWrap>
                <HeaderPic>
                  <DayRecommendInfo info="根据你的音乐口味生成每日六点更新" />
                </HeaderPic>
              </HeaderWrap>
              <ListWrap>
                <RecommendSongList api="/recommend/songs" listKey="recommend" iconShow={{play:false,heart:true,plus:true}} />
              </ListWrap>
            </IndexBody>
            {/* <IndexFoot>
              <MicroPlayer />
            </IndexFoot> */}
          </div>;  
    }
    
}

export default DayRecommend