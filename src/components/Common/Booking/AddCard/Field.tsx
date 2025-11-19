import React, { Fragment, type ChangeEvent, type FC, type ReactElement } from "react";
import { ICON_POSITION, transformIconViewbox, type AddCardField as AddCardFieldType, type BOOKING_ICON_VALUE, type IconParams, type IconValue, type objType } from "../../../../types";

interface AddCardFieldProps{
    about: AddCardFieldType, 
    id: number,
    onChange: (e : ChangeEvent<HTMLInputElement>) => void,
    value: string,
    getIconValue: (about : null | IconValue<objType<typeof BOOKING_ICON_VALUE>>) => (null | IconParams)
}

export const AddCardField: FC<AddCardFieldProps> = ({about, id, value, onChange, getIconValue}) => {
    const iconValue: IconParams | null =  getIconValue(about.icon);
    let classes = ["add-card__input", "input-add-card", "add-card__field", "field-add-card"];
    let Icon: ReactElement = <Fragment />
    if(about.icon !== null && iconValue !== null){
        if(about.icon.pos === ICON_POSITION.left){
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
            classes.push("have-icon", "right");
        }
    }
    return(
        <div className={classes.join(" ")}>
            {Icon}
            <label 
                className="input-add-card__description field-add-card__description" 
                htmlFor={"add-card_" + String(id)}
            >
                {about.label}
            </label>
            <input 
                className="input-add-card__field field-add-card__input" type="text" id={"add-card_" + String(id)}
                placeholder={about.placeholder} value={value} onInput={onChange}
            />
        </div>
    )
}