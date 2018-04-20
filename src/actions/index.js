import ApiHost from "../config/apihost";
import add_toast from "../commonjs/add_toast"


function isInArray(array,obj){
  let isHasFlag;
   array.forEach((val,index) => {
     if (val.id === obj.id) {
       isHasFlag = index;
       return false;
     }
   });
   return isHasFlag;
}

const actions = {
  proxy_login: function(args) {
    return function(dispatch, getState) {
      const state = getState();
      if (state.login_reducer.userId) {
        return;
      }
    dispatch({
      type: "CHG_MODAL",
      info: { modalName: "login", isShowModal: true }
    });
 
    };
  },
  login:function(args){
    return function(dispatch, getState) {
      fetch(`${ApiHost}${args["url"]}`)
        .then(data => {
          if (!data.ok){
            return data.json().then(json => Promise.reject(json));
          }
          return data.json()
        })
        .then(json => {
          const { nickname, userId, avatarUrl } = json.profile;
          dispatch({
            type: "LOGIN",
            info: { nickname, userId, avatarUrl }
          });
          dispatch({
            type: "CHG_MODAL",
            info: {modalName:'',isShowModal:false}
          });
           add_toast(dispatch, {
             type: "ADD_TOAST",
             info: { type: "success", msg: '登录成功', isShow: true }
           });
           localStorage.setItem("userId", userId);
           localStorage.setItem("nickname", nickname);
           localStorage.setItem("avatarUrl", avatarUrl);
        })
        .catch(data =>{
          add_toast(dispatch, {
            type: "ADD_TOAST",
            info: { type: "error", msg: data.msg, isShow: true }
          });
        })
    }
      
  },
  loginEx:function(args){
    return function (dispatch,getState){
      fetch(`${ApiHost}${args["url"]}`, { credentials: "include" })
        .then(data => {
          if (!data.ok) {
            return data.json().then(json => Promise.reject(json));
          }
          return data.json();
        })

        .then(json => {
           if (json.code&&json.code==301){
             return Promise.reject(json);
           }
           add_toast(dispatch, {
            type:'ADD_TOAST',
            info:{msg:'刷新成功',type:'success',isShow:true}
          })
           const userId = localStorage.getItem('userId')
           const nickname = localStorage.getItem("nickname");
           const avatarUrl = localStorage.getItem("avatarUrl");
           if (userId&&nickname&&avatarUrl){
             dispatch({
               type:'LOGIN',
               info:{userId,nickname,avatarUrl}
             })
           }
        })
        .catch(data => {
           add_toast(dispatch, {
             type: "ADD_TOAST",
             info: { msg: "刷新失败", type: "error", isShow: true }
           });
        });
    }
  },
  play_music(args,NoAddTolist){
    return function (dispatch,getState){
        const {id} = args;
        const {curr_info,audio}=getState().player_reducer;
        if (id===curr_info.id){
          audio.pause();
          audio.currentTime=0;
          audio.play();
        }else{
          dispatch({
            type: "CHG_STATUS",
            info: { status: "LOADING",curr_info:args.song||args }
          });
          fetch(`${ApiHost}/music/url?id=${id}`)
          .then(data=>data.json())
          .then(json=>{
            if (json.data&&json.data.length>=1){
              audio.src=json.data[0].url;
              audio.load();
              return new Promise((resolve,reject)=>{
                audio.addEventListener("canplaythrough",()=>{
                  resolve(json.data);
                });
              })
            }
          })
          .then((data)=>{
             const  song = args.song||args;
             console.log(song);
             const url = song.album.blurPicUrl;
             return new Promise((resolve,reject)=>{
               const img = new Image()
               img.src = url;
               img.onload=()=>{
                 resolve();
               }
             });
          })
          .then(()=>{
            audio.play();
            dispatch({type:'CHG_STATUS',info:{status:'PLAYING'}})
            return Promise.resolve()
          })
          .then(()=>{
            if (NoAddTolist){
              return 
            }
            const  song = args.song||args;
            const playList = getState().playlist_reducer.playlist;
            
            if (isInArray(playList,song)!==undefined) {
              return;
            }
            dispatch(actions.addSongToList(song))
          })
         
        }
    }
    
  },
  addSongToList(args) {
      return function(dispatch,getState){
        const song = args.song || args;
        const state = getState();
        const playList = state.playlist_reducer.playlist;
        const playerState = state.player_reducer.status;
        if (isInArray(playList, song)!==undefined) {
          add_toast(dispatch, {
            type: "ADD_TOAST",
            info: { type: "success", msg: "已存在于播放列表", isShow: true }
          });
            return;
        }
        dispatch({ type: "ADD_SONG", info: { ...song } });
        add_toast(dispatch, {
          type: "ADD_TOAST",
          info: { type: "success", msg: "成功添加到播放列表", isShow: true }
        });
        if (playerState===''){
          dispatch(actions.play_music(song));
        }
      }
  },
  deleteSong(args){
    return function (dispatch,getState){
      const song = args.song || args;
      const state = getState();
      const playList = state.playlist_reducer.playlist;
      const {audio,curr_info} =state.player_reducer
      if (curr_info.id===song.id){
        let index = isInArray(playList, song);
        let nextSong ;
        (index+1<(playList.length-1))?(nextSong={...playList[index+1]}):(nextSong={...playList[0]});
          if (nextSong.id===curr_info.id){
            audio.pause();
            audio.currentTime=0;
            dispatch({type:'CHG_STATUS',info:{curr_info:{},status:''}})
            dispatch({type:'DELETE_SONG',index:index})
            add_toast(dispatch, {
              type: "ADD_TOAST",
              info: { type: "success", msg: "移除成功", isShow: true }
            });
          }else{
            dispatch({ type: "DELETE_SONG", index: index });
            dispatch(actions.play_music(nextSong,true));
          }
      }else{
        let index = isInArray(playList,song)
        if (index!==undefined){
          dispatch({type:'DELETE_SONG',index:index})
          add_toast(dispatch, {
            type: "ADD_TOAST",
            info: { type: "success", msg: "移除成功", isShow: true }
          });
        }
        
      }
    }
  },
  playByList () {
    return function (dispatch,getState){
      const state = getState()
      const  {audio,curr_info} = state.player_reducer
      const  {playlist} = state.playlist_reducer
      const index = isInArray(playlist,curr_info);
      let nextSong;
      index + 1 <= playlist.length - 1 ? (nextSong = { ...playlist[index + 1] }) : (nextSong = { ...playlist[0] });
      if (nextSong.id===curr_info.id){
        return;
      }
      dispatch(actions.play_music(nextSong));
    }
    
  },
  playRandom(){
    return function (dispatch,getState){
       const state = getState();
       const { audio, curr_info } = state.player_reducer;
       const { playlist } = state.playlist_reducer;
       const index = isInArray(playlist, curr_info);
       let nextSong;
       const  indexList =[]
       playlist.forEach((val,idx)=>{
          idx!==index&&indexList.push(idx)
       })
       const nextIndex = indexList[Math.floor(Math.random()*indexList.length)]
       nextSong = playlist[nextIndex]
       dispatch(actions.play_music(nextSong,true))
    }
  },
  playBySongSheet(){
    return function(dispatch,getState){
      const state = getState();
      const { audio, curr_info } = state.player_reducer;
      const { playlist } = state.playlist_reducer;
      const index = isInArray(playlist, curr_info);
      let nextSong;
      if (index===playlist.length-1){
        return;
      }
      dispatch(actions.playByList());
    }
  }
};
export default actions;
