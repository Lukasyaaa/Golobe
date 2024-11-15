import React, { FC, useState } from "react";
import { Sort } from "../../Configurate/Sort/Sort";
import { SelectReplace } from "../../Common/Select/SelectReplace";
import { AccountTicket } from "./AccountTicket";
import { getDayWeek, getStringMonth, halfTimeToWholeString, intToTime, timeToInt, timeToString } from "../../../helperFunctions";
import { ticketFactTitles } from "../../Check/Ticket/Ticket";
import { flightTicket, hotelTicket } from "../../../types";

interface accountPassesProps{
    heading : string,
    viewBy : string[],
    sortLinks : string[],
    flightsTickets : flightTicket[],
    hotelsTickets : hotelTicket[],
    downloadButton : string
}

export const AccountPasses : FC<accountPassesProps> = ({heading, viewBy, sortLinks, flightsTickets, hotelsTickets, downloadButton}) => {
    let [activeTicketTypes, setActiveTicketTypes] = useState<number>(0);
    let [isActive, setIsActive] = useState<boolean>(false);
    let [activeLink, setActiveLink] = useState<number>(0);

    const swap = (newId : number) => {

    }

    console.log(new Date(2024, 11 - 1, 15));

    return(
        <section className="account__history history-account">
            <div className="container">
                <div className="history-account__header">
                    <h2 className="history-account__heading account__heading">{heading}</h2>
                    <SelectReplace 
                        parentClasses={["history-account"]} links={viewBy} 
                        activeLink={{value: activeLink, set: setActiveLink}} isActive={{value: isActive, set: setIsActive}}
                        title={null}
                    />
                </div>
                <Sort 
                    isLink={false}
                    parentClasses={["sort-account"]} displayedFilters={null} showMoreText="Another Pages"
                    about={sortLinks} maxShow={3} activeNumber={{value: activeTicketTypes, set: setActiveTicketTypes}} swap={swap}
                />
                <div className="history-account__tickets">
                    {(activeTicketTypes === 0) 
                        ? flightsTickets.map((flightTicket, i) => 
                            <AccountTicket key={i} about={{
                                image: flightTicket.airline,
                                from:{
                                    description: flightTicket.from.place,
                                    hiddenTime: flightTicket.from.time.day + "-" + (flightTicket.from.time.month+1) + "-" +
                                    flightTicket.from.time.year + "T" + halfTimeToWholeString(flightTicket.from.time.units),
                                    visibleTime: timeToString(flightTicket.from.time.units)
                                },
                                to:{
                                    description: flightTicket.to.place,
                                    hiddenTime: flightTicket.to.time.day + "-" + (flightTicket.to.time.month+1) + "-" +
                                    flightTicket.to.time.year + "T" + halfTimeToWholeString(flightTicket.to.time.units),
                                    visibleTime: timeToString(flightTicket.to.time.units)
                                },
                                features: [
                                    {
                                        description: ticketFactTitles.Date, 
                                        value: flightTicket.from.time.day + "-" + (flightTicket.from.time.month+1) + "-" +
                                        (flightTicket.from.time.year % 100)
                                    },
                                    {
                                        description: ticketFactTitles.FlightTime,
                                        value: timeToString(intToTime(timeToInt(flightTicket.to.time.units, 1440) - timeToInt(flightTicket.from.time.units, 0)))
                                    },
                                    {description: ticketFactTitles.Date, value: flightTicket.gate},
                                    {description: ticketFactTitles.Seat, value: String(flightTicket.seatNumber)}
                                ]
                            }} downloadButton={downloadButton} />
                        ) 
                        : hotelsTickets.map((hotelTicket, i) => 
                            <AccountTicket key={i} about={{
                                image: hotelTicket.logo,
                                from:{
                                    description: "Check In",
                                    hiddenTime: hotelTicket.from.day + "-" + (hotelTicket.from.month+1) + "-" +
                                    hotelTicket.from.year,
                                    visibleTime: getDayWeek(new Date(hotelTicket.from.year, hotelTicket.from.month - 1, hotelTicket.from.day).getDay()) +
                                    ", " + getStringMonth(hotelTicket.from.month - 1) + " " + hotelTicket.from.day
                                },
                                to:{
                                    description: "Check Out",
                                    hiddenTime: hotelTicket.to.day + "-" + (hotelTicket.to.month+1) + "-" +
                                    hotelTicket.to.year,
                                    visibleTime: getDayWeek(new Date(hotelTicket.to.year, hotelTicket.to.month - 1, hotelTicket.to.day).getDay()) +
                                    ", " + getStringMonth(hotelTicket.to.month - 1) + " " + hotelTicket.to.day
                                },
                                features: [
                                    {description: ticketFactTitles.CheckIn, value: "12:00pm"},
                                    {description: ticketFactTitles.CheckOut, value: "11:30pm"},
                                    {description: ticketFactTitles.RoomNumber, value: String(hotelTicket.roomNumber)},
                                ]
                            }} downloadButton={downloadButton} />
                        ) 
                    }
                </div>
            </div>
        </section>
    )
}