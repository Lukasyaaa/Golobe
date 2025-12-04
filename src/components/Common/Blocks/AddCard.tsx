import { useState, type FC } from "react";
import { ADD_CARD_TITLE_FIELD, ADD_CARD_TITLE_SELECT, FILL_RULE, getInputSetState, getInputState, getInputValidation, ICON_POSITION, INPUT_CARD_VALIDATION_TYPE, INPUT_TYPE, STROKE_LINECAP, STROKE_LINEJOIN } from "../../../types";
import type { OneDataInputValidation, Card, Field, FieldItem, FieldsItem, Icon, InputState, objType, User, useStateReturned } from "../../../types";
import { Input } from "./Interaction/Input";
import { useAppDispatch, useTypedSelector } from "../../../store";
import { userSlice } from "../../../store/user";
import { SelectDescription } from "./Interaction/Select";

interface AddCardField extends Field<typeof INPUT_CARD_VALIDATION_TYPE>{
    type: typeof INPUT_TYPE.field, 
}
export interface AddCardSelect{
    type: typeof INPUT_TYPE.select, 
    description: objType<typeof ADD_CARD_TITLE_SELECT>, 
    links: string[], 
    icon: null | Icon
}
type AddCardInput = AddCardField | AddCardSelect;

interface AddCardProps{ 
    isOpened: useStateReturned<boolean>, parentCl: string 
}
export const AddCard: FC<AddCardProps> = ({isOpened, parentCl}) => {
    const dispatch = useAppDispatch();
    const about: (FieldsItem<AddCardInput> | FieldItem<AddCardInput>)[] = [
        {
            isMassive: false, value: {
                validationType: INPUT_CARD_VALIDATION_TYPE.cardNumber,
                type: INPUT_TYPE.field, subinput: "Card Number", placeholder: "4321 4321 4321 4321", 
                icon: {
                    pos: ICON_POSITION.right, 
                    value: {                    
                        viewbox: {minX: 0, minY: 0, width: 32, height: 20}, width: 32, height: 20, pathes: [{
                            fill: "rgb(20, 52, 203)", fillRule: FILL_RULE.nonzero, d: "M 1.28,0 C 0.573216,0 0,0.57305 0,1.28 v 17.53605 c 0,0.7069 0.573504,1.2799 1.28,1.2799 h 29.44 c 0.7068,0 1.28,-0.573 1.28,-1.2799 V 1.28 C 32,0.57309 31.4265,0 30.72,0 Z m 17.832,5.98895 c 0.7788,0 1.403,0.1721 1.801,0.332 l -0.272,1.711 -0.18,-0.091 c -0.3708,-0.1599 -0.847,-0.3139 -1.504,-0.303 -0.7864,0 -1.15,0.3508 -1.15,0.6791 -0.0046,0.3698 0.4248,0.6137 1.127,0.9789 1.1589,0.5636 1.6946,1.2468 1.687,2.145 -0.0156,1.639 -1.3863,2.6981 -3.498,2.6981 -0.9009,-0.01 -1.7688,-0.2007 -2.238,-0.4211 l 0.282,-1.768 0.259,0.126 c 0.6598,0.2948 1.087,0.4141 1.891,0.4141 0.5774,0 1.1971,-0.2418 1.202,-0.771 0.0038,-0.3456 -0.259,-0.592 -1.041,-0.979 -0.762,-0.3778 -1.7722,-1.0105 -1.761,-2.145 0.0119,-1.5348 1.41,-2.6061 3.395,-2.6061 z m -16.28202,0.251 h 3.24301 c 0.43671,0.0166 0.78928,0.1572 0.91101,0.6311 l 0.69901,3.608 c 9e-5,3e-4 -1.3e-4,0.0016 0,0.0019 l 0.20998,1.0811 1.96899,-5.3221 H 11.992 l -3.16602,7.7901 -2.128,0.0019 -1.69398,-6.286 c 1.00794,0.534 1.86605,1.1518 2.36301,2.002 C 7.23888,9.47895 7.07005,9.17525 6.85402,8.87595 6.60243,8.52745 6.0591,8.07745 5.832,7.88595 5.04064,7.21885 3.96592,6.68005 2.80499,6.39505 Z m 10.00902,0.009 h 2.083 l -1.303,7.7781 h -2.083 z m 11.765,0 h 1.578 l 1.652,7.7781 H 25.94 c 0,0 -0.1879,-0.8936 -0.249,-1.1661 -0.2977,0 -2.3797,-0.0029 -2.614,-0.0029 -0.0793,0.2105 -0.43,1.1689 -0.43,1.1689 h -2.143 l 3.031,-7.1319 c 0.2146,-0.5069 0.5804,-0.6461 1.069,-0.6461 z m 0.155,2.092 c -0.1025,0.2894 -0.281,0.7566 -0.269,0.736 0,0 -0.6412,1.7101 -0.809,2.1541 l 1.685,-0.0011 c -0.1565,-0.7416 -0.3132,-1.4833 -0.47,-2.2249 l -0.137,-0.664 z",
                            stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter
                        }]
                    }
                }, id: "number"
            }
        },
        {
            isMassive: true, value: [
                { 
                    type: INPUT_TYPE.field, validationType: INPUT_CARD_VALIDATION_TYPE.expDate,
                    subinput: ADD_CARD_TITLE_FIELD.expDate, placeholder: "02/27", icon: null, id: "exp-date" 
                },
                { 
                    type: INPUT_TYPE.field, validationType: INPUT_CARD_VALIDATION_TYPE.cvc,
                    subinput: ADD_CARD_TITLE_FIELD.cvc, placeholder: "123", icon: null, id: "cvc" 
                }
            ]
        },
        {
            isMassive: false, value: { 
                type: INPUT_TYPE.field, validationType: INPUT_CARD_VALIDATION_TYPE.name, 
                subinput: ADD_CARD_TITLE_FIELD.name, placeholder: "John Doe", icon: null, id: "name"
            }
        },
        {
            isMassive: false, value: {
                type: INPUT_TYPE.select, description: ADD_CARD_TITLE_SELECT.country, links: ["United States", "Ukraine", "Japan", "Italy", "France", "Germany", "Poland"], 
                icon: null
            }
        },
    ]

    let [inputs, setInputs] = useState<InputState<typeof INPUT_CARD_VALIDATION_TYPE>[]>([
        {description: INPUT_CARD_VALIDATION_TYPE.cardNumber, value: ""},
        {description: INPUT_CARD_VALIDATION_TYPE.expDate, value: ""},
        {description: INPUT_CARD_VALIDATION_TYPE.cvc, value: ""},
        {description: INPUT_CARD_VALIDATION_TYPE.name, value: ""},
    ]);
    let currentCountry = useState<number>(0);

    let [isOpenedValue, setIsOpened] = isOpened;

    const getSetSelectHandler = (desc : objType<typeof ADD_CARD_TITLE_SELECT>): useStateReturned<number> => {
        switch(desc){
            case ADD_CARD_TITLE_SELECT.country: return currentCountry;
        }
    }

    let [isChecked, setIsChecked] = useState<boolean>(false);
    const isDisabled = () => {
        const validationResults = inputs.map(({description, value}) => 
            (getInputValidation(description) as OneDataInputValidation)(value)
        );
        return validationResults.some(r => r !== "");
    }

    const currentUser = useTypedSelector(state => state.user);
    const users = JSON.parse((localStorage.getItem("users") as string)) as User[]
    return(
        <div className={[parentCl + "__add-card", "add-card", "modal", isOpenedValue ? "_show" : ""].filter(Boolean).join(" ")}>
            <div className="add-card__close-parent modal__close-parent">
                <button className="add-card__close modal__close" type="button" onClick={() => {
                    setIsOpened(false); document.body.classList.remove("_locked");
                }} />
            </div>
            <h2 className="add-card__heading modal__heading">Add a new Card</h2>
            <div className="add-card__inputs">
                {about.map((item, i) => {
                    if(item.isMassive){
                        return(
                            <div className="add-card__row" key={i}>
                                {item.value.map((input, j) => {
                                    if(input.type === INPUT_TYPE.field){
                                        const {type, validationType, ...anotherInput} = input;
                                        return(
                                            <Input 
                                                key={i + "." + j}
                                                about={{
                                                    ...anotherInput, isCanHide: false,
                                                    state: getInputState<typeof INPUT_CARD_VALIDATION_TYPE>(input.validationType, inputs),
                                                    setState: getInputSetState(input.validationType, setInputs),
                                                    validation: getInputValidation(input.validationType) as OneDataInputValidation,
                                                    anotherValue: null
                                                }}
                                                parentCls={["add-card__field"]} isInMassive={true} isBigger={false} 
                                            />
                                        )
                                    }
                                    const {type, ...anotherSelect} = input;
                                    const [state, setState] = getSetSelectHandler(input.description);
                                    return (
                                        <SelectDescription 
                                            key={i} {...anotherSelect} parentCls={["add-card__input", "add-card__select"]}
                                            state={state} setState={(newValue: number) => setState(newValue)}
                                        />
                                    )
                                })}
                            </div>
                        )
                    }
                    if(item.value.type === INPUT_TYPE.field){
                        const {type, validationType, ...anotherInput} = item.value;
                        return(
                            <Input 
                                key={i}
                                about={{
                                    ...anotherInput, isCanHide: false,
                                    state: getInputState<typeof INPUT_CARD_VALIDATION_TYPE>(item.value.validationType, inputs),
                                    setState: getInputSetState(item.value.validationType, setInputs),
                                    validation: getInputValidation(item.value.validationType) as OneDataInputValidation,
                                    anotherValue: null
                                }}
                                parentCls={["add-card__field"]} isInMassive={true} isBigger={false} 
                            />
                        )
                    }
                    const {type, ...anotherSelect} = item.value;
                    const [state, setState] = getSetSelectHandler(item.value.description);
                    return (
                        <SelectDescription 
                            key={i} {...anotherSelect} parentCls={["add-card__input", "add-card__select"]}
                            state={state} setState={(newValue: number) => setState(newValue)}
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
                disabled={isDisabled()}
                onClick={() => {
                    const expDateState = getInputState(INPUT_CARD_VALIDATION_TYPE.expDate, inputs);
                    const nameState = getInputState(INPUT_CARD_VALIDATION_TYPE.expDate, inputs);
                    const newCard: Card = {
                        number: parseInt(getInputState(INPUT_CARD_VALIDATION_TYPE.cardNumber, inputs).split(" ").join("")),
                        expDate: {year: parseInt(expDateState.split("/")[1]), month: parseInt(expDateState.split("/")[0])},
                        cvc: parseInt(getInputState(INPUT_CARD_VALIDATION_TYPE.cvc, inputs)),
                        name: {firstName: nameState.split(" ")[0], lastName: nameState.split(" ")[1]}
                    }
                    localStorage.setItem("users", JSON.stringify(users.map(u => 
                        u.password === currentUser.password ? 
                            {...currentUser, cards: [...currentUser.cards, newCard]} : u
                    )));
                    dispatch(userSlice.actions.addCard(newCard));
                    setIsOpened(false); 
                    document.body.classList.remove("_locked");
                }}
            >
                Add Card
            </button>
            <div className="add-card__copyright">By confirming your subscription, you allow The Outdoor Inn Crowd Limited to charge your card for this payment and future payments in accordance with their terms. You can always cancel your subscription.</div>
        </div>
    )
}