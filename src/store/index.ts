import { combineReducers, createStore } from "redux";
import { headerReducer } from "./common/headerReducer";
import { optionsReducer } from "./common/optionsReducer";
import { startReducer } from "./startReducer";
import { footerReducer } from "./common/footerReducer";
import { flightsReducer } from "./flights/flightsReducer";
import { hotelsReducer } from "./hotels/hotelsReducer";
import { navbarReducer } from "./configurate/navbarReducer";
import { sortReducer } from "./configurate/sortReducer";
import { flightsItemsReducer } from "./flights/flightsItemsReducer";
import { hotelsItemsReducer } from "./hotels/hotelsItemsReducer";
import { itemsHeaderReducer } from "./configurate/itemsHeaderReducer";

const rootReducer = combineReducers({
    header: headerReducer,
    options: optionsReducer,
    start: startReducer,
    flights: combineReducers({
        home: flightsReducer,
        items: flightsItemsReducer
    }),
    hotels: combineReducers({
        home: hotelsReducer,
        items: hotelsItemsReducer
    }),
    configurate: combineReducers({
        navbar: navbarReducer,
        sort: sortReducer,
        itemsHeader: itemsHeaderReducer
    }),
    footer: footerReducer,
})

export const store = createStore(rootReducer);

export type storeType = ReturnType<typeof rootReducer>;