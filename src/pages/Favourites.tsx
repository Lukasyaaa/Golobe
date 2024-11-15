import React, { FC, useState } from "react";
import { Sort } from "../components/Configurate/Sort/Sort";
import { contentPart } from "../types";
import { useTypedSelector } from "../useTypedSelector";
import { HotelsItem } from "../components/Hotels/Items/HotelsItem";
import { FlightsItem } from "../components/Flights/Items/FlightsItem";

export const Favourites : FC = () => {
    let [contentType, setContentType] = useState<number>(0);
    let favouritesStore = useTypedSelector(state => state.user.favourites);
    let flightsStore = useTypedSelector(state => state.flights.items);
    let hotelsStore = useTypedSelector(state => state.hotels.items);
    const swap = () => {

    }

    return(
        <main className="favourites">
            <div className="container">
                <h2 className="favourites__heading">Favourites</h2>
                <Sort 
                    displayedFilters={null} isLink={false} showMoreText="Another Variants" parentClasses={["favourites"]}
                    about={[contentPart.Flights, contentPart.Hotels]} maxShow={3} 
                    activeNumber={{value: contentType, set: setContentType}} swap={swap}
                />
                <div className="favourites__items">
                    {(contentType === 0)
                        ? favouritesStore.flights.map((favouriteId, i) => {
                            return(
                                <FlightsItem 
                                    key={i} about={flightsStore.elements[favouriteId]} buttonLink={flightsStore.buttonLink} 
                                    isFavourite={true} isAuthorized={true}
                                />
                            )
                        })
                        : favouritesStore.hotels.map((favouriteId, i) => {
                            let minPrice = 
                                hotelsStore.elements[favouriteId].rooms[0].price.baseFare + 
                                hotelsStore.elements[favouriteId].rooms[0].price.serviceFee + 
                                hotelsStore.elements[favouriteId].rooms[0].price.taxes - 
                                hotelsStore.elements[favouriteId].rooms[0].price.discount;
                            hotelsStore.elements[favouriteId].rooms.slice(1).map(room => {
                                let price = room.price.baseFare + room.price.serviceFee + room.price.taxes - room.price.discount;
                                if(price < minPrice){
                                    minPrice = price;
                                }
                            })
                            return(
                                <HotelsItem 
                                    key={i} about={hotelsStore.elements[favouriteId]} buttonLink={hotelsStore.buttonLink} 
                                    minPrice={minPrice} isFavourite={true} isAuthorized={true}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </main>
    )
}