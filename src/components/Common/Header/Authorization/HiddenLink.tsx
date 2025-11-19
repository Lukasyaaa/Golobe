import React, { type FC } from "react";
import type { AuthorizationLink } from "../Header";
import { NavLink } from "react-router-dom";

interface AuthorizationHiddenLinkProps{
    about: AuthorizationLink,
    tabIndex: number,
    onBlurHandler: (() => void) | undefined
}

export const AuthorizationHiddenLink : FC<AuthorizationHiddenLinkProps> = ({about, tabIndex, onBlurHandler}) => {
    const {uniqueCl, description, path} = about;
    return(
        <NavLink 
            className={["authorization-menu__link", uniqueCl].join(" ")} to={path}
            tabIndex={tabIndex} onBlur={onBlurHandler}
        >
            {description}
        </NavLink>
    )
}