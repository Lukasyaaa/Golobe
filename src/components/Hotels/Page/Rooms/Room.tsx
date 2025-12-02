import React, { type FC } from "react";
import { getRoomInfo, transformPrice, type Room as RoomType } from "../../../../types";
import { NavLink } from "react-router-dom";
import { hotelPath } from "../../../../App";

interface RoomProps{
    about: RoomType,
    id: number,
    hotelId: number,
    checkInCheckOut: string
}

export const Room : FC<RoomProps> = ({about, id, hotelId, checkInCheckOut}) => {
    const {beds, specifics, image, price} = about;
    return(
        <div className="rooms__item item-rooms">
            <picture className="item-rooms__image">
                <source srcSet={image.srcs.webp} type="image/webp" />
                <img src={image.srcs.jpeg} alt={image.alt} />
            </picture>
            <div className="item-rooms__text">
                <div className="item-rooms__specifies">{getRoomInfo(beds, specifics)}</div>
                <div className="item-rooms__price"><strong>{"$" + transformPrice(price)}</strong>/night</div>
            </div>
            <NavLink className="item-rooms__link button_green" to={hotelPath + "/" + hotelId + "/" + checkInCheckOut + "/Rooms/" + (Number(id) + 1)}>
                Book now
            </NavLink>
        </div>
    )
}