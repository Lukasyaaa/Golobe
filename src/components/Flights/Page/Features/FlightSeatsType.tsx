import React, { ChangeEvent, FC } from "react";
import { imageVariants, seatsTypes, setter } from "../../../../types";

interface flightSeatsTypeProps{
    about : seatsTypes,
    isDepart : boolean,
    isNeedDescription : boolean,
    choosedSeatsType : setter<imageVariants<string>[]>
}

export const FlightSeatsType : FC<flightSeatsTypeProps> = ({about, isDepart, isNeedDescription, choosedSeatsType}) => {
    const toggleChoosedSeatsType = (e : ChangeEvent<HTMLInputElement>, usedSeatsType : imageVariants<string>[]) =>{
        if(e.target.checked){
            choosedSeatsType.set([...choosedSeatsType.value, ...usedSeatsType])
        } else {
            let copySeats = [...choosedSeatsType.value];
            copySeats.splice(choosedSeatsType.value.indexOf(usedSeatsType[0]), usedSeatsType.length);
            choosedSeatsType.set(copySeats)
        }
    }
    let choosedSeatsTypeTitle : string[] = [];
    if(choosedSeatsType.value.indexOf(about.economy.images[0]) !== -1){
        choosedSeatsTypeTitle.push("Economy");
    }
    if(choosedSeatsType.value.indexOf(about.business.images[0]) !== -1){
        choosedSeatsTypeTitle.push("Busines");
    }
    if(choosedSeatsType.value.indexOf(about.first.images[0]) !== -1){
        choosedSeatsTypeTitle.push("First");
    }

    if(isDepart){
        return(
            <div 
                className={[
                    "features-flight__item", "item-features-flight", 
                    "features-flight_depart__item", "item-features-flight_depart"
                ].join(" ")}
            >
                <div className="item-features-flight__header item-features-flight_depart__header">
                    <h2 className="item-features-flight__title item-features-flight_depart__title">
                        {`${((isNeedDescription) ? "Depart " : "")}Basic ${choosedSeatsTypeTitle.join(", ") + " "}Features`}
                    </h2>
                    <form className="item-features-flight__inputs item-features-flight_depart__inputs" action="#">
                        {about.economy.images.length !== 0 &&
                        <div className="item-features-flight__input-block item-features-flight_depart__input-block">
                            <input 
                                className="item-features-flight__input item-features-flight_depart__input" 
                                type="checkbox" id="economy_depart" 
                                onChange={(e) => toggleChoosedSeatsType(e, about.economy.images)} 
                                checked={choosedSeatsType.value.indexOf(about.economy.images[0]) !== -1}
                            />
                            <label 
                                className="item-features-flight__subinput item-features-flight_depart__subinput" 
                                htmlFor="economy_depart"
                            >
                                Economy
                            </label>
                        </div>
                        }
                        {about.first.images.length !== 0 &&
                        <div className="item-features-flight__input-block item-features-flight_depart__input-block">
                            <input 
                                className="item-features-flight__input item-features-flight_depart__input" 
                                type="checkbox" id="first_depart"
                                onChange={(e) => toggleChoosedSeatsType(e, about.first.images)} 
                                checked={choosedSeatsType.value.indexOf(about.first.images[0]) !== -1}
                            />
                            <label 
                                className="item-features-flight__subinput item-features-flight_depart__subinput" 
                                htmlFor="first_depart"
                            >
                                First Class
                            </label>
                        </div>
                        }
                        {about.business.images.length !== 0 &&
                        <div className="item-features-flight__input-block item-features-flight_depart__input-block">
                            <input 
                                className="item-features-flight__input item-features-flight_depart__input" 
                                type="checkbox" id="business_depart"
                                onChange={(e) => toggleChoosedSeatsType(e, about.business.images)} 
                                checked={choosedSeatsType.value.indexOf(about.business.images[0]) !== -1}
                            />
                            <label 
                                className="item-features-flight__subinput item-features-flight_depart__subinput" 
                                htmlFor="business_depart"
                            >
                                Busines Class
                            </label>
                        </div>
                        }
                    </form>
                </div>
                <div className="item-features-flight__images item-features-flight_depart__images">
                    {choosedSeatsType.value.map((image, i) => 
                        <picture className="item-features-flight__image item-featuress-flight_depart__image" key={i}>
                            <img src={image.srcs.jpeg} alt={image.alt} />
                            <source srcSet={image.srcs.webp} type="img/webp" />
                        </picture>
                    )}
                </div>
            </div>
        )
    }
    return(
        <div 
            className={[
                "features-flight__item", "item-features-flight", 
                "features-flight_return__item", "item-features-flight_return"
            ].join(" ")}
        >
            <div className="item-features-flight__header item-features-flight_return__header">
                <h2 className="item-features-flight__title item-features-flight_return__title">
                    {`${((isNeedDescription) ? "Return " : "")}Basic ${choosedSeatsTypeTitle.join(", ") + " "}Features`}
                </h2>
                <form className="item-features-flight__inputs item-features-flight_return__inputs" action="#">
                    {about.economy.images.length !== 0 &&
                    <div className="item-features-flight__input-block item-features-flight_return__input-block">
                        <input 
                            className="item-features-flight__input item-features-flight_return__input" 
                            type="checkbox" id="economy_return" 
                            onChange={(e) => toggleChoosedSeatsType(e, about.economy.images)} 
                            checked={choosedSeatsType.value.indexOf(about.economy.images[0]) !== -1}
                        />
                        <label 
                            className="item-features-flight__subinput item-features-flight_return__subinput" 
                            htmlFor="economy_return"
                        >
                            Economy
                        </label>
                    </div>
                    }
                    {about.first.images.length !== 0 &&
                    <div className="item-features-flight__input-block item-features-flight_return__input-block">
                        <input 
                            className="item-features-flight__input item-features-flight_return__input" 
                            type="checkbox" id="first_return"
                            onChange={(e) => toggleChoosedSeatsType(e, about.first.images)} 
                            checked={choosedSeatsType.value.indexOf(about.first.images[0]) !== -1}
                        />
                        <label 
                            className="item-features-flight__subinput item-features-flight_return__subinput" 
                            htmlFor="first_return"
                        >
                            First Class
                        </label>
                    </div>
                    }
                    {about.business.images.length !== 0 &&
                    <div className="item-features-flight__input-block item-features-flight_return__input-block">
                        <input 
                            className="item-features-flight__input item-features-flight_return__input" 
                            type="checkbox" id="business_return"
                            onChange={(e) => toggleChoosedSeatsType(e, about.business.images)} 
                            checked={choosedSeatsType.value.indexOf(about.business.images[0]) !== -1}
                        />
                        <label 
                            className="item-features-flight__subinput item-features-flight_return__subinput" 
                            htmlFor="business_return"
                        >
                            Busines Class
                        </label>
                    </div>
                    }
                </form>
            </div>
            <div className="item-features-flight__images item-features-flight_return__images">
                {choosedSeatsType.value.map((image, i) => 
                    <picture className="item-features-flight__image item-featuress-flight_return__image" key={i}>
                        <img src={image.srcs.jpeg} alt={image.alt} />
                        <source srcSet={image.srcs.webp} type="img/webp" />
                    </picture>
                )}
            </div>
        </div>
    )
}