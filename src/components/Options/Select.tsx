import React, { useEffect, useRef, useState, type FC, type MouseEvent } from "react";
import { ICON_VALUE, type objType } from "../../types";
import { Select } from "../Common/Select/Select";

interface OptionsSelectProps{
    iconValue : null | objType<typeof ICON_VALUE>,
    description : string,
    links : string[],
}

export const OptionsSelect : FC<OptionsSelectProps> = ({iconValue, description, links}) => {
    let isOpened = useState<boolean>(false);
    let activeLink = useState<number>(0);

    let isHovered = useState<boolean>(false);
    let select = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const selectElement = select.current;
        if(selectElement){
            if(isHovered[0]){
                selectElement.classList.add("_hovered");
            } else {
                selectElement.classList.remove("_hovered");
            }
        }
    }, [isHovered[0]]);

    const makeIsHovered = () => {
        isHovered[1](true);
    }
    const unMakeIsHovered = () => {
        isHovered[1](false);
    }

    if(iconValue !== null){
        let iconDesc;
        let iconSize = [0, 0];
        let iconOptions = {}
        switch(iconValue){
            case ICON_VALUE.people:
                iconDesc = "M 10.007101,1.14539 C 9.3229014,0.40676 8.3674014,0 7.3127014,0 c -1.06031,0 -2.01902,0.4043 -2.7,1.13836 -0.68836,0.74215 -1.02375,1.75078 -0.945,2.83992 0.1561,2.14875 1.79121,3.89672 3.645,3.89672 1.8538,0 3.4860996,-1.74762 3.6445996,-3.89602 0.0799,-1.07929 -0.2576,-2.08582 -0.9502,-2.83359 z M 13.500201,15.75 H 1.1252014 c -0.16198001,0.0021 -0.32239001,-0.0319 -0.46956001,-0.0996 -0.14717,-0.0677 -0.2774,-0.1673 -0.38122,-0.2917 -0.22852,-0.2732 -0.32063,-0.6462 -0.25242,-1.0234 0.29672,-1.646 1.22273001,-3.0287 2.67820001,-3.9994 C 3.9932514,9.4743 5.6311814,9 7.3127014,9 c 1.6815,0 3.3194996,0.4746 4.6124996,1.3359 1.4555,0.9703 2.3815,2.353 2.6782,3.9991 0.0682,0.3772 -0.0239,0.7502 -0.2524,1.0234 -0.1038,0.1244 -0.234,0.2241 -0.3812,0.2918 -0.1472,0.0678 -0.3076,0.1019 -0.4696,0.0998 z";
                iconSize = [14.625, 15.75];
                iconOptions = { fill: "rgb(17, 34, 17)" }
                break;
        }

        return(
            <div className="options__fieldset fieldset-options select have-icon" ref={select}>
                <div className="fieldset-options__icon-parent">
                    <svg className="fieldset-options__icon" width={iconSize[0]} height={iconSize[1]} fill="none">
                        <path d={iconDesc} {...iconOptions} />
                    </svg>
                </div>
                <div 
                    className={[
                        "fieldset-options__select", "select-fieldset-options", isOpened[0] ? "_active" : ""
                        ].filter(Boolean).join(" ")
                    }
                >
                    <Select 
                        description={null} links={links} isOpened={isOpened} activeLink={activeLink}
                        onMouseEnterHandler={makeIsHovered} onFocusHandler={makeIsHovered}
                        onMouseLeaveHandler={(e : MouseEvent<HTMLButtonElement>) => {
                            if(document.activeElement !== e.currentTarget){
                                unMakeIsHovered();
                            }
                        }} onBlurHandler={unMakeIsHovered}
                    />
                </div>
                <h3 className="fieldset-options__label">{description}</h3>
            </div>
        )
    }
    
    return(
        <div className="options__fieldset fieldset-options select" ref={select}>
            <div 
                className={[
                    "fieldset-options__select", "select-fieldset-options", isOpened[0] ? "_active" : ""
                    ].filter(Boolean).join(" ")
                }
            >
                <Select 
                    description={null} links={links} isOpened={isOpened} activeLink={activeLink}
                    onMouseEnterHandler={makeIsHovered} onFocusHandler={makeIsHovered}
                    onMouseLeaveHandler={(e : MouseEvent<HTMLButtonElement>) => {
                        if(document.activeElement !== e.currentTarget){
                            unMakeIsHovered();
                        }
                    }} onBlurHandler={unMakeIsHovered}
                />
            </div>
            <h3 className="fieldset-options__label">{description}</h3>
        </div>
    )
}