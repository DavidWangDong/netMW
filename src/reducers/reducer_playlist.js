/**
 * 列表页reducer
 */

/**
 * 1、添加歌曲到列表
 * 2、移除列表内歌曲
 * 3、清空列表
 * 4、切换播放列表
 */

 const  ADD_SONG = 'ADD_SONG'
 const  DELETE_SONG = 'DELETE_SONG'
 const  DELETE_ALL_SONG = "DELETE_ALL_SONG"
 const  EX_SONG_LIST = 'EX_SONG_LIST'


 const initialState={
     playlist:[]
 }

 function reducer (previous=initialState,action){
     switch (action.type) {
         case ADD_SONG:
         let tmp_list1=[...previous.playlist]
         tmp_list1.push(action.info)
         return Object.assign({}, previous, { playlist: tmp_list1 });
         break;

         case DELETE_SONG:
            let tmp_list2 = [...previous.playlist]
            tmp_list2.splice(action.index,1);
            return Object.assign({}, previous, { playlist: tmp_list2 });
         break;

         case DELETE_ALL_SONG:
            return Object.assign({},previous,{playlist:[]})
         break;

         case EX_SONG_LIST:
            return Object.assign({},previous,{playlist:[...action.info]})
         break;
       default:
            return previous;
         break;
     }
 }

 export default reducer;