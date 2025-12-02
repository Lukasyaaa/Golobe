import React, { type FC } from "react";
import { addZero, type Card, type User } from "../../../types";
import { useTypedSelector } from "../../../store";

interface AccountPaymentMethodProps extends Card{
    id: number,
    removeCard: (id: number) => void
}

export const AccountPaymentMethod: FC<AccountPaymentMethodProps> = ({number, expDate, id, removeCard}) => {
    const currentUser = useTypedSelector(state => state.user);
    const users = JSON.parse(localStorage.getItem("users") as string) as User[];
    return(
        <div className="payment__method method-payment">
            <div className="method-payment__number"><span>**** **** ****</span><strong>{number % 10000}</strong></div>
            <div className="method-payment__exp-date">
                <span>Valid Thru</span> 
                <strong>{addZero(expDate.month) + "/" + expDate.year % 100}</strong>
            </div>
            <button 
                className="method-payment__remove" type="button" 
                onClick={() => {
                    localStorage.setItem("users", JSON.stringify(users.map(u =>
                        u.password === currentUser.password ? {...u, cards: u.cards.filter((_, index) => index !== id)} : u
                    )));
                    removeCard(id);
                }}
            >
                <svg viewBox="0 0 21 19.5" width="21" height="19.5" fill="none">
                    <path fill="rgb(17, 34, 17)" fillRule="evenodd" d="M 19.5,0 H 1.5 C 0.67157,0 0,0.67157 0,1.5 v 0.75 c 0,0.82843 0.67157,1.5 1.5,1.5 h 18 c 0.8284,0 1.5,-0.67157 1.5,-1.5 V 1.5 C 21,0.67157 20.3284,0 19.5,0 Z" />
                    <path fill="rgb(17, 34, 17)" fillRule="nonzero" d="M 1.99031,5.25001 C 1.93761,5.24972 1.88544,5.26055 1.83721,5.28178 1.78898,5.30301 1.74576,5.33416 1.71038,5.37322 1.67499,5.41227 1.64824,5.45834 1.63186,5.50843 1.61548,5.55852 1.60984,5.6115 1.61531,5.66391 L 2.84859,17.5027 c -2.6e-4,0.0034 -2.6e-4,0.0068 0,0.0103 0.06444,0.5475 0.32769,1.0524 0.73978,1.4187 C 4.00046,19.298 4.5327,19.5002 5.08405,19.5 H 15.9164 c 0.5512,0 1.0832,-0.2023 1.4951,-0.5686 0.4119,-0.3663 0.675,-0.871 0.7394,-1.4184 V 17.5031 L 19.3823,5.66391 C 19.3878,5.6115 19.3822,5.55852 19.3658,5.50843 19.3494,5.45834 19.3226,5.41227 19.2873,5.37322 19.2519,5.33416 19.2087,5.30301 19.1604,5.28178 19.1122,5.26055 19.06,5.24972 19.0073,5.25001 Z M 13.6556,13.7198 c 0.0713,0.0693 0.1281,0.1521 0.1672,0.2435 0.039,0.0915 0.0595,0.1897 0.0602,0.2891 7e-4,0.0995 -0.0184,0.198 -0.0561,0.29 -0.0378,0.092 -0.0934,0.1755 -0.1637,0.2458 -0.0703,0.0703 -0.1539,0.1259 -0.2459,0.1636 -0.092,0.0377 -0.1906,0.0567 -0.29,0.0559 -0.0994,-7e-4 -0.1977,-0.0212 -0.2891,-0.0603 -0.0914,-0.0391 -0.1741,-0.0959 -0.2434,-0.1672 L 10.5005,12.6858 8.40562,14.7802 C 8.26432,14.9175 8.07467,14.9936 7.87766,14.9922 7.68065,14.9908 7.4921,14.912 7.35276,14.7727 7.21342,14.6334 7.13448,14.4449 7.133,14.2479 7.13151,14.0509 7.20761,13.8612 7.34484,13.7198 L 9.4397,11.625 7.34484,9.5302 C 7.20761,9.3888 7.13151,9.1991 7.133,9.0021 7.13448,8.8051 7.21342,8.6166 7.35276,8.4773 7.4921,8.338 7.68065,8.2592 7.87766,8.2578 8.07467,8.2564 8.26432,8.3326 8.40562,8.4698 l 2.09488,2.0944 2.0943,-2.0944 c 0.1413,-0.1372 0.331,-0.2134 0.528,-0.212 0.197,0.0014 0.3856,0.0802 0.5249,0.2195 0.1393,0.1393 0.2183,0.3278 0.2198,0.5248 0.0014,0.197 -0.0747,0.3867 -0.2119,0.5281 l -2.0948,2.0948 z"/>
                </svg>
            </button>
        </div>
    )
}