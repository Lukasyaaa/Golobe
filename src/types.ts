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

export interface selectValue{
    startActive : number,
    items : string[]
}
export interface defaultSelect{
    title : string,
    links : link[]
}

export interface setter<T>{
    value : T,
    set : (newValue : T) => void
}

export interface sectionHeaderButton{
    active : string,
    passive : string
}
export interface sectionHeader{
    title : string,
    text : string,
    buttonShowMore : sectionHeaderButton
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
    value : selectValue,
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
    value : selectValue,
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

export interface flights{
    intro : introVariant,
    map : map,
    travels : variantTravels,
    offers : offers
}

//-------------------------Hotels-------------------------
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

export interface hotels{
    intro : introVariant,
    recent : recent,
    travels : variantTravels,
    offers : offers
}