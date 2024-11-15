import React, { FC, Fragment } from "react";
import { room } from "../../../../types";
import { NavLink } from "react-router-dom";
import { hotelsConfiguretePath } from "../../../../App";

interface hotelRoomProps{
    hotelId : number,
    id : number,
    buttonLink : string,
    about : room
}

export const HotelRoom : FC<hotelRoomProps> = ({hotelId, id, buttonLink, about}) => {
    let beds : string[] = [];
    if(about.countBeds.double !== 0){
        beds.push(about.countBeds.double + " double bed");
    }
    if(about.countBeds.twin !== 0){
        beds.push(about.countBeds.twin + " twin beds");
    }
    return(
        <div className="rooms__item item-rooms">
            <picture className="item-rooms__image">
                <img src={about.image.srcs.jpeg} alt={about.image.alt} />
                <source srcSet={about.image.srcs.webp} type="img/webp" />
            </picture>
            <div className="item-rooms__info">
                <div className="item-rooms__advantage">
                    {about.advantages.join(" - ") + " - " + beds.join(" or ")}
                </div>
                <output className="item-rooms__price">
                    <mark>{`$${(about.price.baseFare + about.price.serviceFee + about.price.taxes - about.price.discount)}`}</mark>/night
                </output>
            </div>
            <NavLink 
                className="item-rooms__button" 
                to={hotelsConfiguretePath + "/" + (hotelId + 1) + "/Rooms/" + (id + 1)}
            >
                {buttonLink}
            </NavLink>
        </div>
    )
}