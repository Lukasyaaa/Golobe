import React, { type FC } from "react";
import type { Trip as TripType } from "../../../types.ts";

export const Trip : FC<TripType> = ({image, services, city}) => {
    return(
        <a className="trips__item item-trips" href="#">
            <picture className="item-trips__image">
                <source srcSet={image.srcs.webp} type="image/webp" />
                <img src={image.srcs.jpeg} alt={image.alt} />
            </picture>
            <div className="item-trips__subimage">
                <h3 className="item-trips__location">{city}, Turkey</h3>
                <ul className="item-trips__services">
                    {services.map((service, i) => 
                        <li className="item-trips__service" key={i}><span>{service}</span></li>
                    )}
                </ul>
            </div>
        </a>
    )
}