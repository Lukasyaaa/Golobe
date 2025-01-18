
import { FocusEvent, MouseEvent, RefObject } from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispatch, RootType } from "./state";
import { useDispatch } from "react-redux";

export const makePseudoActive = (e : FocusEvent<HTMLElement> | MouseEvent<HTMLElement>, container : RefObject<HTMLElement | null>) => {
    if(container.current){
        e.currentTarget.classList.add("_hovered");
        container.current.classList.add("_hide-active");
    }
}
export const unMakePseudoActive = (e : FocusEvent<HTMLElement> | MouseEvent<HTMLElement>, container : RefObject<HTMLElement | null>) => {
    if(container.current){
        e.currentTarget.classList.remove("_hovered");
        container.current.classList.remove("_hide-active");
    }
}

export const importImage = (imageKey) => require(`./assets/img/${imageKey}`);

export const useTypedSelector : TypedUseSelectorHook<RootType> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;