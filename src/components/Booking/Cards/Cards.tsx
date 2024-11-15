import React, { FC } from "react";
import { card, contentPart, setter } from "../../../types";
import { useTypedSelector } from "../../../useTypedSelector";
import { Card } from "./Card";

interface cardsProps{
    contentType : contentPart,
    choosedCard : setter<number>,
    appearModal : () => void,
    cards : card[]
}

export const Cards : FC<cardsProps> = ({contentType, choosedCard, appearModal, cards}) => {
    return(
        <article className={`booking__cards cards booking_${contentType.toLowerCase()}__cards cards_${contentType.toLowerCase()} radios`}>
            {cards.length !== 0 &&
            <div className={`cards__elements cards_${contentType.toLowerCase()}__elements radios__items`}>
                {cards.map((card, i) => <Card 
                    key={i} contentType={contentType} about={card} id={i} choosedCard={choosedCard} 
                />)}
            </div>
            }
            <button 
                className={`cards__add cards_${contentType.toLowerCase()}__add icon-plus_circle`} type="button"
                onClick={appearModal}
            >
                <span>Add a new card</span>
            </button>
        </article>
    )
}