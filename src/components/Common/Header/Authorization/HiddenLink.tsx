import { type FC } from "react";
import type { AuthorizationLink } from "../Header";
import { NavLink } from "react-router-dom";
import type { useStateReturned } from "../../../../types";

interface AuthorizationHiddenLinkProps{
    about: AuthorizationLink,
    onBlurHandler: (() => void) | undefined,
    setIsOpened: useStateReturned<boolean>[1]
}

export const AuthorizationHiddenLink : FC<AuthorizationHiddenLinkProps> = ({about, onBlurHandler, setIsOpened}) => {
    const {uniqueCl, description, path, isDisabled} = about;
    if(isDisabled){
        return(
            <div className={["authorization-menu__link", uniqueCl].join(" ")}>
                {description}
            </div>
        )
    }
    return(
        <NavLink 
            className={["authorization-menu__link", uniqueCl].join(" ")} to={path}
            onBlur={onBlurHandler} onClick={() => setIsOpened(false)}
        >
            {description}
        </NavLink>
    )
}