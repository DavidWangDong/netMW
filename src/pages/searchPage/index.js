import React, { Component } from "react";
import classNames from "classnames";
import { IndexHeader, IndexFoot, IndexBody } from "../../layout/baseLay";
import PageHeader from "../../components/pageHeader";
import Search from "../../components/search"
import {SearchMusic} from "../index/index"
import {ListHeader} from "../../components/list"
import ApiHost from "../../config/apihost"
import RecommendSongList from "../../components/recommendSong"


// 别名
const ContentWrap = SearchMusic;

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.displayName = "search-page";
    this.state={
      searchDataList:[],
      keyWord:''
    }
  }

  componentDidMount () {
    const keyWord = this.props.location.state.keyWord;
    this.setState({keyWord:keyWord})
    this.getDataList(keyWord);
  }

  getDataList (keyWord) {
    this.setState({ keyWord: keyWord });
    fetch(`${ApiHost}/search?keywords=${keyWord}`)
    .then(data=>data.json())
    .then(json=>{
      console.log(json);
      try {
         const songs = json.result.songs;
         this.setState({ searchDataList: [...songs] });
      } catch (error) {
          return Promise.reject();
      }
     
    })
    .catch(()=>{
      console.warn('搜索错误');
    })
  }

  render() {
    return <div className={`page page-${this.displayName}`}>
        <IndexHeader style={{ background: "#fff", height: "0.78rem" }}>
          <PageHeader title={`搜索'${this.state.keyWord}'`} path="/index" />
        </IndexHeader>
        <IndexBody>
          <SearchMusic style={{ marginTop: "0.1rem" }}>
            <Search getData={keyWord => {
                this.getDataList(keyWord);
              }} />
          </SearchMusic>
          <ContentWrap style={{ width: "90%" }}>
            <ListHeader listTitle="搜索结果" />
          </ContentWrap>
          <ContentWrap style={{ width: "90%", marginTop: "0.1rem" }}>
            <RecommendSongList iconShow={{ play: false, heart: true, plus: true }} getDataFlag={true} dataList={this.state.searchDataList} />
          </ContentWrap>
        </IndexBody>
      </div>;
  }
}


export default SearchPage;