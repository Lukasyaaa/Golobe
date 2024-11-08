import React, { FC, Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { useTypedSelector } from "../useTypedSelector";
import { FlightHeader } from "../components/Flights/Page/FlightHeader";
import { FlightSeatsTypes } from "../components/Flights/Page/Features/FlightSeatsTypes";
import { FlightNavigation } from "../components/Flights/Page/Navigation/FlightNavigation";
import { imageVariants } from "../types";


export const Flight : FC = () => {
    const params = useParams();
    let store = useTypedSelector(state => state.flights.items.elements);
    let [choosedReturnSeatsType, setChoosedReturnSeatsType] = 
        useState<imageVariants<string>[]>([...store[Number(params.id) - 1].schedule.return.seatsTypes.economy]);
    let [choosedDepartSeatsType, setChoosedDepartSeatsType] = 
        useState<imageVariants<string>[]>([...store[Number(params.id) - 1].schedule.depart.seatsTypes.economy]);;

    return(
        <main className="flight">
            <FlightHeader about={store[Number(params.id) - 1]} choosedFlight={String(params.choosedFlight)} />
            <FlightSeatsTypes 
                about={store[Number(params.id) - 1]} choosedFlight={String(params.choosedFlight)} 
                choosedReturnSeatsType={{value: choosedReturnSeatsType, set: setChoosedReturnSeatsType}}
                choosedDepartSeatsType={{value: choosedDepartSeatsType, set: setChoosedDepartSeatsType}}
            />
            <FlightNavigation 
                about={store[Number(params.id) - 1]} choosedFlight={String(params.choosedFlight)} flightId={Number(params.id)}
                choosedReturnSeatsType={choosedReturnSeatsType}
                choosedDepartSeatsType={choosedDepartSeatsType}
            />
        </main>
    )
}