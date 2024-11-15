import React, { FC, useEffect, useRef, useState } from "react";
import { amenitiePosition } from "./HotelAmenities";
import { hotelsIncludes, setter } from "../../../../types";


interface hotelAmenitieNotNeedOpenerVisibleProps{
    isHidden : true,
    isTheirTime : boolean,
    position : amenitiePosition,
    links : hotelsIncludes[],
    isNeedOpener : false
}

interface hotelAmenitieNotNeedOpenerHiddenProps{
    isHidden : false,
    position : amenitiePosition,
    links : hotelsIncludes[],
    isNeedOpener : false
}

interface hotelAmenitieNeedOpenerProps{
    isHidden : false,
    position : amenitiePosition,
    links : hotelsIncludes[],
    isNeedOpener : true,
    isShowAll : setter<boolean>,
    buttonText : string
}

export const HotelAmenitie : FC<
    hotelAmenitieNotNeedOpenerVisibleProps | hotelAmenitieNotNeedOpenerHiddenProps | hotelAmenitieNeedOpenerProps
> = (props) => {
    if(props.isHidden){
        return(
            <div className={"amenities__column amenities__column_hidden " + props.position}>
                <ul className="amenities__column-inner amenities__column_hidden-inner">
                    {props.links.map((amenitie, i) => 
                        <li className="amenities__item amenities__item_hidden" key={i}>{amenitie}</li>
                    )}
                </ul>
            </div>
        )
    }
    return(
        <div className={"amenities__column " + props.position}>
            <ul className="amenities__column-inner">
                {props.links.map((amenitie, i) => 
                    <li className="amenities__item" key={i}>{amenitie}</li>
                )}
                {props.isNeedOpener &&
                <li className="amenities__opener">
                    <button type="button" onClick={() => props.isShowAll.set(!props.isShowAll.value)}>
                        {props.buttonText}
                    </button>
                </li>}
            </ul>
        </div>
    )
}