import React, { Component } from 'react';
import classNames from 'classnames'
import { BrowserRouter as Router , Route, Link } from "react-router-dom";
import Index from "./pages/index/index"
import DayRecommend from "./pages/dayRecommend/index"
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount () {
    
    this.fixHeight();


  }
  
  fixHeight () {
    let r1 = window.innerWidth/640;
    if (r1<1){
        document.getElementsByTagName('html')[0].style.fontSize=100*r1+'px';
    }else {
        document.getElementsByTagName("html")[0].style.fontSize = 100 + "px";
    }
    document.getElementsByTagName('body')[0].style.height=window.innerHeight+'px';
  }


  render() {
    return  <div className="App" style={{ height: window.innerHeight }}>
              <Route path="/index" component={Index} />
              <Route path="/dayRecommend" component={DayRecommend} />
            </div>;
  }
}
export default App;
