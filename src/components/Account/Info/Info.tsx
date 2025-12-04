import { useState, type FC } from "react";
import { dateToString, INPUT_AUTHORIZATION_VALIDATION_TYPE, type DateType, type Field, type Person, type useStateReturned } from "../../../types";
import { AccountInfoField } from "./InfoField";
import { ChangeInfo } from "./ChangeInfo";

export interface ChangeInfoField extends Field<typeof INPUT_AUTHORIZATION_VALIDATION_TYPE>{
    description: string,
    value: string
}

export interface ChangeEmail{
    heading: string,
    field: Field<typeof INPUT_AUTHORIZATION_VALIDATION_TYPE>,
    isEmail: true, isChange: boolean
}
export interface ChangeAnother{
    heading: string,
    field: Field<typeof INPUT_AUTHORIZATION_VALIDATION_TYPE>
    isEmail: false,
}

interface AccountInfoProps{
    name: Person, email: string[], password: string, phone: string,
    address: string, birthDay: DateType, isOpened: useStateReturned<boolean>
}
export const AccountInfo: FC<AccountInfoProps> = ({name, email, password, phone, address, birthDay, isOpened}) => {
    const about: ChangeInfoField[] = [
        {
            validationType: INPUT_AUTHORIZATION_VALIDATION_TYPE.fullName, 
            id: "name", placeholder: "Input Name...", icon: null, subinput: "Name",
            description: "Name", value: name.firstName + " " + name.lastName
        },
        {
            validationType: INPUT_AUTHORIZATION_VALIDATION_TYPE.email, 
            id: "email", placeholder: "Input Email...", icon: null, subinput: "Email",
            description: "Email", value: email.join(", ")
        },
        {
            validationType: INPUT_AUTHORIZATION_VALIDATION_TYPE.password, 
            id: "password", placeholder: "Input Password...", icon: null, subinput: "Password",
            description: "Password", value: "*".repeat(password.length)
        },
        {
            validationType: INPUT_AUTHORIZATION_VALIDATION_TYPE.phone, 
            id: "phone", placeholder: "Input Phone Number...", icon: null, subinput: "Phone",
            description: "Phone number", value: phone
        },
        {
            validationType: INPUT_AUTHORIZATION_VALIDATION_TYPE.address, 
            id: "address", placeholder: "Input Address...", icon: null, subinput: "Address",
            description: "Address", value: (address === "") ? "Unset" : address
        },
        {
            validationType: INPUT_AUTHORIZATION_VALIDATION_TYPE.date, 
            id: "birthday", placeholder: "Input Birthday...", icon: null, subinput: "Birthday",
            description: "Date of birth", value: (birthDay.day === -1) ? "Unset" : dateToString(birthDay)
        },
    ]
    let [_, setIsOpened] = isOpened;

    let [changeInfoAbout, setChangeInfoAbout] = useState<ChangeEmail | ChangeAnother>({
        heading: "",
        field: {subinput: "", id: "", placeholder: "", validationType: INPUT_AUTHORIZATION_VALIDATION_TYPE.fullName, icon: null},
        isEmail: false
    }); 
    const openModal = (
        field: Field<typeof INPUT_AUTHORIZATION_VALIDATION_TYPE>, isEmail: boolean, isChange: boolean,
        heading: string
    ) => {
        if(!isEmail){ setChangeInfoAbout({ heading, field, isEmail }) }
        else { setChangeInfoAbout({ heading, field, isEmail, isChange }) }
        setIsOpened(true);
    }

    return(
        <section className="account__info account__section section-account info-account">
            <div className="container">
                <h2 className="info-account__heading section-account__heading">Account</h2>
                <ul className="info-account__list section-account__container">
                    {about.map((item, j) => 
                        <AccountInfoField 
                            key={j} value={item}
                            isEmail={item.validationType === INPUT_AUTHORIZATION_VALIDATION_TYPE.email} 
                            openModal={openModal}
                        />
                    )}
                </ul>
                {isOpened && <ChangeInfo {...changeInfoAbout} isOpened={isOpened} />}
            </div>
        </section>
    )
}