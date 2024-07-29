import React, {FC, useEffect} from "react";
import { IntroStart } from "../components/Main/IntroStart";
import { TripVariants } from "../components/Main/TripVariants";
import { Choice } from "../components/Main/Choice";
import { Reviews } from "../components/Main/Reviews";
import { useDispatch } from "react-redux";
import { reviewsHideActiveAction } from "../store/start/reviewsReducer";
import { optionsHideActiveAction } from "../store/common/optionsReducer";
import { footerHideActiveAction } from "../store/common/footerReducer";

interface StartProps{
    isSupportWebp : boolean,
}

export const Start : FC<StartProps> = ({isSupportWebp}) =>{
    const dispatch = useDispatch();
    const clickDocument = () : void =>{
        dispatch(reviewsHideActiveAction());
        dispatch(optionsHideActiveAction());
        dispatch(footerHideActiveAction());
    }

    useEffect(() =>{
        document.body.addEventListener("click", clickDocument);
        return () => {
            document.body.removeEventListener("click", clickDocument);
        };
    }, [])

    return(
        <main className="main">
            <IntroStart isSupportWebp={isSupportWebp}  />
            <TripVariants />
            <Choice isSupportWebp={isSupportWebp}  />
            <Reviews />
        </main>
    );
}