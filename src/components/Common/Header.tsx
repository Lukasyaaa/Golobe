import React, { FC, useState, useRef, useEffect, FocusEvent, MouseEvent } from "react";
import logo from "../../assets/img/logos/mint.svg";

interface tabIndexesType{
    authorization : number,
    menu : number,
    burger : number
}

export const Header : FC = () => {
    const header = useRef<HTMLElement>(null);
    window.addEventListener("scroll", () => {
        if(header.current){
            if(window.scrollY){
                header.current.classList.add("_scroll");
            }else{
                header.current.classList.remove("_scroll");
            }
        }
    });
    const toggleMenu = () => {
        if(header.current){
            header.current.classList.toggle("_active");
            document.body.classList.toggle("_locked");
        }
    }
    const showMenu = () => {
        if(header.current){
            header.current.classList.add("_active");
            document.body.classList.add("_locked");
        }
    }
    const hideMenu = () => {
        if(header.current){
            header.current.classList.remove("_active");
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

    let [tabIndexes, setTabIndexes] = useState<tabIndexesType>({
        menu: 1, authorization: 3,
        burger: -1, menuAuthorization: -1,
    });
    useEffect(() => {
        if(window.innerWidth < 768){
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
        <header className="header" ref={header}>
            <div className="container container_header">
                <nav className="header__menu menu-header">
                    <ul className="menu-header__list">
                        <li className="menu-header__link">
                            <a 
                                className="icon-plane" href="#" tabIndex={tabIndexes.menu}
                                onFocus={(window.innerWidth <= 768) ? () => showMenu() : undefined}
                            >
                                <span>Find Flight</span>
                                </a>
                        </li>
                        <li className="menu-header__link">
                            <a 
                                className="icon-bed" href="#" tabIndex={tabIndexes.menu + 1}
                                onBlur={(window.innerWidth <= 768 && window.innerWidth > 480) ? () => hideMenu() : undefined}
                            >
                                <span>Find Stays</span>
                            </a>
                        </li>
                    </ul>
                    <div className="menu-header__authorization authorization-menu-header">
                        <a 
                            className="authorization-menu-header__link authorization-menu-header__login" 
                            href="#" 
                            tabIndex={tabIndexes.menuAuthorization}
                        >
                            Login
                        </a>
                        <a 
                            className="authorization-menu-header__link authorization-menu-header__sign-up" 
                            href="#"
                            tabIndex={-1 * Number(tabIndexes.menuAuthorization + 1 === 0) + (tabIndexes.menuAuthorization + 1) * Number(tabIndexes.menuAuthorization > 0)}
                            onBlur={(window.innerWidth <= 480) ? () => hideMenu() : undefined}
                        >
                            Sign up
                        </a>
                    </div>
                </nav>
                <img className="header__logo" src={logo} alt="Our Logo" />
                <nav className="header__authorization authorization-header right-side" ref={authorization}>
                    <a 
                        className="authorization-header__link authorization-header__login" href="#" 
                        onMouseEnter={toggleActiveButton} onFocus={toggleActiveButton}
                        tabIndex={tabIndexes.authorization}
                    >
                        <span>Login</span>
                    </a>
                    <a 
                        className="authorization-header__link authorization-header__sign-up" href="#"
                        onMouseEnter={toggleActiveButton} onFocus={toggleActiveButton}
                        tabIndex={-1 * Number(tabIndexes.authorization + 1 === 0) + (tabIndexes.authorization + 1) * Number(tabIndexes.authorization > 0)}
                    >
                        <span>Sign up</span>
                    </a>
                </nav>
                <button className="header__burger" type="button" onClick={toggleMenu} tabIndex={tabIndexes.burger}>
                    <span></span>
                </button>
            </div>
        </header>
    );
}