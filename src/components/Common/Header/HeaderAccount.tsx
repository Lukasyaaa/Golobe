import React, { FC } from "react";
import { image } from "../../../types";
import { NavLink } from "react-router-dom";
import { accountInfoPath, favouritesPath } from "../../../App";

interface HeaderAccountProps{
    classes : string[],
    startTabIndex : number,
    isHaveFavourites : boolean,
    favouritesText : string,
    ava : image,
    fullName : string
}

export const HeaderAccount : FC<HeaderAccountProps> = ({classes, startTabIndex, isHaveFavourites, favouritesText, ava, fullName}) => {
    return(
        <ul className={classes.map(cl => cl + "__account").join(" ") + " " + classes.map(cl => "account-" + cl).join(" ")}>
            {(isHaveFavourites)
                ? <NavLink 
                    className={classes.map(cl => "account-" + cl + "__favourites").join(" ") + " icon-heart"}
                    to={favouritesPath} tabIndex={startTabIndex++}
                >
                    <span>{favouritesText}</span>
                </NavLink>
                : <div className={classes.map(cl => "account-" + cl + "__favourites").join(" ") + " icon-heart _disabled"}>
                    <span>{favouritesText}</span>
                </div>
            }
            <NavLink 
                className={classes.map(cl => "account-" + cl + "__info").join(" ")} to={accountInfoPath} 
                tabIndex={startTabIndex}
            >
                <figure className={classes.map(cl => "account-" + cl + "__image").join(" ")}>
                    <img src={ava.src} alt={ava.alt} />
                </figure>
                <figcaption className={classes.map(cl => "account-" + cl + "__name").join(" ")}>{fullName}</figcaption>
            </NavLink>
        </ul>
    )
}