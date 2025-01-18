import logo from "../assets/img/logos/mint.svg";
import { Separation, Link } from "../types.ts"

interface HeaderAuthorization{
    login : string,
    signUp : string
}

interface Header{
    menu : Separation<string>,
    logo : string,
    authorization : HeaderAuthorization
}

const defaultStore : Header = {
    menu: {
        flights: "Find Flights",
        hotels: "Find Stays"
    },
    logo: logo,
    authorization: {
        login: "Login",
        signUp: "Sign up"
    }
}

export const headerReducer = (store : Header = defaultStore) : Header => store;