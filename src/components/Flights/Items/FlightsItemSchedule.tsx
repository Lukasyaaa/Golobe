import React, { FC } from "react";
import { flightsItemScheduleItem } from "../../../types";
import { getTime, getTimeString } from "../../Common/Configurate/TimeConverter";

interface FlightsItemSchedule{
    about : flightsItemScheduleItem,
    isLast : boolean;
}

export const FlightsItemSchedule : FC<FlightsItemSchedule> = ({about, isLast}) =>{
    const departureTime : number = getTime(about.departureTime.hour, about.departureTime.minute, about.departureTime.meridiem, 0);
    const arrivalTime : number = getTime(about.arrivalTime.hour, about.arrivalTime.minute, about.arrivalTime.meridiem, 24);

    const flyTimeString : string = `
        ${Math.floor(Math.abs(arrivalTime - departureTime) / 60)}h ${Math.abs(arrivalTime - departureTime) % 60}m
    `

    return(
        <div className="link-flights-items__schedule-item schedule-item-link-flights-items">
            <div className="schedule-item-link-flights-items__inner">
                <div className="schedule-item-link-flights-items__first">
                    <div className="schedule-item-link-flights-items__departure-return">
                        <span className="schedule-item-link-flights-items__departure">{
                            getTimeString(about.departureTime.hour, about.departureTime.minute, about.departureTime.meridiem)
                        }</span>
                        <div className="schedule-item-link-flights-items__departure-return-line"></div>
                        <span className="schedule-item-link-flights-items__arrival">
                        {
                            getTimeString(about.arrivalTime.hour, about.arrivalTime.minute, about.arrivalTime.meridiem)
                        }
                        </span>
                    </div>
                    <div className="schedule-item-link-flights-items__service">{about.service}</div>
                </div>
                <div className="schedule-item-link-flights-items__count-transfers">
                    {(about.numberOfTransfers === 0) ? "non stop" : `${about.numberOfTransfers} count of transfers`}
                </div>
                <div className="schedule-item-link-flights-items__summary">
                    <div className="schedule-item-link-flights-items__fly-time">{flyTimeString}</div>
                    <div className="schedule-item-link-flights-items__from-to">{`${about.from}-${about.to}`}</div>
                </div>
            </div>
        </div>
    )
}