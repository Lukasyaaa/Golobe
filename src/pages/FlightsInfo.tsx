import React, {FC, useEffect} from "react";
import { IntroVariant } from "../components/Common/IntroVariant";
import { Map } from "../components/FlightsInfo/Map";
import { Travels } from "../components/Common/Travels/Travels";
import { Offer } from "../components/Common/Offer";
import { useDispatch } from "react-redux";
import { footerHideActiveAction } from "../store/common/footerReducer";
import { optionsHideActiveAction } from "../store/common/optionsReducer";
import { useTypedSelector } from "../hooks/redux";
import { optionsItemsType } from "../types";

interface FlightsProps{
    isSupportWebp : boolean
}

export const FlightsInfo : FC<FlightsProps> = ({isSupportWebp}) =>{
    const introStore = useTypedSelector(state => state.flights.text.intro);
    const travelsStore = useTypedSelector(state => state.flights.text.travels);
    const offerStore = useTypedSelector(state => state.flights.text.offer);

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
            <IntroVariant isSupportWebp={isSupportWebp} introStore={introStore} optionsType={optionsItemsType.Flights}/>
            <Map isSupportWebp={isSupportWebp} />
            <Travels travelsStore={travelsStore} />
            <Offer offerStore={offerStore} /> 
        </main>
    )
}