
function timeout (time){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve();
        }, time);
    })
}


export {timeout};


export default function add_toast (dispatch,action){
    dispatch(action);
    timeout(1000).then(()=>{
        dispatch({
            type:'SHIFT_TOAST',
            info:null
        })
    })
} 