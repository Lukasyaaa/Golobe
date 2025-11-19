import React, { type FC } from "react";
import { FLIGHT_AMENITIES, type Point } from "../../../types";
import {SITE_PARTS, type objType, type Srcs} from "../../../types";
import { FlightAmenities } from "../Blocks/FlightAmenities";
import { IntroductionLink } from "../Blocks/IntroductionLink";


interface IntroductionProps{
    contentType: objType<typeof SITE_PARTS>, parentCl: string,
    heading: string, price: number,
    linkLogo: Srcs, linkTitle: string, linkText: string, linkPath: string
    amenities: objType<typeof FLIGHT_AMENITIES>[] | null,
    departDate: string | null, flyDuration: string | null,
    start: Point, end: Point
}

export const Introduction : FC<IntroductionProps> = (props) => {
    const {
        contentType, parentCl, heading, price, linkLogo, linkTitle, linkText, linkPath, 
        amenities, departDate, flyDuration, start, end
    } = props;
    return(
        <article 
            className={[
                "booking__article", parentCl + "__article", 
                "booking__introduction", "introduction-booking",
                parentCl + "__introduction", "introduction-" + parentCl,
            ].join(" ")}
        >
            <div className={`introduction-${parentCl}__header introduction-booking__header`}>
                <h2 className={`introduction-${parentCl}__heading introduction-booking__heading`}>
                    {heading}
                </h2>
                <div className={`introductio-${parentCl}__price introduction-booking__price`}>
                    <strong>{"$" + price}</strong>/night
                </div>
            </div>
            {departDate !== null && <div className="introduction-airline__subheader">
                <h2 className="introduction-airline__date">
                    {departDate}
                </h2>
                <div className="introduction-airline__fly-duration">{flyDuration}</div>
            </div>}
            {(amenities !== null) 
                ? <div className="introduction-airline__row">
                    <IntroductionLink 
                        path={linkPath}
                        parentCls={[`introduction-${parentCl}`, "introduction-booking"]} 
                        logo={linkLogo} text={linkText} title={linkTitle} contentType={contentType}
                    />
                    <FlightAmenities parentCl="introduction-airline" amenities={amenities} />
                </div>
                : <IntroductionLink 
                    path={linkPath}
                    parentCls={[`introduction-${parentCl}`, "introduction-booking"]} 
                    logo={linkLogo} text={linkText} title={linkTitle} contentType={contentType}
                />
            }
            <div className={`introduction-${parentCl}__schedule introduction-booking__schedule`}>
                <div 
                    className={[
                        `introduction-${parentCl}__schedule-item`, `schedule-item-introduction-${parentCl}`,
                        "introduction-booking__schedule-item", "schedule-item-introduction-booking"
                    ].join(" ")}
                >
                    <time 
                        className={`schedule-item-introduction-${parentCl}__time schedule-item-introduction-booking__time`} 
                        dateTime={start.timeFunctionable}
                    >
                        {start.timeVisible}
                    </time>
                    <div className={`schedule-item-introduction-${parentCl}__type schedule-item-introduction-booking__type`}>
                        {start.description}
                    </div>
                </div>
                <div 
                    className={[
                        `introduction-${parentCl}__schedule-item`, `schedule-item-introduction-${parentCl}`,
                        "introduction-booking__schedule-item", "schedule-item-introduction-booking"
                    ].join(" ")}
                >
                    <div className={`schedule-item-introduction-${parentCl}__inner schedule-item-introduction-booking__inner`}>
                        <time 
                            className={`schedule-item-introduction-${parentCl}__time schedule-item-introduction-booking__time`} 
                            dateTime={end.timeFunctionable}
                        >
                            {end.timeVisible}
                        </time>
                        <div className={`schedule-item-introduction-${parentCl}__type schedule-item-introduction-booking__type`}>
                            {end.description}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}