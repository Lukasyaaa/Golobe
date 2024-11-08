import React, { ChangeEvent, FC, Fragment, useState } from "react";
import { addCardInputTitles, contentPart, setter, typeAddCardInput } from "../../../types";
import { useTypedSelector } from "../../../useTypedSelector";
import { SelectReplace } from "../Select/SelectReplace";
import { AddCardWinEntry } from "./addCardWinEntry";

interface addCardWinProps{
    contentType : contentPart,
    isShow : setter<boolean>
}

export const AddCardWin : FC<addCardWinProps> = ({contentType, isShow}) => {
    const store = useTypedSelector(state => state.bookings.addCard);
    let [isSave, setIsSave] = useState<boolean>(true);
    const toggleIsSave = (e : ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked){
            setIsSave(true);
        }else{
            setIsSave(false);
        }
    }

    let [numberCard, setNumberCard] = useState<string>("");
    const setNumberCardHandler = (newValue : string) => {
        if(newValue.length > numberCard.length){
            if(newValue.length < 20 && /^\d$/.test(newValue[newValue.length - 1])){
                if(newValue.length % 5 === 0 && newValue[newValue.length - 1] !== ' '){
                    setNumberCard(numberCard + " " + newValue[newValue.length - 1]);
                }else{
                    setNumberCard(
                        newValue + 
                        (((newValue.length - Math.floor(newValue.length / 5)) % 4 === 0 && newValue.length !== 19) ? " " : "")
                    );
                }
            }
        }else{
            if(newValue.length % 5 === 0){
                setNumberCard(newValue.slice(0, newValue.length - 1));
            }else{
                setNumberCard(newValue);
            }
        }
    }

    let [expDate, setExpDate] = useState<string>("");
    let date = new Date();

    const setExpDateHandler = (newValue : string) => {
        if(newValue.length > expDate.length){
            if(newValue.length < 6 && /^\d$/.test(newValue[newValue.length - 1])){
                switch(expDate.length){
                    case 0:
                        if(newValue[0] === "1" || (newValue[0] === "0" && (date.getMonth() + 1) < 10)){
                            setExpDate(newValue);
                        }
                        break;
                    case 1:
                        if(Number(newValue) >= (date.getMonth() + 1) && Number(newValue) <= 12){
                            setExpDate(newValue + "/");
                        }
                        break;
                    case 2:
                        if(Number(newValue[newValue.length - 1]) >= Math.floor((date.getFullYear() % 100) / 10)){
                            setExpDate(expDate + "/" + newValue[newValue.length - 1]);
                        }
                        break;
                    case 3:
                        console.log(Number(newValue[newValue.length - 1]))
                        if(Number(newValue[newValue.length - 1]) >= Math.floor((date.getFullYear() % 100) / 10)){
                            setExpDate(newValue);
                        }
                        break;
                    default:
                        if(Number(newValue.substring(3, 5)) >= date.getFullYear() % 100){
                            setExpDate(newValue);
                        }
                        break;
                }
            }
        } else {
            if(newValue.length === 3){
                setExpDate(newValue.slice(0, newValue.length - 1));
            }else{
                setExpDate(newValue);
            }
        }
    }

    let [cvc, setCvc] = useState<string>("");
    const setCvcHandler = (newValue : string) => {
        if(newValue.length < 4 && /^\d$/.test(newValue[newValue.length - 1])){
            setCvc(newValue);
        }
    }

    let [name, setName] = useState<string>("");
    const setNameHandler = (newValue : string) => {
        if(/^[a-zA-Z ]$/.test(newValue[newValue.length - 1]) || newValue.length === 0){
            if((newValue[newValue.length - 1] === ' ' && newValue.length !== 1 && newValue[newValue.length - 2] !== ' ') || 
            newValue[newValue.length - 1] !== ' '){
                setName(newValue);
            }
        }
    }

    let [currentCountry, setCurrentCountry] = useState<number>(0);
    let [isActive, setIsActive] = useState<boolean>(false);

    const getSetter = (title : addCardInputTitles) : setter<string> => {
        switch(title){
            case addCardInputTitles.Card:
                return {value: numberCard, set: setNumberCardHandler};
            case addCardInputTitles.ExpDate:
                return {value: expDate, set: setExpDateHandler};
            case addCardInputTitles.CVC:
                return {value: cvc, set: setCvcHandler};
            default:
                return {value: name, set: setNameHandler};
        }
    }

    const disappearModalHandle = () => {
        isShow.set(false);
        document.body.classList.remove("_locked");
        document.body.classList.remove("_modal-showed");
    }

    let classes = ["booking__add-card", "add-card", `booking_${contentType.toLowerCase()}__add-card`, `add-card_${contentType.toLowerCase()}`];
    if(isShow.value){
        classes.push("_showed");
    }

    if(store.inputs.length !== 0){
        return(
            <div className={classes.join(" ")}>
                <button 
                    className={`add-card__close add-card_${contentType.toLowerCase()}__close`} 
                    type="button"
                    onClick={disappearModalHandle}
                >
                </button>
                <h2 className={`add-card__title add-card_${contentType.toLowerCase()}__title`}>{store.title}</h2>
                <div className={`add-card__inputs add-card_${contentType.toLowerCase()}__inputs`}>
                    {store.inputs.map((input, i) => {
                        if(input.isMassive){
                            return(
                                <div className="add-card__row row-add-card" key={i}>
                                    {input.value.map((massiveInput, j) => {
                                        if(massiveInput.type === typeAddCardInput.Entry){
                                            return(
                                                <AddCardWinEntry 
                                                    key={String(i + "." + j)} id={String(i + "." + j)} about={massiveInput} 
                                                    parentClasses={["row-add-card", `row-add-card_${contentType.toLowerCase()}`]} 
                                                    value={getSetter(massiveInput.description)}
                                                />
                                            )   
                                        }
                                        return(
                                            <div key={String(i + "." + j)} className={`row-add-card__element row-add-card_${contentType.toLowerCase()}__element element-row-add-card element-row-add-card_${contentType.toLowerCase()}`}>
                                                <SelectReplace 
                                                    parentClasses={["element-row-add-card", `element-row-add-card_${contentType}`]} 
                                                    links={massiveInput.links}
                                                    activeLink={{value: currentCountry, set: setCurrentCountry}}
                                                    isActive={{value: isActive, set: setIsActive}}
                                                    title={null}
                                                />
                                                <div className={`element-row-add-card__submain element-row-add-card_${contentType}__submain`}>
                                                    {massiveInput.description}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        } else {
                            if(input.value.type === typeAddCardInput.Entry){
                                return(
                                    <AddCardWinEntry 
                                        key={i} id={String(i)} about={input.value} 
                                        parentClasses={["add-card", `add-card_${contentType.toLowerCase()}`]} 
                                        value={getSetter(input.value.description)}
                                    />
                                )   
                            }
                            return(
                                <div key={i} className={`add-card__element add-card_${contentType.toLowerCase()}__element element-add-card element-add-card_${contentType.toLowerCase()}`}>
                                    <SelectReplace 
                                        parentClasses={["element-add-card", `element-add-card_${contentType.toLowerCase()}`]} 
                                        links={input.value.links}
                                        activeLink={{value: currentCountry, set: setCurrentCountry}}
                                        isActive={{value: isActive, set: setIsActive}}
                                        title={null}
                                    />
                                    <div className={`element-add-card__submain element-add-card_${contentType}__submain`}>
                                        {input.value.description}
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
                <div className="add-card__save save-add-card">
                    <input 
                        className="save-add-card__input" type="checkbox" id="save" 
                        checked={isSave} onChange={toggleIsSave}
                    />
                    <label className="save-add-card__subinput" htmlFor="save">{store.saveText}</label>
                </div>
                <button className="add-card__button" type="button">{store.buttonAdd}</button>
                <div className="add-card__privacy-policy">{store.privacyPolicy}</div>
            </div>
        )
    }
    return <Fragment />
}