import { type FC } from "react";
import { ChooseOption } from "./Option.tsx";
import { flightsPath, hotelsPath } from "../../../App.tsx";
import ChooseFlightJpeg from "../../../assets/start/choose/flights/image.jpg";
import ChooseFlightWebp from "../../../assets/start/choose/flights/image.webp";
import ChooseHotelJpeg from "../../../assets/start/choose/hotels/image.jpg";
import ChooseHotelWebp from "../../../assets/start/choose/hotels/image.webp";

export const Choose : FC = () => {
    const flightsPart = {
        heading : "Flights",
        description : "Search Flights & Places Hire to our most popular destinations",
        button : "Show Filghts",
        background : { jpeg: ChooseFlightJpeg, webp: ChooseFlightWebp }
    }
    const hotelsPart = {
        heading : "Hotels",
        description : "Search hotels & Places Hire to our most popular destinations",
        button : "Show Hotels",
        background : { jpeg: ChooseHotelJpeg, webp: ChooseHotelWebp }
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