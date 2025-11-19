import React, { type FC, type ReactNode } from "react";

interface UnActiveSelectLinkProps{
    parentCl: string,
    children: ReactNode,
    onFocusHandler: (() => void) | undefined,
    onBlurHandler: (() => void) | undefined,
    onClickHandler: (() => void),
    onMouseEnterHandler: (() => void) | undefined,
    onMouseLeaveHandler: (() => void) | undefined
}

export const UnActiveSelectLink : FC<UnActiveSelectLinkProps> = (({parentCl, children, onFocusHandler, onBlurHandler, onClickHandler, onMouseEnterHandler, onMouseLeaveHandler}) => {
    return(
        <li className={[parentCl + "__link", "select__link"].join(" ")}>
            <button 
                className={[parentCl + "__button", "select__button"].join(" ")} type="button"
                onFocus={onFocusHandler} onBlur={onBlurHandler} onClick={onClickHandler} 
                onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}
            >
                {children}
            </button>
        </li>
    )
})