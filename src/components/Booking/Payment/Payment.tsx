import React, { FC, Fragment } from "react";
import { contentPart } from "../../../types";
import { useTypedSelector } from "../../../useTypedSelector";
import { PaymentMethod } from "./PaymentMethod";
import { NavLink } from "react-router-dom";

interface paymentProps{
    contentType : contentPart
}

export const Payment : FC<paymentProps> = ({contentType}) => {
    const store = useTypedSelector(state => state.bookings.payment);

    if(store.methods.length !== 0){
        return(
            <article className={`booking__payment payment booking_${contentType.toLowerCase()}__payment payment_${contentType.toLowerCase()} radios`}>
                <div className={`payment__methods payment_${contentType.toLowerCase()}__methods radios__items`}>
                    {store.methods.map((method, i) => 
                        <PaymentMethod 
                            key={i} about={method} isActive={store.currentActive === i} id={i} contentType={contentType} 
                        />
                    )}
                </div>
                <NavLink className={`payment__link payment_${contentType.toLowerCase()}__link`} to={store.linkInfo.path}>
                    {store.linkInfo.description}
                </NavLink>
            </article>
        )
    }
    return <Fragment />
}