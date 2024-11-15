import React, { FC, Fragment } from "react";
import { hotel, room } from "../../../../types";
import { HotelRoom } from "./HotelRoom";

interface hotelRoomsProps{
    hotelId : number,
    buttonLink : string
    about : room[]
}

export const HotelRooms : FC<hotelRoomsProps> = ({hotelId, buttonLink, about}) => {
    if(about.length !== 0){
        return(
            <section className="hotel__rooms rooms hotel__section section">
                <div className="container">
                    <h2 className="rooms__title section__title">Available Rooms</h2>
                    <div className="rooms__items">
                        {about.map((room, i) => <HotelRoom hotelId={hotelId} id={i} buttonLink={buttonLink} about={room} key={i} />)}
                    </div>
                </div>
            </section>
        )
    }
    return <Fragment />
}