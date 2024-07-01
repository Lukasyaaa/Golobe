import React, { FC } from "react";
import { useTypedSelector } from "../../../hooks/redux";
import { FooterItem } from "./FooterItem";

interface FooterProps{

}

export const Footer : FC<FooterProps> = () =>{
    const footer = useTypedSelector(store => store.footer);

    return(
        <footer className="footer">
            <div className="container footer__post post-footer">
                <div className="post-footer__inner">
                    <div className="post-footer__main">
                        <h3 className="post-footer__heading">{footer.post.heading}</h3>
                        <h4 className="post-footer__subheading">{footer.post.subheading}</h4>
                        <div className="post-footer__info">{footer.post.info}</div>
                        <div className="post-footer__row">
                            <input className="post-footer__input" type="email" placeholder={footer.post.input} />
                            <button className="post-footer__button" type="submit">{footer.post.button}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer__main main-footer">
                <div className="container">
                    <div className="main-footer__info info-main-footer">
                        <div className="info-main-footer__image">
                            <img {...footer.main.info.image} />
                        </div>
                        <div className="info-main-footer__socials">
                            {footer.main.info.socials.map((iconText, index) => 
                                <a className={`info-main-footer__social ${iconText}`} key={index} href="#"></a>)
                            }
                        </div>
                    </div>
                    <nav className="main-footer__items">
                        {footer.main.items.map((item, index) => <FooterItem 
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