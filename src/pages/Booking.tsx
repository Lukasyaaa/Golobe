import React, { FC, Fragment, useState } from "react";
import { contentPart, flightDirection } from "../types";
import { BookingDetails } from "../components/Common/BookingDetails";
import { useParams } from "react-router-dom";
import { useTypedSelector } from "../useTypedSelector";
import { Payment } from "../components/Booking/Payment/Payment";
import { Cards } from "../components/Booking/Cards/Cards";
import { Authorization } from "../components/Booking/Authorization";
import { PriceDetails } from "../components/Booking/PriceDetails";
import { AddCardBlock } from "../components/Common/AddCard/AddCardBlock";

interface bookingProps{
    contentType : contentPart
}

export const Booking : FC<bookingProps> = ({contentType}) => {
    const params = useParams();
    let userStore = useTypedSelector(state => state.user);
    let flightsStore = useTypedSelector(state => state.flights.items.elements);
    let hotelsStore = useTypedSelector(state => state.hotels.items.elements);

    let [isShowModal, setIsShowModal] = useState<boolean>(false);
    const appearModal = () => {
        setIsShowModal(true);
        document.body.classList.add("_locked");
        document.body.classList.add("_modal-showed");
    }

    let [choosedCard, setChoosedCard] = useState<number>(-1);

    if(contentType === contentPart.Flights){
        if(params.direction === flightDirection.Depart){
            return(
                <main className="booking booking_flight">
                    <div className="container">
                        <div className="booking__left booking_flight__left">
                            <BookingDetails 
                                id={Number(params.id) - 1}
                                about={flightsStore[Number(params.id) - 1].schedule.depart} isFinal={true} contentType={contentPart.Flights} 
                                flightDirection={flightDirection.Depart} seatsTypes={String(params.seatsTypes).split("+")}
                                isAuthorized={userStore.firstName !== ""}
                            />
                            <Payment contentType={contentPart.Flights} />
                            {(userStore.firstName !== "")
                                ? <Cards 
                                    contentType={contentPart.Flights} choosedCard={{value: choosedCard, set: setChoosedCard}} 
                                    appearModal={appearModal} cards={userStore.cards}
                                />
                                : <Authorization contentType={contentPart.Flights} />
                            }
                        </div>
                        <PriceDetails 
                            contentType={contentPart.Flights}
                            tilte={
                                flightsStore[Number(params.id) - 1].schedule.depart.airline.alt + " " + 
                                flightsStore[Number(params.id) - 1].schedule.depart.airplane
                            } 
                            suptitle={String(params.seatsTypes).split("+").join(", ")}
                            image={flightsStore[Number(params.id) - 1].schedule.depart.image}
                            shortReview={flightsStore[Number(params.id) - 1].shortReview}
                            price={flightsStore[Number(params.id) - 1].schedule.depart.price}
                        />
                        <AddCardBlock 
                            isShow={{value: isShowModal, set: setIsShowModal}} 
                            parentClasses={["booking_" + contentType.toLowerCase(), "booking"]} isWindow={true}
                        />
                    </div>
                </main>
            )
        }
        return(
            <main className="booking booking_flight">
                <div className="container">
                    <div className="booking__left booking_flight__left">
                        <BookingDetails
                            id={Number(params.id) - 1}
                            about={flightsStore[Number(params.id) - 1].schedule.return} isFinal={true} contentType={contentPart.Flights} 
                            flightDirection={flightDirection.Return} seatsTypes={String(params.seatsTypes).split("+")}
                            isAuthorized={userStore.firstName !== ""}
                        />
                        <Payment contentType={contentPart.Flights} />
                        {(userStore.firstName !== "")
                            ? <Cards 
                                contentType={contentPart.Flights} choosedCard={{value: choosedCard, set: setChoosedCard}} 
                                appearModal={appearModal} cards={userStore.cards}
                            />
                            : <Authorization contentType={contentPart.Flights} />
                        }
                    </div>
                    <PriceDetails 
                        contentType={contentPart.Flights}
                        tilte={
                            flightsStore[Number(params.id) - 1].schedule.return.airline.alt + " " + 
                            flightsStore[Number(params.id) - 1].schedule.return.airplane
                        } 
                        suptitle={String(params.seatsTypes).split("+").join(", ")}
                        image={flightsStore[Number(params.id) - 1].schedule.return.image}
                        shortReview={flightsStore[Number(params.id) - 1].shortReview}
                        price={flightsStore[Number(params.id) - 1].schedule.return.price}
                    />
                    <AddCardBlock 
                        isShow={{value: isShowModal, set: setIsShowModal}} 
                        parentClasses={["booking_" + contentType.toLowerCase(), "booking"]} isWindow={true}
                    />
                </div>
            </main>
        )
    }
    let sumRating = 0;
    hotelsStore[Number(params.hotelId) - 1].reviews.elements.forEach(review => {
        sumRating += review.grade;
    })

    let beds : string[] = [];
    if(hotelsStore[Number(params.hotelId) - 1].rooms[Number(params.roomId)].countBeds.double !== 0){
        beds.push(hotelsStore[Number(params.hotelId) - 1].rooms[Number(params.roomId)].countBeds.double + " double bed");
    }
    if(hotelsStore[Number(params.hotelId) - 1].rooms[Number(params.roomId)].countBeds.twin !== 0){
        beds.push(hotelsStore[Number(params.hotelId) - 1].rooms[Number(params.roomId)].countBeds.twin + " twin beds");
    }
    return(
        <main className="booking booking_hotel">
            <div className="container">
                <div className="booking__left booking_hotel__left">
                    <BookingDetails 
                        about={hotelsStore[Number(params.hotelId) - 1]} isFinal={true} contentType={contentPart.Hotels} 
                        roomId={Number(params.roomId)} title={
                            hotelsStore[Number(params.hotelId) - 1].rooms[Number(params.roomId) - 1].advantages.join(" - ") + 
                            " - " + beds.join(" or ")
                        } isAuthorized={userStore.firstName !== ""}
                    />
                    <Payment contentType={contentPart.Hotels} />
                    {(userStore.firstName !== "")
                        ? <Cards 
                            contentType={contentPart.Hotels} choosedCard={{value: choosedCard, set: setChoosedCard}} 
                            appearModal={appearModal} cards={userStore.cards}
                        />
                        : <Authorization contentType={contentPart.Hotels} />
                    }
                </div>
                <PriceDetails 
                    contentType={contentPart.Hotels}
                    tilte={
                        hotelsStore[Number(params.hotelId) - 1].rooms[Number(params.roomId) - 1].advantages.join(" - ") + 
                        " - " + beds.join(" or ")
                    } 
                    suptitle={
                        hotelsStore[Number(params.hotelId) - 1].title
                    }
                    image={hotelsStore[Number(params.hotelId) - 1].images.main}
                    shortReview={
                        {
                            rating: sumRating / hotelsStore[Number(params.hotelId) - 1].reviews.elements.length,
                            countReviews: hotelsStore[Number(params.hotelId) - 1].reviews.elements.length
                        }
                    }
                    price={hotelsStore[Number(params.hotelId) - 1].rooms[Number(params.roomId) - 1].price}
                />
                <AddCardBlock 
                    isShow={{value: isShowModal, set: setIsShowModal}} 
                    parentClasses={["booking_" + contentType.toLowerCase(), "booking"]} isWindow={true}
                />
            </div>
        </main>
    )
}