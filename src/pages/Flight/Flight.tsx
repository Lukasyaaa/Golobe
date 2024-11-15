import React, { FC, Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { useTypedSelector } from "../../useTypedSelector";
import { FlightSeatsTypes } from "../../components/Flights/Page/Features/FlightSeatsTypes";
import { FlightNavigation } from "../../components/Flights/Page/Navigation/FlightNavigation";
import { flightDirection, imageVariants } from "../../types";
import { FlightHeader } from "../../components/Flights/Page/FlightHeader";


export const Flight : FC = () => {
    const params = useParams();
    let store = useTypedSelector(state => state.flights.items.elements);
    let [choosedReturnSeatsType, setChoosedReturnSeatsType] = 
        useState<imageVariants<string>[]>([...store[Number(params.id) - 1].schedule.return.seatsTypes.economy.images]);
    let [choosedDepartSeatsType, setChoosedDepartSeatsType] = 
        useState<imageVariants<string>[]>([...store[Number(params.id) - 1].schedule.depart.seatsTypes.economy.images]);

    return(
        <main className="flight">
            {(params.direction?.includes("+")) 
                ? <FlightHeader 
                    schedule={store[Number(params.id) - 1].schedule} 
                    flightDirection={flightDirection.Two} shortReview={store[Number(params.id) - 1].shortReview}
                />
                : (params.direction === flightDirection.Depart) 
                    ? <FlightHeader 
                        schedulePart={store[Number(params.id) - 1].schedule.depart} 
                        flightDirection={flightDirection.Depart} shortReview={store[Number(params.id) - 1].shortReview}
                    />
                    :  <FlightHeader 
                        schedulePart={store[Number(params.id) - 1].schedule.return} 
                        flightDirection={flightDirection.Return} shortReview={store[Number(params.id) - 1].shortReview}
                    />
            }
            <FlightSeatsTypes 
                about={store[Number(params.id) - 1]} choosedDirection={String(params.direction)} 
                choosedReturnSeatsType={{value: choosedReturnSeatsType, set: setChoosedReturnSeatsType}}
                choosedDepartSeatsType={{value: choosedDepartSeatsType, set: setChoosedDepartSeatsType}}
            />
            <FlightNavigation 
                about={store[Number(params.id) - 1]} choosedDirection={String(params.direction)} flightId={Number(params.id)}
                choosedReturnSeatsType={choosedReturnSeatsType}
                choosedDepartSeatsType={choosedDepartSeatsType}
            />
        </main>
    )
}