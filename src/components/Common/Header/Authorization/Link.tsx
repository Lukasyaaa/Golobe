import React, { type FC } from "react";
import type { useStateReturned } from "../../../../types";
import type { AuthorizationLink as AuthorizationLinkAbout } from "../Header";
import { NavLink } from "react-router-dom";

interface AuthorizationLinkProps{
    about: AuthorizationLinkAbout,
    isHovered: boolean,
    hoveredIndex: useStateReturned<number>,
    tabIndex: number
}

export const AuthorizationLink : FC<AuthorizationLinkProps> = ({about, isHovered, hoveredIndex, tabIndex}) => {
    const {uniqueCl, description, path} = about;
    return(
        <NavLink 
            className={["header__link", uniqueCl, isHovered ? "_hovered" : ""].filter(Boolean).join(" ")} to={path}
            onMouseEnter={() => hoveredIndex[1](about.id)} onFocus={() => hoveredIndex[1](about.id)}
            tabIndex={tabIndex}
        >
            <span>{description}</span>
        </NavLink>
    )
}