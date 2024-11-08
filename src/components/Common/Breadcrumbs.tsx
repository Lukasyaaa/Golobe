import React, { FC, Fragment } from "react";
import { link } from "../../types";
import { NavLink } from "react-router-dom";

interface breadcrumbsProps{
    parentClasses : string[],
    links : link[],
    current : string
}

export const BreadCrumbs : FC<breadcrumbsProps> = ({parentClasses, links, current}) => {
    if(links.length !== 0){
        return(
            <nav
                className={parentClasses.map(cl => cl + "__breadcrumbs").join(" ") + " " + parentClasses.map(cl => "breadcrumbs-" + cl) + " breadcrumbs"}    
            >
                <ul
                    className={parentClasses.map(cl => "breadcrumbs-" + cl + "__inner") + " breadcrumbs__inner"}
                >
                    {links.map((link, i) => 
                        <li 
                            className={parentClasses.map(cl => "breadcrumbs-" + cl + "__link") + " breadcrumbs__link icon-arrow_bottom _active"}
                            key={i}
                        >
                            <NavLink 
                                className={parentClasses.map(cl => "breadcrumbs-" + cl + "__link-inner") + " breadcrumbs__link-inner"} 
                                to={link.path}
                            >
                                {link.description}
                            </NavLink>
                        </li>
                    )}
                    <li className={parentClasses.map(cl => "breadcrumbs-" + cl + "__link") + " breadcrumbs__link"}>
                        {current}
                    </li>
                </ul>
            </nav>
        )
    }
    return <Fragment />
}