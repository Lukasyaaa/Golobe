
import type { Dispatch, SetStateAction } from "react";
import { createAsyncThunk } from '@reduxjs/toolkit';
import airports from "../airports.json";

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
export interface IconPath{
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


export interface Person{
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
export const dateToString = ({day, month, year}: DateType) : string => {
    return addZero(day) + "-" + addZero(month) + "-" + year
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
    const hours = Math.floor((numb - days*60*24) / 60);
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
export const getDuration = (depart: Time, array: Time) => {
    const departPlus12 = 12 * Number(depart.units.meridiem === MERIDIEM.pm);
    const departMinus12 = 12 * Number(depart.units.meridiem === MERIDIEM.am && depart.units.hour === 12);
    const departDate = new Date(depart.year, depart.month - 1, depart.day, depart.units.hour + departPlus12 - departMinus12, depart.units.min)
    const arrayPlus12 = 12 * Number(array.units.meridiem === MERIDIEM.pm || array.units.hour === 12);
    const arrayDate = new Date(array.year, array.month - 1, array.day, array.units.hour + arrayPlus12, array.units.min)
    return (arrayDate.getTime() - departDate.getTime()) / (1000 * 60);
}
export const timeToInt = (time: Units, isToBigger: boolean): number => {
    const min = time.min;
    const plus12 = 12 * 60 * Number(time.meridiem === MERIDIEM.pm || isToBigger ? time.hour === 12 : false);
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

export const getFromToIATA = (options: string, about: Flight) : [string, string] => {
    if(String(options).split("-").length !== 1){
        return [String(options).split("-")[0], String(options).split("-")[1]];
    } else {
        if(options === "On-Way"){
            return [
                (about.schedule as ScheduleSingle).startPoint, 
                (about.schedule as ScheduleSingle).endPoint
            ];
        } else if(options === "Return"){
            return [
                (about.schedule as ScheduleParts).to.startPoint, 
                (about.schedule as ScheduleParts).from.startPoint
            ];
        } else {
            return [
                (about.schedule as ScheduleParts).from.startPoint, 
                (about.schedule as ScheduleParts).to.startPoint
            ];
        }
    }
}

export interface Fact{
    description: string,
    value: string,
    iconValue: IconParams
}

export const INPUT_TYPE = {
    field: "FIELD",
    select: "SELECT"
} as const;
export const FIELD_TYPE = {
    text: "text",
    password: "password",
    email: "email"
} as const;

export interface Field<T>{
    validationType: objType<T>
    placeholder: string, subinput: string, id: string, icon: null | Icon
}
export interface FieldsItem<T>{
    isMassive: true, value: T[]
}
export interface FieldItem<T>{
    isMassive: false, value: T
}

export const MONTHS: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
};
export type TwoDataInputValidation = (value: string, anotherValue: string) => string;
export type OneDataInputValidation = (value: string) => string;
export type UniqueEmailInputValidation = (value: string, anotherEmails: string[]) => string;
export type InputValidation = TwoDataInputValidation | OneDataInputValidation | UniqueEmailInputValidation;
interface InputValidations{
    email: OneDataInputValidation, uniqueEmail: UniqueEmailInputValidation,
    password: OneDataInputValidation,
    partName: OneDataInputValidation, fullName: OneDataInputValidation,
    phone: OneDataInputValidation, confirmPassword: TwoDataInputValidation,
    date: OneDataInputValidation, address: OneDataInputValidation
    cardNumber: OneDataInputValidation, cvc: OneDataInputValidation,
    expDate: OneDataInputValidation,
    checkDate: OneDataInputValidation, checkOutDate: TwoDataInputValidation,
    fromTo: OneDataInputValidation,
    returnDepart: OneDataInputValidation, passengerClass: OneDataInputValidation
    destination: OneDataInputValidation,
}
export const INPUT_VALIDATIONS: InputValidations = {
    email: (value: string) => {
        if(value.length === 0) return "Fill field";  
        if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return "Incorrect Input"; 
        return "";
    },
    uniqueEmail: (value: string, anotherEmails: string[]) => {
        if(INPUT_VALIDATIONS.email(value) !== "") return INPUT_VALIDATIONS.email(value);
        if(anotherEmails.includes(value)) return "Already exist this Email";
        return ""
    },
    password: (value: string) => {
        if(value.length === 0) return "Fill field"; 
        if(value.length < 8) return "Too short";
        if(!/^(?=.*[A-Za-z])/.test(value)) return "Must have Letter"; 
        if(!/(?=.*\d)/.test(value)) return "Must have Number"; 
        return "";
    },
    partName: (value: string) => {
        if(value.length === 0) return "Fill field"; 
        if (!/^[A-Za-z]+$/.test(value)) return "Only Letters"; 
        return "";
    },
    fullName: (value: string) => {
        if(value.length === 0) return "Fill field";
        if(/^[A-Za-z]+$/.test(value)) return "Only Letters";
        if(value.split(" ").length - 1 !== 1 || value[value.length - 1] === " " || value[0] === " ") return "Incorrect space Symbol";
        return "";
    },
    phone: (value: string) => {
        if(value.length === 0) return "Fill field";
        if(!/^\+?[\d\s\-()]{10,20}$/.test(value)) return "Incorrect Input"; 
        return "";
    },
    confirmPassword: (value: string, anotherValue: string) => {
        if(value.length === 0) return "Fill field";
        if(value !== anotherValue) return "Does not match the password";
        return ""
    },
    date: (value: string) => {
        if(value.length === 0) return "Fill field";
        if(!/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/.test(value)) return "Incorrect Input";
        const [day, month, year] = value.split("-").map(Number);
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        if(birthDate > today) return "Incorrect Date";
        return ""
    },
    address: (value: string) => {
        if(value.length === 0) return "Fill field";
        return ""
    },
    cardNumber: (value: string) => {
        if(value.length === 0) return "Fill field";
        if(!/^\d{4} \d{4} \d{4} \d{4}$/.test(value)) return "Incorrect Input";
        return "";
    },
    cvc: (value: string) => {
        if(value.length === 0) return "Fill field";
        if(!/^\d{3}$/.test(value)) return "Incorrect Input";
        return "";
    },
    expDate: (value: string) => {
        if(value.length === 0) return "Fill field";
        if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) return "Incorrect Input";
        const expDate = value.split("/"); const today = new Date();
        const inputedDate = new Date(parseInt(expDate[1]) + 2000, parseInt(expDate[0]) - 1, 0, 23, 59, 59, 999);
        if(inputedDate < today) return "Incorrect Date";
        return "";
    },
    checkDate: (value: string) => {
        if(value.length === 0) return "";
        const regex = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s(1[0-2]|[1-9])\/(3[01]|[12][0-9]|[1-9])$/;
        if(!regex.test(value)) return "Incorrect Input";
        const [, weekday, monthStr, dayStr] = value.match(regex)!;
        const month = Number(monthStr); const day = Number(dayStr);
        const today = new Date(); const checkedDate = new Date(today.getFullYear(), month - 1, day);
        const weekdayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const realWeekday = weekdayIndex[checkedDate.getDay()];
        if(checkedDate.getMonth() + 1 !== month || checkedDate.getDate() !== day || realWeekday !== weekday && checkedDate > today) return "Incorrect Date";
        return "";
    },
    checkOutDate: (value: string, anotherValue: string) => {
        if(value.length === 0) return "";
        const regex = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s(1[0-2]|[1-9])\/(3[01]|[12][0-9]|[1-9])$/;
        if(!regex.test(value)) return "Incorrect Input";
        const [, weekday, monthStr, dayStr] = value.match(regex)!;
        const month = Number(monthStr); const day = Number(dayStr);
        const today = new Date(); 
        const checkedDate = new Date(today.getFullYear(), month - 1, day);
        const weekdayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const realWeekday = weekdayIndex[checkedDate.getDay()];
        if(checkedDate.getMonth() + 1 !== month || checkedDate.getDate() !== day || realWeekday !== weekday && checkedDate > today) return "Incorrect Date";
        
        if(anotherValue.length === 0) return ""
        const [, , anotherMonthStr, anotherDayStr] = anotherValue.match(regex)!;
        const anotherMonth = Number(anotherMonthStr); const anotherDay = Number(anotherDayStr);
        const anotherCheckedDate = new Date(today.getFullYear(), anotherMonth - 1, anotherDay);
        if(checkedDate <= anotherCheckedDate) return "Check-Out date earlier than Check-In date";
        return "";
    },
    fromTo: (value: string) => {
        if(value.length === 0) return "";
        if(!/^[A-Za-z]+(?:[ -][A-Za-z]+)*\s-\s[A-Za-z]+(?:[ -][A-Za-z]+)*$/.test(value)) return "Incorrect Input";
        return "";
    },
    returnDepart: (value: string) => {
        if(value.length === 0) return "";
        const regex = /^(0[1-9]|[12][0-9]|3[01]) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{2}) - (0[1-9]|[12][0-9]|3[01]) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{2})$/;
        if(!regex.test(value)) return "Incorrect Input";

        const [, d1, m1, y1, d2, m2, y2] = value.match(regex) as RegExpExecArray;
        const year1 = 2000 + parseInt(y1); const year2 = 2000 + parseInt(y2);
        const today = new Date();
        const date1 = new Date(year1, MONTHS[m1], parseInt(d1), 23, 59, 59, 999);
        const date2 = new Date(year2, MONTHS[m2], parseInt(d2), 23, 59, 59, 999);
        if(date1.getDate() !== parseInt(d1)) return "Incorrect Depart Date";
        if(date2.getDate() !== parseInt(d2)) return "Incorrect Return Date";
        if (date2 < date1) return "Return date is earlier than departure";
        if (today > date1) return "Departure date is already in the past";
        if (today > date2) return "Return date is already in the past";
  
        return "";
    },
    passengerClass: (value: string) => {
        if(value.length === 0) return "";
        const regex = /^(\d+)\s(Passenger|Passengers),\s(Economy|First Class|Business)$/;
        if(!regex.test(value)) return "Incorrect Input";
        const [, numStr, passengerWord] = value.match(regex) as RegExpExecArray;
        const n = parseInt(numStr, 10);
        if ((n === 1 && passengerWord !== "Passenger") || (n > 1 && passengerWord !== "Passengers")) return "Incorrect Passengers Count";
        return "";
    },
    destination: (value: string) => {
        if(value.length === 0) return "";
        if (!/^[A-Za-z]+$/.test(value)) return "Only Letters"; 
        return "";
    },
} as const;
export const INPUT_AUTHORIZATION_VALIDATION_TYPE = {
    firstName: "partname_0",
    lastName: "partname_1",
    fullName: "fullName",
    uniqueEmail: "uniqueEmail",
    email: "email",
    phone: "phone",
    password: "password",
    confirmPassword: "confirmPassword",
    date: "date",
    address: "address"
} as const;
export const INPUT_CARD_VALIDATION_TYPE = {
    name: "fullName",
    cardNumber: "cardNumber",
    cvc: "cvc",
    expDate: "expDate",
} as const;
export const INPUT_OPTIONS_VALIDATION_TYPE = {
    fromTo: "fromTo",
    returnDepart: "returnDepart",
    passengerClass: "passengerClass",
    destination: "destination",
    checkIn: "checkDate_0",
    checkOut: "checkDate_1",
} as const;

export interface AboutTwoDataPart{
    anotherValue: string, validation: TwoDataInputValidation
}
export interface AboutOneDataPart{
    anotherValue: null, validation: OneDataInputValidation
}
export interface InputState<T>{
    description: objType<T>,
    value: string
}

export const getInputState = <T>(neededDesc: objType<T>, inputs: InputState<T>[]) => {
    return inputs.find(({description}) => description === neededDesc)?.value || ""
}
export const getInputSetState = <T>(neededDesc: objType<T>, setInputs: Dispatch<SetStateAction<InputState<T>[]>>) => {
    return (newValue: string) => setInputs(prev => prev.map(i =>
        i.description === neededDesc ? { ...i, value: newValue } : i
    ))
}

type AllValidationValues = 
    objType<typeof INPUT_AUTHORIZATION_VALIDATION_TYPE> | 
    objType<typeof INPUT_CARD_VALIDATION_TYPE> |
    objType<typeof INPUT_OPTIONS_VALIDATION_TYPE>;
export const getInputValidation = <T extends AllValidationValues>(
    neededDesc: T,
) : InputValidation => {
    switch(neededDesc){
        case INPUT_AUTHORIZATION_VALIDATION_TYPE.firstName: case INPUT_AUTHORIZATION_VALIDATION_TYPE.lastName: return INPUT_VALIDATIONS.partName;
        case INPUT_AUTHORIZATION_VALIDATION_TYPE.email: return INPUT_VALIDATIONS.email;
        case INPUT_AUTHORIZATION_VALIDATION_TYPE.uniqueEmail: return INPUT_VALIDATIONS.uniqueEmail;
        case INPUT_AUTHORIZATION_VALIDATION_TYPE.password: return INPUT_VALIDATIONS.password;
        case INPUT_AUTHORIZATION_VALIDATION_TYPE.fullName: case INPUT_CARD_VALIDATION_TYPE.name: return INPUT_VALIDATIONS.fullName;
        case INPUT_AUTHORIZATION_VALIDATION_TYPE.confirmPassword: return INPUT_VALIDATIONS.confirmPassword;
        case INPUT_AUTHORIZATION_VALIDATION_TYPE.date: return INPUT_VALIDATIONS.date;
        case INPUT_AUTHORIZATION_VALIDATION_TYPE.address: return INPUT_VALIDATIONS.address;
        case INPUT_AUTHORIZATION_VALIDATION_TYPE.phone: return INPUT_VALIDATIONS.phone;
        case INPUT_CARD_VALIDATION_TYPE.cardNumber: return INPUT_VALIDATIONS.cardNumber;
        case INPUT_CARD_VALIDATION_TYPE.expDate: return INPUT_VALIDATIONS.expDate;
        case INPUT_CARD_VALIDATION_TYPE.cvc: return INPUT_VALIDATIONS.cvc;
        case INPUT_OPTIONS_VALIDATION_TYPE.fromTo: return INPUT_VALIDATIONS.fromTo;
        case INPUT_OPTIONS_VALIDATION_TYPE.returnDepart: return INPUT_VALIDATIONS.returnDepart;
        case INPUT_OPTIONS_VALIDATION_TYPE.passengerClass: return INPUT_VALIDATIONS.passengerClass;
        case INPUT_OPTIONS_VALIDATION_TYPE.destination: return INPUT_VALIDATIONS.destination;
        case INPUT_OPTIONS_VALIDATION_TYPE.checkIn: return INPUT_VALIDATIONS.checkDate;
        case INPUT_OPTIONS_VALIDATION_TYPE.checkOut: return INPUT_VALIDATIONS.checkOutDate;
    }
}


export interface AirportInfo {
    airportName: string, city: string, country: string; address: string;
}

export interface AirportItem{
    id: number,
    airportName: string, city: string, country: string,
    iata: string, latitude: number, longtitude: number
}
export interface ShortLocation{
    city: string,
    country: string
}
const API_KEY = "a1effb76c9d44124946fe66cb85fd57f";
export async function getCountriesByCities(cities : string[]): Promise<(string | null)[]>{
    const promises = cities.map(async (city) => {
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${API_KEY}&language=en`;
        const res = await fetch(url);
        if(res.ok){
            const data = await res.json();
            return data.results[0].components.country
        }
        return null;
    });
    return Promise.all(promises);
}
export async function getLocaitonByAddress(address: string): Promise<ShortLocation | null>{
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${API_KEY}&language=en`;
    const res = await fetch(url);
    if (res.ok) {
        const data = await res.json();
        return {
            city: data.results[0].components.state,
            country: data.results[0].components.country
        } 
    }
    return null;
}
export async function getCityFromAddress(address: string): Promise<string | null> {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${API_KEY}&language=en`;
    try {
        const res = await fetch(url);
        if (!res.ok) return null;

        const data = await res.json();
        if (!data.results || data.results.length === 0) return null;

        const components = data.results[0].components;

        return (
            components.state ||
            components.town ||
            components.village ||
            components.county ||
            null
        );
    } catch (e) {
        console.error("Error:", e);
        return null;
    }
}
export async function getAirportByIATA(iata: string): Promise<AirportInfo | null> {
    const airport = airports.find((a: AirportItem) => a.iata === iata.toUpperCase());
    if (!airport) return null;

    const lat = airport.latitude;
    const lon = airport.longtitude;
    if (!lat || !lon) {
        return {
            airportName: airport.airportName,
            city: airport.city, country: airport.country,
            address: "No coordinates → no exact address available"
        };
    }

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${API_KEY}&language=en`;
    const res = await fetch(url);
    let address = "Unknown address";
    if (res.ok) {
        const data = await res.json();
        if (data?.results[0].formatted) address = data.results[0].formatted;
    }
    return {
        airportName: airport.airportName, city: airport.city, country: airport.country,address
    };
}

export interface Point{
    timeVisible: string,
    timeFunctionable: string,
    description: string
}

export interface ExpDate{
    month: number,
    year: number    
}
export interface Card{
    number: number,
    expDate: ExpDate,
    cvc: number,
    name: Person
}

export const AUTHORIZATION_TYPE = {
    login: "Login",
    signIn: "Sign In"
} as const;

export interface Ticket{
    id: number,
    airline: objType<typeof AIRLINES>,
    from: string, to: string,
    departDate: Time, arrayDate: Time,
    gate: string, seatNumber: number, seatType: objType<typeof SEATS_TYPE>
    tripType: string
}
export interface Booking{
    id: number,
    hotelLogo: Image,
    checkInDate: Time, checkOutDate: Time,
    roomNumber: number | "On arrival"
}

export interface User{
    name: Person, email: string[], password: string,
    phone: string, address: string,
    birthDay: DateType,
    cards: Card[], ava: string, banner: string,
    tickets: Ticket[], bookings: Booking[],
    favourites: SiteSeparation<number[]>
}
export const getCurrentUser = () : User | null => {
    const id = JSON.parse(localStorage.getItem("currentUser") as string);
    if(id !== -1){
        const users = JSON.parse(localStorage.getItem("users") as string);
        return users[id];
    }
    return null;
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
    cls: string[]
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
            return getDuration(schedule.departTime, schedule.arrayTime)
        case TRIP_TYPE.roundTrip:
            return Math.min(
                getDuration(schedule.from.departTime, schedule.from.arrayTime),
                getDuration(schedule.to.departTime, schedule.to.arrayTime)
            )
        case TRIP_TYPE.multiCity:
            let flyTimes: number[] = [];
            if(airline.length === 0){
                schedule.parts.forEach(schedulePart => {
                    flyTimes.push(getDuration(schedulePart.departTime, schedulePart.arrayTime))
                })
            } else {
                schedule.parts.forEach(schedulePart => {
                    for(const airlineI of airline){
                        if(airlinesMassive[airlineI] === schedulePart.airline){
                            flyTimes.push(getDuration(schedulePart.departTime, schedulePart.arrayTime))
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
export interface Catalog<T, K>{
    sort: K[],
    container: CatalogContainer<T>
}

export interface AuthorizationVariant{
    icon: IconParams,
    isBigger: boolean,
    subicon: string | null
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

export interface SeatVariant{
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

//------------Catalog Hotels------------\
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
export const getRoomInfo = (beds: Beds, specifies: string[]) => {
    const doubleBeds = beds.double + " double bed" + ((beds.double > 1) ? "s" : "");
    const twinBeds = beds.twin + " twin bed" + ((beds.twin > 1) ? "s" : "");
    const bedsString = [doubleBeds, twinBeds].filter(beds => !beds.includes("0")).join(" or ");
    return [bedsString, specifies.join(" - ")].join(" - ");
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

export interface FullOptionValue {
    description: string,
    title: string
}
export interface IconOptionValue{
    value: string,
    icon: IconParams
}

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

export interface Icon{
    pos: objType<typeof ICON_POSITION>,
    value: IconParams
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
export interface Column{
    links: Link[],
    title: string
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