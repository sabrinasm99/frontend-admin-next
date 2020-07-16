import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer";
import thunk from "redux-thunk";

const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...[thunk]),
    typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION__ !== undefined
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;
