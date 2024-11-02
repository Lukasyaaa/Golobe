import React, { FC, Fragment, useRef, useState } from "react";
import { ItemsHeader } from "./ItemsHeader";
import { airlines, amenities, contentPart, flight, hotel, navbarItemType, navbarTitles, sortTitles, tripsType } from "../../../types";
import { useTypedSelector } from "../../../useTypedSelector";
import { FlightsItem } from "../../Flights/Items/FlightsItem";
import { HotelsItem } from "../../Hotels/Items/HotelsItem";
import { timeToInt } from "../../../helperFunctions";

interface itemsProps{
    displayedContent : contentPart
}

export const Items : FC<itemsProps> = ({displayedContent}) => {
    let [isShowAll, setIsShowAll] = useState<boolean>(false);
    let itemsInner = useRef<HTMLDivElement>(null);
    let itemsHidden = useRef<HTMLDivElement>(null);
    let isFirst = useRef<boolean>(true);

    let state = useTypedSelector(state => state);
    let itemsHeaderStore = useTypedSelector(state => state.configurate.itemsHeader);
    let navbarStore = useTypedSelector(state => state.configurate.navbar);
    let sortStore = useTypedSelector(state => state.configurate.sort);

    const toggleButton = () => {
        setIsShowAll((prev) => !prev);
        isFirst.current = false;
    }

    if(displayedContent === contentPart.Flights){
        let correctFlights : flight[] = [];

        let airlinesMassive : string[] = [];
        let choosedAirlines : number[] = [];

        let tripsMassive : string[] = [];
        let choosedTrips : number[] = [];

        let priceFrom : number = -1;
        let priceTo : number = -1;

        let timeFrom : number = -1;
        let timeTo : number = -1;

        let choosedRating : number = -1;
        for(const navbarGroup of navbarStore.flights.items){
            switch(navbarGroup.type){
                case navbarItemType.Radios:
                    if(navbarGroup.title === navbarTitles.Rating){
                        choosedRating = parseInt(navbarGroup.value.items[navbarGroup.value.currentActive]);
                    }
                    break;
                case navbarItemType.Checkboxes:
                    if(navbarGroup.title === navbarTitles.Airlines){
                        navbarGroup.value.items.map(airline => {
                            if(Object.values(airlines).includes(airline as airlines)){
                                airlinesMassive.push(airline);
                            }
                        })
                        choosedAirlines = navbarGroup.value.currentActive;
                    } else if(navbarGroup.title === navbarTitles.Trips) {
                        navbarGroup.value.items.map(trip => {
                            if(Object.values(tripsType).includes(trip as tripsType)){
                                tripsMassive.push(trip);
                            }
                        })
                        choosedTrips = navbarGroup.value.currentActive;
                    }
                    break;
                case navbarItemType.FromToNumbers:
                    if(navbarGroup.title === navbarTitles.Price){
                        priceFrom = navbarGroup.value.from;
                        priceTo = navbarGroup.value.to;
                    }
                    break;
                case navbarItemType.FromToTime:
                    if(navbarGroup.title === navbarTitles.DepartureTime){
                        timeFrom = timeToInt(navbarGroup.value.from, 0);
                        timeTo = timeToInt(navbarGroup.value.to, 1440);
                    }
                    break;
            }
        }

        for(const flight of state.flights.items.elements){
            //Проверка на Корректность Рейтинга
            if(choosedRating !== -1){
                if(flight.shortReview.rating < choosedRating){
                    continue;
                }
            }
            //Проверка на Корректность Стоимости
            if(priceFrom < priceTo){
                if(flight.price < priceFrom || flight.price > priceTo){
                    continue;
                }
            }
            //Проверка на Корректность Типа Путёвки
            if(choosedTrips.length !== 0){
                let isTripConincidence = false;
                for(const choosedTrip of choosedTrips){
                    if(tripsMassive[choosedTrip] === flight.type){
                        isTripConincidence = true;
                        break;
                    }
                }
                if(!isTripConincidence){
                    continue;
                }
            }
            //Проверка на Корректность Авиакомпании
            if(choosedAirlines.length !== 0){
                let isAirlineCoincidence = false;
                outherLoop : for(const schedulePart of Array.from([flight.schedule.depart, flight.schedule.return])){
                    for(const choosedAirline of choosedAirlines){
                        if(airlinesMassive[choosedAirline] === schedulePart.airline){
                            isAirlineCoincidence = true;
                            break outherLoop;
                        }
                    }
                }
                if(!isAirlineCoincidence){
                    continue;
                }
            }
            //Проверка на Корректность Времени
            if(timeFrom < timeTo){
                let isCorrectTime = false;
                outherLoop : for(const schedulePart of Array.from([flight.schedule.depart, flight.schedule.return])){
                    if(choosedAirlines.length !== 0){
                        for(const choosedAirline of choosedAirlines){
                            if(airlinesMassive[choosedAirline] === schedulePart.airline){
                                if(timeToInt(schedulePart.takeoffTime, 0) >= timeFrom && timeToInt(schedulePart.arrayTime, 1440) <= timeTo){
                                    isCorrectTime = true;
                                    break outherLoop;
                                }
                                break;
                            }
                        }
                    } else {
                        if(timeToInt(schedulePart.takeoffTime, 0) >= timeFrom && timeToInt(schedulePart.arrayTime, 1440) <= timeTo){
                            isCorrectTime = true;
                        }
                    }
                }
                if(!isCorrectTime){
                    continue;
                }
            }

            correctFlights.push(flight);
        }

        switch(sortStore.flights.items[sortStore.flights.currentActive].title){
            case sortTitles.Cheapest:
                correctFlights.sort((a, b) => a.price - b.price);
                break;
            case sortTitles.Best:
                correctFlights.sort((a, b) => b.shortReview.rating - a.shortReview.rating);
                break;
            case sortTitles.CountTransfers:
                correctFlights.sort((a, b) => 
                    Math.min(a.schedule.depart.transfersCount, a.schedule.return.transfersCount) - 
                    Math.min(b.schedule.depart.transfersCount, b.schedule.return.transfersCount)
                );
                break;
            case sortTitles.Quickest:
                let airlinesMassive : string[] = [];
                let choosedAirlines : number[] = [];
                for(const navbarGroup of navbarStore.flights.items){
                    if(navbarGroup.type === navbarItemType.Checkboxes && navbarGroup.title === navbarTitles.Airlines){
                        navbarGroup.value.items.map(airline => {
                            if(Object.values(airlines).includes(airline as airlines)){
                                airlinesMassive.push(airline);
                            }
                        })
                        choosedAirlines = navbarGroup.value.currentActive;
                    }
                }
    
                let flightsFlyTimeValue : number[] = [];
                correctFlights.map((flight) => {
                    let isDepartAirlineCoincidence = false;
                    let isReturnAirlineCoincidence = false;
                    for(const choosedAirline of choosedAirlines){
                        if(airlinesMassive[choosedAirline] === flight.schedule.depart.airline){
                            isDepartAirlineCoincidence = true;
                            if(isReturnAirlineCoincidence){
                                break;
                            }
                        }
                        if(airlinesMassive[choosedAirline] === flight.schedule.return.airline){
                            isReturnAirlineCoincidence = true;
                            if(isDepartAirlineCoincidence){
                                break;
                            }
                        }
                    }

                    if(isDepartAirlineCoincidence && isReturnAirlineCoincidence){
                        flightsFlyTimeValue.push(Math.min(
                            timeToInt(flight.schedule.depart.arrayTime, 1440) - timeToInt(flight.schedule.depart.takeoffTime, 0),
                            timeToInt(flight.schedule.return.arrayTime, 1440) - timeToInt(flight.schedule.return.takeoffTime, 0)
                        ))
                    } else if (isDepartAirlineCoincidence){
                        flightsFlyTimeValue.push(
                            timeToInt(flight.schedule.depart.arrayTime, 1440) - timeToInt(flight.schedule.depart.takeoffTime, 0)
                        )
                    } else {
                        flightsFlyTimeValue.push(
                            timeToInt(flight.schedule.return.arrayTime, 1440) - timeToInt(flight.schedule.return.takeoffTime, 0)
                        )
                    }

                    correctFlights.sort((a, b) => {
                        return flightsFlyTimeValue[correctFlights.indexOf(a)] - flightsFlyTimeValue[correctFlights.indexOf(b)]
                    })
                })
        }

        if(correctFlights.length !== 0){
            if(state.flights.items.elements.length > itemsHeaderStore.maxShow){
                let itemsHiddenClasses = ["flights__items-hidden", "content__items-hidden"]

                if(isFirst.current){
                    itemsHiddenClasses.push("_hidden");
                }

                return(
                    <div className="configurate__content flights__content content">
                        <ItemsHeader contentType={contentPart.Flights} itemsCount={correctFlights.length} about={itemsHeaderStore} />
                        <div className="flights__items content__items" style={{
                            height: (itemsInner.current && itemsHidden.current) ?
                                itemsInner.current.offsetHeight + ((isShowAll) ? itemsHidden.current.offsetHeight : 0)
                                : "auto"
                        }}>          
                            <div className="flights__items-inner content__items-inner" ref={itemsInner}>
                                {correctFlights.slice(0, itemsHeaderStore.maxShow).map((flight, i) => 
                                    <FlightsItem key={i} about={flight} buttonLink={state.flights.items.buttonLink} />
                                )}
                            </div>
                            <div className={itemsHiddenClasses.join(" ")} ref={itemsHidden}>
                                {correctFlights.slice(itemsHeaderStore.maxShow).map((flight, i) => 
                                    <FlightsItem key={i} about={flight} buttonLink={state.flights.items.buttonLink} />
                                )}
                            </div>
                        </div> 
                        <button className="flights__show-more content__show-more" onClick={toggleButton}>
                            {(state.flights.items.isShowAll) ? 
                                state.flights.items.buttonViewMore.active : state.flights.items.buttonViewMore.passive
                            }
                        </button>
                    </div>
                );
            }
        }
    } else {
        let correctHotels : hotel[] = [];
        
        let freebiesMassive : string[] = [];
        let choosedFreebies : number[] = [];

        let amenitiesMassive : string[] = [];
        let choosedAmenities : number[] = [];

        let priceFrom : number = -1;
        let priceTo : number = -1;

        let choosedRating : number = -1;
        for(const navbarGroup of navbarStore.hotels.items){
            switch(navbarGroup.type){
                case navbarItemType.Radios:
                    if(navbarGroup.title === navbarTitles.Rating){
                        choosedRating = parseInt(navbarGroup.value.items[navbarGroup.value.currentActive]);
                    }
                    break;
                case navbarItemType.Checkboxes:
                    if(navbarGroup.title === navbarTitles.Amenities){
                        navbarGroup.value.items.map(amenitie => {
                            if(Object.values(amenities).includes(amenitie as amenities)){
                                amenitiesMassive.push(amenitie);
                            }
                        })
                        choosedAmenities = navbarGroup.value.currentActive;
                    } else if(navbarGroup.title === navbarTitles.Freebies) {
                        navbarGroup.value.items.map(freebie => {
                            if(Object.values(amenities).includes(freebie as amenities)){
                                freebiesMassive.push(freebie);
                            }
                        })
                        choosedFreebies = navbarGroup.value.currentActive;
                    }
                    break;
                case navbarItemType.FromToNumbers:
                    if(navbarGroup.title === navbarTitles.Price){
                        priceFrom = navbarGroup.value.from;
                        priceTo = navbarGroup.value.to;
                    }
                    break;
            }
        }

        for(const hotel of state.hotels.items.elements){
            //Проверка на Корректность Рейтинга
            if(choosedRating !== -1){
                if(hotel.shortReview.rating < choosedRating){
                    continue;
                }
            }
            //Проверка на Корректность Стоимости
            if(priceFrom < priceTo){
                if(hotel.price < priceFrom || hotel.price > priceTo){
                    continue;
                }
            }
            //Проверка на Корректность Бесплатных Фишек
            if(choosedFreebies.length !== 0){
                let isAmenitieCoincidence = false;
                outherLoop : for(const amenitie of hotel.amenities){
                    for(const choosedFreebie of choosedFreebies){
                        if(freebiesMassive[choosedFreebie] === amenitie){
                            isAmenitieCoincidence = true;
                            break outherLoop;
                        }
                    }
                }
                if(!isAmenitieCoincidence){
                    continue;
                }
            }
            //Проверка на Корректность Фишек
            if(choosedAmenities.length !== 0){
                let isAmenitieCoincidence = false;
                outherLoop : for(const amenitie of hotel.amenities){
                    for(const choosedAmenitie of choosedAmenities){
                        if(freebiesMassive[choosedAmenitie] === amenitie){
                            isAmenitieCoincidence = true;
                            break outherLoop;
                        }
                    }
                }
                if(!isAmenitieCoincidence){
                    continue;
                }
            }

            if(sortStore.hotels.items[sortStore.hotels.currentActive].title !== hotel.type){
                continue;
            }

            correctHotels.push(hotel);
        }


        if(correctHotels.length !== 0){
            let itemsHiddenClasses = ["hotels__items-hidden", "content__items-hidden"]

            if(isFirst.current){
                itemsHiddenClasses.push("_hidden");
            }

            return(
                <div className="configurate__content hotels__content content">
                    <ItemsHeader contentType={contentPart.Hotels} itemsCount={correctHotels.length} about={itemsHeaderStore} />
                    <div className="flights__items content__items" style={{
                            height: (itemsInner.current && itemsHidden.current) ?
                                itemsInner.current.offsetHeight + ((isShowAll) ? itemsHidden.current.offsetHeight : 0)
                                : "auto"
                        }}>          
                            <div className="flights__items-inner content__items-inner" ref={itemsInner}>
                                {correctHotels.slice(0, itemsHeaderStore.maxShow).map((hotel, i) => 
                                    <HotelsItem key={i} about={hotel} buttonLink={state.flights.items.buttonLink} />
                                )}
                            </div>
                            <div className={itemsHiddenClasses.join(" ")} ref={itemsHidden}>
                                {correctHotels.slice(itemsHeaderStore.maxShow).map((hotel, i) => 
                                    <HotelsItem key={i} about={hotel} buttonLink={state.flights.items.buttonLink} />
                                )}
                            </div>
                        </div> 
                    {state.hotels.items.elements.length > itemsHeaderStore.maxShow && 
                        <button className="hotels__show-more content__show-more">
                            {(state.hotels.items.isShowAll) ? 
                                state.hotels.items.buttonViewMore.active : state.hotels.items.buttonViewMore.passive
                            }
                        </button>
                    }
                </div>
            );
        }
    }

    return <Fragment />
}