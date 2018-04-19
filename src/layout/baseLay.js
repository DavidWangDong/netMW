import React, { Component } from 'react'
import '../commonStyles/indexBody.css'

class BaseLay extends Component {
    constructor(props) {
        super(props)
        
    }

    render () {
        return <div className={`component ${this.props.displayName} before`}>
                    <div className={`${this.props.displayName}-inner`}>
                        {this.props.children}
                    </div>
               </div>
    }
    
}


// 头部
function  IndexHeader (props){
   
  const defau = { width: "100%", height: "0.9rem",left:0,top:0,borderBottom:'3px solid #eee' };
  const style = Object.assign({}, defau, props.style);
   return <div style={style} className="pos_fix">
       {props.children}
     </div>;
}

// 内容部分
function IndexBody (props) {
  const defau = { width: "100%", paddingTop: "1rem",paddingBottom:'1.23rem'};
  const style = Object.assign({}, defau, props.style);
  return <div style={style} className="IndexBody">
      <div style={{background:'#fff'}}>{props.children}</div>
    </div>;
}


// 小型播放器
function IndexFoot(props) {
  const defau = {
    height: "1.23rem",
    background: "#fff",
    bottom: 0,
    width:'100%'
  };
  const style = Object.assign({}, defau, props.style);
  return (
    <div className="pos_fix" style={style}>
      {props.children}
    </div>
  );
}

export { IndexHeader }
export { IndexBody }
export { IndexFoot }

export default BaseLay