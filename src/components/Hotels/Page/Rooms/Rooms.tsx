import React, { type FC } from "react";
import type { Room as RoomType } from "../../../../types";
import { Room } from "./Room";

interface RoomsProps{
    about: RoomType[],
    hotelId: number
}

export const Rooms : FC<RoomsProps> = ({about, hotelId}) => {
    return(
        <section className="hotel-page__section section hotel-page__rooms rooms">
            <div className="container">
                <h2 className="section-hotel-page__heading rooms__heading">Available Rooms</h2>
                <div className="rooms__items">
                    {about.map((room, i) => <Room key={i} id={i} about={room} hotelId={hotelId} />)}
                </div>
            </div>
        </section>
    )
}