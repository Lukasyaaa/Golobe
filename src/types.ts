//-----------------General-----------------
export interface Srcs{
    jpeg : string,
    webp : string
}
interface ImageVariants{
    srcs : Srcs,
    alt : string
}

export interface Setter<T>{
    value : T,
    set : React.Dispatch<React.SetStateAction<T>>
}

export interface Link<T>{
    description : T,
    path : string
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
    heading : string,
    description : string,
    buttonMore : SectionHeaderButton
}
interface Loading{
    is : boolean,
    description : string
}
interface SectionItems<T>{
    container : T[]
    loading : Loading,
    errorMessage : null | string,
}
export interface Section<T>{
    header : SectionHeader,
    items : SectionItems<T>
    maxShow : number
}

export interface Separation<T>{
    flights : T,
    hotels : T
}

export enum Socials{
    Instagram = "icon-inst",
    Youtube = "icon-youtube",
    Twitter = "icon-twitter",
    Facebook = "icon-facebook"
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

export interface OptionsContainer{
    header : Separation<string>
    flights : OptionsItems,
    hotels : OptionsAdvancedItems,
    addPromo : string,
    link : Separation<string>
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
    description : string,
    linkText : string,
    background : Srcs
}

//-----------------Reviews-----------------
export interface Review{
    title : string,
    message : string,
    showMore : string,
    countStars : number,
    author : string,
    place : Link<string>,
    image : ImageVariants
}

//-----------------Footer-----------------
export interface FooterColumn{
    title : string,
    links : Link<string>[]
}

export interface FooterContact{
    heading : string,
    supDescription : string,
    description : string,
    inputPlaceholder : string,
    buttonSend : string,
    image : string
}

export interface Footer{
    contact : FooterContact,
    logo : string,
    socials : Link<Socials>[],
    columns : FooterColumn[] 
}