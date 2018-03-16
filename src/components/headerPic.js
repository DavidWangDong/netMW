import React, { Component } from 'react'
import classnames from "classnames"
import BaseLay from '../layout/baseLay';
import '../commonStyles/headerPic.css'


class HeaderPic extends Component{
    constructor(props) {
        super(props)
        this.displayName = 'header-pic'
    }

    render () {
        const defau = {
            width:'100%',
            minHeight:'3.4rem',
            background:'-webkit-radial-gradient(50% 100%, ellipse farthest-corner, #d9f86e,#034102)'
        }
        const style = Object.assign({},defau,this.props.style)
        return <BaseLay displayName={this.displayName}>
            <div className={`${this.displayName} pos_rel animate`} style={style} >
                {this.props.children}
            </div>
          </BaseLay>;
    }
    
}

export default HeaderPic;