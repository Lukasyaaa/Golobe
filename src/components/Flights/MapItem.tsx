import React, { FC } from "react";
import { mapItem } from "../../types";

interface MapItemProps{
    id : number,
    about : mapItem,
}

export const MapItem : FC<MapItemProps> = ({id, about}) =>{
    return(
        <div className={`map__item item-map item-map_${id}`}>
            <picture className="item-map__image">
                <img src={about.image.srcs.jpeg} alt={about.image.alt} />
                <source srcSet={about.image.srcs.webp} type="image/webp" />
            </picture>
            <div className="item-map__text">
                <h4 className="item-map__title">{about.title}</h4>
                <div className="item-map__info">{about.info}</div>
            </div>
        </div>
    )
}