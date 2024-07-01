import React, { FC } from "react";
import { imageVariants, tripVariantsItem } from "../../types";

interface TripVariantPropsInfo{
    title : string,
    features : string[]
}

interface TripVariantProps{
    info : TripVariantPropsInfo,
    href : string,
    image : imageVariants
}

export const TripVariant : FC<TripVariantProps> = ({info, href, image}) =>{
    return(
        <a className="trip-variants__item item-trip-variants" href={href}>
            <figure className="item-trip-variants__inner">
                <picture className="item-trip-variants__image">
                    <img src={image.srcs.jpeg} alt={image.alt} />
                    <source srcSet={image.srcs.webp} type="img/webp" />
                </picture>
                <figcaption className="item-trip-variants__info">
                    <h4 className="item-trip-variants__title">{info.title}</h4>
                    <div className="item-trip-variants__features">
                        {info.features.map((feature, featureIndex) => 
                            <div key={featureIndex} className="item-trip-variants__feature"><span>{feature}</span></div>
                        )}
                    </div>
                </figcaption>
            </figure>
        </a>
    )
}