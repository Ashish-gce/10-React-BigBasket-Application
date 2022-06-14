import { rootReducer } from "./rootReducer"; // all "reducers" -> 'rootReducer' info store in this file "REDUX-Store"
import { applyMiddleware, createStore } from "redux"; // create a single store for all components of application
import { composeWithDevTools } from "redux-devtools-extension"; //  "composeWithDevTools" -> comes for debugging purpose
import logger from "redux-logger"; // it comes to show all REDUX changes in console  in easy/relevent way

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
);

export { store };
