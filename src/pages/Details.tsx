import React, { useEffect, useMemo, type FC } from "react";
import { Introduction } from "../components/Common/Details/Introduction";
import { useParams } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../store";
import { fetchFlights } from "../store/flights";
import { addZero, getAirport, getAirportLocation, getCity, getCountry, getDayWeek, getMonth, getPlaceTranscript, getSeatsGroup, intToDuration, SEATS_TYPE, SITE_PARTS, timeToInt, timeToString, transformPrice, type Flight, type Hotel, type Image, type objType, type ScheduleMassive, type SchedulePart, type ScheduleParts, type ScheduleSingle, type Srcs } from "../types";
import { FEATURES_DESCRIPTION, Ticket } from "../components/Common/Details/Ticket/Ticket";
import { Terms } from "../components/Common/Details/Terms";
import { fetchHotels } from "../store/hotels";
import { useSchedulePart } from "../hooks/useSchedulePart";

interface DetailsProps{
    contentType: objType<typeof SITE_PARTS>
}

export interface Feature{
    description: objType<typeof FEATURES_DESCRIPTION>,
    value: string
}

interface About{
    locationMas: string[], locationText: string, current: string, heading: string, price: number,
    startString: string, startDescription: string, startDate: string,
    endString: string, endDescription: string, endDate: string,
    serviceDescription: string,
    features: Feature[], images: Image[]
}

export const Details : FC<DetailsProps> = ({contentType}) => {
    const {id, options, seatsType, hotelId, roomId} = useParams();    
    let state; let realId: number = -1;
    if(contentType === SITE_PARTS.flights){
        state = useTypedSelector(state => state.flights.catalog);
        realId = Number(id);
    } else {
        state = useTypedSelector(state => state.hotels.catalog);
        realId = Number(hotelId); 
    }

    const dispatch = useAppDispatch();
    useEffect(() => {
        if(contentType === SITE_PARTS.flights){
            dispatch(fetchFlights());
        } else{
            dispatch(fetchHotels());
        }
    }, [dispatch]);
    const {container} = state;
    const {isLoading, error, items} = container;

    const about: Flight | Hotel | null = useMemo(
        () => items.length !== 0 ? items[Number(realId) - 1] : null,
        [state]
    );

    if(isLoading){
        return(
            <main className="details">
                <div className="container">
                    <h1 className="loading message">Loading...</h1>
                </div>
            </main>
        )
    } 
    if(error !== null){
        return(
            <main className="details">
                <div className="container">
                    <h1 className="error message">Some Error...</h1>
                </div>
            </main>
        )
    }

    if(about !== null){
        let info : About = {
            locationMas: [], locationText: "", current: "", heading: "", price: 0,
            startString: "", startDescription: "", startDate: "",
            endString: "", endDescription: "", endDate: "",
            serviceDescription: "",
            features: [], images: []
        }

        if(contentType === SITE_PARTS.flights){
            const {flightEndPlace, flightEndPoint, flightPart} = useSchedulePart(String(options), about as Flight);
            
            info = {
                locationMas: [getCountry(flightEndPoint), getCity(flightEndPoint)],
                locationText: getAirportLocation(flightEndPoint),
                current: getAirport(flightEndPoint),
                heading: flightPart.airline + " " + flightPart.plane,
                price: transformPrice(getSeatsGroup(seatsType as objType<typeof SEATS_TYPE>, flightPart).price),
                startDate: flightPart.departTime.year + "-" + addZero(flightPart.departTime.month) + addZero(flightPart.departTime.day),
                startDescription: getPlaceTranscript(flightPart.startPoint) + "(" + flightPart.startPoint + ")",
                startString: timeToString(flightPart.departTime.units),
                endDate: flightPart.arrayTime.year + "-" + addZero(flightPart.arrayTime.month) + addZero(flightPart.arrayTime.day),
                endDescription: getPlaceTranscript(flightEndPoint) + "(" + flightEndPoint + ")",
                endString: timeToString(flightPart.arrayTime.units),
                serviceDescription: String(seatsType),
                features: [
                    {description: FEATURES_DESCRIPTION.date, value: getPlaceTranscript(flightEndPoint) + "(" + flightEndPoint + ")"},
                    {description: FEATURES_DESCRIPTION.flightTime, value: intToDuration(timeToInt(flightPart.arrayTime.units, true) - timeToInt(flightPart.departTime.units, false))},
                    {description: FEATURES_DESCRIPTION.gate, value: flightPart.gate},
                    {description: FEATURES_DESCRIPTION.seat, value: String(getSeatsGroup(seatsType as objType<typeof SEATS_TYPE>, flightPart).count)}
                ],
                images: [
                    {srcs: flightPart.place, alt: getPlaceTranscript(flightPart.startPoint)},
                    {srcs: flightEndPlace, alt: getPlaceTranscript(flightEndPoint)}
                ]
            }
        } else {
            const hotel = about as Hotel;
            const room = hotel.rooms[Number(roomId) - 1];

            const checkOutDate = new Date(2025, 10, 28);
            const checkInDate = new Date(2025, 10, 25);

            const doubleBeds = room.beds.double + " double bed" + ((room.beds.double > 1) ? "s" : "");
            const twinBeds = room.beds.twin + " twin bed" + ((room.beds.twin > 1) ? "s" : "");
            const bedsString = [doubleBeds, twinBeds].filter(beds => !beds.includes("0")).join(" or ");
            info = {
                locationMas: [getCountry(hotel.location.text), getCity(hotel.location.text)],
                locationText: hotel.location.text,
                current: hotel.name,
                heading: hotel.name,
                price: transformPrice(room.price),
                startDate: checkInDate.getFullYear() + "-" + addZero(checkInDate.getMonth()) + "-" + addZero(checkInDate.getDate()),
                startDescription: "Check-In",
                startString: getDayWeek(checkInDate.getDay()) + ", " + getMonth(checkInDate.getMonth()) + " " + checkInDate.getDate(),
                endDate: checkOutDate.getFullYear() + "-" + addZero(checkOutDate.getMonth()) + "-" + addZero(checkOutDate.getDate()),
                endDescription: "Check-Out",
                endString: getDayWeek(checkOutDate.getDay()) + ", " + getMonth(checkOutDate.getMonth()) + " " + checkOutDate.getDate(),
                serviceDescription: ((room.specifics.length !== 0) ? room.specifics.join(" - ") + " - " : "") + bedsString,
                features: [
                    {description: FEATURES_DESCRIPTION.checkIn, value: checkInDate.toLocaleTimeString("en-US", { hour: "2-digit",  minute: "2-digit", hour12: true })},
                    {description: FEATURES_DESCRIPTION.checkOut, value: checkOutDate.toLocaleTimeString("en-US", { hour: "2-digit",  minute: "2-digit", hour12: true })},
                    {description: FEATURES_DESCRIPTION.room, value: "On arival"},
                ],
                images: [
                    {srcs: hotel.logo, alt: hotel.name}
                ]
            }
        }

        const {locationText, current, heading, price,  ...ticket} = info;
        const {
            startString, startDescription, startDate, endString, endDescription, endDate,
            serviceDescription, features, images, ...introduction
        } = info;
        return(
            <main className="details">
                <Introduction {...introduction} />
                <Ticket {...ticket} contentType={contentType} />
                <Terms />
            </main>
        )
    } else {
        return(
            <main className="details">
                <div className="container">
                    <h1 className="failed-load message">Failed to load Data...</h1>
                </div>
            </main>
        )
    }
}