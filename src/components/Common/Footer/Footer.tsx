import React, { FC, useEffect } from "react";
import { useTypedSelector } from "../../../hooks/redux";
import { FooterItem } from "./FooterItem";
import { useLocation } from "react-router-dom";
import { hotelsPath } from "../../../App";


export const Footer : FC = () =>{
    const footerStore = useTypedSelector(store => store.footer);
    const location = useLocation();

    let classes : string[] = ["footer"];
    if(location.pathname === hotelsPath){
        classes.push("gray");
    }
    useEffect(() => {
        if(location.pathname === hotelsPath){
            classes.push("gray");
        }
    }, [location])

    return(
        <footer className={classes.join(" ")}>
            <div className="container footer__post post-footer">
                <div className="post-footer__inner">
                    <div className="post-footer__main">
                        <h3 className="post-footer__heading">{footerStore.post.heading}</h3>
                        <h4 className="post-footer__subheading">{footerStore.post.subheading}</h4>
                        <div className="post-footer__info">{footerStore.post.info}</div>
                        <div className="post-footer__row">
                            <input 
                                className="post-footer__input" 
                                type="email" placeholder={footerStore.post.input} onClick={(e) => e.stopPropagation()} 
                            />
                            <button 
                                className="post-footer__button" 
                                data-value={footerStore.post.button} type="submit" onClick={(e) => e.stopPropagation()}
                            >
                                <span>{footerStore.post.button}</span>
                            </button>
                        </div>
                    </div>
                    <div className="post-footer__image" style={{
                        background: `url(${footerStore.post.image}) center no-repeat`, backgroundSize: "contain"
                    }} />
                </div>
            </div>
            <div className="footer__main main-footer">
                <div className="container">
                    <div className="main-footer__info info-main-footer">
                        <div className="info-main-footer__image">
                            <img {...footerStore.main.info.image} />
                        </div>
                        <div className="info-main-footer__socials">
                            {footerStore.main.info.socials.map((social, i) => 
                                <a 
                                    className={["info-main-footer__social", social.icon].join(" ")} 
                                    key={i} href={social.href} onClick={(e) => e.stopPropagation()}
                                ></a>)
                            }
                        </div>
                    </div>
                    <nav className="main-footer__items">
                        {footerStore.main.items.map((item, i) => <FooterItem 
                            key={i} 
                            id={i}
                            about={item}
                        /> )}
                    </nav>
                </div>
            </div>
        </footer>
    )
}