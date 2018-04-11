import React,{Component} from 'react'
import { withRouter } from "react-router-dom";
import classnames from 'classnames'
import {IndexBody,IndexFoot} from '../../layout/baseLay'
import MicroPlayer from "../../components/microPlayer";
import '../../commonStyles/singleSheet.css'

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
                by:街坊邻里
              </span>
            </div>
          </div>;
    }
}

class SingleSheet extends Component {
    constructor(props) {
        super(props)
        this.displayName='single-sheet'
    }
    componentDidMount () {
        
    }
    render (){
        const rest = {...this.props.location.state.param};
        console.log(this.props.location.param);
        return <div className={`page page-${this.displayName}`}>
            <IndexBody style={{ top: 0 }}>
              <SheetHeader {...rest}>
                <SheetTitle />
                <SheetDetail {...rest} />
              </SheetHeader>
            </IndexBody>
            <IndexFoot>
              <MicroPlayer />
            </IndexFoot>
          </div>;
    }
    
}

export default SingleSheet;
