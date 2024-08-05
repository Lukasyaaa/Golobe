import { meridiem } from "../../../types";

export const getTime = (hour : number, minute : number, ourMeridiem : meridiem, neededValue : 0 | 24) : number =>{
    const isHourZero : boolean = (hour === 12 && ourMeridiem === meridiem.AM);
    const plus12 : number = 12 * 60 * Number(ourMeridiem === meridiem.PM && hour !== 12);

    return ((isHourZero) ? neededValue : hour) * 60 + minute + plus12;
}

export const getTimeString = (hour : number, minutes : number, meridiem : string) : string =>{
    const timeHourString : string = (hour < 10) ? `0${hour}` : `${hour}`;
    const timeMinuteString : string = (minutes < 10) ? `0${minutes}` : `${minutes}`;
    
    return timeHourString + ":" + timeMinuteString + " " + meridiem.toLowerCase();
}