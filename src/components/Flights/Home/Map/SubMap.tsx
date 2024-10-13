import React, { FC } from "react";
import { mapItemType, mapPart, mapPartType, mapPropose } from "../../../../types";


interface submapProps{
    about : mapPropose | mapPart,
    user : string
}

export const SubMap : FC<submapProps> = ({about, user}) => {
    if(about.type === mapItemType.PartOfMap){
        let classes = ["map__item", "item-map", "map__item_positioned", "item-map_positioned", about.location]
        switch(about.location){
            case mapPartType.Alzhir:
                classes.push("bottom");
                break;
            default:
                classes.push("top");
                break;
        }
        return(
            <a className={classes.join(" ")} href={about.linkPath}>
                <figure className="item-map__inner item-map_positioned__inner">
                    <picture className="item-map__image item-map_positioned__image">
                        <img src={about.image.main.srcs.jpeg} alt={about.image.main.srcs.jpeg} />
                        <source srcSet={about.image.main.srcs.webp} type="img/webp" />
                    </picture>
                    <figcaption className="item-map__info item-map_positioned__info">
                        <h3 className = "item-map__user item-map_positioned__user">{user}</h3>
                        <div className = "item-map__ticket item-map_positioned__ticket">{"Boarding Pass N’" + about.ticketNumb}</div>
                    </figcaption>
                </figure>
                <div className="item-map__arrow">
                    <img {...about.image.arrow} />
                </div>
            </a>
        )
    }
    return(
        <a className="map__item item-map map__item_default item-map_default" href={about.linkPath}>
            <figure className="item-map__inner item-map_default__inner">
                <picture className="item-map__image item-map_default__image">
                    <img src={about.image.srcs.jpeg} alt={about.image.srcs.jpeg} />
                    <source srcSet={about.image.srcs.webp} type="img/webp" />
                </picture>
                <figcaption className="item-map__info item-map_default__info">
                    <h3 className = "item-map__user item-map_default__user">{user}</h3>
                    <div className = "item-map__ticket item-map_default__ticket">{"Boarding Pass N’" + about.ticketNumb}</div>
                </figcaption>
            </figure>
        </a>
    )
}