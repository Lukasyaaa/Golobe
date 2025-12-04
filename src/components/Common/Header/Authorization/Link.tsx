import { type FC } from "react";
import type { useStateReturned } from "../../../../types";
import type { AuthorizationLink as AuthorizationLinkAbout } from "../Header";
import { NavLink } from "react-router-dom";

interface AuthorizationLinkProps{
    about: AuthorizationLinkAbout,
    isHovered: boolean,
    hoveredIndex: useStateReturned<number>,
    tabIndex: number,
    setIsOpened: useStateReturned<boolean>[1]
}

export const AuthorizationLink : FC<AuthorizationLinkProps> = ({about, isHovered, hoveredIndex, tabIndex, setIsOpened}) => {
    const {uniqueCl, description, path, isDisabled} = about;
    if(isDisabled){
        return(
            <div 
                className={["header__link", uniqueCl, isHovered ? "_hovered" : ""].filter(Boolean).join(" ")}
            >
                <span>{description}</span>
            </div>
        )
    }
    return(
        <NavLink 
            className={["header__link", uniqueCl, isHovered ? "_hovered" : ""].filter(Boolean).join(" ")} to={path}
            onMouseEnter={() => hoveredIndex[1](about.id)} onFocus={() => hoveredIndex[1](about.id)}
            tabIndex={tabIndex} onClick={() => setIsOpened(false)}
        >
            <span>{description}</span>
        </NavLink>
    )
}