import React, {FC} from "react";
import { BlockHeader } from "./BlockHeader";
import { useTypedSelector } from "../../hooks/redux";
import { offer } from "../../types";

interface OfferProps{
    offerStore : offer
}

export const Offer : FC<OfferProps> = ({offerStore}) =>{
    return(
        <section className="offer">
            <div className="container">
                <BlockHeader about={offerStore.header} parent="offer" />
                <div className="offer__main main-offer">
                    <div className="main-offer__text text-main-offer">
                        <div className="text-main-offer__header">
                            <h3 className="text-main-offer__heading">{offerStore.item.title}</h3>
                            <div className="text-main-offer__price">From <strong>${offerStore.item.price}</strong></div>
                        </div>
                        <div className="text-main-offer__info">{offerStore.item.info}</div>
                        <a 
                            className="text-main-offer__link" href={offerStore.item.href} onClick={(e) => e.stopPropagation()}
                        >
                            <span>{offerStore.item.button}</span>
                        </a>
                    </div>
                    <div className="main-offer__images">
                        {offerStore.item.images.map((image, i) =>(
                            <picture key={i} className="main-offer__image">
                                <img src={image.srcs.jpeg} alt={image.alt} />
                                <source srcSet={image.srcs.webp} type="img/webp"></source>
                            </picture>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}