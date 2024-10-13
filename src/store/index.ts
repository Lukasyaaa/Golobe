import { combineReducers, createStore } from "redux";
import { headerReducer } from "./common/headerReducer";
import { optionsReducer } from "./common/optionsReducer";
import { startReducer } from "./startReducer";
import { footerReducer } from "./common/footerReducer";
import { flightsReducer } from "./flightsReducer";
import { hotelsReducer } from "./hotelsReducer";

const rootReducer = combineReducers({
    header: headerReducer,
    options: optionsReducer,
    start: startReducer,
    flights: flightsReducer,
    hotels: hotelsReducer,
    footer: footerReducer
})

export const store = createStore(rootReducer);

export type storeType = ReturnType<typeof rootReducer>;