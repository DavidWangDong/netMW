import React, { Component } from "react";
import classNames from "classnames";
import { IndexHeader, IndexFoot, IndexBody } from "../../layout/baseLay";
import PageHeader from '../../components/pageHeader'
import MicroPlayer from '../../components/microPlayer'
import OrderTabList from "../../components/orderTabList";


class OrderList extends Component{
    constructor(props) {
        super(props)
        this.displayName="orderList"
    }


    render () {
        return <div className={`page page-${this.displayName}`}>
                    <IndexHeader style={{background:'#fff',height:'0.78rem'}}>
                        <PageHeader title="排行榜" path='/index'></PageHeader>
                    </IndexHeader>
                    <IndexBody style={{top:'0.8rem'}}>
                        <OrderTabList></OrderTabList>
                    </IndexBody>
                    <IndexFoot>
                        <MicroPlayer></MicroPlayer>
                    </IndexFoot>
               </div>
    }
    
}

export default OrderList;
