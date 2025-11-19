import React, { type FC } from "react";
import type { HotelLocation } from "../../../types";
import { Location as LocationRow } from "../../Common/Blocks/Location";

export const Location : FC<HotelLocation> = ({image, text}) => {
    return(
        <section className="hotel-page__location hotel-page__section section-hotel-page location">
            <div className="container">
                <div className="section-hotel-page__header location__header">
                    <h2 className="section-hotel-page__heading location__heading">Location/Map</h2>
                    <a className="section-hotel-page__button location__button button_green" href="#">View on google maps</a>
                </div>
                <picture className="location__image">
                    <source srcSet={image.srcs.webp} type="image/webp" />
                    <img src={image.srcs.jpeg} alt={image.alt} />
                </picture>
                <LocationRow parentCls={["location"]} info={text} />
            </div>
        </section>
    )
}