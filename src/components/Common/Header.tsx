import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import { useTypedSelector } from "../../useTypedSelector";
import { NavLink, useLocation } from "react-router-dom";
import { flightsPath, homePath, hotelsPath, logInPath, signInPath } from "../../App";
import { makePseudoActive, makeUnPseudoActive } from "../../helperFunctions";

enum authorizationId{
    LogIn = "_left",
    SignIn = "_right"
}

enum headerStyle{
    activeBlackWhite = "active-black-white",
    blackWhite = "black-white",
    start = "start"
}

export const Header : FC = () =>{
    const state = useTypedSelector(store => store.header);
    let [style, setStyle] = useState(headerStyle.start);
    let location = useLocation();

    const header = useRef<HTMLElement>(null);
    useEffect(() => {
        document.body.classList.remove("_locked");
        switch(location.pathname){
            case homePath:
                setStyle(headerStyle.start);
                break;
            default:
                setStyle(headerStyle.blackWhite);
                break;
        }
    }, [location])

    const toggleHeader = () => {
        if(header.current){
            if(location.pathname !== homePath){
                if(header.current.classList.contains("_active")){
                    setStyle(headerStyle.blackWhite);
                }else{
                    setStyle(headerStyle.activeBlackWhite);
                }
            }
            header.current.classList.toggle("_active");
            document.body.classList.toggle("_locked");
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

    let headerLinks = useRef<HTMLUListElement>(null);
    const hideActiveLink = () => {
        if(headerLinks.current){
            headerLinks.current.classList.add("_hide-active");
        }
    }
    const showActiveLink = () => {
        if(headerLinks.current){
            headerLinks.current.classList.remove("_hide-active");
        }
    }

    return(
        <header 
            className={"header " + ((style === headerStyle.activeBlackWhite) ? headerStyle.blackWhite : style)} 
            ref={header}
        >
            <div className="container_header">
                <nav className="header__menu menu-header">
                    <ul className="menu-header__list" ref={headerLinks}>
                        {(location.pathname === flightsPath) ? 
                            <Fragment>
                                <li className="menu-header__link menu-header__link_flight">
                                    <div 
                                        className="menu-header__link-inner menu-header__link_flight-inner icon-plane _active"
                                    >
                                        <span>{state.links.flights}</span>
                                    </div>
                                </li>
                                <li className="menu-header__link menu-header__link_hotel">
                                    <NavLink 
                                        className="menu-header__link-inner menu-header__link_hotel-inner icon-bed" to={hotelsPath}
                                        onClick={(e) => makeUnPseudoActive(e, headerLinks)}
                                        onMouseEnter={(e) => makePseudoActive(e, headerLinks)} 
                                        onMouseLeave={(e) => {
                                            if(e.target !== document.activeElement){
                                                makeUnPseudoActive(e, headerLinks);
                                            }
                                        }} onFocus={(e) => makePseudoActive(e, headerLinks)} 
                                        onBlur={(e) => makeUnPseudoActive(e, headerLinks)}
                                    >
                                        <span>{state.links.hotels}</span>
                                    </NavLink>
                                </li>
                            </Fragment>
                            :
                            ((location.pathname === hotelsPath) ? 
                                <Fragment>
                                    <li className="menu-header__link menu-header__link_flight">
                                        <NavLink 
                                            className="menu-header__link-inner menu-header__link_flight-inner icon-plane" 
                                            to={flightsPath}
                                            onClick={(e) => makeUnPseudoActive(e, headerLinks)}
                                            onMouseEnter={(e) => makePseudoActive(e, headerLinks)} 
                                            onMouseLeave={(e) => {
                                                if(e.target !== document.activeElement){
                                                    makeUnPseudoActive(e, headerLinks);
                                                }
                                            }} onFocus={(e) => makePseudoActive(e, headerLinks)} 
                                            onBlur={(e) => makeUnPseudoActive(e, headerLinks)}
                                        >
                                            <span>{state.links.flights}</span>
                                        </NavLink>
                                    </li>
                                    <li className="menu-header__link menu-header__link_hotel">
                                        <div 
                                            className="menu-header__link-inner menu-header__link_hotel-inner icon-bed _active" 
                                        >
                                            <span>{state.links.hotels}</span>
                                        </div>
                                    </li>
                                </Fragment>
                                : 
                                <Fragment>
                                    <li className="menu-header__link menu-header__link_flight">
                                        <NavLink 
                                            className="menu-header__link-inner menu-header__link_flight-inner icon-plane _active" 
                                            to={flightsPath}
                                        >
                                            <span>{state.links.flights}</span>
                                        </NavLink>
                                    </li>
                                    <li className="menu-header__link menu-header__link_hotel">
                                        <NavLink 
                                            className="menu-header__link-inner menu-header__link_hotel-inner icon-bed _active"
                                            to={hotelsPath}
                                        >
                                            <span>{state.links.hotels}</span>
                                        </NavLink>
                                    </li>
                                </Fragment>
                            )
                        }
                    </ul>
                    <ul className="menu-header__authorization authorization-menu-header">
                        <li 
                            className={[
                                "authorization-menu-header__link", "link-authorization-menu-header",
                                "authorization-menu-header__link_log-in", "link_log-in-authorization-menu-header"
                            ].join(" ")}
                        >
                            <NavLink 
                                className="authorization-menu-header__link-inner authorization-menu-header__link_log-in-inner" 
                                to={logInPath}
                            >
                                {state.authorization.logIn}
                            </NavLink>
                        </li>
                        <li 
                            className={[
                                "authorization-menu-header__link", "link-authorization-menu-header",
                                "authorization-menu-header__link_sign-in", "link_sign-in-authorization-menu-header"
                            ].join(" ")}
                        >
                            <NavLink 
                                className="authorization-menu-header__link-inner authorization-menu-header__link_sign-in-inner" 
                                to={signInPath}
                            >
                                {state.authorization.signIn}
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                {(style === headerStyle.start) ? 
                    <div className="header__image">
                        <img src={state.logo.srcs.white} alt={state.logo.alt} />
                    </div>
                    :
                    ((style === headerStyle.activeBlackWhite) ?
                        <NavLink 
                            className="header__image" to={homePath}                                
                            onMouseEnter={hideActiveLink} 
                            onMouseLeave={(e) => {
                                if(e.target !== document.activeElement){
                                    showActiveLink();
                                }
                            }} onFocus={hideActiveLink} onBlur={showActiveLink}
                        >
                            <img src={state.logo.srcs.white} alt={state.logo.alt} />
                        </NavLink> 
                        : 
                        <NavLink 
                            className="header__image" to={homePath}
                            onMouseEnter={hideActiveLink} 
                            onMouseLeave={(e) => {
                                if(e.target !== document.activeElement){
                                    showActiveLink();
                                }
                            }} onFocus={hideActiveLink} onBlur={showActiveLink}
                        >
                            <img src={state.logo.srcs.black} alt={state.logo.alt} />
                        </NavLink>
                    )
                }
                <nav className="header__authorization authorization">
                    <ul className="authorization__list _right" ref={buttonsList}>
                        <li className="authorization__link authorization__link_log-in">
                            <NavLink 
                                className="authorization__link-inner authorization__link_log-in-inner" to={logInPath}
                                onMouseEnter={makeLeftPseudoActive} onFocus={makeLeftPseudoActive}
                            >
                                <span>{state.authorization.logIn}</span>
                            </NavLink>
                        </li>
                        <li className="authorization__link authorization__link_sign-in">
                            <NavLink
                                className="authorization__link-inner authorization__link_sign-in-inner" to={signInPath}
                                onMouseEnter={makeRightPseudoActive} onFocus={makeRightPseudoActive}
                            >
                                <span>{state.authorization.signIn}</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <button className="header__burger burger" type="button" onClick={toggleHeader}><span></span></button>
            </div>
        </header>
    )
}