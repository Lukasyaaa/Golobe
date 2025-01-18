import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from 'redux-thunk';
import { optionsReducer } from "./optionsReducer.ts";
import { startReducer } from "./startReducer.ts";
import { footerReducer } from "./footerReducer.ts";
import { headerReducer } from "./headerReducer.ts";

const rootReducer = combineReducers({
    options: optionsReducer,
    start: startReducer,
    footer: footerReducer,
    header: headerReducer
})

export const state = createStore(rootReducer, applyMiddleware(thunk));
export type RootType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof state.dispatch;