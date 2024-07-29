import React, { FC } from "react";
import { tripVariantsItem } from "../../types";

interface TripVariantProps{
    about : tripVariantsItem
}

export const TripVariant : FC<TripVariantProps> = ({about}) =>{
    return(
        <a className="trip-variants__item item-trip-variants" href={about.href} onClick={(e) => e.stopPropagation()}>
            <figure className="item-trip-variants__inner">
                <picture className="item-trip-variants__image">
                    <img src={about.image.srcs.jpeg} alt={about.image.alt} />
                    <source srcSet={about.image.srcs.webp} type="img/webp" />
                </picture>
                <figcaption className="item-trip-variants__info">
                    <h4 className="item-trip-variants__title">{about.title}</h4>
                    <div className="item-trip-variants__features">
                        {about.features.map((feature, i) => 
                            <div className="item-trip-variants__feature" key={i}><span>{feature}</span></div>
                        )}
                    </div>
                </figcaption>
            </figure>
        </a>
    )
}