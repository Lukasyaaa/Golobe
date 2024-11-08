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
    if(choosedSeatsType.value.indexOf(about.economy[0]) !== -1){
        choosedSeatsTypeTitle.push("Economy");
    }
    if(choosedSeatsType.value.indexOf(about.business[0]) !== -1){
        choosedSeatsTypeTitle.push("Busines");
    }
    if(choosedSeatsType.value.indexOf(about.first[0]) !== -1){
        choosedSeatsTypeTitle.push("First");
    }

    if(isDepart){
        return(
            <div 
                className={[
                    "features-flight__item", "item-features-flight", 
                    "features_depart-flight__item", "item-features_depart-flight"
                ].join(" ")}
            >
                <div className="item-features-flight__header item-features_depart-flight__header">
                    <h2 className="item-features-flight__title item-features_depart-flight__title">
                        {`${((isNeedDescription) ? "Depart " : "")}Basic ${choosedSeatsTypeTitle.join(", ") + " "}Features`}
                    </h2>
                    <form className="item-features-flight__inputs item-features_depart-flight__inputs" action="#">
                        {about.economy.length !== 0 &&
                        <div className="item-features-flight__input-block item-features_depart-flight__input-block">
                            <input 
                                className="item-features-flight__input item-features_depart-flight__input" 
                                type="checkbox" id="economy_depart" 
                                onChange={(e) => toggleChoosedSeatsType(e, about.economy)} 
                                checked={choosedSeatsType.value.indexOf(about.economy[0]) !== -1}
                            />
                            <label 
                                className="item-features-flight__subinput item-features_depart-flight__subinput" 
                                htmlFor="economy_depart"
                            >
                                Economy
                            </label>
                        </div>
                        }
                        {about.first.length !== 0 &&
                        <div className="item-features-flight__input-block item-features_depart-flight__input-block">
                            <input 
                                className="item-features-flight__input item-features_depart-flight__input" 
                                type="checkbox" id="first_depart"
                                onChange={(e) => toggleChoosedSeatsType(e, about.first)} 
                                checked={choosedSeatsType.value.indexOf(about.first[0]) !== -1}
                            />
                            <label 
                                className="item-features-flight__subinput item-features_depart-flight__subinput" 
                                htmlFor="first_depart"
                            >
                                First Class
                            </label>
                        </div>
                        }
                        {about.business.length !== 0 &&
                        <div className="item-features-flight__input-block item-features_depart-flight__input-block">
                            <input 
                                className="item-features-flight__input item-features_depart-flight__input" 
                                type="checkbox" id="business_depart"
                                onChange={(e) => toggleChoosedSeatsType(e, about.business)} 
                                checked={choosedSeatsType.value.indexOf(about.business[0]) !== -1}
                            />
                            <label 
                                className="item-features-flight__subinput item-features_depart-flight__subinput" 
                                htmlFor="business_depart"
                            >
                                Busines Class
                            </label>
                        </div>
                        }
                    </form>
                </div>
                <div className="item-features-flight__images item-features_depart-flight__images">
                    {choosedSeatsType.value.map((image, i) => 
                        <picture className="item-features-flight__image item-featuress_depart-flight__image" key={i}>
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
                "features_return-flight__item", "item-features_return-flight"
            ].join(" ")}
        >
            <div className="item-features-flight__header item-features_return-flight__header">
                <h2 className="item-features-flight__title item-features_return-flight__title">
                    {`${((isNeedDescription) ? "Return " : "")}Basic ${choosedSeatsTypeTitle.join(", ") + " "}Features`}
                </h2>
                <form className="item-features-flight__inputs item-features_return-flight__inputs" action="#">
                    {about.economy.length !== 0 &&
                    <div className="item-features-flight__input-block item-features_return-flight__input-block">
                        <input 
                            className="item-features-flight__input item-features_return-flight__input" 
                            type="checkbox" id="economy_return" 
                            onChange={(e) => toggleChoosedSeatsType(e, about.economy)} 
                            checked={choosedSeatsType.value.indexOf(about.economy[0]) !== -1}
                        />
                        <label 
                            className="item-features-flight__subinput item-features_return-flight__subinput" 
                            htmlFor="economy_return"
                        >
                            Economy
                        </label>
                    </div>
                    }
                    {about.first.length !== 0 &&
                    <div className="item-features-flight__input-block item-features_return-flight__input-block">
                        <input 
                            className="item-features-flight__input item-features_return-flight__input" 
                            type="checkbox" id="first_return"
                            onChange={(e) => toggleChoosedSeatsType(e, about.first)} 
                            checked={choosedSeatsType.value.indexOf(about.first[0]) !== -1}
                        />
                        <label 
                            className="item-features-flight__subinput item-features_return-flight__subinput" 
                            htmlFor="first_return"
                        >
                            First Class
                        </label>
                    </div>
                    }
                    {about.business.length !== 0 &&
                    <div className="item-features-flight__input-block item-features_return-flight__input-block">
                        <input 
                            className="item-features-flight__input item-features_return-flight__input" 
                            type="checkbox" id="business_return"
                            onChange={(e) => toggleChoosedSeatsType(e, about.business)} 
                            checked={choosedSeatsType.value.indexOf(about.business[0]) !== -1}
                        />
                        <label 
                            className="item-features-flight__subinput item-features_return-flight__subinput" 
                            htmlFor="business_return"
                        >
                            Busines Class
                        </label>
                    </div>
                    }
                </form>
            </div>
            <div className="item-features-flight__images item-features_return-flight__images">
                {choosedSeatsType.value.map((image, i) => 
                    <picture className="item-features-flight__image item-featuress_return-flight__image" key={i}>
                        <img src={image.srcs.jpeg} alt={image.alt} />
                        <source srcSet={image.srcs.webp} type="img/webp" />
                    </picture>
                )}
            </div>
        </div>
    )
}