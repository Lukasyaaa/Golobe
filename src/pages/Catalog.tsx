import React, { Fragment, useEffect, useRef, useState, type FC } from "react";
import { useAppDispatch, useTypedSelector } from "../store";
import { SITE_PARTS, type objType, NEEDED_BLOCKS, NAVBAR_DESCRIPTION, type NavbarRangeValue, NAVBAR_ITEM, type Flight as FlightType, getPrice, getFlyDuration, FLIGHTS_SORT_TYPE, intToDuration, HOTELS_SORT_TYPE, type Hotel as HotelType, SELECT_DESCRIPTION_TYPE, FILL_RULE, STROKE_LINECAP, STROKE_LINEJOIN, ICON_POSITION, getAirlineSrcs, getSchedulePartsCount, SORT_BY, FREEBIES, AMENITIES, TRIP_TYPE, AIRLINES } from "../types";
import { fetchFlights } from "../store/flights";
import { fetchHotels } from "../store/hotels";
import { Options } from "../components/Common/Options/Options";
import { Navbar } from "../components/Common/Catalog/Navbar/Navbar";
import { Sort } from "../components/Common/Catalog/Sort/Sort";
import { FullCategory } from "../components/Common/Catalog/Sort/FullCategory";
import { useFlight } from "../hooks/useFlights";
import { useHotels } from "../hooks/useHotels";
import { Select } from "../components/Common/Select/Select";
import { Text } from "../components/Common/Select/Text";
import { Flight } from "../components/Flights/Catalog/Flight";
import { Hotel } from "../components/Hotels/Catalog/Hotel";

interface RangeState{ 
    value: NavbarRangeValue<number>,
    description: objType<typeof NAVBAR_DESCRIPTION>
}
export interface RadiosState{
    value: number,
    description: objType<typeof NAVBAR_DESCRIPTION>
}
export interface CheckboxesState{
    value: number[],
    description: objType<typeof NAVBAR_DESCRIPTION>
}
export type NavbarFilterState = RangeState | RadiosState | CheckboxesState

interface CatalogProps{
    contentType: objType<typeof SITE_PARTS>
}
export const Catalog: FC<CatalogProps> = ({contentType}) => {    
    const about = useTypedSelector(state => 
        ((contentType === SITE_PARTS.flights) ? state.flights : state.hotels).catalog
    );
    const {sort, container} = about;
    const navbar = (contentType === SITE_PARTS.flights) 
        ? [
            {
                description: NAVBAR_DESCRIPTION.price, type: NAVBAR_ITEM.priceRange,
                value: {from: 50, to: 1050}
            },
            {
                description: NAVBAR_DESCRIPTION.time, type: NAVBAR_ITEM.timeRange,
                value: { from: 0, to: 1440}
            },
            {
                description: NAVBAR_DESCRIPTION.rating, type: NAVBAR_ITEM.radios,
                value: ["0+", "1+", "2+", "3+", "4+"]
            },
            {
                description: NAVBAR_DESCRIPTION.airlines, type: NAVBAR_ITEM.checkboxes,
                value: [AIRLINES.emirated, AIRLINES.flyDubai, AIRLINES.qatar, AIRLINES.etihad],
                maxShow: 4,
            },
            {
                description: NAVBAR_DESCRIPTION.trips, type: NAVBAR_ITEM.checkboxes,
                value: [TRIP_TYPE.roundTrip, TRIP_TYPE.onWay, TRIP_TYPE.multiCity, TRIP_TYPE.flexible],
                maxShow: 4,
            }
        ]
        : [
            {
                description: NAVBAR_DESCRIPTION.price, type: NAVBAR_ITEM.priceRange,
                value: {from: 50, to: 1050}
            },
            {
                description: NAVBAR_DESCRIPTION.rating, type: NAVBAR_ITEM.radios,
                value: ["0+", "1+", "2+", "3+", "4+"]
            },
            {
                description: NAVBAR_DESCRIPTION.freebies, type: NAVBAR_ITEM.checkboxes,
                value: [FREEBIES.breakfast, FREEBIES.parking, FREEBIES.internet, FREEBIES.airportShuttle, FREEBIES.cancellation],
                maxShow: 5,
            },
            {
                description: NAVBAR_DESCRIPTION.amenities, type: NAVBAR_ITEM.checkboxes,
                value: [AMENITIES.allDayFrontDesc, AMENITIES.airConditioned, AMENITIES.fitness, AMENITIES.indoorPool, AMENITIES.restaurant, AMENITIES.roomService, AMENITIES.spa, AMENITIES.bar],
                maxShow: 4,
            }
        ]
    ;
    const {items, isLoading, error} = container;
    const maxShow = 4;

    const dispatch = useAppDispatch();
    useEffect(() => {
        if(contentType === SITE_PARTS.flights)dispatch(fetchFlights());
        else dispatch(fetchHotels());
    }, [dispatch]);

    let [navbarFilters, setNavbarFilters] = useState<NavbarFilterState[]>(() => {
        let startFromPrice = 0, startToPrice = 0;
        if(contentType === SITE_PARTS.flights){
            let startFromTime = 0, startToTime = 0;
            navbar.forEach(({type, description, value}) => {
                if(type === NAVBAR_ITEM.priceRange || type === NAVBAR_ITEM.timeRange){
                    if(description === NAVBAR_DESCRIPTION.price){
                        startFromPrice = value.from;
                        startToPrice = value.to;
                    } else if(description === NAVBAR_DESCRIPTION.time){
                        startFromTime = value.from;
                        startToTime = value.to;
                    }
                }
            });
            return([
                {description: NAVBAR_DESCRIPTION.price, value: {from: startFromPrice, to: startToPrice}},
                {description: NAVBAR_DESCRIPTION.time, value: {from: startFromTime, to: startToTime}},
                {description: NAVBAR_DESCRIPTION.rating, value: 0},
                {description: NAVBAR_DESCRIPTION.airlines, value: []},
                {description: NAVBAR_DESCRIPTION.trips, value: []},
            ]);
        } else {
            navbar.forEach(({type, description, value}) => {
                if(type === NAVBAR_ITEM.priceRange && description === NAVBAR_DESCRIPTION.price){
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

    let [activeCategory, setActiveCategory] = useState<number>(Number(contentType === SITE_PARTS.stays));

    let [isOpened, setIsOpened] = useState<boolean>(false);
    let [activeLink, setActiveLink] = useState<number>(0);

    const flightStats = useFlight(
        items as FlightType[], navbarFilters, navbar, 
        sort[activeCategory] as objType<typeof FLIGHTS_SORT_TYPE>, 
        contentType
    );
    const hotelsStats = useHotels(
        items as HotelType[], 
        navbar, navbarFilters, sort[activeCategory] as objType<typeof HOTELS_SORT_TYPE>, 
        contentType,
    );

    let [isShowAll, setIsShowAll] = useState<boolean>(false);
    const toggleIsShowAll = () => {
        setIsShowAll(prev => !prev);
    }

    let itemsEl = useRef<HTMLDivElement>(null);
    let itemsInnerEl = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const itemsHTML = itemsEl.current;
        const itemsInnerHTML = itemsInnerEl.current;
        if(itemsHTML && itemsInnerHTML){
            itemsHTML.style.height = itemsInnerHTML.offsetHeight + "px";
        }
    }, [(contentType === SITE_PARTS.flights) ? flightStats.filtredMassive : hotelsStats.filtredMassive]);

    if(isLoading || items.length === 0){
        return(
            <main className="catalog">
                <div className="container">
                    <h1 className="loading message">Loading...</h1>
                </div>
            </main>
        )
    }
    if(error !== null){
        return(
            <main className="catalog">
                <div className="container">
                    <h1 className="error message">Some Error...</h1>
                </div>
            </main>
        )
    }

    let sortLinks: {description: string, title: string}[] = [];
    if(contentType === SITE_PARTS.flights){
        const getTheMost = (about: objType<typeof FLIGHTS_SORT_TYPE>) : FlightType | null => {
            switch(about){
                case FLIGHTS_SORT_TYPE.best: return flightStats.theBest;
                case FLIGHTS_SORT_TYPE.cheapest: return flightStats.theCheapest;
                case FLIGHTS_SORT_TYPE.quickest: return flightStats.theQuickest;
            }
        }

        sortLinks = sort.map(link => {
            const theMost: FlightType | null = getTheMost(link as objType<typeof FLIGHTS_SORT_TYPE>);
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

        sortLinks = sort.map(link => ({
            title: link, 
            description: getNeededCount(link as objType<typeof HOTELS_SORT_TYPE>) + " count places"
        }))
    }

    let groupId = 0, prevCheckboxes = 1;
    return(
        <main className="catalog">
            <Options neededBlocks={NEEDED_BLOCKS.onlyInputs} value={contentType} />
            <div className="catalog__row container">
                <Navbar about={navbar} state={[navbarFilters, setNavbarFilters]} />
                <div className="catalog__right">
                    <Sort
                        links={sortLinks} 
                        maxShow={3} opener="Other sort"
                        activeCategory={[activeCategory, setActiveCategory]} 
                        ChildrenComponent={FullCategory}
                    />
                    <div className="catalog__supitems">
                        <output className="catalog__count">
                            {((contentType === SITE_PARTS.flights) ? flightStats.filtredMassive : hotelsStats.filtredMassive).length > maxShow
                                ? <Fragment>
                                    {"Showing " + (isShowAll ? ((contentType === SITE_PARTS.flights) ? flightStats.filtredMassive : hotelsStats.filtredMassive).length : maxShow) + " of "}
                                    <strong>{((contentType === SITE_PARTS.flights) ? flightStats.filtredMassive : hotelsStats.filtredMassive).length + " places"}</strong>
                                </Fragment>
                                : "Showing All"
                            }
                        </output>
                        <div className="catalog__select select-catalog select">
                            <Select
                                parentCl="select-catalog"
                                description={{value: "Sort by", type: SELECT_DESCRIPTION_TYPE.subValue}}
                                links={[SORT_BY.recommended, SORT_BY.unRecommended]}
                                isOpened={[isOpened, setIsOpened]}
                                activeLink={[activeLink, setActiveLink]}
                                iconValue={{
                                    viewbox: {minX: 0, minY: 0, width: 14.25, height: 7.5},
                                    width: 12, height: 6, pathes: [{
                                        d: "M 0.75,0.75 7.5,7.5 14.25,0.75",
                                        fillRule: FILL_RULE.nonzero,
                                        stroke: "#000000",
                                        strokeLinecap: STROKE_LINECAP.round,
                                        strokeLinejoin: STROKE_LINEJOIN.round,
                                        strokeWidth: "1.5",
                                        fill: "unset"
                                    }]
                                }}
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
                                    ?  ((isShowAll 
                                            ? flightStats.filtredMassive : flightStats.filtredMassive.slice(0, maxShow)
                                        ) as FlightType[]).map((item, i) => {
                                        groupId++; prevCheckboxes += getSchedulePartsCount(item);
                                        return(
                                            <Flight 
                                                key={i} about={item} 
                                                getSrcs={getAirlineSrcs} 
                                                groupId={0} prevCheckboxes={0} 
                                            />
                                        )
                                    })
                                    : ((isShowAll 
                                            ? hotelsStats.filtredMassive : hotelsStats.filtredMassive.slice(0, maxShow)
                                        ) as HotelType[]).map((item, i) => {
                                        return(
                                            <Hotel key={i} {...item} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        {
                            ((contentType === SITE_PARTS.flights) ? flightStats.filtredMassive : hotelsStats.filtredMassive).length > maxShow && 
                            <button className="catalog__show" type="button" onClick={toggleIsShowAll}>
                                {isShowAll ? "Hide" : "Show more results"}
                            </button>
                        }
                </div>
            </div>
        </main>
    )
}