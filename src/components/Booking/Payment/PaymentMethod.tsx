import React, { FC } from "react";
import { contentPart, paymentMethod } from "../../../types";
import { useDispatch } from "react-redux";
import { paymentSetMethod } from "../../../store/booking/paymentReducer";

interface paymentMethodProps{
    about : paymentMethod,
    isActive : boolean,
    id : number,
    contentType : contentPart
}

export const PaymentMethod : FC<paymentMethodProps> = ({about, isActive, id, contentType}) => {
    const dispatch = useDispatch();

    const setActive = () : void => {
        dispatch(paymentSetMethod(id))
    }

    let classes = ["payment__method", "method-payment", `payment_${contentType.toLowerCase()}__method`, `method-payment_${contentType.toLowerCase()}`, "radios__item", "item-radios"]
    if(isActive){
        classes.push("_checked");
    }

    return(
        <div className={classes.join(" ")}>
            <div className={`method-payment__inner method-payment_${contentType.toLowerCase()}__inner item-radios__inner`}>
                <input 
                    className={`method-payment__input method-payment_${contentType.toLowerCase()}__input item-radios__input`} 
                    name="payment" type="radio" id={about.type} checked={isActive} onChange={setActive} 
                />
                <h3 className={`method-payment__type method-payment_${contentType.toLowerCase()}__type`}>{about.type}</h3>
                <div className={`method-payment__description method-payment_${contentType.toLowerCase()}__description item-radios__storage`}>
                    <span>{about.description}</span>
                </div>
            </div>
        </div>
    )
}