import React, { useMemo, type FC } from "react";
import { IntroVariants } from "../components/Common/InfoPage/IntroVariants";
import { Offers } from "../components/Common/InfoPage/Offers/Offers";
import { useTypedSelector } from "../store";
import { SITE_PARTS } from "../types";
import { Travels } from "../components/Common/InfoPage/Travels/Travels";
import { Recent } from "../components/Hotels/Home/Recent";

export const Hotels : FC = () =>{
    const about = useTypedSelector(state => state.hotels.start);

    const introAbout = useMemo(
        () => ({
            heading: "Make your travel whishlist, we’ll do the rest",
            subheading: "Special offers to suit your plan",
            background: { 
                jpeg: "/img/hotels/home/banner/background.jpg", 
                webp: "/img/hotels/home/banner/background.webp" 
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
        <main className="hotels">
            <IntroVariants {...introAbout} type={SITE_PARTS.stays} />
            <Recent />
            <Travels {...about.travels} {...travelsAbout} type={SITE_PARTS.stays} />
            <Offers {...about.offers} {...offersAbout} type={SITE_PARTS.stays} />
        </main>
    )
}