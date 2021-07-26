import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"
// import { composeWithDevTools } from "redux-devtools-extension"
import promiseMiddleware from 'redux-promise';
import loggerReducer from "./reducers/logsReducer"
import filesReducer from "./reducers/filesReducer"
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
    logs: loggerReducer,
    files: filesReducer
});
const configureStore = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, promiseMiddleware)))
export default configureStore
