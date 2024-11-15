import React, { FC, useState } from "react";
import { useTypedSelector } from "../../../useTypedSelector";
import { AccountCard } from "./AccountCard";
import { card, setter } from "../../../types";

interface accountCardsProps{
    isShow : setter<boolean>,
    heading : string,
    addCardButton : string,
    cards : card[]
}

export const AccountCards : FC<accountCardsProps> = ({isShow, heading, addCardButton, cards}) => {
    const appearModal = () => {
        isShow.set(true);
        document.body.classList.add("_locked");
        document.body.classList.add("_modal-showed");
    }

    return(
        <section className="account__cards cards-account">
            <div className="container">
                <h2 className="cards-account__heading account__heading">{heading}</h2>
                <div className="cards-account__main">
                    <div className="cards-account__items">
                        {cards.map((card, i) => 
                            <AccountCard key={i} id={i} lastNumbers={card.number % 10000} expDate={card.expDate} />
                        )}
                    </div>
                    <button className="cards-account__add icon-plus_circle" type="button" onClick={appearModal}>
                        <span>{addCardButton}</span>
                    </button>
                </div>
            </div>
        </section>
    )
}