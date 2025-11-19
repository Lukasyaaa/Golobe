import React, { type FC } from "react";
import { intToDuration, timeToInt, timeToString } from "../../../types";
import type { SchedulePart, useStateReturned } from "../../../types";

interface FlightScheduleLinkProps{
    prevCheckboxes: number
    groupId: number,
    checkboxesCount: number,
    about: SchedulePart,
    endPoint: string | null,
    hoveredId: useStateReturned<number>,
    choosed: useStateReturned<number[]>,
    id: number
}

export const FlightSchedulePart : FC<FlightScheduleLinkProps> = ({
    prevCheckboxes, groupId, checkboxesCount, about, endPoint, hoveredId, choosed, id
}) => {
    return(
        <li 
            className={[
                "flight__schedule-link", "link-schedule-flight", (hoveredId[0] === id) ? "_hovered" : "",
                (choosed[0].includes(id)) ? "_choosed" : ""
            ].filter(Boolean).join(" ")}
        >
            <div className="link-schedule-flight__input-parent">
                <input 
                    className="link-schedule-flight__input" type="checkbox" 
                    name={"schedule_" + groupId} 
                    id={"schedule_" + Number(prevCheckboxes - checkboxesCount + id)} 
                    onChange={(e) => {
                        if(!e.currentTarget.checked){
                            choosed[1](prev => [...prev.filter(checkboxId => checkboxId !== id)]);
                        } else {
                            choosed[1](prev => [...prev, id]);
                        }
                        e.currentTarget.blur();
                        hoveredId[1](-1);
                    }} checked={choosed[0].includes(id)}
                    onMouseEnter={() => hoveredId[1](id)} onMouseLeave={(e) => {
                        if(e.currentTarget !== document.activeElement){
                            hoveredId[1](-1);
                        }
                    }} onFocus={() => hoveredId[1](id)} onBlur={() => hoveredId[1](-1)}
                />
            </div>
            <div className="link-schedule-flight__info">
                <div className="link-schedule-flight__left">
                    <div className="link-schedule-flight__time">
                        {timeToString(about.departTime.units) + " - " + timeToString(about.arrayTime.units)}
                    </div>
                    <div className="link-schedule-flight__airline">{about.airline}</div>
                </div>
                <div className="link-schedule-flight__count-transfers">
                    {(about.route.length !== 0) ? about.route.length + " count transfers" : "non-stop"}
                </div>
                <div className="link-schedule-flight__right">
                    <div className="link-schedule-flight__fly-duration">
                        {intToDuration((timeToInt(about.arrayTime.units, false) - timeToInt(about.departTime.units, false)))}
                    </div>
                    <div className="link-schedule-flight__route">
                        {about.startPoint + "-" + about.route.map(place => place + "-") + ((endPoint !== null) ? endPoint : "")}
                    </div>
                </div>
            </div>
        </li>
    )
}