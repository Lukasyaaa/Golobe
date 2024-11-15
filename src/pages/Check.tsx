import React, { FC } from "react";
import { contentPart, flightDirection, flightSchedulePart, seatsTypeCategory } from "../types";
import { useTypedSelector } from "../useTypedSelector";
import { useParams } from "react-router-dom";
import { SharedHeader } from "../components/Common/SharedHeader";
import { Ticket } from "../components/Check/Ticket/Ticket";
import { TermsConditions } from "../components/Check/TermsConditions";
import { getNumberMonth } from "../helperFunctions";

export interface seatNumber{
    type : string,
    value : number
}

interface checkProps{
    contentType : contentPart
}
export const Check : FC<checkProps> = ({contentType}) => {
    const params = useParams();
    let flightsStore = useTypedSelector(state => state.flights.items.elements);
    let hotelsStore = useTypedSelector(state => state.hotels.items);

    if(contentType === contentPart.Flights){
        let randomI : number;
        let seatNumber : seatNumber[] = [];

        let usedStore : flightSchedulePart;
        let choosedDirection : flightDirection = flightDirection.None;
        if(params.direction === flightDirection.Depart){
            choosedDirection = flightDirection.Depart;
            usedStore = flightsStore[Number(params.id) - 1].schedule.depart;
            
            let seats : number[][] = [
                flightsStore[Number(params.id) - 1].schedule.depart.seatsTypes.economy.safeSeats,
                flightsStore[Number(params.id) - 1].schedule.depart.seatsTypes.first.safeSeats,
                flightsStore[Number(params.id) - 1].schedule.depart.seatsTypes.business.safeSeats
            ]
            Object.keys(seatsTypeCategory).forEach((seatsTypes, i) => {
                if(String(params.seatsType).includes(seatsTypes)){
                    randomI = Math.floor(Math.random() * seats[i].length);
                    console.log(randomI);
                    seatNumber.push({type: seatsTypes, value: seats[i][randomI]});
                }
            })
        }else{
            choosedDirection = flightDirection.Return;
            usedStore = flightsStore[Number(params.id) - 1].schedule.return;

            let seats : number[][] = [
                flightsStore[Number(params.id) - 1].schedule.return.seatsTypes.economy.safeSeats,
                flightsStore[Number(params.id) - 1].schedule.return.seatsTypes.first.safeSeats,
                flightsStore[Number(params.id) - 1].schedule.return.seatsTypes.business.safeSeats
            ]
            Object.keys(seatsTypeCategory).forEach((seatsTypes, i) => {
                if(String(params.seatsType).includes(seatsTypes)){
                    randomI = Math.floor(Math.random() * seats[i].length + 1);
                    console.log(randomI);
                    seatNumber.push({type: seatsTypes, value: seats[i][randomI]});
                }
            })
        }
        console.log(seatNumber);
        return(
            <main className="check check_flight">
                <section className={
                    "check__header " + `check_${choosedDirection}__header ` + 
                    `header_${choosedDirection}-check ` + "header-check"
                }>
                    <div className="container">
                        <SharedHeader 
                            contentType={contentPart.Flights} flightDirection={choosedDirection} schedulePart={usedStore}
                            shortReview={flightsStore[Number(params.id) - 1].shortReview} isCheck={true}
                        />
                    </div>
                </section>
                <Ticket 
                    about={usedStore} contentType={contentPart.Flights} choosedSeatsTypes={String(params.seatsType)} 
                    seatNumber={seatNumber}
                />
                <TermsConditions contentType={contentPart.Flights} />
            </main>
        )
    }
    
    let checkInDate = String(params.checkIn).split("+");
    let checkOutDate = String(params.checkOut).split("+");
    console.log(checkInDate);
    console.log(getNumberMonth(checkOutDate[1]));
    return(
        <main className="check check_hotel">
            <section className={"check__header header-check"}>
                <div className="container">
                    <SharedHeader 
                        about={hotelsStore.elements[Number(params.hotelId) - 1]} buttonImagesMore={hotelsStore.buttonShowAllImages}
                        isCheck={true} contentType={contentPart.Hotels}
                    />
                </div>
            </section>
            <Ticket 
                about={hotelsStore.elements[Number(params.hotelId) - 1]} contentType={contentPart.Hotels}
                roomId={Number(params.roomId) - 1}
                checkInDate={new Date(Number(checkInDate[0]), getNumberMonth(checkInDate[1]), Number(checkInDate[2]))}
                checkOutDate={new Date(Number(checkOutDate[0]), getNumberMonth(checkOutDate[1]), Number(checkOutDate[2]))}
            />
            <TermsConditions contentType={contentPart.Hotels} />
        </main>
    )
}