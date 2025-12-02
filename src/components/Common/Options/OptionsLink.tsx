import React, { type FC, type ReactNode } from "react";
import { getInputSetState, getInputState, INPUT_OPTIONS_VALIDATION_TYPE, MONTHS, SITE_PARTS, type InputState, type objType } from "../../../types";
import { NavLink, useParams } from "react-router-dom";
import { flightsCatalogPath, hotelsCatalogPath } from "../../../App";
import { getSelectState, SELECT_OPTIONS_DESCRIPTION, type SelectState } from "./Options";

interface OptionsLink{
    isActive: boolean,
    currentSitePart: objType<typeof SITE_PARTS>,
    inputs: InputState<typeof INPUT_OPTIONS_VALIDATION_TYPE>[],
    selects: SelectState[],
    selectsLinks: string[][],
    children: ReactNode,
    cls: string[]
}
export const OptionsLink: FC<OptionsLink> = ({
    isActive, currentSitePart, inputs, selects, selectsLinks, children, cls
}) => {
    const {filter_1} = useParams();
    
    if(isActive){
        let path;
        if(currentSitePart === SITE_PARTS.flights){
            let pathComponents: string[] = [];
            const fromTo = getInputState(INPUT_OPTIONS_VALIDATION_TYPE.fromTo, inputs);
            if(fromTo !== ""){
                pathComponents.push(fromTo.replaceAll(" - ", "+"))
            } else if(filter_1 !== undefined && filter_1.split("+").length !== 2){
                pathComponents.push(filter_1);
            }
            const passengerClass = getInputState(INPUT_OPTIONS_VALIDATION_TYPE.passengerClass, inputs);
            if(passengerClass !== ""){
                pathComponents.push(passengerClass.split(", ").join("+").replaceAll(" ", "-"));
            }
            const departReturnStr = getInputState(INPUT_OPTIONS_VALIDATION_TYPE.returnDepart, inputs);
            if(departReturnStr !== ""){
                const departReturnMas = departReturnStr.split(" - ");
                const [departDay, departMonth, departYear] = departReturnMas[0].split(" ");
                const [returnDay, returnMonth, returnYear] = departReturnMas[1].split(" ");
                const departReturn = departDay + "-" + (Number(MONTHS[departMonth]) + 1) + "-" + departYear + "+" + 
                returnDay + "-" + (Number(MONTHS[returnMonth]) + 1) + "-" + returnYear
                pathComponents.push(departReturn);
            }
            const tripType = selectsLinks[0][getSelectState(SELECT_OPTIONS_DESCRIPTION.trip, selects)].replace(" ", "-");
            path = flightsCatalogPath + "/" + pathComponents.join("/") + ((pathComponents.length !== 0) ? "/" : "") + tripType;
        } else {
            let pathComponents: string[] = [];
            const destination = getInputState(INPUT_OPTIONS_VALIDATION_TYPE.destination, inputs);
            if(destination !== ""){
                pathComponents.push(destination.split(", ").join("+"));
            }
            const checkInDate = getInputState(INPUT_OPTIONS_VALIDATION_TYPE.checkIn, inputs);
            const checkOutDate = getInputState(INPUT_OPTIONS_VALIDATION_TYPE.checkOut, inputs);
            if(checkInDate !== "" && checkOutDate !== ""){
                pathComponents.push(checkInDate.split(" ")[1].replace("/", "-") + "+" + checkOutDate.split(" ")[1].replace("/", "-"))
            }
            const roomGuestsWithoutPlus = (selectsLinks[0][getSelectState(SELECT_OPTIONS_DESCRIPTION.roomGuests, selects)]).replace(", ", " ").split(" ").map(p => p.substring(0, 1).toUpperCase() + p.substring(1));
            const [rCount, rDesc, gCount, gDesc] = roomGuestsWithoutPlus;
            const roomGuests = rCount + "-" + rDesc + "+" + gCount + "-" + gDesc;
            path = hotelsCatalogPath + "/" + pathComponents.join("/") + ((pathComponents.length !== 0) ? "/" : "") + roomGuests;
        }
        return(
            <NavLink className={cls.join(" ")} to={path}>
                {children}
            </NavLink>
        )
    }
    return(
        <div className={cls.join(" ")}>
            {children}
        </div>
    )
}