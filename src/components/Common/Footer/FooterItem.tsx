import React, { FC, useRef, useState } from "react";
import { defaultSelect } from "../../../types";
import { SelectInfo } from "../Select/SelectInfo";

interface footerItemProps{
    about : defaultSelect
}

export const FooterItem : FC<footerItemProps> = ({about}) => {
    return(
        (window.innerWidth > 480) ?
            <li className="footer__select select-footer">
                <h3 className="select-footer__title">{about.title}</h3>
                <ul className="select-footer__list">
                    {about.links.map((link, i) => 
                        <li className="select-footer__link" key={i}>
                            <a className="select-footer__link-inner" href={link.path}>{link.description}</a>
                        </li>
                    )}
                </ul>
            </li> 
            : 
            <SelectInfo about={about} parentClasses={["footer"]} />
    )
}