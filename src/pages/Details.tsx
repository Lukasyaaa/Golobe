import React, { useEffect, useMemo, useState, type FC } from "react";
import { Introduction } from "../components/Common/Details/Introduction";
import { useParams } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../store";
import { fetchFlights } from "../store/flights";
import { addZero, FILL_RULE, getAirportByIATA, getDayWeek, getDuration, getFromToIATA, getLocaitonByAddress, getMonth, getSeatsGroup, intToDuration, SEATS_TYPE, SITE_PARTS, STROKE_LINECAP, STROKE_LINEJOIN, timeToInt, timeToString, transformPrice, type Fact, type Flight, type Hotel, type Image, type Link, type objType, type ScheduleParts, type ScheduleSingle } from "../types";
import { Terms } from "../components/Common/Details/Terms";
import { fetchHotels } from "../store/hotels";
import { useSchedulePart } from "../hooks/useSchedulePart";
import { Ticket } from "../components/Common/Details/Ticket";
import { flightsCatalogPath, hotelsCatalogPath } from "../App";


interface About{
    locationMas: Link[], locationText: string, current: string, heading: string, price: number,
    startString: string, startDescription: string, startDate: string,
    endString: string, endDescription: string, endDate: string,
    serviceDescription: string,
    facts: Fact[], images: Image[]
}
interface Data{
    city: string,
    country: string,
    toAirport?: string,
    fromCity?: string ,
    fromAddress?: string
}

interface DetailsProps{
    contentType: objType<typeof SITE_PARTS>
}
export const Details : FC<DetailsProps> = ({contentType}) => {
    const {id, options, seatsType, hotelId, roomId, checkInCheckOut} = useParams();    
    let state; let realId: number = -1;
    if(contentType === SITE_PARTS.flights){
        state = useTypedSelector(state => state.flights.catalog);
        realId = Number(id);
    } else {
        state = useTypedSelector(state => state.hotels.catalog);
        realId = Number(hotelId); 
    }

    const dispatch = useAppDispatch();
    useEffect(() => {
        if(contentType === SITE_PARTS.flights) dispatch(fetchFlights());
        else dispatch(fetchHotels());
    }, [dispatch]);
    const {container} = state;
    const {isLoading, error, items} = container;

    const about: Flight | Hotel | null = useMemo(
        () => items.length !== 0 ? items[Number(realId) - 1] : null,
        [state]
    );

    let [data, setData] = useState<Data | null | undefined>(undefined);
    useEffect(() => {
        if (about !== null) {
            if(contentType === SITE_PARTS.stays){
                const fetchLocation = async () => {
                    const location = await getLocaitonByAddress((about as Hotel).location.text);
                    setData(location)
                };
                fetchLocation();
            } else {
                const [fromIATA, toIATA] = getFromToIATA(String(options), about as Flight);
                const fetchAirports = async () => {
                    const from = await getAirportByIATA(fromIATA);
                    const to = await getAirportByIATA(toIATA);
                    if(from == null || to === null) setData(null);
                    else setData({
                        country: to.country, city: to.city, toAirport: to.airportName, 
                        fromCity: from.city, fromAddress: from.address
                    })
                };
    
                fetchAirports();
            }
        }
    }, [about]);

    if(isLoading || data === null || data === undefined){
        return(
            <main className="details">
                <div className="container">
                    <h1 className="loading message">Loading...</h1>
                </div>
            </main>
        )
    } 
    if(error !== null){
        return(
            <main className="details">
                <div className="container">
                    <h1 className="error message">Some Error...</h1>
                </div>
            </main>
        )
    }

    if(about !== null){
        let info : About = {
            locationMas: [], locationText: "", current: "", heading: "", price: 0,
            startString: "", startDescription: "", startDate: "",
            endString: "", endDescription: "", endDate: "",
            serviceDescription: "",
            facts: [], images: []
        }

        if(contentType === SITE_PARTS.flights){
            const {flightEndPlace, flightEndPoint, flightPart} = useSchedulePart(String(options), about as Flight);
            
            const neededCountryPath = flightsCatalogPath + "/" + data.country.replaceAll(" ", "-") + "/" + options;
            const neededCityPath = flightsCatalogPath + "/" +data.city.replaceAll(" ", "-") + "/" + options;
            info = {
                locationMas: [
                    {description: data.country, path: neededCountryPath},
                    {description: data.city, path: neededCityPath}
                ],
                locationText: data.fromAddress as string,
                current: data.toAirport as string,
                heading: flightPart.airline + " " + flightPart.plane,
                price: transformPrice(getSeatsGroup(seatsType as objType<typeof SEATS_TYPE>, flightPart).price),
                startDate: flightPart.departTime.year + "-" + addZero(flightPart.departTime.month) + addZero(flightPart.departTime.day),
                startDescription: (data.fromCity as string) + "(" + flightPart.startPoint + ")",
                startString: timeToString(flightPart.departTime.units),
                endDate: flightPart.arrayTime.year + "-" + addZero(flightPart.arrayTime.month) + addZero(flightPart.arrayTime.day),
                endDescription: data.city + "(" + flightEndPoint + ")",
                endString: timeToString(flightPart.arrayTime.units),
                serviceDescription: String(seatsType),
                facts: [
                    {
                        description: "Date", 
                        value: data.city + "(" + flightEndPoint + ")",
                        iconValue: {viewbox: {minX: 0, minY: 0, width: 16.5, height: 16.5}, width: 16.5, height: 16.5, pathes: [
                            {fill: "#8dd3bb", fillRule: FILL_RULE.nonzero, stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter, d: "m 16.5,3.5356631 c 0,-0.62515 -0.2483,-1.2247 -0.6904,-1.66675 -0.442,-0.44205 -1.0416,-0.69039 -1.6667,-0.69039 H 13.5536 V 0.60581307 c 0,-0.31711 -0.2438,-0.58929 -0.561,-0.60512999598 -0.0796,-0.003840004 -0.1593,0.008539996 -0.234,0.036389996 -0.0748,0.02784 -0.1431,0.07057 -0.2008,0.1256 -0.0578,0.05503 -0.1038,0.12121 -0.1352,0.19453 -0.0314,0.07332 -0.0476,0.15226 -0.0476,0.23203 V 1.1785231 H 4.125 V 0.60581307 c 0,-0.31711 -0.24382,-0.58929 -0.56093,-0.60512999598 C 3.4844,-0.00315693 3.40477,0.00922307 3.33002,0.03707307 c -0.07475,0.02784 -0.14308,0.07057 -0.20082,0.1256 -0.05775,0.05503 -0.10373,0.12121 -0.13515,0.19453 -0.03141,0.07332 -0.04761,0.15226 -0.04762,0.23203 V 1.1785231 H 2.35714 c -0.62515,0 -1.2247,0.24834 -1.66675,0.69039 C 0.24834,2.3109631 0,2.9105131 0,3.5356631 v 0.44196 c 0,0.03908 0.01552,0.07655 0.04315,0.10418 0.02763,0.02762 0.0651,0.04315 0.10417,0.04315 H 16.3527 c 0.0391,0 0.0765,-0.01553 0.1042,-0.04315 0.0276,-0.02763 0.0431,-0.0651 0.0431,-0.10418 z M 0,14.142803 c 0,0.6252 0.24834,1.2247 0.69039,1.6668 0.44205,0.442 1.0416,0.6903 1.66675,0.6903 H 14.1429 c 0.6251,0 1.2247,-0.2483 1.6667,-0.6903 0.4421,-0.4421 0.6904,-1.0416 0.6904,-1.6668 V 5.4140131 c 0,-0.02931 -0.0116,-0.05741 -0.0324,-0.07813 -0.0207,-0.02072 -0.0488,-0.03236 -0.0781,-0.03236 H 0.11049 c -0.0293,0 -0.05741,0.01164 -0.07813,0.03236 C 0.01164,5.3566031 0,5.3847031 0,5.4140131 Z M 12.6696,6.4820931 c 0.1749,0 0.3458,0.05184 0.4911,0.14897 0.1454,0.09712 0.2587,0.23518 0.3256,0.39669 0.0669,0.16152 0.0844,0.33925 0.0503,0.51075 -0.0341,0.1714 -0.1183,0.3289 -0.2419,0.4525 -0.1236,0.1237 -0.2811,0.2079 -0.4526,0.242 -0.1715,0.0341 -0.3492,0.0166 -0.5107,-0.0503 -0.1615,-0.0669 -0.2996,-0.1802 -0.3967,-0.3256 -0.0971,-0.1454 -0.149,-0.3163 -0.149,-0.4911 0,-0.23441 0.0931,-0.45925 0.2589,-0.62502 0.1658,-0.16576 0.3906,-0.25889 0.625,-0.25889 z m 0,2.94641 c 0.1749,0 0.3458,0.0519 0.4911,0.149 0.1454,0.0971 0.2587,0.2352 0.3256,0.3967 0.0669,0.1614999 0.0844,0.3391999 0.0503,0.5106999 -0.0341,0.1715 -0.1183,0.329 -0.2419,0.4526 -0.1236,0.1236 -0.2811,0.2078 -0.4526,0.2419 -0.1715,0.0341 -0.3492,0.0166 -0.5107,-0.0503 -0.1615,-0.0669 -0.2996,-0.1802 -0.3967,-0.3256 -0.0971,-0.1453 -0.149,-0.3162 -0.149,-0.4911 0,-0.2344 0.0931,-0.4591999 0.2589,-0.6249999 0.1658,-0.1658 0.3906,-0.2589 0.625,-0.2589 z m -2.9464,-2.94641 c 0.1748,0 0.3457,0.05184 0.4911,0.14897 0.1454,0.09712 0.2587,0.23518 0.3256,0.39669 0.0669,0.16152 0.0844,0.33925 0.0503,0.51075 -0.0341,0.1714 -0.1183,0.3289 -0.242,0.4525 -0.1236,0.1237 -0.2811,0.2079 -0.4525,0.242 -0.1715,0.0341 -0.3492,0.0166 -0.5108,-0.0503 -0.1615,-0.0669 -0.2995,-0.1802 -0.3966,-0.3256 -0.0972,-0.1454 -0.149,-0.3163 -0.149,-0.4911 0,-0.23441 0.0931,-0.45925 0.2589,-0.62502 0.1658,-0.16576 0.3906,-0.25889 0.625,-0.25889 z m 0,2.94641 c 0.1748,0 0.3457,0.0519 0.4911,0.149 0.1454,0.0971 0.2587,0.2352 0.3256,0.3967 0.0669,0.1614999 0.0844,0.3391999 0.0503,0.5106999 -0.0341,0.1715 -0.1183,0.329 -0.242,0.4526 -0.1236,0.1236 -0.2811,0.2078 -0.4525,0.2419 -0.1715,0.0341 -0.3492,0.0166 -0.5108,-0.0503 -0.1615,-0.0669 -0.2995,-0.1802 -0.3966,-0.3256 -0.0972,-0.1453 -0.149,-0.3162 -0.149,-0.4911 0,-0.2344 0.0931,-0.4591999 0.2589,-0.6249999 0.1658,-0.1658 0.3906,-0.2589 0.625,-0.2589 z m 0,2.9463999 c 0.1748,0 0.3457,0.0519 0.4911,0.149 0.1454,0.0971 0.2587,0.2352 0.3256,0.3967 0.0669,0.1615 0.0844,0.3393 0.0503,0.5107 -0.0341,0.1715 -0.1183,0.329 -0.242,0.4526 -0.1236,0.1236 -0.2811,0.2078 -0.4525,0.2419 -0.1715,0.0341 -0.3492,0.0166 -0.5108,-0.0503 -0.1615,-0.0669 -0.2995,-0.1802 -0.3966,-0.3255 -0.0972,-0.1454 -0.149,-0.3163 -0.149,-0.4911 0,-0.2345 0.0931,-0.4593 0.2589,-0.6251 0.1658,-0.1657 0.3906,-0.2589 0.625,-0.2589 z M 6.77679,9.4285031 c 0.17482,0 0.34572,0.0519 0.49111,0.149 0.1453,0.0971 0.2586,0.2352 0.3255,0.3967 0.0669,0.1614999 0.0844,0.3391999 0.0503,0.5106999 -0.0341,0.1715 -0.1183,0.329 -0.2419,0.4526 -0.1236,0.1236 -0.2811,0.2078 -0.45257,0.2419 -0.17146,0.0341 -0.34919,0.0166 -0.51071,-0.0503 -0.16152,-0.0669 -0.29957,-0.1802 -0.39669,-0.3256 -0.09713,-0.1453 -0.14897,-0.3162 -0.14897,-0.4911 0,-0.2344 0.09312,-0.4591999 0.25889,-0.6249999 0.16577,-0.1658 0.3906,-0.2589 0.62504,-0.2589 z m 0,2.9463999 c 0.17482,0 0.34572,0.0519 0.49111,0.149 0.1453,0.0971 0.2586,0.2352 0.3255,0.3967 0.0669,0.1615 0.0844,0.3393 0.0503,0.5107 -0.0341,0.1715 -0.1183,0.329 -0.2419,0.4526 -0.1236,0.1236 -0.2811,0.2078 -0.45257,0.2419 -0.17146,0.0341 -0.34919,0.0166 -0.51071,-0.0503 -0.16152,-0.0669 -0.29957,-0.1802 -0.39669,-0.3255 -0.09713,-0.1454 -0.14897,-0.3163 -0.14897,-0.4911 0,-0.2345 0.09312,-0.4593 0.25889,-0.6251 0.16577,-0.1657 0.3906,-0.2589 0.62504,-0.2589 z M 3.83036,9.4285031 c 0.17482,0 0.34572,0.0519 0.49108,0.149 0.14536,0.0971 0.25866,0.2352 0.32556,0.3967 0.0669,0.1614999 0.08441,0.3391999 0.0503,0.5106999 -0.03411,0.1715 -0.11829,0.329 -0.24191,0.4526 -0.12362,0.1236 -0.28112,0.2078 -0.45259,0.2419 -0.17146,0.0341 -0.34919,0.0166 -0.51071,-0.0503 -0.16152,-0.0669 -0.29957,-0.1802 -0.39669,-0.3256 -0.09713,-0.1453 -0.14897,-0.3162 -0.14897,-0.4911 0,-0.2344 0.09313,-0.4591999 0.2589,-0.6249999 0.16576,-0.1658 0.39059,-0.2589 0.62503,-0.2589 z m 0,2.9463999 c 0.17482,0 0.34572,0.0519 0.49108,0.149 0.14536,0.0971 0.25866,0.2352 0.32556,0.3967 0.0669,0.1615 0.08441,0.3393 0.0503,0.5107 -0.03411,0.1715 -0.11829,0.329 -0.24191,0.4526 -0.12362,0.1236 -0.28112,0.2078 -0.45259,0.2419 -0.17146,0.0341 -0.34919,0.0166 -0.51071,-0.0503 -0.16152,-0.0669 -0.29957,-0.1802 -0.39669,-0.3255 -0.09713,-0.1454 -0.14897,-0.3163 -0.14897,-0.4911 0,-0.2345 0.09313,-0.4593 0.2589,-0.6251 0.16576,-0.1657 0.39059,-0.2589 0.62503,-0.2589 z"}
                        ]}
                    },
                    {
                        description: "Flight time", 
                        value: intToDuration(getDuration(flightPart.departTime, flightPart.arrayTime)),
                        iconValue: {viewbox: {minX: 0, minY: 0, width: 16.5, height: 16.5}, width: 16.5, height: 16.5, pathes: [
                            {fill: "#8dd3bb", fillRule: FILL_RULE.nonzero, stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter, d: "M8.25 0C3.69386 0 0 3.69386 0 8.25C0 12.8061 3.69386 16.5 8.25 16.5C12.8061 16.5 16.5 12.8061 16.5 8.25C16.5 3.69386 12.8061 0 8.25 0ZM12.0577 9.51923L8.25 9.51923C8.08169 9.51923 7.92027 9.45237 7.80126 9.33336C7.68225 9.21434 7.61539 9.05293 7.61539 8.88462L7.61539 3.17308C7.61539 3.00477 7.68225 2.84335 7.80126 2.72434C7.92027 2.60532 8.08169 2.53846 8.25 2.53846C8.41831 2.53846 8.57973 2.60532 8.69874 2.72434C8.81776 2.84335 8.88462 3.00477 8.88462 3.17308L8.88462 8.25L12.0577 8.25C12.226 8.25 12.3874 8.31686 12.5064 8.43587C12.6254 8.55489 12.6923 8.7163 12.6923 8.88462C12.6923 9.05293 12.6254 9.21434 12.5064 9.33336C12.3874 9.45237 12.226 9.51923 12.0577 9.51923Z"}
                        ]}
                    },
                    {
                        description: "Gate", value: flightPart.gate,
                        iconValue: {viewbox: {minX: 0, minY: 0, width: 16.26, height: 17.42}, width: 16.26, height: 17.42, pathes: [
                            {fill: "#8dd3bb", fillRule: FILL_RULE.nonzero, stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter, d: "m 12.7722,0 c 0.308,0 0.6033,0.12233 0.8211,0.34008 0.2177,0.21775 0.34,0.51309 0.34,0.82103 V 16.2556 h 1.7417 c 0.154,0 0.3016,0.0611 0.4105,0.17 0.1089,0.1089 0.1701,0.2565 0.1701,0.4105 0,0.154 -0.0612,0.3017 -0.1701,0.4105 -0.1089,0.1089 -0.2565,0.1701 -0.4105,0.1701 H 0.58056 c -0.15398,0 -0.30164,-0.0612 -0.41052,-0.1701 C 0.06117,17.1378 0,16.9901 0,16.8361 c 0,-0.154 0.06117,-0.3016 0.17004,-0.4105 0.10888,-0.1089 0.25654,-0.17 0.41052,-0.17 H 2.32222 V 1.16111 C 2.32222,0.85317 2.44455,0.55783 2.6623,0.34008 2.88005,0.12233 3.17539,0 3.48333,0 Z M 10.45,10.45 c 0.3079,0 0.6033,-0.1223 0.821,-0.3401 0.2178,-0.2177 0.3401,-0.5131 0.3401,-0.821 0,-0.308 -0.1223,-0.6033 -0.3401,-0.821 -0.2177,-0.2178 -0.5131,-0.3401 -0.821,-0.3401 -0.3079,0 -0.6033,0.1223 -0.821,0.3401 -0.2178,0.2177 -0.3401,0.513 -0.3401,0.821 0,0.3079 0.1223,0.6033 0.3401,0.821 0.2177,0.2178 0.5131,0.3401 0.821,0.3401 z"}
                        ]}
                    },
                    {
                        description: "Seat", 
                        value: String(getSeatsGroup(seatsType as objType<typeof SEATS_TYPE>, flightPart).count),
                        iconValue: {viewbox: {minX: 0, minY: 0, width: 15.5, height: 19}, width: 15.5, height: 19, pathes: [
                            {fill: "#8dd3bb", fillRule: FILL_RULE.nonzero, stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter, d: "m 3.59,3.415 c -0.78,-0.78 -0.78,-2.05 0,-2.83 0.78,-0.78 2.05,-0.78 2.83,0 0.78,0.78 0.78,2.05 0,2.83 -0.79,0.79 -2.05,0.79 -2.83,0 z M 2,14.005 v -8 c 0,-0.55 -0.45,-1 -1,-1 -0.55,0 -1,0.45 -1,1 v 8 c 0,2.76 2.24,5 5,5 h 5 c 0.55,0 1,-0.45 1,-1 0,-0.55 -0.45,-1 -1,-1 H 5 c -1.66,0 -3,-1.34 -3,-3 z m 13.28,3.35 -3.77,-3.77 c -0.37,-0.37 -0.88,-0.58 -1.41,-0.58 H 7.5 v -3.68 c 1.09,0.89 2.66,1.7 4.2,2.02 0.67,0.14 1.3,-0.36 1.3,-1.04 0,-0.53 -0.39,-0.96 -0.92,-1.05 C 10.66,9.015 9.2,8.245 8.33,7.28499 L 6.93,5.735 C 6.74,5.525 6.5,5.355 6.24,5.23499 5.95,5.095 5.62,5.005 5.28,5.005 H 5.25 C 4.01,5.005 3,6.015 3,7.255 v 5.75 c 0,1.66 1.34,3 3,3 h 5.07 l 2.78,2.78 c 0.39,0.39 1.04,0.39 1.43,0 0.4,-0.39 0.4,-1.03 0,-1.43 z"}
                        ]}
                    }
                ],
                images: [
                    {srcs: flightPart.place, alt: ""},
                    {srcs: flightEndPlace, alt: ""}
                ]
            }
        } else {
            const hotel = about as Hotel;
            const room = hotel.rooms[Number(roomId) - 1];

        const today = new Date();
        const [checkIn, checkOut] = checkInCheckOut as string;
        const [checkInMonth, checkInDay] = checkIn;
        const checkInDate = new Date(today.getFullYear(), parseInt(checkInMonth) - 1, parseInt(checkInDay));

        const [checkOutMonth, checkOutDay] = checkOut;
        const checkOutDate = new Date(today.getFullYear(), parseInt(checkOutMonth) - 1, parseInt(checkOutDay));

            const doubleBeds = room.beds.double + " double bed" + ((room.beds.double > 1) ? "s" : "");
            const twinBeds = room.beds.twin + " twin bed" + ((room.beds.twin > 1) ? "s" : "");
            const bedsString = [doubleBeds, twinBeds].filter(beds => !beds.includes("0")).join(" or ");

            const neededCountryPath = hotelsCatalogPath + "/" + data.country.replaceAll(" ", "-") + "/1-Room+2-Guests";
            const neededCityPath = hotelsCatalogPath + "/" + data.city.replaceAll(" ", "-") + "/1-Room+2-Guests";
            info = {
                locationMas: [
                    {description: data.country, path: neededCountryPath},
                    {description: data.city, path: neededCityPath}
                ],
                locationText: hotel.location.text,
                current: hotel.name,
                heading: hotel.name,
                price: transformPrice(room.price),
                startDate: checkInDate.getFullYear() + "-" + addZero(checkInDate.getMonth()) + "-" + addZero(checkInDate.getDate()),
                startDescription: "Check-In",
                startString: getDayWeek(checkInDate.getDay()) + ", " + getMonth(checkInDate.getMonth()) + " " + checkInDate.getDate(),
                endDate: checkOutDate.getFullYear() + "-" + addZero(checkOutDate.getMonth()) + "-" + addZero(checkOutDate.getDate()),
                endDescription: "Check-Out",
                endString: getDayWeek(checkOutDate.getDay()) + ", " + getMonth(checkOutDate.getMonth()) + " " + checkOutDate.getDate(),
                serviceDescription: ((room.specifics.length !== 0) ? room.specifics.join(" - ") + " - " : "") + bedsString,
                facts: [
                    {
                        description: "Сheck-In", 
                        value: checkInDate.toLocaleTimeString("en-US", { hour: "2-digit",  minute: "2-digit", hour12: true }),
                        iconValue: {viewbox: {minX: 0, minY: 0, width: 16.5, height: 16.5}, width: 16.5, height: 16.5, pathes: [
                            {fill: "#8dd3bb", fillRule: FILL_RULE.nonzero, stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter, d: "M8.25 0C3.69386 0 0 3.69386 0 8.25C0 12.8061 3.69386 16.5 8.25 16.5C12.8061 16.5 16.5 12.8061 16.5 8.25C16.5 3.69386 12.8061 0 8.25 0ZM12.0577 9.51923L8.25 9.51923C8.08169 9.51923 7.92027 9.45237 7.80126 9.33336C7.68225 9.21434 7.61539 9.05293 7.61539 8.88462L7.61539 3.17308C7.61539 3.00477 7.68225 2.84335 7.80126 2.72434C7.92027 2.60532 8.08169 2.53846 8.25 2.53846C8.41831 2.53846 8.57973 2.60532 8.69874 2.72434C8.81776 2.84335 8.88462 3.00477 8.88462 3.17308L8.88462 8.25L12.0577 8.25C12.226 8.25 12.3874 8.31686 12.5064 8.43587C12.6254 8.55489 12.6923 8.7163 12.6923 8.88462C12.6923 9.05293 12.6254 9.21434 12.5064 9.33336C12.3874 9.45237 12.226 9.51923 12.0577 9.51923Z"}
                        ]}
                    },
                    {
                        description: "Сheck-Out", 
                        value: checkOutDate.toLocaleTimeString("en-US", { hour: "2-digit",  minute: "2-digit", hour12: true }),
                        iconValue: {viewbox: {minX: 0, minY: 0, width: 16.5, height: 16.5}, width: 16.5, height: 16.5, pathes: [
                            {fill: "#8dd3bb", fillRule: FILL_RULE.nonzero, stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter, d: "M8.25 0C3.69386 0 0 3.69386 0 8.25C0 12.8061 3.69386 16.5 8.25 16.5C12.8061 16.5 16.5 12.8061 16.5 8.25C16.5 3.69386 12.8061 0 8.25 0ZM12.0577 9.51923L8.25 9.51923C8.08169 9.51923 7.92027 9.45237 7.80126 9.33336C7.68225 9.21434 7.61539 9.05293 7.61539 8.88462L7.61539 3.17308C7.61539 3.00477 7.68225 2.84335 7.80126 2.72434C7.92027 2.60532 8.08169 2.53846 8.25 2.53846C8.41831 2.53846 8.57973 2.60532 8.69874 2.72434C8.81776 2.84335 8.88462 3.00477 8.88462 3.17308L8.88462 8.25L12.0577 8.25C12.226 8.25 12.3874 8.31686 12.5064 8.43587C12.6254 8.55489 12.6923 8.7163 12.6923 8.88462C12.6923 9.05293 12.6254 9.21434 12.5064 9.33336C12.3874 9.45237 12.226 9.51923 12.0577 9.51923Z"}
                        ]}
                    },
                    {
                        description: "Room no.", value: "On arival",
                        iconValue: {viewbox: {minX: 0, minY: 0, width: 16.26, height: 17.42}, width: 16.26, height: 17.42, pathes: [
                            {fill: "#8dd3bb", fillRule: FILL_RULE.nonzero, stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter, d: "m 12.7722,0 c 0.308,0 0.6033,0.12233 0.8211,0.34008 0.2177,0.21775 0.34,0.51309 0.34,0.82103 V 16.2556 h 1.7417 c 0.154,0 0.3016,0.0611 0.4105,0.17 0.1089,0.1089 0.1701,0.2565 0.1701,0.4105 0,0.154 -0.0612,0.3017 -0.1701,0.4105 -0.1089,0.1089 -0.2565,0.1701 -0.4105,0.1701 H 0.58056 c -0.15398,0 -0.30164,-0.0612 -0.41052,-0.1701 C 0.06117,17.1378 0,16.9901 0,16.8361 c 0,-0.154 0.06117,-0.3016 0.17004,-0.4105 0.10888,-0.1089 0.25654,-0.17 0.41052,-0.17 H 2.32222 V 1.16111 C 2.32222,0.85317 2.44455,0.55783 2.6623,0.34008 2.88005,0.12233 3.17539,0 3.48333,0 Z M 10.45,10.45 c 0.3079,0 0.6033,-0.1223 0.821,-0.3401 0.2178,-0.2177 0.3401,-0.5131 0.3401,-0.821 0,-0.308 -0.1223,-0.6033 -0.3401,-0.821 -0.2177,-0.2178 -0.5131,-0.3401 -0.821,-0.3401 -0.3079,0 -0.6033,0.1223 -0.821,0.3401 -0.2178,0.2177 -0.3401,0.513 -0.3401,0.821 0,0.3079 0.1223,0.6033 0.3401,0.821 0.2177,0.2178 0.5131,0.3401 0.821,0.3401 z"}
                        ]}
                    },
                ],
                images: [
                    {srcs: hotel.logo, alt: hotel.name}
                ]
            }
        }

        const {locationText, current, heading, price,  ...ticket} = info;
        const {
            startString, startDescription, startDate, endString, endDescription, endDate,
            serviceDescription, facts, images, ...introduction
        } = info;
        return(
            <main className="details">
                <Introduction {...introduction} />
                <Ticket {...ticket} contentType={contentType} />
                <Terms />
            </main>
        )
    } else {
        return(
            <main className="details">
                <div className="container">
                    <h1 className="failed-load message">Failed to load Data...</h1>
                </div>
            </main>
        )
    }
}