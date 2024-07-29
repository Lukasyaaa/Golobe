import { legacy_createStore as createStore, combineReducers } from "redux";
import { headerReducer } from "./common/headerReducer";
import { optionsReducer } from "./common/optionsReducer";
import { reviewsReducer } from "./start/reviewsReducer";
import { footerReducer } from "./common/footerReducer";
import { startTextReducer } from "./start/startText";
import { flightsTextReducer } from "./flights-info/flightsText";
import { navbarReducer } from "./flights/navbarReducer";
import { flightsOptionsReducer } from "./flights/flightsOptionsReducer";
import { flightsItemsTextReducer } from "./flights/flightsItemsReducer";

const rootReducer = combineReducers({
    header : headerReducer,
    start : startTextReducer,
    options : optionsReducer,
    reviews : reviewsReducer,
    flights : flightsTextReducer,
    footer : footerReducer,
    navbar : navbarReducer,
    optionsFlights : flightsOptionsReducer,
    flightsItems : flightsItemsTextReducer 
})

export const store = createStore(rootReducer);

export type storeType = ReturnType<typeof rootReducer>;