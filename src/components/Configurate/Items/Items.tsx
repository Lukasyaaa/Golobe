import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import { ItemsHeader } from "./ItemsHeader";
import { airlines, hotelsIncludes, contentPart, flight, hotel, navbarItemType, navbarTitles, sortTitles, tripsType } from "../../../types";
import { useTypedSelector } from "../../../useTypedSelector";
import { FlightsItem } from "../../Flights/Items/FlightsItem";
import { HotelsItem } from "../../Hotels/Items/HotelsItem";
import { timeToInt } from "../../../helperFunctions";

interface itemsProps{
    displayedContent : contentPart
}

export const Items : FC<itemsProps> = ({displayedContent}) => {
    const userStore = useTypedSelector(state => state.user);
    console.log(userStore.favourites.flights);

    let [isShowAll, setIsShowAll] = useState<boolean>(false);
    let itemsInner = useRef<HTMLDivElement>(null);
    let itemsHidden = useRef<HTMLDivElement>(null);
    let [height, setHeight] = useState<number>(0);

    useEffect(() => {
        if(itemsInner.current){
            setHeight(itemsInner.current.offsetHeight);
        }
    }, [])

    let state = useTypedSelector(state => state);
    let itemsHeaderStore = useTypedSelector(state => state.configurate.itemsHeader);
    let navbarStore = useTypedSelector(state => state.configurate.navbar);
    let sortStore = useTypedSelector(state => state.configurate.sort);

    const toggleButton = () => {
        setIsShowAll((prev) => !prev);
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
                let departTotalPrice = flight.schedule.depart.price.baseFare + flight.schedule.depart.price.serviceFee + 
                    flight.schedule.depart.price.taxes - flight.schedule.depart.price.discount;
                let returnTotalPrice = flight.schedule.return.price.baseFare + flight.schedule.return.price.serviceFee + 
                flight.schedule.return.price.taxes - flight.schedule.return.price.discount
                if(departTotalPrice < priceFrom || departTotalPrice > priceTo ||
                    returnTotalPrice < priceFrom || returnTotalPrice > priceTo){
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
                        if(airlinesMassive[choosedAirline] === schedulePart.airline.alt){
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
                            if(airlinesMassive[choosedAirline] === schedulePart.airline.alt){
                                if(timeToInt(schedulePart.takeoffTime.units, 0) >= timeFrom && timeToInt(schedulePart.arrayTime.units, 1440) <= timeTo){
                                    isCorrectTime = true;
                                    break outherLoop;
                                }
                                break;
                            }
                        }
                    } else {
                        if(timeToInt(schedulePart.takeoffTime.units, 0) >= timeFrom && timeToInt(schedulePart.arrayTime.units, 1440) <= timeTo){
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
                correctFlights.sort((a, b) => 
                    Math.min(
                        a.schedule.depart.price.baseFare + a.schedule.depart.price.serviceFee + 
                        a.schedule.depart.price.taxes - a.schedule.depart.price.discount, 
                        a.schedule.return.price.baseFare + a.schedule.return.price.serviceFee + 
                        a.schedule.return.price.taxes - a.schedule.return.price.discount
                    ) - 
                    Math.min(
                        b.schedule.depart.price.baseFare + b.schedule.depart.price.serviceFee + 
                        b.schedule.depart.price.taxes - b.schedule.depart.price.discount, 
                        b.schedule.return.price.baseFare + b.schedule.return.price.serviceFee + 
                        b.schedule.return.price.taxes - b.schedule.return.price.discount
                    )
                );
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
                        if(airlinesMassive[choosedAirline] === flight.schedule.depart.airline.alt){
                            isDepartAirlineCoincidence = true;
                            if(isReturnAirlineCoincidence){
                                break;
                            }
                        }
                        if(airlinesMassive[choosedAirline] === flight.schedule.return.airline.alt){
                            isReturnAirlineCoincidence = true;
                            if(isDepartAirlineCoincidence){
                                break;
                            }
                        }
                    }

                    if(isDepartAirlineCoincidence && isReturnAirlineCoincidence){
                        flightsFlyTimeValue.push(Math.min(
                            timeToInt(flight.schedule.depart.arrayTime.units, 1440) - timeToInt(flight.schedule.depart.takeoffTime.units, 0),
                            timeToInt(flight.schedule.return.arrayTime.units, 1440) - timeToInt(flight.schedule.return.takeoffTime.units, 0)
                        ))
                    } else if (isDepartAirlineCoincidence){
                        flightsFlyTimeValue.push(
                            timeToInt(flight.schedule.depart.arrayTime.units, 1440) - timeToInt(flight.schedule.depart.takeoffTime.units, 0)
                        )
                    } else {
                        flightsFlyTimeValue.push(
                            timeToInt(flight.schedule.return.arrayTime.units, 1440) - timeToInt(flight.schedule.return.takeoffTime.units, 0)
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

                return(
                    <div className="configurate__content flights__content content">
                        <ItemsHeader 
                            contentType={contentPart.Flights} itemsCount={correctFlights.length} about={itemsHeaderStore} 
                            isShowedAll={isShowAll}
                        />
                        <div className="flights__items content__items" style={{
                            height: (itemsInner.current && itemsHidden.current) ?
                                itemsInner.current.offsetHeight + ((isShowAll) ? itemsHidden.current.offsetHeight : 0)
                                : ""
                        }}>          
                            <div className="flights__items-inner content__items-inner" ref={itemsInner}>
                                {correctFlights.slice(0, itemsHeaderStore.maxShow).map((flight, i) => 
                                    <FlightsItem 
                                        key={i} about={flight} buttonLink={state.flights.items.buttonLink}
                                        isFavourite={userStore.favourites.flights.includes(flight.id)}
                                        isAuthorized={userStore.firstName !== ""}
                                    />
                                )}
                            </div>
                            <div className={itemsHiddenClasses.join(" ")} ref={itemsHidden}>
                                {correctFlights.slice(itemsHeaderStore.maxShow).map((flight, i) => 
                                    <FlightsItem 
                                        key={i} about={flight} buttonLink={state.flights.items.buttonLink} 
                                        isFavourite={userStore.favourites.flights.includes(flight.id)}
                                        isAuthorized={userStore.firstName !== ""}
                                    />
                                )}
                            </div>
                        </div> 
                        <button className="flights__show-more content__show-more" onClick={toggleButton}>
                            {(isShowAll) ? 
                                state.flights.items.buttonViewMore.active : state.flights.items.buttonViewMore.passive
                            }
                        </button>
                    </div>
                );
            }
            return(
                <div className="configurate__content flights__content content">
                    <ItemsHeader 
                        contentType={contentPart.Flights} itemsCount={correctFlights.length} about={itemsHeaderStore}  
                        isShowedAll={isShowAll}
                    />
                    <div className="flights__items content__items">          
                        {correctFlights.map((flight, i) => 
                            <FlightsItem 
                                key={i} about={flight} buttonLink={state.flights.items.buttonLink}
                                isFavourite={userStore.favourites.flights.includes(flight.id)}
                                isAuthorized={userStore.firstName !== ""}
                            />
                        )}
                    </div>
                </div>
            );
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
                            if(Object.values(hotelsIncludes).includes(amenitie as hotelsIncludes)){
                                amenitiesMassive.push(amenitie);
                            }
                        })
                        choosedAmenities = navbarGroup.value.currentActive;
                    } else if(navbarGroup.title === navbarTitles.Freebies) {
                        navbarGroup.value.items.map(freebie => {
                            if(Object.values(hotelsIncludes).includes(freebie as hotelsIncludes)){
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

        let minPrice : number;
        for(const hotel of state.hotels.items.elements){
            //Проверка на Корректность Рейтинга
            if(choosedRating !== -1){
                if(hotel.reviews.elements.length !== 0){
                    let avarageRating = 0;
                    hotel.reviews.elements.forEach(review => {
                        avarageRating += review.grade;
                    })
                    avarageRating /= hotel.reviews.elements.length;
                    if(avarageRating < choosedRating){
                        continue;
                    }
                }
            }
            //Проверка на Корректность Стоимости
            if(priceFrom < priceTo){
                minPrice = 
                    hotel.rooms[0].price.baseFare + hotel.rooms[0].price.serviceFee + hotel.rooms[0].price.taxes - 
                    hotel.rooms[0].price.discount;
                hotel.rooms.slice(1).map(room => {
                    let price = room.price.baseFare + room.price.serviceFee + room.price.taxes - room.price.discount;
                    if(price < minPrice){
                        minPrice = price;
                    }
                })
                if(minPrice < priceFrom || minPrice > priceTo){
                    continue;
                }
            }
            //Проверка на Корректность Бесплатных Фишек
            if(choosedFreebies.length !== 0){
                let isAmenitieCoincidence = false;
                outherLoop : for(const amenitie of hotel.includes.elements){
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
                outherLoop : for(const amenitie of hotel.includes.elements){
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

            return(
                <div className="configurate__content hotels__content content">
                    <ItemsHeader 
                        contentType={contentPart.Hotels} itemsCount={correctHotels.length} about={itemsHeaderStore}  
                        isShowedAll={isShowAll}
                    />
                    <div className="flights__items content__items" style={{
                            height: height + ((itemsHidden.current) ? itemsHidden.current.offsetHeight : 0)
                        }}>          
                            <div className="flights__items-inner content__items-inner" ref={itemsInner}>
                                {correctHotels.slice(0, itemsHeaderStore.maxShow).map((hotel, i) => 
                                    <HotelsItem 
                                        key={i} about={hotel} buttonLink={state.flights.items.buttonLink} minPrice={minPrice} 
                                        isFavourite={userStore.favourites.hotels.includes(hotel.id)}
                                        isAuthorized={userStore.firstName !== ""}
                                    />
                                )}
                            </div>
                            <div className={itemsHiddenClasses.join(" ")} ref={itemsHidden}>
                                {correctHotels.slice(itemsHeaderStore.maxShow).map((hotel, i) => 
                                    <HotelsItem 
                                        key={i} about={hotel} buttonLink={state.flights.items.buttonLink} minPrice={minPrice}
                                        isFavourite={userStore.favourites.hotels.includes(hotel.id)}
                                        isAuthorized={userStore.firstName !== ""}
                                    />
                                )}
                            </div>
                        </div> 
                        {state.hotels.items.elements.length > itemsHeaderStore.maxShow && 
                            <button className="hotels__show-more content__show-more">
                                {(isShowAll) ? 
                                    state.hotels.items.buttonViewMore.active : state.hotels.items.buttonViewMore.passive
                                }
                            </button>
                        }
                </div>
            );
        }
        return(
            <div className="configurate__content flights__content content">
                <ItemsHeader 
                    contentType={contentPart.Flights} itemsCount={correctHotels.length} about={itemsHeaderStore} 
                    isShowedAll={isShowAll} 
                />
                <div className="flights__items content__items">          
                    {correctHotels.map((hotel, i) => 
                        <HotelsItem 
                            key={i} about={hotel} buttonLink={state.hotels.items.buttonLink} minPrice={minPrice} 
                            isFavourite={userStore.favourites.hotels.includes(hotel.id)} 
                            isAuthorized={userStore.firstName !== ""}
                        />
                    )}
                </div>
            </div>
        );
    }

    return <Fragment />
}