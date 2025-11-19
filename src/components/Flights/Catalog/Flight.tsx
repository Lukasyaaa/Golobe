import React, { useMemo, useState, type FC } from "react";
import { AIRLINES, FILL_RULE, getSchedulePartsCount, STROKE_LINECAP, STROKE_LINEJOIN, TRIP_TYPE, getPrice } from "../../../types";
import type {Flight as FlightType, objType, SchedulePart, ScheduleSingle, Srcs} from "../../../types";
import { ShortReview } from "../../Common/Blocks/ShortReview";
import { FlightSchedulePart } from "./ScheduleLink";
import { ButtonBorder } from "../../Common/Blocks/ButtonBorder";
import { NavLink } from "react-router-dom";
import { flightsCatalogPath } from "../../../App";

interface FlightProps{
    about: FlightType,
    getSrcs: (desc : objType<typeof AIRLINES>) => Srcs,
    groupId: number,
    prevCheckboxes: number
}

export const Flight : FC<FlightProps> = ({about, getSrcs, groupId, prevCheckboxes}) => {
    const {rating, countReviews, schedule, type} = about

    let airlines: objType<typeof AIRLINES>[] = [];
    let classes : string[] = ["flight"];
    let scheduleMassive : SchedulePart[] = [];
    let endPoints : (null | string)[] = [];
    if(type === TRIP_TYPE.onWay){
        airlines = [schedule.airline];
        const {endPoint, placeFrom, placeTo, ...otherSchedule} = about.schedule;
        scheduleMassive = [{...otherSchedule, place: placeFrom}];
        endPoints = [about.schedule.endPoint];
    } else if(type === TRIP_TYPE.roundTrip){
        airlines = [...new Set([schedule.from.airline, schedule.to.airline])];
        scheduleMassive = [about.schedule.from, about.schedule.to];
        endPoints = [about.schedule.to.startPoint, about.schedule.from.startPoint];
    } else if(type === TRIP_TYPE.multiCity){
        airlines = [...new Set([...schedule.parts.map(part => part.airline)])];
        scheduleMassive = [...about.schedule.parts];
        endPoints = [...about.schedule.parts.slice(1).map(part => part.startPoint), about.schedule.endPoint];
    }
    if(airlines.length !== 1) classes.push("_many-image");

    let choosed = useState<number[]>([]);
    let path = useMemo(
        () => {
            switch(type){
                case TRIP_TYPE.onWay:
                    return flightsCatalogPath + "/" + (Number(about.id) + 1) + "/OnWay";
                case TRIP_TYPE.roundTrip:
                    const neededMassive: string[] = [(choosed[0].includes(0)) ? "Depart" : "", choosed[0].includes(1) ? "Return" : ""].filter(Boolean);
                    return flightsCatalogPath + "/" + (Number(about.id) + 1) + "/" + neededMassive.join("+");
                case TRIP_TYPE.multiCity:{
                    const {parts, endPoint} = schedule;
                    const neededMassive: string[] = choosed[0].map(choosedId => {
                        const part = parts[choosedId];
                        return part.startPoint + "-" + (part.route.join("-")) + ((part.route.length !== 0) ? "-" : "") + ((choosedId === parts.length - 1) ? endPoint : parts[choosedId + 1].startPoint)
                    }) 
                    return flightsCatalogPath + "/" + (Number(about.id) + 1) + "/" + neededMassive.join("+")
                }
            }
        }, [choosed[0]]
    );
    let hoveredId = useState<number>(-1);

    return(
        <article className={classes.join(" ")}>
            {airlines.length !== 1 
                ? <div className="flight__images">
                    {airlines.map((airline, i) => {
                        const srcs = getSrcs(airline);
                        return <picture className="flight__image" key={i}>
                            <source srcSet={srcs.webp} type="image/webp" />
                            <img src={srcs.jpeg} alt={airline} />
                        </picture>
                    })}
                </div>
                : <picture className="flight__image">
                    <source srcSet={getSrcs(airlines[0]).webp} type="image/webp" />
                    <img src={getSrcs(airlines[0]).jpeg} alt={airlines[0]} />
                </picture>
            }
            <div className="flight__info">
                <div className="flight__header">
                    <ShortReview about={{rating: rating, countReviews: countReviews}} parentCls={["flight"]} />
                    <div className="flight__price">starting from<strong>${getPrice(about)}</strong></div>
                </div>
                <ul className="flight__schedule">
                    {scheduleMassive.map((part, i) => {
                        return(
                            <FlightSchedulePart 
                                key={i} about={part} groupId={groupId} prevCheckboxes={prevCheckboxes} 
                                endPoint={endPoints[i]} choosed={choosed} hoveredId={hoveredId} id={i}
                                checkboxesCount={getSchedulePartsCount(about)}
                            />
                        )
                    })}
                </ul>
                <div className="flight__footer">
                    <ButtonBorder
                        parentCls={["flight"]} 
                        buttonCl="favourites"
                        value={{
                            viewbox: {minX: 0, minY: 0, width: 16.5, height: 15.25}, height: 15.25, width: 16.5,
                            pathes: [
                                {
                                    d: "m 8.2504,3.25 c 0,0 -1.25,-2.5 -3.78594,-2.5 C 2.40352,0.75 0.771493,2.47422 0.750399,4.53164 0.707431,8.80234 4.13829,11.8395 7.89884,14.3918 8.00251,14.4623 8.12501,14.5 8.2504,14.5 8.37579,14.5 8.49829,14.4623 8.60196,14.3918 12.3621,11.8395 15.793,8.80234 15.7504,4.53164 15.7293,2.47422 14.0973,0.75 12.0363,0.75 c -2.5359,0 -3.7859,2.5 -3.7859,2.5 z",
                                    fill: "unset", fillRule: FILL_RULE.nonzero,
                                    stroke: "rgb(17, 34, 17)", strokeLinecap: STROKE_LINECAP.round,
                                    strokeLinejoin: STROKE_LINEJOIN.round,
                                    strokeWidth: "1.5"
                                }
                            ]
                        }} 
                    />
                    {(choosed[0].length === 0)
                        ? <div className="flight__link button_green">View Deals</div>
                        : <NavLink className="flight__link button_green" to={path}>View Deals</NavLink>
                    }
                </div>
            </div>
        </article>
    )
}