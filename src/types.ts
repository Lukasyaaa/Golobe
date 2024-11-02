//-------------------------COMMON------------------------- 
interface srcs{ 
    webp : string, 
    jpeg : string 
} 
export interface imageVariants{ 
    srcs : srcs, 
    alt : string 
} 
interface image{ 
    src : string, 
    alt : string 
} 
 
export interface contentPartValues{ 
    flights : string, 
    hotels : string 
} 
export enum contentPart{ 
    Flights = "Flights", 
    Hotels = "Hotels" 
} 
 
interface link{ 
    path : string, 
    description : string 
} 
 
export interface selectValue<valueType>{ 
    activeLink : number, 
    links : valueType[] 
} 
export interface defaultSelect{ 
    title : string, 
    links : link[] 
} 
 
export interface setter<T>{ 
    value : T, 
    set : (newValue : T) => void 
} 
 
interface buttonStates{
    active : string, 
    passive : string 
}

export interface sectionHeader{ 
    title : string, 
    text : string, 
    buttonShowMore : buttonStates 
} 
export interface section<T>{ 
    header : sectionHeader, 
    items : T[], 
    maxShow : number 
} 
 
export interface defaultBlockText{ 
    title : string, 
    subtitle : string, 
    button : string 
} 
 
export enum socialType{ 
    Facebook = "icon-facebook", 
    Instagram = "icon-inst", 
    Twitter = "icon-twitter", 
    YouTube = "icon-youtube" 
} 
 
export enum meridiem{ 
    AM = "am", 
    PM = "pm" 
} 
 
export interface time{ 
    hour : number, 
    minute : number, 
    meridiem : meridiem 
} 

export interface configurateItemsHeader{
    maxShow : number,
    sort : selectValue<string>
}

export interface shortReview{
    rating : number,
    countReviews : number
}

//------------Variant------------ 
export interface introVariant{ 
    heading : string, 
    subheading : string, 
    background : srcs 
} 
 
export interface variantTravelsItem{ 
    image : srcs, 
    city : string, 
    shortInfo : string, 
    price : number, 
    linkPath : string 
} 
export interface variantTravels{ 
    header : sectionHeader, 
    items : variantTravelsItem[], 
    buttonBook : string, 
    maxShow : number 
} 
 
export interface offersItem{ 
    title : string, 
    price : number, 
    info : string, 
    linkPath : string, 
    images : imageVariants[] 
} 
export interface offers{ 
    header : sectionHeader, 
    items : offersItem[], 
    buttonBook : string, 
    idShowedItem : number 
} 
 
//-------------------------HEADER------------------------- 
interface headerImageVariantsSrcs{ 
    black : string, 
    white : string 
} 
interface headerImageVariants{ 
    srcs : headerImageVariantsSrcs, 
    alt : string 
} 
interface headerButtons{ 
    logIn : string, 
    signIn : string, 
    favouritesText : string 
} 
export interface header{ 
    links : contentPartValues, 
    logo : headerImageVariants, 
    authorization : headerButtons 
} 
 
//-------------------------OPTIONS------------------------- 
export enum optionsNeededBlocks{ 
    OnlyInputs = 0, 
    BothHeaders = 1, 
    FlightHeader = 2, 
    HotelHeader = 3 
} 
 
export enum optionsTitle{ 
    FromTo = "From - To", 
    Trip = "Trip", 
    DepartReturn = "Depart- Return", 
    PassengerAndClass = "Passenger - Class", 
    Destination = "Enter Destination", 
    CheckIn = "Check In", 
    CheckOut = "Check Out", 
    RoomsAndGuests = "Rooms & Guests" 
} 
export enum optionsIconPosition{ 
    Null = "", 
    Left = "icon-left", 
    Right = "icon-right" 
} 
export enum optionType{ 
    Input = "Input", 
    Select = "Select" 
} 
 
interface optionsFlightsSelect{ 
    title : optionsTitle, 
    value : selectValue<string>, 
    type : optionType.Select 
} 
interface optionsFlightsInput{ 
    title : optionsTitle, 
    value : string, 
    iconPosition : optionsIconPosition, 
    type : optionType.Input 
} 
export type optionsFlightItems = (optionsFlightsInput | optionsFlightsSelect)[]; 
 
interface optionsHotelsSelect{ 
    title : optionsTitle, 
    value : selectValue<string>, 
    isBigger : boolean, 
    type : optionType.Select 
} 
interface optionsHotelsInput{ 
    title : optionsTitle, 
    value : string, 
    iconPosition : optionsIconPosition, 
    isBigger : boolean, 
    type : optionType.Input 
} 
export type optionsHotelsItems = (optionsHotelsInput | optionsHotelsSelect)[]; 
 
interface optionsItems{
    flights : optionsFlightItems, 
    hotels : optionsHotelsItems 
} 
 
interface optionsFooter{ 
    addPromoText : string, 
    showText : contentPartValues 
} 
 
interface optionsHeader{ 
    hotels : string, 
    flights : string, 
    onlyFlights : string, 
    onlyHotels : string, 
} 
 
export interface options{ 
    header : optionsHeader, 
    inputs : optionsItems, 
    footer : optionsFooter 
} 
 
//-------------------------FOOTER------------------------- 
interface postForm{ 
    inputPlaceholder : string, 
    buttonSumbit : string 
} 
export interface post{ 
    heading: string, 
    title: string, 
    subtitle: string, 
    form : postForm, 
    image : image 
} 
 
 
interface foooterSocial{ 
    type : socialType, 
    path : string 
} 
interface footerMainInfo{ 
    logo : image, 
    socials : foooterSocial[] 
} 
interface footerMain{ 
    info : footerMainInfo, 
    groups : defaultSelect[], 
} 
 
export interface footer{ 
    post : post, 
    main : footerMain 
} 
 
//-------------------------START------------------------- 
interface startIntro{ 
    background : srcs, 
    supheading : string, 
    heading : string, 
    subheading : string 
} 
 
 
export enum travelAvailable{ 
    Flights = "Flights", 
    Hotels = "Hotels", 
    Resorts = "Resorts" 
} 
export interface travelsItem{ 
    image : imageVariants, 
    city : string, 
    available : travelAvailable[] 
} 
 
export interface chooseOption{ 
    title : string, 
    subtitle : string, 
    link : string, 
    background : srcs 
} 
interface choose{ 
    flights : chooseOption, 
    hotels : chooseOption 
} 
 
interface reviewItemHotel{ 
    company : string, 
    location : string, 
    linkToLocation : string 
} 
export interface reviewItem{ 
    title : string, 
    info : string, 
    countStars : number, 
    author : string, 
    hotel : reviewItemHotel 
    image : imageVariants 
} 
export interface reviewsLinkToLocation{ 
    googleLogo : string, 
    subGoogleLogo : string 
} 
interface reviews{ 
    header : sectionHeader, 
    items : reviewItem[], 
    buttonViewAll : string, 
    linkToLocation : reviewsLinkToLocation 
    maxShow : number 
} 
 
export interface start{ 
    intro : startIntro, 
    travels : section<travelsItem>, 
    choose : choose, 
    reviews : reviews 
} 
 
//-------------------------FLIGHTS------------------------- 
export enum mapItemType{ 
    Default = "Default", 
    PartOfMap = "PartOfMap" 
} 
export enum mapPartType{ 
    Washington = "wash", 
    Brazil = "braz", 
    Alzhir = "alzh", 
    Aralsk = "arsk", 
    Japan = "japn", 
} 
interface mapImageVariants{ 
    main : imageVariants, 
    arrow : image 
} 
export interface mapPart{ 
    type : mapItemType.PartOfMap, 
    location : mapPartType, 
    ticketNumb : number, 
    image : mapImageVariants, 
    linkPath : string 
} 
export interface mapPropose{ 
    type : mapItemType.Default, 
    ticketNumb : number, 
    image : imageVariants, 
    linkPath : string 
} 
export type mapItem = mapPart | mapPropose; 
interface map{ 
    header : sectionHeader, 
    items : mapItem[], 
    background : srcs 
} 
 
export interface flightsHome{ 
    intro : introVariant, 
    map : map, 
    travels : variantTravels, 
    offers : offers 
} 
 
//-------------------------HOTELS------------------------- 
export interface recentItem{ 
    image : imageVariants, 
    city : string, 
    countPlaces : number, 
    linkPath : string 
} 
interface recent{ 
    heading : string, 
    items : recentItem[]; 
} 
 
export interface hotelsHome{ 
    intro : introVariant, 
    recent : recent, 
    travels : variantTravels, 
    offers : offers 
} 
 
//-------------------------NAVBAR------------------------- 
export enum navbarTitles{ 
    Rating = "Rating", 
    Price = "Price", 
    Amenities = "Amenities", 
    Freebies = "Freebies", 
    Airlines = "Airlines", 
    Trips = "Trips", 
    DepartureTime = "Departure Time" 
} 
export enum navbarItemType{ 
    Radios = 0, 
    Checkboxes = 1, 
    FromToNumbers = 2, 
    FromToTime = 3 
} 
export enum airlines{ 
    Emirated = "Emirated", 
    FlyDubai = "FlyDubai", 
    Qatar = "Qatar", 
    Etihad = "Etihad" 
} 
export enum tripsType{ 
    RoundTrip = "Round Trip", 
    OnWay = "On Way", 
    MultiCity = "Multi-City", 
    MyDatesAreFlexible = "My Dates Are Flexible" 
} 
export enum amenities{ 
    Fitness = "Fitness", 
    AirConditioned = "Air-conditioned", 
    InsidePool = "Inside Pool", 
    OutsidePool = "Outside Pool", 
    FrontDeskAroundTheClock = "24-h front desk", 
    FreeBreakfast = "Free Breakfast", 
    FreeParking = "Free Parking", 
    FreeInternet = "Free Internet", 
    FreeAirportShuttle = "Free airport shuttle", 
    FreeCancellation = "Free cancelation" 
} 
 
interface navbarRadiosValue{ 
    items : string[],  
    currentActive: number 
} 
export interface navbarRadios{ 
    title : navbarTitles,
    value : navbarRadiosValue, 
    type : navbarItemType.Radios 
} 
 
interface navbarCheckboxesValue{ 
    items : string[],  
    currentActive: number[], 
    isShowAll : boolean, 
    maxShow : number 
} 
export interface navbarCheckboxes{ 
    title : navbarTitles,
    value : navbarCheckboxesValue, 
    type : navbarItemType.Checkboxes 
} 
 
export interface navbarFromToTimeValue{ 
    from : time, 
    to : time 
} 
interface navbarFromToTime{ 
    title : navbarTitles,
    value : navbarFromToTimeValue,
    type : navbarItemType.FromToTime 
} 
 
export interface navbarFromToNumberValue{ 
    from : number, 
    to : number, 
    max : number, 
    min : number 
} 
interface navbarFromToNumber{ 
    title : navbarTitles,
    value : navbarFromToNumberValue,
    type : navbarItemType.FromToNumbers 
} 
export type navbarFromTo = navbarFromToNumber | navbarFromToTime;
 
interface navbarPart{ 
    heading : string, 
    items : (navbarRadios | navbarCheckboxes | navbarFromTo)[] 
} 
 
export interface navbar{ 
    flights : navbarPart, 
    hotels : navbarPart 
}

//-------------------------SORT------------------------- 
export enum sortTitles{
    Cheapest = "Cheapest",
    Best = "Best",
    Quickest = "Quickest",
    CountTransfers = "Count Transfers",
    Motels = "Motels",
    Hotels = "Hotels",
    Resorts = "Resorts"
}

interface sortFlightsCategorySubtitle{
    price : number,
    flyTime : number
}
export interface sortFlightsCategory{
    title : sortTitles,
    subtitle : sortFlightsCategorySubtitle
}
export interface sortFlights{
    items : sortFlightsCategory[],
    currentActive : number,
    maxShow : number
}

export interface sortHotelsCategory{
    title : sortTitles,
    subtitle : number
}
export interface sortHotels{
    items : sortHotelsCategory[],
    currentActive : number,
    maxShow : number
}
export interface sort{
    flights : sortFlights,
    hotels : sortHotels,
    buttonShowMore : string
}

//-------------------------FLIGHTS ITEMS-------------------------
export interface flightSchedulePart{
    takeoffTime : time,
    arrayTime : time,
    airline : airlines,
    transfersCount : number,
    from : string,
    to : string
}
interface flightSchedule{
    depart : flightSchedulePart,
    return : flightSchedulePart,
    currentChoosed : number[]
}
export interface flight{
    id : number,
    type : tripsType,
    images : imageVariants[],
    shortReview : shortReview,
    price : number,
    schedule : flightSchedule
}
export interface flights{
    elements : flight[],
    isShowAll : boolean,
    buttonViewMore : buttonStates,
    buttonLink : string
}

//-------------------------HOTELS ITEMS-------------------------
export enum hotelType{
    Hotel = 0,
    Motel = 1,
    Resorts = 2,
}

interface hotelImages{
    main : imageVariants,
    another : imageVariants[]
}
export interface hotel{
    id : number,
    type : sortTitles,
    images : hotelImages,
    title : string,
    price : number
    location : string,
    countStars : 5 | 4 | 3 | 2 | 1 | 0,
    amenities : amenities[],
    shortReview : shortReview,
}
export interface hotels{
    elements : hotel[],
    isShowAll : boolean,
    buttonViewMore : buttonStates,
    buttonLink : string,
}