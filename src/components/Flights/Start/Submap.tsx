import { type FC } from "react";
import type { Submap as SubmapType } from "../../../types";

export const Submap : FC<SubmapType> = ({image, arrow, place, boardingPass}) => {
    const isAuthorized = false;

    return(
        <a className={["map__item", "item-map", place.toLowerCase()].join(" ")} href="#">
            <picture className="item-map__image">
                <source srcSet={image.srcs.webp} type="image/webp" />
                <img src={image.srcs.jpeg} alt={image.alt} />
            </picture>
            <div className="item-map__subimage">
                <div className="item-map__name">{isAuthorized ? "" : "James Doe"}</div>
                <div className="item-map__pass">{"Boarding Pass N’" + boardingPass}</div>
            </div>
            <img className="item-map__arrow" src={arrow} alt="Arrow" />
        </a>
    )
}