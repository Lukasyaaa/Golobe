import React, { useEffect, useMemo, useState, type FC } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../store";
import { fetchFlights } from "../store/flights";
import { getSeatsGroup, getAirlineSrcs, SEATS_TYPE, SITE_PARTS, transformPrice, type Flight as FlightType, type objType, type ScheduleMassive, type SchedulePart, type ScheduleParts, type ScheduleSingle, type Srcs } from "../types";
import { Sort } from "../components/Common/Catalog/Sort/Sort";
import { TextCategory } from "../components/Common/Catalog/Sort/TextCategory";
import { Seats } from "../components/Flights/Page/Seats";
import { Link } from "../components/Flights/Page/Link";
import { flightsCatalogPath } from "../App";
import { Introduction } from "../components/Common/Introduction";
import { useSchedulePart } from "../hooks/useSchedulePart";

export const Flight : FC = () => {
    const {options, id} = useParams();
    const flights = useTypedSelector(state => state.flights.catalog);
    const {container} = flights;
    const {isLoading, items, error} = container;

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchFlights());
    }, [dispatch]);

    const flight: FlightType | null = useMemo(
        () => items.length !== 0 ? items[Number(id) - 1] : null,
        [flights]
    );
    let [choosedPart, setChoosedPart] = useState<number>(0);
    let [choosedSeats, setChoosedSeats] = useState<objType<typeof SEATS_TYPE>>(SEATS_TYPE.economy);

    if(isLoading){
        return(
            <main className="flight-page">
                <div className="container">
                    <h1 className="loading message">Loading...</h1>
                </div>
            </main>
        )
    } 
    if(error !== null){
        return(
            <main className="flight-page">
                <div className="container">
                    <h1 className="error message">Some Error...</h1>
                </div>
            </main>
        )
    }

    const optionsMassive = [...String(options).split("+")];
    if(flight !== null){
        const {flightPart, flightEndPoint, flightRoute} = useSchedulePart(
            (optionsMassive.length === 1) ? "OnWay" : optionsMassive[choosedPart], flight
        )
        return(
            <main className="flight-page">
                {
                    optionsMassive.length !== 1 && <div className="container">
                        <Sort 
                            links={optionsMassive} maxShow={4} opener={"Show more Parts"}
                            activeCategory={[choosedPart, setChoosedPart]}
                            ChildrenComponent={TextCategory}
                        />
                    </div>
                }
                <Introduction 
                    contentType={SITE_PARTS.flights} endPoint={flightEndPoint} parentCls={["flight-page__introduction"]}
                    heading={flightPart.airline + " " + flightPart.plane}
                    starsCount={null} shortReview={{countReviews: flight.countReviews, rating: flight.rating}}
                    price={transformPrice(getSeatsGroup(choosedSeats, flightPart).price)}
                    images={{isMassive: false, value: flightPart.image}}
                />
                <Seats about={flightPart.seats} choosed={[choosedSeats, setChoosedSeats]} />
                <Link 
                    policiesLinks={["Pre-flight cleaning, installation of cabin HEPA filters.", "Pre-flight health screening questions."]} 
                    flightRoute={flightRoute} from={flightPart.startPoint} to={flightEndPoint}
                    departTime={flightPart.departTime} arrayTime={flightPart.arrayTime}
                    amenities={flightPart.amenities} 
                    airline={{srcs: getAirlineSrcs(flightPart.airline), alt: flightPart.airline}} 
                    plane={flightPart.plane} 
                    path={flightsCatalogPath + "/" + id + "/" + optionsMassive[choosedPart] + "/" + choosedSeats}
                />
            </main>
        )
    } else {
        return(
           <main className="flight-page">
                <div className="container">
                    <h1 className="failed-load message">Failed to load Data...</h1>
                </div>
            </main>
        )
    }
}