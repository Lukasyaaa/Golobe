
import {FocusEvent, MouseEvent, RefObject} from "react";

export const makePseudoActive = (e : FocusEvent<HTMLElement> | MouseEvent<HTMLElement>, container : RefObject<HTMLElement>) => {
    if(container.current){
        e.currentTarget.classList.add("_hovered");
        container.current.classList.add("_hide-active");
    }
}
export const unMakePseudoActive = (e : FocusEvent<HTMLElement> | MouseEvent<HTMLElement>, container : RefObject<HTMLElement>) => {
    if(container.current){
        e.currentTarget.classList.remove("_hovered");
        container.current.classList.remove("_hide-active");
    }
}