import { MouseEvent, FocusEvent, RefObject } from "react";
import { setter } from "./types";

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

export const makePseudoActive = (e : FocusEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>, parent : RefObject<HTMLElement>) : void => {
    if(parent.current){
        parent.current.classList.add("_hide-active");
        e.currentTarget.classList.add("_hovered");
    }
}

export const makeUnPseudoActive = (e : FocusEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>, parent : RefObject<HTMLElement>) : void => {
    if(parent.current){
        parent.current.classList.remove("_hide-active");
        e.currentTarget.classList.remove("_hovered");
    }
}