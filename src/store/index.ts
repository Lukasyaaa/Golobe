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
import { airlinesReducer } from "./configurate/airlinesReducer";
import { paymentReducer } from "./booking/paymentReducer";
import { userReducer } from "./userReducer";
import { authorizationTextReducer } from "./booking/authorizationTextReducer";
import { addCardReducer } from "./booking/addCardReducer";
import { termsConditionsReducer } from "./termsConditionsReducer";
import { accessReducer } from "./authorization/authorizationReducer";
import { forgotPasswordReducer } from "./authorization/forgotPasswordReducer";
import { setPasswordReducer } from "./authorization/setPasswordReducer";
import { verifyCodeReducer } from "./authorization/verifyCodeReducer";
import { accountTextReducer } from "./accountTextReducer";

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
        itemsHeader: itemsHeaderReducer,
        airlines: airlinesReducer
    }),
    bookings: combineReducers({
        payment: paymentReducer,
        authorization: authorizationTextReducer,
        addCard: addCardReducer
    }),
    access: combineReducers({
        authorization: accessReducer,
        forgotPassword: forgotPasswordReducer,
        setPassword: setPasswordReducer,
        verifyCode: verifyCodeReducer
    }),
    user: userReducer,
    termsConditions: termsConditionsReducer,
    accountText: accountTextReducer,
    footer: footerReducer,
})

export const store = createStore(rootReducer);

export type storeType = ReturnType<typeof rootReducer>;