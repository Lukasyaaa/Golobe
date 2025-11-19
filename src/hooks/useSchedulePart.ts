import type { Flight, ScheduleMassive, SchedulePart, ScheduleParts, ScheduleSingle, Srcs } from "../types";

export const useSchedulePart = (options: string, flight: Flight) => {
    let flightPart: SchedulePart; let flightEndPoint: string; let flightRoute: string; let flightEndPlace: Srcs;
    if(options === "OnWay"){
        const {endPoint, placeFrom, placeTo, ...scheduleRest} = flight.schedule as ScheduleSingle;
        flightPart = {...scheduleRest, place: placeFrom};
        flightEndPoint = endPoint;
        flightRoute = "Flight"
        flightEndPlace = placeTo;
    } else if(options === "Depart" || options === "Return"){
        if(options === "Depart"){
            flightPart = (flight.schedule as ScheduleParts).from;
            flightEndPoint = (flight.schedule as ScheduleParts).to.startPoint;
            flightEndPlace = (flight.schedule as ScheduleParts).to.place;
        } else {
            flightPart = (flight.schedule as ScheduleParts).to;
            flightEndPoint = (flight.schedule as ScheduleParts).from.startPoint;
            flightEndPlace = (flight.schedule as ScheduleParts).from.place;
        }
        flightRoute = options;
    } else {
        flightEndPoint = String(options).split("-")[1];
        flightPart = (flight.schedule as ScheduleMassive).parts.find(
            part => part.startPoint === String(options).split("-")[0]
        ) as SchedulePart
        flightRoute = String(options);

        const flightEndPart = (flight.schedule as ScheduleMassive).parts.find(
            part => part.startPoint === String(options).split("-")[1]
        );
        flightEndPlace = (flightEndPart === undefined) 
            ? (flight.schedule as ScheduleMassive).endPlace : flightEndPart.place;
    }
    return{flightPart, flightEndPoint, flightRoute, flightEndPlace}
}