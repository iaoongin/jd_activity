import { SHOW_LOADING, HIDE_LOADING } from "./actions";

const defaultState = {
  loading: false,
  showMsg: false
};

export default (state = defaultState, action) => {
  let stateCopy = { ...state };
  switch (action.type) {
    case SHOW_LOADING: {
      stateCopy.loading = true;
      break;
    }
    case HIDE_LOADING: {
      stateCopy.loading = false;
      break;
    }
    default:
      break;
  }
  return stateCopy;
};
