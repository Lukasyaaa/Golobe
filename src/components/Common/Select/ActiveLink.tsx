import React, { type FC, type ReactNode } from "react";

interface ActiveSelectLinkProps{
    parentCl: string,
    children: ReactNode
}

export const ActiveSelectLink : FC<ActiveSelectLinkProps> = (({parentCl, children}) => {
    return(
        <li className={[parentCl + "__link", "select__link"].join(" ")}>
            <button className={[parentCl + "__button", "select__button"].join(" ")} type="button" disabled>
                {children}
            </button>
        </li>
    )
})