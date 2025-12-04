import { type FC, type ReactNode } from "react";

interface UnActiveSelectLinkProps{
    parentCls: string[],
    children: ReactNode,
    onFocusHandler: (() => void) | undefined,
    onBlurHandler: (() => void) | undefined,
    onClickHandler: (() => void),
    onMouseEnterHandler: (() => void) | undefined,
    onMouseLeaveHandler: (() => void) | undefined
}

export const UnActiveSelectLink : FC<UnActiveSelectLinkProps> = (({parentCls, children, onFocusHandler, onBlurHandler, onClickHandler, onMouseEnterHandler, onMouseLeaveHandler}) => {
    return(
        <li className={[...parentCls.map(cl => cl + "__link"), "select__link"].join(" ")}>
            <button 
                className={[...parentCls.map(cl => cl + "__button"), "select__button"].join(" ")} type="button"
                onFocus={onFocusHandler} onBlur={onBlurHandler} onClick={onClickHandler} 
                onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}
            >
                {children}
            </button>
        </li>
    )
})