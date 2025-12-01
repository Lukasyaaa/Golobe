import React, { type FC } from "react";
import { NavLink } from "react-router-dom";
import { logInPath } from "../../App";

interface AuthorizationBack{
    parentCls: string[]
}

export const AuthorizationBack : FC<AuthorizationBack> = ({parentCls}) => {
    return(
        <NavLink 
            className={[
                ...parentCls.map(cl => cl + "__back"), ...parentCls.map(cl => "back-" + cl)
            ].join(" ")} to={logInPath}
        >
            <div className={parentCls.map(cl => "back-" + cl + "__icon-parent").join(" ")}>
                <svg className={parentCls.map(cl => "back-" + cl + "__icon").join(" ")} viewBox="0 0 15 8.25" width="15" height="8.25" fill="none">
                    <path 
                        d="M 0.75,0.75 7.5,7.5 14.25,0.75" fillRule="nonzero" stroke="#000000"
                        strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                    />
                </svg>
            </div>
            <span className={parentCls.map(cl => "back-" + cl + "__description").join(" ")}>Back to Login</span>
        </NavLink>
    )
}