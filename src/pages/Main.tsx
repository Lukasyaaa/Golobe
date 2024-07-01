import React, {MutableRefObject, FC} from "react";
import {IntroMain} from "../components/Main/IntroMain";
import { TripVariants } from "../components/Main/TripVariants";
import { Choice } from "../components/Main/Choice";
import Reviews from "../components/Main/Reviews";

type RefObjectMap = {
    [key: string]: MutableRefObject<any> | null;
};

interface MainProps{
    
}

export const Main : FC<MainProps> = () =>{
    return(
        <main className="main">
            <IntroMain />
            <TripVariants />
            <Choice />
            <Reviews />
        </main>
    );
}