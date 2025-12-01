import React, { useEffect, useMemo, useState, type FC } from "react";
import { useAppDispatch, useTypedSelector } from "../store";
import { ChooseFull } from "../components/Common/Blocks/Choose/Choose";
import { FullOption } from "../components/Common/Blocks/Choose/FullOption";
import { fetchFlights } from "../store/flights";
import { fetchHotels } from "../store/hotels";
import { Flight } from "../components/Flights/Catalog/Flight";
import { Hotel } from "../components/Hotels/Catalog/Hotel";
import { getSchedulePartsCount } from "../types";
import { useNavigate } from "react-router-dom";
import { startPath } from "../App";

const SORT_LINKS_TITLES = {
    flights: "Flights",
    places: "Places"
} as const;

export const Favoutires : FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useTypedSelector(state => state.user);
    const flights = useTypedSelector(state => state.flights.catalog.container);
    const hotels = useTypedSelector(state => state.hotels.catalog.container);
    useEffect(() => {
        dispatch(fetchFlights());
        dispatch(fetchHotels());
    }, [dispatch])
    let [activeOption, setActiveOption] = useState<number>(0);
    const sortLinks = useMemo(() => {
        const tempSortLinks = [];
        if(user.favourites.flightsPart.length !== 0){
            tempSortLinks.push({
                title: SORT_LINKS_TITLES.flights, 
                description: user.favourites.flightsPart.length + " marked"
            });
        }
        if(user.favourites.hotelsPart.length !== 0){
            tempSortLinks.push({
                title: SORT_LINKS_TITLES.places, 
                description: user.favourites.hotelsPart.length + " marked"
            })
        }
        return tempSortLinks;
    }, [])

    useEffect(() => {
        if(user.favourites.flightsPart.length === 0 && user.favourites.hotelsPart.length === 0){
            navigate(startPath);
        }
    }, [user.favourites])

    if(flights.isLoading || flights.items.length === 0 || hotels.isLoading || hotels.items.length === 0){
        return(
            <main className="catalog">
                <div className="container">
                    <h1 className="loading message">Loading...</h1>
                </div>
            </main>
        )
    }
    if(flights.error !== null || hotels.error !== null){
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
        <main className="favourites">
            <div className="container">
                <div className="favourites__heading">Favourites</div>
                {sortLinks.length === 2 && <ChooseFull 
                        links={sortLinks} maxShow={3} opener="Show More"
                        activeOption={[activeOption, setActiveOption]}
                        ChildrenComponent={FullOption}
                    />
                }
                <div className="favourites__container">
                    {sortLinks[activeOption].title === SORT_LINKS_TITLES.flights 
                        ? user.favourites.flightsPart.map((flightId, i) => {
                            prevCheckboxes += getSchedulePartsCount(flights.items[flightId]);
                            return(<Flight 
                                key={i} about={flights.items[flightId]} isInFavourites={true} currentUser={user} 
                                groupId={i} prevCheckboxes={prevCheckboxes} 
                            />)
                        })
                        : user.favourites.hotelsPart.map((hotelId, i) => 
                            <Hotel key={i} about={hotels.items[hotelId]} isInFavourites={true} currentUser={user} 
                        />)
                    }
                </div>
             </div>
        </main>
    )
} 