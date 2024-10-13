import React, { FC, Fragment, useRef, useState } from "react";
import { HeaderBlock } from "../../HeaderBlock";
import { offers, offersItem } from "../../../../types";
import { Offer } from "./Offer";

interface offersStore{
    state : offers
}

export const Offers : FC<offersStore> = ({state}) => {
    let [isShowAll, setIsShowAll] = useState<boolean>(false);

    let filtredOffers = useRef<offersItem[]>([]);
    let newIdShowedItem = useRef<number>(-1);
    if(filtredOffers.current.length === 0){
        state.items.forEach((offer, i) => {
            if(offer.info !== "" && offer.linkPath !== "" && offer.title !== "" && offer.images.length !== 0){
                filtredOffers.current.push(offer);
                if(i === state.idShowedItem){
                    newIdShowedItem.current = filtredOffers.current.length - 1;
                }
            }
        })
    }

    if(filtredOffers.current.length !== 0){
        return(
            <section className="offers">
                <div className="container">
                    <HeaderBlock 
                        about={state.header} parentClasses={["offers"]} 
                        isNeedButton={filtredOffers.current.length > 1 && newIdShowedItem.current !== -1}  
                        isShowAll={{value: isShowAll, set: setIsShowAll}}
                    />
                    <div className="offers__items">
                        {((isShowAll || newIdShowedItem.current === -1) ? filtredOffers.current.map((offer, i) =>
                            <Offer about={offer} linkText={state.buttonBook} key={i} />
                        ) : <Offer about={filtredOffers.current[newIdShowedItem.current]} linkText={state.buttonBook} />)}
                    </div>
                </div>
            </section>
        )
    }
    return <Fragment />
}