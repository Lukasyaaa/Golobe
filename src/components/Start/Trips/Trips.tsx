import React, { FC, useState } from "react";
import firstImageJpeg from "../../../assets/img/start/trips/1/main.jpeg";
import firstImageWebp from "../../../assets/img/start/trips/1/main.webp";
import secondImageJpeg from "../../../assets/img/start/trips/2/main.jpeg";
import secondImageWebp from "../../../assets/img/start/trips/2/main.webp";
import thirdImageJpeg from "../../../assets/img/start/trips/3/main.jpeg";
import thirdImageWebp from "../../../assets/img/start/trips/3/main.webp";
import fourthImageJpeg from "../../../assets/img/start/trips/4/main.jpeg";
import fourthImageWebp from "../../../assets/img/start/trips/4/main.webp";
import fifthImageJpeg from "../../../assets/img/start/trips/5/main.jpeg";
import fifthImageWebp from "../../../assets/img/start/trips/5/main.webp";
import sixthImageJpeg from "../../../assets/img/start/trips/6/main.jpeg";
import sixthImageWebp from "../../../assets/img/start/trips/6/main.webp";
import seventhImageJpeg from "../../../assets/img/start/trips/7/main.jpeg";
import seventhImageWebp from "../../../assets/img/start/trips/7/main.webp";
import eigthImageJpeg from "../../../assets/img/start/trips/8/main.jpeg";
import eigthImageWebp from "../../../assets/img/start/trips/8/main.webp";
import ninthImageJpeg from "../../../assets/img/start/trips/9/main.jpeg";
import ninthImageWebp from "../../../assets/img/start/trips/9/main.webp";

import { SectionHeader } from "../../Common/SectionHeader.tsx";
import { Trip } from "./Trip.tsx";
import { Section, Trip as TripInterface } from "../../../types.ts";

export const Trips : FC = () => {
    const about : Section<TripInterface> = {
        header: {
            title: "Plan your perfect trip", 
            text: "Search Flights & Places Hire to our most popular destinations",
            button: { active: "Hide", passive: "See more places" }
        },
        content: [
            {
                city: "Istanbul", includes: ["Flights", "Hotels", "Resorts"], 
                image: { srcs: {jpeg: firstImageJpeg, webp: firstImageWebp}, alt: "Image" },
                link: "#"
            },        {
                city: "Sydney", includes: ["Flights", "Hotels", "Resorts"], 
                image: { srcs: {jpeg: secondImageJpeg, webp: secondImageWebp}, alt: "Image" },
                link: "#"
            },        {
                city: "Baku", includes: ["Flights", "Hotels", "Resorts"], 
                image: { srcs: {jpeg: thirdImageJpeg, webp: thirdImageWebp}, alt: "Image" },
                link: "#"
            },        {
                city: "Male", includes: ["Flights", "Hotels", "Resorts"], 
                image: { srcs: {jpeg: fourthImageJpeg, webp: fourthImageWebp}, alt: "Image" },
                link: "#"
            },        {
                city: "Paris", includes: ["Flights", "Hotels", "Resorts"], 
                image: { srcs: {jpeg: fifthImageJpeg, webp: fifthImageWebp}, alt: "Image" },
                link: "#"
            },        {
                city: "New York", includes: ["Flights", "Hotels", "Resorts"], 
                image: { srcs: {jpeg: sixthImageJpeg, webp: sixthImageWebp}, alt: "Image" },
                link: "#"
            },        {
                city: "London", includes: ["Flights", "Hotels", "Resorts"], 
                image: { srcs: {jpeg: seventhImageJpeg, webp: seventhImageWebp}, alt: "Image" },
                link: "#"
            },        {
                city: "Tokyo", includes: ["Flights", "Hotels", "Resorts"], 
                image: { srcs: {jpeg: eigthImageJpeg, webp: eigthImageWebp}, alt: "Image" },
                link: "#"
            },
            {
                city: "Dubai", includes: ["Flights", "Hotels", "Resorts"], 
                image: { srcs: {jpeg: ninthImageJpeg, webp: ninthImageWebp}, alt: "Image" },
                link: "#"
            },
            {
                city: "New York", includes: ["Flights", "Hotels", "Resorts"], 
                image: { srcs: {jpeg: sixthImageJpeg, webp: sixthImageWebp}, alt: "Image" },
                link: "#"
            },        {
                city: "London", includes: ["Flights", "Hotels", "Resorts"], 
                image: { srcs: {jpeg: seventhImageJpeg, webp: seventhImageWebp}, alt: "Image" },
                link: "#"
            },        {
                city: "Tokyo", includes: ["Flights", "Hotels", "Resorts"], 
                image: { srcs: {jpeg: eigthImageJpeg, webp: eigthImageWebp}, alt: "Image" },
                link: "#"
            },
            {
                city: "Dubai", includes: ["Flights", "Hotels", "Resorts"], 
                image: { srcs: {jpeg: ninthImageJpeg, webp: ninthImageWebp}, alt: "Image" },
                link: "#"
            },
        ],
        maxShow: 9
    }

    let [isShowAll, setIsShowAll] = useState<boolean>(false);

    return(
        <section className="trips">
            <div className="container">
                {(about.maxShow < about.content.length)
                    ? <SectionHeader 
                        parent="trips"
                        about={about.header} 
                        isNeedButton={true}
                        isShowAll={{value: isShowAll, set: setIsShowAll}}    
                    />
                    : <SectionHeader 
                        parent="trips"
                        about={{ title: about.header.title, text: about.header.text }} 
                        isNeedButton={false}
                    />
                }
                <div className="trips__items">
                    {about.content.slice(0, ((isShowAll) ? about.content.length : about.maxShow)).map((trip, i) => 
                        <Trip key={i} about={trip} />
                    )}
                </div>
            </div>
        </section>
    )
}