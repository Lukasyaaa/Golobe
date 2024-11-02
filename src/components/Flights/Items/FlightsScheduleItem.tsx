import React, { FC } from "react";
import { flightSchedulePart } from "../../../types";
import { timeToInt, timeToString } from "../../../helperFunctions";

interface flightsScheduleItemProps{
    about : flightSchedulePart,
    isDeparture : boolean
}

export const FlightsScheduleItem : FC<flightsScheduleItemProps> = ({about, isDeparture}) => {
    let neededDesc : string = (isDeparture) ? "departure" : "return";
    let flyTime : number = timeToInt(about.arrayTime, 1440) - timeToInt(about.takeoffTime, 0);

    return(
        <div 
            className={[
                "item-flights__schedule-part", "part-schedule-item-flights",
                `item-flights__schedule-part_${neededDesc}`, `part_${neededDesc}-schedule-item-flights`
            ].join(" ")}
        >
            <input 
                type="checkbox" 
                className={[
                    "part-schedule-item-flights__input", 
                    `part_${neededDesc}-schedule-item-flights__input`
                ].join(" ")} 
            />
            <div                 
                className={[
                    "part-schedule-item-flights__inner", 
                    `part_${neededDesc}-schedule-item-flights__inner`
                ].join(" ")}
            >
                <div 
                    className={[
                        "part-schedule-item-flights__column", "part-schedule-item-flights__left",
                        `part_${neededDesc}-schedule-item-flights__column`, `part_${neededDesc}-schedule-item-flights__left`
                    ].join(" ")}
                >
                    <div 
                        className={[
                            "part-schedule-item-flights__fly-line", 
                            `part_${neededDesc}-schedule-item-flights__fly-line`
                        ].join(" ")}
                    >
                        <time 
                            dateTime=""
                            className={[
                                "part-schedule-item-flights__fly-part", 
                                `part_${neededDesc}-schedule-item-flights__fly-part`,
                                "part-schedule-item-flights__fly-part_takeoff", 
                                `part_${neededDesc}-schedule-item-flights__fly-part_takeoff`
                            ].join(" ")}
                        >
                            {timeToString(about.takeoffTime)}
                        </time>
                        <time 
                            dateTime=""
                            className={[
                                "part-schedule-item-flights__fly-part", 
                                `part_${neededDesc}-schedule-item-flights__fly-part`,
                                "part-schedule-item-flights__fly-part_array", 
                                `part_${neededDesc}-schedule-item-flights__fly-part_array`
                            ].join(" ")}
                        >
                            {timeToString(about.arrayTime)}
                        </time>
                    </div>
                    <div 
                        className={[
                            "part-schedule-item-flights__service", 
                            `part_${neededDesc}-schedule-item-flights__service`
                        ].join(" ")}
                    >
                        {about.airline}
                    </div>
                </div>
                <div 
                    className={[
                        "part-schedule-item-flights__transfers", 
                        `part_${neededDesc}-schedule-item-flights__transfers`
                    ].join(" ")}
                >
                    {(about.transfersCount === 0) ? "non-stop" : about.transfersCount + " Transfers"}
                </div>
                <div 
                    className={[
                        "part-schedule-item-flights__column", "part-schedule-item-flights__right",
                        `part_${neededDesc}-schedule-item-flights__column`, `part_${neededDesc}-schedule-item-flights__right`
                    ].join(" ")}
                >
                    <output
                        className={[
                            "part-schedule-item-flights__fly-time", 
                            `part_${neededDesc}-schedule-item-flights__fly-time`
                        ].join(" ")}
                    >
                        {Math.floor(flyTime / 60) + "h " + flyTime % 60 + "m"}
                    </output>
                    <div 
                        className={[
                            "part-schedule-item-flights__from-to", 
                            `part_${neededDesc}-schedule-item-flights__from-to`
                        ].join(" ")}
                    >
                        {about.from + "-" + about.to}
                    </div>
                </div>
            </div>
        </div>
    )
}