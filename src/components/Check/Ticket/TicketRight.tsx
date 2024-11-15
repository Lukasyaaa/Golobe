import React, { FC } from "react";
import { contentPart, imageVariants, setter } from "../../../types";
import lineJpeg from "../../../assets/img/booking/line/main.png"
import lineWebp from "../../../assets/img/booking/line/main.webp"
import firstSubimageWebp from "../../../assets/img/booking/subimage/1/main.webp"
import firstSubimageJpeg from "../../../assets/img/booking/subimage/1/main.png"
import secondSubimageWebp from "../../../assets/img/booking/subimage/2/main.webp"
import secondSubimageJpeg from "../../../assets/img/booking/subimage/2/main.png"

interface ticketRoutePart{
    country : string,
    city : string,
    image : imageVariants<string>
}
interface ticketRoute{
    from : ticketRoutePart,
    to : ticketRoutePart
}

interface ticketRouteProps{
    contentType : contentPart.Flights,
    about : ticketRoute
}

interface ticketHotelLogoProps{
    contentType : contentPart.Hotels,
    about : imageVariants<string>
}

export const TicketRight : FC<ticketRouteProps |ticketHotelLogoProps > = ({contentType, about}) => {
    if(contentType === contentPart.Flights){
        return(
            <div className="ticket__right ticket__route route-ticket">
                <div className="route-ticket__part part-route-ticket route-ticket__part_from part_from-route-ticket">
                    <div className="part-route-ticket__inner part_from-route-ticket__inner">
                        <picture className="part-route-ticket__image part_from-route-ticket__image">
                            <img src={about.from.image.srcs.jpeg} alt={about.from.image.alt} />
                            <source srcSet={about.from.image.srcs.webp} type="img/webp" />
                        </picture>
                        <div className="part-route-ticket__subimage part_from-route-ticket__subimage">
                            <h4 className="part-route-ticket__country part_from-route-ticket__country">{about.from.country}</h4>
                            <div className="part-route-ticket__city part_from-route-ticket__city">{about.from.city}</div>
                        </div>
                    </div>
                </div>
                <div className="route-ticket__line">
                    <picture className="route-ticket__subcontent route-ticket__subcontent_from">
                        <img src={firstSubimageJpeg} alt="" />
                        <source srcSet={firstSubimageWebp} type="img/webp" />
                    </picture>
                    <picture className="route-ticket__line-image">
                        <img src={lineJpeg} alt="" />
                        <source srcSet={lineWebp} type="img/webp" />
                    </picture>
                    <picture className="route-ticket__subcontent route-ticket__subcontent_to">
                    <img src={secondSubimageJpeg} alt="" />
                    <source srcSet={secondSubimageWebp} type="img/webp" />
                </picture>
                </div>
                <div className="route-ticket__part part-route-ticket route-ticket__part_to part_to-route-ticket">
                    <div className="part-route-ticket__inner part_to-route-ticket__inner">
                        <picture className="part-route-ticket__image part_to-route-ticket__image">
                            <img src={about.to.image.srcs.jpeg} alt={about.to.image.alt} />
                            <source srcSet={about.to.image.srcs.webp} type="img/webp" />
                        </picture>
                        <div className="part-route-ticket__subimage part_to-route-ticket__subimage">
                            <h4 className="part-route-ticket__country part_to-route-ticket__country">{about.to.country}</h4>
                            <div className="part-route-ticket__city part_to-route-ticket__city">{about.to.city}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return(
        <div className="ticket__right ticket__logo logo-ticket">
            <picture className="logo-ticket__image">
                <img src={about.srcs.jpeg} alt={about.alt} />
                <source srcSet={about.srcs.webp} type="img/webp" />
            </picture>
        </div>
    )
}