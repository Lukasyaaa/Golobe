import React, { useState, type FC } from "react";
import type { Travel as TravelType } from "../../../types";

export const Travel : FC<TravelType> = ({city, description, price, image}) => {
    let [isHovered, setIsHovered] = useState<boolean>(false);

    const makeHovered = () => setIsHovered(true);
    const unMakeHovered = () => setIsHovered(false);

    return(
        <div  
            className={["travels__item", "item-travels", (isHovered) ? "_hovered" : ""].filter(Boolean).join(" ")}
            style={{
                background: `url("${image.webp}")`, backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}
        >
            <div className="item-travels__row">
                <div className="item-travels__text">
                    <h3 className="item-travels__city">{city}</h3>
                    <div className="item-travels__description">{description}</div>
                </div>
                <div className="item-travels__price">{"$ " + price}</div>
            </div>
            <a 
                className="item-travels__link" href="#"
                onMouseEnter={makeHovered} onMouseLeave={unMakeHovered}
                onFocus={makeHovered} onBlur={unMakeHovered}
            >
                Book Flights
            </a>
        </div>
    )
}