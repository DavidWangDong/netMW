import React, { Component } from 'react'
import classname from 'classnames'
import BaseLay from '../layout/baseLay'



class ListHeader extends Component{
    constructor(props) {
        super(props)
        this.state={
            isShowAll:false
        }
    }
    

    

    render (){
        const style1 = {
            width:'100%',
            paddingBottom:'0.1rem',
            borderBottom:'1px solid #ccc',
            display:'flex',
            justifyContent:'space-between',
            color:'#1ba40b'
        },
        style2 = {
            fontSize:'0.3rem',
        },
        style3 = {
            transition:'all .5s ease',
            transform:`rotate(${this.state.isShowAll?'180':'0'}deg)`,
            alignSelf: 'center',
            fontSize:'0.4rem'
        }
        return <div style={style1} onClick={() => {
              this.setState({ isShowAll: !this.state.isShowAll });
              this.props.foldOption(!this.state.isShowAll);
            }}>
            <span style={style2}>{this.props.listTitle}</span>
            <i className={`icon fa fa-angle-up`} style={style3} />
          </div>;
    }
}




class List extends Component {
    constructor(props) {
        super(props)
        this.displayName = "list"
        this.state ={
            isShowAll:false
        }
    }
    
    render () {
        return <BaseLay displayName={this.displayName}>
            <ListHeader listTitle={this.props.listTitle} foldOption={flag => {
                this.setState({isShowAll:flag})
              }} />
            <div
              style={{
                height: this.state.isShowAll
                  ? "auto"
                  : this.props.minHeight,
                  overflow:'hidden'
              }}
            >
              {this.props.children}
            </div>
          </BaseLay>;
    }
    
}

export default List