import { legacy_createStore as createStore, combineReducers } from "redux";
import { optionsReducer } from "./optionsReducer";
import { reviewsReducer } from "./reviewsReducer";
import { footerReducer } from "./footerReducer";
import { anotherReducer } from "./anotherReducer";

const rootReducer = combineReducers({
    options : optionsReducer,
    reviews : reviewsReducer,
    another : anotherReducer,
    footer : footerReducer,
})

export const store = createStore(rootReducer);

export type storeType = ReturnType<typeof rootReducer>;