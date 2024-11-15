import { ticketFactTitles } from "./components/Check/Ticket/Ticket"

//-------------------------COMMON------------------------- 
interface srcs{ 
    webp : string, 
    jpeg : string 
} 
export interface imageVariants<T>{ 
    srcs : srcs, 
    alt : T 
} 
export interface image{ 
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
 
export interface link{ 
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
 
export interface units{ 
    hour : number, 
    minute : number, 
    meridiem : meridiem 
} 
export interface time{
    day : number,
    month : number,
    year : number,
    units : units
}
interface date{
    day : number,
    month : number,
    year : number
}

export interface configurateItemsHeader{
    maxShow : number,
    sort : selectValue<string>
}

export interface shortReview{
    rating : number,
    countReviews : number
}

export enum flightDirection{
    Return = "Return",
    Depart = "Depart",
    Two = "Two",
    None = "None"
}

export interface priceDetails{
    baseFare : number,
    discount : number,
    taxes : number,
    serviceFee : number
}

export enum availableVariants{
    Facebook = "Facebook",
    Google = "Google",
    Apple = "Apple",
    Mail = "Mail"
}

export enum fieldGroupsTitles{
    FirstName = "First Name",
    LastName = "Last Name",
    Email = "Email",
    PhoneNumber = "Phone Number",
    Password = "Password",
    ConfirmPassword = "Сonfirm Password",
    EnterCode = "Enter Code",
    CardNumber = "Card Number",
    ExpDate = "Exp. Date",
    CVC = "CVC",
    NameOnCard = "Name on Card",
    EnterDestination = "Enter Destination",
    CheckIn = "Check In",
    CheckOut = "Check Out",
    FromTo = "From - To",
    DepartReturn = "Depart - Return",
    PassengerClass = "Passenger - Class"
}
export interface fieldGroup{
    placeholder : string,
    label : string,
    type : fieldGroupsTypes
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
    images : imageVariants<string>[] 
} 
export interface offers{ 
    header : sectionHeader, 
    items : offersItem[], 
    buttonBook : string, 
    idShowedItem : number 
} 
 
//-------------------------HEADER------------------------- 
interface headerImageSrcs{ 
    black : string, 
    white : string 
} 
interface headerImage{ 
    srcs : headerImageSrcs, 
    alt : string 
} 
interface headerAuthorization{ 
    signIn : string, 
    signUp : string, 
    favourites : string 
} 
export interface header{ 
    links : contentPartValues, 
    logo : headerImage, 
    authorization : headerAuthorization 
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
    image : imageVariants<string>, 
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
    hotel : reviewItemHotel,
    image : imageVariants<string> 
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
    main : imageVariants<string>, 
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
    image : imageVariants<string>, 
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
    image : imageVariants<string>, 
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
export enum hotelsIncludes{ 
    Fitness = "Fitness center", 
    AirConditioned = "Air-conditioned", 
    InsidePool = "Inside Pool", 
    OutsidePool = "Outside Pool", 
    Spa = "Spa and wellness center",
    Restaurant = "Restaurant",
    RoomService = "Room Service",
    BarLounge = "Bar/Lounge",
    FreeWifi = "Free WiFi",
    TeaCoffeMachind = "Tea/Coffe Machine",
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
    from : units, 
    to : units
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
export interface airlinePolicie{
    type : airlines,
    elements : string[]
}

export enum seatsTypeCategory{
    Economy = "Economy",
    First = "First",
    Busines = "Busines"
}

export enum flightAmenities{
    Fast = "Fast",
    FastFood = "Fast Food",
    ManySeats = "Many Seats",
    Punctual = "Punctual"
}

interface flightDeparturePlace{
    city : string,
    image : imageVariants<string>
}
interface flightArrayPlace{
    city : string,
    airport : string,
    full : string
    image : imageVariants<string>
}
interface seatsType{
    images : imageVariants<string>[],
    seatsCount : number,
    safeSeats : number[]
}
export interface seatsTypes{
    economy : seatsType,
    business : seatsType,
    first : seatsType
}

export interface flightSchedulePart{
    image : imageVariants<string>,
    takeoffTime : time,
    arrayTime : time,
    airline : imageVariants<airlines>,
    airplane : string,
    transfersCount : number,
    price : priceDetails,
    amenities : flightAmenities[],
    departurePlace : flightDeparturePlace,
    arrayPlace : flightArrayPlace,
    seatsTypes : seatsTypes,
    from : string,
    to : string,
    gate : string,
    isChoosed : boolean
}
export interface flightSchedule{
    depart : flightSchedulePart,
    return : flightSchedulePart
}
export interface flight{
    id : number,
    type : tripsType,
    shortReview : shortReview,
    schedule : flightSchedule
}
export interface flights{
    elements : flight[],
    buttonViewMore : buttonStates,
    buttonLink : string
}

//-------------------------HOTELS ITEMS-------------------------
export enum hotelAdvantages{
    NearPark = "Near Park",
    NearNightlife = "Near Nightlife",
    NearTheatre = "Near Theatre",
    CleanHotel = "Clean Hotel"
}
export enum hotelType{
    Hotel = 0,
    Motel = 1,
    Resorts = 2,
}
export enum roomAdvantages{
    SuperiorRoom = "Superior Room",
    CityView = "City View"
}

interface hotelImages{
    main : imageVariants<string>,
    another : imageVariants<string>[],
    maxShow : number
}
export interface hotelLocation{
    city : string,
    full : string,
    image : imageVariants<string>
}

export interface hotelReview{
    avatar : imageVariants<string>,
    grade : number,
    author : string,
    info : string
}
interface hotelReviews{
    elements : hotelReview[],
    maxShow : number
}

interface roomBeds{
    double : number,
    twin : number
}
export interface room{
    image : imageVariants<string>,
    advantages : roomAdvantages[],
    countBeds : roomBeds,
    price : priceDetails
}

export interface hotelsIncludesContent{
    elements : hotelsIncludes[],
    maxInCol : number,
    maxShow : number
}

export interface hotel{
    id : number,
    type : sortTitles,
    logo : imageVariants<string>,
    images : hotelImages,
    title : string,
    location : hotelLocation,
    advantages : hotelAdvantages[],
    rooms : room[],
    reviews : hotelReviews,
    countStars : 5 | 4 | 3 | 2 | 1 | 0,
    overview : string,
    includes : hotelsIncludesContent
}
export interface hotels{
    elements : hotel[],
    buttonViewMore : buttonStates,
    buttonLink : string,
    buttonShowAllImages : string,
    buttonRoomLink : string
}

//-------------------------PAYMENT-------------------------
export enum paymentTitles{
    payFull = "Pay in full",
    payParts = "Pay part now, part later"
}

export interface paymentMethod{
    type : paymentTitles,
    description : string
}

export interface payment{
    methods : paymentMethod[],
    currentActive : number,
    linkInfo : link
}

//-------------------------CARD-------------------------
export interface cardExpDate{
    month : number,
    year : number
}

export interface card{
    number : number,
    cvc : number,
    expDate : cardExpDate,
    name : string,
    country : string,
    isSavedInfo : boolean
}

export enum typeAddCardInput{
    Entry = "Entry",
    Select = "Select"
}

export enum addCardInputTitles{
    Card = "Card Number",
    ExpDate = "Exp. Date",
    CVC = "CVC",
    Name = "Name on Card",
    CountryOrRegion = "Country or Region"
}

export interface addCardInputValueEntry{
    type : typeAddCardInput.Entry,
    description : addCardInputTitles,
    placeholder : string
}
interface addCardInputValueSelect{
    type : typeAddCardInput.Select,
    description : addCardInputTitles,
    links : string[]
}
interface addCardInput{
    isMassive : false,
    value : addCardInputValueEntry | addCardInputValueSelect
}
interface addCardMassive{
    isMassive : true,
    value : (addCardInputValueEntry | addCardInputValueSelect)[]
}

interface addCardFirstAppear{
    title : string,
    description : string
}
interface addCardHeader{
    firstAppear : addCardFirstAppear,
    nextAppear : string
}
interface addCardButton{
    firstAppear : string,
    nextAppear : string
}
export interface addCard{
    header : addCardHeader,
    inputs : (addCardInput | addCardMassive)[],
    saveText : string,
    buttonAdd : addCardButton,
    privacyPolicy : string
}

//-------------------------AUTHORIZATION-------------------------
export interface availableAuthorizationVariantIcon{
    type : availableVariants,
    subType : string,
    isImage : false,
    isBigger : boolean
}
export interface availableAuthorizationVariantImage{
    type : image,
    subType : string,
    isImage : true,
    isBigger : boolean
}

export interface authorizationText{
    heading : string,
    placeholder : string,
    description : string,
    continueButton : string,
    availableVariants : (availableAuthorizationVariantIcon | availableAuthorizationVariantImage)[]
}

interface flightTicketSchedulePart{
    place : string,
    time : time
}
export interface flightTicket{
    airline : imageVariants<string>,
    from : flightTicketSchedulePart,
    to : flightTicketSchedulePart,
    gate : string,
    seatNumber : number
}

export interface hotelTicket{
    logo : imageVariants<string>,
    from : date,
    to : date,
    roomNumber : number | "On arrival"
}

export interface userFavourites{
    flights : number[],
    hotels : number[]
}

interface userInfoAddress{
    street : string,
    postalCode : string
}
export interface userInfo{
    banner : image,
    ava : image,
    firstName : string,
    lastName : string,
    email : string,
    password : string,
    phoneNumber : string,
    isLogOut : boolean,
    address : userInfoAddress,
    dataBirth : date,
    cards : card[],
    flightsTickets : flightTicket[],
    hotelsTickets : hotelTicket[],
    favourites : userFavourites
}
export interface shortUserInfo{
    fisrtName : string,
    lastName : string,
    email : string,
    password : string,
    phoneNumber : string
}
//-------------------------Terms And Conditions-------------------------
interface paymentsBlock{
    title : string,
    list : string[]
}

interface contactInfo{
    companyName : string,
    building : string,
    poBox : string,
    helpLink : string
}
interface contactsBlock{
    title : string,
    pre : string,
    info : contactInfo
}

export interface termsConditions{
    heading : string,
    payments : paymentsBlock,
    contacts : contactsBlock
}

//-------------------------Login-------------------------
export interface accessFieldGroup{
    placeholder : string,
    label : fieldGroupsTitles,
    type : fieldGroupsTypes
}
interface fieldGroupMassive {
    value : accessFieldGroup[],
    isMassive : true
}
interface fieldGroupLoner {
    value : accessFieldGroup,
    isMassive : false
}

export enum fieldGroupsTypes{
    Text = "Text",
    Email = "Email",
    Password = "Password"
}

interface accessPropose{
    preLink : string,
    link : string
}
export interface accessPart{
    heading: string,
    explanation : string,
    fieldGroups : (fieldGroupMassive | fieldGroupLoner)[]
    checkboxText : string,
    isLogin : boolean,
    saveButton : string,
    propose : accessPropose,
    orText : string,
    availableVariants : (availableAuthorizationVariantIcon | availableAuthorizationVariantImage)[],
    images : imageVariants<string>[]
}
export interface access{
    signIn : accessPart,
    signUp : accessPart
}

//-------------------------FORGOT-PASSWORD-------------------------
export interface fieldGroupTyped{
    placeholder : string,
    label : fieldGroupsTitles
}

export interface forgotPassword{
    logo : image,
    heading : string,
    explanation : string,
    email : fieldGroupTyped,
    submitButton : string,
    orText : string,
    availableVariants : (availableAuthorizationVariantIcon | availableAuthorizationVariantImage)[],
    images : imageVariants<string>[]
}

//-------------------------VERIFY-CODE-------------------------
export interface verifyCode{
    logo : image,
    heading : string,
    explanation : string,
    code : fieldGroupTyped,
    verifyButton : string,
    resendText : accessPropose,
    images : imageVariants<string>[]
}

//-------------------------SET-PASSWORD-------------------------
export interface setPassword{
    logo : image,
    heading : string,
    explanation : string,
    firstInput : fieldGroupTyped,
    secondInput : fieldGroupTyped,
    saveButton : string,
    images : imageVariants<string>[]
}

//-------------------------ACCOUNT-TEXT-------------------------
interface aboutAccountText{
    heading : string,
    nameDescription : string,
    emailDescription : string,
    passwordDescription : string,
    phoneDescription : string,
    addressDescription : string,
    dateBirthDescription : string,
    addEmailButton : string,
    changeButton: string
}
interface historyAccountText{
    heading : string,
    flightsPartDescription : string,
    hotelsPartDescription : string,
    downloadButton : string,
    viewBy : string[],
}
interface paymentMethodsAccountText{
    heading : string,
    addCardButton : string
}

export interface accountText{
    uploadBannerButton : string,
    about : aboutAccountText,
    history : historyAccountText,
    paymentMethods : paymentMethodsAccountText
}