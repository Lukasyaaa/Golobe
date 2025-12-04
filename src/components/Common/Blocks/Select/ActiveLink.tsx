import { type FC, type ReactNode } from "react";

interface ActiveSelectLinkProps{
    parentCls: string[],
    children: ReactNode
}

export const ActiveSelectLink : FC<ActiveSelectLinkProps> = (({parentCls, children}) => {
    return(
        <li className={[...parentCls.map(cl => cl + "__link"), "select__link"].join(" ")}>
            <button className={[...parentCls.map(cl => cl + "__button"), "select__button"].join(" ")} type="button" disabled>
                {children}
            </button>
        </li>
    )
})