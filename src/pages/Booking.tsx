import React, { FC, Fragment, useState } from "react";
import { contentPart, flightDirection } from "../types";
import { BookingDetails } from "../components/Common/BookingDetails";
import { useParams } from "react-router-dom";
import { useTypedSelector } from "../useTypedSelector";
import { Payment } from "../components/Booking/Payment/Payment";
import { Cards } from "../components/Booking/Cards/Cards";
import { Authorization } from "../components/Booking/Authorization";
import { PriceDetails } from "../components/Booking/PriceDetails";
import { AddCardWin } from "../components/Common/AddCardModal/addCardWin";

interface bookingProps{
    contentType : contentPart
}

export const Booking : FC<bookingProps> = ({contentType}) => {
    const params = useParams();
    let flightsStore = useTypedSelector(state => state.flights.items.elements);
    let hotelsStore = useTypedSelector(state => state.hotels.items.elements);

    let [isShowModal, setIsShowModal] = useState<boolean>(false);
    const appearModal = () => {
        setIsShowModal(true);
        document.body.classList.add("_locked");
        document.body.classList.add("_modal-showed");
    }

    let [choosedCard, setChoosedCard] = useState<number>(-1);
    let isAuthorization = true;

    if(contentType === contentPart.Flights){
        if(params.choosedFlight === flightDirection.Depart){
            return(
                <main className="booking booking_flight">
                    <div className="container">
                        <div className="booking__left booking_flight__left">
                            <BookingDetails 
                                about={flightsStore[Number(params.id) - 1].schedule.depart} isFinal={true} contentType={contentPart.Flights} 
                            />
                            <Payment contentType={contentPart.Flights} />
                            {(isAuthorization)
                                ? <Cards 
                                    contentType={contentPart.Flights} choosedCard={{value: choosedCard, set: setChoosedCard}} 
                                    appearModal={appearModal}
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
                            suptitle={String(params.choosedSeatsTypes).split("+").join(", ")}
                            image={flightsStore[Number(params.id) - 1].schedule.depart.image}
                            shortReview={flightsStore[Number(params.id) - 1].shortReview}
                            price={flightsStore[Number(params.id) - 1].schedule.depart.price}
                        />
                        <AddCardWin contentType={contentPart.Flights} isShow={{value: isShowModal, set: setIsShowModal}} />
                    </div>
                </main>
            )
        }
        return(
            <main className="booking booking_flight">
                <div className="container">
                    <div className="booking__left booking_flight__left">
                        <BookingDetails 
                            about={flightsStore[Number(params.id) - 1].schedule.return} isFinal={true} contentType={contentPart.Flights} 
                        />
                        <Payment contentType={contentPart.Flights} />
                        {(isAuthorization)
                            ? <Cards 
                                contentType={contentPart.Flights} choosedCard={{value: choosedCard, set: setChoosedCard}} 
                                appearModal={appearModal}
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
                        suptitle={String(params.choosedSeatsTypes).split("+").join(", ")}
                        image={flightsStore[Number(params.id) - 1].schedule.return.image}
                        shortReview={flightsStore[Number(params.id) - 1].shortReview}
                        price={flightsStore[Number(params.id) - 1].schedule.return.price}
                    />
                    <AddCardWin contentType={contentPart.Flights} isShow={{value: isShowModal, set: setIsShowModal}} />
                </div>
            </main>
        )
    }
    return(
        <Fragment />
    )
}