import ApiHost from "../config/apihost";
import add_toast from "../commonjs/add_toast"

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
          console.log(data);
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
  }
};

export default actions;