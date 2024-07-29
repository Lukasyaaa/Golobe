import React, { FC } from "react";
import { choiceItem} from "../../types";
import { NavLink } from "react-router-dom";

interface ChoiceOptionProps{
    about : choiceItem,
    isSupportWebp : boolean
}

export const ChoiceOption : FC<ChoiceOptionProps> = ({about, isSupportWebp}) =>{
    const pathToBackground = (isSupportWebp) ? about.image.webp : about.image.jpeg;
    
    return(
        <div className="choice__item item-choice" style={{
            background: `url(${pathToBackground}) center no-repeat`, backgroundSize: "cover"}
        }> 
            <div className="item-choice__subimage">
                <h3 className="item-choice__heading">{about.heading}</h3>
                <div className="item-choice__info">{about.info}</div>
                <NavLink 
                    className="item-choice__button _icon-send" to={about.href}  onClick={(e) => e.stopPropagation()}
                >
                    <span>{about.button}</span>
                </NavLink>
            </div>
        </div>
    )
}