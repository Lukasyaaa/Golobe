import React, { useEffect, useMemo, useState, type FC } from "react";
import { addZero, FLIGHT_AMENITIES, getDayWeek, getMonth, getSeatsGroup, getShortDayWeek, getAirlineSrcs, SEATS_TYPE, SITE_PARTS, timeToInt, timeToString, transformPrice, MERIDIEM, getLocaitonByAddress, getAirportByIATA, getRoomInfo, getDuration, intToDuration, getFromToIATA} from "../types";
import type {  Flight, Hotel, Image, objType, Point, PriceDetails, ShortReview, Srcs, User, Ticket, Booking as BookingHotel, ScheduleSingle, ScheduleParts } from "../types";
import { useAppDispatch, useTypedSelector } from "../store";
import { fetchFlights } from "../store/flights";
import { fetchHotels } from "../store/hotels";
import { useParams } from "react-router-dom";
import { flightPath, hotelPath } from "../App";
import { Introduction } from "../components/Common/Booking/Introduction";
import { Total } from "../components/Common/Booking/Total";
import { AddCard } from "../components/Common/Blocks/AddCard";
import { Cards } from "../components/Common/Booking/Cards";
import { Authorization } from "../components/Common/Booking/Authorization";
import { Payment } from "../components/Common/Booking/Payment";
import { Breadcrumbs } from "../components/Common/Blocks/Breadcrumbs";
import { useSchedulePart } from "../hooks/useSchedulePart";
import { userSlice } from "../store/user";

interface BookingProps{
    contentType: objType<typeof SITE_PARTS>
}

interface About{
    current: string,
    heading: string, price: number,
    linkLogo: Srcs, linkTitle: string, linkText: string, linkPath: string, linkOnClick: () => void
    amenities: objType<typeof FLIGHT_AMENITIES>[] | null,
    departDate: string | null, flyDuration: string | null,
    start: Point, end: Point,
    image: Image,
    suptitle: string, title: string,
    shortReview: ShortReview, priceDetails: PriceDetails
}

interface Data{
    city: string,
    country: string,
    fromCity?: string,
    toAirport?: string
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
    
    const currentUser = useTypedSelector(state => state.user);

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

    let [isShowModal, setIsShowModal] = useState<boolean>(false);

    let [data, setData] = useState<Data | null>(null);
    useEffect(() => {
        if (about !== null) {
            if(contentType === SITE_PARTS.stays){
                const fetchLocation = async () => {
                    const location = await getLocaitonByAddress((about as Hotel).location.text);
                    setData(location);
                };
                fetchLocation();
            } else {
                const [fromIATA, toIATA] = getFromToIATA(String(options), about as Flight);
                const fetchAirports = async () => {
                    const from = await getAirportByIATA(fromIATA);
                    const to = await getAirportByIATA(toIATA);
                    if(from == null || to === null) setData(null);
                    else setData({country: to.country, city: to.city, toAirport: to.airportName, fromCity: from.city})
                };
    
                fetchAirports();
            }
        }
    }, [about]);

    const users = JSON.parse(localStorage.getItem("users") as string) as User[];
    const info: About = useMemo(() => {
        if(data === null || about === null){
            return({
                current: "",
                image: {srcs: {webp: "", jpeg: ""}, alt: ""}, title: "", suptitle: "",
                shortReview: {countReviews: 0, rating: 0}, 
                priceDetails: {baseFare: 0, discount: 0, taxes: 0, serviceFee: 0},
                heading: "", price: 0,
                linkLogo: {jpeg: "", webp: ""}, linkTitle: "", linkText: "", linkPath: "",
                linkOnClick: () => {},
                amenities: [],
                departDate: "", flyDuration: "",
                start: { timeVisible: "", timeFunctionable: "", description: "" }, 
                end: { timeVisible: "", timeFunctionable: "", description: "" }
            })
        }
        if(contentType === SITE_PARTS.flights){
            const flight = about as Flight;
            const {flightRoute, flightEndPoint, flightPart} = useSchedulePart(String(options), flight);
            
            const usedSeats = 
                users.flatMap(u => u.tickets)
                .filter(t => t.id === (about as Flight).id)
                .filter(t => t.seatType === seatsType)
                .map(t => t.seatNumber)
            ;
            const field = (seatsType === SEATS_TYPE.business) 
                ? "business" : (seatsType === SEATS_TYPE.economy) ? "economy" : "first"
            let seatsNumber;
            do {
                seatsNumber = Math.floor(Math.random() * flightPart.seats[field].count);
            } while (usedSeats.includes(seatsNumber));

            const {arrayTime, departTime} = flightPart;
            const endTimeFunctionable = arrayTime.year + "-" + arrayTime.month + "-" + arrayTime.day;
            const startTimeFunctionable = departTime.year + "-" + departTime.month + "-" + departTime.day;
            const departDate = new Date(departTime.year, departTime.month, departTime.day);
            return({
                current: data.toAirport as string,
                image: flightPart.image, title: flightPart.airline + " " + flightPart.plane, 
                suptitle: String(options),
                shortReview: {countReviews: flight.countReviews, rating: flight.rating}, 
                priceDetails: getSeatsGroup(seatsType as objType<typeof SEATS_TYPE>, flightPart).price,
                heading: flightPart.airline + " " + flightPart.plane, 
                price: transformPrice(getSeatsGroup(seatsType as objType<typeof SEATS_TYPE>, flightPart).price),
                linkLogo: getAirlineSrcs(flightPart.airline), 
                linkTitle: flightPart.airline, linkText: flightPart.plane, 
                linkPath: flightPath + "/" + id + "/" + options + "/" + seatsType + "/Details",
                linkOnClick: () => {
                    const newTicket: Ticket = {
                        id: flight.id, seatType: seatsType as objType<typeof SEATS_TYPE>,
                        airline: flightPart.airline, gate: flightPart.gate, seatNumber: seatsNumber,
                        departDate: flightPart.departTime, arrayDate: flightPart.arrayTime,
                        from: flightPart.startPoint, to: flightEndPoint,
                        tripType: flightRoute
                    }
                    localStorage.setItem("users", JSON.stringify(users.map(u =>
                        u.name.firstName === currentUser.name.firstName ? {...u, tickets: [...u.tickets, newTicket]} : u
                    )))
                    dispatch(userSlice.actions.addTicket(newTicket));
                },
                amenities: flightPart.amenities,
                departDate: flightRoute + " " + getShortDayWeek(departDate.getDay()) + ", " + getMonth(departDate.getMonth()) + " " + departDate.getDate(), 
                flyDuration: intToDuration(getDuration(departTime, arrayTime)),
                start: {timeFunctionable: startTimeFunctionable, timeVisible: timeToString(departTime.units), description: (data.fromCity as string) + "(" + flightPart.startPoint + ")"}, 
                end: {timeFunctionable: endTimeFunctionable, timeVisible: timeToString(arrayTime.units), description: data.city + "(" + flightEndPoint + ")"}
            })
        }
        const hotel = about as Hotel;
        const room = hotel.rooms[Number(roomId) - 1];

        const checkInDate = new Date();
        const startTimeVisble = getDayWeek(checkInDate.getDay()) + ", " + getMonth(checkInDate.getMonth()) + " " + checkInDate.getDate();
        const startTimeFunctionable = checkInDate.getFullYear() + "-" + addZero(checkInDate.getMonth()) + "-" + addZero(checkInDate.getDate());

        const checkOutDate = new Date(checkInDate.getTime() + 24*60*60*1000);
        const endTimeVisible = getDayWeek(checkOutDate.getDay()) + ", " + getMonth(checkOutDate.getMonth()) + " " + checkOutDate.getDate();
        const endTimeFunctionable = checkOutDate.getFullYear() + "-" + addZero(checkOutDate.getMonth()) + "-" + addZero(checkOutDate.getDate());
        return({
            current: hotel.name,
            image: hotel.images.main, 
            title: getRoomInfo(room.beds, room.specifics), 
            suptitle: hotel.name,
            shortReview: {countReviews: hotel.reviews.items.length, rating: hotel.rating}, 
            priceDetails: room.price,
            heading: getRoomInfo(room.beds, room.specifics), 
            price: transformPrice(room.price),
            linkLogo: hotel.logo, 
            linkTitle: hotel.name, linkText: hotel.location.text, 
            linkPath: hotelPath + "/" + hotelId + "/Rooms/" + roomId + "/Details",
            linkOnClick: () => {
                const newBooking: BookingHotel = {
                    id: hotel.id,
                    hotelLogo: {srcs: hotel.logo, alt: hotel.name}, 
                    checkInDate: {
                        day: checkInDate.getDate(), month: checkInDate.getMonth() + 1, year: checkInDate.getFullYear(),
                        units: {
                            hour: checkInDate.getHours() % 12 || 12, 
                            min: checkInDate.getMinutes(), 
                            meridiem: (checkInDate.getHours() >= 12) ? MERIDIEM.pm : MERIDIEM.am
                        }
                    },
                    checkOutDate: {
                        day: checkInDate.getDate(), month: checkInDate.getMonth() + 1, year: checkInDate.getFullYear(),
                        units: {
                            hour: checkInDate.getHours() % 12 || 12, 
                            min: checkInDate.getMinutes(), 
                            meridiem: (checkInDate.getHours() >= 12) ? MERIDIEM.pm : MERIDIEM.am
                        }
                    },
                    roomNumber: "On arrival"
                }
                localStorage.setItem("users", JSON.stringify(users.map(u =>
                    u.name.firstName === currentUser.name.firstName ? {...u, bookings: [...u.bookings, newBooking]} : u
                )))
                dispatch(userSlice.actions.addBooking(newBooking));
            },
            amenities: null, departDate: null, flyDuration: null,
            start: {timeFunctionable: startTimeFunctionable, timeVisible: startTimeVisble, description: "Check-In"}, 
            end: {timeFunctionable: endTimeFunctionable, timeVisible: endTimeVisible, description: "Check-Out"}
        })
    }, [data, about])

    if(isLoading || data === null){
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
        const {
            heading, price, linkLogo, linkText, linkTitle, linkPath, amenities, 
            flyDuration, departDate, start, end, current, ...total
        } = info;
        const {
            image, title, suptitle, shortReview, priceDetails, 
            current: copyCurrent, ...introduction
        } = info;

        return(
            <main className={[parentCl, "booking", isShowModal ? "_appear-modal" : ""].join(" ")}>
                <div className="container_booking">
                    <Breadcrumbs 
                        parentCl={[parentCl, "booking"]} current={current} links={[
                            {description: data.city, path: "#"}, 
                            {description: data.country, path: "#"}
                        ]} 
                    />
                    <div className="booking__row">
                        <div className="booking__left">
                            <Introduction {...introduction} parentCl={parentCl} contentType={contentType} isAuthorized={(currentUser.name.firstName !== "")} />
                            <Payment />
                            {(currentUser.name.firstName !== "") 
                                ? <Cards isOpened={[isShowModal, setIsShowModal]} /> : <Authorization /> 
                            }
                        </div>
                        <Total {...total}/>
                        <AddCard parentCl="booking" isOpened={[isShowModal, setIsShowModal]} />
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