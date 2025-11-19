import React, { useEffect, useMemo, useState, type FC } from "react";
import { addZero, FLIGHT_AMENITIES, getAirport, getCity, getCountry, getDayWeek, getMonth, getPlaceTranscript, getSeatsGroup, getShortDayWeek, getAirlineSrcs, intToDuration, SEATS_TYPE, SITE_PARTS, timeToInt, timeToString, transformPrice, type Flight, type Hotel, type Image, type objType, type Point, type PriceDetails, type ScheduleMassive, type SchedulePart, type ScheduleParts, type ScheduleSingle, type ShortReview, type Srcs } from "../types";
import { useAppDispatch, useTypedSelector } from "../store";
import { fetchFlights, type FlightsCatalog } from "../store/flights";
import { fetchHotels } from "../store/hotels";
import { useParams } from "react-router-dom";
import { flightsCatalogPath, hotelsCatalogPath } from "../App";
import { Introduction } from "../components/Common/Booking/Introduction";
import { Total } from "../components/Common/Booking/Total";
import { AddCard } from "../components/Common/Booking/AddCard/AddCard";
import { Cards } from "../components/Common/Booking/Cards";
import { Authorization } from "../components/Common/Booking/Authorization";
import { Payment } from "../components/Common/Booking/Payment";
import { Breadcrumbs } from "../components/Common/Blocks/Breadcrumbs";
import { useSchedulePart } from "../hooks/useSchedulePart";

interface BookingProps{
    contentType: objType<typeof SITE_PARTS>
}

interface About{
    current: string, location: string,
    heading: string, price: number,
    linkLogo: Srcs, linkTitle: string, linkText: string, linkPath: string
    amenities: objType<typeof FLIGHT_AMENITIES>[] | null,
    departDate: string | null, flyDuration: string | null,
    start: Point, end: Point,
    image: Image,
    suptitle: string, title: string,
    shortReview: ShortReview, priceDetails: PriceDetails
}

export const Booking: FC<BookingProps> = ({contentType}) => {
    const {id, options, seatsType, hotelId, roomId} = useParams(); 
    let state; let realId: number = -1; let parentCl = "";
    if(contentType === SITE_PARTS.flights){
        state = useTypedSelector(state => state.flights.catalog);
        realId = Number(id); parentCl = "airline";
    } else {
        state = useTypedSelector(state => state.hotels.catalog);
        realId = Number(hotelId); parentCl = "room";
    }

    const dispatch = useAppDispatch();
    useEffect(() => {
        if(contentType === SITE_PARTS.flights){
            dispatch(fetchFlights())
        } else {
            dispatch(fetchHotels());
        }
    }, [dispatch]);
    const { container } = state;
    const { isLoading, error, items } = container;

    const about: Flight | Hotel | null = useMemo(
        () => items.length !== 0 ? items[realId - 1] : null,
        [state]
    );

    let [isOpened, setIsOpened] = useState<boolean>(false);
    const isAuthorized = true;

    if(isLoading){
        return(
            <main className={[parentCl, "booking"].join(" ")}>
                <div className="container">
                    <h1 className="loading message">Loading...</h1>
                </div>
            </main>
        )
    } 
    if(error !== null){
        return(
            <main className={[parentCl, "booking"].join(" ")}>
                <div className="container">
                    <h1 className="error message">Some Error...</h1>
                </div>
            </main>
        )
    }

    if(about !== null){
        let info : About = {
            current: "", location: "",
            image: {srcs: {webp: "", jpeg: ""}, alt: ""}, title: "", suptitle: "",
            shortReview: {countReviews: 0, rating: 0}, 
            priceDetails: {baseFare: 0, discount: 0, taxes: 0, serviceFee: 0},
            heading: "", price: 0,
            linkLogo: {jpeg: "", webp: ""}, linkTitle: "", linkText: "", linkPath: "",
            amenities: [],
            departDate: "", flyDuration: "",
            start: { timeVisible: "", timeFunctionable: "", description: "" }, 
            end: { timeVisible: "", timeFunctionable: "", description: "" }
        }
        if(contentType === SITE_PARTS.flights){
            const flight = about as Flight;
            const {flightRoute, flightEndPoint, flightPart} = useSchedulePart(String(options), flight);
            
            const {arrayTime, departTime} = flightPart;
            const endTimeFunctionable = arrayTime.year + "-" + arrayTime.month + "-" + arrayTime.day;
            const startTimeFunctionable = departTime.year + "-" + departTime.month + "-" + departTime.day;
            const departDate = new Date(departTime.year, departTime.month, departTime.day);
            info = {
                current: getAirport(flightEndPoint), location: flightEndPoint,
                image: flightPart.image, title: flightPart.airline + " " + flightPart.plane, 
                suptitle: String(options),
                shortReview: {countReviews: flight.countReviews, rating: flight.rating}, 
                priceDetails: getSeatsGroup(seatsType as objType<typeof SEATS_TYPE>, flightPart).price,
                heading: flightPart.airline + " " + flightPart.plane, 
                price: transformPrice(getSeatsGroup(seatsType as objType<typeof SEATS_TYPE>, flightPart).price),
                linkLogo: getAirlineSrcs(flightPart.airline), 
                linkTitle: flightPart.airline, linkText: flightPart.plane, 
                linkPath: flightsCatalogPath + "/" + id + "/" + options + "/" + seatsType + "/Details",
                amenities: flightPart.amenities,
                departDate: flightRoute + " " + getShortDayWeek(departDate.getDay()) + ", " + getMonth(departDate.getMonth()) + " " + departDate.getDate(), 
                flyDuration: intToDuration(timeToInt(arrayTime.units, true) - timeToInt(departTime.units, false)),
                start: {timeFunctionable: startTimeFunctionable, timeVisible: timeToString(departTime.units), description: getPlaceTranscript(flightPart.startPoint) + "(" + flightPart.startPoint + ")"}, 
                end: {timeFunctionable: endTimeFunctionable, timeVisible: timeToString(arrayTime.units), description: getPlaceTranscript(flightEndPoint) + "(" + flightEndPoint + ")"}
            }
        } else {
            const hotel = about as Hotel;
            const room = hotel.rooms[Number(roomId) - 1];

            const doubleBeds = room.beds.double + " double bed" + ((room.beds.double > 1) ? "s" : "");
            const twinBeds = room.beds.twin + " twin bed" + ((room.beds.twin > 1) ? "s" : "");
            const bedsString = [doubleBeds, twinBeds].filter(beds => !beds.includes("0")).join(" or ");

            const checkOutDate = new Date(2025, 10, 28);
            const endTimeVisible = getDayWeek(checkOutDate.getDay()) + ", " + getMonth(checkOutDate.getMonth()) + " " + checkOutDate.getDate();
            const endTimeFunctionable = checkOutDate.getFullYear() + "-" + addZero(checkOutDate.getMonth()) + "-" + addZero(checkOutDate.getDate());
            
            const checkInDate = new Date(2025, 10, 25);
            const startTimeVisble = getDayWeek(checkInDate.getDay()) + ", " + getMonth(checkInDate.getMonth()) + " " + checkInDate.getDate();
            const startTimeFunctionable = checkInDate.getFullYear() + "-" + addZero(checkInDate.getMonth()) + "-" + addZero(checkInDate.getDate());

            info = {
                current: hotel.name, location: hotel.location.text,
                image: hotel.images.main, 
                title: ((room.specifics.length !== 0) ? room.specifics.join(" - ") + " - " : "") + bedsString, 
                suptitle: hotel.name,
                shortReview: {countReviews: hotel.reviews.items.length, rating: hotel.rating}, 
                priceDetails: room.price,
                heading: ((room.specifics.length !== 0) ? room.specifics.join(" - ") + " - " : "") + bedsString, 
                price: transformPrice(room.price),
                linkLogo: hotel.logo, 
                linkTitle: hotel.name, linkText: hotel.location.text, 
                linkPath: hotelsCatalogPath + "/" + hotelId + "/Rooms/" + roomId + "/Details",
                amenities: null, departDate: null, flyDuration: null,
                start: {timeFunctionable: startTimeFunctionable, timeVisible: startTimeVisble, description: "Check-In"}, 
                end: {timeFunctionable: endTimeFunctionable, timeVisible: endTimeVisible, description: "Check-Out"}
            }
        }

        const {
            heading, price, linkLogo, linkText, linkTitle, linkPath, amenities, 
            flyDuration, departDate, start, end, location, current, ...total
        } = info;
        const {
            image, title, suptitle, shortReview, priceDetails, 
            location: copyLocation, current: copyCurrent, ...introduction
        } = info;

        return(
            <main className={[parentCl, "booking", isOpened ? "_appear-modal" : ""].join(" ")}>
                <div className="container_booking">
                    <Breadcrumbs 
                        parentCl={[parentCl, "booking"]} current={current} links={[
                            {description: getCountry(location), path: "#"}, 
                            {description: getCity(location), path: "#"}
                        ]} 
                    />
                    <div className="booking__row">
                        <div className="booking__left">
                            <Introduction {...introduction} parentCl={parentCl} contentType={contentType} />
                            <Payment />
                            {isAuthorized ? <Cards isOpened={[isOpened, setIsOpened]} /> : <Authorization /> }
                        </div>
                        <Total {...total}/>
                        <AddCard isOpened={[isOpened, setIsOpened]} />
                    </div>
                </div>
            </main>
        )
    }
    return(
        <main className={[parentCl, "booking"].join(" ")}>
            <div className="container">
                <h1 className="failed-load message">Failed to load Data...</h1>
            </div>
        </main>
    )
}