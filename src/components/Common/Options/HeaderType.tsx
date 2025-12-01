import React, { type FC } from "react";
import type { IconParams, useStateReturned } from "../../../types";
import type { HeaderType } from "./Options";


interface OptionsUnActiveHeaderType{
    about: HeaderType,
    isActive: false
}
interface OptionsActiveHeaderType{
    about: HeaderType,
    isActive: true
    onClickHandler: () => void,
    isHoveredOnUnActive: useStateReturned<boolean>
}

export const OptionsHeaderType : FC<OptionsActiveHeaderType | OptionsUnActiveHeaderType> = ({about, isActive, ...props}) => {
    const {description, cl, iconValue} = about;
    if(!isActive){
        return(
            <li className={["options__type", "type-options", cl].join(" ")}>
                <button className="type-options__button" type="button" disabled>
                    <div className="type-options__icon-parent">
                        <svg className="type-options__icon" width={iconValue.width} height={iconValue.height}>
                            {iconValue.pathes.map((path, j) => 
                                <path {...path} key={j} />
                            )}
                        </svg>
                    </div>
                    <span className="type-options__desc">{description}</span>
                </button>
            </li>
        )
    }

    let [isHoveredOnUnActiveValue, setIsHoveredOnUnActive] = (props as OptionsActiveHeaderType).isHoveredOnUnActive;
    const makeIsHovered = () => setIsHoveredOnUnActive(true);
    const unMakeIsHovered = () => setIsHoveredOnUnActive(false);

    return(
        <li className={["options__type", "type-options", cl].join(" ")}>
            <button 
                className="type-options__button" type="button"
                onClick={(props as OptionsActiveHeaderType).onClickHandler}
                onMouseEnter={makeIsHovered} onMouseLeave={(e) => {
                    if(document.activeElement !== e.currentTarget){
                        unMakeIsHovered();
                    }
                }} onFocus={makeIsHovered} onBlur={unMakeIsHovered}
            >
                <div className="type-options__icon-parent">
                    <svg className="type-options__icon" width={iconValue.width} height={iconValue.height}>
                        {iconValue.pathes.map((path, j) => 
                            <path {...path} key={j} />
                        )}
                    </svg>
                </div>
                <span className="type-options__desc">{description}</span>
            </button>
        </li>
    )
}