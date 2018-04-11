import React, { Component } from "react";
import classNames from "classnames";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PageHeader from "../../components/pageHeader";
import MicroPlayer from "../../components/microPlayer.js";
import HeaderPic from "../../components/headerPic.js";
import {ListHeader} from "../../components/list";
import {connect} from 'react-redux'
import { IndexHeader, IndexFoot, IndexBody } from "../../layout/baseLay";
import ApiHost from '../../config/apihost'
import add_toast from "../../commonjs/add_toast";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import CellAlbum from '../../components/cellAlbum'


function SheetListWrap(props){
        const defau = {
            width:'90%',
            margin:'0 auto',

        }
        const style =Object.assign({},defau,props.style);
        return <div style={style} className="before">
            {props.children}
        </div>

}


function SingleSheetContain (props){
    return <div style={{width:'100%',marginTop:'0.5rem'}}>
        {props.children}
    </div>
}


class SongSheet extends Component {
    constructor(props) {
        super(props)
        this.displayName='song-sheet'
        this.state={
            ownList:[],
            collectionList:[]
        }
        this.api = "/user/playlist";
    }
    
    componentDidMount () {
        fetch(`${ApiHost}${this.api}?uid=${this.props.userInfo.userId}`, { credentials: "include" })
        .then(data=>{
            if (!data.ok){
                return Promise.reject({type:'ADD_TOAST',info:{type:'error',msg:'获取数据出错,请稍后再试',isShow:true}})
            }
            return data.json()
        })
        .then(json=>{
          if (json.code==400){
                return Promise.reject({type:'ADD_TOAST',info:{type:'error',msg:'获取数据出错,请稍后再试',isShow:true}})
            }
            const { playlist } = json;
            playlist.forEach(val => {
                const creator_id = val.creator.userId;
                if (creator_id==this.props.userInfo.userId){
                    const news = [...this.state.ownList]
                    news.push(val);
                    this.setState({ ownList: news });
                }else{
                    const news2 = [...this.state.collectionList]
                    news2.push(val)
                    this.setState({collectionList:news2});
                }
                
            });
        })
        .catch((arg)=>{
            console.log(arg);
            this.props.emit_message(arg);
        })
    }

    render () {
        const ownLists = this.state.ownList.map((val,index) =>{
            const rest = { avatar: val.coverImgUrl, title: val.name, detail: `${val.trackCount}首`,isShowTrash:false };
            
            return <CellAlbum {...rest} key={`own_sheet_${index}`}/>});
        const collectonLists = this.state.collectionList.map((val,index)=>{
            const rest = { avatar: val.coverImgUrl, title: val.name, detail: `${val.trackCount}首`, isShowTrash: false };

            return <CellAlbum {...rest} key={`collection_sheet_${index}`} />;
        })
        return <div className={`page page-${this.displayName}`}>
            <IndexHeader style={{ background: "#fff", height: "0.78rem" }}>
              <PageHeader title="我的歌单" path="/index" />
            </IndexHeader>
            <IndexBody style={{ top: "0.8rem" }}>
              <SheetListWrap>
                <SingleSheetContain>
                  <ListHeader listTitle={`创建的歌单`} />
                  <ReactCSSTransitionGroup transitionName="fadeIn" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    {ownLists}
                  </ReactCSSTransitionGroup>
                </SingleSheetContain>
                <SingleSheetContain>
                  <ListHeader listTitle={`收藏的歌单`} />
                  <ReactCSSTransitionGroup transitionName="fadeIn" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    {collectonLists}
                  </ReactCSSTransitionGroup>
                </SingleSheetContain>
              </SheetListWrap>
            </IndexBody>
            <IndexFoot>
              <MicroPlayer />
            </IndexFoot>
          </div>;
    }
    
}
function mapStateToProps (state){
    return {
        userInfo:state.login_reducer
    }
}

function mapDispatchToProps (dispatch){
    return {
        emit_message:(arg)=>{add_toast(dispatch,arg)}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SongSheet);
