import React, { type FC } from "react";
import type { IconParams, useStateReturned } from "../../../types";

export interface ActiveHeaderType{
    description: string, 
    isCurrent: true, 
    cl: "flights" | "stays", 
    iconValue: IconParams
}
export interface UnActiveHeaderType{
    description: string, 
    isCurrent: false, 
    cl: "flights" | "stays", 
    iconValue: IconParams
}

interface OptionsActiveHeaderType{
    about: ActiveHeaderType
}
interface OptionsUnActiveHeaderType{
    about: UnActiveHeaderType,
    onClickHandler: () => void,
    isHoveredOnUnActive: useStateReturned<boolean>
}

export const OptionsHeaderType : FC<OptionsActiveHeaderType | OptionsUnActiveHeaderType> = (props) => {
    const {description, cl, isCurrent, iconValue} = props.about;
    if(isCurrent){
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
    const makeIsHovered = () => {
        (props as OptionsUnActiveHeaderType).isHoveredOnUnActive[1](true);
    }
    const unMakeIsHovered = () => {
        (props as OptionsUnActiveHeaderType).isHoveredOnUnActive[1](false);
    }

    return(
        <li className={["options__type", "type-options", cl].join(" ")}>
            <button 
                className="type-options__button" type="button"
                onClick={(props as OptionsUnActiveHeaderType).onClickHandler}
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