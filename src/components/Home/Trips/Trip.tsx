import React, { type FC } from "react";
import type { Trip as TripInterface } from "../../../store/home";

interface TripProps{
    about : TripInterface
}

export const Trip : FC<TripProps> = ({about}) => {

    return(
        <a className="trips__item item-trips" href="#">
            <picture className="item-trips__image">
                <source srcSet={about.image.srcs.webp} type="image/webp" />
                <img src={about.image.srcs.jpeg} alt={about.image.alt} />
            </picture>
            <div className="item-trips__subimage">
                <h3 className="item-trips__location">{about.city}, Turkey</h3>
                <ul className="item-trips__services">
                    {about.services.map((service, i) => 
                        <li className="item-trips__service" key={i}><span>{service}</span></li>
                    )}
                </ul>
            </div>
        </a>
    )
}