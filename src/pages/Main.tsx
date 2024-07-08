import React, {MutableRefObject, FC, Fragment} from "react";
import {IntroMain} from "../components/Main/IntroMain";
import { TripVariants } from "../components/Main/TripVariants";
import { Choice } from "../components/Main/Choice";
import Reviews from "../components/Main/Reviews";

interface MainProps{
    isSupportWebp : boolean
}

export const Main : FC<MainProps> = ({isSupportWebp}) =>{
    return(
        <Fragment>
            <IntroMain isSupportWebp={isSupportWebp}  />
            <TripVariants />
            <Choice isSupportWebp={isSupportWebp}  />
            <Reviews />
        </Fragment>
    );
}