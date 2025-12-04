import { useMemo, useState, type FC } from "react";
import { AIRLINES, getSchedulePartsCount, getPrice, getAirlineSrcs, SITE_PARTS, TRIP_TYPE } from "../../../types";
import type {Flight as FlightType, objType, SchedulePart, User} from "../../../types";
import { ShortReview } from "../../Common/Blocks/ShortReview";
import { FlightSchedulePart } from "./ScheduleLink";
import { ButtonBorder } from "../../Common/Blocks/ButtonBorder";
import { NavLink } from "react-router-dom";
import { flightPath } from "../../../App";
import { useFavourites } from "../../../hooks/useFavourites";

interface FlightProps{
    about: FlightType,
    isInFavourites: boolean,
    groupId: number,
    prevCheckboxes: number,
    currentUser: User;
}

interface FlightAbout{
    airlines: objType<typeof AIRLINES>[],
    scheduleMassive : SchedulePart[],
    endPoints : (null | string)[],
    path: string
}

export const Flight : FC<FlightProps> = ({about, isInFavourites, groupId, prevCheckboxes, currentUser}) => {
    const {rating, countReviews, schedule, type} = about;

    let [choosed, setChoosed] = useState<number[]>([]);
    let {airlines, scheduleMassive, endPoints, path}: FlightAbout = useMemo(
        () => {
            if(type === TRIP_TYPE.onWay){
                const {endPoint, placeFrom, placeTo, ...otherSchedule} = about.schedule;
                return ({
                    airlines: [schedule.airline],        
                    scheduleMassive: [{...otherSchedule, place: placeFrom}],
                    endPoints: [about.schedule.endPoint],
                    path: flightPath + "/" + (about.id + 1) + "/On-Way"
                })
            } else if(type === TRIP_TYPE.roundTrip){
                let neededPath;
                if(choosed.length === 2) neededPath = "Round-Trip";
                else neededPath = choosed.includes(0) ? "Depart" : "Return";
                return ({ 
                    airlines: [...new Set([schedule.from.airline, schedule.to.airline])],        
                    scheduleMassive: [about.schedule.from, about.schedule.to],
                    endPoints: [about.schedule.to.startPoint, about.schedule.from.startPoint],
                    path: flightPath + "/" + (about.id + 1) + "/" + neededPath
                })
            } else{
                const {parts, endPoint} = schedule;
                const neededMassive: string[] = choosed.map(choosedId => {
                    const part = parts[choosedId];
                    return part.startPoint + "-" + (part.route.join("-")) + ((part.route.length !== 0) ? "-" : "") + ((choosedId === parts.length - 1) ? endPoint : parts[choosedId + 1].startPoint)
                }) 
                return ({
                    airlines: [...new Set([...schedule.parts.map(part => part.airline)])],
                    scheduleMassive: [...about.schedule.parts],
                    endPoints: [...about.schedule.parts.slice(1).map(part => part.startPoint), about.schedule.endPoint],
                    path: flightPath + "/" + (about.id + 1) + "/" + neededMassive.join("+")
                })
            }
        }, [choosed.length, about]
    );

    let hoveredId = useState<number>(-1);
    const favouritesInfo = useFavourites(isInFavourites, about.id, currentUser, SITE_PARTS.flights);
    return(
        <article className={["flight", airlines.length !== 1 ? "_many-images" : ""].filter(Boolean).join(" ")}>
            {airlines.length !== 1 
                ? <div className="flight__images">
                    {airlines.map((airline, i) => {
                        const srcs = getAirlineSrcs(airline);
                        return <picture className="flight__image" key={i}>
                            <source srcSet={srcs.webp} type="image/webp" />
                            <img src={srcs.jpeg} alt={airline} />
                        </picture>
                    })}
                </div>
                : <picture className="flight__image">
                    <source srcSet={getAirlineSrcs(airlines[0]).webp} type="image/webp" />
                    <img src={getAirlineSrcs(airlines[0]).jpeg} alt={airlines[0]} />
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
                                endPoint={endPoints[i]} choosed={[choosed, setChoosed]} hoveredId={hoveredId} id={i}
                                checkboxesCount={getSchedulePartsCount(about)}
                            />
                        )
                    })}
                </ul>
                <div className="flight__footer">
                    <ButtonBorder
                        parentCls={["flight"].filter(Boolean)} 
                        isDisabled={currentUser.name.firstName === ""} 
                        isLink={false} isActive={!isInFavourites}
                        buttonCl="favourites" onClick={favouritesInfo.onClickHandler}
                        value={{
                            viewbox: {minX: 0, minY: 0, width: 16.5, height: 15.25}, height: 15.25, width: 16.5,
                            pathes: [favouritesInfo.heartPath]
                        }} 
                    />
                    {(choosed.length === 0)
                        ? <div className="flight__link button_green">View Deals</div>
                        : <NavLink className="flight__link button_green" to={path}>View Deals</NavLink>
                    }
                </div>
            </div>
        </article>
    )
}