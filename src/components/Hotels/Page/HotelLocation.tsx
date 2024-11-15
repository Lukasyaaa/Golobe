import React, { FC } from "react";
import { hotel, hotelLocation } from "../../../types";

interface hotelLocationProps{
    about : hotelLocation
}

export const HotelLocation : FC<hotelLocationProps> = ({about}) =>{
    return(
        <section className="hotel__location location hotel__section section">
            <div className="container">
                <div className="location__header section__header">
                    <h2 className="location__title section__title">Location/Map</h2>
                    <a className="location__link section__link" href="#">View on google maps</a>
                </div>
                <picture className="location__image">
                    <img src={about.image.srcs.jpeg} alt={about.image.alt} />
                    <source srcSet={about.image.srcs.webp} type="img/webp" />
                </picture>
                <div className="location__info icon-location"><span>{about.full}</span></div>
            </div>
        </section>
    )
}