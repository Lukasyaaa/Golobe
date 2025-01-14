import React, { FC, Fragment, useRef, useEffect} from "react";
import { icon, iconPosition, iconValue } from "../../../types.ts";
import { Select } from "../Select.tsx";

interface optionSelectProps{
    label : string,
    startActive : number,
    links : string[],
    icon : null | icon,
    isBigger : boolean,
    isHotelPart : boolean
}

export const OptionSelect : FC<optionSelectProps> = ({label, startActive, links, icon, isBigger, isHotelPart}) => {
    let selectElement = useRef<HTMLDivElement>(null);
    let labelElement = useRef<HTMLElement>(null);

    useEffect(() => {
        if(selectElement.current && labelElement.current){            
            labelElement.current.style.maxWidth = `${(selectElement.current.offsetWidth) / 16}rem`;
        }
    }, []);

    if(links.length !== 0 && label !== "" && startActive >= 0 && startActive < links.length - 1){
                let classes = ["options__select", "select-options", "select"];
                if(isHotelPart){
                    classes.push((isBigger) ? "bigger" : "smaller");
                }
                if(icon !== null){
                    switch(icon.value){
                        case iconValue.BED:
                            classes.push("icon-bed");
                            break;
                        case iconValue.DATE:
                            classes.push("icon-date");
                            break;
                        case iconValue.HUMAN:
                            classes.push("icon-user");
                            break;
                    }
                    if(icon.position === iconPosition.LEFT){
                        classes.push("left");
                    } else {
                        classes.push("right");
                    }
                }
        return(
            <div className={classes.join(" ")} ref={selectElement}>
                <Select classes={["select-options"]} links={links} startActive={startActive} />
                <h3 className="select-options__label" ref={labelElement}><span>{label}</span></h3>
            </div>
        );
    }
    return <Fragment />
}