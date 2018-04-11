import React, { Component } from "react";
import classnames from "classnames";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import '../commonStyles/pageHeader.css';

import BaseLay from "../layout/baseLay";


class PageHeader extends Component{
    constructor(props) {
        super(props)
        
        this.displayName = 'page-header'
    }

    render (){
        return <BaseLay displayName={this.displayName}>
            <div className="page-header-wrap">
              <Link to={this.props.path} className="page-header-left-icon">
                <i className="fa fa-arrow-left" />
              </Link>
              <p className="page-header-title">{this.props.title}</p>
            </div>
          </BaseLay>;
    }
    
}

export default withRouter(PageHeader);