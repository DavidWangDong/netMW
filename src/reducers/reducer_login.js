const LOGIN = 'LOGIN';
const LOGINOUT = "LOGINOUT";

const initialState = {
  userId: "",
  avatarUrl: "//tvax4.sinaimg.cn/default/images/default_avatar_male_180.gif",
  nickname: "未登录"
};
// 登录
function login_reducer (previous = initialState, action) {
  switch (action.type) {
    case LOGIN:
      let { userId, avatarUrl, nickname } = action.info;
      return Object.assign({}, previous, { userId, avatarUrl, nickname });
      break;
    case LOGINOUT:
      return Object.assign({}, initialState);
      break;
    default:
      return previous;
      break;
  }
}

export default login_reducer;

