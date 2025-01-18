import React, { FC, useState, useRef, useEffect, FocusEvent, MouseEvent } from "react";
import { useTypedSelector } from "../../helperFunctions.ts";

interface TabIndexes{
    authorization : number,
    menu : number,
    burger : number,
    menuAuthorization : number
}

export const Header : FC = () => {
    const about = useTypedSelector(state => state.header);

    const headerElement = useRef<HTMLElement>(null);
    window.addEventListener("scroll", () => {
        if(headerElement.current){
            if(window.scrollY){
                headerElement.current.classList.add("_scroll");
            }else{
                headerElement.current.classList.remove("_scroll");
            }
        }
    });
    const toggleMenu = (e) => {
        e.stopPropagation();
        if(headerElement.current){
            headerElement.current.classList.toggle("_active");
            document.body.classList.toggle("_locked");
        }
    }
    const showMenu = () => {
        if(headerElement.current){
            headerElement.current.classList.add("_active");
            document.body.classList.add("_locked");
        }
    }
    const hideMenu = () => {
        if(headerElement.current){
            headerElement.current.classList.remove("_active");
            document.body.classList.remove("_locked");
        }
    }

    const authorization = useRef<HTMLElement>(null);
    const toggleActiveButton = (e : FocusEvent<HTMLAnchorElement> | MouseEvent<HTMLAnchorElement>) => {
        if(authorization.current){
            if(authorization.current.classList.contains("right-side")){
                if(e.currentTarget.classList.contains("authorization-header__login")){
                    authorization.current.classList.remove("right-side");
                    authorization.current.classList.add("left-side");
                }
            } else {
                if(e.currentTarget.classList.contains("authorization-header__sign-up")){
                    authorization.current.classList.remove("left-side");
                    authorization.current.classList.add("right-side");
                }
            }
        }
    }

    let [tabIndexes, setTabIndexes] = useState<TabIndexes>({
        menu: 1, authorization: 3,
        burger: -1, menuAuthorization: -1,
    });
    useEffect(() => {
        if(window.innerWidth <= 768){
            if(window.innerWidth > 480){
                setTabIndexes({
                    menu: 4, authorization: 1,
                    burger: 3, menuAuthorization: -1,
                });
            } else {
                setTabIndexes({
                    menu: 2, authorization: -1,
                    burger: 1, menuAuthorization: 4,
                });
            }
        }
    }, []);

    return(
        <header className="header" ref={headerElement}>
            <div className="container container_header">
                <nav className="header__menu menu-header">
                    <ul className="menu-header__list">
                        <li className="menu-header__link">
                            <a 
                                className="icon-plane" href="#" tabIndex={tabIndexes.menu}
                                onFocus={(window.innerWidth <= 768) ? () => showMenu() : undefined}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <span>{about.menu.flights}</span>
                                </a>
                        </li>
                        <li className="menu-header__link">
                            <a 
                                className="icon-bed" href="#" tabIndex={tabIndexes.menu + 1}
                                onBlur={(window.innerWidth <= 768 && window.innerWidth > 480) ? () => hideMenu() : undefined}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <span>{about.menu.hotels}</span>
                            </a>
                        </li>
                    </ul>
                    <div className="menu-header__authorization authorization-menu-header">
                        <a 
                            className="authorization-menu-header__link authorization-menu-header__login" 
                            href="#" onClick={(e) => e.stopPropagation()}
                            tabIndex={tabIndexes.menuAuthorization}
                        >
                            {about.authorization.login}
                        </a>
                        <a 
                            className="authorization-menu-header__link authorization-menu-header__sign-up" 
                            href="#" onClick={(e) => e.stopPropagation()}
                            tabIndex={-1 * Number(tabIndexes.menuAuthorization + 1 === 0) + (tabIndexes.menuAuthorization + 1) * Number(tabIndexes.menuAuthorization > 0)}
                            onBlur={(window.innerWidth <= 480) ? () => hideMenu() : undefined}
                        >
                            {about.authorization.signUp}
                        </a>
                    </div>
                </nav>
                <img className="header__logo" src={about.logo} alt="Our Logo" />
                <nav className="header__authorization authorization-header right-side" ref={authorization}>
                    <a 
                        className="authorization-header__link authorization-header__login" href="#" 
                        onMouseEnter={toggleActiveButton} onFocus={toggleActiveButton}
                        tabIndex={tabIndexes.authorization}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span>{about.authorization.login}</span>
                    </a>
                    <a 
                        className="authorization-header__link authorization-header__sign-up" href="#"
                        onMouseEnter={toggleActiveButton} onFocus={toggleActiveButton}
                        tabIndex={-1 * Number(tabIndexes.authorization + 1 === 0) + (tabIndexes.authorization + 1) * Number(tabIndexes.authorization > 0)}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span>{about.authorization.signUp}</span>
                    </a>
                </nav>
                <button className="header__burger" type="button" onClick={toggleMenu} tabIndex={tabIndexes.burger}>
                    <span></span>
                </button>
            </div>
        </header>
    );
}