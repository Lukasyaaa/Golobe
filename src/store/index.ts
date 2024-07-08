import { legacy_createStore as createStore, combineReducers } from "redux";
import { headerReducer } from "./start/headerReducer";
import { optionsReducer } from "./start/optionsReducer";
import { reviewsReducer } from "./start/reviewsReducer";
import { footerReducer } from "./start/footerReducer";
import { startTextReducer } from "./start/startText";
import { flightsTextReducer } from "./flights/flightsText";

const rootReducer = combineReducers({
    header : headerReducer,
    start : startTextReducer,
    options : optionsReducer,
    reviews : reviewsReducer,
    flights : flightsTextReducer,
    footer : footerReducer
})

export const store = createStore(rootReducer);

export type storeType = ReturnType<typeof rootReducer>;