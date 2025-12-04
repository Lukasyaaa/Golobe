import { type FC } from "react";
import type { Offer as OfferType } from "../../../../types";

export const Offer : FC<OfferType> = ({heading, description, price, images}) => {
    return(
        <div className="offers__item item-offers">
            <div className="item-offers__info">
                <div className="item-offers__row">
                    <h3 className="item-offers__heading">{heading}</h3>
                    <div className="item-offers__price"><span>From</span><strong>{"$" + price}</strong></div>
                </div>
                <div className="item-offers__description">{description}</div>
                <a className="item-offers__link" href="#"><span>Book Flight</span></a>
            </div>
            <div className="item-offers__images">
                {images.map((({srcs, alt}, i) => 
                    <picture className="item-offers__image" key={i}>
                        <source srcSet={srcs.webp} type="image/webp" />
                        <img src={srcs.jpeg} alt={alt} />
                    </picture>
                ))}
            </div>
        </div>
    )
}