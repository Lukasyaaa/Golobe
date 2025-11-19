import React, { type FC } from "react";
import { ChooseOption } from "./Option.tsx";
import { flightsCatalogPath, hotelsCatalogPath } from "../../../App.tsx";

export const Choose : FC = () => {
    const flightsPart = {
        heading : "Flights",
        description : "Search Flights & Places Hire to our most popular destinations",
        button : "Show Filghts",
        background : { jpeg: "/img/start/choose/flights/image.jpg", webp: "/img/start/choose/flights/image.webp" }
    }
    const hotelsPart = {
        heading : "Hotels",
        description : "Search hotels & Places Hire to our most popular destinations",
        button : "Show Hotels",
        background : { jpeg: "/img/start/choose/hotels/image.jpg", webp: "/img/start/choose/hotels/image.webp" }
    }

    return(
        <section className="choose">
            <div className="container">
                <ChooseOption about={flightsPart} linkPath={flightsCatalogPath} />
                <ChooseOption about={hotelsPart} linkPath={hotelsCatalogPath} />
            </div>
        </section>
    )
}