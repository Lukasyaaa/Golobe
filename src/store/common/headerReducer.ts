import { header } from "../../types";
import blackLogo from "../../assets/img/logos/mintBlack.svg"
import whiteLogo from "../../assets/img/logos/mintWhite.svg"

const defaultState : header = {
    links:{
        flights: "Find Flight",
        hotels: "Find Stays"
    },
    logo: {srcs: {black: blackLogo, white: whiteLogo}, alt: "Golobe Logo"},
    authorization: {
        signIn: "Login",
        signUp: "Sign up",
        favourites: "Favourites"
    },
}

export const headerReducer = (state : header = defaultState) : header => state;