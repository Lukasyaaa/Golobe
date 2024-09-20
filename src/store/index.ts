import { combineReducers, createStore } from "redux";
import { headerReducer } from "./common/headerReducer";
import { optionsReducer } from "./common/optionsReducer";
import { startReducer } from "./startReducer";
import { footerReducer } from "./common/footerReducer";

const rootReducer = combineReducers({
    header: headerReducer,
    options: optionsReducer,
    start: startReducer,
    footer: footerReducer
})

export const store = createStore(rootReducer);

export type storeType = ReturnType<typeof rootReducer>;