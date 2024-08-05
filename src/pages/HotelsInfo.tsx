import React, { FC, useEffect } from "react";
import { useTypedSelector } from "../hooks/redux";
import { Travels } from "../components/Common/Travels/Travels";
import { Offer } from "../components/Common/Offer";
import { IntroVariant } from "../components/Common/IntroVariant";
import { contentPart } from "../types";
import { Recent } from "../components/Hotels/Info/Recent";
import { useDispatch } from "react-redux";
import { optionsHideActiveAction } from "../store/common/optionsReducer";

interface HotelsProps{
    isSupportWebp : boolean
}

export const HotelsInfo : FC<HotelsProps> = ({isSupportWebp}) =>{
    const introStore = useTypedSelector(state => state.hotels.text.intro);
    const travelsStore = useTypedSelector(state => state.hotels.text.travels);
    const offerStore = useTypedSelector(state => state.hotels.text.offer);

    const dispatch = useDispatch();
    const clickDocument = () : void =>{
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
            <IntroVariant isSupportWebp={isSupportWebp} introStore={introStore} optionsType={contentPart.Hotels} />
            <Recent />
            <Travels travelsStore={travelsStore} />
            <Offer offerStore={offerStore} /> 
        </main>
    )
}