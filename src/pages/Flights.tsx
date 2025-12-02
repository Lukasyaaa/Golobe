import React, { useMemo, type FC } from "react";
import { IntroVariants } from "../components/Common/InfoPage/IntroVariants";
import { useTypedSelector } from "../store";
import { SITE_PARTS } from "../types";
import { Travels } from "../components/Common/InfoPage/Travels/Travels";
import { Offers } from "../components/Common/InfoPage/Offers/Offers";
import { Map } from "../components/Flights/Start/Map";

export const Flights : FC = () =>{
    const about = useTypedSelector(state => state.flights.start);

    const introAbout = useMemo(
        () => ({
            heading: "Make your travel whishlist, we’ll do the rest",
            subheading: "Special offers to suit your plan",
            background: { 
                jpeg: "/img/flights/home/banner/background.jpg", 
                webp: "/img/flights/home/banner/background.webp" 
            }
        }), []
    )
    const travelsAbout = useMemo(
        () => ({
            header: {
                heading: "Fall into travel", 
                description: "Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination.", 
                button: {active: "See All", disable: "Hide"}
            }, maxShow: 4
        }), []
    )
    const offersAbout = useMemo(
        () => ({
            header: {
                heading: "Fall into travel", 
                description: "Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination.", 
                button: {active: "See All", disable: "Hide"}
            }, maxShow: 1
        }), []
    )

    return(
        <main className="flights">
            <IntroVariants {...introAbout} type={SITE_PARTS.flights} />
            <Map />
            <Travels {...about.travels} {...travelsAbout} type={SITE_PARTS.flights} />
            <Offers {...about.offers} {...offersAbout} type={SITE_PARTS.flights} />
        </main>
    )
}