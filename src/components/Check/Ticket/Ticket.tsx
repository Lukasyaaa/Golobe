import React, { FC } from "react";
import { airlines, contentPart, flight, flightDirection, flightSchedulePart, hotel } from "../../../types";
import { TicketSchedule } from "./TicketSchedule";
import { getDayWeek, getStringMonth, halfTimeToWholeString, intToTime, timeToInt, timeToString } from "../../../helperFunctions";
import { TicketShortInfo } from "./TicketShortInfo";
import { seatNumber } from "../../../pages/Check";
import { TicketRight } from "./TicketRight";

export enum ticketFactTitles{
    Date = "Date",
    FlightTime = "Flight Time",
    Gate = "Gate",
    Seat = "Seat",
    CheckIn = "Check-In Time",
    CheckOut = "Check-Out Time",
    RoomNumber = "Room no."
}

interface ticketFlightProps{
    contentType : contentPart.Flights,
    about : flightSchedulePart,
    choosedSeatsTypes : string,
    seatNumber : seatNumber[]
}
interface ticketHotelProps{
    contentType : contentPart.Hotels,
    roomId : number,
    about : hotel,
    checkInDate : Date,
    checkOutDate : Date
}

export const Ticket : FC<ticketFlightProps | ticketHotelProps> = (props) => {
    if(props.contentType === contentPart.Flights){
        let seatsString : string[] = [];
        props.seatNumber.map(seatNumber => {
            seatsString.push(seatNumber.type[0] + ":" + seatNumber.value);
        })
        return (
            <section className="check__ticket check_flight__ticket ticket ticket_flight">
                <div className="container">
                    <TicketSchedule contentType={contentPart.Flights} about={{
                        from: {
                            timeViewed: timeToString(props.about.takeoffTime.units, true),
                            timeHidden: props.about.takeoffTime.year + "-" + props.about.takeoffTime.month + "-" + 
                            props.about.takeoffTime.day + "T" + halfTimeToWholeString(props.about.takeoffTime.units),
                            description: props.about.from
                        },
                        to: {
                            timeViewed: timeToString(props.about.arrayTime.units, true),
                            timeHidden: props.about.arrayTime.year + "-" + props.about.arrayTime.month + "-" + 
                            props.about.arrayTime.day + "T" + halfTimeToWholeString(props.about.arrayTime.units),
                            description: props.about.to
                        }
                    }} />
                    <TicketShortInfo 
                        contentType={contentPart.Flights} airline={props.about.airline.alt} 
                        title={props.choosedSeatsTypes.split("+").join(", ")} facts={[
                            {title: ticketFactTitles.Date, info: props.about.from},
                            {
                                title: ticketFactTitles.FlightTime, 
                                info: halfTimeToWholeString(intToTime(
                                    timeToInt(props.about.arrayTime.units, 1440) - timeToInt(props.about.takeoffTime.units, 0)
                                ))
                            },
                            {title: ticketFactTitles.Gate, info: props.about.gate},
                            {title: ticketFactTitles.Seat, info: seatsString.join(" ")}
                        ]}
                    />
                    <TicketRight 
                        contentType={contentPart.Flights} about={{
                            from: {
                                country: "Turkey",
                                city: props.about.departurePlace.city,
                                image: props.about.departurePlace.image
                            },
                            to: {
                                country: "Turkey",
                                city: props.about.arrayPlace.city,
                                image: props.about.arrayPlace.image
                            }
                        }} 
                    />
                </div>
            </section>
        )
    }
    let beds : string[] = [];
    if(props.about.rooms[props.roomId].countBeds.double !== 0){
        beds.push(props.about.rooms[props.roomId].countBeds.double + " double bed");
    }
    if(props.about.rooms[props.roomId].countBeds.twin !== 0){
        beds.push(props.about.rooms[props.roomId].countBeds.twin + " twin beds");
    }
    return (
        <section className="check__ticket check_hotel__ticket ticket ticket_hotel">
            <div className="container">
                <TicketSchedule contentType={contentPart.Hotels} about={{
                    from: {
                        timeViewed: getDayWeek(props.checkInDate.getDay()) + ", " + 
                        getStringMonth(props.checkInDate.getMonth()) + " " + props.checkInDate.getDate(),
                        timeHidden: props.checkInDate.getFullYear() + "-" + (props.checkInDate.getMonth() + 1) + "-" + 
                        props.checkInDate.getDate(),
                        description: "Check-In"
                    },
                    to: {
                        timeViewed: getDayWeek(props.checkOutDate.getDay()) + ", " + 
                        getStringMonth(props.checkOutDate.getMonth()) + " " + props.checkOutDate.getDate(),
                        timeHidden: props.checkOutDate.getFullYear() + "-" + (props.checkOutDate.getMonth() + 1) + "-" + 
                        props.checkOutDate.getDate(),
                        description: "Check-Out"
                    }
                }} />
                    <TicketShortInfo 
                        contentType={contentPart.Hotels} airline={airlines.Emirated} 
                        title={
                            props.about.rooms[props.roomId].advantages.join(" - ") + " - " + beds.join(" or ")
                        } 
                        facts={[
                            {title: ticketFactTitles.CheckIn, info: "12:00 pm"},
                            {title: ticketFactTitles.CheckOut, info: "11:30 pm"},
                            {title: ticketFactTitles.RoomNumber, info: "On arrival"}
                        ]}
                    />
                    <TicketRight contentType={contentPart.Hotels} about={props.about.logo} />
            </div>
        </section>
    )
}