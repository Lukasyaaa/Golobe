import React, { FC, Fragment } from "react";
import { link } from "../../types";
import { NavLink } from "react-router-dom";

interface breadcrumbsProps{
    parentClasses : string[],
    links : link[],
    current : string,
    isNoneColor : boolean
}

export const BreadCrumbs : FC<breadcrumbsProps> = ({parentClasses, links, current, isNoneColor}) => {
    if(links.length !== 0){
        if(isNoneColor){
            return(
                <nav
                    className={parentClasses.map(cl => cl + "__breadcrumbs").join(" ") + " " + parentClasses.map(cl => "breadcrumbs-" + cl).join(" ") + " breadcrumbs breadcrumbs_none-colored"}    
                >
                    <ul
                        className={parentClasses.map(cl => "breadcrumbs-" + cl + "__inner").join(" ") + " breadcrumbs__inner breadcrumbs_none-colored__inner"}
                    >
                        {links.map((link, i) => 
                            <li 
                                className={parentClasses.map(cl => "breadcrumbs-" + cl + "__link").join(" ") + " breadcrumbs__link breadcrumbs_none-colored__link icon-arrow_bottom _active"}
                                key={i}
                            >
                                <NavLink 
                                    className={parentClasses.map(cl => "breadcrumbs-" + cl + "__link-inner").join(" ") + " breadcrumbs__link-inner breadcrumbs_none-colored__link-inner"} 
                                    to={link.path}
                                >
                                    {link.description}
                                </NavLink>
                            </li>
                        )}
                        <li className={parentClasses.map(cl => "breadcrumbs-" + cl + "__link").join(" ") + " breadcrumbs__link breadcrumbs_none-colored__link"}>
                            {current}
                        </li>
                    </ul>
                </nav>
            )
        } else {
            return(
                <nav
                    className={parentClasses.map(cl => cl + "__breadcrumbs").join(" ") + " " + parentClasses.map(cl => "breadcrumbs-" + cl).join(" ") + " breadcrumbs breadcrumbs_colored"}    
                >
                    <ul
                        className={parentClasses.map(cl => "breadcrumbs-" + cl + "__inner").join(" ") + " breadcrumbs__inner breadcrumbs_colored__inner"}
                    >
                        {links.map((link, i) => 
                            <li 
                                className={parentClasses.map(cl => "breadcrumbs-" + cl + "__link").join(" ") + " breadcrumbs__link breadcrumbs_colored__link icon-arrow_bottom _active"}
                                key={i}
                            >
                                <NavLink 
                                    className={parentClasses.map(cl => "breadcrumbs-" + cl + "__link-inner").join(" ") + " breadcrumbs__link-inner breadcrumbs_colored__link-inner"} 
                                    to={link.path}
                                >
                                    {link.description}
                                </NavLink>
                            </li>
                        )}
                        <li className={parentClasses.map(cl => "breadcrumbs-" + cl + "__link").join(" ") + " breadcrumbs__link breadcrumbs_colored__link"}>
                            {current}
                        </li>
                    </ul>
                </nav>
            )
        }
    }
    return <Fragment />
}