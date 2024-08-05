import { legacy_createStore as createStore, combineReducers } from "redux";
import { headerReducer } from "./common/headerReducer";
import { optionsReducer } from "./common/optionsReducer";
import { reviewsReducer } from "./start/reviewsReducer";
import { footerReducer } from "./common/footerReducer";
import { startTextReducer } from "./start/startText";
import { flightsTextReducer } from "./flights/flightsTextReducer";
import { navbarReducer } from "./common/navbarReducer";
import { sortReducer } from "./common/sortReducer";
import { flightsItemsTextReducer } from "./flights/flightsItemsReducer";
import { hotelsTextReducer } from "./hotels/hotelsText";
import { hotelsRecentReducer } from "./hotels/hotelsRecent";
import { hotelsItemsReducer } from "./hotels/hotelsItemsReducer";

const rootReducer = combineReducers({
    header: headerReducer,
    start: combineReducers({
        text: startTextReducer,
        reviews : reviewsReducer
    }),
    flights: combineReducers({
        text: flightsTextReducer,
        items: flightsItemsTextReducer
    }),
    hotels: combineReducers({
        text: hotelsTextReducer,
        recent: hotelsRecentReducer,
        items: hotelsItemsReducer
    }),
    options: optionsReducer,
    sort: sortReducer,
    navbar: navbarReducer,
    footer: footerReducer,
})

export const store = createStore(rootReducer);
export type storeType = ReturnType<typeof rootReducer>