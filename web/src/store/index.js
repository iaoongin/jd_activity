import { createStore } from "redux";
import reducer from "./reducer";
import { HIDE_LOADING, SHOW_LOADING } from "../store/actions";

const store = createStore(reducer);

export function hideLoading() {
  store.dispatch({
    type: HIDE_LOADING
  });
}

export function showLoading() {
  store.dispatch({
    type: SHOW_LOADING
  });
}

export default store;
