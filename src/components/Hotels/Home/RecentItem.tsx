import { type FC } from "react";
import type { RecentItem as RecentItemType } from "../../../types";

export const RecentItem : FC<RecentItemType> = ({image, city, countPlaces}) => {
    return(
        <a className="recent__item item-recent" href="#">
            <picture className="item-recent__image">
                <source srcSet={image.srcs.webp} type="image/webp" />
                <img src={image.srcs.jpeg} alt={image.alt} />
            </picture>
            <div className="item-recent__subimage">
                <h3 className="item-recent__city">{city + ", "}</h3>
                <div className="item-recent__places">{countPlaces + " places"}</div>
            </div>
        </a>
    )
}