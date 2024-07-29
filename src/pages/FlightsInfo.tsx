import React, {FC, useEffect} from "react";
import { IntroFlights } from "../components/FlightsInfo/IntroFlights";
import { Map } from "../components/FlightsInfo/Map";
import { Travels } from "../components/FlightsInfo/Travels";
import { Offer } from "../components/FlightsInfo/Offer";
import { useDispatch } from "react-redux";
import { footerHideActiveAction } from "../store/common/footerReducer";
import { optionsHideActiveAction } from "../store/common/optionsReducer";

interface FlightsProps{
    isSupportWebp : boolean
}

export const FlightsInfo : FC<FlightsProps> = ({isSupportWebp}) =>{
    const dispatch = useDispatch();
    const clickDocument = () : void =>{
        dispatch(footerHideActiveAction());
        dispatch(optionsHideActiveAction());
    }

    useEffect(() =>{
        document.body.addEventListener("click", clickDocument);
        return () => {
            document.body.removeEventListener("click", clickDocument);
        };
    }, [])
    
    return(
        <main className="main">
            <IntroFlights isSupportWebp={isSupportWebp} />
            <Map isSupportWebp={isSupportWebp} />
            <Travels />
            <Offer /> 
        </main>
    )
}