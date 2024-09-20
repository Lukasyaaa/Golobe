import React, { FC, useEffect, useRef } from "react";
import { useTypedSelector } from "../../useTypedSelector";

enum authorizationId{
    LogIn = "_left",
    SignIn = "_right"
}

export const Header : FC = () =>{
    const state = useTypedSelector(store => store.header);

    const header = useRef<HTMLElement>(null);
    const toggleHeader = () => {
        if(header.current){
            header.current.classList.toggle("_active");
        }
    }
    const handleScroll = () => {
        if(header.current){
            if(window.scrollY > 0){
                header.current.classList.add("_scroll");
            }else{
                header.current.classList.remove("_scroll");
            }
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    let buttonsList = useRef<HTMLUListElement>(null);
    let makeLeftPseudoActive = () => {
        if(buttonsList.current && buttonsList.current.classList.contains(authorizationId.SignIn)){
            buttonsList.current.classList.remove(authorizationId.SignIn);
            buttonsList.current.classList.add(authorizationId.LogIn);
        }
    }
    let makeRightPseudoActive = () => {
        if(buttonsList.current && buttonsList.current.classList.contains(authorizationId.LogIn)){
            buttonsList.current.classList.remove(authorizationId.LogIn);
            buttonsList.current.classList.add(authorizationId.SignIn);
        }
    }


    return(
        <header className="header" ref={header}>
            <div className="container_header">
                <nav className="header__menu menu-header">
                    <ul className="menu-header__list">
                        <li className="menu-header__link menu-header__link_flight">
                            <a className="menu-header__link-inner menu-header__link_flight-inner icon-plane" href="#">
                                <span>{state.links.flights}</span>
                            </a>
                        </li>
                        <li className="menu-header__link menu-header__link_hotel">
                            <a className="menu-header__link-inner menu-header__link_hotel-inner icon-bed" href="#">
                                <span>{state.links.hotels}</span>
                            </a>
                        </li>
                    </ul>
                    <ul className="menu-header__authorization authorization-menu-header">
                        <li 
                            className={[
                                "authorization-menu-header__link", "link-authorization-menu-header",
                                "authorization-menu-header__link_log-in", "link_log-in-authorization-menu-header"
                            ].join(" ")}
                        >
                            <a className="link-authorization-menu-header__inner link_log-in-authorization-menu-header__inner" href="#">
                                {state.authorization.logIn}
                            </a>
                        </li>
                        <li 
                            className={[
                                "authorization-menu-header__link", "link-authorization-menu-header",
                                "authorization-menu-header__link_sign-in", "link_sign-in-authorization-menu-header"
                            ].join(" ")}
                        >
                            <a className="link-authorization-menu-header__inner link_sign-in-authorization-menu-header__inner" href="#">
                                {state.authorization.signIn}
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="header__image">
                    <img src={state.logo.srcs.white} alt={state.logo.alt} />
                </div>
                <nav className="header__authorization authorization">
                    <ul className="authorization__list _right" ref={buttonsList}>
                        <li className="authorization__link authorization__link_log-in">
                            <a 
                                className="authorization__link-inner authorization__link_log-in-inner" href="#"
                                onMouseEnter={makeLeftPseudoActive} onFocus={makeLeftPseudoActive}
                            >
                                <span>{state.authorization.logIn}</span>
                            </a>
                        </li>
                        <li className="authorization__link authorization__link_sign-in">
                            <a 
                                className="authorization__link-inner authorization__link_sign-in-inner" href="#"
                                onMouseEnter={makeRightPseudoActive} onFocus={makeRightPseudoActive}
                            >
                                <span>{state.authorization.signIn}</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <button className="header__burger burger" type="button" onClick={toggleHeader}><span></span></button>
            </div>
        </header>
    )
}