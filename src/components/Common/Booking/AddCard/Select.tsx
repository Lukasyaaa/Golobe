import React, { Fragment, useState, type FC, type ReactElement } from "react";
import { BOOKING_ICON_VALUE, FILL_RULE, ICON_POSITION, SELECT_DESCRIPTION_TYPE, STROKE_LINECAP, STROKE_LINEJOIN, transformIconViewbox, type AddCardSelect as AddCardSelectType, type IconParams, type IconValue, type objType, type useStateReturned } from "../../../../types";
import { Select } from "../../Select/Select";
import { Text } from "../../Select/Text";

interface AddCardSelectProps{
    about: AddCardSelectType,
    activeLink: useStateReturned<number>,
    getIconValue: (about : null | IconValue<objType<typeof BOOKING_ICON_VALUE>>) => (null | IconParams)
}

export const AddCardSelect: FC<AddCardSelectProps> = ({about, activeLink, getIconValue}) => {
    let isOpened = useState<boolean>(false);
    const iconValue: IconParams | null =  getIconValue(about.icon);
    let selectIconPos: objType<typeof ICON_POSITION> = ICON_POSITION.right;
    let classes = ["add-card__input", "input-add-card", "add-card__select", "select-add-card"];
    let Icon: ReactElement = <Fragment />
    if(about.icon !== null && iconValue !== null){
        if(about.icon.pos === ICON_POSITION.left){
            selectIconPos = ICON_POSITION.right;
            classes.push("have-icon", "left");
            Icon = <div className="input-add-card__icon-parent select-add-card__icon-parent">
                <svg 
                    className="input-add-card__icon select-add-card__icon" 
                    viewBox={transformIconViewbox(iconValue.viewbox)} 
                    width={iconValue.width} height={iconValue.height}
                >
                    {iconValue.pathes.map((path, i) => <path key={i} {...path} />)}
                </svg>
            </div>
        } else {
            selectIconPos = ICON_POSITION.left;
            classes.push("have-icon", "right");
        }
    }

    return(
        <div className={classes.join(" ")}>
            {Icon}
            <h3 className="input-add-card__description select-add-card__description">
                {about.label}
            </h3>
            <div className="input-add-card__select select-add-card__input select">
                <Select
                    parentCl="select-add-card"
                    description={{value: null, type: SELECT_DESCRIPTION_TYPE.onlyValue}}
                    links={about.links} isOpened={isOpened} activeLink={activeLink}
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
                    }} iconPosition={selectIconPos} ChildrenComponent={Text}
                    onMouseEnterHandler={undefined} onFocusHandler={undefined}
                    onMouseLeaveHandler={undefined}onBlurHandler={undefined}
                />
            </div>
        </div>
    )
}