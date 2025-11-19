import React, { useEffect, useMemo, type FC } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../store";
import { fetchHotels } from "../store/hotels";
import { SITE_PARTS, transformPrice, type Hotel as HotelType } from "../types";
import { Overview } from "../components/Hotels/Page/Overview";
import { Rooms } from "../components/Hotels/Page/Rooms/Rooms";
import { Location } from "../components/Hotels/Page/Location";
import { Amenities } from "../components/Hotels/Page/Amenities/Amenities";
import { Reviews } from "../components/Hotels/Page/Reviews/Reviews";
import { Introduction } from "../components/Common/Introduction";
import { Images } from "../components/Hotels/Page/Images";

export const Hotel : FC = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const hotels = useTypedSelector(state => state.hotels.catalog.container.items);

    useEffect(() => {
        dispatch(fetchHotels());
    }, [dispatch]);

    const about: HotelType | null = useMemo(
        () => hotels.length !== 0 ? hotels[Number(params.id) - 1] : null,
        [hotels]
    );

    if(about !== null){
        return(
            <main className="hotel-page">
                <Introduction 
                    contentType={SITE_PARTS.stays} parentCls={["hotel-page__introduction", "hotel-page__section", "section-hotel-page"]}
                    heading={about.name} endPoint={about.location.text} starsCount={about.starsCount} 
                    price={Math.min(...about.rooms.map(room => transformPrice(room.price)))} 
                    shortReview={{countReviews: about.reviews.items.length, rating: about.rating}}
                    images={{isMassive: true, value: about.images}}
                />
                <Overview 
                    main={about.overview} features={about.features} 
                    shortReview={{countReviews: about.reviews.items.length, rating: about.rating}}
                />
                <Rooms about={about.rooms} hotelId={Number(params.id)} />
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