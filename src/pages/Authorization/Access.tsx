import React, { ChangeEvent, FC, Fragment, useRef, useState } from "react";
import logo from "../../assets/img/logos/mintBlack.svg"
import { NavLink } from "react-router-dom";
import { accessPart, availableVariants, fieldGroupsTitles, fieldGroupsTypes, setter } from "../../types";
import { Input } from "../../components/Common/Input";
import { createCardPath, forgotPasswordPath, homePath, signInPath, signUpPath } from "../../App";
import { makePseudoActive, makeUnPseudoActive, toggleState } from "../../helperFunctions";
import { useTypedSelector } from "../../useTypedSelector";
import { useDispatch } from "react-redux";
import { userChangeIsLogOutAction, userSetInfoAction } from "../../store/userReducer";

interface accessProps{
    store : accessPart
}

export const Access : FC<accessProps> = ({store}) => {
    let [currentImage, setCurrentImage] = useState<number>(0);

    let pagination = useRef<HTMLUListElement>(null);

    let [firstNameValue, setFirstNameValue] = useState<string>("");
    const setFirstNameHandler = (newValue : string) => {
        if(/^[a-zA-Z ]$/.test(newValue[newValue.length - 1]) || newValue.length === 0){
            if((newValue[newValue.length - 1] === ' ' && newValue.length !== 1 && newValue[newValue.length - 2] !== ' ') || 
            newValue[newValue.length - 1] !== ' '){
                setFirstNameValue(newValue);
            }
        }
    }
    let [lastNameValue, setLastNameValue] = useState<string>("");
    const setLastNameHandler = (newValue : string) => {
        if(/^[a-zA-Z ]$/.test(newValue[newValue.length - 1]) || newValue.length === 0){
            if((newValue[newValue.length - 1] === ' ' && newValue.length !== 1 && newValue[newValue.length - 2] !== ' ') || 
            newValue[newValue.length - 1] !== ' '){
                setLastNameValue(newValue);
            }
        }
    }
    
    let [emailValue, setEmailValue] = useState<string>("");
    let [phoneNumberValue, setPhoneNumberValue] = useState<string>("");
    let [passwordValue, setPasswordValue] = useState<string>("");
    let [confirmPasswordValue, setConfirmPasswordValue] = useState<string>("");
    let [isAgree, setIsAgree] = useState<boolean>(false);

    const getIcon = (variant : string) =>{
        switch(variant){
            case availableVariants.Apple:
                return "icon-apple";
            case availableVariants.Facebook:
                return "icon-facebook";
            case availableVariants.Google:
                return "icon-google";
            case availableVariants.Mail:
                return "icon-mail"
            default:
                return "error"
        }
    }

    const getState = (label : fieldGroupsTitles) : setter<string> | undefined => {
        switch(label){
            case fieldGroupsTitles.ConfirmPassword:
                return {value: confirmPasswordValue, set: setConfirmPasswordValue};
            case fieldGroupsTitles.Password:
                return {value: passwordValue, set: setPasswordValue};
            case fieldGroupsTitles.FirstName:
                return {value: firstNameValue, set: setFirstNameHandler};
            case fieldGroupsTitles.LastName:
                return {value: lastNameValue, set: setLastNameHandler};
            case fieldGroupsTitles.PhoneNumber:
                return {value: phoneNumberValue, set: setPhoneNumberValue};
            case fieldGroupsTitles.Email:
                return {value: emailValue, set: setEmailValue};
            default:
                return undefined;
        }
    }

    const getCheck = (label : fieldGroupsTitles) : boolean => {
        switch(label){
            case fieldGroupsTitles.Password:
                return passwordValue.length < 8;
            case fieldGroupsTitles.ConfirmPassword:
                return passwordValue !== confirmPasswordValue || passwordValue === "";
            case fieldGroupsTitles.Email:
                return !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue));
            case fieldGroupsTitles.PhoneNumber:
                return !(/^\+?[1-9]\d{1,14}$/.test(phoneNumberValue));
            default:
                let setter : setter<string> | undefined = getState(label);
                return (setter !== undefined && setter.value.length === 0);
        }
    }
    let isAllGood : boolean = true;

    let authorizationProcess;

    const userStore = useTypedSelector(state => state.user);
    const dispatch = useDispatch();

    let neededClasses : string[] = [];
    let neededSwapPath : string = "";
    let neededEndPath : string = ""
    if(store.isLogin){
        neededClasses.push("sign-in");
        neededSwapPath = signUpPath;
        neededEndPath = homePath;

        isAllGood = passwordValue === userStore.password && emailValue === userStore.email;
        authorizationProcess = () => {
            dispatch(userChangeIsLogOutAction(true));
        }
    }else{
        neededClasses.push("sign-up");
        neededClasses.push("access_reverse");
        neededSwapPath = signInPath;
        neededEndPath = createCardPath;

        outherLoop : for (const fieldGroup of store.fieldGroups){
            if(fieldGroup.isMassive){
                for(const input of fieldGroup.value){
                    if(getCheck(input.label)){
                        isAllGood = false;
                        break outherLoop;
                    }
                }
            } else if (getCheck(fieldGroup.value.label)){
                isAllGood = false;
                break;
            }
        }

        authorizationProcess = () => {
            dispatch(userSetInfoAction({
                password: passwordValue, email: emailValue, 
                fisrtName: firstNameValue, lastName:lastNameValue, phoneNumber: phoneNumberValue
            }));
        }
    }
    let variantsContainer = [...neededClasses.map(cl => cl + "__variants"), "access__variants"];
    if(window.innerWidth < 480){
        let variantsCount = 0;
        store.availableVariants.forEach((variant, i, variants) => {
            if(variant.isBigger || (i % 2 === 0 && i+1 < variants.length && variants[i+1].isBigger)){
                variantsCount += 2;
            }else{
                variantsCount++;
            }
        });
        if(variantsCount % 2 === 1){
            variantsContainer.push("one-in-row");
        }
    }
    return(
        <div className={neededClasses.join(" ") + " access"}>
            <div className="container">
                <div className={neededClasses.map(cl => cl + "__interaction").join(" ") + " access__interaction"}>
                    <NavLink className={neededClasses.map(cl => cl + "__logo").join(" ") + " access__logo"} to={homePath}>
                        <img src={logo} alt="Logotype" />
                    </NavLink>
                    <h2 className={neededClasses.map(cl => cl + "__heading").join(" ") + " access__heading"}>
                        {store.heading}
                    </h2>
                    <div className={neededClasses.map(cl => cl + "__explanation").join(" ") + " access__explanation"}>
                        {store.explanation}
                    </div>
                    <div className={neededClasses.map(cl => cl + "__fieldgroups").join(" ") + " access__fieldgroups"}>
                        {store.fieldGroups.map((fieldGroup, i) => {
                            if(!fieldGroup.isMassive){
                                return(
                                    <Input 
                                        key={i} id={`access_${i+1}`} parentClasses={[...neededClasses, "access"]} 
                                        about={fieldGroup.value} input={getState(fieldGroup.value.label)} 
                                        isNeedHideShow={(fieldGroup.value.type === fieldGroupsTypes.Password)}
                                        isError={getCheck(fieldGroup.value.label)}
                                    />
                                )
                            }
                            return(
                                <div 
                                    className={
                                        neededClasses.map(cl => cl + "__fieldgroup-row").join(" ") + 
                                        " access__fieldgroup-row"
                                    }
                                >
                                    {fieldGroup.value.map((input, j) => 
                                        <Input 
                                            key={j} id={`access_${i+1+j}`} parentClasses={[...neededClasses, "access"]}
                                            about={input} input={getState(input.label)} 
                                            isNeedHideShow={(input.type === fieldGroupsTypes.Password)}
                                            isError={getCheck(input.label)}
                                        />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    {(!store.isLogin) 
                        ? <div 
                            className={
                                neededClasses.map(cl => cl + "__checkbox").join(" ") + " access__checkbox" + " " +
                                neededClasses.map(cl => "checkbox-" + cl).join(" ") + " checkbox-access"
                            }
                        >
                            <input 
                                className={
                                    neededClasses.map(cl => "checkbox-" + cl + "__input").join(" ") + 
                                    " checkbox-access__input"
                                } 
                                type="checkbox" id="remember"  checked={isAgree} 
                                onChange={() => toggleState({value: isAgree, set: setIsAgree})}
                            />
                            <label 
                                className={
                                    neededClasses.map(cl => "checkbox-" + cl + "__subinput").join(" ") + 
                                    " checkbox-access__subinput"
                                } 
                                htmlFor="remember"
                            >
                                <span>{store.checkboxText}</span>
                            </label>
                        </div>
                        : <div className={neededClasses.map(cl => cl + "__row").join(" ") + " access__row"}>
                            <div 
                                className={
                                    neededClasses.map(cl => cl + "__checkbox").join(" ") + " access__checkbox" + " " + 
                                    neededClasses.map(cl => "checkbox-" + cl).join(" ") + " checkbox-access inner"
                                }
                                >
                                <input 
                                    className={
                                        neededClasses.map(cl => "checkbox-" + cl + "__input").join(" ") + 
                                        " checkbox-access__input"
                                    } 
                                    type="checkbox" id="remember" checked={isAgree} 
                                    onChange={() => toggleState({value: isAgree, set: setIsAgree})}
                                />
                                <label 
                                    className={
                                        neededClasses.map(cl => "checkbox-" + cl + "__subinput").join(" ") + 
                                        " checkbox-access__subinput"
                                    } 
                                    htmlFor="remember"
                                >
                                    <span>{store.checkboxText}</span>
                                </label>
                            </div>
                            <NavLink className="sign-in__forgot-password" to={forgotPasswordPath}>Forgot Password</NavLink>
                        </div>
                    }
                    {(isAllGood && (isAgree || store.isLogin)) 
                        ? <NavLink 
                            className={neededClasses.map(cl => cl + "__save").join(" ") + " access__save"} 
                            onClick={authorizationProcess}
                            to={neededEndPath}
                        >
                            {store.saveButton}
                        </NavLink>
                        : <div 
                            className={
                                neededClasses.map(cl => cl + "__save").join(" ") + " " +
                                neededClasses.map(cl => cl + "__save_disabled").join(" ") + " " +
                                " access__save access__save_disabled"
                            }
                        >
                            {store.saveButton}
                        </div>
                    }
                    <div className={neededClasses.map(cl => cl + "__propose").join(" ") + " access__propose"}>
                        <span>{store.propose.preLink} </span>
                        <NavLink to={neededSwapPath}>{store.propose.link}</NavLink>
                    </div>
                    <div className={neededClasses.map(cl => cl + "__or").join(" ") + " access__or"}><span>{store.orText}</span></div>
                    <div className={variantsContainer.join(" ")}>
                        {(window.innerWidth < 480)
                            ? store.availableVariants.map((variant, i, variants) => {
                                let classes = [...neededClasses.map(cl => cl + "__variant"), "access__variant"];
                                if(variant.isBigger || (i % 2 === 0 && i+1 < variants.length && variants[i+1].isBigger)){
                                    classes.push("bigger");
                                }
                                if(variant.isImage){
                                    return(
                                        <NavLink key={i} className={classes.join(" ")} to={"#"}>
                                            <img src={variant.type.src} alt={variant.type.alt} />
                                            {variant.subType !== "" && <span>{variant.subType}</span>}
                                        </NavLink>
                                    )
                                }
                                classes.push(getIcon(variant.type));
                                return(
                                    <NavLink key={i} className={classes.join(" ")} to={"#"}>
                                        {variant.subType !== "" && <span>{variant.subType}</span>}
                                    </NavLink>
                                )
                            })
                            : store.availableVariants.map((variant, i) => {
                                let classes = [...neededClasses.map(cl => cl + "__variant"), "access__variant"];
                                if(variant.isBigger){
                                    classes.push("bigger");
                                }
                                if(variant.isImage){
                                    return(
                                        <NavLink key={i} className={classes.join(" ")} to={"#"}>
                                            <img src={variant.type.src} alt={variant.type.alt} />
                                            {variant.subType !== "" && <span>{variant.subType}</span>}
                                        </NavLink>
                                    )
                                }
                                classes.push(getIcon(variant.type));
                                return(
                                    <NavLink key={i} className={classes.join(" ")} to={"#"}>
                                        {variant.subType !== "" && <span>{variant.subType}</span>}
                                    </NavLink>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={neededClasses.map(cl => cl + "__images").join(" ") + " access__images"}>
                    {store.images.map((image, i) => {
                        if(i === currentImage){
                            return(
                                <picture className={neededClasses.map(cl => cl + "__image").join(" ") + " access__image visible"} key={i}>
                                    <img src={image.srcs.jpeg} alt={image.alt} />
                                    <source srcSet={image.srcs.webp} type="img/webp" />
                                </picture>
                            )
                        }
                        return(
                            <picture className={neededClasses.map(cl => cl + "__image").join(" ") + " access__image hidden"} key={i}>
                                <img src={image.srcs.jpeg} alt={image.alt} />
                                <source srcSet={image.srcs.webp} type="img/webp" />
                            </picture>
                        )
                    })}
                    <ul 
                        className={neededClasses.map(cl => cl + "__pagination").join(" ") + " access__pagination"} 
                        ref={pagination}
                    >
                        {store.images.map((_, i) => {
                            if(i === currentImage){
                                return(
                                    <li 
                                        className={
                                            neededClasses.map(cl => cl + "__pagination-circle-parent").join(" ") + 
                                            " access__pagination-circle-parent"
                                        } 
                                        key={i}
                                    >
                                        <span 
                                            className={
                                                neededClasses.map(cl => cl + "__pagination-circle _active").join(" ") + 
                                                " access__pagination-circle"
                                            }   
                                        >   
                                        </span>
                                    </li>
                                )
                            }
                            return(
                                <li 
                                    className={
                                        neededClasses.map(cl => cl + "__pagination-circle-parent").join(" ") + 
                                        " access__pagination-circle-parent"
                                    }
                                    key={i}
                                >
                                    <button 
                                        className={
                                            neededClasses.map(cl => cl + "__pagination-circle").join(" ") + 
                                            " access__pagination-circle"
                                        }
                                        type="button" onClick={() => setCurrentImage(i)}
                                        onMouseEnter={(e) => makePseudoActive(e, pagination)} onMouseLeave={(e) => {
                                            if(document.activeElement !== e.target){
                                                makeUnPseudoActive(e, pagination)
                                            }
                                        }} onFocus={(e) => makePseudoActive(e, pagination)} 
                                        onBlur={(e) => makeUnPseudoActive(e, pagination)}
                                    >   
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}