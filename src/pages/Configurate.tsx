import React, { FC, useEffect } from "react";
import { Options } from "../components/Common/Options/Options";
import { optionsBlockType, optionsItemsType } from "../types";
import { Navbar } from "../components/FlightsConfigurate/Navbar/Navbar";
import { FlightsSort } from "../components/FlightsConfigurate/Sort/FlightsSort";
import { FlightsItems } from "../components/FlightsConfigurate/Items/FlightsItems";
import { useDispatch } from "react-redux";
import { footerHideActiveAction } from "../store/common/footerReducer";
import { optionsHideActiveAction } from "../store/common/optionsReducer";
import { navbarHideActiveAction } from "../store/flights/navbarReducer";
import { flightsItemsHideActiveAction } from "../store/flights/flightsItemsReducer";
import { flightsOptionsHideActive } from "../store/flights/flightsOptionsReducer";

interface ConfigurateProps{
}

export const Configurate : FC<ConfigurateProps> = () =>{
    const dispatch = useDispatch();
    const clickDocument = () : void =>{
        dispatch(footerHideActiveAction());
        dispatch(optionsHideActiveAction());
        dispatch(navbarHideActiveAction());
        dispatch(flightsItemsHideActiveAction());
        dispatch(flightsOptionsHideActive());
    }

    useEffect(() =>{
        document.body.addEventListener("click", clickDocument);
        return () => {
            document.body.removeEventListener("click", clickDocument);
        };
    }, [])

    return(
        <main className="main flights">
            <Options neededBlocks={optionsBlockType.ONLY_ITEMS} startValue={optionsItemsType.Flights} />
            <div className="row container">
                <Navbar />
                <div className="row__main">
                    <FlightsSort />
                    <FlightsItems />
                </div>
            </div>
        </main>
    )
}