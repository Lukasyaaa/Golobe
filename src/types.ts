
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

export const FILL_RULE = {
    nonzero: "nonzero",
    evenodd: "evenodd",
    inherit: "inherit"
} as const;
interface IconPath{
    d: string,
    fillRule: objType<typeof FILL_RULE>,
    fill: string
}
export interface IconParams{
    width: number, height: number, pathes: IconPath[]
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
    header: DefaultBlock<ButtonTwoStates>,
    items: T[],
    isLoading: boolean,
    error: null | string
    maxShow: number
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
export const ICON_VALUE = {
    fromTo: "FROM-TO",
    hotelPlace: "BED",
    date: "CALENDAR",
    people: "PEOPLE-COUNT"
} as const;

export interface IconValue{
    pos: objType<typeof ICON_POSITION>,
    value: objType<typeof ICON_VALUE>
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