import React, { useRef, forwardRef, ForwardRefRenderFunction, MouseEvent } from "react";
import logo from "../img/main/header/logo.svg"

interface HeaderProps{
    appearMenu : (e : MouseEvent<HTMLButtonElement>) => void;
}

const Header : ForwardRefRenderFunction<HTMLElement, HeaderProps> = (props, ref) =>{
    let buttonParent = useRef<HTMLElement>(null);

    const hoverButton = (e : React.MouseEvent<HTMLAnchorElement>) : void =>{
        if(buttonParent.current){
            buttonParent.current.classList.toggle("_right-active");
            buttonParent.current.classList.toggle("_left-active");
        }
    }
    
    return(
        <header ref={ref} className="header">
            <div className="container">
                <nav className="header__menu menu-header header__nav">
                    <ul className="menu-header__list">
                        <li className="header__link menu-header__link">
                            <a className="_icon-plane" href="#"><span>Find Flight</span></a>
                        </li>
                        <li className="header__link menu-header__link">
                            <a className="_icon-bed" href="#"><span>Find Stays</span></a>
                        </li>
                    </ul>
                    <div className="menu-header__buttons">
                        <a className="menu-header__button menu-header__login" href="#"><span>Login</span></a>
                        <a className="menu-header__button menu-header__sign-in" href="#"><span>Sign up</span></a>
                    </div>
                </nav>
                <div className="header__logo">
                    <img src={logo} alt="Logo" />
                </div>
                <nav ref={buttonParent} className="header__buttons buttons-header header__nav _right-active">
                    <a 
                        className="header__link buttons-header__link buttons-header__login" 
                        href="#" 
                        onMouseEnter={(e) => hoverButton(e)}
                    >
                        <span>Login</span>
                    </a>
                    <a 
                        className="header__link buttons-header__link buttons-header__sign-in" 
                        href="#" 
                        onMouseEnter={(e) => hoverButton(e)}
                    >
                        <span>Sign up</span>
                    </a>
                </nav>
                <button className="header__burger burger" type="button" onClick={(e) => props.appearMenu(e)}><span></span></button>
            </div>
        </header>
    );
}

export default forwardRef<HTMLElement, HeaderProps>(Header);