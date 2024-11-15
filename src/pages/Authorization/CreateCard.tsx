import React, { FC, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { homePath, signUpPath } from "../../App";
import logo from "../../assets/img/logos/mintBlack.svg"
import { accessPart } from "../../types";
import { AddCardBlock } from "../../components/Common/AddCard/AddCardBlock";
import { makePseudoActive, makeUnPseudoActive } from "../../helperFunctions";

interface createCardProps{
    store : accessPart
}

export const CreateCard : FC<createCardProps> = ({store}) => {
    let [currentImage, setCurrentImage] = useState<number>(0);

    let pagination = useRef<HTMLUListElement>(null);

    return(
        <div className="create-card access access_reverse">
            <div className="container">
                <div className="create-card__images access__images access_reverse__images">
                    {store.images.map((image, i) => {
                        if(i === currentImage){
                            return(
                                <picture className="create-card__image access__image access_reverse__image visible" key={i}>
                                    <img src={image.srcs.jpeg} alt={image.alt} />
                                    <source srcSet={image.srcs.webp} type="img/webp" />
                                </picture>
                            )
                        }
                        return(
                            <picture className={"create-card__image access__image access_reverse__image hidden"} key={i}>
                                <img src={image.srcs.jpeg} alt={image.alt} />
                                <source srcSet={image.srcs.webp} type="img/webp" />
                            </picture>
                        )
                    })}
                    <ul className="create-card__pagination access__pagination access_reverse__pagination" ref={pagination}>
                        {store.images.map((_, i) => {
                            if(i === currentImage){
                                return(
                                    <li 
                                        className="create-card__pagination-circle-parent access__pagination-circle-parent access_reverse__pagination-circle-parent"
                                        key={i}
                                    >
                                        <span 
                                            className="create-card__pagination-circle access__pagination-circle access_reverse__pagination-circle _active"
                                        >   
                                        </span>
                                    </li>
                                )
                            }
                            return(
                                <li 
                                    className="create-card__pagination-circle-parent access__pagination-circle-parent access_reverse__pagination-circle-parent"
                                    key={i}
                                >
                                    <button 
                                        className="create-card__pagination-circle access__pagination-circle access_reverse__pagination-circle"
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
                <div className="create-card__interaction access__interaction access_reverse__interaction">
                    <NavLink className="create-card__logo access__logo access_reverse__logo" to={homePath}>
                        <img src={logo} alt="Logotype" />
                    </NavLink>
                    <NavLink className="create-card__to-sign-up access__return access_reverse__return icon-arrow_bottom" to={signUpPath}>
                        <span>Back</span>
                    </NavLink>
                    <AddCardBlock parentClasses={["create-card"]} isWindow={false} />
                </div>
            </div>
        </div>
    )
}