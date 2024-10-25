import { combineReducers, createStore } from "redux";
import { headerReducer } from "./common/headerReducer";
import { optionsReducer } from "./common/optionsReducer";
import { startReducer } from "./startReducer";
import { footerReducer } from "./common/footerReducer";
import { flightsReducer } from "./flightsReducer";
import { hotelsReducer } from "./hotelsReducer";
import { navbarReducer } from "./navbarReducer";

const rootReducer = combineReducers({
    header: headerReducer,
    options: optionsReducer,
    start: startReducer,
    flights: flightsReducer,
    hotels: hotelsReducer,
    footer: footerReducer,
    navbar: navbarReducer
})

export const store = createStore(rootReducer);

export type storeType = ReturnType<typeof rootReducer>;