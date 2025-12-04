import { useState, type FC } from "react";
import { addZero, type Card, type useStateReturned } from "../../../types";

interface CardsProps{
    isOpened: useStateReturned<boolean>,
    about: Card[]
}

export const Cards : FC<CardsProps> = ({isOpened, about}) => {

    let [_, setIsOpened] = isOpened;
    const openModal = () => {
        setIsOpened(true);
        document.body.classList.add("_locked");
    }

    let [choosed, setChoosed] = useState<number>(0);
    let [hovered, setHovered] = useState<number>(-1);

    return(
        <article className="booking__article room__article booking__cards room__cards cards">
            <ul 
                className={[
                    "cards__container", "radios-booking", hovered !== -1 ? "_hide-active" : ""
                ].filter(Boolean).join(" ")}
            >
                {about.map(({number, expDate}, i) => {
                    let makePseudoActive: undefined | (() => void) = undefined;
                    let unMakePseudoActive: undefined | (() => void) = undefined;
                    if(i !== choosed){
                        makePseudoActive = () => setHovered(i);
                        unMakePseudoActive = () => setHovered(-1);
                    }
                    return(
                        <li 
                            className={[
                                "cards__item", "item-cards", "radios-booking__item", "item-radios-booking",
                                i === choosed ? "_choosed" : "", i === hovered ? "_hovered" : ""
                            ].filter(Boolean).join(" ")} 
                            key={i}
                        >
                            <svg className="item-cards__icon" viewBox="0 0 32 20" width="32" height="20" fill="none">
                                <path
                                    d="M 1.28,0 C 0.573216,0 0,0.57305 0,1.28 v 17.53605 c 0,0.7069 0.573504,1.2799 1.28,1.2799 h 29.44 c 0.7068,0 1.28,-0.573 1.28,-1.2799 V 1.28 C 32,0.57309 31.4265,0 30.72,0 Z m 17.832,5.98895 c 0.7788,0 1.403,0.1721 1.801,0.332 l -0.272,1.711 -0.18,-0.091 c -0.3708,-0.1599 -0.847,-0.3139 -1.504,-0.303 -0.7864,0 -1.15,0.3508 -1.15,0.6791 -0.0046,0.3698 0.4248,0.6137 1.127,0.9789 1.1589,0.5636 1.6946,1.2468 1.687,2.145 -0.0156,1.639 -1.3863,2.6981 -3.498,2.6981 -0.9009,-0.01 -1.7688,-0.2007 -2.238,-0.4211 l 0.282,-1.768 0.259,0.126 c 0.6598,0.2948 1.087,0.4141 1.891,0.4141 0.5774,0 1.1971,-0.2418 1.202,-0.771 0.0038,-0.3456 -0.259,-0.592 -1.041,-0.979 -0.762,-0.3778 -1.7722,-1.0105 -1.761,-2.145 0.0119,-1.5348 1.41,-2.6061 3.395,-2.6061 z m -16.28202,0.251 h 3.24301 c 0.43671,0.0166 0.78928,0.1572 0.91101,0.6311 l 0.69901,3.608 c 9e-5,3e-4 -1.3e-4,0.0016 0,0.0019 l 0.20998,1.0811 1.96899,-5.3221 H 11.992 l -3.16602,7.7901 -2.128,0.0019 -1.69398,-6.286 c 1.00794,0.534 1.86605,1.1518 2.36301,2.002 C 7.23888,9.47895 7.07005,9.17525 6.85402,8.87595 6.60243,8.52745 6.0591,8.07745 5.832,7.88595 5.04064,7.21885 3.96592,6.68005 2.80499,6.39505 Z m 10.00902,0.009 h 2.083 l -1.303,7.7781 h -2.083 z m 11.765,0 h 1.578 l 1.652,7.7781 H 25.94 c 0,0 -0.1879,-0.8936 -0.249,-1.1661 -0.2977,0 -2.3797,-0.0029 -2.614,-0.0029 -0.0793,0.2105 -0.43,1.1689 -0.43,1.1689 h -2.143 l 3.031,-7.1319 c 0.2146,-0.5069 0.5804,-0.6461 1.069,-0.6461 z m 0.155,2.092 c -0.1025,0.2894 -0.281,0.7566 -0.269,0.736 0,0 -0.6412,1.7101 -0.809,2.1541 l 1.685,-0.0011 c -0.1565,-0.7416 -0.3132,-1.4833 -0.47,-2.2249 l -0.137,-0.664 z"
                                    fill="#000000" fillRule="nonzero" 
                                />
                            </svg>
                            <div className="item-cards__number">{"**** " + Number(number) % 10000}</div>
                            <div className="item-cards__exp-date">{addZero(expDate.month) + "/" + (expDate.year % 100)}</div>
                            <input 
                                className="item-cards__input item-radios-booking__input" type="radio" name="cards" id={"cards_" + i} 
                                checked={i === choosed} onChange={() => {setChoosed(i); unMakePseudoActive?.()}}
                                onMouseEnter={makePseudoActive} onFocus={makePseudoActive}
                                onMouseLeave={(e) => {
                                    if(e.currentTarget !== document.activeElement){
                                        unMakePseudoActive?.();
                                    }
                                }} onBlur={unMakePseudoActive}
                            />
                        </li>
                    )
                })}
            </ul>
            <button className="cards__add add-cards" type="button" onClick={openModal}>
                <svg className="add-cards__icon" width="50" height="50" fill="none">
                    <path
                        d="M 25,1 C 11.75,1 1,11.75 1,25 1,38.25 11.75,49 25,49 38.25,49 49,38.25 49,25 49,11.75 38.25,1 25,1 Z"
                        fillRule="nonzero" stroke="#8dd3bb" strokeWidth="2" 
                    />
                    <path
                        d="M 25,15 V 35 M 35,25 H 15" fillRule="nonzero"
                        stroke="#8dd3bb" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" 
                    />
                </svg>
                <div className="add-cards__description">Add a new card</div>
            </button>
        </article>
    )
}