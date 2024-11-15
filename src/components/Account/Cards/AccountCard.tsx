import React, { FC } from "react";
import { cardExpDate } from "../../../types";
import { useDispatch } from "react-redux";
import { userDeleteCardAction } from "../../../store/userReducer";

interface accountCardProps{
    id : number,
    lastNumbers : number,
    expDate : cardExpDate
}

export const AccountCard : FC<accountCardProps> = ({id, lastNumbers, expDate}) => {
    const dispatch = useDispatch();

    const deleteCard = () => {
        dispatch(userDeleteCardAction(id))
    }

    return(
        <div className="cards-account__item item-cards-account">
            <div className="item-cards-account__inner icon-visa">
                <div className="item-cards-account__number">**** **** ****<strong>{lastNumbers}</strong></div>
                <button 
                    className="item-cards-account__delete icon-bin" type="button" onClick={deleteCard}
                >   
                </button>
                <div className="item-cards-account__exp-date">
                    Valid Thru
                    <strong>{((expDate.month < 10) ? "0" : "") + expDate.month + "/" + (expDate.year % 100)}</strong>
                </div>
            </div>
        </div>
    )
}