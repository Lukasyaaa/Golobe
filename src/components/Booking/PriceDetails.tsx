import React, { FC } from "react";
import { contentPart, imageVariants, priceDetails, shortReview } from "../../types";
import { ShortReview } from "../Common/ShortReview";

interface priceDetailsProps{
    contentType : contentPart,
    suptitle : string,
    tilte : string,
    image : imageVariants<string>,
    shortReview : shortReview,
    price : priceDetails
}

export const PriceDetails : FC<priceDetailsProps> = ({contentType, suptitle, tilte, image, shortReview, price}) => {
    return(
        <article className={`booking__price-details price-details booking_${contentType.toLowerCase()}__price-details price-details_${contentType.toLowerCase()}`}>
            <div className={`price-details__header price-details_${contentType.toLowerCase()}__header`}>
                <picture className={`price-details__image price-details_${contentType.toLowerCase()}__image`}>
                    <img src={image.srcs.jpeg} alt={image.alt} />
                    <source srcSet={image.srcs.webp} type="img/webp" />
                </picture>
                <div className={`price-details__subimage price-details_${contentType.toLowerCase()}__subimage`}>
                    <div className={`price-details__suptitle price-details_${contentType.toLowerCase()}__suptitle`}>{suptitle}</div>
                    <h2 className={`price-details__title price-details_${contentType.toLowerCase()}__title`}>{tilte}</h2>
                    <ShortReview about={shortReview} parentClasses={["price-details", `price-details_${contentType.toLowerCase()}`]} />
                </div>
            </div>
            <div className={`price-details__assurance price-details_${contentType.toLowerCase()}__assurance`}>
                <span>Your booking is protected by <mark>golobe</mark></span>
            </div>
            <div className={`price-details__main price-details_${contentType.toLowerCase()}__main`}>
                <h2 className={`price-details__suplist price-details_${contentType.toLowerCase()}__suplist`}>Price Details</h2>
                <ul className={`price-details__list price-details_${contentType.toLowerCase()}__list`}>
                    <li className={`price-details__link link-price-details price-details_${contentType.toLowerCase()}__link link-price-details_${contentType.toLowerCase()}`}>
                        <div className={`link-price-details__type link-price-details_${contentType.toLowerCase()}__type`}>Base Fare</div>
                        <div className={`link-price-details__price link-price-details__price`}>{price.baseFare}</div>
                    </li>
                    <li className={`price-details__link link-price-details price-details_${contentType.toLowerCase()}__link link-price-details_${contentType.toLowerCase()}`}>
                        <div className={`link-price-details__type link-price-details_${contentType.toLowerCase()}__type`}>Discount</div>
                        <div className={`link-price-details__price link-price-details__price`}>{price.discount}</div>
                    </li>
                    <li className={`price-details__link link-price-details price-details_${contentType.toLowerCase()}__link link-price-details_${contentType.toLowerCase()}`}>
                        <div className={`link-price-details__type link-price-details_${contentType.toLowerCase()}__type`}>Taxes</div>
                        <div className={`link-price-details__price link-price-details__price`}>{price.taxes}</div>
                    </li>
                    <li className={`price-details__link link-price-details price-details_${contentType.toLowerCase()}__link link-price-details_${contentType.toLowerCase()}`}>
                        <div className={`link-price-details__type link-price-details_${contentType.toLowerCase()}__type`}>Service Fee</div>
                        <div className={`link-price-details__price link-price-details__price`}>{price.serviceFee}</div>
                    </li>
                </ul>
                <div className={`price-details__total total-price-details price-details_${contentType.toLowerCase()}__total total-price-details_${contentType.toLowerCase()}`}>
                    <div className={`total-price-details__title total-price-details_${contentType.toLowerCase()}__title`}>Total</div>
                    <output className={`total-price-details__price total-price-details_${contentType.toLowerCase()}__price`}>
                        {price.baseFare + price.taxes + price.serviceFee - price.discount}
                    </output>
                </div>
            </div>
        </article>
    )
}