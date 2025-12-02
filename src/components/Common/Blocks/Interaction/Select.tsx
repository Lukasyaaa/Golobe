import React, { Fragment, useEffect, useRef, useState, type Dispatch, type FC, type MouseEvent, type SetStateAction } from "react";
import { FILL_RULE, ICON_POSITION, SELECT_DESCRIPTION_TYPE, STROKE_LINECAP, STROKE_LINEJOIN, transformIconViewbox} from "../../../../types";
import type { Icon, objType, useStateReturned } from "../../../../types";
import { Select } from "../Select/Select";
import { Text } from "../Select/Text";

interface SelectDescriptionProps{
    parentCls: string[],
    icon : null | Icon,
    state: number,
    setState: (newValue: number) => void,
    description : string,
    links : string[],
}

export const SelectDescription : FC<SelectDescriptionProps> = ({parentCls, icon, description, links, state, setState}) => {
    let [isOpened, setIsOpened] = useState<boolean>(false);

    let [isHovered, setIsHovered] = useState<boolean>(false);
    const makeIsHovered = () => setIsHovered(true);
    const unMakeIsHovered = () => setIsHovered(false);

    let selectIconPos: objType<typeof ICON_POSITION> = ICON_POSITION.right;
    let innerCls = parentCls.map(cl => {
        const splitted = cl.split("__");
        if(splitted.length > 1) return splitted[1] + "-" + splitted[0];
        return cl;
    })
    let cls = [...parentCls, ...innerCls];
    let DecorableIcon = <Fragment />
    if(icon !== null){
        if(icon.pos === ICON_POSITION.left){
            selectIconPos = ICON_POSITION.right;
            cls.push("have-icon", "left");
        } else {
            selectIconPos = ICON_POSITION.left;
            cls.push("have-icon", "right");
        }
        DecorableIcon = <div className={[...innerCls.map(cl => cl + "__icon-parent"), "select_description__icon-parent"].join(" ")}>
            <svg 
                className={[...innerCls.map(cl => cl + "__icon"), "select_description__icon"].join(" ")}
                viewBox={transformIconViewbox(icon.value.viewbox)} 
                width={icon.value.width} height={icon.value.height}
            >
                {icon.value.pathes.map((path, i) => <path key={i} {...path} />)}
            </svg>
        </div>
    }
    return(
        <div className={[...cls, "select_description"].join(" ")}>
            {DecorableIcon}
            <h3 
                className={[...innerCls.map(cl => cl + "__label"), "select_description__label"].join(" ")}
            >
                {description}
            </h3>
            <div 
                className={[
                    ...innerCls.map(cl => cl + "__select"), ...innerCls.map(cl => "select-" + cl),
                    "select_description__select", "select-select_description", "select",
                    isOpened ? "_active" : ""
                ].filter(Boolean).join(" ")}
            >
                <Select 
                    parentCls={[...innerCls.map(cl => "select-" + cl), "select-select_description"]}
                    iconValue={{
                        viewbox: {minX: 0, minY: 0, width: 15, height: 8.5},
                        width: 15, height: 8.5, pathes: [{
                            d: "M 0.75,0.75 7.5,7.5 14.25,0.75",
                            fillRule: FILL_RULE.nonzero,
                            stroke: "#000000",
                            strokeLinecap: STROKE_LINECAP.round,
                            strokeLinejoin: STROKE_LINEJOIN.round,
                            strokeWidth: "1.5",
                            fill: "unset"
                        }]
                    }}
                    ChildrenComponent={Text}
                    iconPosition={selectIconPos}
                    description={{value: null, type: SELECT_DESCRIPTION_TYPE.onlyValue}} 
                    links={links} isOpened={[isOpened, setIsOpened]} 
                    activeLink={[state, setState as Dispatch<SetStateAction<number>>]}
                    onMouseEnterHandler={makeIsHovered} onFocusHandler={makeIsHovered}
                    onMouseLeaveHandler={(e : MouseEvent<HTMLButtonElement>) => {
                        if(document.activeElement !== e.currentTarget){
                            unMakeIsHovered();
                        }
                    }} onBlurHandler={unMakeIsHovered}
                />
            </div>
        </div>
    )
}