import React, { FC } from "react";
import { SharedHeader } from "../../components/Common/SharedHeader";
import { contentPart } from "../../types";
import { useParams } from "react-router-dom";
import { useTypedSelector } from "../../useTypedSelector";
import { HotelOverview } from "../../components/Hotels/Page/HotelOverview";
import { HotelRooms } from "../../components/Hotels/Page/HotelRooms/HotelRooms";
import { HotelLocation } from "../../components/Hotels/Page/HotelLocation";
import { HotelReviews } from "../../components/Hotels/Page/HotelReviews/HotelReviews";
import { HotelAmenities } from "../../components/Hotels/Page/HotelAmenities/HotelAmenities";
import { HotelHeader } from "../../components/Hotels/Page/HotelHeader";

export const Hotel : FC = () => {
    let store = useTypedSelector(state => state.hotels.items);
    const params = useParams();

    return(
        <main className="hotel">
            <HotelHeader 
                about={store.elements[Number(params.id) - 1]} buttonImagesMore={store.buttonShowAllImages}
            />
            <HotelOverview about={store.elements[Number(params.id) - 1]} />
            <HotelRooms 
                hotelId={Number(params.id) - 1} buttonLink={store.buttonRoomLink} 
                about={store.elements[Number(params.id) - 1].rooms} 
            />
            <HotelLocation about={store.elements[Number(params.id) - 1].location} />
            <HotelAmenities about={store.elements[Number(params.id) - 1].includes} />
            <HotelReviews about={store.elements[Number(params.id) - 1]} />
        </main>
    )
}