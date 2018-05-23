// 播放器的reducer

const CHG_STATUS='CHG_STATUS'
const CHG_MODEL = "CHG_MODEL";

// 播放器状态

/**
 * 1、播放状态
 * 2、停止状态
 * 3、暂停状态
 * 4、加载状态
 * 5、切换状态
 */
const PLAYING = 'PLAYING'
const PAUSED = 'PAUSED'
const STOP = 'STOP'
const LOADING = "LOADING"
const EX_SONG = "EX_SONG"

// 播放器歌曲播放模式
/**
 * 1、列表循环
 * 2、列表播放
 * 3、单曲循环
 * 4、乱序播放
 */

const ORDER_SONG_SHEET_CIRCLE = "ORDER_SONG_SHEET_CIRCLE"
const ORDER_SONG_SHEET = "ORDER_SONG_SHEET"
const SINGLE_SONG_CIRCLE = 'SINGLE_SONG_CIRCLE'
const RANDOM_PLAY_CIRCLE = 'RANDOM_PLAY_CIRCLE'
const audio = new Audio;
audio.loop=false;

const initialState = {
  status: "",
  model: "ORDER_SONG_SHEET_CIRCLE",
  curr_info: {},
  audio: audio,
  duration: 0
};

function player_reducer(previous=initialState,action){
    switch (action.type) {
      case CHG_STATUS:
        return Object.assign({}, previous, action.info);
        break;
      case CHG_MODEL:
        return Object.assign({}, previous, action.info);
        break;
      default:
        return previous;
        break;
    }
}
export default player_reducer;




