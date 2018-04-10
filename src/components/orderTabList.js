import React,{Component} from 'react'
import classnames from 'classnames'
import BaseLay from '../layout/baseLay'
import CellAlbum from './cellAlbum'
import ApiHost from '../config/apihost'
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {timeout} from '../commonjs/add_toast'



function OrderTabWrap(props){
    const defau = {
        width:'85%',
        boxSizing:'border-box',
        margin:'0 auto'
    }
    const style = Object.assign({},defau,props.style)
    return <div style={style} className="before">
            {props.children}
    </div>
}



class OrderTabList extends Component {
    constructor(props) {
        super(props)
        this.displayName="order-tab-list"
        this.api='/top/list'
        this.state={
            orderList:[

            ],
            indexs:[
                0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23
            ]
        }
        this.currIndex = 0;
    }

    componentDidMount () {
        this.getListByIdx(this.currIndex);
    }

    getListByIdx (idx){
        return fetch(`${ApiHost}${this.api}?idx=${idx}`, {
          credentials: "include"
        })
          .then(data => {
                const prom = data.json();
                // window.$prom = prom;
                return prom;
            })
          .then(json => {
            const { playlist } = json;
            const news = [...this.state.orderList]
            news.push(playlist);
            this.setState({ orderList: news });
            this.currIndex++;
            if (this.currIndex < this.state.indexs.length){
                timeout(200).then(()=>this.getListByIdx(this.state.indexs[this.currIndex]));
            }
            
          })
          .catch(data => {
            console.log(data);
          });
    }

    render (){
        const cellAlbum_list = this.state.orderList.map(
          (val, index) => {
            const { coverImgUrl, name, trackCount } = val;
            const rest = { title: name, avatar: coverImgUrl, detail: `共${trackCount}首`, isShowTrash: true };
            return <CellAlbum {...rest} key={`order_index_${index}`} />;
          }
        );
        return <BaseLay displayName={this.displayName}>

           
            <OrderTabWrap>
                  <ReactCSSTransitionGroup
                  transitionName="slideLeft"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}
                >
                {cellAlbum_list}

             </ReactCSSTransitionGroup>
              
            </OrderTabWrap>
          </BaseLay>;
    }

    
}

export default OrderTabList;