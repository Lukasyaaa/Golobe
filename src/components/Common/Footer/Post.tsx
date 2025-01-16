import React, { FC } from "react";

export const Post : FC = () => {
    return(
        <article className="container footer__post post-footer">
            <div className="post-footer__inner">
                <h2 className="post-footer__title">Subscribe Newsletter</h2>
                <div className="post-footer__supinfo">The Travel</div>
                <div className="post-footer__info">Get inspired! Receive travel discounts, tips and behind the scenes stories.</div>
                <form className="post-footer__row" action="#">
                    <input className="post-footer__input" type="email" placeholder="Your email address" />
                    <button className="post-footer__button" type="button"><span>Subscribe</span></button>
                </form>
            </div>
        </article>
    )
}