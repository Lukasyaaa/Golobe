import { MouseEvent, FocusEvent, RefObject } from "react";
import { flightAmenities, meridiem, setter, units } from "./types";

export const toggleState = (state : setter<boolean>) : void => {
    state.set(!state.value);
};
export const makeActiveState = (state : setter<boolean>) : void => {
    if(!state.value){
        state.set(true);
    }
};
export const makeUnActiveState = (state : setter<boolean>) : void => {
    if(state.value){
        state.set(false);
    }
};

export const makePseudoActive = (e : FocusEvent<HTMLElement> | MouseEvent<HTMLElement>, parent : RefObject<HTMLElement>) : void => {
    if(parent.current){
        parent.current.classList.add("_hide-active");
        e.currentTarget.classList.add("_hovered");
    }
}

export const makeUnPseudoActive = (e : FocusEvent<HTMLElement> | MouseEvent<HTMLElement>, parent : RefObject<HTMLElement>) : void => {
    if(parent.current){
        parent.current.classList.remove("_hide-active");
        e.currentTarget.classList.remove("_hovered");
    }
}

export const fetchCountryByCity = async (cityName : string) => {
    const apiKey = 'AIzaSyBQUOeUnem8wgSrekfwyrWI6Nfo_D3uF8g';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=${apiKey}&language=en`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data.status === 'OK') {
            const results = data.results[0];
            const components = results.address_components;
  
            // Находим компонент с типом "country"
            const countryComponent = components.find((component : any) =>
                component.types.includes("country")
            );
  
            if (countryComponent) {
                return countryComponent.long_name;
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};

export const intToTime = (int : number) : units => {
    return {
        hour: (Math.floor(int / 60) % 12) || 12, 
        minute: int % 60, 
        meridiem: (int < 720 || int === 1440) ? meridiem.AM : meridiem.PM
    };
}

export const timeToInt = (t : units, replaceValue : 0 | 1440) : number => {
    if(t.hour === 12 && t.minute === 0 && t.meridiem === meridiem.AM) 
        return replaceValue;
    let hourValue : number = Number(t.hour !== 12 || t.meridiem !== meridiem.AM) * t.hour * 60;
    let plus12 : number = Number(t.hour !== 12 && t.meridiem === meridiem.PM) * 720;
    return hourValue + plus12 + t.minute;
}

export const timeToString = (t : units) : string => {
    let hourPart = ((t.hour < 10) ? "0" : "") + t.hour;
    let minPart = ((t.minute < 10) ? "0" : "") + t.minute;
    return hourPart + ":" + minPart + t.meridiem;
}

export const durationToString = (d : number) : string => {
    return Math.floor(d / 60) + "h " + d % 60 + "m"
}

export const halfTimeToWholeString = (t : units) : string => {
    let hourPart = ((t.hour + ((t.meridiem === meridiem.AM) ? 0 : 12) < 10) ? "0" : "") + (t.hour + ((t.meridiem === meridiem.AM) ? 0 : 12));
    let minPart = ((t.minute + ((t.meridiem === meridiem.AM) ? 0 : 12) < 10) ? "0" : "") + t.minute;
    return hourPart + ":" + minPart;
}

export const getDayWeek = (dayWeek : number) : string => {
    switch(dayWeek){
        case 1:
            return "Mon";
        case 2:
            return "Tue";
        case 3:
            return "Wed";
        case 4:
            return "Thu";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
        case 7:
            return "Sun";
        default:
            return "Error";
    }
}
export const getMonth = (dayWeek : number) : string => {
    switch(dayWeek){
        case 0:
            return "Jan";
        case 1:
            return "Feb";
        case 2:
            return "Mar";
        case 3:
            return "Apr";
        case 4:
            return "May";
        case 5:
            return "Jun";
        case 6:
            return "Jul";
        case 7:
            return "Aug";
        case 8:
            return "Sep";
        case 9:
            return "Oct";
        case 10:
            return "Nov";
        case 11:
            return "Dec";
        default:
            return "Error";
    }
}

export const getFlightAmenitie = (amenitie : string) : string => {
    switch(amenitie){
        case flightAmenities.Fast:
            return "icon-plane";
        case flightAmenities.FastFood:
            return "icon-junk-food";
        case flightAmenities.ManySeats:
            return "icon-seat";
        case flightAmenities.Punctual:
            return "icon-clock";
        default:
            return "error"
    }
}