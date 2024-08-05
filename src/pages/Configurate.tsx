import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/redux";
import { Options } from "../components/Common/Options/Options";
import { Navbar } from "../components/Common/Configurate/Navbar/Navbar";
import { Sort } from "../components/Common/Configurate/Sort/Sort";
import { FlightsItems } from "../components/Flights/Items/FlightsItems";
import { HotelsItems } from "../components/Hotels/Items/HotelsItems";
import { optionsBlockType, contentPart} from "../types";
import { footerHideActiveAction } from "../store/common/footerReducer";
import { optionsHideActiveAction } from "../store/common/optionsReducer";
import { navbarHideActiveAction } from "../store/common/navbarReducer";
import { flightsItemsHideActiveAction } from "../store/flights/flightsItemsReducer";
import { sortHideActive } from "../store/common/sortReducer";
import { hotelsItemsHideItemActiveAction } from "../store/hotels/hotelsItemsReducer";

interface ConfigurateProps{
    contentType : contentPart
}

export const Configurate : FC<ConfigurateProps> = ({contentType}) =>{
    let state = useTypedSelector(state => state);

    const dispatch = useDispatch();
    const clickDocument = () : void =>{
        dispatch(footerHideActiveAction());
        dispatch(optionsHideActiveAction());
        dispatch(navbarHideActiveAction(contentType));
        if(contentType === contentPart.Flights){
            dispatch(flightsItemsHideActiveAction());
        }else{
            dispatch(hotelsItemsHideItemActiveAction());
        }
        dispatch(sortHideActive(contentType));
    }

    useEffect(() =>{
        document.body.addEventListener("click", clickDocument);
        return () => {
            document.body.removeEventListener("click", clickDocument);
        };
    }, [])

    return(
        <main className="main flights">
            <Options neededBlocks={optionsBlockType.ONLY_ITEMS} startValue={contentType} />
            <div className="row container">
                <Navbar 
                    navbarStore={(contentType === contentPart.Flights) ? state.navbar.flights : state.navbar.hotels} 
                    contentType={contentType}
                />
                <div className="row__main">
                    {((contentType === contentPart.Flights) ?                     
                    <Sort sortStore={state.sort.flights} sortType={contentPart.Flights} /> :
                    <Sort sortStore={state.sort.hotels} sortType={contentPart.Hotels} />)}
                    {(contentType === contentPart.Flights) ? <FlightsItems /> : <HotelsItems />}
                </div>
            </div>
        </main>
    )
}