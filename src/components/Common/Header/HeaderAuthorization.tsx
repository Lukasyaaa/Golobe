import React, { FC, useRef } from "react";
import { signInPath, signUpPath } from "../../../App";
import { NavLink } from "react-router-dom";

enum authorizationVariantId{
    SignIn = "_left",
    SignUp = "_right"
}

interface HeaderAuthorizationProps{
    classes : string[],
    startTabindex : number,
    signIn : string,
    signUp : string,
    hideMenu : () => void
}

export const HeaderAuthorization : FC<HeaderAuthorizationProps> = ({classes, startTabindex, signIn, signUp, hideMenu}) => {
    let authorizationVariants = useRef<HTMLUListElement>(null);
    const makeAuthorizationVariantPseudoActive = (
        checkedStyle : authorizationVariantId, addedStyle : authorizationVariantId
    ) => {
        if(authorizationVariants.current && authorizationVariants.current.classList.contains(checkedStyle)){
            authorizationVariants.current.classList.remove(checkedStyle);
            authorizationVariants.current.classList.add(addedStyle);
        };
    };

    return(
        <nav className={
            classes.map(cl => cl + "__authorization").join(" ") + " " + classes.map(cl => "authorization-" + cl).join(" ")
        }>
            <ul 
                className={
                    classes.map(cl => "authorization-" + cl + "__list").join(" ") + " _left"
                }
                ref={authorizationVariants}
            >
                <li 
                    className={
                        classes.map(cl => "authorization-" + cl + "__link").join(" ") + " " +
                        classes.map(cl => "link-authorization-" + cl).join(" ") + " " +
                        classes.map(cl => "authorization-" + cl + "__link_sign-in").join(" ") + " " +
                        classes.map(cl => "link_sign-in-authorization-" + cl).join(" ")
                    }
                >
                    <NavLink
                        className={
                            classes.map(cl => "link-authorization-" + cl + "__inner").join(" ") + " " +
                            classes.map(cl => "link_sign-in-authorization-" + cl + "__inner").join(" ")
                        }                     
                        to={signInPath} tabIndex={startTabindex}
                        onMouseEnter={
                            () => makeAuthorizationVariantPseudoActive(authorizationVariantId.SignUp, authorizationVariantId.SignIn)
                        }
                        onFocus={
                            () => makeAuthorizationVariantPseudoActive(authorizationVariantId.SignUp, authorizationVariantId.SignIn)
                        }
                    >
                        <span>{signIn}</span>
                    </NavLink>
                </li>
                <li 
                    className={
                        classes.map(cl => "authorization-" + cl + "__link").join(" ") + " " +
                        classes.map(cl => "link-authorization-" + cl).join(" ") + " " +
                        classes.map(cl => "authorization-" + cl + "__link_sign-up").join(" ") + " " +
                        classes.map(cl => "link_sign-up-authorization-" + cl).join(" ")
                    }
                >
                    <NavLink
                        className={
                            classes.map(cl => "link-authorization-" + cl + "__inner").join(" ") + " " +
                            classes.map(cl => "link_sign-up-authorization-" + cl + "__inner").join(" ")
                        }                     
                        to={signUpPath} tabIndex={startTabindex + 1} onBlur={hideMenu}
                        onMouseEnter={
                            () => makeAuthorizationVariantPseudoActive(authorizationVariantId.SignIn, authorizationVariantId.SignUp)
                        }
                        onFocus={
                            () => makeAuthorizationVariantPseudoActive(authorizationVariantId.SignIn, authorizationVariantId.SignUp)
                        }
                    >
                        <span>{signUp}</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}