import React from "react";
import { BlockHeader } from "../Common/BlockHeader";
import { useTypedSelector } from "../../hooks/redux";

export const Offer = () =>{
    let offerStore = useTypedSelector(store => store.flights.offer)

    return(
        <section className="offer">
            <div className="container">
                <BlockHeader text={offerStore.header} parent="offer" />
                <div className="offer__main main-offer">
                    <div className="main-offer__text text-main-offer">
                        <div className="text-main-offer__header">
                            <h3 className="text-main-offer__heading">{offerStore.item.title}</h3>
                            <div className="text-main-offer__price">From <strong>${offerStore.item.price}</strong></div>
                        </div>
                        <div className="text-main-offer__info">Traveling is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.</div>
                        <a className="text-main-offer__link" href={offerStore.item.href}><span>Book Flight</span></a>
                    </div>
                    <div className="main-offer__images">
                        {offerStore.item.images.map((image, index) =>(
                            <picture key={index} className="main-offer__image">
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