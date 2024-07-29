import React, { FC } from "react";
import { recentItem } from "../../types";

interface RecentItemProps{
    about : recentItem
}

export const RecentItem : FC<RecentItemProps> = ({about}) =>{
    return(
        <article className="recent__item item-recent">
            <a className="item-recent__inner" href="#">
                <picture className="item-recent__image">
                    <img src={about.image.srcs.jpeg} alt={about.image.alt} />
                    <source srcSet={about.image.srcs.webp} type="image/webp" />
                </picture>
                <div className="item-recent__info">
                    <h4 className="item-recent__title">{about.title}</h4>
                    <div className="item-recent__text">{about.countHotels} places</div>
                </div>
            </a>
        </article>
    )
}