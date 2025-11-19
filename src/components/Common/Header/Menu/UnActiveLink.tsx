import React, { type FC } from "react";
import type { MenuLink } from "../Header";

export const UnActiveLink : FC<MenuLink> = ({uniqueCl, iconValue, description}) => {
    return(
        <li className="menu__punkt _current">
            <div className={["menu__link", "link-menu", uniqueCl].join(" ")}>
                <div className="link-menu__icon-parent">
                    <svg className="link-menu__icon" viewBox={"0 0 " + iconValue.width + " " + iconValue.height}>
                        {iconValue.pathes.map((path, i) => 
                            <path key={i} {...path} />
                        )}
                    </svg>
                </div>
                <span className="link-menu__desc">{description}</span>
            </div>
        </li>
    )
}