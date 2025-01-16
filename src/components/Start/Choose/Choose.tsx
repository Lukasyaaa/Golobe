import React, { FC } from "react";
import { ChooseVariant } from "./ChooseVariant.tsx";
import flightsChooseJpeg from "../../../assets/img/start/choose/flights/main.jpeg";
import flightsChooseWebp from "../../../assets/img/start/choose/flights/main.webp";
import hotelsChooseJpeg from "../../../assets/img/start/choose/hotels/main.jpeg";
import hotelsChooseWebp from "../../../assets/img/start/choose/hotels/main.webp";
import { ChooseVariant as ChooseVariantInterface } from "../../../types.ts";

interface Choose{
    flights : ChooseVariantInterface,
    hotels : ChooseVariantInterface
}

interface ChooseProps{
    isWebp : boolean
}

export const Choose : FC<ChooseProps> = ({isWebp}) => {
    const about : Choose = {
        flights: {
            title: "Flights",
            subtitle: "Search Flights & Places Hire to our most popular destinations",
            link: { href: "#", text: "Show Filghts"},
            background: { srcs: { webp: flightsChooseWebp, jpeg: flightsChooseJpeg }, alt: "" }
        },
        hotels: {
            title: "Hotels",
            subtitle: "Search hotels & Places Hire to our most popular destinations",
            link: { href: "#", text: "Show Hotels"},
            background: { srcs: { webp: hotelsChooseWebp, jpeg: hotelsChooseJpeg }, alt: "" }
        }
    }

    return(
        <section className="choose">
            <div className="container">
                <ChooseVariant about={about.flights} isWebp={isWebp} />
                <ChooseVariant about={about.hotels} isWebp={isWebp} />
            </div>
        </section>
    )
}