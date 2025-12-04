import { type FC } from "react";
import { NavLink } from "react-router-dom";
import type { UserSpoilerItem as UserSpoilerItemType } from "./User";
import { transformIconViewbox } from "../../../../types";

interface UserSpoilerItemProps{
    value: UserSpoilerItemType,
    tabIndex: number,
    parentCl: string,
    onFocusHandler: (() => void) | undefined,
    onBlurHandler: (() => void) | undefined
}

export const UserSpoilerItem : FC<UserSpoilerItemProps> = ({value, tabIndex, parentCl, onFocusHandler, onBlurHandler}) => {
    const {icon, description, functional, isLink} = value;
    if(isLink){
        return(
            <li className={`spoiler-user-${parentCl}__link link-spoiler-user-${parentCl}`}>
                <NavLink 
                    className={`link-spoiler-user-${parentCl}__inner`} to={functional}
                    onFocus={onFocusHandler} onBlur={onBlurHandler} tabIndex={tabIndex}
                >
                    <div className={`link-spoiler-user-${parentCl}__icon-parent content`}>
                        <svg className={`link-spoiler-user-${parentCl}__icon`} viewBox={transformIconViewbox(icon.viewbox)} width={icon.width} height={icon.height} fill="none">
                            {icon.pathes.map((path, j) => <path key={j} {...path} />)}
                        </svg>
                    </div>
                    <div className={`link-spoiler-user-${parentCl}__description`}>{description}</div>
                    <div className={`link-spoiler-user-${parentCl}__icon-parent arrow`}>
                        <svg  className={`link-spoiler-user-${parentCl}__icon`} viewBox="0 0 15 8.25" width="13" height="6.5" fill="none">
                            <path
                                fillRule="nonzero" d="M 0.75,0.75 7.5,7.5 14.25,0.75"
                                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" 
                            />
                        </svg>
                    </div>
                </NavLink>
            </li>
        )
    }
    return(
        <li className={`spoiler-user-${parentCl}__link link-spoiler-user-${parentCl}`}>
            <button 
                className={`link-spoiler-user-${parentCl}__inner`} type="button" onClick={functional}
                onFocus={onFocusHandler} onBlur={onBlurHandler} tabIndex={tabIndex}
            >
                <div className={`link-spoiler-user-${parentCl}__icon-parent content`}>
                    <svg className={`link-spoiler-user-${parentCl}__icon`} viewBox={transformIconViewbox(icon.viewbox)} width={icon.width} height={icon.height} fill="none">
                        {icon.pathes.map((path, j) => <path key={j} {...path} />)}
                    </svg>
                </div>
                <div className={`link-spoiler-user-${parentCl}__description`}>{description}</div>
            </button>
        </li>
    )
}