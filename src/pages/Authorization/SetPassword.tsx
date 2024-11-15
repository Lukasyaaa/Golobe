import React, { FC, useRef, useState } from "react";
import logo from "../../assets/img/logos/mintBlack.svg"
import { NavLink } from "react-router-dom";
import { Input } from "../../components/Common/Input";
import { homePath } from "../../App";
import { fieldGroupsTypes, setPassword } from "../../types";
import { makePseudoActive, makeUnPseudoActive } from "../../helperFunctions";

interface setPasswordProps{
    store : setPassword
}

export const SetPassword : FC<setPasswordProps> = ({store}) => {
    let [currentImage, setCurrentImage] = useState<number>(0);

    let pagination = useRef<HTMLUListElement>(null);

    let [passwordValue, setPasswordValue] = useState<string>("");
    let [repeatPasswordValue, setRepeatPasswordValue] = useState<string>("");

    return(
        <div className="set-password access">
            <div className="container">
                <div className="set-password__interaction access__interaction">
                    <NavLink className="set-password__logo access__logo" to={homePath}>
                        <img src={logo} alt="Logotype" />
                    </NavLink>
                    <h2 className="set-password__heading access__heading">{store.heading}</h2>
                    <div className="set-password__explanation access__explanation">{store.explanation}</div>
                    <div className="set-password__fieldgroups access__fieldgroups">
                        <Input 
                            id="access_0" parentClasses={["set-password", "access"]}
                            about={{
                                placeholder: store.firstInput.placeholder, 
                                label: store.firstInput.label, type: fieldGroupsTypes.Password
                            }} 
                            isError={(passwordValue.length < 8)}
                            input={{value: passwordValue, set: setPasswordValue}} 
                            isNeedHideShow={true}
                        />
                        <Input 
                            id="access_1" parentClasses={["set-password", "access"]}
                            about={{
                                placeholder: store.secondInput.placeholder, 
                                label: store.secondInput.label, type: fieldGroupsTypes.Password
                            }} 
                            input={{value: repeatPasswordValue, set: setRepeatPasswordValue}} 
                            isError={(passwordValue !== repeatPasswordValue || passwordValue === "")}
                            isNeedHideShow={true}
                        />
                    </div>
                    {(passwordValue.length < 8 || passwordValue !== repeatPasswordValue) 
                        ? <div className="set-pasword__submit access__save access__save_disabled">{store.saveButton}</div>
                        : <NavLink className="set-password__submit access__save" to={homePath}>
                            {store.saveButton}
                        </NavLink>
                    }
                </div>
                <div className={"set-password__images access__images"}>
                    {store.images.map((image, i) => {
                        if(i === currentImage){
                            return(
                                <picture className="set-password__image access__image visible" key={i}>
                                    <img src={image.srcs.jpeg} alt={image.alt} />
                                    <source srcSet={image.srcs.webp} type="img/webp" />
                                </picture>
                            )
                        }
                        return(
                            <picture className="set-password__image access__image hidden" key={i}>
                                <img src={image.srcs.jpeg} alt={image.alt} />
                                <source srcSet={image.srcs.webp} type="img/webp" />
                            </picture>
                        )
                    })}
                    <ul className="set-password__pagination access__pagination" ref={pagination}>
                        {store.images.map((_, i) => {
                            if(i === currentImage){
                                return(
                                    <li 
                                        className="set-password__pagination-circle-parent access__pagination-circle-parent" 
                                        key={i}
                                    >
                                        <span 
                                            className="set-password__pagination-circle access__pagination-circle _active"
                                        >   
                                        </span>
                                    </li>
                                )
                            }
                            return(
                                <li 
                                    className="set-password__pagination-circle-parent access__pagination-circle-parent"
                                    key={i}
                                >
                                    <button 
                                        className="set-password__pagination-circle access__pagination-circle"
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