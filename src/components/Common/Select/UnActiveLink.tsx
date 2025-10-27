import React, { type FC } from "react";

interface UnActiveSelectLinkProps{
    description : string,
    onFocusHandler : (() => void) | undefined,
    onBlurHandler : (() => void) | undefined,
    onClickHandler : (() => void),
    onMouseEnterHandler : (() => void) | undefined,
    onMouseLeaveHandler : (() => void) | undefined
}

export const UnActiveSelectLink : FC<UnActiveSelectLinkProps> = (({description, onFocusHandler, onBlurHandler, onClickHandler, onMouseEnterHandler, onMouseLeaveHandler}) => {
    return(
        <li className="select-fieldset-options__link">
            <button 
                className="select-fieldset-options__button" type="button"
                onFocus={onFocusHandler} onBlur={onBlurHandler} onClick={onClickHandler} 
                onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}
            >
                {description}
            </button>
        </li>
    )
})