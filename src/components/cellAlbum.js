import React,{Component} from 'react'
import classnames from 'classnames'
import BaseLay from '../layout/baseLay'
import "../commonStyles/CellAlbum.css";

class CellAlbum extends Component{
    constructor(props) {
        super(props)
        this.displayName='cell-album'    
    }

    render () {
        return <BaseLay displayName={this.displayName}>
            <div className="cell_album_avatar animate">
              <img src={this.props.avatar} />
            </div>
            <div className="cell_album_info">
              <span className="album_title">{this.props.title}</span>
              <br />
              <span className="album_dsec">{this.props.detail}</span>
            </div>
            <div className="cell_album_opt">
              <i className="fa fa-play" />
              {
                  this.props.isShowTrash?(<i className="fa fa-trash-o " />):null
              }
              
            </div>
          </BaseLay>;
    }
    
}



export default CellAlbum