import React, { Fragment, useState, type FC } from "react";
import { SEATS_TYPE, type objType, type SeatsVariants, type useStateReturned } from "../../../types";

interface SeatsProps{
    about: SeatsVariants,
    choosed: useStateReturned<(objType<typeof SEATS_TYPE>)>
}

interface CheckboxInfo{
    id: string,
    description: string,
    value: objType<typeof SEATS_TYPE>
}

export const Seats : FC<SeatsProps> = ({about, choosed}) => {
    const getSeatDescription = (type : objType<typeof SEATS_TYPE>) => {
        switch(type){
            case SEATS_TYPE.business:
                return "Business";
            case SEATS_TYPE.economy:
                return "Economy";
            case SEATS_TYPE.first:
                return "First Class";
        }
    }
    const getSeatsGroup = (type : objType<typeof SEATS_TYPE>) => {
        switch(type){
            case SEATS_TYPE.business:
                return about.business;
            case SEATS_TYPE.economy:
                return about.economy;
            case SEATS_TYPE.first:
                return about.first;
        }
    }

    const checkboxesInfo : CheckboxInfo[] = [
        {description: getSeatDescription(SEATS_TYPE.economy), value: SEATS_TYPE.economy, id: "economy"},
        {description: getSeatDescription(SEATS_TYPE.first), value: SEATS_TYPE.first, id: "first"},
        {description: getSeatDescription(SEATS_TYPE.business), value: SEATS_TYPE.business, id: "business"}
    ]

    let [hoveredId, setHoveredId] = useState<number>(-1);

    return(
        <section className="flight-page__seats seats">
            <div className="container">
                <div className="seats__header">
                    <h2 className="seats__heading">
                        {"Basic " + getSeatDescription(choosed[0]) + " Features"}
                    </h2>
                    <div className="seats__checkboxes">
                        {checkboxesInfo.map(({description, value, id}, i) => 
                            <div 
                                className={[
                                    "seats__checkbox", "checkbox-seats", 
                                    choosed[0].includes(value) ? "_choosed" : "",
                                    hoveredId === i ? "_hovered" : ""
                                ].filter(Boolean).join(" ")} 
                                key={i}
                            >
                                <div className="checkbox-seats__input-parent">
                                    <input 
                                        className="checkbox-seats__input" type="checkbox" id={id} name="seats"
                                        checked={choosed[0].includes(value)} onChange={(e) => {
                                            if(e.currentTarget.checked){
                                                choosed[1](value)
                                            }
                                        }} onMouseEnter={() => setHoveredId(i)} onFocus={() => setHoveredId(i)}
                                        onMouseLeave={(e) => {
                                            if(e.currentTarget !== document.activeElement){
                                                setHoveredId(-1);
                                            }
                                        }} onBlur={() => setHoveredId(-1)} onClick={() => setHoveredId(-1)}
                                    />
                                </div>
                                <label htmlFor={id} className="checkbox-seats__label">{description}</label>
                            </div>
                        )}
                    </div>
                </div>
                <div className="seats__images">
                    {getSeatsGroup(choosed[0]).images.map((seats, j) => 
                        <picture className="seats__image" key={j}>
                            <source srcSet={seats.srcs.webp} type="image/webp" />
                            <img src={seats.srcs.jpeg} alt={seats.alt} />
                        </picture>
                    )}
                </div>
            </div>
        </section>
    )
}