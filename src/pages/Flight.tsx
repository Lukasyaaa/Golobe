import { useEffect, useMemo, useState, type FC } from "react";
import { useParams } from "react-router-dom";
import { getSeatsGroup, getAirlineSrcs, SEATS_TYPE, SITE_PARTS, transformPrice, getAirportByIATA } from "../types";
import type { Flight as FlightType, objType, AirportInfo, ScheduleSingle, ScheduleParts} from "../types";
import { useAppDispatch, useTypedSelector } from "../store";
import { fetchFlights } from "../store/flights";
import { ChooseText } from "../components/Common/Blocks/Choose/Choose";
import { Seats } from "../components/Flights/Page/Seats";
import { Link } from "../components/Flights/Page/Link";
import { flightPath } from "../App";
import { Introduction } from "../components/Common/Introduction";
import { useSchedulePart } from "../hooks/useSchedulePart";
import { TextOption } from "../components/Common/Blocks/Choose/TextCategory";

interface AirporitState{
    from: AirportInfo,
    to: AirportInfo
}

export const Flight : FC = () => {
    const {options, id} = useParams();
    console.log(options);
    const {container} = useTypedSelector(state => state.flights.catalog);
    const {isLoading, items, error} = container;

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchFlights());
    }, [dispatch]);

    const flight: FlightType | null = useMemo(
        () => items.length !== 0 ? items[Number(id) - 1] : null,
        [items]
    );
    let [choosedPart, setChoosedPart] = useState<number>(0);
    let [choosedSeats, setChoosedSeats] = useState<objType<typeof SEATS_TYPE>>(SEATS_TYPE.economy);

    let [airports, setAirports] = useState<(AirporitState | null)[]>([]);

    useEffect(() => {
        if (flight !== null) {
            const fetchAirports = async () => {
                const opts = String(options).split("+");
                let promises: Promise<AirporitState | null>[] = [];
                if(opts[0] === "On-Way"){
                    const fromIATA = (flight.schedule as ScheduleSingle).startPoint;
                    const toIATA = (flight.schedule as ScheduleSingle).endPoint;
                    promises.push(
                        (async () => {
                            const from = await getAirportByIATA(fromIATA);
                            const to = await getAirportByIATA(toIATA);
                            return (from && to) ? { from, to } as AirporitState : null;
                        })()
                    );
                } else if(opts[0] === "Depart" || opts[0] === "Return" || opts[0] === "Round-Trip"){
                    let data = [];
                    if(opts[0] === "Depart"){
                        data.push({
                            from: (flight.schedule as ScheduleParts).from.startPoint,
                            to: (flight.schedule as ScheduleParts).to.startPoint
                        })
                    } else if(opts[0] === "Return") {
                        data.push({
                            from: (flight.schedule as ScheduleParts).to.startPoint,
                            to: (flight.schedule as ScheduleParts).from.startPoint
                        })
                    } else {
                        data.push(
                            {
                                from: (flight.schedule as ScheduleParts).from.startPoint,
                                to: (flight.schedule as ScheduleParts).to.startPoint
                            },
                            {
                                from: (flight.schedule as ScheduleParts).to.startPoint,
                                to: (flight.schedule as ScheduleParts).from.startPoint
                            }
                        )
                    }
                    promises = data.map(async (sP) => {
                        const from = await getAirportByIATA(sP.from);
                        const to = await getAirportByIATA(sP.to);
                        return (from && to) ? { from, to } as AirporitState : null;
                    });
                } else {
                    promises = opts.map(async (option) => {
                        const [fromIATA, toIATA] = option.split("-");
                        const from = await getAirportByIATA(fromIATA);
                        const to = await getAirportByIATA(toIATA);
                        return (from && to) ? { from, to } as AirporitState : null;
                    });
                }

                const results = await Promise.all(promises);
                setAirports(results);
            };

            fetchAirports();
        }
    }, [flight, choosedPart]);

    if(isLoading || airports.length === 0){
        return(
            <main className="flight-page">
                <div className="container">
                    <h1 className="loading message">Loading...</h1>
                </div>
            </main>
        )
    } 
    if(error !== null || airports.includes(null)){
        return(
            <main className="flight-page">
                <div className="container">
                    <h1 className="error message">Some Error...</h1>
                </div>
            </main>
        )
    }

    if(flight !== null){
        const argOptions = String(options).split("+")[choosedPart] === "Round-Trip" ? ["Depart", "Return"] : String(options).split("+");
        const {flightPart, flightEndPoint, flightRoute} = useSchedulePart(argOptions[choosedPart], flight);
        return(
            <main className="flight-page">
                {argOptions.length !== 1 && 
                <div className="container">
                    <ChooseText 
                        links={argOptions} maxShow={4} opener={"Show more Parts"}
                        activeOption={[choosedPart, setChoosedPart]}
                        ChildrenComponent={TextOption}
                    />
                </div>}
                <Introduction 
                    id={Number(flight.id)} contentType={SITE_PARTS.flights} 
                    city={(airports[choosedPart] as AirporitState).to.city} 
                    country={(airports[choosedPart] as AirporitState).to.country} 
                    endPoint={(airports[choosedPart] as AirporitState).to.airportName} 
                    locationInfo={(airports[choosedPart] as AirporitState).to.address}
                    parentCls={["flight-page__introduction"]}
                    heading={flightPart.airline + " " + flightPart.plane}
                    starsCount={null} shortReview={{countReviews: flight.countReviews, rating: flight.rating}}
                    price={transformPrice(getSeatsGroup(choosedSeats, flightPart).price)}
                    images={{isMassive: false, value: flightPart.image}}
                    tripTypes={String(options)}
                />
                <Seats 
                    choosed={[choosedSeats, setChoosedSeats]} 
                    getSeatsGroupHandler={(type: objType<typeof SEATS_TYPE>) => getSeatsGroup(type, flightPart)} 
                />
                <Link 
                    policiesLinks={["Pre-flight cleaning, installation of cabin HEPA filters.", "Pre-flight health screening questions."]} 
                    flightRoute={flightRoute} 
                    from={flightPart.startPoint} fromTranscript={(airports[choosedPart] as AirporitState).from.city}
                    to={flightEndPoint} toTranscript={(airports[choosedPart] as AirporitState).to.city}
                    departTime={flightPart.departTime} arrayTime={flightPart.arrayTime}
                    amenities={flightPart.amenities} 
                    airline={{srcs: getAirlineSrcs(flightPart.airline), alt: flightPart.airline}} 
                    plane={flightPart.plane} 
                    path={flightPath + "/" + id + "/" + argOptions[choosedPart] + "/" + choosedSeats.replace(" ", "-")}
                />
            </main>
        )
    } else {
        return(
           <main className="flight-page">
                <div className="container">
                    <h1 className="failed-load message">Failed to load Data...</h1>
                </div>
            </main>
        )
    }
}