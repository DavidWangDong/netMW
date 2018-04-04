
const ADD_TOAST = 'ADD_TOAST';
const CHG_MODAL = "CHG_MODAL";

const initialState = {
    toast:[
        {
            isShow:false,
            msg:'',
        }
    ],
    modals:{
        modalName:'',
        isShowModal:false,
    }
}

function modal_reducer(previous = initialState, action) {
  switch (action.type) {
    case ADD_TOAST:
      return Object.assign({}, previous.toast.push(action.info));
      break;
    case CHG_MODAL:
      return Object.assign({}, previous.modals, action.info);
      break;
    default:
      return previous;
      break;
  }
}

export default modal_reducer