import React, { type FC, type MouseEvent } from "react";
import { NavLink } from "react-router-dom";
import type { MenuLink } from "../Header";

interface ActiveLinkProps{
    about: MenuLink,
    makePseudoActive : (() => void) | undefined,
    unMakePseudoActive : (() => void) | undefined,
    tabIndex: number, 
    onFocusEvent: (() => void) | undefined,
    onBlurEvent: (() => void) | undefined,
    closeHeader: (() => void)
}

export const ActiveLink : FC<ActiveLinkProps> = ({about, tabIndex, makePseudoActive, unMakePseudoActive, onFocusEvent, onBlurEvent, closeHeader}) => {
    const {uniqueCl, path, iconValue, description} = about;
    const onMouseLeaveHandler = (unMakePseudoActive === undefined) ? undefined : (e : MouseEvent<HTMLAnchorElement>) => {
        if(document.activeElement !== e.currentTarget) unMakePseudoActive()
    }
    const onFocusHandler = () => {
        makePseudoActive?.(); onFocusEvent?.(); 
    }
    const onBlurHandler = () => {
        unMakePseudoActive?.(); onBlurEvent?.(); 
    }
    const onClickHandler = () => {
        unMakePseudoActive?.(); closeHeader();
    }


    return(
        <li className="menu__punkt">
            <NavLink 
                className={["menu__link", "link-menu", uniqueCl].join(" ")} to={path}
                onClick={onClickHandler}
                onMouseEnter={makePseudoActive} onFocus={onFocusHandler}
                onMouseLeave={onMouseLeaveHandler} onBlur={onBlurHandler}
                tabIndex={tabIndex}
            >
                <div className="link-menu__icon-parent">
                    <svg className="link-menu__icon" viewBox={"0 0 " + iconValue.width + " " + iconValue.height}>
                        {iconValue.pathes.map((path, i) => 
                            <path key={i} {...path} />
                        )}
                    </svg>
                </div>
                <span className="link-menu__desc">{description}</span>
            </NavLink>
        </li>
    )
}