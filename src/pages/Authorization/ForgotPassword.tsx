import React, { FC, useRef, useState } from "react";
import logo from "../../assets/img/logos/mintBlack.svg"
import { NavLink } from "react-router-dom";
import { Input } from "../../components/Common/Input";
import { homePath, signInPath, verifyCodePath } from "../../App";
import { availableVariants, fieldGroupsTypes, forgotPassword } from "../../types";
import { makePseudoActive, makeUnPseudoActive } from "../../helperFunctions";

interface verifyCodeProps{
    store : forgotPassword
}

export const ForgotPassword : FC<verifyCodeProps> = ({store}) => {
    let [currentImage, setCurrentImage] = useState<number>(0);

    let pagination = useRef<HTMLUListElement>(null);

    let [emailValue, setEmailValue] = useState<string>("");

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

    let variantsContainer = ["forgot-password__variants", "access__variants"];
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
        <div className="forgot-password access">
            <div className="container">
                <div className="forgot-password__interaction access__interaction">
                    <NavLink className="forgot-password__logo access__logo" to={homePath}>
                        <img src={logo} alt="Logotype" />
                    </NavLink>
                    <NavLink className="forgot-password__to-sign-in access__return icon-arrow_bottom" to={signInPath}>
                        <span>Back to login</span>
                    </NavLink>
                    <h2 className="forgot-password__heading access__heading">{store.heading}</h2>
                    <div className="forgot-password__explanation access__explanation">{store.explanation}</div>
                    <Input 
                        id="access_0" parentClasses={["forgot-password", "access"]} 
                        about={{
                            placeholder: store.email.placeholder, 
                            label: store.email.label,
                            type: fieldGroupsTypes.Email
                        }} 
                        isError={!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue))}
                        input={{value: emailValue, set: setEmailValue}} 
                        isNeedHideShow={false}
                    />
                    {(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue)) 
                        ? <NavLink className="forgot-password__submit access__save" to={verifyCodePath}>
                            {store.submitButton}
                        </NavLink>
                        : <div className="forgot-password__submit forgot-password__submit_disabled access__save access__save_disabled">
                            {store.submitButton}
                        </div>
                    }
                    <div className="forgot-password__or access__or"><span>{store.orText}</span></div>
                    <div className={variantsContainer.join(" ")}>
                        {(window.innerWidth < 480)
                            ? store.availableVariants.map((variant, i, variants) => {
                                let classes = ["forgot-password__variant", "access__variant"];
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
                                let classes = ["forgot-password__variant", "access__variant"];
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
                <div className={"forgot-password__images access__images"}>
                    {store.images.map((image, i) => {
                        if(i === currentImage){
                            return(
                                <picture className="forgot-password__image access__image visible" key={i}>
                                    <img src={image.srcs.jpeg} alt={image.alt} />
                                    <source srcSet={image.srcs.webp} type="img/webp" />
                                </picture>
                            )
                        }
                        return(
                            <picture className="forgot-password__image access__image hidden" key={i}>
                                <img src={image.srcs.jpeg} alt={image.alt} />
                                <source srcSet={image.srcs.webp} type="img/webp" />
                            </picture>
                        )
                    })}
                    <ul className="forgot-password__pagination access__pagination" ref={pagination}>
                        {store.images.map((_, i) => {
                            if(i === currentImage){
                                return(
                                    <li 
                                        className="forgot-password__pagination-circle-parent access__pagination-circle-parent" 
                                        key={i}
                                    >
                                        <span 
                                            className="forgot-password__pagination-circle access__pagination-circle _active" 
                                        >   
                                        </span>
                                    </li>
                                )
                            }
                            return(
                                <li 
                                    className="forgot-password__pagination-circle-parent access__pagination-circle-parent"
                                    key={i}
                                >
                                    <button 
                                        className="forgot-password__pagination-circle access__pagination-circle"
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