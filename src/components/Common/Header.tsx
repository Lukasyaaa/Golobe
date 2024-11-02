import React, { FC, Fragment, useEffect, useRef, useState, FocusEvent, MouseEvent } from "react";
import { useTypedSelector } from "../../useTypedSelector";
import { NavLink, useLocation } from "react-router-dom";
import { flightsConfiguratePath, flightsPath, homePath, hotelsConfiguretePath, hotelsPath, logInPath, signInPath } from "../../App";
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

interface headerTabIndexes{
    nav : number,
    image : number,
    authorization : number,
    burger : number,
    hiddenAuthorization : number
}

export const Header : FC = () =>{
    const state = useTypedSelector(store => store.header);
    let [style, setStyle] = useState(headerStyle.start);
    let [tabIndexes, setTabIndexes] = useState<headerTabIndexes>({
        nav: -1,
        image: -1,
        authorization: -1,
        burger: -1,
        hiddenAuthorization: -1
    });
    let location = useLocation();

    const header = useRef<HTMLElement>(null);
    useEffect(() => {
        hideHeader();
        switch(location.pathname){
            case homePath:
                if(window.innerWidth > 768){
                    setTabIndexes({
                        nav: 1,
                        burger: -1,
                        image: -1,
                        authorization: 3,
                        hiddenAuthorization: -2
                    });
                } else {
                    setTabIndexes({
                        nav: 4,
                        burger: 3,
                        image: -1,
                        authorization: 1,
                        hiddenAuthorization: (window.innerWidth > 480) ? -2 : 6
                    });
                }
                setStyle(headerStyle.start);
                break;
            default:
                if(window.innerWidth > 768){
                    setTabIndexes({
                        nav: 1,
                        burger: -1,
                        image: 2,
                        authorization: 3,
                        hiddenAuthorization: -2
                    });
                } else {
                    setTabIndexes({
                        nav: 5,
                        burger: 4,
                        image: 1,
                        authorization: 2,
                        hiddenAuthorization: (window.innerWidth > 480) ? -2 : 6
                    });
                }
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
    const showHeader = () => {
        if(header.current){
            header.current.classList.add("_active");
            document.body.classList.add("_locked");
        }
    }
    const hideHeader = () => {
        if(header.current){
            header.current.classList.remove("_active");
            document.body.classList.remove("_locked");
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

    const makeLinkPseudoActive = (e : FocusEvent<HTMLElement> | MouseEvent<HTMLElement>) : void =>{
        makePseudoActive(e, headerLinks);
        if(window.innerWidth <= 768){
            showHeader();
        }
    }

    const makeLinkUnPseudoActive = (e : FocusEvent<HTMLElement> | MouseEvent<HTMLElement>) : void =>{
        makeUnPseudoActive(e, headerLinks);
        if(window.innerWidth <= 768 && window.innerWidth > 480){
            hideHeader();
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
                        {(location.pathname === flightsPath || location.pathname === flightsConfiguratePath) ? 
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
                                        tabIndex={tabIndexes.nav}
                                        className="menu-header__link-inner menu-header__link_hotel-inner icon-bed" to={hotelsPath}
                                        onClick={(e) => makeUnPseudoActive(e, headerLinks)}
                                        onMouseEnter={(e) => makePseudoActive(e, headerLinks)} 
                                        onMouseLeave={(e) => {
                                            if(e.target !== document.activeElement){
                                                makeUnPseudoActive(e, headerLinks);
                                            }
                                        }} onFocus={(e) => makeLinkPseudoActive(e)} 
                                        onBlur={(e) => makeLinkUnPseudoActive(e)}
                                    >
                                        <span>{state.links.hotels}</span>
                                    </NavLink>
                                </li>
                            </Fragment>
                            :
                            ((location.pathname === hotelsPath || location.pathname === hotelsConfiguretePath) ? 
                                <Fragment>
                                    <li className="menu-header__link menu-header__link_flight">
                                        <NavLink 
                                            tabIndex={tabIndexes.nav}
                                            className="menu-header__link-inner menu-header__link_flight-inner icon-plane" to={flightsPath}
                                            onClick={(e) => makeUnPseudoActive(e, headerLinks)}
                                            onMouseEnter={(e) => makePseudoActive(e, headerLinks)} 
                                            onMouseLeave={(e) => {
                                                if(e.target !== document.activeElement){
                                                    makeUnPseudoActive(e, headerLinks);
                                                }
                                            }} onFocus={(e) => makeLinkPseudoActive(e)} 
                                            onBlur={(e) => makeLinkUnPseudoActive(e)}
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
                                            tabIndex={tabIndexes.nav}
                                            className="menu-header__link-inner menu-header__link_flight-inner icon-plane _active" 
                                            to={flightsPath}
                                            onFocus={() => {
                                                if(window.innerWidth <= 768){
                                                    showHeader();
                                                }
                                            }}
                                        >
                                            <span>{state.links.flights}</span>
                                        </NavLink>
                                    </li>
                                    <li className="menu-header__link menu-header__link_hotel">
                                        <NavLink 
                                            tabIndex={tabIndexes.nav + 1}
                                            className="menu-header__link-inner menu-header__link_hotel-inner icon-bed _active"
                                            to={hotelsPath}
                                            onBlur={() => {
                                                if(window.innerWidth <= 768 && window.innerWidth > 480){
                                                    hideHeader();
                                                }
                                            }}
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
                                tabIndex={tabIndexes.hiddenAuthorization}
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
                                tabIndex={tabIndexes.hiddenAuthorization + 1}
                                className="authorization-menu-header__link-inner authorization-menu-header__link_sign-in-inner" 
                                to={signInPath}
                                onBlur={hideHeader}
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
                            tabIndex={tabIndexes.image}
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
                            tabIndex={tabIndexes.image}
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
                                tabIndex={tabIndexes.authorization}
                                className="authorization__link-inner authorization__link_log-in-inner" to={logInPath}
                                onMouseEnter={makeLeftPseudoActive} onFocus={makeLeftPseudoActive}
                            >
                                <span>{state.authorization.logIn}</span>
                            </NavLink>
                        </li>
                        <li className="authorization__link authorization__link_sign-in">
                            <NavLink
                                tabIndex={tabIndexes.authorization + 1}
                                className="authorization__link-inner authorization__link_sign-in-inner" to={signInPath}
                                onMouseEnter={makeRightPseudoActive} onFocus={makeRightPseudoActive}
                            >
                                <span>{state.authorization.signIn}</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <button className="header__burger burger" type="button" onClick={toggleHeader} tabIndex={tabIndexes.burger}><span></span></button>
            </div>
        </header>
    )
}