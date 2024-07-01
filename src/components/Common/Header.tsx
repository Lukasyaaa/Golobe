import React, { useRef, forwardRef, ForwardRefRenderFunction, MouseEvent } from "react";
import logo from "../../assets/img/header/logo.svg"
import { useTypedSelector } from "../../hooks/redux";
import { header } from "../../types";

interface HeaderProps{
    appearMenu : (e : MouseEvent<HTMLButtonElement>) => void;
}

const Header : ForwardRefRenderFunction<HTMLElement, HeaderProps> = (props, ref) =>{
    const header = useTypedSelector<header>(store => store.another.header)
    let buttonParent = useRef<HTMLElement>(null);

    const hoverButton = (e : React.MouseEvent<HTMLAnchorElement>) : void =>{
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
    
    return(
        <header ref={ref} className="header">
            <div className="container">
                <nav className="header__menu menu-header header__nav">
                    <ul className="menu-header__list">
                        {header.links.map((link, index) => (
                            <li className="header__link menu-header__link" key={index}>
                                <a className="_icon-plane" href={link.href}><span>{link.value}</span></a>
                            </li>
                        ))}
                    </ul>
                    <div className="menu-header__buttons">
                        {header.buttons.map((button, index) => (
                            <a key={index} className="menu-header__button" href={button.href}><span>{button.value}</span></a>
                        ))}
                    </div>
                </nav>
                <div className="header__logo">
                    <img src={logo} alt="Logo" />
                </div>
                <nav ref={buttonParent} className="header__buttons buttons-header header__nav _right-active">
                    {header.buttons.map((button, index) => (
                        <a 
                            key={index}
                            data-id={index}
                            className="header__link buttons-header__link" 
                            href={button.href} 
                            onMouseEnter={(e) => hoverButton(e)}
                        >
                            <span>{button.value}</span>
                        </a>
                    ))}
                </nav>
                <button className="header__burger burger" type="button" onClick={(e) => props.appearMenu(e)}><span></span></button>
            </div>
        </header>
    );
}

export default forwardRef<HTMLElement, HeaderProps>(Header);