import { type FC } from "react";
import { getDuration, intToDuration, timeToString } from "../../../types";
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
    let [choosedValue, setChoosed] = choosed;
    let [hoveredIdValue, setHoveredId] = hoveredId;
    const makeUnHoveredId = () => setHoveredId(-1);
    const makeHoveredId = () => setHoveredId(id);
    return( 
        <li 
            className={[
                "flight__schedule-link", "link-schedule-flight", (hoveredIdValue === id) ? "_hovered" : "",
                (choosedValue.includes(id)) ? "_choosed" : ""
            ].filter(Boolean).join(" ")}
        >
            <div className="link-schedule-flight__input-parent">
                <input 
                    className="link-schedule-flight__input" type="checkbox" name={"schedule_" + groupId} 
                    id={"schedule_" + Number(prevCheckboxes - checkboxesCount + id)} 
                    onChange={(e) => {
                        setChoosed(!e.currentTarget.checked ? (prev) => [...prev].filter(cId => cId !== id) : (prev) => [...prev, id])
                        e.currentTarget.blur();
                        setHoveredId(-1);
                    }} checked={choosedValue.includes(id)}
                    onMouseEnter={makeHoveredId} onMouseLeave={(e) => {
                        if(e.currentTarget !== document.activeElement){
                            setHoveredId(-1);
                        }
                    }} onFocus={makeHoveredId} onBlur={makeUnHoveredId}
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
                        {intToDuration(getDuration(about.departTime, about.arrayTime))}
                    </div>
                    <div className="link-schedule-flight__route">
                        {about.startPoint + "-" + about.route.map(place => place + "-") + ((endPoint !== null) ? endPoint : "")}
                    </div>
                </div>
            </div>
        </li>
    )
}