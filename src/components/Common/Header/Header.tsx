import React, { FC, Fragment, useEffect, useRef, useState, FocusEvent, MouseEvent } from "react";
import { useTypedSelector } from "../../../useTypedSelector";
import { NavLink, useLocation } from "react-router-dom";
import { flightsPath, homePath, hotelsPath, signUpPath, signInPath, accountInfoPath, favouritesPath } from "../../../App";
import { makePseudoActive, makeUnPseudoActive } from "../../../helperFunctions";
import { contentPart } from "../../../types";
import { HeaderAccount } from "./HeaderAccount";
import { HeaderAuthorization } from "./HeaderAuthorization";

enum headerStyle{
    blackWhite = "black-white",
    start = "start"
}

interface headerTabindexes{
    nav : number,
    image : number,
    authorization : number,
    burger : number,
    hiddenAuthorization : number
}

interface headerLink{
    type : contentPart,
    about : string,
    isActive : boolean,
    path : string
}

export const Header : FC = () =>{
    let [style, setStyle] = useState(headerStyle.start);
    let location = useLocation();

    let [tabIndexes, setTabIndexes] = useState<headerTabindexes>({
        nav: -1, image: -1, authorization: -1, burger: -1, hiddenAuthorization: -1
    });

    const header = useRef<HTMLElement>(null);
    const headerStore = useTypedSelector(store => store.header);
    let [logoPath, setLogoPath] = useState<string>(headerStore.logo.srcs.black);
    const hideMenu = () => {
        if(header.current){
            header.current.classList.remove("_active");
            document.body.classList.remove("_locked");
            if(style === headerStyle.blackWhite){
                setLogoPath(headerStore.logo.srcs.black);
            }
        }
    }
    useEffect(() => {
        hideMenu();
        switch(location.pathname){
            case homePath:
                if(window.innerWidth > 768){
                    setTabIndexes({
                        nav: 1, burger: -1, image: -1, authorization: 3, hiddenAuthorization: -2
                    });
                } else {
                    setTabIndexes({
                        nav: 4, burger: 3, image: -1, authorization: 1,
                        hiddenAuthorization: (window.innerWidth > 480) ? -2 : 6
                    });
                }
                setStyle(headerStyle.start);
                break;
            default:
                if(window.innerWidth > 768){
                    setTabIndexes({
                        nav: 1, burger: -1, image: 2, authorization: 3, hiddenAuthorization: -2
                    });
                } else {
                    setTabIndexes({
                        nav: 5, burger: 4, image: 1, authorization: 2, 
                        hiddenAuthorization: (window.innerWidth > 480) ? -2 : 6
                    });
                }
                setStyle(headerStyle.blackWhite);
                break;
        }
    }, [location])

    const toggleMenu = () => {
        if(header.current){
            header.current.classList.toggle("_active");
            document.body.classList.toggle("_locked");
            if(style === headerStyle.blackWhite){
                if(header.current.classList.contains("_active")){
                    setLogoPath(headerStore.logo.srcs.white);
                }else{
                    setLogoPath(headerStore.logo.srcs.black);
                }
            }
        }
    }
    const showMenu = () => {
        if(header.current){
            header.current.classList.add("_active");
            document.body.classList.add("_locked");
            if(style === headerStyle.blackWhite){
                setLogoPath(headerStore.logo.srcs.white);
            }
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

    let headerMenu = useRef<HTMLUListElement>(null);
    const hideActiveMenuLink = () => {
        if(headerMenu.current){
            headerMenu.current.classList.add("_hide-active");
        };
    };
    const showActiveMenuLink = () => {
        if(headerMenu.current){
            headerMenu.current.classList.remove("_hide-active");
        };
    };

    const makeMenuLinkPseudoActive = (e : FocusEvent<HTMLElement> | MouseEvent<HTMLElement>) : void =>{
        makePseudoActive(e, headerMenu);
        if(window.innerWidth <= 768){
            showMenu();
        };
    };
    const makeMenuLinkUnPseudoActive = (e : FocusEvent<HTMLElement> | MouseEvent<HTMLElement>) : void =>{
        makeUnPseudoActive(e, headerMenu);
        if(window.innerWidth <= 768 && window.innerWidth > 480){
            hideMenu();
        };
    };

    const userStore = useTypedSelector(state => state.user);
    if(location.pathname.includes(signInPath) || location.pathname.includes(signUpPath) || 
    headerStore.links.flights === "" || headerStore.links.hotels === "" || headerStore.logo.srcs.black === "" || 
    headerStore.logo.srcs.white === "" || headerStore.authorization.favourites === "" || 
    headerStore.authorization.signIn === "" || headerStore.authorization.signUp === ""){
        return <Fragment />
    };

    let menuLinks : headerLink[] = [                            
        {
            type: contentPart.Flights, isActive: location.pathname.includes(flightsPath), 
            about: headerStore.links.flights, path: flightsPath
        }, 
        {
            type: contentPart.Hotels, isActive: location.pathname.includes(hotelsPath), 
            about: headerStore.links.hotels, path: hotelsPath
        }
    ];
    return(
        <header className={"header " + style} ref={header}>
            <div className={"container" + ((style === headerStyle.blackWhite) ? "" : "_header")}>
                <nav className="header__menu menu-header">
                    <ul className="menu-header__list" ref={headerMenu}>
                        {menuLinks.map((link : headerLink, i) => {
                            if(link.isActive){
                                return(
                                    <li className={"menu-header__link menu-header__link_" + link.type.toLowerCase()} key={i}>
                                        <div 
                                            className={
                                                "menu-header__link-inner " + 
                                                "menu-header__link_" + link.type.toLowerCase() + "-inner " + "icon-" +
                                                ((link.type === contentPart.Flights) ? "plane" : "bed") + " _active"
                                            }
                                        >
                                            <span>{link.about}</span>
                                        </div>
                                    </li>
                                )
                            }
                            return(
                                <li className={"menu-header__link menu-header__link_" + link.type.toLowerCase()} key={i}>
                                    <NavLink 
                                        tabIndex={tabIndexes.nav++}
                                        className={
                                            "menu-header__link-inner menu-header__link_hotel-inner icon-" +
                                            ((link.type === contentPart.Flights) ? "plane" : "bed") 
                                        }
                                        to={link.path}
                                        onClick={(e) => makeUnPseudoActive(e, headerMenu)}
                                        onMouseEnter={(e) => makePseudoActive(e, headerMenu)} 
                                        onMouseLeave={(e) => {
                                            if(e.target !== document.activeElement){
                                                makeUnPseudoActive(e, headerMenu);
                                            }
                                        }} onFocus={(e) => makeMenuLinkPseudoActive(e)} 
                                        onBlur={(e) => makeMenuLinkUnPseudoActive(e)}
                                    >
                                        <span>{link.about}</span>
                                    </NavLink>
                                </li>
                            )
                        })}
                    </ul>
                    {(userStore.firstName !== "")
                        ? <HeaderAccount 
                            classes={["menu-header"]} 
                            startTabIndex={tabIndexes.hiddenAuthorization}
                            isHaveFavourites={(
                                userStore.favourites.flights.length !== 0 || userStore.favourites.hotels.length !== 0
                            )} 
                            favouritesText={headerStore.authorization.favourites}
                            ava={userStore.ava}
                            fullName={userStore.firstName + " " + userStore.lastName[0] + "."}
                        />
                        : <HeaderAuthorization
                            classes={["menu-header"]} startTabindex={tabIndexes.hiddenAuthorization}
                            signIn={headerStore.authorization.signIn} signUp={headerStore.authorization.signUp}
                            hideMenu={hideMenu}
                        />
                    }
                </nav>
                {(style === headerStyle.start)  
                    ? <div className="header__image">
                        <img src={headerStore.logo.srcs.white} alt={headerStore.logo.alt} />
                    </div>
                    : <NavLink 
                        tabIndex={tabIndexes.image}
                        className="header__image" to={homePath}                                
                        onMouseEnter={hideActiveMenuLink} 
                        onMouseLeave={(e) => {
                            if(e.target !== document.activeElement){
                                showActiveMenuLink();
                            }
                        }} onFocus={hideActiveMenuLink} onBlur={showActiveMenuLink}
                    >
                        <img src={logoPath} alt={headerStore.logo.alt} />
                    </NavLink> 
                    
                }
                {(userStore.firstName !== "")
                    ? <HeaderAccount 
                        classes={["header"]} 
                        startTabIndex={tabIndexes.authorization}
                        isHaveFavourites={(
                            userStore.favourites.flights.length !== 0 || userStore.favourites.hotels.length !== 0
                        )} 
                        favouritesText={headerStore.authorization.favourites}
                        ava={userStore.ava}
                        fullName={userStore.firstName + " " + userStore.lastName[0] + "."}
                    />
                    : <HeaderAuthorization
                        classes={["header"]} startTabindex={tabIndexes.authorization}
                        signIn={headerStore.authorization.signIn} signUp={headerStore.authorization.signUp}
                        hideMenu={hideMenu}
                    />
                }
                <button className="header__burger burger" type="button" onClick={toggleMenu} tabIndex={tabIndexes.burger}><span></span></button>
            </div>
        </header>
    )
}