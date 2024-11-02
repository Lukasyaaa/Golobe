import { MouseEvent, FocusEvent, RefObject } from "react";
import { meridiem, setter, time } from "./types";

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

export const intToTime = (int : number) : time => {
    return {
        hour: (Math.floor(int / 60) % 12) || 12, 
        minute: int % 60, 
        meridiem: (int < 720 || int === 1440) ? meridiem.AM : meridiem.PM
    };
}

export const timeToInt = (t : time, replaceValue : 0 | 1440) : number => {
    if(t.hour === 12 && t.minute === 0 && t.meridiem === meridiem.AM) 
        return replaceValue;
    let hourValue : number = Number(t.hour !== 12 || t.meridiem !== meridiem.AM) * t.hour * 60;
    let plus12 : number = Number(t.hour !== 12 && t.meridiem === meridiem.PM) * 720;
    return hourValue + plus12 + t.minute;
}

export const timeToString = (t : time) : string => {
    let hourPart = (t.hour < 10) ? "0" + t.hour : t.hour;
    let minPart = (t.minute < 10) ? "0" + t.minute : t.minute;
    return hourPart + ":" + minPart + t.meridiem;
}