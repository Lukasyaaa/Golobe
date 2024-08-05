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

export enum contentPart{
    Flights = "Flights",
    Hotels = "Hotels"
}

interface itemsHeaderSelect{
    list : string[],
    activeItem : number,
    isActive : boolean
}
export interface itemsHeader{
    countVisibleItems : number,
    select: itemsHeaderSelect
}
interface itemsMore{
    active : string,
    passive : string
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

//----------Start----------
export interface startTextStore{
    intro : introStart,
    tripVariants : sectionHeaderItems<tripVariantsItem>,
    choice : choiceItem[],
}
//----------Flights----------
export interface flighsStore{
    intro : introVariant,
    map : map,
    travels : travels,
    offer : offer
}
//----------Hotels----------
export interface hotelsStore{
    intro : introVariant
    travels : travels,
    offer : offer
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
export interface optionsSelectValue{
    items : string[],
    activeItem : number
}
export interface optionsFlightsItem{
    title : string,
    iconValue : string | null,
    iconPosition : optionIconPosition,
    value : string | optionsSelectValue,
    isActive : boolean | null
}
export interface optionsHotelsItem{
    title : string,
    iconValue : string | null,
    iconPosition : optionIconPosition,
    isBigger : boolean,
    value : string | optionsSelectValue,
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
    Trips = "Trips",
    Freebies = "Freebies",
    Amenities = "Amenities"
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
    activeItem : number[],
    itemsToShow : number,
    isActive : boolean
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

export interface navbarPart{
    heading : string,
    items : navbarItem[]
}

export interface navbar{
    flights: navbarPart,
    hotels: navbarPart,
}

//----------Flights Options----------
interface sortFlightsVariantSubtitle{
    price : number,
    time : number
}
export interface sortFlightsVariant{
    title : string,
    subtitle : sortFlightsVariantSubtitle
}
export interface sortFlights{
    items : sortFlightsVariant[],
    activeItem : number,
    isActive : boolean
}

export interface sortHotelsVariant{
    title : string,
    count : number
}
export interface sortHotels{
    items : sortHotelsVariant[],
    activeItem : number,
    isActive : boolean
}
export interface sorts{
    flights : sortFlights,
    hotels : sortHotels,
}

export enum sortParent{
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
export enum flightType{
    RoundTrip = "Round trip", 
    OnWay = "On Way", 
    MultiCity = "Multi-City", 
    MyDatesAreFlexible = "My Dates Are Flexible"
}

export interface flightsItemScheduleItem{
    departureTime : time,
    arrivalTime : time,
    service : airlines,
    numberOfTransfers : number,
    from : string,
    to : string
}
interface flightsItemReview{
    rating : number,
    ratingText : string,
    countReviews : number
}
interface flightsItemPrice{
    main : number,
    sub : string
}
export interface flightsItem{
    type : flightType,
    images : imageVariants[],
    review : flightsItemReview
    price : flightsItemPrice
    schedule : flightsItemScheduleItem[],
    buttonText : string
}
export interface flightsItems{
    header : itemsHeader,
    items: flightsItem[],
    isShowAll: boolean,
    button : itemsMore
}

//----------Hotels Recent----------
export interface recentItem{
    image : imageVariants,
    title : string,
    countHotels : number
}
export interface recent{
    heading : string,
    items : recentItem[]
}

//----------Hotels Items----------
export enum amenities{
    OutdoorPool = "Outdoor pool",
    IndoorPool = "Indoor pool",
    Restaurant = "Restaurant",
    RoomService = "Room service",
    Fitness = "Fitness",
    Gym = "Gym",
    BarLounge = "Bar/Lounge",
    FreeWiFi = "Free Wi-Fi",
    TeaCoffeeMachine = "Tea/coffee machine",
    AroundTheClockFrontDesk = "24hr front desk",
    AirConditioned = "Air-conditioned",
}
export enum freeOptions{
    Breakfast = "Free breakfast", 
    Parking = "Free parking", 
    Internet = "Free internet", 
    AirportShuttle = "Free airport shuttle", 
    Cancellation = "Free cancellation"
}

export enum placesType{
    Hotels = "Hotels",
    Motels = "Motels",
    Resorts = "Resorts"
}

interface hotelsItemPrice{
    pre : string,
    main : number,
    post : string
}
interface hotelsItemStars{
    count : number,
    post : string
}
interface hotelsItemReview{
    rating : number,
    ratingText : string,
    countReviews : number
}
interface amenitiesHotelsItem{
    items : string[],
    isActive : boolean
}
export interface hotelsItem{
    id : number,
    type : placesType,
    image : imageVariants,
    title : string,
    price : hotelsItemPrice,
    location : string,
    amenities : amenitiesHotelsItem,
    stars : hotelsItemStars,
    review : hotelsItemReview,
    buttonText : string
}
export interface hotelsItems{
    header : itemsHeader,
    items: hotelsItem[],
    isShowAll: boolean,
    button : itemsMore
}