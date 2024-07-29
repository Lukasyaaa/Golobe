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
import { hotelsTextReducer } from "./hotels-info/hotelsText";
import { hotelsRecentReducer } from "./hotels-info/hotelsRecent";

interface startReducer{
    text : ReturnType<typeof startTextReducer>,
    reviews : ReturnType<typeof reviewsReducer>
}
interface flightsReducer{
    text : ReturnType<typeof flightsTextReducer>,
    items : ReturnType<typeof flightsItemsTextReducer>,
    options : ReturnType<typeof flightsOptionsReducer>,
    navbar : ReturnType<typeof navbarReducer>
}
interface hotelsReducer{
    text : ReturnType<typeof hotelsTextReducer>,
    recent : ReturnType<typeof hotelsRecentReducer>
}

const rootReducer = combineReducers({
    header: headerReducer,
    start: combineReducers({
        text: startTextReducer,
        reviews : reviewsReducer
    }),
    flights: combineReducers({
        text: flightsTextReducer,
        items: flightsItemsTextReducer,
        options: flightsOptionsReducer,
        navbar: navbarReducer
    }),
    hotels: combineReducers({
        text: hotelsTextReducer,
        recent: hotelsRecentReducer
    }),
    options: optionsReducer,
    footer: footerReducer
})

export const store = createStore(rootReducer);
export type storeType = ReturnType<typeof rootReducer>