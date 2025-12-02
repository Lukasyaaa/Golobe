import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Booking, Card, DateType, Person, Ticket, User } from "../types";

const initialState : User = {
    name: {firstName: "", lastName: ""}, email: [], password: "",
    phone: "", address: "",
    birthDay: {day: 0, month: -1, year: -1},
    cards: [], ava: "", banner: "",
    tickets: [], bookings: [],
    favourites: {flightsPart: [], hotelsPart: []}
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loadUser(state, action: PayloadAction<User>) {
            const {
                name, email, password, phone, address, birthDay, cards, ava, banner, tickets, bookings, favourites
            } = action.payload
            state.name = {...name}; state.email = [...email]; state.password = password;
            state.phone = phone; state.address = address; state.birthDay = {...birthDay};
            state.cards = [...cards]; state.ava = ava; state.banner = banner;
            state.tickets = [...tickets]; state.bookings = [...bookings]; 
            state.favourites = {flightsPart: [...favourites.flightsPart], hotelsPart: [...favourites.hotelsPart]};
        },
        resetUser() { return initialState; },   
        loadAva(state, action: PayloadAction<string>) { state.ava = action.payload; }, 
        loadBanner(state, action: PayloadAction<string>) { state.banner = action.payload; },    
        addCard(state, action: PayloadAction<Card>) { state.cards.push(action.payload); },
        removeCard(state, action: PayloadAction<number>) { state.cards.splice(action.payload, 1); },
        updateName(state, action: PayloadAction<Person>) {
            state.name.firstName = action.payload.firstName;
            state.name.lastName  = action.payload.lastName;
        },
        updateAddress(state, action: PayloadAction<string>) { state.address = action.payload; },
        updatePassword(state, action: PayloadAction<string>) { state.password = action.payload; },
        updatePhone(state, action: PayloadAction<string>) { state.phone = action.payload; },
        updateBirthDay(state, action: PayloadAction<DateType>) { 
            state.birthDay = action.payload;
        },
        updateEmail(state, action: PayloadAction<{ email: string, index?: number; }>) {
            const { index, email } = action.payload;
            if (index !== undefined) state.email[index] = email;
            else state.email.push(email);
        },
        addFavouriteFlight(state, action: PayloadAction<number>){
            state.favourites.flightsPart = [...state.favourites.flightsPart, action.payload];
        },
        removeFavouriteFlight(state, action: PayloadAction<number>){
            state.favourites.flightsPart = state.favourites.flightsPart.filter(val => val !== action.payload);
        },
        addFavouriteHotel(state, action: PayloadAction<number>){
            state.favourites.hotelsPart = [...state.favourites.hotelsPart, action.payload];
        },
        removeFavouriteHotel(state, action: PayloadAction<number>){
            state.favourites.hotelsPart = state.favourites.hotelsPart.filter(val => val !== action.payload);
        },
        addTicket(state, action: PayloadAction<Ticket>){
            state.tickets.push(action.payload)
        },
        addBooking(state, action: PayloadAction<Booking>){
            state.bookings.push(action.payload)
        }
    },
});