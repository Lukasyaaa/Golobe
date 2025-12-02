import React, { useState, type FC } from "react";
import { FILL_RULE, getInputValidation, ICON_POSITION, INPUT_AUTHORIZATION_VALIDATION_TYPE, SELECT_DESCRIPTION_TYPE, STROKE_LINECAP, STROKE_LINEJOIN } from "../../../types";
import type { OneDataInputValidation, TwoDataInputValidation, Field, UniqueEmailInputValidation, User, useStateReturned} from "../../../types";
import { Input } from "../../Common/Blocks/Interaction/Input";
import type { ChangeAnother, ChangeEmail } from "./Info";
import { useAppDispatch, useTypedSelector } from "../../../store";
import { userSlice } from "../../../store/user";
import { Select } from "../../Common/Blocks/Select/Select";
import { Text } from "../../Common/Blocks/Select/Text";

type ChangeInfoProps = (ChangeEmail | ChangeAnother) & { isOpened: useStateReturned<boolean> };

export const ChangeInfo: FC<ChangeInfoProps> = ({heading, field, isOpened, isEmail, ...props}) => {
    const dispatch = useAppDispatch();
    const currentUser = useTypedSelector(state => state.user);
    const [_, setIsOpened] = isOpened;

    let [state, setState] = useState<string>("");
    let [confirm, setConfirm] = useState<string>("");
    let isSelectOpened = useState<boolean>(false);
    let [activeLink, setActiveLink] = useState<number>(0);

    const confirmChanges = () => {
        const users = JSON.parse(localStorage.getItem("users") as string) as User[];
        if(field.validationType === INPUT_AUTHORIZATION_VALIDATION_TYPE.email){
            const isChange = (props as {isChange: boolean}).isChange;
            let newEmails: string[] = [];
            if(isChange){
                newEmails = currentUser.email.map((e, j) => j === activeLink ? state : e);
                dispatch(userSlice.actions.updateEmail({email: state, index: activeLink}));
            } else {
                newEmails = [...currentUser.email, state];
                dispatch(userSlice.actions.updateEmail({email: state}));
            }
            localStorage.setItem("users", JSON.stringify(users.map(u => 
                u.password === currentUser.password ? {...u, email: newEmails} : u
            )))
        } else if(field.validationType === INPUT_AUTHORIZATION_VALIDATION_TYPE.date){
            const [day, month, year] = state.split("-").map(Number);
            localStorage.setItem("users", JSON.stringify(users.map(u => 
                u.password === currentUser.password ? {...u, birthDay: {day, month, year}} : u
            )));
            console.log(users.map(u => 
                u.password === currentUser.password ? {...u, birthDay: {day, month, year}} : u
            ));
            dispatch(userSlice.actions.updateBirthDay({day, month, year}));
        } else {
            let objField: string = "";
            switch(field.validationType){
                case INPUT_AUTHORIZATION_VALIDATION_TYPE.address: 
                    objField = "address"; 
                    dispatch(userSlice.actions.updateAddress(state));
                    break;
                case INPUT_AUTHORIZATION_VALIDATION_TYPE.password: 
                    objField = "password"; 
                    dispatch(userSlice.actions.updatePassword(state));
                    break;
                case INPUT_AUTHORIZATION_VALIDATION_TYPE.phone: 
                    objField = "phone"; 
                    dispatch(userSlice.actions.updatePhone(state));
                    break;
                case INPUT_AUTHORIZATION_VALIDATION_TYPE.fullName:
                    objField = "fullName"; 
                    dispatch(userSlice.actions.updateName(
                        {firstName: state.split(" ")[0], lastName: state.split(" ")[1]}
                    ));
                    break;
            }
            localStorage.setItem("users", JSON.stringify(users.map(u => 
                u.password === currentUser.password ? {...u, [objField]: state} : u
            )))
        }
        setIsOpened(false);
        setState("");
        setConfirm("");
    }
    const {validationType, ...inputAbout} = field;
    const isTwoInputs: boolean = field.validationType === INPUT_AUTHORIZATION_VALIDATION_TYPE.password;
    const isAddEmail: boolean = (field.validationType === INPUT_AUTHORIZATION_VALIDATION_TYPE.uniqueEmail);
    const isChangeEmail: boolean = (field.validationType === INPUT_AUTHORIZATION_VALIDATION_TYPE.email);
    const realValidation = (isAddEmail ? 
        (value: string) => (getInputValidation(field.validationType) as UniqueEmailInputValidation)(value, currentUser.email)
        : getInputValidation(field.validationType) as OneDataInputValidation
    );
    return(
        <div className="info-account__modal modal-info-account modal">
            <div className="modal-info-account__close-parent modal__close-parent">
                <button className="modal-info-account__close modal__close" type="button" onClick={() => setIsOpened(false)}/>
            </div>
            <h2 className="modal-info-account__heading modal__heading">{heading}</h2>
            <div className="modal-info-account__inputs">
                <Input 
                    about={{
                        ...inputAbout, 
                        isCanHide: isTwoInputs,
                        state: state, setState: setState, validation: realValidation, anotherValue: null
                    }} parentCls={["modal-info-account__field"]} isInMassive={false} isBigger={false} 
                />
                {isTwoInputs && <Input 
                        about={{
                            placeholder: "Confirm password", id: "con-password", subinput: "Password", icon: null, 
                            isCanHide: true, state: confirm, setState: setConfirm, 
                            validation: getInputValidation(INPUT_AUTHORIZATION_VALIDATION_TYPE.confirmPassword) as TwoDataInputValidation,
                            anotherValue: state, isCheckDate: false
                        }} parentCls={["modal-info-account__field"]} isInMassive={false} isBigger={false} 
                    />
                }
            </div>
            <div className="modal-info-account__select select-modal-info-account select">
                {isChangeEmail && currentUser.email.length !== 1 && <Select 
                    parentCls={["select-modal-info-account"]}
                    description={{value: null, type: SELECT_DESCRIPTION_TYPE.onlyValue}}
                    links={currentUser.email}
                    isOpened={isSelectOpened}
                    activeLink={[activeLink, setActiveLink]}
                    iconValue={{
                        viewbox: {minX: 0, minY: 0, width: 15, height: 8.5}, width: 15, height: 8.5, pathes: [{
                            fill: "unset", fillRule: FILL_RULE.nonzero, stroke: "#000000", strokeLinecap: STROKE_LINECAP.round, strokeLinejoin: STROKE_LINEJOIN.round, strokeWidth: "1.5", d: "M 0.75,0.75 7.5,7.5 14.25,0.75"
                        }]
                    }}
                    iconPosition={ICON_POSITION.right}
                    ChildrenComponent={Text}
                    onMouseEnterHandler={undefined} onFocusHandler={undefined}
                    onMouseLeaveHandler={undefined} onBlurHandler={undefined}
                />}
            </div>
            <button 
                className="modal-info-account__confirm button_green" type="button" 
                onClick={confirmChanges} disabled={
                    realValidation(state) !== "" &&
                    (isTwoInputs ? (getInputValidation(INPUT_AUTHORIZATION_VALIDATION_TYPE.confirmPassword) as TwoDataInputValidation)(confirm, state) !== "" : true)
                }
            >
                Confirm Changes
            </button>
        </div>
    )
}