import React, { FC } from "react";
import { useTypedSelector } from "../../../hooks/redux";
import { FooterItem } from "./FooterItem";

interface FooterProps{

}

export const Footer : FC<FooterProps> = () =>{
    const footerStore = useTypedSelector(store => store.footer);

    return(
        <footer className="footer">
            <div className="container footer__post post-footer">
                <div className="post-footer__inner">
                    <div className="post-footer__main">
                        <h3 className="post-footer__heading">{footerStore.post.heading}</h3>
                        <h4 className="post-footer__subheading">{footerStore.post.subheading}</h4>
                        <div className="post-footer__info">{footerStore.post.info}</div>
                        <div className="post-footer__row">
                            <input className="post-footer__input" type="email" placeholder={footerStore.post.input} />
                            <button 
                                data-value={footerStore.post.button} 
                                className="post-footer__button" 
                                type="submit"
                            >
                                <span>{footerStore.post.button}</span>
                            </button>
                        </div>
                    </div>
                    <div className="post-footer__image" style={{
                        background: `url(${footerStore.post.image}) center no-repeat`, 
                        backgroundSize: "contain"
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
                            {footerStore.main.info.socials.map((iconText, index) => 
                                <a className={`info-main-footer__social ${iconText}`} key={index} href="#"></a>)
                            }
                        </div>
                    </div>
                    <nav className="main-footer__items">
                        {footerStore.main.items.map((item, index) => <FooterItem 
                            key={index} 
                            id={index}
                            title={item.title} 
                            list={item.list} 
                            isActive = {item.isActive}
                        /> )}
                    </nav>
                </div>
            </div>
        </footer>
    )
}