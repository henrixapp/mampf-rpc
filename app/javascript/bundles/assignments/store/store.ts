import { applyMiddleware, combineReducers, createStore } from "redux";
import { entitiesReducer, NetworkOptions, queriesReducer, queryMiddleware } from "redux-query";
import superagentInterface from 'redux-query-interface-superagent';

export const getQueries = (state: { queries: any; }) => state.queries;
export const getEntities = (state: { entities: any; }) => state.entities;

const reducer = combineReducers({
  entities: entitiesReducer,
  queries: queriesReducer,
});
var authorizeRequest = function() {

  // This will be called on the request
  return function authorizeRequest(url:string,method:string,networkOptions:NetworkOptions) {
    //req.url = BASE_PATH+req.url
    //networkOptions.headers["Access-Control-Allow-Origin"]="*";
    let BASE_P = "/v1/submissions";
    return superagentInterface(BASE_P+url,method,networkOptions);
  }
};
//@ts-ignore
const store = createStore(reducer,  applyMiddleware(queryMiddleware(authorizeRequest(), getQueries, getEntities)));
export default store;