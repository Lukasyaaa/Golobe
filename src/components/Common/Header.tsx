import React, { useRef, forwardRef, ForwardRefRenderFunction, MouseEvent, useEffect, FocusEvent } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTypedSelector } from "../../hooks/redux";
import { header } from "../../types";
import { flightsPath, homePath, hotelsPath } from "../../App";
import { useDispatch } from "react-redux";
import { headerMakeAllNotActiveAction, headerMakeFlightsActiveAction, headerMakeHotelsctiveAction } from "../../store/start/headerReducer";

interface isScrollType{
    value : boolean,
    set : (newValue : boolean) => void;
}

interface HeaderProps{
    toggleMenu : (e : MouseEvent<HTMLButtonElement>) => void;
    disappearMenu : () => void;
    isScroll : isScrollType;
}

enum headerStyle{
    start = "_start",
    blackWhite = "_black-white"
}

const Header : ForwardRefRenderFunction<HTMLElement, HeaderProps> = (props, ref) =>{
    const header = useTypedSelector<header>(store => store.header);
    let location = useLocation();
    let style : string = (location.pathname === homePath) ? headerStyle.start : headerStyle.blackWhite;

    const dispatch = useDispatch();

    let buttonParent = useRef<HTMLElement>(null);
    let linksParent = useRef<HTMLUListElement>(null);

    useEffect(()=>{
        props.isScroll.set(window.scrollY > 0);
        style = (location.pathname === homePath) ? headerStyle.start : headerStyle.blackWhite;
        if(location.pathname === flightsPath){
            dispatch(headerMakeFlightsActiveAction());
        }else if(location.pathname === hotelsPath){
            dispatch(headerMakeHotelsctiveAction());
        }else if(location.pathname === homePath){
            dispatch(headerMakeAllNotActiveAction());
        }
    }, [location.pathname]);

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
        if(linksParent.current && location.pathname != homePath){
            linksParent.current.classList.add("_hide-active");
            let target : any = e.currentTarget;
            target.classList.add("_hovered");
        }
    }

    const makeUnPseudoActive = (e : MouseEvent<HTMLAnchorElement> | FocusEvent<HTMLAnchorElement>) =>{
        if(linksParent.current && location.pathname != homePath){
            linksParent.current.classList.remove("_hide-active");
            let target : any = e.currentTarget;
            target.classList.remove("_hovered");
        }
    }

    let headerClasses : string[] = ["header", style];

    useEffect(() =>{
        props.isScroll.set(window.scrollY > 0);
    },[])

    if(props.isScroll.value){
        headerClasses.push("_scroll");
    }

    return(
        <header ref={ref} className={headerClasses.join(" ")}>
            <div className="container">
            <nav className="header__menu menu-header header__nav">
                    <ul className="menu-header__list" ref={linksParent}>
                        {header.links.map((link, index) => {
                            if(link.isActive){
                                return <li className="header__link menu-header__link" key={index}>
                                    <div className={[link.iconValue, "_active"].join(" ")}><span>{link.value}</span></div>
                                </li>
                            }

                            return <li className="header__link menu-header__link" key={index}>
                                <NavLink 
                                    className={link.iconValue} to={link.href}
                                    onMouseEnter={(e) => makePseudoActive(e)} 
                                    onMouseLeave={(e) => {
                                        if(e.target !== document.activeElement){
                                            makeUnPseudoActive(e);
                                        }
                                    }}
                                    onFocus={(e) => makePseudoActive(e)}
                                    onBlur={(e) => makeUnPseudoActive(e)}
                                    onClick={props.disappearMenu}
                                ><span>{link.value}</span></NavLink>
                            </li>
                        })}
                    </ul>
                    <div className="menu-header__buttons">
                        {header.buttons.map((button, index) => (
                            <a key={index} className="menu-header__button" href={button.href}><span>{button.value}</span></a>
                        ))}
                    </div>
                </nav>
                {(style === headerStyle.start) ?
                <div className="header__logo">
                    <img src={(style === headerStyle.start) ? header.image.start : header.image.another} alt="Logo" />
                </div> 
                :
                <NavLink className="header__logo" to={homePath}>
                    <img src={(style === headerStyle.start) ? header.image.start : header.image.another} alt="Logo" />
                </NavLink>
                }
                <nav ref={buttonParent} className="header__buttons buttons-header header__nav _right-active">
                    {header.buttons.map((button, index) => (
                        <a 
                            key={index}
                            data-id={index}
                            className="header__link buttons-header__link" 
                            href={button.href} 
                            onMouseEnter={(e) => hoverButton(e)} onFocus={(e) => hoverButton(e)} onBlur={(e) => hoverButton(e)}
                        >
                            <span>{button.value}</span>
                        </a>
                    ))}
                </nav>
                <button className="header__burger burger" type="button" onClick={(e) => props.toggleMenu(e)}><span></span></button>
            </div>
        </header>
    );
}

export default forwardRef<HTMLElement, HeaderProps>(Header);