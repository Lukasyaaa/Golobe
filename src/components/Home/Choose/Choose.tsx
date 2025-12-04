import { type FC } from "react";
import { ChooseOption } from "./Option.tsx";
import { flightsPath, hotelsPath } from "../../../App.tsx";

export const Choose : FC = () => {
    const flightsPart = {
        heading : "Flights",
        description : "Search Flights & Places Hire to our most popular destinations",
        button : "Show Filghts",
        background : { 
            jpeg: "public/img/start/choose/flights/image.jpg", 
            webp: "public/img/start/choose/flights/image.webp" 
        }
    }
    const hotelsPart = {
        heading : "Hotels",
        description : "Search hotels & Places Hire to our most popular destinations",
        button : "Show Hotels",
        background : { 
            jpeg: "public/img/start/choose/hotels/image.jpg", 
            webp: "public/img/start/choose/hotels/image.webp" 
        }
    }

    return(
        <section className="choose">
            <div className="container">
                <ChooseOption {...flightsPart} linkPath={flightsPath} />
                <ChooseOption {...hotelsPart} linkPath={hotelsPath} />
            </div>
        </section>
    )
}