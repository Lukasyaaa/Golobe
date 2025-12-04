import { useState, type FC } from "react";
import type { Link } from "../../../types";

interface PaymentWay {
    type: string,
    description: string,
    moreInfo: null | Link
}

export const Payment : FC = () => {
    const about : PaymentWay[] = [
        {type: "Pay in full", description: "Pay the total and you are all set", moreInfo: null},
        {type: "Pay part now, part later", description: "Pay $207.43 now, and the rest ($207.43) will be automatically charged to the same payment method on Nov 14, 2022. No extra fees.", moreInfo: {description: "More info", path: "#"}},
    ]
    let [choosed, setChoosed] = useState<number>(0);
    let [hovered, setHovered] = useState<number>(-1);

    return(
        <article 
            className={[
                "booking__article", "room__article", "booking__payment", "room__payment", 
                "payment", "radios-booking", hovered !== -1 ? "_hide-active" : ""
            ].filter(Boolean).join(" ")}
        >
            {about.map(({type, description, moreInfo}, i) => {
                let makePseudoActive: undefined | (() => void) = undefined;
                let unMakePseudoActive: undefined | (() => void) = undefined;
                if(i !== choosed){
                    makePseudoActive = () => setHovered(i);
                    unMakePseudoActive = () => setHovered(-1);
                }
                return(
                    <div 
                        className={[
                            "payment__way", "way-payment", "radios-booking__item", "item-radios-booking", 
                            i === choosed ? "_choosed" : "", i === hovered ? "_hovered" : ""
                        ].filter(Boolean).join(" ")} 
                        key={i}
                    >
                        <h3 className="way-payment__title">{type}</h3>
                        <div className="way-payment__description">{description}</div>
                        {moreInfo !== null && <a className="way-payment__link" href={moreInfo.path}>{moreInfo.description}</a>}
                        <input 
                            className="way-payment__input item-radios-booking__input" type="radio" 
                            checked={choosed == i} id={"payment_" + i} name="payment" 
                            onChange={() => { setChoosed(i); unMakePseudoActive?.() }}
                            onMouseEnter={makePseudoActive} onFocus={makePseudoActive}
                            onMouseLeave={(e) => {
                                if(e.currentTarget !== document.activeElement){
                                    unMakePseudoActive?.();
                                }
                            }} onBlur={unMakePseudoActive}
                        />
                    </div>
                )
            })}
        </article>
    )
}