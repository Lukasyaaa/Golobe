import { useState, type FC } from "react";
import { SEATS_TYPE, type objType, type SeatVariant, type useStateReturned } from "../../../types";

interface SeatsProps{
    choosed: useStateReturned<(objType<typeof SEATS_TYPE>)>,
    getSeatsGroupHandler: (type : objType<typeof SEATS_TYPE>) => SeatVariant
}

interface CheckboxInfo{
    id: string,
    description: string,
    value: objType<typeof SEATS_TYPE>
}

export const Seats : FC<SeatsProps> = ({choosed, getSeatsGroupHandler}) => {
    const checkboxesInfo : CheckboxInfo[] = [
        {description: SEATS_TYPE.economy, value: SEATS_TYPE.economy, id: "economy"},
        {description: SEATS_TYPE.first, value: SEATS_TYPE.first, id: "first"},
        {description: SEATS_TYPE.business, value: SEATS_TYPE.business, id: "business"}
    ]

    let [choosedValue, setChoosed] = choosed;
    let [hoveredId, setHoveredId] = useState<number>(-1);
    const unMakeHovered = () => setHoveredId(-1);

    return(
        <section className="flight-page__seats seats">
            <div className="container">
                <div className="seats__header">
                    <h2 className="seats__heading">
                        {"Basic " + choosedValue + " Features"}
                    </h2>
                    <div className="seats__checkboxes">
                        {checkboxesInfo.map(({description, value, id}, i) => 
                            <div 
                                className={[
                                    "seats__checkbox", "checkbox-seats", 
                                    choosedValue.includes(value) ? "_choosed" : "",
                                    hoveredId === i ? "_hovered" : ""
                                ].filter(Boolean).join(" ")} 
                                key={i}
                            >
                                <div className="checkbox-seats__input-parent">
                                    <input 
                                        className="checkbox-seats__input" type="checkbox" id={id} name="seats"
                                        checked={choosedValue.includes(value)} onChange={(e) => {
                                            if(e.currentTarget.checked) setChoosed(value);
                                        }} onMouseEnter={() => setHoveredId(i)} onFocus={() => setHoveredId(i)}
                                        onMouseLeave={(e) => {
                                            if(e.currentTarget !== document.activeElement){
                                                unMakeHovered();
                                            }
                                        }} onBlur={unMakeHovered} onClick={unMakeHovered}
                                    />
                                </div>
                                <label htmlFor={id} className="checkbox-seats__label">{description}</label>
                            </div>
                        )}
                    </div>
                </div>
                <div className="seats__images">
                    {getSeatsGroupHandler(choosedValue).images.map((seats, j) => 
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