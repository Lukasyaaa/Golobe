import React, { FC, Fragment } from "react";
import { FooterPost } from "./FooterPost";
import { useTypedSelector } from "../../../useTypedSelector";
import { defaultSelect } from "../../../types";
import { FooterItem } from "./FooterItem";

export const Footer : FC = () =>{
    const state = useTypedSelector(store => store.footer);

    let filtredGroups : defaultSelect[] = [];
    state.main.groups.forEach(group => {
        if(group.links.length !== 0 && group.title !== ""){
            filtredGroups.push(group);
        }
    })

    if(filtredGroups.length !== 0){
        return(
            <footer className="footer">
                <FooterPost about={state.post} />
                <div className="footer__main">
                    <div className="container">
                        {(state.main.info.socials.length > 0) ?
                            <div className="footer__info">
                                <div className="footer__image">
                                    <img {...state.main.info.logo} />
                                </div>
                                {state.main.info.socials.length > 0 &&
                                    <ul className="footer__socials">
                                        {state.main.info.socials.map((social, i) => 
                                            <li className="footer__social">
                                                <a className={"footer__social-inner " + social.type} href={social.path}></a>
                                            </li>
                                        )}
                                    </ul>
                                }
                            </div>
                            :
                            <div className="footer__info footer__image">
                                <img {...state.main.info.logo} />
                            </div>
                        }
                        <nav className="footer__nav">
                            <ul className="footer__nav-list">
                                {filtredGroups.map((group, i) => 
                                    <FooterItem about={group} key={i} />
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
            </footer>
        )
    }
    return <Fragment />
}