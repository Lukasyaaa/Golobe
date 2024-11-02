import React, { FC } from "react";
import { hotel } from "../../../types";
import { ShortReview } from "../../Common/ShortReview";

interface hotelsItemProps{
    about : hotel,
    buttonLink : string
}

export const HotelsItem : FC<hotelsItemProps> = ({about, buttonLink}) => {
    return(
        <article className="hotels__item content__item item-hotels item-content">
            {(about.images.another.length > 0) ?
            <figure className="item-hotels__image-block">
                <picture className="item-hotels__image">
                    <img src={about.images.main.srcs.jpeg} alt={about.images.main.alt} />
                    <source srcSet={about.images.main.srcs.webp} type="img/webp" />
                </picture>
                <figcaption className="item-hotels__subimage">{about.images.another.length + " images"}</figcaption>
            </figure>
            :
            <picture className="item-hotels__image loner">
                <img src={about.images.main.srcs.jpeg} alt={about.images.main.alt} />
                <source srcSet={about.images.main.srcs.webp} type="img/webp" />
            </picture>}
            <div className="item-hotels__info">
                <div className="item-hotels__row">
                    <div className="item-hotels__left">
                        <h3 className="item-hotels__title">{about.title}</h3>
                        <div className="item-hotels__location icon-location"><span>{about.location}</span></div>
                        <div className="item-hotels__status">
                            <div className="item-hotels__stars">
                                <div className="item-hotels__stars-container">
                                    {Array.from({length: 5}).map((_, i) => {
                                        if(i < about.countStars){
                                            return <span className="item-hotels__star filled icon-star" key={i}></span>
                                        }
                                        return <span className="item-hotels__star icon-star" key={i}></span>
                                    })}
                                </div>
                                <span className="item-hotels__substars">{about.countStars + " Star Hotel"}</span>
                            </div>
                            <div className="item-hotels__amenities icon-cup">
                                <span>
                                    <strong>
                                        {(about.amenities.length > 10 && about.amenities.length % 10 !== 0) 
                                            ? "+" + Math.floor(about.amenities.length / 10) + "0 " 
                                            : Math.floor(about.amenities.length) + " "
                                        }
                                    </strong> 
                                    Amenities
                                </span>
                            </div>
                        </div>
                        <ShortReview parentClasses={["item-hotels"]} about={about.shortReview} />
                    </div>
                    <div className="item-hotels__right">
                        <span>starting from</span><mark>{"$" + about.price + "/night"}</mark><span>excl.tax</span>
                    </div>
                </div>
                <div className="item-hotels__footer item-content__footer">
                    <button className="item-hotels__favourites item-content__favourites icon-heart_border" type="button"></button>
                    <button className="item-hotels__view-more item-content__view-more" type="button">{buttonLink}</button>
                </div>
            </div>
        </article>
    )
}