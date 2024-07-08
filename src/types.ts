//----------Common Types----------
export interface defaultBlockText{
    heading : string,
    info : string,
    button : string
}
export interface srcs{
    webp : string,
    jpeg : string
}
export interface sectionHeaderItems<T>{
    items : T[],
    header : defaultBlockText
}
export interface image{
    src : string,
    alt : string
}
export interface imageVariants{
    srcs : srcs,
    alt : string
}
export interface introVariant{
    heading: string,
    subheading : string,
    background : srcs
}

//----------Header----------
interface buttonHeaderLink{
    href : string,
    value : string
}
interface headerLink{
    href : string,
    value : string,
    iconValue : string,
    isActive : boolean
}
interface headerImg{
    start : string,
    another : string,
}
export interface header{
    image : headerImg,
    links : headerLink[],
    buttons : buttonHeaderLink[]
}

//----------Intro----------
export interface introStart{
    supheading: string,
    heading: string,
    subheading : string,
    background: srcs
}

//----------Options----------
export enum optionIconPosition{
    Null = "icon-null",
    Left = "icon-left",
    Right = "icon-right"
}
export type optionsSelectLink = {
    value : string,
    isDisabled : boolean
}
export interface flightsOptionsItem{
    title : string,
    iconValue : string | null,
    iconPosition : optionIconPosition,
    value : string | optionsSelectLink[],
    isActive : boolean | null
}
export interface hotelsOptionsItem{
    title : string,
    iconValue : string | null,
    iconPosition : optionIconPosition,
    isBigger : boolean,
    value : string | optionsSelectLink[],
    isActive : boolean | null
}
export enum optionsType{
    Flights = 0,
    Hotels = 1
}

interface optionsHeaderLink{
    value : string,
    iconValue : string,
    isActive : boolean
}
interface optionsHeader{
    start : optionsHeaderLink[],
    flights : string,
    hotels : string
}
export interface options{
    header : optionsHeader,
    flights : flightsOptionsItem[],
    hotels : hotelsOptionsItem[]
}

//-----------TripVariant----------
export interface tripVariantsItem{
    image : imageVariants
    title : string,
    features : string[],
    href : string
}

//----------Choice----------
export interface choiceItem{
    image : srcs,
    text : defaultBlockText
}

//----------Reviews----------
export interface reviewsItem{
    image : imageVariants,
    heading : string,
    info : string,
    button : string,
    starsCount : number,
    author : string,
    hotel : string,
    hotelLink : string,
    isActive : boolean
}

//-----------Footer----------
interface post{
    heading: string,
    subheading: string,
    info: string,
    input: string,
    button: string,
    image : string
}

interface infoMain{
    image : image,
    socials : string[]
}
export interface footerLink{
    value : string,
    href : string
}
export interface footerItem{
    title : string,
    list : footerLink[],
    isActive : boolean
}
interface main{
    info : infoMain,
    items : footerItem[]
}

export interface footer{
    post : post,
    main : main
}

//----------Map----------
interface mapItemScrs{
    jpeg : string,
    webp : string,
    svg : string
}
export interface mapItemImage{
    srcs : mapItemScrs,
    alt : string
}
export interface mapItem{
    title : string,
    info : string,
    image : mapItemImage
}

export interface map{
    header : defaultBlockText,
    items : mapItem[],
    background : srcs
}

//----------Travels----------
export interface travelsItem{
    title : string,
    subtitle : string,
    price : number,
    button : string,
    href : string,
    image : imageVariants
}

export interface travels{
    header : defaultBlockText,
    items : travelsItem[]
}

//----------Offer----------
export interface offerItem{
    title: string,
    info : string,
    button : string,
    price : number,
    href : string,
    images : imageVariants[]
}

export interface offer{
    header : defaultBlockText,
    item : offerItem
}