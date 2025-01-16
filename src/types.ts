//-----------------General-----------------
interface Srcs{
    jpeg : string,
    webp : string
}
interface ImageVariants{
    srcs : Srcs,
    alt : string
}

export interface Setter<T>{
    value : T,
    set : (newValue : T) => void
}

interface Link{
    text : string,
    href : string
}

export interface Block{
    title : string,
    text : string,
}
interface SectionHeaderButton{
    active : string,
    passive : string
}
export interface SectionHeader{
    title : string,
    text : string,
    button : SectionHeaderButton
}
export interface Section<T>{
    header : SectionHeader,
    content : T[],
    maxShow : number
}

//-----------------Options-----------------
export enum OptionType{
    SELECT = 0,
    INPUT = 1
}
export enum IconPosition{
    LEFT = 0,
    RIGHT = 1
}
export enum IconValue{
    BED = 1,
    DATE = 2,
    HUMAN = 3
}

export interface Icon{
    value : IconValue,
    position : IconPosition
}

export interface OptionInput{
    type : OptionType.INPUT,
    label : string,
    value : string,
    icon : Icon | null
}
interface OptionSelectValue{
    links : string[],
    startActive : number
}
export interface OptionSelect{
    type : OptionType.SELECT,
    label : string,
    value : OptionSelectValue,
    icon : Icon | null
}
export type OptionsItems = (OptionSelect | OptionInput)[];

export interface OptionAdvancedInput{
    type : OptionType.INPUT,
    label : string,
    value : string,
    isBigger : boolean,
    icon : Icon | null
}
export interface OptionAdvancedSelect{
    type : OptionType.SELECT,
    label : string,
    value : OptionSelectValue,
    isBigger : boolean,
    icon : Icon | null
}
export type OptionsAdvancedItems = (OptionAdvancedSelect | OptionAdvancedInput)[];

export interface OptionsFlights{
    content : OptionsItems,
    isFlight: true
}
export interface OptionsHotels{
    content : OptionsAdvancedItems,
    isFlight: false
}

export interface OptionsContainer{
    flights : OptionsFlights,
    hotels : OptionsHotels
}

//-----------------Trips-----------------
export interface Trip{
    link : string,
    city : string,
    includes : string[],
    image : ImageVariants
}

//-----------------Choose-----------------
export interface ChooseVariant{
    title : string,
    subtitle : string,
    link : Link,
    background : ImageVariants
}

//-----------------Reviews-----------------
export interface Review{
    title : string,
    message : string,
    showMore : string,
    countStars : number,
    author : string,
    place : Link,
    image : ImageVariants
}

//-----------------Footer-----------------
export interface FooterColumn{
    title : string,
    links : Link[]
}