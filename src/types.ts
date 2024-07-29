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
export interface time{
    hour : number,
    minute : number,
    meridiem : meridiem
}

//----------Header----------
interface headerButton{
    href : string,
    value : string
}
interface headerLink{
    href : string,
    value : string,
    iconValue : string,
}
interface headerLinks{
    items : headerLink[],
    activeItem : number
}
interface headerImg{
    start : string,
    another : string,
}
export interface header{
    image : headerImg,
    links : headerLinks,
    buttons : headerButton[]
}

//----------Intro----------
export interface introStart{
    supheading : string,
    heading : string,
    subheading : string,
    background : srcs
}

//----------Options----------
export enum optionIconPosition{
    Null = "icon-null",
    Left = "icon-left",
    Right = "icon-right"
}
export interface optionsSelectLink{
    value : string,
    isDisabled : boolean
}
export interface optionsFlightsItem{
    title : string,
    iconValue : string | null,
    iconPosition : optionIconPosition,
    value : string | optionsSelectLink[],
    isActive : boolean | null
}
export interface optionsHotelsItem{
    title : string,
    iconValue : string | null,
    iconPosition : optionIconPosition,
    isBigger : boolean,
    value : string | optionsSelectLink[],
    isActive : boolean | null
}

interface optionsHeaderLink{
    value : string,
    iconValue : string,
}
interface optionsHeaderStart{
    items : optionsHeaderLink[],
    activeItem : number
}
interface optionsHeader{
    start : optionsHeaderStart,
    flights : string,
    hotels : string
}
interface optionsFooterSend{
    flights : string,
    hotels : string
}
interface optionsFooter{
    promoButtonText : string,
    sendButtonText : optionsFooterSend
}
export interface options{
    header : optionsHeader,
    flights : optionsFlightsItem[],
    hotels : optionsHotelsItem[],
    footer : optionsFooter
}

export enum optionsItemsType{
    Flights = 0,
    Hotels = 1
}
export enum optionsBlockType{
    BOTH_HEADER_TYPES = 0,
    FLIGHTS_HEADER_TYPE = 1,
    HOTELS_HEADER_TYPE = 2,
    ONLY_ITEMS = 3
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
    heading : string,
    info : string,
    button : string
    href : string
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

interface socialItem{
    icon : string,
    href : string
}
interface infoMain{
    image : image,
    socials : socialItem[]
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

//----------Navbar----------
export enum navbarFromToValueTypes{
    Number = 0,
    Time = 1
}
interface navbarFromToValueTime{
    from : time,
    to : time,
}
interface navbarFromToValueNumber{
    from : number,
    to : number,
    min : number,
    max : number
}

export enum navbarItemType{
    Radio = 0,
    Checkbox = 1,
    FromTo = 2
}

export enum navbarTitle{
    Airlines = "Airlines",
    Rating = "Rating",
    Price = "Price",
    DepartureTime = "Departure Time",
    Trips = "Trips"
}

export interface navbarFromToTime{
    title : string,
    value : navbarFromToValueTime,
    valueType : navbarFromToValueTypes.Time,
    type : navbarItemType.FromTo,
    isActive : boolean
}
export interface navbarFromToNumber{
    title : string,
    value : navbarFromToValueNumber,
    valueType : navbarFromToValueTypes.Number,
    type : navbarItemType.FromTo,
    isActive : boolean
}

interface navbarCheckboxesValue{
    items : string[],
    activeItem : number[];
}
export interface navbarCheckboxes{
    title : string,
    value : navbarCheckboxesValue,
    type : navbarItemType.Checkbox,
    isActive : boolean
}

interface navbarRadioValue{
    items : string[],
    activeItem : number
}
export interface navbarRadio{
    title : string,
    value : navbarRadioValue,
    type : navbarItemType.Radio,
    isActive : boolean
}

export type navbarItem = navbarFromToTime | navbarFromToNumber | navbarCheckboxes | navbarRadio;

export interface navbar{
    heading : string,
    items : navbarItem[]
}

//----------Flights Options----------
interface  flightsOptionSubtitle{
    price : number,
    time : number
}

export interface flightsOption{
    title : string,
    subtitle : flightsOptionSubtitle
}

export interface flightsOptions{
    items : flightsOption[],
    activeItem : number,
    isActive : boolean
}

export enum flightsOptionParent{
    CONTAINER = "CONTAINER",
    LIST = "LIST"
}

//----------Flights Items----------
export enum meridiem{
    AM = "am",
    PM = "pm"
}
export enum airlines{
    Emirates = "Emirates",
    FlyDubai = "Fly Dubai",
    Qatar = "Qatar",
    Etihad = "Etihad"
}
export interface flightsItemScheduleItem{
    departureTime : time,
    arrivalTime : time,
    service : airlines,
    numberOfTransfers : number,
    from : string,
    to : string
}
export interface flightsItem{
    images : imageVariants[],
    ratingNumb : number,
    ratingText : string,
    countReviews : number,
    subprice : string,
    price : number,
    schedule : flightsItemScheduleItem[],
    buttonText : string
}
interface flightsItemsSelect{
    list : string[],
    activeItem : number,
    isActive : boolean
}
interface flightsItemsHeader{
    countVisibleItems : number,
    select: flightsItemsSelect
}
export interface flightsItems{
    header : flightsItemsHeader,
    items: flightsItem[],
    button : string
}