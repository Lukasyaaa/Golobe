import React, { useState, type ChangeEvent, type FC } from "react";
import { ADD_CARD_TITLE_FIELD, ADD_CARD_TITLE_SELECT, BOOKING_ICON_VALUE, FILL_RULE, ICON_POSITION, INPUT_TYPE, STROKE_LINECAP, STROKE_LINEJOIN, type AddCardItem, type IconParams, type IconValue, type objType, type useStateReturned } from "../../../../types";
import { AddCardField } from "./Field";
import { AddCardSelect } from "./Select";

interface AddCardProps{
    isOpened: useStateReturned<boolean>
}

export const AddCard: FC<AddCardProps> = ({isOpened}) => {
    const about : AddCardItem[] = [
        {
            isMassive: false, value: {
                type: INPUT_TYPE.field, label: "Card Number", placeholder: "4321 4321 4321 4321", 
                icon: {pos: ICON_POSITION.right, value: BOOKING_ICON_VALUE.visa}
            }
        },
        {
            isMassive: true, value: [
                {
                    type: INPUT_TYPE.field, label: "Exp. Date", placeholder: "02/27", 
                    icon: null
                },
                {
                    type: INPUT_TYPE.field, label: "CVC", placeholder: "123", 
                    icon: null
                }
            ]
        },
        {
            isMassive: false, value: {
                type: INPUT_TYPE.field, label: "Name on Card", placeholder: "John Doe", 
                icon: null
            }
        },
        {
            isMassive: false, value: {
                type: INPUT_TYPE.select, label: "Country or Region", links: ["United States", "Ukraine", "Japan", "Italy", "France", "Germany", "Poland"], 
                icon: null
            }
        },
    ]

    const getIconValue = (about: null | IconValue<objType<typeof BOOKING_ICON_VALUE>>): null | IconParams => {
        if(about === null) return null;
        switch(about.value){
            case BOOKING_ICON_VALUE.visa:
                return{
                    viewbox: {minX: 0, minY: 0, width: 32, height: 20}, width: 32, height: 20, pathes:[
                        {
                            fill: "rgb(20, 52, 203)", fillRule: FILL_RULE.nonzero, d: "M 1.28,0 C 0.573216,0 0,0.57305 0,1.28 v 17.53605 c 0,0.7069 0.573504,1.2799 1.28,1.2799 h 29.44 c 0.7068,0 1.28,-0.573 1.28,-1.2799 V 1.28 C 32,0.57309 31.4265,0 30.72,0 Z m 17.832,5.98895 c 0.7788,0 1.403,0.1721 1.801,0.332 l -0.272,1.711 -0.18,-0.091 c -0.3708,-0.1599 -0.847,-0.3139 -1.504,-0.303 -0.7864,0 -1.15,0.3508 -1.15,0.6791 -0.0046,0.3698 0.4248,0.6137 1.127,0.9789 1.1589,0.5636 1.6946,1.2468 1.687,2.145 -0.0156,1.639 -1.3863,2.6981 -3.498,2.6981 -0.9009,-0.01 -1.7688,-0.2007 -2.238,-0.4211 l 0.282,-1.768 0.259,0.126 c 0.6598,0.2948 1.087,0.4141 1.891,0.4141 0.5774,0 1.1971,-0.2418 1.202,-0.771 0.0038,-0.3456 -0.259,-0.592 -1.041,-0.979 -0.762,-0.3778 -1.7722,-1.0105 -1.761,-2.145 0.0119,-1.5348 1.41,-2.6061 3.395,-2.6061 z m -16.28202,0.251 h 3.24301 c 0.43671,0.0166 0.78928,0.1572 0.91101,0.6311 l 0.69901,3.608 c 9e-5,3e-4 -1.3e-4,0.0016 0,0.0019 l 0.20998,1.0811 1.96899,-5.3221 H 11.992 l -3.16602,7.7901 -2.128,0.0019 -1.69398,-6.286 c 1.00794,0.534 1.86605,1.1518 2.36301,2.002 C 7.23888,9.47895 7.07005,9.17525 6.85402,8.87595 6.60243,8.52745 6.0591,8.07745 5.832,7.88595 5.04064,7.21885 3.96592,6.68005 2.80499,6.39505 Z m 10.00902,0.009 h 2.083 l -1.303,7.7781 h -2.083 z m 11.765,0 h 1.578 l 1.652,7.7781 H 25.94 c 0,0 -0.1879,-0.8936 -0.249,-1.1661 -0.2977,0 -2.3797,-0.0029 -2.614,-0.0029 -0.0793,0.2105 -0.43,1.1689 -0.43,1.1689 h -2.143 l 3.031,-7.1319 c 0.2146,-0.5069 0.5804,-0.6461 1.069,-0.6461 z m 0.155,2.092 c -0.1025,0.2894 -0.281,0.7566 -0.269,0.736 0,0 -0.6412,1.7101 -0.809,2.1541 l 1.685,-0.0011 c -0.1565,-0.7416 -0.3132,-1.4833 -0.47,-2.2249 l -0.137,-0.664 z",
                            stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter
                        }
                    ]
                }
        }
    }
    let inputId = 0;
    let [cardNumber, setCardNumber] = useState<string>("");
    const setCardNumberHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        if(newValue.length > cardNumber.length){
            let spacesIndexes = [];
            for (let i = 0; i < newValue.length; i++) {
                if (newValue[i] === " ") {
                    spacesIndexes.push(i);
                }
            }

            if((/^\d+$/.test(newValue) || (!spacesIndexes.some((index, count) => (index - count) % 4 !== 0) && spacesIndexes.length !== 0)) && newValue.length < 20){
                setCardNumber(newValue.split(" ").join("").replace(/(.{4})(?=.)/g, "$1 "));
            }
        } else {
            setCardNumber(newValue.split(" ").join("").replace(/(.{4})(?=.)/g, "$1 "));
        }
    }

    let [expDate, setExpDate] = useState<string>("");
    const setExpDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        if(newValue.length >= expDate.length){
            const maxSize = (newValue.includes("/") ? 6 : 5);
            if(/^(?:\d{2}\/\d*|\d+)$/.test(newValue) && newValue.length < maxSize){
                if(newValue.length < 3){
                    if(parseInt(newValue) <= 12){
                        setExpDate(newValue);
                    }
                } else {
                    const date = new Date;
                    const isHasSlash = Number(newValue.includes("/"));
                    if(newValue.length === 4 + isHasSlash){
                        if(date.getFullYear() % 100 < parseInt(newValue.slice(2 + isHasSlash)) ||
                        date.getFullYear() % 100 === parseInt(newValue.slice(2 + isHasSlash)) &&
                        date.getMonth() + 1 < parseInt(newValue.slice(0, 2 + isHasSlash))){
                            setExpDate(newValue.slice(0, 2) + "/" + newValue.slice(2 + isHasSlash));
                        }
                    } else {
                        if(Math.floor((date.getFullYear() % 100) / 10) <= parseInt(newValue.slice(2 + isHasSlash))){
                            setExpDate(newValue.slice(0, 2) + "/" + newValue.slice(2 + isHasSlash));
                        }
                    }
                }
            }
        } else{
            if(newValue.length === 3){
                setExpDate(newValue.slice(0, 2))
            } else {
                setExpDate(newValue);
            }
        }
    }

    let [cvc, setCvc] = useState<string>("");
    const setCvcHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        if(newValue.length >= cvc.length){
            if(/^\d+$/.test(newValue) && newValue.length < 4){
                setCvc(newValue);
            }
        } else{
            setCvc(newValue);
        }
    }

    let [name, setName] = useState<string>("");
    const setNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        if(/^[A-Za-z ]*$/.test(newValue) && newValue.split(" ").filter(el => el === "").length < 2){
            setName(newValue);
        }
    }

    let currentCountry = useState<number>(0);

    const getSetFieldHandler = (desc : objType<typeof ADD_CARD_TITLE_FIELD>): ((e: ChangeEvent<HTMLInputElement>) => void) => {
        switch(desc){
            case ADD_CARD_TITLE_FIELD.cardNumber: return setCardNumberHandler;
            case ADD_CARD_TITLE_FIELD.cvc: return setCvcHandler;
            case ADD_CARD_TITLE_FIELD.expDate: return setExpDateHandler;
            case ADD_CARD_TITLE_FIELD.name: return setNameHandler;
        }
    } 
    const getValueFieldHandler = (desc : objType<typeof ADD_CARD_TITLE_FIELD>): string => {
        switch(desc){
            case ADD_CARD_TITLE_FIELD.cardNumber: return cardNumber;
            case ADD_CARD_TITLE_FIELD.cvc: return cvc;
            case ADD_CARD_TITLE_FIELD.expDate: return expDate;
            case ADD_CARD_TITLE_FIELD.name: return name;
        }
    }
    const getSetSelectHandler = (desc : objType<typeof ADD_CARD_TITLE_SELECT>): useStateReturned<number> => {
        switch(desc){
            case ADD_CARD_TITLE_SELECT.country: return currentCountry;
        }
    }

    let [isChecked, setIsChecked] = useState<boolean>(false);

    return(
        <div className={["booking__add-card", "add-card", isOpened[0] ? "_show" : ""].filter(Boolean).join(" ")}>
            <div className="add-card__close-parent">
                <button className="add-card__close" type="button" onClick={() => {
                    isOpened[1](false); document.body.classList.remove("_locked");
                }} />
            </div>
            <h2 className="add-card__heading">Add a new Card</h2>
            <div className="add-card__inputs">
                {about.map((item, i) => {
                    if(item.isMassive){
                        return(
                            <div className="add-card__row" key={i}>
                                {item.value.map((input, j) => {
                                    if(input.type === INPUT_TYPE.field){
                                        inputId++;
                                        return(
                                            <AddCardField 
                                                key={i + "." + j} about={input} 
                                                onChange={getSetFieldHandler(input.label)} 
                                                value={getValueFieldHandler(input.label)}
                                                getIconValue={getIconValue} id={inputId}
                                            />
                                        )
                                    }
                                    return (
                                        <AddCardSelect 
                                            key={i + "." + j} about={input} activeLink={getSetSelectHandler(input.label)}
                                            getIconValue={getIconValue} 
                                        />
                                    )
                                })}
                            </div>
                        )
                    }
                    if(item.value.type === INPUT_TYPE.field){
                        inputId++;
                        return(
                            <AddCardField 
                                key={i} about={item.value} 
                                onChange={getSetFieldHandler(item.value.label)} 
                                value={getValueFieldHandler(item.value.label)}
                                getIconValue={getIconValue} id={inputId}
                            />
                        )
                    }
                    return (
                        <AddCardSelect 
                            key={i} about={item.value} activeLink={getSetSelectHandler(item.value.label)}
                            getIconValue={getIconValue} 
                        />
                    )
                })}
            </div>
            <div className={["add-card__checkbox", "checkbox-add-card", isChecked ? "_checked" : ""].filter(Boolean).join(" ")}>
                <div className="checkbox-add-card__input-parent">
                    <input 
                        className="checkbox-add-card__input" type="checkbox" id="save-info" 
                        checked={isChecked} onChange={(e) => {
                            setIsChecked(e.currentTarget.checked);
                        }}
                    />
                </div>
                <label className="checkbox-add-card__subinput" htmlFor="save-info">
                    Securely save my information for 1-click checkout
                </label>
            </div>
            <button 
                className="add-card__button button_green" type="button"
                disabled={name.length === 0 || cardNumber.length !== 19 || cvc.length !== 3 || expDate.length !== 5}
            >
                Add Card
            </button>
            <div className="add-card__copyright">By confirming your subscription, you allow The Outdoor Inn Crowd Limited to charge your card for this payment and future payments in accordance with their terms. You can always cancel your subscription.</div>
        </div>
    )
}