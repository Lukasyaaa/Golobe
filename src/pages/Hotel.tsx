import React, { useEffect, useMemo, useState, type FC } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../store";
import { fetchHotels } from "../store/hotels";
import { SITE_PARTS, transformPrice, type Hotel as HotelType, type ShortLocation, getLocaitonByAddress } from "../types";
import { Overview } from "../components/Hotels/Page/Overview";
import { Rooms } from "../components/Hotels/Page/Rooms/Rooms";
import { Location } from "../components/Hotels/Page/Location";
import { Amenities } from "../components/Hotels/Page/Amenities";
import { Reviews } from "../components/Hotels/Page/Reviews/Reviews";
import { Introduction } from "../components/Common/Introduction";

export const Hotel : FC = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const {items, isLoading, error} = useTypedSelector(state => state.hotels.catalog.container);

    useEffect(() => {
        dispatch(fetchHotels());
    }, [dispatch]);

    const about: HotelType | null = useMemo(
        () => items.length !== 0 ? items[Number(id) - 1] : null,
        [items]
    );

    let [location, setLocation] = useState<ShortLocation | null>(null);
    useEffect(() => {
        if (about !== null) {
            const fetchLocation = async () => {
                const location = await getLocaitonByAddress(about.location.text);
                setLocation(location);
            };
            fetchLocation();
        }
    }, [about]);

    if(isLoading || location === null){
        return(
            <main className="flight-page">
                <div className="container">
                    <h1 className="loading message">Loading...</h1>
                </div>
            </main>
        )
    } 
    if(error !== null){
        return(
            <main className="flight-page">
                <div className="container">
                    <h1 className="error message">Some Error...</h1>
                </div>
            </main>
        )
    }

    if(about !== null){
        return(
            <main className="hotel-page">
                <Introduction 
                    id={about.id} contentType={SITE_PARTS.stays} parentCls={["hotel-page__introduction", "hotel-page__section", "section-hotel-page"]}
                    heading={about.name} 
                    city={location.city} country={location.country} endPoint={about.location.text}
                    locationInfo={about.location.text} 
                    starsCount={about.starsCount} 
                    price={Math.min(...about.rooms.map(room => transformPrice(room.price)))} 
                    shortReview={{countReviews: about.reviews.items.length, rating: about.rating}}
                    images={{isMassive: true, value: about.images}}
                />
                <Overview 
                    main={about.overview} features={about.features} 
                    shortReview={{countReviews: about.reviews.items.length, rating: about.rating}}
                />
                <Rooms about={about.rooms} hotelId={Number(id)} />
                <Location {...about.location} />
                <Amenities {...about.amenities} />
                <Reviews reviews={about.reviews} shortReview={{countReviews: about.reviews.items.length, rating: about.rating}} />
            </main>
        )
    } else{
        return (
            <main className="hotel-page">
                <div className="container">Failed to load Data</div>
            </main>
        )
    }
}