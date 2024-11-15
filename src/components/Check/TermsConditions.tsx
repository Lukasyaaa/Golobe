import React, { FC, useRef, useState } from "react";
import { contentPart } from "../../types";
import { useTypedSelector } from "../../useTypedSelector";
import { toggleState } from "../../helperFunctions";

interface termsConditionsProps{
    contentType : contentPart
}

export const TermsConditions : FC<termsConditionsProps> = ({contentType}) => {
    let store = useTypedSelector(state => state.termsConditions);

    let [isActive, setIsActive] = useState<boolean>(false);
    let classes = ["terms-conditions__info", `terms-conditions_${contentType.toLowerCase()}__info`];
    if(isActive){
        classes.push("_active");
    }
    let inner = useRef<HTMLDivElement>(null);
    if(window.innerWidth <= 480){
        return(
            <section className={`check__terms-conditions check_${contentType.toLowerCase()}__terms-conditions terms-conditions terms-conditions_${contentType.toLowerCase()}`}>
                <div className="container">
                    <button 
                        className={`terms-conditions__heading terms-conditions_${contentType.toLowerCase()}__heading`} 
                        type="button" onClick={() => toggleState({value: isActive, set: setIsActive})}
                    >
                        {store.heading}
                    </button>
                    <div 
                        className={classes.join(" ")}
                        style={{height: (isActive) ? ((inner.current) ? inner.current.offsetHeight : "auto") : 0}}
                    >
                        <div 
                            className={`terms-conditions__info-inner terms-conditions_${contentType.toLowerCase()}__info-inner`}
                            ref={inner}
                        >
                            <div 
                                className={
                                    "terms-conditions__payments payments-terms-conditions terms-conditions__block " + 
                                    `block-terms-conditions terms-conditions_${contentType.toLowerCase()}__block `+ 
                                    `block-terms-conditions_${contentType.toLowerCase()}`
                                }
                            >
                                <h3 
                                    className={
                                        "payments-terms-conditions__title block-terms-conditions__title " + 
                                        `block-terms-conditions_${contentType.toLowerCase()}__title`
                                    }
                                >{store.payments.title}</h3>
                                <ul 
                                    className={
                                        "payments-terms-conditions__list block-terms-conditions__list " + 
                                        `terms-conditions_${contentType.toLowerCase()}__list`
                                    }
                                >
                                    {store.payments.list.map((linkText, i) => 
                                        <li 
                                            className={
                                                "payments-terms-conditions__link block-terms-conditions__link " + 
                                                `terms-conditions_${contentType.toLowerCase()}__link`
                                            } 
                                            key={i}
                                        >
                                            <span>{linkText}</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div 
                                className={
                                    "terms-conditions__contact contact-terms-conditions terms-conditions__block " + 
                                    `block-terms-conditions terms-conditions_${contentType.toLowerCase()}__block ` +
                                    `block-terms-conditions_${contentType.toLowerCase()}`
                                }
                            >
                                <h3 
                                    className={
                                        "contact-terms-conditions__title block-terms-conditions__title " +  
                                        `block-terms-conditions_${contentType.toLowerCase()}__title`
                                    }
                                >{store.contacts.title}</h3>
                                <div 
                                    className={
                                        "contact-terms-conditions__prelist block-terms-conditions__prelist " + 
                                        `block-terms-conditions_${contentType.toLowerCase()}__prelist`
                                    }
                                >{store.contacts.pre}</div>
                                <address 
                                    className={
                                        "contact-terms-conditions__list-parent block-terms-conditions__list-parent" + 
                                        `block-terms-conditions_${contentType.toLowerCase()}__list-parent`
                                    }
                                >
                                    <ul 
                                        className={
                                            "contact-terms-conditions__list block-terms-conditions__list " + 
                                            `block-terms-conditions_${contentType.toLowerCase()}__list`
                                        }
                                    >
                                        <li 
                                            className={
                                                "contact-terms-conditions__link block-terms-conditions__link " + 
                                                `block-terms-conditions_${contentType.toLowerCase()}__link`
                                            }
                                        >
                                            {store.contacts.info.companyName}
                                        </li>
                                        <li 
                                            className={
                                                "contact-terms-conditions__link block-terms-conditions__link " + 
                                                `block-terms-conditions_${contentType.toLowerCase()}__link`
                                            }
                                        >
                                            {store.contacts.info.building}
                                        </li>
                                        <li 
                                            className={
                                                "contact-terms-conditions__link block-terms-conditions__link " + 
                                                `block-terms-conditions_${contentType.toLowerCase()}__link`
                                            }
                                        >
                                            {"P.O. Box: " + store.contacts.info.poBox}
                                        </li>
                                        <li 
                                            className={
                                                "contact-terms-conditions__link block-terms-conditions__link " + 
                                                `block-terms-conditions_${contentType.toLowerCase()}__link`
                                            }
                                        >
                                            Doha, State of Qatar
                                        </li>
                                        <li 
                                            className={
                                                "contact-terms-conditions__link block-terms-conditions__link " + 
                                                `block-terms-conditions_${contentType.toLowerCase()}__link`
                                            }
                                        >
                                            {"Further contact details can be found at "}
                                            <a href={store.contacts.info.helpLink}>{store.contacts.info.helpLink}</a>
                                        </li>
                                    </ul>
                                </address>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
    return(
        <section className={`check__terms-conditions check_${contentType.toLowerCase()}__terms-conditions terms-conditions terms-conditions_${contentType.toLowerCase()}`}>
            <div className="container">
                <h2 className={`terms-conditions__heading terms-conditions_${contentType.toLowerCase()}__heading`}>
                    {store.heading}
                </h2>
                <div 
                    className={
                        "terms-conditions__payments payments-terms-conditions terms-conditions__block " + 
                        `block-terms-conditions terms-conditions_${contentType.toLowerCase()}__block `+ 
                        `block-terms-conditions_${contentType.toLowerCase()}`
                    }
                >
                    <h3 
                        className={
                            "payments-terms-conditions__title block-terms-conditions__title " + 
                            `block-terms-conditions_${contentType.toLowerCase()}__title`
                        }
                    >{store.payments.title}</h3>
                    <ul 
                        className={
                            "payments-terms-conditions__list block-terms-conditions__list " + 
                            `terms-conditions_${contentType.toLowerCase()}__list`
                        }
                    >
                        {store.payments.list.map((linkText, i) => 
                            <li 
                                className={
                                    "payments-terms-conditions__link block-terms-conditions__link " + 
                                    `terms-conditions_${contentType.toLowerCase()}__link`
                                } 
                                key={i}
                            >
                                <span>{linkText}</span>
                            </li>
                        )}
                    </ul>
                </div>
                <div 
                    className={
                        "terms-conditions__contact contact-terms-conditions terms-conditions__block " + 
                        `block-terms-conditions terms-conditions_${contentType.toLowerCase()}__block ` +
                        `block-terms-conditions_${contentType.toLowerCase()}`
                    }
                >
                    <h3 
                        className={
                            "contact-terms-conditions__title block-terms-conditions__title " +  
                            `block-terms-conditions_${contentType.toLowerCase()}__title`
                        }
                    >{store.contacts.title}</h3>
                    <div 
                        className={
                            "contact-terms-conditions__prelist block-terms-conditions__prelist " + 
                            `block-terms-conditions_${contentType.toLowerCase()}__prelist`
                        }
                    >{store.contacts.pre}</div>
                    <address 
                        className={
                            "contact-terms-conditions__list-parent block-terms-conditions__list-parent" + 
                            `block-terms-conditions_${contentType.toLowerCase()}__list-parent`
                        }
                    >
                        <ul 
                            className={
                                "contact-terms-conditions__list block-terms-conditions__list " + 
                                `block-terms-conditions_${contentType.toLowerCase()}__list`
                            }
                        >
                            <li 
                                className={
                                    "contact-terms-conditions__link block-terms-conditions__link " + 
                                    `block-terms-conditions_${contentType.toLowerCase()}__link`
                                }
                            >
                                {store.contacts.info.companyName}
                            </li>
                            <li 
                                className={
                                    "contact-terms-conditions__link block-terms-conditions__link " + 
                                    `block-terms-conditions_${contentType.toLowerCase()}__link`
                                }
                            >
                                {store.contacts.info.building}
                            </li>
                            <li 
                                className={
                                    "contact-terms-conditions__link block-terms-conditions__link " + 
                                    `block-terms-conditions_${contentType.toLowerCase()}__link`
                                }
                            >
                                {"P.O. Box: " + store.contacts.info.poBox}
                            </li>
                            <li 
                                className={
                                    "contact-terms-conditions__link block-terms-conditions__link " + 
                                    `block-terms-conditions_${contentType.toLowerCase()}__link`
                                }
                            >
                                Doha, State of Qatar
                            </li>
                            <li 
                                className={
                                    "contact-terms-conditions__link block-terms-conditions__link " + 
                                    `block-terms-conditions_${contentType.toLowerCase()}__link`
                                }
                            >
                                {"Further contact details can be found at "}
                                <a href={store.contacts.info.helpLink}>{store.contacts.info.helpLink}</a>
                            </li>
                        </ul>
                    </address>
                </div>
            </div>
        </section>
    )
}