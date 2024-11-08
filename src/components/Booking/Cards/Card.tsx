import React, { FC } from "react";
import { card, contentPart, setter } from "../../../types";

interface cardProps{
    contentType : contentPart,
    about : card,
    id : number,
    choosedCard : setter<number>
}

export const Card : FC<cardProps> = ({contentType, about, id, choosedCard}) => {
    let month = ((about.expDate.month < 10) ? "0" : "") + about.expDate.month;
    let date = new Date(about.expDate.year, about.expDate.month, 0);

    const setActive = () => {
        choosedCard.set(id);
    }

    let classes = [
        "cards__element", "element-cards", `cards_${contentType.toLowerCase()}__element`, 
        `element-cards_${contentType.toLowerCase()}`, "radios__item", "item-radios", "icon-visa"
    ];
    if(id === choosedCard.value){
        classes.push("_checked");
    }

    return(
        <fieldset className={classes.join(" ")}>
            <div className={`element-cards__inner element-cards_${contentType.toLowerCase()}__inner item-radios__inner`}>
                <input 
                    className={`element-cards__input element-cards_${contentType.toLowerCase()}__input item-radios__input`} 
                    name="cards" id={String(id)} type="radio" 
                    checked={choosedCard.value === id}
                    onChange={setActive}
                />
                <div className={`element-cards__number element-cards_${contentType}__number`}>
                    {"**** " + about.number % 10000}
                </div>
                <time 
                    className={`element-cards__exp-date element-cards_${contentType.toLowerCase()}__exp-date item-radios__storage`}
                    dateTime={about.expDate.year + "-" + month + "-" + date.getDate() + "T23:59:59"}
                >
                    <span>{month + "\\" + about.expDate.year % 100}</span>
                </time>
            </div>
        </fieldset>
    )
}