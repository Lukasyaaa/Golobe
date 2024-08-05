import React, { FC, useRef, MouseEvent, FocusEvent } from "react";
import { useTypedSelector } from "../../../hooks/redux";
import { FlightsItem } from "./FlightsItem";
import { navbarItem, navbarCheckboxes, navbarFromToValueTypes, navbarItemType, flightsItem, navbarTitle, contentPart } from "../../../types";
import { sortFlightsTitles } from "../../../store/common/sortReducer";
import { getTime } from "../../Common/Configurate/TimeConverter";
import { ItemsHeader } from "../../Common/Configurate/ItemsHeader";
import { useDispatch } from "react-redux";
import { flightsItemsSwapShowAll } from "../../../store/flights/flightsItemsReducer";

interface minMassive{
    value : number,
    index : number
}

export const FlightsItems : FC = () =>{
    const itemsStore = useTypedSelector(store => store.flights.items);
    const navbarStore = useTypedSelector(store => store.navbar.flights);
    const sortStore = useTypedSelector(store => store.sort.flights);

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
    //Flights Type
    let itemFlightType : navbarCheckboxes | null = null;
    let choosedFlightTypes : number[] = [];
    for(let i = 0; i < navbarStore.items.length; i++){
        let navbarItem : navbarItem = navbarStore.items[i];
        switch(navbarItem.type){
            case navbarItemType.Checkbox:
                if(navbarItem.title === navbarTitle.Airlines){
                    itemAirlines = navbarItem;
                    choosedAirlines = navbarItem.value.activeItem;
                }else if(navbarItem.title === navbarTitle.Trips){
                    itemFlightType = navbarItem;
                    choosedFlightTypes = navbarItem.value.activeItem;
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
    for(const flight of itemsStore.items){

        const flightAirlines : string[] = flight.images.map(image => image.alt);
        let isCorrectAirlines : boolean = true;
        if(itemAirlines !== null){
            isCorrectAirlines = false;
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

        let isCorrectFlightType : boolean = true;
        if(itemFlightType !== null){
            isCorrectFlightType = false;
            for(const choosedFlightType of choosedFlightTypes){
                if(flight.type === itemFlightType.value.items[choosedFlightType]){
                    isCorrectFlightType = true;
                    break;
                }
            }
        }

        const isCorrectRating : boolean = ((choosedRating !== -1) ? choosedRating <= flight.review.rating : true);
        
        const isCorrectPrice : boolean = ((priceFrom !== -1) ? flight.price.main >= priceFrom && flight.price.main <= priceTo : true);

        let isCorrectTime : boolean = true;
        if(itemAirlines !== null){
            isCorrectTime = false;
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

        if(isCorrectAirlines && isCorrectFlightType && isCorrectRating && isCorrectPrice && isCorrectTime){
            correctFlights.push(flight);
            flightsCount++;
        }
    }

    //-----------Сортируем отобранные Рейсы-----------
    switch(sortStore.items[sortStore.activeItem].title){
        case sortFlightsTitles.Cheapest:
            correctFlights.sort((a, b) => a.price.main - b.price.main);
            break;
        case sortFlightsTitles.Best:
            correctFlights.sort((a, b) => b.review.rating - a.review.rating);
            break;
        case sortFlightsTitles.Quickest:
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
        case sortFlightsTitles.CountTransfers:
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
    const showAllItems = (e : MouseEvent<HTMLButtonElement>) =>{
        e.stopPropagation();
        dispatch(flightsItemsSwapShowAll());
    }

    return(
        <div className="flights-items items">
            <ItemsHeader correctItemsLength={flightsCount} store={itemsStore.header} parent={contentPart.Flights} />
            <div className="flights-items__list items__list">
                {((itemsStore.isShowAll) ? correctFlights : 
                correctFlights.filter((_, i) => i < itemsStore.header.countVisibleItems)).map((flight, i) => 
                    <FlightsItem key={i} about={flight} />
                )}
            </div>
            {flightsCount > itemsStore.header.countVisibleItems &&
                <button 
                    className="flights-items__more items__more" type="button" onClick={showAllItems}
                >
                    {(itemsStore.isShowAll) ? itemsStore.button.active : itemsStore.button.passive}
                </button>
            }
        </div>
    )
}