import React, { type FC } from "react";
import { SITE_PARTS, type objType, type Srcs } from "../../../types";
import { Location } from "./Location";
import { NavLink } from "react-router-dom";

interface IntroductionLinkProps{
    path: string,
    parentCls: string[],
    logo: Srcs, title: string, text: string,
    contentType: objType<typeof SITE_PARTS>
}

export const IntroductionLink : FC<IntroductionLinkProps> = ({path, parentCls, logo, title, text, contentType}) => {
    return(
        <NavLink 
            className={`${parentCls.map(cl => cl + "__link").join(" ")} ${parentCls.map(cl => "link-" + cl).join(" ")} introduction__link link-introduction`} 
            to={path}
        >
            <picture className={`${parentCls.map(cl => "link-" + cl + "__logo").join(" ")} link-introduction__logo`}>
                <source srcSet={logo.webp} type="image/webp" />
                <img src={logo.jpeg} alt={title} />
            </picture>
            <div className={`${parentCls.map(cl => "link-" + cl + "__subimage").join(" ")} link-introduction__subimage`}>
                <h3 className={`${parentCls.map(cl => "link-" + cl + "__title").join(" ")} link-introduction__title`}>
                    {title}
                </h3>
                {contentType === SITE_PARTS.flights 
                    ? <div className={`${parentCls.map(cl => "link-" + cl + "__plane").join(" ")} link-introduction__plane`}>
                        {text}
                    </div>
                    : <Location parentCls={[...parentCls.map(cl => "link-" + cl), "link-introduction"]} info={text} />
                }
            </div>
        </NavLink>
    )
}