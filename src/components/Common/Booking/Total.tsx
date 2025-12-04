import { type FC } from "react";
import { transformPrice, type Image, type PriceDetails, type ShortReview as ShortReviewType } from "../../../types";
import { ShortReview } from "../Blocks/ShortReview";

interface TotalProps{
    image: Image,
    suptitle: string,
    title: string,
    shortReview: ShortReviewType,
    priceDetails: PriceDetails
}

export const Total: FC<TotalProps> = ({image, suptitle, title, shortReview, priceDetails}) => {
    const getDetail = (about : string) => {
        switch(about){
            case "baseFare": return "Base Fare";
            case "discount": return "Discount";
            case "taxes": return "Taxes";
            case "serviceFee": return "Service Fee";
            default: return "Error"
        }
    }

    return(
        <article className="booking__article room__article booking__total room__total total">
            <figure className="total__header">
                <picture className="total__image">
                    <source srcSet={image.srcs.webp} type="image/webp" />
                    <img src={image.srcs.jpeg} alt={image.alt} />
                </picture>
                <figcaption className="total__subimage">
                    <div className="total__supheading">{suptitle}</div>
                    <h3 className="total__heading">{title}</h3>
                    <ShortReview about={shortReview} parentCls={["total"]} />
                </figcaption>
            </figure>
            <div className="total__protect">
                <span>Your booking is protected by <em>golobe</em></span>
            </div>
            <h4 className="total__supdetails">Price Details</h4>
            <ul className="total__details">
                {Object.entries(priceDetails).map(([objKey, objValue], i) =>
                    <li className="total__detail detail-total" key={i}>
                        <h5 className="detail-total__description">{getDetail(objKey)}</h5>
                        <div className="detail-total__value">{"$" + objValue}</div>
                    </li>
                )}
            </ul>
            <div className="total__main main-total">
                <h5 className="main-total__description">Total</h5>
                <output className="main-total__value">{"$" + transformPrice(priceDetails)}</output>
            </div>
        </article>
    )
}