import React, { FC, useRef, useState } from "react";
import logo from "../../assets/img/logos/mintBlack.svg"
import { NavLink } from "react-router-dom";
import { Input } from "../../components/Common/Input";
import { homePath, setPasswordPath, signInPath } from "../../App";
import { fieldGroupsTypes, verifyCode } from "../../types";
import { makePseudoActive, makeUnPseudoActive } from "../../helperFunctions";

interface verifyCodeProps{
    store : verifyCode
}

export const VerifyCode : FC<verifyCodeProps> = ({store}) => {
    let [currentImage, setCurrentImage] = useState<number>(0);

    let pagination = useRef<HTMLUListElement>(null);

    let [codeValue, setCodeValue] = useState<string>("");
    const setCodeValueHandler = (newValue : string) => {
        if(newValue.length > codeValue.length){
            if(newValue.length < 9){
                if(newValue.length < 5 || newValue.length === 7){
                    if(/^\d$/.test(newValue[newValue.length - 1])){
                        setCodeValue(newValue);
                    }
                }else{
                    if(/^[a-zA-Z]$/.test(newValue[newValue.length - 1])){
                        setCodeValue(codeValue + newValue[newValue.length - 1].toUpperCase())
                    }
                }
            }
        }else{
            setCodeValue(newValue);
        }
    }

    return(
        <div className="verify-code access">
            <div className="container">
                <div className="verify-code__interaction access__interaction">
                    <NavLink className="verify-code__logo access__logo" to={homePath}>
                        <img src={logo} alt="Logotype" />
                    </NavLink>
                    <NavLink className="verify-code__to-sign-in access__return icon-arrow_bottom" to={signInPath}>
                        <span>Back to login</span>
                    </NavLink>
                    <h2 className="verify-code__heading access__heading">{store.heading}</h2>
                    <div className="verify-code__explanation access__explanation">{store.explanation}</div>
                    <Input 
                        id="access_0" parentClasses={["verify-code", "access"]}
                        about={{
                            placeholder: store.code.placeholder, 
                            label: store.code.label,
                            type: fieldGroupsTypes.Text
                        }} 
                        isError={codeValue.length !== 8}
                        input={{value: codeValue, set: setCodeValueHandler}} 
                        isNeedHideShow={true}
                    />
                    <div className="verify-code__resent access__propose">
                        <span>{store.resendText.preLink} </span>
                        <a href="#">{store.resendText.link}</a>
                    </div>
                    {(codeValue.length === 8) 
                        ? <NavLink className="verify-code__submit access__save" to={setPasswordPath}>
                            {store.verifyButton}
                        </NavLink>
                        : <div className="verify-code__submit verify-code__submit_disabled access__save access__save_disabled">
                            {store.verifyButton}
                        </div>
                    }
                </div>
                <div className={"verify-code__images access__images"}>
                    {store.images.map((image, i) => {
                        if(i === currentImage){
                            return(
                                <picture className="verify-code__image access__image visible" key={i}>
                                    <img src={image.srcs.jpeg} alt={image.alt} />
                                    <source srcSet={image.srcs.webp} type="img/webp" />
                                </picture>
                            )
                        }
                        return(
                            <picture className="verify-code__image access__image hidden" key={i}>
                                <img src={image.srcs.jpeg} alt={image.alt} />
                                <source srcSet={image.srcs.webp} type="img/webp" />
                            </picture>
                        )
                    })}
                    <ul className="verify-code__pagination access__pagination" ref={pagination}>
                        {store.images.map((_, i) => {
                            if(i === currentImage){
                                return(
                                    <li 
                                        className="verify-code__pagination-circle-parent access__pagination-circle-parent" 
                                        key={i}
                                    >
                                        <span 
                                            className="verify-code__pagination-circle access__pagination-circle _active"    
                                        >   
                                        </span>
                                    </li>
                                )
                            }
                            return(
                                <li 
                                    className="verify-code__pagination-circle-parent access__pagination-circle-parent"
                                    key={i}
                                >
                                    <button 
                                        className="verify-code__pagination-circle access__pagination-circle"
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