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
import { AddReview } from "../components/Hotels/Page/Reviews/AddReview";

export const Hotel : FC = () => {
    const {id, checkInCheckOut} = useParams();
    const dispatch = useAppDispatch();
    let {items, isLoading, error} = useTypedSelector(state => state.hotels.catalog.container);
    const hotelsReviews = useTypedSelector(state => state.hotels.reviews);

    useEffect(() => {
        dispatch(fetchHotels());
    }, [dispatch]);

    const about: HotelType | null = useMemo(
        () => items.length !== 0 ? items[Number(id) - 1] : null,
        [items]
    );

    let [location, setLocation] = useState<ShortLocation | null | undefined>(undefined);
    useEffect(() => {
        if (about !== null) {
            const fetchLocation = async () => {
                const location = await getLocaitonByAddress(about.location.text);
                setLocation(location);
            };
            fetchLocation();
        }
    }, [about]);

    let [isOpened, setIsOpened] = useState<boolean>(false);

    if(isLoading || location === undefined){
        return(
            <main className="flight-page">
                <div className="container">
                    <h1 className="loading message">Loading...</h1>
                </div>
            </main>
        )
    } 
    if(error !== null || location === null){
        return(
            <main className="flight-page">
                <div className="container">
                    <h1 className="error message">Some Error...</h1>
                </div>
            </main>
        )
    }

    if(about !== null){
        const currentHotelReviews = hotelsReviews.filter(r => r.hotelId === Number(about.id));
        let realGrade : number | "Unset" = "Unset";
        if(currentHotelReviews.length !== 0){
            const grade = currentHotelReviews.reduce((sum, r) => sum += r.grade, 0) / currentHotelReviews.length;
            realGrade = isNaN(grade) ? "Unset" : grade;
        }
        return(
            <main className={["hotel-page", isOpened ? "_appear-modal" : ""].filter(Boolean).join(" ")}>
                <Introduction 
                    id={Number(about.id)} contentType={SITE_PARTS.stays} parentCls={["hotel-page__introduction", "hotel-page__section", "section-hotel-page"]}
                    heading={about.name} 
                    city={location.city} country={location.country} endPoint={about.location.text}
                    locationInfo={about.location.text} 
                    starsCount={about.starsCount} 
                    price={Math.min(...about.rooms.map(room => transformPrice(room.price)))} 
                    shortReview={{
                        countReviews: currentHotelReviews.length, 
                        rating: realGrade
                    }}
                    images={{isMassive: true, value: about.images}}
                />
                <Overview 
                    main={about.overview} features={about.features} 
                    shortReview={{
                        countReviews: currentHotelReviews.length, 
                        rating: realGrade
                    }}
                />
                <Rooms about={about.rooms} hotelId={Number(id)} checkInCheckOut={checkInCheckOut as string} />
                <Location {...about.location} />
                <Amenities {...about.amenities} />
                <Reviews 
                    reviews={currentHotelReviews} 
                    shortReview={{
                        countReviews: currentHotelReviews.length, 
                        rating: realGrade
                    }} isOpened={[isOpened, setIsOpened]}
                />
                {isOpened && <AddReview isOpened={[isOpened, setIsOpened]} hotelId={Number(about.id)} />}
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