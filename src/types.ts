//----------Common Types----------
export interface defaultBlockText{
    heading : string,
    info : string,
    button : string,
}
export interface srcs{
    webp : string,
    jpeg : string,
}
export interface sectionHeaderItems<T>{
    items : T[],
    header : defaultBlockText
}
export interface image{
    src : string,
    alt : string,
}
export interface imageVariants{
    srcs : srcs,
    alt : string,
}

//----------Header----------
interface headerLink{
    href : string,
    value : string,
}
export interface header{
    links : headerLink[],
    buttons : headerLink[],
}

//----------Intro----------
export interface introStart{
    supheading: string,
    heading: string,
    subheading : string,
}
interface introVariant{
    heading: string,
    subheading : string,
}
export interface intro{
    start : introStart,
    flights : introVariant,
    hotels : introVariant,
}

//----------Options----------
export enum optionIconPosition{
    Null = "icon-null",
    Left = "icon-left",
    Right = "icon-right",
}
export type optionsSelectLink = {
    value : string,
    isDisabled : boolean,
}
export interface flightsOptionsItem{
    title : string,
    iconValue : string | null,
    iconPosition : optionIconPosition,
    value : string | optionsSelectLink[],
    isActive : boolean | null,
}
export interface hotelsOptionsItem{
    title : string,
    iconValue : string | null,
    iconPosition : optionIconPosition,
    isBigger : boolean,
    value : string | optionsSelectLink[],
    isActive : boolean | null,
}
export enum optionsType{
    Flights = 0,
    Hotels = 1,
}

interface optionsHeaderLink{
    value : string,
    iconValue : string,
    isActive : boolean,
}
export interface options{
    header : optionsHeaderLink[]
    flights : flightsOptionsItem[],
    hotels : hotelsOptionsItem[],
}

//-----------TripVariant----------
export interface tripVariantsItem{
    image : imageVariants
    title : string,
    features : string[],
    href : string,
}

//----------Choice----------
export interface choiceItem{
    image : imageVariants,
    text : defaultBlockText,
}

//----------Reviews----------
export interface reviewsItemText{
    heading : string,
    info : string,
    button : string,
    starsCount : number,
    author : string,
    hotel : string,
}
export interface reviewsItem{
    image : imageVariants,
    text : reviewsItemText,
    hotelLink : string,
    isActive : boolean,
}

//-----------Footer----------
interface post{
    heading: string,
    subheading: string,
    info: string,
    input: string,
    button: string,
}

interface infoMain{
    image : image,
    socials : string[],
}
export interface footerLink{
    value : string,
    href : string,
}
export interface footerItem{
    title : string,
    list : footerLink[],
    isActive : boolean,
}
interface main{
    info : infoMain,
    items : footerItem[],
}

export interface footer{
    post : post,
    main : main,
}