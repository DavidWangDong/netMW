import React, { Component } from "react";
import classNames from "classnames";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PageHeader from '../../components/pageHeader'


//页头部分

function PageHeaderWrapper (props){
    const style = {
        width:'100%',
        height:'0.78rem',
        background:'#fff',
        top:0
    }

   
    return (<div className='pos_abs' style={style}>
            {props.children}
            </div>)
    
}



class DayRecommend extends Component{
    constructor(props) {
        super(props)
        this.displayName='day-recommend'
    }


    render (){
        return  <div className={`page page-${this.displayName} pos_rel`}>
                    <PageHeaderWrapper>
                        <PageHeader ></PageHeader>
                    </PageHeaderWrapper>
                </div>  
    }
    
}

export default DayRecommend