import React, { Fragment, useEffect, useMemo, useRef, useState, type FC } from "react";
import { useAppDispatch, useTypedSelector } from "../store";
import { SITE_PARTS, NEEDED_BLOCKS, NAVBAR_DESCRIPTION, NAVBAR_ITEM, getPrice, getFlyDuration, FLIGHTS_SORT_TYPE, intToDuration, HOTELS_SORT_TYPE, SELECT_DESCRIPTION_TYPE, FILL_RULE, STROKE_LINECAP, STROKE_LINEJOIN, ICON_POSITION, getSchedulePartsCount, SORT_BY, FREEBIES, AMENITIES, TRIP_TYPE, AIRLINES, getAirportByIATA, getCityFromAddress } from "../types";
import type { NavbarRangeValue, Hotel as HotelType, objType, FullOptionValue, Flight as FlightType, AirportInfo } from "../types";
import { fetchFlights } from "../store/flights";
import { fetchHotels } from "../store/hotels";
import { Options } from "../components/Common/Options/Options";
import { Navbar } from "../components/Common/Navbar/Navbar";
import { ChooseFull } from "../components/Common/Blocks/Choose/Choose";
import { useFlight } from "../hooks/useFlights";
import { useHotels } from "../hooks/useHotels";
import { Select } from "../components/Common/Blocks/Select/Select";
import { Text } from "../components/Common/Blocks/Select/Text";
import { Flight } from "../components/Flights/Catalog/Flight";
import { Hotel } from "../components/Hotels/Catalog/Hotel";
import { FullOption } from "../components/Common/Blocks/Choose/FullOption";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { flightsCatalogPath } from "../App";

interface Range{ 
    value: NavbarRangeValue<number>,
    description: typeof NAVBAR_DESCRIPTION.time | typeof NAVBAR_DESCRIPTION.price
}
interface RangeAbout extends Range{
    type: typeof NAVBAR_ITEM.priceRange | typeof NAVBAR_ITEM.timeRange
}

export interface RadiosState<T>{
    value: T, description: typeof NAVBAR_DESCRIPTION.rating
}
export interface RadiosAbout extends RadiosState<string[]>{
    type: typeof NAVBAR_ITEM.radios
}

type FlightCheckboxesDescriptions = typeof NAVBAR_DESCRIPTION.airlines | typeof NAVBAR_DESCRIPTION.trips;
type HotelCheckboxesDescriptions = typeof NAVBAR_DESCRIPTION.freebies | typeof NAVBAR_DESCRIPTION.amenities;
export interface CheckboxesState<T>{
    value: T,
    description: FlightCheckboxesDescriptions | HotelCheckboxesDescriptions
}
export interface CheckboxesAbout extends CheckboxesState<string[]>{
    maxShow: number, type: typeof NAVBAR_ITEM.checkboxes
}

export type NavbarFilterState = Range | RadiosState<number> | CheckboxesState<number[]>
export type NavbarFilterAbout = RangeAbout | RadiosAbout | CheckboxesAbout

export interface FetchedAirporstValue{
    from: AirportInfo, to: AirportInfo
}
export interface FetchedState<T>{
    value: T,
    id: number
}

interface CatalogProps{
    contentType: objType<typeof SITE_PARTS>
}
export const Catalog: FC<CatalogProps> = ({contentType}) => {    
    const {sort, container} = useTypedSelector(state => 
        ((contentType === SITE_PARTS.flights) ? state.flights : state.hotels).catalog
    );
    const {items, isLoading, error} = container; const maxShow = 4;
    const navigate = useNavigate();
    const location = useLocation();
    const navbar: NavbarFilterAbout[] = useMemo(
        () => {
            if(contentType === SITE_PARTS.flights){
                return([
                    { 
                        description: NAVBAR_DESCRIPTION.price, value: {from: 50, to: 1050},
                        type: NAVBAR_ITEM.priceRange
                    },
                    { 
                        description: NAVBAR_DESCRIPTION.time, value: { from: 0, to: 1440},
                        type: NAVBAR_ITEM.timeRange
                    },
                    { 
                        description: NAVBAR_DESCRIPTION.rating, value: ["0+", "1+", "2+", "3+", "4+"],
                        type: NAVBAR_ITEM.radios
                    },
                    {
                        description: NAVBAR_DESCRIPTION.airlines,
                        value: [AIRLINES.emirated, AIRLINES.flyDubai, AIRLINES.qatar, AIRLINES.etihad],
                        maxShow: 4, type: NAVBAR_ITEM.checkboxes
                    },
                    {
                        description: NAVBAR_DESCRIPTION.trips,
                        value: [TRIP_TYPE.roundTrip, TRIP_TYPE.onWay, TRIP_TYPE.multiCity],
                        maxShow: 4, type: NAVBAR_ITEM.checkboxes
                    }
                ])
            } else {
                return([
                    { 
                        description: NAVBAR_DESCRIPTION.price, value: {from: 50, to: 1050},
                        type: NAVBAR_ITEM.priceRange
                    },
                    { 
                        description: NAVBAR_DESCRIPTION.rating, value: ["0+", "1+", "2+", "3+", "4+"],
                        type: NAVBAR_ITEM.radios 
                    },
                    {
                        description: NAVBAR_DESCRIPTION.freebies,
                        value: [FREEBIES.breakfast, FREEBIES.parking, FREEBIES.internet, FREEBIES.airportShuttle, FREEBIES.cancellation],
                        maxShow: 5, type: NAVBAR_ITEM.checkboxes
                    },
                    {
                        description: NAVBAR_DESCRIPTION.amenities,
                        value: [AMENITIES.allDayFrontDesc, AMENITIES.airConditioned, AMENITIES.fitness, AMENITIES.indoorPool, AMENITIES.restaurant, AMENITIES.roomService, AMENITIES.spa, AMENITIES.bar],
                        maxShow: 4, type: NAVBAR_ITEM.checkboxes
                    }
                ])
            }
        }, []
    )
    const {fromTo, passengersClass, departReturn, tripType, city, checkInCheckOut, roomsGuests} = useParams();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(contentType === SITE_PARTS.flights) dispatch(fetchFlights());
        else dispatch(fetchHotels());
    }, [dispatch]);

    let [navbarFilters, setNavbarFilters] = useState<NavbarFilterState[]>(() => {
        let startFromPrice = 0, startToPrice = 0;
        if(contentType === SITE_PARTS.flights){
            let startFromTime = 0, startToTime = 0;
            navbar.forEach(({description, value}) => {
                if(description === NAVBAR_DESCRIPTION.price){
                    startFromPrice = value.from;
                    startToPrice = value.to;
                } else if(description === NAVBAR_DESCRIPTION.time){
                    startFromTime = value.from;
                    startToTime = value.to;
                }
            });
            let choosedTrips = [];
            const neededTripTypes = String(tripType).split("+");
            if(neededTripTypes.includes("Depart") || neededTripTypes.includes("Return") || neededTripTypes.includes("Round-Trip")){
                choosedTrips.push(0);
            }
            if(neededTripTypes.includes("On-Way")){
                choosedTrips.push(1)
            } 
            if(neededTripTypes.includes("Multi-City")){
                choosedTrips.push(2);
            }
            return([
                {description: NAVBAR_DESCRIPTION.price, value: {from: startFromPrice, to: startToPrice}},
                {description: NAVBAR_DESCRIPTION.time, value: {from: startFromTime, to: startToTime}},
                {description: NAVBAR_DESCRIPTION.rating, value: 0},
                {description: NAVBAR_DESCRIPTION.airlines, value: []},
                {description: NAVBAR_DESCRIPTION.trips, value: [...choosedTrips]},
            ]);
        } else {
            navbar.forEach(({description, value}) => {
                if(description === NAVBAR_DESCRIPTION.price){
                    startFromPrice = value.from;
                    startToPrice = value.to;
                }
            });
            return([
                {description: NAVBAR_DESCRIPTION.price, value: {from: startFromPrice, to: startToPrice}},
                {description: NAVBAR_DESCRIPTION.rating, value: 0},
                {description: NAVBAR_DESCRIPTION.freebies, value: []},
                {description: NAVBAR_DESCRIPTION.amenities, value: []},
            ]);
        }
    });

    const choosedTripsState = (navbarFilters.find(f => f.description === NAVBAR_DESCRIPTION.trips) as CheckboxesState<number[]>) || {value: undefined}
    useEffect(() => {
        if(choosedTripsState.value != undefined){
            const pathMassive: string[] = [];
            const tripsTypes: string[] = []
            if(fromTo !== undefined) pathMassive.push(fromTo);
            if(departReturn !== undefined) pathMassive.push(departReturn);
            if(passengersClass !== undefined) pathMassive.push(passengersClass);
            if(choosedTripsState.value.includes(0)) tripsTypes.push(
                ((String(tripType).split("+").includes("Depart")) 
                    ? "Depart"
                    : ((String(tripType).split("+").includes("Return")) ? "Return" : "Round-Trip")
                )
            ) 
            if(choosedTripsState.value.includes(1)) tripsTypes.push("On-Way");
            if(choosedTripsState.value.includes(2)) tripsTypes.push("Multi-City");
            pathMassive.push(tripsTypes.join("+"));
            navigate(flightsCatalogPath + "/" + pathMassive.join("/"))
         }
    }, [choosedTripsState.value])

    let [activeCategory, setActiveCategory] = useState<number>(Number(contentType === SITE_PARTS.stays));

    let [isOpened, setIsOpened] = useState<boolean>(false);
    let [activeLink, setActiveLink] = useState<number>(0);

    let [airports, setAirports] = useState<(FetchedState<FetchedAirporstValue> | null)[]>([]);
    useEffect(() => {
        if(contentType === SITE_PARTS.flights && fromTo !== undefined){
            async function fetchPlaces() {
                const results: (FetchedState<FetchedAirporstValue> | null)[] = await Promise.all(
                    (items as FlightType[]).map(async (f) => {
                        if(f.type === TRIP_TYPE.onWay){
                            const from = await getAirportByIATA(f.schedule.startPoint);
                            const to = await getAirportByIATA(f.schedule.endPoint);
                            return from && to ? { value: {from, to}, id: f.id } : null;
                        } else if(f.type === TRIP_TYPE.roundTrip){
                            const from = await getAirportByIATA(f.schedule.from.startPoint);
                            const to = await getAirportByIATA(f.schedule.to.startPoint);
                            return from && to ? { value: {from, to}, id: f.id } : null;
                        } else{
                            const from = await getAirportByIATA(f.schedule.parts[0].startPoint);
                            const to = await getAirportByIATA(f.schedule.endPoint);
                            return from && to ? { value: {from, to}, id: f.id } : null;
                        }
                    })
                );
                setAirports(results);
            }
            fetchPlaces();
        }
    }, [items])
    const flightStats = useFlight(
        items as FlightType[], navbarFilters, navbar, 
        sort[activeCategory] as objType<typeof FLIGHTS_SORT_TYPE>, 
        contentType, airports, fromTo, passengersClass, departReturn, String(tripType),
        location.pathname
    );
    
    let [cities, setCities] = useState<(FetchedState<string> | null)[]>([]);
    useEffect(() => {
        if(contentType === SITE_PARTS.stays && city !== undefined){
            async function fetchCities() {
                const results: (FetchedState<string> | null)[] = await Promise.all(
                    (items as HotelType[]).map(async (h) => {
                        const location = await getCityFromAddress(h.location.text);
                        return location === null ? null : {id: h.id, value: location};
                    })
                );
                setCities(results);
            }
            fetchCities();
        }
    }, [items])
    const hotelsStats = useHotels(
        items as HotelType[], navbarFilters, navbar, 
        sort[activeCategory] as objType<typeof HOTELS_SORT_TYPE>, 
        contentType, cities, city, checkInCheckOut, String(roomsGuests),
        location.pathname
    );
    
    const user = useTypedSelector(state => state.user);

    let [isShowAll, setIsShowAll] = useState<boolean>(false);
    const toggleIsShowAll = () => setIsShowAll(prev => !prev);

    let itemsEl = useRef<HTMLDivElement>(null);
    let itemsInnerEl = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const itemsHTML = itemsEl.current;
        const itemsInnerHTML = itemsInnerEl.current;
        if(itemsHTML && itemsInnerHTML){
            itemsHTML.style.height = itemsInnerHTML.offsetHeight + "px";
        }
    }, [flightStats.filtredMassive, hotelsStats.filtredMassive, isShowAll]);

    const usedItemsLength = useMemo(
        () => (contentType === SITE_PARTS.flights) ? flightStats.filtredMassive.length : hotelsStats.filtredMassive.length,
        [flightStats.filtredMassive.length, hotelsStats.filtredMassive.length]
    );

    let sortLinks: FullOptionValue[] = useMemo(() => {
        if(contentType === SITE_PARTS.flights){
            const getTheMost = (about: objType<typeof FLIGHTS_SORT_TYPE>) : FlightType | null => {
                switch(about){
                    case FLIGHTS_SORT_TYPE.best: return flightStats.theBest;
                    case FLIGHTS_SORT_TYPE.cheapest: return flightStats.theCheapest;
                    case FLIGHTS_SORT_TYPE.quickest: return flightStats.theQuickest;
                }
            }

            return (sort as objType<typeof FLIGHTS_SORT_TYPE>[]).map(link => {
                const theMost: FlightType | null = getTheMost(link);
                if(theMost === null) return({ title: link, description: "" })
                return({
                    title: link, 
                    description: "$" + getPrice(theMost) + " . " + 
                    intToDuration(getFlyDuration(theMost, flightStats.airlineState, flightStats.airlinesMassive))
                })
            });
        } else {
            const getNeededCount = (about: objType<typeof HOTELS_SORT_TYPE>): number => {
                switch(about){
                    case HOTELS_SORT_TYPE.hotels: return hotelsStats.hotelsCount;
                    case HOTELS_SORT_TYPE.resorts: return hotelsStats.resortsCount;
                    case HOTELS_SORT_TYPE.motels: return hotelsStats.motelsCount;
                }
            }

            return (sort as objType<typeof HOTELS_SORT_TYPE>[]).map(link => ({
                title: link, 
                description: getNeededCount(link) + " count places"
            }))
        }
    }, [activeCategory, flightStats.filtredMassive, hotelsStats.filtredMassive]);

    if(
        isLoading || items.length === 0 || 
        (contentType === SITE_PARTS.flights 
            ? airports.length === 0 && fromTo !== undefined 
            : cities.length === 0 && city !== undefined
        )){
        return(
            <main className="catalog">
                <div className="container">
                    <h1 className="loading message">Loading...</h1>
                </div>
            </main>
        )
    }
    if(error !== null || (contentType === SITE_PARTS.flights 
        ? airports.includes(null) : cities.includes(null)
    )){
        return(
            <main className="catalog">
                <div className="container">
                    <h1 className="error message">Some Error...</h1>
                </div>
            </main>
        )
    }

    let prevCheckboxes = 1;
    return(
        <main className="catalog">
            <Options neededBlocks={NEEDED_BLOCKS.onlyInputs} value={contentType} />
            <div className="catalog__row container">
                <Navbar about={navbar} state={[navbarFilters, setNavbarFilters]} />
                <div className="catalog__right">
                    <ChooseFull
                        links={sortLinks} maxShow={3} opener="Other sort"
                        activeOption={[activeCategory, setActiveCategory]} ChildrenComponent={FullOption}
                    />
                    <div className="catalog__supitems">
                        <output className="catalog__count">
                            {usedItemsLength > maxShow && !isShowAll
                                ? <Fragment>
                                    {"Showing " + (isShowAll ? usedItemsLength : maxShow) + " of "}
                                    <strong>{usedItemsLength + " places"}</strong>
                                </Fragment>
                                : "Showing All"
                            }
                        </output>
                        <div className="catalog__select select-catalog select">
                            <Select
                                parentCls={["select-catalog"]}
                                description={{value: "Sort by", type: SELECT_DESCRIPTION_TYPE.subValue}}
                                links={[SORT_BY.recommended, SORT_BY.unRecommended]}
                                isOpened={[isOpened, setIsOpened]}
                                activeLink={[activeLink, setActiveLink]}
                                iconValue={{ viewbox: {minX: 0, minY: 0, width: 14.25, height: 7.5}, width: 12, height: 6, pathes: [{fill: "unset", fillRule: FILL_RULE.nonzero, stroke: "#000000", strokeLinecap: STROKE_LINECAP.round, strokeLinejoin: STROKE_LINEJOIN.round, strokeWidth: "1.5", d: "M 0.75,0.75 7.5,7.5 14.25,0.75"}]}}
                                iconPosition={ICON_POSITION.right}
                                ChildrenComponent={Text}
                                onMouseEnterHandler={undefined} onFocusHandler={undefined}
                                onMouseLeaveHandler={undefined} onBlurHandler={undefined}
                            />
                        </div>
                    </div>
                    <div className="catalog__items" ref={itemsEl}>
                        <div className="catalog__items-inner" ref={itemsInnerEl}>
                            {contentType === SITE_PARTS.flights
                                ? (isShowAll ? 
                                    flightStats.filtredMassive : flightStats.filtredMassive.slice(0, maxShow)
                                ).map((item, i) => {
                                    prevCheckboxes += getSchedulePartsCount(item);
                                    return(
                                        <Flight 
                                            key={i} about={item} currentUser={user} 
                                            groupId={i} prevCheckboxes={prevCheckboxes} 
                                            isInFavourites={user.favourites.flightsPart.includes(item.id)}
                                        />
                                    )
                                })
                                : (isShowAll ? 
                                    hotelsStats.filtredMassive : hotelsStats.filtredMassive.slice(0, maxShow)
                                ).map((item, i) => 
                                    <Hotel 
                                        key={i} about={item} currentUser={user} 
                                        isInFavourites={user.favourites.hotelsPart.includes(item.id)}
                                    />
                                )
                            }
                        </div>
                    </div>
                        {
                            usedItemsLength > maxShow && 
                            <button className="catalog__show" type="button" onClick={toggleIsShowAll}>
                                {isShowAll ? "Hide" : "Show more results"}
                            </button>
                        }
                </div>
            </div>
        </main>
    )
}