import { type FC } from "react";
import type { Card, useStateReturned } from "../../../types";
import { AccountPaymentMethod } from "./Method";
import { AddCard } from "../../Common/Blocks/AddCard";
import { useAppDispatch } from "../../../store";
import { userSlice } from "../../../store/user";

interface AccountPaymentProps{
    cards: Card[],
    isOpened: useStateReturned<boolean>
}

export const AccountPayment: FC<AccountPaymentProps> = ({cards, isOpened}) => {
    let [_, setIsOpened] = isOpened;
    const dispatch = useAppDispatch();
    const removeCard = (id: number) => dispatch(userSlice.actions.removeCard(id));
    return(
        <section className="account__payment account__section section-account payment">
            <div className="container">
                <h2 className="payment__heading section-account__heading">Payment methods</h2>
                <div className="payment__container section-account__container">
                    {cards.map((card, i) => <AccountPaymentMethod key={i} id={i} {...card} removeCard={removeCard} />)}
                    <button 
                        className="payment__add-method add-method-payment" type="button"
                        onClick={() => setIsOpened(prev => !prev)}
                    >
                        <svg className="add-method-payment__icon" viewBox="0 0 52 52" width="52" height="52" fill="none">
                            <path fillRule="nonzero" stroke="#8dd3bb" strokeWidth="2" d="M 25,1 C 11.75,1 1,11.75 1,25 1,38.25 11.75,49 25,49 38.25,49 49,38.25 49,25 49,11.75 38.25,1 25,1 Z" />
                            <path fillRule="nonzero" stroke="#8dd3bb" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M 25,15 V 35 M 35,25 H 15"/>
                        </svg>
                        <span className="add-method-payment__description">Add a new card</span>
                    </button>
                </div>
            </div>
            <AddCard isOpened={isOpened} parentCl="payment" />
        </section>
    )
}