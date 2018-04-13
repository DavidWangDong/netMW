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

    const style = Object.assign({}, defau, props.style, bg);
     const blurBg = { background: `url(${props.picUrl}) no-repeat center top`, backgroundSize: "cover" };
    return <div style={style} className="before pos_rel">
        <div className="sheet-blur-background pos_abs" style={blurBg} />
        {props.children}
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
    }

    render () {
        return <div className="sheet-title pos_fix">
            <div className="sheet-inner">
              <span onClick={()=>{this.props.history.goBack()}}>
                <i className="fa fa-arrow-left" />
              </span>
              <div className="sheet-name">
                {this.props.title ? this.props.title : "歌单"}
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
       
        return <div className="sheet-detail">
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
            pageList:[]
        }
        this.api = "/playlist/detail";
    }
    componentDidMount () {
        fetch(`${ApiHost}${this.api}?id=${this.props.location.state.param.id}`, { credentials: "include" })
        .then(data=>data.json())
        .then(json=>{
            this.setState({song_sheet:{...json.result}});
            const list = [...json.result.tracks.slice(0, 20)];
            this.setState({ pageList: list });
        })
    }

    
    render (){
        const rest = {...this.props.location.state.param};
        const author = this.state.song_sheet.creator?this.state.song_sheet.creator.nickname:'';
        return <div className={`page page-${this.displayName}`}>
            <IndexBody style={{ top: 0 }}>
              <SheetHeader {...rest}>
                <SheetTitle />
                <SheetDetail {...rest} author={author} />
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
