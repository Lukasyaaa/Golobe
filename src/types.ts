
import type { Dispatch, SetStateAction } from "react";
import { createAsyncThunk } from '@reduxjs/toolkit';

//----Common----
export type useStateReturned<T> = [T, Dispatch<SetStateAction<T>>]
export type objType<T> = T[keyof T];
export const createFetchThunk = <T>(typePrefix: string, endPoint: string) => {
    return createAsyncThunk<T>(typePrefix, async () => {
        const response = await fetch('http://localhost:5000/' + endPoint);
        if (!response.ok) throw new Error(`Failed to load data!`);
        return (await response.json()) as T;
    });
};

export const SITE_PARTS = {
    flights: "Flights",
    stays: "Stays"
} as const;
export interface SiteSeparation<T>{
    flightsPart: T,
    hotelsPart: T
}

export const getGrade = (rating: number) => {
    if(rating > 4) return "Very Good";
    if(rating > 3) return "Good";
    if(rating > 2) return "Normal";
    if(rating > 1) return "Bad";
    return "Very Bad";
}
export const getRating = (rating: number) => {
    return rating + ((Math.ceil(rating) === Math.floor(rating)) ? ".0" : "")
}
export interface ShortReview{
    rating : number,
    countReviews : number
}

export const FILL_RULE = {
    nonzero: "nonzero",
    evenodd: "evenodd",
    inherit: "inherit"
} as const;
export const STROKE_LINECAP = {
    butt: "butt",
    round: "round",
    square: "square",
    inherit: "inherit"
} as const;
export const STROKE_LINEJOIN = {
    bevel: "bevel",
    miter: "miter",
    round: "round",
    inherit: "inherit"
} as const;
interface IconPath{
    d: string,
    fill: string,
    fillRule: objType<typeof FILL_RULE>,
    stroke: string,
    strokeLinecap: objType<typeof STROKE_LINECAP>,
    strokeLinejoin: objType<typeof STROKE_LINEJOIN>,
    strokeWidth: string,
}
interface IconViewbox{
    minX: number, minY: number,
    width: number, height: number
}
export interface IconParams{
    viewbox: IconViewbox, width: number, height: number, pathes: IconPath[]
}
export const transformIconViewbox = ({minX, minY, width, height}: IconViewbox) : string => 
    minX + " " + minY + " " + width + " " + height;


interface Person{
    firstName: string,
    lastName: string
}

export interface ButtonTwoStates{
    active: string,
    disable: string
}
export interface DefaultBlock<T>{
    heading: string,
    description: string,
    button: T
}
export interface Section<T>{
    items: T[],
    isLoading: boolean,
    error: null | string
}
export interface SectionWithHeader<T>{
    items: T[],
    isLoading: boolean,
    error: null | string,
    maxShow: number,
    header: DefaultBlock<ButtonTwoStates>
}

export interface Srcs{
    webp: string,
    jpeg: string
}
export interface Image{
    srcs: Srcs,
    alt: string
}

export interface Link<T = string>{
    description: T,
    path: string
}

export const MERIDIEM = {
    am: "AM",
    pm: "PM"
} as const;
interface Units{
    hour: number, min: number, meridiem: objType<typeof MERIDIEM>
}
export interface Time{
    day: number, month: number, year: number, units: Units
}

export interface DateType{
    day: number, month: number, year: number
}
export const getDayWeek = (about: number) : string => {
    switch(about){
        case 0: return "Sunday";
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
        default: return "Error Day Week"
    }
}
export const getShortDayWeek = (about: number) : string => {
    switch(about){
        case 0: return "Sun";
        case 1: return "Mon";
        case 2: return "Tue";
        case 3: return "Wed";
        case 4: return "Thu";
        case 5: return "Fri";
        case 6: return "Sat";
        default: return "Error Day Week"
    }
}
export const getMonth = (about: number) : string => {
    switch(about){
        case 0: return "Jan";
        case 1: return "Dec";
        case 2: return "Feb";
        case 3: return "Mar";
        case 4: return "Apr";
        case 5: return "May";
        case 6: return "Jun";
        case 7: return "Jul";
        case 8: return "August";
        case 9: return "Sep";
        case 10: return "Oct";
        case 11: return "Nov";
        default: return "Error Month";
    }
}

export const intToDuration = (numb : number) : string => {
    const days = Math.floor(numb / (60*24));
    const hours = Math.floor(numb / 60);
    const min = numb % 60;
    const result: string[] = [];
    [{val: days, symb: "d"}, {val: hours, symb: "h"}].forEach(({val, symb}) => {
        if(val > 0) result.push(val + symb); 
    })
    return result.join(" ") + " " + min + "m";
}
export const intToTime = (numb: number): Units => {
    const meridiem: objType<typeof MERIDIEM> = (numb >= 720 && numb !== 1440) ? MERIDIEM.pm : MERIDIEM.am;
    const hour: number = Math.floor(numb / 60) % 12 || 12;
    const min: number = numb % 60;
    return {hour, min, meridiem}
}
export const timeToInt = (time: Units, isToBigger: boolean): number => {
    const min = time.min;
    const plus12 = 12 * 60 * Number(time.meridiem === MERIDIEM.pm || isToBigger);
    const hour = time.hour * 60 * Number(time.meridiem === MERIDIEM.pm || time.hour !== 12) + plus12;
    return hour + min;
}
export const addZero = (numb : number) => {
    return (numb >= 10) ? numb : "0" + numb;
}
export const timeToString = (time : Units): string => {
    return addZero(time.hour) + ":" + addZero(time.min) + " " + time.meridiem.toLowerCase();
}
export const timeTo24String = (time : Units): string => {
    return addZero(time.hour + 12 * Number(time.meridiem === MERIDIEM.pm)) + ":" + addZero(time.min);
}

export const INPUT_TYPE = {
    field: "FIELD",
    select: "SELECT"
} as const;

export const getCity = (about: string) => "Istanbul";
export const getCountry = (about: string) => "Turkey";
export const getAirport = (about: string) => "CVK Park Bosphorus Hotel Istanbul";
export const getAirportLocation = (about: string) => "Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437";
export const getPlaceTranscript = (about : string) => "Newark";

export interface Point{
    timeVisible: string,
    timeFunctionable: string,
    description: string
}

//--------Flights/Hotels Home Page--------
export interface IntroVariants{
    heading: string,
    subheading: string,
    background: Srcs
}

export interface Travel{
    city: string,
    price: number,
    description: string,
    image: Srcs
}

export interface Offer{
    heading: string,
    price: number,
    description: string,
    images: Image[]
}

//--------Select--------
export const SELECT_DESCRIPTION_TYPE = {
    subValue: "SubValue",
    onlyValue: "OnlyValue",
    onlyText: "OnlyText"
} as const;
export interface SelectLink<T>{
    about: T,
    cl: string
}

//--------Catalog--------
export interface PriceDetails{
    baseFare: number,
    discount: number,
    taxes: number,
    serviceFee: number
}
export const transformPrice = ({baseFare, discount, taxes, serviceFee} : PriceDetails) : number =>
    baseFare + taxes + serviceFee - discount

export const getPrice = ({type, schedule} : Flight): number => {
    switch(type){
        case TRIP_TYPE.onWay:
            return transformPrice(schedule.seats.economy.price);
        case TRIP_TYPE.multiCity:
            return Math.min(...schedule.parts.map(part => transformPrice(part.seats.economy.price)));
        case TRIP_TYPE.roundTrip:
            return Math.min(
                transformPrice(schedule.from.seats.economy.price), 
                transformPrice(schedule.to.seats.economy.price)
            );
    }
}
export const getFlyDuration = (
    {type, schedule}: Flight, airline: number[], airlinesMassive: objType<typeof AIRLINES>[]
): number => {
    switch(type){
        case TRIP_TYPE.onWay:
            return(timeToInt(schedule.arrayTime.units, false) - timeToInt(schedule.departTime.units, false))
        case TRIP_TYPE.roundTrip:
            return Math.min(
                timeToInt(schedule.from.arrayTime.units, false) - timeToInt(schedule.from.departTime.units, false),
                timeToInt(schedule.to.arrayTime.units, false) - timeToInt(schedule.to.departTime.units, false)
            )
        case TRIP_TYPE.multiCity:
            let flyTimes: number[] = [];
            if(airline.length === 0){
                schedule.parts.forEach(schedulePart => {
                    flyTimes.push(
                        timeToInt(schedulePart.arrayTime.units, false) - 
                        timeToInt(schedulePart.departTime.units, false)
                    )
                })
            } else {
                schedule.parts.forEach(schedulePart => {
                    for(const airlineI of airline){
                        if(airlinesMassive[airlineI] === schedulePart.airline){
                            flyTimes.push(
                                timeToInt(schedulePart.arrayTime.units, false) - 
                                timeToInt(schedulePart.departTime.units, false)
                            )
                            break;
                        }
                    }
                })
            }
            return Math.min(...flyTimes);
    }
}
export const getAirlineSrcs = (desc : objType<typeof AIRLINES>) : Srcs => {
    switch(desc){
        case AIRLINES.emirated:
            return {
                webp: "/public/img/flights/items/airlines/emirates.webp", 
                jpeg: "/public/img/flights/items/airlines/emirates.png"
            };
        case AIRLINES.etihad:
            return {
                webp: "/public/img/flights/items/airlines/etihad.webp", 
                jpeg: "/public/img/flights/items/airlines/etihad.png"
            };
        case AIRLINES.qatar:
            return {
                webp: "/public/img/flights/items/airlines/qatar.webp", 
                jpeg: "/public/img/flights/items/airlines/qatar.png"
            };
        case AIRLINES.flyDubai:
            return {
                webp: "/public/img/flights/items/airlines/flydubai.webp", 
                jpeg: "/public/img/flights/items/airlines/flydubai.png"
            };
    }
}

export const SORT_BY = {
    recommended: "Recommended",
    unRecommended: "Not Recommended"
} as const;
export interface CatalogContainer<T>{
    items: T[],
    isLoading: boolean,
    error: null | string
}
export interface Catalog<T>{
    sort: string[],
    container: CatalogContainer<T>
}

//--------Booking--------
export const BOOKING_ICON_VALUE = {
    visa: "Visa",
} as const;

export const ADD_CARD_TITLE_FIELD = {
    cardNumber: "Card Number",
    expDate: "Exp. Date",
    cvc: "CVC",
    name: "Name on Card",
} as const;
export const ADD_CARD_TITLE_SELECT = {
    country: "Country or Region"
} as const;

export interface AddCardField{
    type: typeof INPUT_TYPE.field, 
    label: objType<typeof ADD_CARD_TITLE_FIELD>, 
    placeholder: string, 
    icon: null | IconValue<objType<typeof BOOKING_ICON_VALUE>>
}
export interface AddCardSelect{
    type: typeof INPUT_TYPE.select, 
    label: objType<typeof ADD_CARD_TITLE_SELECT>, 
    links: string[], 
    icon: null | IconValue<objType<typeof BOOKING_ICON_VALUE>>
}
interface AddCardMassiveItem{
    isMassive: true,
    value: (AddCardSelect | AddCardField)[]
}
interface AddCardInputItem{
    isMassive: false,
    value: AddCardSelect | AddCardField
}
export type AddCardItem =  AddCardMassiveItem | AddCardInputItem;

//------------Catalog Flights------------
export const FLIGHT_AMENITIES = {
    quick: "Quick",
    punctuality: "Punctuality",
    fastFood: "Fast Food",
    comfortableSeats: "Comfortable Seats"
} as const;
export const AIRLINES = {
    emirated: "Emirated",
    flyDubai: "Fly Dubai",
    qatar: "Qatar",
    etihad: "Etihad"
} as const;
export const TRIP_TYPE = {
    roundTrip: "Round Trip",
    multiCity: "Multi-City",
    flexible: "My Dates are Flexible",
    onWay: "On Way"
} as const;
export const SEATS_TYPE = {
    economy: "Economy",
    business: "Business",
    first: "First Class"
} as const;

export interface Airline{
    description: objType<typeof AIRLINES>,
    srcs: Srcs
}
export interface Airlines{
    emirated: Srcs,
    etihad: Srcs,
    flyDubai: Srcs,
    qatar: Srcs
}

interface SeatVariant{
    images: Image[],
    price: PriceDetails,
    count: number
}
export interface SeatsVariants{
    economy: SeatVariant,
    business: SeatVariant,
    first: SeatVariant
}

export interface SchedulePart{
    gate: string,
    airline: objType<typeof AIRLINES>,
    amenities: objType<typeof FLIGHT_AMENITIES>[],
    image: Image,
    plane: string,
    seats: SeatsVariants,
    departTime: Time,
    arrayTime: Time,
    route: string[],
    startPoint: string,
    place: Srcs
}
export interface ScheduleSingle{
    gate: string,
    airline: objType<typeof AIRLINES>,
    amenities: objType<typeof FLIGHT_AMENITIES>[],
    image: Image,
    plane: string,
    seats: SeatsVariants,
    departTime: Time,
    arrayTime: Time,
    route: string[],
    startPoint: string,
    endPoint: string,
    placeFrom: Srcs,
    placeTo: Srcs
}
export interface ScheduleParts{
    from: SchedulePart,
    to: SchedulePart
}
export interface ScheduleMassive{
    parts: SchedulePart[],
    endPoint: string,
    endPlace: Srcs
}

interface FlightScheduleSingle{
    id: number,
    rating: number,
    countReviews: number,
    schedule: ScheduleSingle,
    type: typeof TRIP_TYPE.onWay
}
interface FlightScheduleParts{
    id: number,
    rating: number,
    countReviews: number,
    schedule: ScheduleParts,
    type: typeof TRIP_TYPE.roundTrip
}
export interface FlightScheduleMassive{
    id: number,
    rating: number,
    countReviews: number,
    schedule: ScheduleMassive,
    type: typeof TRIP_TYPE.multiCity
}

export type Flight = FlightScheduleMassive | FlightScheduleParts | FlightScheduleSingle;

export const getSchedulePartsCount = (about: Flight) : number =>{
    switch(about.type){
        case TRIP_TYPE.onWay: return 1;
        case TRIP_TYPE.roundTrip: return 2;
        case TRIP_TYPE.multiCity: return about.schedule.parts.length;
    }
}
export const getSeatsGroup = (type : objType<typeof SEATS_TYPE>, flightPart: SchedulePart) => {
    switch(type){
        case SEATS_TYPE.business:
            return flightPart.seats.business;
        case SEATS_TYPE.economy:
            return flightPart.seats.economy;
        case SEATS_TYPE.first:
            return flightPart.seats.first;
    }
}

//------------Catalog Hotels------------
export const HOTEL_TYPE = {
    hotels: "Hotels",
    motels: "Motels",
    resorts: "Resorts"
} as const;
export interface HotelLocation{
    image: Image,
    text: string
}
export interface HotelImages{
    main: Image,
    another: Image[],
    maxShow: number
}
export interface Beds{
    twin: number,
    double: number
}
export interface Room{
    specifics: string[],
    beds: Beds,
    price: PriceDetails,
    image: Image
}
export interface HotelReview{
    grade: number,
    author: Person,
    review: string,
    ava: Srcs
}
export interface HotelReviews{
    items: HotelReview[],
    maxShow: number
}
export interface HotelAmenities{
    items: (objType<typeof AMENITIES> | objType<typeof FREEBIES>)[],
    maxInColumn: number,
    maxShow: number
}
export interface Hotel{
    id: number,
    type: objType<typeof HOTEL_TYPE>
    name: string,
    rating: number,
    starsCount: number,
    location: HotelLocation,
    amenities: HotelAmenities,
    images: HotelImages,
    overview: string,
    features: objType<typeof FEATURES>[],
    rooms: Room[],
    reviews: HotelReviews,
    logo: Srcs
}

//--------Sort--------
export const FLIGHTS_SORT_TYPE ={
    cheapest: "Cheapest",
    best: "Best",
    quickest: "Quickest",
} as const;
export const HOTELS_SORT_TYPE = {
    hotels: "Hotels",
    motels: "Motels",
    resorts: "Resorts"
} as const;

//--------Navbar--------
export const FREEBIES = {
    breakfast: "Free breakfast",
    parking: "Free parking",
    internet: "Free internet",
    airportShuttle: "Free airport shuttle",
    cancellation: "Free cancellation"
} as const;
export const AMENITIES = {
    allDayFrontDesc: "24hr front desk",
    airConditioned: "Air-conditioned",
    fitness: "Fitness Center",
    outdoorPool: "Outdoor pool",
    indoorPool: "Indoor pool",
    spa: "Spa and wellness center",
    restaurant: "Restaurant",
    roomService: "Room service",
    bar: "Bar/Lounge",
    teaCoffeeMachine: "Tea/coffee machine"
} as const;
export const FEATURES = {
    nearPark: "Near park",
    nearNightlife: "Near nightlife",
    nearTheater: "Near theater",
    cleanHotel: "Clean Hotel"
} as const;

export const NAVBAR_ITEM = {
    priceRange: "priceRange",
    timeRange: "timeRange",
    radios: "Radios",
    checkboxes: "Checkboxes"
} as const;

export const NAVBAR_DESCRIPTION = {
    rating: "Rating",
    airlines: "Airlines",
    trips: "Trips",
    price: "Price",
    time: "Departure Time",
    freebies: "Freebies",
    amenities: "Amenities"
} as const;

export interface NavbarRangeValue<T>{ from: T, to: T}
export interface NavbarPriceRange{
    description: objType<typeof NAVBAR_DESCRIPTION>,
    type: typeof NAVBAR_ITEM.priceRange,
    value: NavbarRangeValue<number>
}
export interface NavbarTimeRange{
    description: objType<typeof NAVBAR_DESCRIPTION>,
    type: typeof NAVBAR_ITEM.timeRange,
    value: NavbarRangeValue<number>
}

export interface NavbarRadios{
    description: objType<typeof NAVBAR_DESCRIPTION>,
    type: typeof NAVBAR_ITEM.radios,
    value: string[]
}

export interface NavbarCheckboxes{
    description: objType<typeof NAVBAR_DESCRIPTION>,
    type: typeof NAVBAR_ITEM.checkboxes,
    value: string[],
    maxShow: number
}

export type NavbarFilter = NavbarPriceRange | NavbarTimeRange | NavbarRadios | NavbarCheckboxes;


//----Options----
export const NEEDED_BLOCKS = {
    all: "OPTIONS_ALL-BLOCKS",
    onlyInputs: "OPTIONS_ONLY-INPUTS",
    withoutHeader: "OPTIONS_WITHOUT-HEADER"
} as const;

export const ICON_POSITION = {
    left: "LEFT",
    right: "RIGHT"
} as const;
export const OPTION_ICON_VALUE = {
    fromTo: "FROM-TO",
    hotelPlace: "BED",
    date: "CALENDAR",
    people: "PEOPLE-COUNT"
} as const;

export interface IconValue<T>{
    pos: objType<typeof ICON_POSITION>,
    value: T
}

//----Intro----
//--------Trip--------
export interface Trip{
    image: Image, city: string, services: string[]
}
//--------Choose--------
export interface ChooseOption{
    heading : string,
    description : string,
    button : string,
    background : Srcs
}
//--------Reviews--------
export interface Review{
    heading : string,
    description : string,
    starsCount : number,
    author : string,
    livePlace : string,
    image : Image
}

//----Footer----
export interface Newsletter{
    heading: string,
    supdescription: string,
    description: string,
    inputPlaceholder: string,
    subscribe: string
}

//----Flights----
//--------Map--------
export interface Submap{
    image: Image,
    arrow: string,
    boardingPass: number,
    place: string
}

//----Hotels----
//--------Recent--------
export interface RecentItem{
    image: Image,
    city: string,
    countPlaces: number
}