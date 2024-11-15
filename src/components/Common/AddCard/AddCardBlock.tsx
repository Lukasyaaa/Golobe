import React, { ChangeEvent, FC, Fragment, useState } from "react";
import { addCardInputTitles, fieldGroupsTypes, setter, typeAddCardInput } from "../../../types";
import { useTypedSelector } from "../../../useTypedSelector";
import { SelectReplace } from "../Select/SelectReplace";
import { Input } from "../Input";
import { NavLink } from "react-router-dom";
import { homePath } from "../../../App";
import { useDispatch } from "react-redux";
import { userAddCardAction } from "../../../store/userReducer";

interface addCardWinProps{
    isShow : setter<boolean>,
    isWindow : true,
    parentClasses : string[]
}

interface addCardBlockProps{
    isWindow : false,
    parentClasses : string[]
}


export const AddCardBlock : FC<addCardBlockProps | addCardWinProps> = (props) => {
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
                        if(newValue[0] === "1" || newValue[0] === "0"){
                            setExpDate(newValue);
                        }
                        break;
                    case 1:
                        if(Number(newValue) <= 12){
                            setExpDate(newValue + "/");
                        }
                        break;
                    case 2:
                        if(Number(newValue[newValue.length - 1]) >= Math.floor((date.getFullYear() % 100) / 10)){
                            setExpDate(expDate + "/" + newValue[newValue.length - 1]);
                        }
                        break;
                    case 3:
                        if(Number(newValue[newValue.length - 1]) >= Math.floor((date.getFullYear() % 100) / 10)){
                            setExpDate(newValue);
                        }
                        break;
                    default:
                        if(Number(newValue.substring(3, 5)) > date.getFullYear() % 100 || 
                        (Number(newValue.substring(3, 5)) === date.getFullYear() % 100 && Number(newValue.substring(0, 2)) >= date.getMonth()+1)){
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

    const getCheck = (title : addCardInputTitles) : boolean => {
        switch(title){
            case addCardInputTitles.Card:
                return numberCard.length !== 19;
            case addCardInputTitles.ExpDate:
                return expDate.length !== 5;
            case addCardInputTitles.CVC:
                return cvc.length !== 3
            default:
                let setter : setter<string> | undefined = getSetter(title);
                return (setter !== undefined && setter.value.length === 0);
        }
    }
    let isAllGood : boolean = true;
    outherLoop : for (const fieldGroup of store.inputs){
        if(fieldGroup.isMassive){
            for(const input of fieldGroup.value){
                if(getCheck(input.description)){
                    isAllGood = false;
                    break outherLoop;
                }
            }
        } else if (getCheck(fieldGroup.value.description)){
            isAllGood = false;
            break;
        }
    }

    let classes = [
        props.parentClasses.map(cl => cl + "__add-card").join(" ") + " " + 
        props.parentClasses.map(cl => "add-card-" + cl).join(" ") + " add-card"
    ];
    if(props.isWindow){
        classes.push("modal-win");
        if(props.isShow.value){
            classes.push("_showed");
        }
    }

    let countriesMassive : string[] = [];
    for(const fieldGroup of store.inputs){
        if(fieldGroup.isMassive){
            for(const input of fieldGroup.value){
                if(input.type === typeAddCardInput.Select && input.description === addCardInputTitles.CountryOrRegion){
                    countriesMassive = input.links;
                    break;
                }
            }
        } else if(fieldGroup.value.type === typeAddCardInput.Select && 
        fieldGroup.value.description === addCardInputTitles.CountryOrRegion){
            countriesMassive = fieldGroup.value.links;
            break;
        }
    }

    const dispatch = useDispatch();
    const addCard = () => {
        setName("");
        setCvc("");
        setExpDate("");
        setNumberCard("")
        dispatch(userAddCardAction({
            number: Number(numberCard.split(" ").join("")), cvc: Number(cvc), 
            expDate: {month: parseInt(expDate.split("/")[0]), year: parseInt(expDate.split("/")[1]) + 2000},
            name: name, country: countriesMassive[currentCountry], isSavedInfo: isSave
        }))
    }

    if(store.inputs.length !== 0){
        return(
            <div className={classes.join(" ")}>
                {(props.isWindow) ?
                    <Fragment>
                        <button 
                            className={
                                props.parentClasses.map(cl => "add-card-" + cl + "__close").join(" ") + " add-card__close"
                            } 
                            type="button"
                            onClick={() => {
                                props.isShow.set(false);
                                document.body.classList.remove("_locked");
                                document.body.classList.remove("_modal-showed");
                            }}
                        >
                        </button>
                        <h2 
                            className={
                                props.parentClasses.map(cl => "add-card-" + cl + "__title").join(" ") + " add-card__title"
                            } 
                        >
                            {store.header.nextAppear}
                        </h2>
                    </Fragment>
                    :
                    <Fragment>
                        <h2 
                            className={
                                props.parentClasses.map(cl => "add-card-" + cl + "__title").join(" ") + " add-card__title"
                            } 
                        >
                            {store.header.firstAppear.title}
                        </h2>
                        <div 
                            className={
                                props.parentClasses.map(cl => "add-card-" + cl + "__description").join(" ") + " add-card__description"
                            } 
                        >
                            {store.header.firstAppear.description}
                        </div>
                    </Fragment>
                }
                <div 
                    className={
                        props.parentClasses.map(cl => "add-card-" + cl + "__inputs").join(" ") + " add-card__inputs"
                    } 
                >
                    {store.inputs.map((input, i) => {
                        if(input.isMassive){
                            return(
                                <div 
                                    className={
                                        props.parentClasses.map(cl => "add-card-" + cl + "__row").join(" ") + " " +
                                        props.parentClasses.map(cl => "row-add-card-" + cl).join(" ") +
                                        " add-card__row row-add-card"
                                    } 
                                    key={i}
                                >
                                    {input.value.map((massiveInput, j) => {
                                        if(massiveInput.type === typeAddCardInput.Entry){
                                            return(
                                                <Input 
                                                    key={String(i + "." + j)} id={String(i + "." + j)} 
                                                    about={{
                                                        type: fieldGroupsTypes.Text, placeholder: massiveInput.placeholder,
                                                        label: massiveInput.description
                                                    }} 
                                                    parentClasses={[
                                                        ...props.parentClasses.map(cl => "row-add-card-" + cl),
                                                        "row-add-card"
                                                    ]} 
                                                    input={getSetter(massiveInput.description)}
                                                    isError={getCheck(massiveInput.description)}
                                                    isNeedHideShow={false}
                                                />
                                            )   
                                        }
                                        return(
                                            <div 
                                                className={
                                                    props.parentClasses.map(cl => "row-add-card-" + cl + "__element").join(" ") +
                                                    " " + props.parentClasses.map(cl => "element-row-add-card-" + cl).join(" ") +
                                                    " row-add-card__element element-row-add-card"
                                                }
                                                key={String(i + "." + j)} 
                                            >
                                                <SelectReplace 
                                                    parentClasses={[
                                                        ...props.parentClasses.map(cl => "element-row-add-card-" + cl),
                                                        "element-row-add-card",
                                                    ]} 
                                                    links={massiveInput.links}
                                                    activeLink={{value: currentCountry, set: setCurrentCountry}}
                                                    isActive={{value: isActive, set: setIsActive}}
                                                    title={null}
                                                />
                                                <div
                                                    className={
                                                        props.parentClasses.map(cl => "element-row-add-card-" + cl + "__submain").join(" ") +
                                                        " element-row-add-card__submain"
                                                    }
                                                >
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
                                    <Input 
                                        key={i} id={String(i)} 
                                        about={{
                                            type: fieldGroupsTypes.Text, placeholder: input.value.placeholder,
                                            label: input.value.description
                                        }} 
                                        parentClasses={[
                                            ...props.parentClasses.map(cl => "add-card-" + cl),
                                            "add-card"
                                        ]} 
                                        input={getSetter(input.value.description)}
                                        isError={getCheck(input.value.description)}
                                        isNeedHideShow={false}
                                    />
                                )   
                            }
                            return(
                                <div 
                                    key={i} 
                                    className={
                                        props.parentClasses.map(cl => "add-card-" + cl + "__fieldgroup").join(" ") +
                                        " add-card__fieldgroup"
                                    }
                                >
                                    <SelectReplace 
                                        parentClasses={[
                                            ...props.parentClasses.map(cl => "add-card-" + cl),
                                            "add-card"
                                        ]} 
                                        links={input.value.links}
                                        activeLink={{value: currentCountry, set: setCurrentCountry}}
                                        isActive={{value: isActive, set: setIsActive}}
                                        title={null}
                                    />
                                    <div 
                                        className={
                                            props.parentClasses.map(cl => "add-card-" + cl + "__subinput").join(" ") + 
                                            " add-card__subinput"
                                        }
                                    >
                                        {input.value.description}
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
                <div 
                    className={
                        props.parentClasses.map(cl => "add-card-" + cl + "__save").join(" ") + " " +
                        props.parentClasses.map(cl => "save-add-card-" + cl).join(" ") +
                        " add-card__save save-add-card"
                    }
                >
                    <input 
                        className={
                            props.parentClasses.map(cl => "save-add-card-" + cl + "__input").join(" ") + " save-add-card__input"
                        } 
                        type="checkbox" id="save" 
                        checked={isSave} onChange={toggleIsSave}
                    />
                    <label className={
                        props.parentClasses.map(cl => "save-add-card-" + cl + "__subinput").join(" ") + " save-add-card__subinput"
                    } htmlFor="save">{store.saveText}</label>
                </div>
                {(props.isWindow)
                    ? <button 
                        className={
                            props.parentClasses.map(cl => "add-card-" + cl + "__button").join(" ") + " add-card__button"
                        } 
                        onClick={() => {
                            addCard();
                            props.isShow.set(false);
                            document.body.classList.remove("_locked");
                            document.body.classList.remove("_modal-showed");
                        }}
                        type="button"
                    >
                        {store.buttonAdd.nextAppear}
                    </button>
                    : ((isAllGood) 
                        ? <NavLink 
                            className={
                                props.parentClasses.map(cl => "add-card-" + cl + "__button").join(" ") + " add-card__button"
                            } 
                            onClick={addCard}
                            to={homePath}
                        >
                            {store.buttonAdd.firstAppear}
                        </NavLink>
                        : <div 
                            className={
                                props.parentClasses.map(cl => "add-card-" + cl + "__button").join(" ") + " " +
                                props.parentClasses.map(cl => "add-card-" + cl + "__button_disabled").join(" ") +
                                " add-card__button add-card__button_disabled"
                            }
                        >
                            {store.buttonAdd.firstAppear}
                        </div>
                    )
                }
                <div 
                    className={
                        props.parentClasses.map(cl => "add-card-" + cl + "__privacy-policy").join(" ") + 
                        " add-card__privacy-policy"
                    }
                >
                    {store.privacyPolicy}
                </div>
            </div>
        )
    }
    return <Fragment />
}