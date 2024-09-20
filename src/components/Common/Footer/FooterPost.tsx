import React, { FC, Fragment } from "react";
import { post } from "../../../types";

interface footerPostProps{
    about : post
}

export const FooterPost : FC<footerPostProps> = ({about}) =>{
    return(
        <div className="footer__post post-footer container">
            <div className="post-footer__inner">
                {(window.innerWidth > 768) ?   
                    <Fragment>
                        <div className="post-footer__info">
                            <h3 className="post-footer__heading">{about.heading}</h3>
                            <h4 className="post-footer__title">{about.title}</h4>
                            <div className="post-footer__subtitle">{about.subtitle}</div>
                            <form className="post-footer__form" action="#">
                                <input className="post-footer__input" type="text" placeholder={about.form.inputPlaceholder} />
                                <button className="post-footer__button" type="submit" data-text={about.form.buttonSumbit}>
                                    <span>{about.form.buttonSumbit}</span>
                                </button>
                            </form>
                        </div>
                        <div className="post-footer__image">
                            <img {...about.image} />
                        </div>
                    </Fragment>              
                    :
                    <Fragment>
                        <h3 className="post-footer__heading">{about.heading}</h3>
                        <h4 className="post-footer__title">{about.title}</h4>
                        <div className="post-footer__subtitle">{about.subtitle}</div>
                        <form className="post-footer__form" action="#">
                            <input className="post-footer__input" type="text" placeholder={about.form.inputPlaceholder} />
                            <button className="post-footer__button" type="submit" data-text={about.form.buttonSumbit}>
                                <span>{about.form.buttonSumbit}</span>
                            </button>
                        </form>
                    </Fragment>
                    }
            </div>
        </div>
    )
}