import React, {FC, useState, useRef, useEffect, MouseEvent, FocusEvent } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTypedSelector } from "../../hooks/redux";
import { flightsConfiguratePath, flightsPath, homePath, hotelsConfiguratePath, hotelsPath } from "../../App";
import { useDispatch } from "react-redux";
import { headerMakeAllNotActiveAction, headerMakeFlightsActiveAction, headerMakeHotelsctiveAction } from "../../store/common/headerReducer";

enum headerStyle{
    start = "_start",
    blackWhite = "_black-white"
}

export const Header : FC = () =>{
    const headerStore = useTypedSelector(store => store.header);
    let header = useRef<HTMLElement>(null);
    let location = useLocation();
    let [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);


    let imageTab : number = -1; 
    let linksStartTab : number = 1;
    let buttonsStartTab : number = 1 + headerStore.links.items.length;
    let burgerTab : number = -1;
    const setTabIndexes = () : void =>{
        if(location.pathname !== homePath){
            imageTab = (windowWidth <= 768) ? 1 : 1 + headerStore.links.items.length;
        }
        if(windowWidth <= 768){
            const shift : number = ((imageTab > 0) ? imageTab : 0);
            linksStartTab = headerStore.buttons.length + shift + 2;
            buttonsStartTab = 1 + shift;
            burgerTab = headerStore.buttons.length + shift + 1;

            if(windowWidth <= 480){
                burgerTab = 2;
                linksStartTab = 3;
            }
        }
    }
    setTabIndexes();

    const setNewWindowWidth = () : void => {
        setWindowWidth(window.innerWidth);
        setTabIndexes();
    }
    const updateHeaderOnScrollChange = () : void =>{
        if(header.current){
            if(window.scrollY > 0){
                header.current.classList.add("_scroll");
            }else{
                header.current.classList.remove("_scroll");
            }
        }
    }
    useEffect(() =>{
        window.addEventListener('scroll', updateHeaderOnScrollChange);
        window.addEventListener("resize", () => setNewWindowWidth());
        return () => {
            window.removeEventListener('scroll', updateHeaderOnScrollChange);
            window.removeEventListener("resize", () => setNewWindowWidth());
        };
    }, [])

    let linksParent = useRef<HTMLUListElement>(null);
    const disappearMenu = () : void =>{
        if(header.current && linksParent.current){
            header.current.classList.remove("_active");
            document.body.classList.remove("_locked");
            linksParent.current.classList.remove("_hide-active");
        }
    }
    const appearMenu = () : void =>{
        if(header.current){
            header.current.classList.add("_active");
            document.body.classList.add("_locked");
        }
    }
    const toggleMenu = () : void =>{
        if(header.current){
            header.current.classList.toggle("_active");
            document.body.classList.toggle("_locked");
        }
    }

    let dispatch = useDispatch();
    let style = (location.pathname === homePath) ? headerStyle.start : headerStyle.blackWhite;
    useEffect(()=>{
        updateHeaderOnScrollChange();
        style = (location.pathname === homePath) ? headerStyle.start : headerStyle.blackWhite;
        switch(location.pathname){
            case flightsConfiguratePath:
            case flightsPath:
                dispatch(headerMakeFlightsActiveAction());
                break;
            case hotelsConfiguratePath:
            case hotelsPath:
                dispatch(headerMakeHotelsctiveAction());
                break;
            case homePath:
                dispatch(headerMakeAllNotActiveAction());
                break;
            default:
                break;
        }
    }, [location.pathname]);


    let buttonParent = useRef<HTMLElement>(null);
    const hoverButton = (e : MouseEvent<HTMLAnchorElement> | FocusEvent<HTMLAnchorElement>) : void =>{
        if(buttonParent.current){
            if(e.currentTarget.getAttribute("data-id") === "1"){
                if(buttonParent.current.classList.contains("_left-active")){
                    buttonParent.current.classList.add("_right-active");
                    buttonParent.current.classList.remove("_left-active");
                }
            }else{
                if(buttonParent.current.classList.contains("_right-active")){
                    buttonParent.current.classList.remove("_right-active");
                    buttonParent.current.classList.add("_left-active");
                }
            }
        }
    }
    
    const makePseudoActive = (e : MouseEvent<HTMLAnchorElement> | FocusEvent<HTMLAnchorElement>) =>{
        if(linksParent.current){
            linksParent.current.classList.add("_hide-active");
            e.currentTarget.classList.add("_hovered");
        }
    }
    const makeUnPseudoActive = (e : MouseEvent<HTMLAnchorElement> | FocusEvent<HTMLAnchorElement>) =>{
        if(linksParent.current){
            linksParent.current.classList.remove("_hide-active");
            e.currentTarget.classList.remove("_hovered");
        }
    }

    return(
        <header className={["header", style].join(" ")} ref={header}>
            <div className="container">
            <nav className="header__menu menu-header header__nav">
                    <ul className="menu-header__list" ref={linksParent}>
                        {headerStore.links.items.map((link, i) => {
                            if(i === headerStore.links.activeItem - 1){
                                return <li className="header__link menu-header__link" key={i}>
                                    <div className={[link.iconValue, "_active"].join(" ")}><span>{link.value}</span></div>
                                </li>
                            }

                            if(location.pathname !== homePath){
                                return <li key={i} className="header__link menu-header__link">
                                    <NavLink 
                                        tabIndex={linksStartTab + i}
                                        className={link.iconValue} to={link.href}
                                        onMouseEnter={(e) => makePseudoActive(e)} 
                                        onMouseLeave={(e) => {
                                            if(e.target !== document.activeElement){
                                                makeUnPseudoActive(e);
                                            }
                                        }}
                                        onFocus={(e) => {
                                            if(windowWidth <= 768 && !header.current?.classList.contains("_active")){ 
                                                appearMenu();
                                            }
                                            makePseudoActive(e);
                                        }}
                                        onBlur={(e) => {
                                            if(windowWidth <= 768 && windowWidth > 480 && 
                                                i + 1 === headerStore.links.items.length
                                            ){
                                                disappearMenu();
                                            }
                                            makeUnPseudoActive(e)
                                        }}
                                        onClick={(e) => {e.stopPropagation(); disappearMenu()}}
                                    >
                                        <span>{link.value}</span>
                                    </NavLink>
                                </li>
                            }

                            return <li key={i} className="header__link menu-header__link">
                                <NavLink 
                                    tabIndex={linksStartTab + i}
                                    className={link.iconValue} to={link.href} 
                                    onClick={(e) => {e.stopPropagation(); disappearMenu()}}
                                    onFocus={() => {
                                        if(windowWidth <= 768 && !header.current?.classList.contains("_active")){ 
                                            appearMenu();
                                        }
                                    }}
                                    onBlur={() => {
                                        if(windowWidth <= 768 && windowWidth > 480 && i + 1 === headerStore.links.items.length){
                                            disappearMenu();
                                        } 
                                    }}
                                >
                                    <span>{link.value}</span>
                                </NavLink>
                            </li>
                        })}
                    </ul>
                    <div className="menu-header__buttons">
                        {headerStore.buttons.map((button, i) => {
                            if(i + 1 === headerStore.buttons.length){
                                return <a 
                                    className="menu-header__button" key={i} href={button.href}
                                    onClick={(e) => e.stopPropagation()} onBlur={disappearMenu}
                                >
                                    <span>{button.value}</span>
                                </a>
                            }
                            return <a 
                                className="menu-header__button" key={i} href={button.href} onClick={(e) => e.stopPropagation()}
                            >
                                <span>{button.value}</span>
                            </a>
                        })}
                    </div>
                </nav>
                {(style === headerStyle.start) ?
                <div className="header__logo">
                    <img src={headerStore.image.start} alt="Logo" />
                </div> 
                :
                <NavLink className="header__logo" to={homePath} tabIndex={imageTab} onClick={(e) => e.stopPropagation()}>
                    <img src={headerStore.image.another} alt="Logo" />
                </NavLink>
                }
                <nav className="header__buttons buttons-header header__nav _right-active" ref={buttonParent}>
                    {headerStore.buttons.map((button, i) => (
                        <a 
                            className="header__link buttons-header__link" 
                            tabIndex={buttonsStartTab + i}
                            key={i}
                            data-id={i}
                            href={button.href} 
                            onMouseEnter={(e) => hoverButton(e)} onFocus={(e) => hoverButton(e)}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span>{button.value}</span>
                        </a>
                    ))}
                </nav>
                <button className="header__burger burger" type="button" onClick={toggleMenu} tabIndex={burgerTab}>
                    <span></span>
                </button>
            </div>
        </header>
    );
}