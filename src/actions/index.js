import ApiHost from "../config/apihost";


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
          console.log(json);
          const { nickname, userId, avatarUrl } = json.profile;
          dispatch({
            type: "LOGIN",
            info: { nickname, userId, avatarUrl }
          });
          dispatch({
            type: "CHG_MODAL",
            info: {modalName:'',isShowModal:false}
          });
        })
        .catch(data =>{
          
          dispatch({
            type: "ADD_TOAST",
            info: { type: "error", msg: data.msg,isShow:true }
          });
          setTimeout(() => {
            dispatch({ type: "SHIFT_TOAST",info:null });
          }, 1000);
        })
    }
      
  },
  loginEx:function(args){
    fetch(`${ApiHost}${args["url"]}`, { credentials: "include" })
      .then(data => {
        if (!data.ok) {
          return data.json().then(json => Promise.reject(json));
        }
        return data.json();
      })
      .then(json => {
        console.log(json);
      })
      .catch(data => {
        console.log(data);
      });
  }
};

export default actions;
