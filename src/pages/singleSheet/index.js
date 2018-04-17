import React,{Component} from 'react'
import { withRouter } from "react-router-dom";
import classnames from 'classnames'
import {IndexBody,IndexFoot} from '../../layout/baseLay'
import MicroPlayer from "../../components/microPlayer";
import '../../commonStyles/singleSheet.css'
import ApiHost from '../../config/apihost'
import SheetSongList from '../../components/recommendSong'

function SheetHeader (props){
    const defau = {
        width:'100%',
        height:'3.38rem',
        overflow:'hidden'
    }
    const bg ={ background: "rgb(0, 0, 0,0.2)" };

    const style = Object.assign({}, defau, props.style);
    const style1 = Object.assign({}, defau, props.style, {background:'#fff'});
    const style2 = Object.assign({}, defau, props.style, bg);
     const blurBg = { background: `url(${props.picUrl}) no-repeat center top`, backgroundSize: "cover" };
    return <div style={style} className="before pos_rel headPicerWrap">
        <div style={style1} className={`headPicer before pos_rel`}>
          <div style={style2} className="before pos_rel">
            <div className="sheet-blur-background pos_abs" style={blurBg} />
            {props.children}
          </div>
        </div>
      </div>;
}

function ListWrap (props) {
    const defau = {
        width:'90%',
        margin:'0 auto'
    }
    const style = Object.assign({},defau,props.style)
    return <div style={style}>
        {props.children}
    </div>
}

class SheetTitle extends Component{
    constructor(props) {
        super(props)
        this.scrollDom = null;
        this.state = {
            wrapStyle:{
                width:'700%',
            }
        }
        this.shouldScroll = false;
    }

    
    componentDidMount () {
        // 计算宽度
        const offsetWidth = parseInt(this.scrollDom.offsetWidth);
        const currWidth = parseInt(this.scrollDom.querySelector(".sheet-name-lunbo-inner p").offsetWidth);
        this.scrollDom.querySelectorAll(".sheet-name-lunbo-inner p").forEach((val)=>{
            val.style.width="50%"
        })
        let wrapWidth;
        console.log(currWidth,offsetWidth)
        if (currWidth > offsetWidth) {
            wrapWidth = currWidth*2.2;
            this.shouldScroll=true;

        }else{
            wrapWidth = currWidth*2
            this.shouldScroll = false;
        }

        this.setState({wrapStyle:{width:wrapWidth+'px'}})
    }

    

    render () {

        return <div className="sheet-title pos_fix">
            <div className="sheet-inner">
              <span onClick={()=>{this.props.history.goBack()}}>
                <i className="fa fa-arrow-left" />
              </span>
              <div className="sheet-name pos_rel">
                
                    <p>歌单</p>
                    <div className="sheet-name-lunbo" ref={(dom)=>{this.scrollDom=dom}}>
                        <div className="sheet-name-lunbo-inner" style={this.state.wrapStyle}>
                            <p>{this.props.name}</p>
                            <p>{this.props.name}</p>
                        </div>
                    </div>
                
              </div>
            </div>
          </div>;
    }
    
}

SheetTitle = withRouter(SheetTitle);


class SheetDetail extends Component {
    constructor(props) {
        super(props)
    }
    render () {
       const style = {
           opacity:this.props.opacity
       }
        return <div className="sheet-detail" style={style}>
            <div className="animate sheet-avatar pos_rel">
              <img src={this.props.picUrl} />
              <p className="sheet-detail-hover pos_abs">
                  <i className="fa fa-headphones" />
                  <span className="sheet-play-count">
                    {this.props.playCount}
                  </span>
              </p>
            </div>
            <div className="sheet-desc">
              <span className="sheet-list-name">
                {this.props.name}
              </span>
              <span className="sheet-author">
                by:{this.props.author}
              </span>
            </div>
          </div>;
    }
}

class SingleSheet extends Component {
    constructor(props) {
        super(props)
        this.displayName='single-sheet'
        this.state={
            song_sheet:{

            },
            currPage:0,
            pageList:[],
            isFix:false,
            opacity:1,
            textLunBo:0
        }
        this.api = "/playlist/detail";
        this.scrollDom = null;
    }
    componentDidMount () {
        fetch(`${ApiHost}${this.api}?id=${this.props.location.state.param.id}`, { credentials: "include" })
        .then(data=>data.json())
        .then(json=>{
            this.setState({song_sheet:{...json.result}});
            const list = [...json.result.tracks.slice(0, 20)];
            this.setState({ pageList: list });
        })
        this.scrollDom = this.scrollDom.querySelector('div:first-child')
        const self = this;


        const titleArea = this.scrollDom.querySelector(".sheet-title");
        const headPicer = this.scrollDom.querySelector(".headPicerWrap");
        const headPicerItem = this.scrollDom.querySelector(".headPicer");
        const detail = this.scrollDom.querySelector(".sheet-detail");
        const sheetAvatar = this.scrollDom.querySelector(".sheet-avatar").getBoundingClientRect();
        const name_p = this.scrollDom.querySelector(".sheet-name p");
        const name_lunbo = this.scrollDom.querySelector(".sheet-name-lunbo");
        const pt = titleArea.getBoundingClientRect();
        const ph = headPicer.getBoundingClientRect();
        const maxBot = this.scrollDom.querySelector(".headPicerWrap").getBoundingClientRect().bottom;
        this.scrollDom.addEventListener('scroll',function (e){
            // 检查滚动头部动作
            if (sheetAvatar.top<0){
                name_p.style.opacity = 0;
                name_lunbo.style.opacity = 1;
            }else{
                name_p.style.opacity = 1;
                name_lunbo.style.opacity = 0;
            }
            console.log(ph.bottom - pt.bottom);
            if (ph.bottom-pt.bottom<10){
                 
                if (headPicerItem.style.position != "fixed"){
                    headPicerItem.style.position = "fixed"
                    headPicerItem.style.top = "-2.6rem"
                }
                !self.timerId && (self.timerId=setInterval(()=>{
                    
                },1000/60))
            }else{
                if (headPicerItem.style.position == "fixed" ){
                    headPicerItem.style.position = "relative"
                    headPicerItem.style.top = "0"
                }
                
            }
            

            let MaxDis = maxBot - pt.bottom;
            let dis = ph.bottom - pt.bottom;
            let op = (dis / MaxDis).toFixed(1);
            detail.style.opacity = op < 0 ? 0 : op;
            // self.setState({ opacity: op<0?0:op });
            // 检查是否滚动到底部
            


        })
    }

    
    render (){
        const rest = {...this.props.location.state.param};
        const author = this.state.song_sheet.creator?this.state.song_sheet.creator.nickname:'';
        return <div className={`page page-${this.displayName}`} ref={dom => {
              this.scrollDom = dom;
            }}>
            <IndexBody style={{ top: 0 }}>
              <SheetHeader {...rest}>
                <SheetTitle {...rest} textLunBo={this.state.textLunBo} />
                <SheetDetail {...rest} author={author} opacity={this.state.opacity} />
              </SheetHeader>
              <ListWrap style={{ marginTop: "0.2rem" }}>
                <SheetSongList dataList={this.state.pageList} getDataFlag={true} />
              </ListWrap>
            </IndexBody>
            <IndexFoot>
              <MicroPlayer />
            </IndexFoot>
          </div>;
    }
    
}

export default SingleSheet;
