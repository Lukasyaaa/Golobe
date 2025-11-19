import React, { type FC } from "react";
import { transformPrice, type Room as RoomType } from "../../../../types";
import { NavLink } from "react-router-dom";
import { hotelsCatalogPath } from "../../../../App";

interface RoomProps{
    about: RoomType,
    id: number,
    hotelId: number
}

export const Room : FC<RoomProps> = ({about, id, hotelId}) => {
    const doubleBeds = about.beds.double + " double bed" + ((about.beds.double > 1) ? "s" : "");
    const twinBeds = about.beds.twin + " twin bed" + ((about.beds.twin > 1) ? "s" : "");
    const beds = [doubleBeds, twinBeds].filter(beds => !beds.includes("0")).join(" or ");
    return(
        <div className="rooms__item item-rooms">
            <picture className="item-rooms__image">
                <source srcSet={about.image.srcs.webp} type="image/webp" />
                <img src={about.image.srcs.jpeg} alt={about.image.alt} />
            </picture>
            <div className="item-rooms__text">
                <div className="item-rooms__specifies">
                    {about.specifics.join(" - ") + " - " + beds}
                </div>
                <div className="item-rooms__price"><strong>{"$" + transformPrice(about.price)}</strong>/night</div>
            </div>
            <NavLink className="item-rooms__link button_green" to={hotelsCatalogPath + "/" + hotelId + "/Rooms/" + (Number(id) + 1)}>
                Book now
            </NavLink>
        </div>
    )
}