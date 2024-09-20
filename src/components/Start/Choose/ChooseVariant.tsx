import React, { FC, Fragment } from "react";
import { chooseOption } from "../../../types";

interface chooseVariantProps{
    about : chooseOption,
    isFlight : boolean
}

export const ChooseVariant : FC<chooseVariantProps> = ({about, isFlight}) => {
    let isWebp = true;
    let pathToBackground = (isWebp) ? about.background.webp : about.background.jpeg;
    return(
        <div 
            className={
                "choose__item item-choose" + ((isFlight) ? 
                " choose__item_flight item_flight-choose" : " choose__item_hotel item_hotel-choose"
            )}
            style={{
                backgroundImage: `url(` + pathToBackground + `)`, backgroundSize: "cover", backgroundRepeat: "no-repeat"
            }}
        >
            <div className={"item-choose__inner" + ((isFlight) ? " item_flight-choose__inner" : " item_hotel-choose__inner")}>
                <h3 className={"item-choose__title" + ((isFlight) ? " item_flight-choose__title" : " item_hotel-choose__title")}>
                    {about.title}
                </h3>
                <div className={"item-choose__subtitle" + ((isFlight) ? " item_flight-choose__subtitle" : " item_hotel-choose__subtitle")}>
                    {about.subtitle}
                </div>
                <a 
                    className={
                        "item-choose__link" + ((isFlight) ? 
                        " item_flight-choose__link button_question icon-send" : " item_hotel-choose__link button_question icon-send"
                    )} 
                    href="#"
                >
                    <span>{about.link}</span>
                </a>
            </div>
        </div>
    )
}