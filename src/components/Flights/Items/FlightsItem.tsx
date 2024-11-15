import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { flightsConfiguratePath } from "../../../App";
import { contentPart, flight, flightDirection, seatsTypeCategory } from "../../../types";
import { ShortReview } from "../../Common/ShortReview";
import { FlightsScheduleItem } from "./FlightsScheduleItem";
import { useDispatch } from "react-redux";
import { userAddFavouriteAction, userDeleteFavouriteAction } from "../../../store/userReducer";

interface flightsItemProps{
    about : flight,
    buttonLink : string,
    isFavourite : boolean,
    isAuthorized : boolean
}

export const FlightsItem : FC<flightsItemProps> = ({about, buttonLink, isFavourite, isAuthorized}) => {
    let [isDepartChoosed, setIsDepartChoosed] = useState<boolean>(about.schedule.depart.isChoosed);
    let [isReturnChoosed, setIsReturnChoosed] = useState<boolean>(about.schedule.return.isChoosed);
    
    let choosedFlight = "";
    if(isDepartChoosed){
        if(isReturnChoosed){
            choosedFlight = flightDirection.Depart + "+" + flightDirection.Return;
        }else{
            choosedFlight = flightDirection.Depart;
        }
    }else if(isReturnChoosed){
        choosedFlight = flightDirection.Return;
    }

    const dispatch = useDispatch();
    const addFavourite = () => {
        dispatch(userAddFavouriteAction(contentPart.Flights, about.id));
    }
    const deleteFavourite = () => {
        dispatch(userDeleteFavouriteAction(contentPart.Flights, about.id))
    }

    return(
        <article className="flights__item content__item item-flights item-content">
            {(about.schedule.depart.airline.alt === about.schedule.return.airline.alt) 
            ? <picture className="item-flights__image">
                <img src={about.schedule.depart.airline.srcs.jpeg} alt={about.schedule.depart.airline.alt} />
                <source srcSet={about.schedule.depart.airline.srcs.webp} type="img/webp" />
            </picture>
            : <div className="item-flights__images">
                {Array.from([about.schedule.depart.airline, about.schedule.return.airline]).map((airline, i) => 
                    <picture className="item-flights__image" key={i}>
                        <img src={airline.srcs.jpeg} alt={airline.alt} />
                        <source srcSet={airline.srcs.webp} type="img/webp" />
                    </picture>
                )}    
            </div>}
            <div className="item-flights__info">
                <div className="item-flights__header">
                    <ShortReview parentClasses={["item-flights"]} about={about.shortReview} />
                    <div className="item-flights__price">
                        starting from
                        <strong>
                            {`$${Math.min(
                                about.schedule.depart.price.baseFare + about.schedule.depart.price.serviceFee + 
                                about.schedule.depart.price.taxes - about.schedule.depart.price.discount, 
                                about.schedule.return.price.baseFare + about.schedule.return.price.serviceFee + 
                                about.schedule.return.price.taxes - about.schedule.return.price.discount
                            )}`}
                        </strong>
                    </div>
                </div>
                <div className="item-flights__schedule">
                    <FlightsScheduleItem 
                        about={about.schedule.depart} isDeparture={true} isActive={{value: isDepartChoosed, set: setIsDepartChoosed}} 
                    />
                    <FlightsScheduleItem 
                        about={about.schedule.return} isDeparture={false} isActive={{value: isReturnChoosed, set: setIsReturnChoosed}} 
                    />
                </div>
                <div className="item-flights__footer item-content__footer">
                    {(isAuthorized) 
                        ? ((!isFavourite) 
                            ? <button 
                                className="item-fligths__favourites item-content__favourites icon-heart_border" 
                                type="button" onClick={addFavourite}
                            >   
                            </button>
                            : <button 
                                className="item-fligths__favourites item-content__favourites icon-heart _choosed" 
                                type="button" onClick={deleteFavourite}
                            >   
                            </button>
                        )
                        : <div 
                            className="item-fligths__favourites item-content__favourites icon-heart_border _disabled" 
                        >
                        </div>
                    }
                    {(choosedFlight === "") 
                    ? <div className="item-flights__view-more item-content__view-more _disabled">
                        {buttonLink}
                    </div>
                    : <NavLink 
                        className="item-flights__view-more item-content__view-more" 
                        to={flightsConfiguratePath + "/" + (about.id + 1) + "/" + choosedFlight} type="button"
                    >
                        {buttonLink}
                    </NavLink>}
                </div>
            </div>
        </article>
    )
}