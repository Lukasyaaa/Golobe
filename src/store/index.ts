import { combineReducers, createStore } from "redux";
import { startReducer } from "./startReducer";

const rootReducer = combineReducers({
    start: startReducer
})

export const store = createStore(rootReducer);

export type storeType = ReturnType<typeof rootReducer>;