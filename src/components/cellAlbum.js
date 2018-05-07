import React,{Component} from 'react'
import classnames from 'classnames'
import BaseLay from '../layout/baseLay'
import { Link } from "react-router-dom";
import "../commonStyles/CellAlbum.css";

class CellAlbum extends Component{
    constructor(props) {
        super(props)
        this.displayName='cell-album'    
    }
    countFilter (count){
        let re;
        count>10000?(re=(count/10000).toFixed(1)+'万'):
        (re=count)
        return re;
    }
    render () {
        const { info } = this.props;
        const { picUrl, playCount, name, id, coverImgUrl } = info;
        
        return <BaseLay displayName={this.displayName}>
            <Link className="clee_album_link" to={{ pathname: "/singleSheet", state: { fromDashboard: true, param: { picUrl: picUrl || coverImgUrl, playCount: this.countFilter(playCount), name, id } } }}>
              <div className="cell_album_avatar animate">
                <img src={`${this.props.avatar}?param=200y200`} />
              </div>
              <div className="cell_album_info">
                <span className="album_title">{this.props.title}</span>
                <br />
                <span className="album_dsec">{this.props.detail}</span>
              </div>
            </Link>
            <div className="cell_album_opt">
              <i className="fa fa-play" />
              {this.props.isShowTrash ? <i className="fa fa-trash-o " /> : null}
            </div>
          </BaseLay>;
    }
    
}



export default CellAlbum