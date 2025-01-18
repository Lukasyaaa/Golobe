import React, { FC } from "react";
import { Trip as TripInterface } from "../../../types.ts";
import { importImage } from "../../../helperFunctions.ts";

interface TripProps{
    about : TripInterface
}

export const Trip : FC<TripProps> = ({about}) => {
    return (
        <a className="trips__item item-trips" href={about.link} onClick={(e) => e.stopPropagation()}>
            <figure className="item-trips__inner">
                <picture className="item-trips__image">
                    <source srcSet={importImage(about.image.srcs.webp)} type="image/webp" />
                    <img src={importImage(about.image.srcs.jpeg)} alt={about.image.alt} />
                </picture>
                <figcaption className="item-trips__info">
                    <h3 className="item-trips__title">{about.city + ", "}</h3>
                    <ul className="item-trips__include">
                        {about.includes.map((include, j) => {
                            return(
                                <li key={j} className="item-trips__include-item"><span>{include}</span></li>
                            )
                        })}
                    </ul>
                </figcaption>
            </figure>
        </a>
    )
}