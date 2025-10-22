import React, { type FC } from "react";

interface SelectLinkProps{
    isDisabled : boolean,
    description : string,
    onFocusHandler : (() => void) | undefined,
    onBlurHandler : (() => void) | undefined,
    onClickHandler : (() => void) | undefined,
    onMouseEnterHandler : (() => void) | undefined,
    onMouseLeaveHandler : (() => void) | undefined
}

export const SelectLink : FC<SelectLinkProps> = ({isDisabled, description, onFocusHandler, onBlurHandler, onClickHandler, onMouseEnterHandler, onMouseLeaveHandler}) => {
    if(isDisabled){
        return(
            <li className="select-fieldset-options__link">
                <button className="select-fieldset-options__button" type="button" disabled>
                    {description}
                </button>
            </li>
        )
    }
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
}