import React, { FC, useRef, MouseEvent, FocusEvent } from "react";
import { useTypedSelector } from "../../../hooks/redux";
import { FlightsItem } from "./FlightsItem";
import { navbarItem, navbarCheckboxes, navbarFromToValueTypes, navbarItemType, flightsItem, navbarTitle } from "../../../types";
import { flightsOptionsTitles } from "../../../store/flights/flightsOptionsReducer";
import { getTime } from "../TimeConverter";
import { useDispatch } from "react-redux";
import { flightsItemsSetActiveSelectLink, flightsItemsSwapActiveAction } from "../../../store/flights/flightsItemsReducer";

interface minMassive{
    value : number,
    index : number
}

export const FlightsItems : FC = () =>{
    const flightsItemsStore = useTypedSelector(store => store.flights.items);
    const navbarStore = useTypedSelector(store => store.flights.navbar);
    const flightsOptionsStore = useTypedSelector(store => store.flights.options);
    let listInner = useRef<HTMLUListElement>(null);

    //-----------Формируем Запросы для Рейсов-----------
    //Airlines
    let itemAirlines : navbarCheckboxes | null = null;
    let choosedAirlines : number[] = [];
    //Rating
    let choosedRating : number = -1;
    //Price
    let priceFrom : number = -1;
    let priceTo : number = -1;
    //Time
    let timeFrom : number = -1;
    let timeTo : number = -1;
    for(let i = 0; i < navbarStore.items.length; i++){
        let navbarItem : navbarItem = navbarStore.items[i];
        switch(navbarItem.type){
            case navbarItemType.Checkbox:
                if(navbarItem.title === navbarTitle.Airlines){
                    itemAirlines = navbarItem;
                    choosedAirlines = navbarItem.value.activeItem;
                }
                break;
            case navbarItemType.Radio:
                if(navbarItem.title === navbarTitle.Rating && navbarItem.value.activeItem !== -1){
                    choosedRating = parseInt(navbarItem.value.items[navbarItem.value.activeItem]);
                }
                break;
            case navbarItemType.FromTo:
                if(navbarItem.valueType === navbarFromToValueTypes.Number && navbarItem.title === navbarTitle.Price){
                    priceFrom = navbarItem.value.from;
                    priceTo = navbarItem.value.to;
                }else if( navbarItem.valueType === navbarFromToValueTypes.Time && navbarItem.title === navbarTitle.DepartureTime){
                    timeFrom = getTime(navbarItem.value.from.hour, navbarItem.value.from.minute, navbarItem.value.from.meridiem, 0);
                    timeTo = getTime(navbarItem.value.to.hour, navbarItem.value.to.minute, navbarItem.value.to.meridiem, 24);
                }
                break;       
        }
    }

    //-----------Формируем Массив рейсов, совпадающих с Запросами-----------
    let flightsCount : number = 0;
    let correctFlights : flightsItem[] = [];
    for(let i = 0; i < flightsItemsStore.items.length; i++){
        if(flightsCount === 4)
            break;
        const flight = flightsItemsStore.items[i];

        const flightAirlines : string[] = flight.images.map(image => image.alt);
        let isCorrectAirlines : boolean = false;
        if(itemAirlines !== null){
            for(const flightAirline of flightAirlines){
                for(const choosedAirline of choosedAirlines){
                    if(itemAirlines.value.items[choosedAirline] === flightAirline){
                        isCorrectAirlines = true;
                        break;
                    }
                }
                if(isCorrectAirlines){
                    break;
                }
            }
        }

        const isCorrectRating : boolean = (choosedRating !== -1 && choosedRating <= flight.ratingNumb);
        
        const isCorrectPrice : boolean = (priceFrom !== -1 && flight.price >= priceFrom && flight.price <= priceTo);

        let isCorrectTime : boolean = false;
        if(itemAirlines !== null){
            for(const itemSchedule of flight.schedule){
                const timeDeparture : number = 
                    getTime(itemSchedule.departureTime.hour, itemSchedule.departureTime.minute, itemSchedule.departureTime.meridiem, 0);
                const timeArrival : number = 
                    getTime(itemSchedule.departureTime.hour, itemSchedule.departureTime.minute, itemSchedule.departureTime.meridiem, 24)

                //Нас Интересует, только то время полёта, которое предоставляет Компания, что Есть в Списке Выбранных
                let isMatchingChoosedAirlines = false;
                for(let choosedAirline of choosedAirlines){
                    if(itemAirlines.value.items[choosedAirline] === itemSchedule.service){
                        isMatchingChoosedAirlines = true;
                        break;
                    }
                }

                if(timeDeparture >= timeFrom && timeArrival <= timeTo && isMatchingChoosedAirlines){
                    isCorrectTime = true;
                    break;
                }
            }
        }

        if(isCorrectAirlines && isCorrectRating && isCorrectPrice && isCorrectTime){
            correctFlights.push(flight);
            flightsCount++;
        }
    }

    //-----------Сортируем отобранные Рейсы-----------
    switch(flightsOptionsStore.items[flightsOptionsStore.activeItem - 1].title){
        case flightsOptionsTitles.Cheapest:
            correctFlights.sort((a, b) => a.price - b.price);
            break;
        case flightsOptionsTitles.Best:
            correctFlights.sort((a, b) => b.ratingNumb - a.ratingNumb);
            break;
        case flightsOptionsTitles.Quickest:
            let minFlyTime : number = 0;
            let masiveMinFlyTimes : minMassive[] = [];
            correctFlights.forEach((flight, i) =>{
                minFlyTime = 0;
                flight.schedule.forEach((itemSchedule) =>{
                    const departureTime = getTime(
                        itemSchedule.departureTime.hour, itemSchedule.departureTime.minute, itemSchedule.departureTime.meridiem, 0
                    );
                    const arrivalTime = getTime(
                        itemSchedule.arrivalTime.hour, itemSchedule.arrivalTime.minute, itemSchedule.arrivalTime.meridiem, 24
                    );

                    let isMatchingChoosedAirlines = false;
                    if(itemAirlines !== null){
                        for(let choosedAirline of choosedAirlines){
                            if(itemAirlines.value.items[choosedAirline] === itemSchedule.service){
                                isMatchingChoosedAirlines = true;
                                break;
                            }
                        }
                    }
                    if((minFlyTime > arrivalTime - departureTime || minFlyTime === 0) && isMatchingChoosedAirlines){
                        minFlyTime = arrivalTime - departureTime;
                    }
                })
                masiveMinFlyTimes.push({value: minFlyTime, index: i});
            })
            masiveMinFlyTimes.sort((a, b) => a.value - b.value);

            const tempCorrectFlighs : flightsItem[] = correctFlights.slice();
            for(let i = 0; i < masiveMinFlyTimes.length; i++){
                correctFlights[i] = tempCorrectFlighs[masiveMinFlyTimes[i].index];
            }
            break;
        case flightsOptionsTitles.CountTransfers:
            let minTransfer : number = 0;
            let massiveMinTransfers : minMassive[] = [];
            correctFlights.forEach((flight, i) => {
                minTransfer = flight.schedule[0].numberOfTransfers;
                for(const schedule of flight.schedule.slice(1)){
                    if(minTransfer > schedule.numberOfTransfers){
                        minTransfer = schedule.numberOfTransfers;
                    }
                }
                massiveMinTransfers.push({value: minTransfer, index: i});
            })
            massiveMinTransfers.sort((a, b) => a.value - b.value);

            const tempikCorrectFlighs : flightsItem[] = correctFlights.slice();
            for(let i = 0; i < massiveMinTransfers.length; i++){
                correctFlights[i] = tempikCorrectFlighs[massiveMinTransfers[i].index];
            }
            break;
        default:
            break;
    }

    const dispatch = useDispatch();
    const toggleSelect = () =>{
        dispatch(flightsItemsSwapActiveAction());
    }
    const changeHeaderSelectActive = (id : number) =>{
        dispatch(flightsItemsSetActiveSelectLink(id));
    }

    const makePseudoActive = (e : MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>) : void =>{
        if(listInner.current){
            e.currentTarget.classList.add("_hovered");
            listInner.current.classList.add("_hide-active");
        }
    }
    const makeUnPseudoActive = (e : MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>) : void =>{
        if(listInner.current){
            e.currentTarget.classList.remove("_hovered");
            listInner.current.classList.remove("_hide-active");
        }
    }

    let classes : string[] = ["flights-items__select", "select-flights-items"]
    if(flightsItemsStore.header.select.isActive){
        classes.push("_active")
    }

    return(
        <div className="flights-items">
            <div className="flights-items__header">
                {flightsItemsStore.items.length > flightsItemsStore.header.countVisibleItems &&                 
                <div className="flights-items__count">
                    {"Showing " + correctFlights.length + " of"} <mark>{flightsItemsStore.items.length + " places"}</mark>
                </div>
                }
                <div className={classes.join(" ")}>
                    <button className="select-flights-items__opener _icon-arrow-bottom" onClick={(e) =>{
                        e.stopPropagation();
                        toggleSelect();
                    }}>
                        <span>Sort by <mark>{
                            flightsItemsStore.header.select.list[flightsItemsStore.header.select.activeItem]
                        }</mark></span>
                    </button>
                    <div className="select-flights-items__list" style={{
                        height: (listInner.current && flightsItemsStore.header.select.isActive) ? listInner.current.offsetHeight : 0
                    }}>
                        <ul className="select-flights-items__list-inner" ref={listInner}>
                            {flightsItemsStore.header.select.list.map((link, i, selectLinks) => {
                                let classes : string[] = ["select-flights-items__link"]
                                if(i === flightsItemsStore.header.select.activeItem){
                                    return( 
                                        <li className="select-flights-items__link _active" key={i}>
                                            <span>{link}</span>
                                        </li>
                                    )
                                }
                                return( 
                                    <li className={classes.join(" ")} key={i}>
                                        <button 
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation(); 
                                                makeUnPseudoActive(e); 
                                                changeHeaderSelectActive(i);
                                            }}
                                            onFocus={(e) => {
                                                makePseudoActive(e);
                                                if((i === 0 || flightsItemsStore.header.select.activeItem === i - 1) && 
                                                !flightsItemsStore.header.select.isActive){
                                                    toggleSelect();
                                                }
                                            }}
                                            onBlur={(e) => {
                                                if(i === selectLinks.length - 1 || 
                                                (flightsItemsStore.header.select.activeItem === selectLinks.length - 1 && 
                                                i === flightsItemsStore.header.select.activeItem - 1)){
                                                    toggleSelect();
                                                }
                                                makeUnPseudoActive(e);
                                            }}
                                            onMouseEnter={makePseudoActive} onMouseLeave={(e) => {
                                                if(document.activeElement !== e.target){
                                                    makeUnPseudoActive(e);
                                                }
                                            }}
                                        >
                                            {link}
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flights-items__list">
                {correctFlights.map((flight, i) => <FlightsItem key={i} about={flight} />)}
            </div>
            <button className="flights-items__more" type="button">{flightsItemsStore.button}</button>
        </div>
    )
}