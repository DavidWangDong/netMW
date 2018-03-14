import React, { Component } from 'react'
import classname from'classnames'
import BaseLay from '../layout/baseLay'
import '../commonStyles/recommendList.css'
import "whatwg-fetch";
import ApiHost from '../config/apihost'



class SingleList extends Component {
    constructor(props) {
        super(props)
        
    }
    countFilter (count){
        let re;
        count>10000?(re=(count/10000).toFixed(1)+'万'):
        (re=count)
        return re;
    }
    render (){
        const {info} = this.props;
        const {picUrl, playCount, name } = info;
        return <div className="recommendItem">
            <div className="recommend_avatar pos_rel animate">
              <img src={picUrl} />
              <p className="recommendInfo pos_abs">
                <i className="icon iconfont icon-kefu" />
                <span>{this.countFilter(playCount)}</span>
                <i className="icon iconfont icon-bofang" />
              </p>
            </div>
            <p className="recommend_title">{name}</p>
          </div>;
    }
    
}



class RecommendList extends Component{
    constructor(props) {
        super(props)
        this.displayName = "recommend-list";
        this.state={
            dataList:[
                { name: "老夫的少女心 • 无前奏铃声", avatar: "http://p1.music.126.net/E5y2tQmIX5m0JPnPsXS8nA==/19226060323871079.jpg?param=140y140", playCount: "1000" },
                { name: "老夫的少女心 • 无前奏铃声", avatar: "http://p1.music.126.net/E5y2tQmIX5m0JPnPsXS8nA==/19226060323871079.jpg?param=140y140", playCount: "1000" },
                { name: "老夫的少女心 • 无前奏铃声", avatar: "http://p1.music.126.net/E5y2tQmIX5m0JPnPsXS8nA==/19226060323871079.jpg?param=140y140", playCount: "1000" },
                { name: "老夫的少女心 • 无前奏铃声", avatar: "http://p1.music.126.net/E5y2tQmIX5m0JPnPsXS8nA==/19226060323871079.jpg?param=140y140", playCount: "1000" },
                { name: "老夫的少女心 • 无前奏铃声", avatar: "http://p1.music.126.net/E5y2tQmIX5m0JPnPsXS8nA==/19226060323871079.jpg?param=140y140", playCount: "1000" },
                { name: "老夫的少女心 • 无前奏铃声", avatar: "http://p1.music.126.net/E5y2tQmIX5m0JPnPsXS8nA==/19226060323871079.jpg?param=140y140", playCount: "1000" },
            ],
            pageCount:8,
            currPage:8
        }
        this.api = "/personalized";
    }


    
    componentWillMount (){
        fetch(`${ApiHost}${this.api}`)
          .then(data => data.json())
          .then(json => {
            console.log(json);
            this.setState({ dataList: json.result });
          });
        
    }

    render () {
        return <BaseLay displayName={this.displayName}>
            <div className="before recommend">

                 {this.state.dataList.map(
                     (val,index)=>{
                         const {pageCount,currPage} = this.state
                        let obj = index < (pageCount * currPage)?(<SingleList info = {val} key={'recommend_'+index}></SingleList>):null;
                        return obj;
                    }
                )}
              
            </div>
          </BaseLay>;
    }
    
}

export default RecommendList;