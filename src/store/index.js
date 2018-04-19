import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import login_reducer from '../reducers/reducer_login'
import modal_reducer from "../reducers/redeucer_modal";
import player_reducer from "../reducers/reducer_player";
const reducer_list = {
  login_reducer,
  modal_reducer,
  player_reducer
};

const root_reducer = combineReducers(reducer_list);


const store = applyMiddleware(thunk,logger)(createStore)(root_reducer);

export default store;