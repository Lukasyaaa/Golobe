import React, { FC } from "react";
import { availableVariants, contentPart } from "../../types";
import { useTypedSelector } from "../../useTypedSelector";
import { NavLink } from "react-router-dom";

interface authorizationProps{
    contentType : contentPart
}

export const Authorization : FC<authorizationProps> = ({contentType}) => {
    let store = useTypedSelector(state => state.bookings.authorization);

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

    return(
        <article className={`booking__authorization authorization booking_${contentType.toLowerCase()}__authorization authorization_${contentType.toLowerCase()}`}>
            <h2 className={`authorization__title authorization_${contentType.toLowerCase()}__title`}>{store.heading}</h2>
            <input 
                className={`authorization__input authorization_${contentType.toLowerCase()}__input`} type="tel" placeholder={store.placeholder} 
            />
            <div className={`authorization__description authorization_${contentType.toLowerCase()}__description`}>{store.description}</div>
            <button className={`authorization__send authorization_${contentType.toLowerCase()}__send`} type="button">
                {store.continueButton}
            </button>
            <div className={`authorization__or authorization_${contentType.toLowerCase()}__or`}><span>Or</span></div>
            {(window.innerWidth > 480) 
                ? <div className={`authorization__variants authorization_${contentType.toLowerCase()}__variants`}>
                    {store.availableVariants.map((variant, i) => {
                        if(variant.isImage){
                            return(
                                <NavLink
                                    key={i} 
                                    className={
                                        `authorization__variant authorization_${contentType.toLowerCase()}__variant${(variant.isBigger) ? " bigger" : ""}`
                                    } 
                                    to={"#"}
                                >
                                    <img src={variant.type.src} alt={variant.type.alt} />
                                    <span>{variant.subType}</span>
                                </NavLink>
                            )
                        }
                        return(
                            <NavLink 
                                key={i} 
                                className={
                                    `authorization__variant authorization_${contentType.toLowerCase()}__variant ${getIcon(variant.type)}${(variant.isBigger) ? " bigger" : ""}`
                                } 
                                to={"#"}
                            >
                                <span>{variant.subType}</span>
                            </NavLink>
                        )
                    })}
                </div>
                : <div className={`authorization__variants authorization_${contentType.toLowerCase()}__variants`}>
                    {store.availableVariants.map((variant, i, variants) => {
                        if(variant.isImage){
                            return(
                                <NavLink
                                    key={i} 
                                    className={
                                        `authorization__variant authorization_${contentType.toLowerCase()}__variant${(variant.isBigger || (i+1 < variants.length && i % 2 === 0 && variants[i+1].isBigger)) ? " bigger" : ""}`
                                    } 
                                    to={"#"}
                                >
                                    <img src={variant.type.src} alt={variant.type.alt} />
                                    <span>{variant.subType}</span>
                                </NavLink>
                            )
                        }
                        return(
                            <NavLink 
                                key={i} 
                                className={
                                    `authorization__variant authorization_${contentType.toLowerCase()}__variant ${getIcon(variant.type)}${(variant.isBigger || (i+1 < variants.length && i % 2 === 0 && variants[i+1].isBigger)) ? " bigger" : ""}`
                                } 
                                to={"#"}
                            >
                                <span>{variant.subType}</span>
                            </NavLink>
                        )
                    })}
                </div>
            }
        </article>
    )
}