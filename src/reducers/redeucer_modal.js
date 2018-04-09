
const ADD_TOAST = 'ADD_TOAST';
const SHIFT_TOAST = "SHIFT_TOAST";
const CHG_MODAL = "CHG_MODAL";

const initialState = {
    toast:[
    ],
    modal:{
        modalName:'',
        isShowModal:false,
    }
}

function modal_reducer(previous = initialState, action) {
  switch (action.type) {
    case ADD_TOAST:
      let last = [...previous.toast]
      last.push(action.info)
      return Object.assign({}, previous,{toast:last});
      break;
    case SHIFT_TOAST:
      let last1 = [...previous.toast];
      last1.shift();
      return Object.assign({},previous,{toast:last1})
    case CHG_MODAL:
      return Object.assign({}, previous, {modal:action.info});
      break;
    default:
      return previous;
      break;
  }
}

export default modal_reducer