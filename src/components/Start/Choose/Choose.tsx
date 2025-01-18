import React, { FC } from "react";
import { useTypedSelector } from "../../../helperFunctions.ts";
import { ChooseVariant } from "./ChooseVariant.tsx";

interface ChooseProps{
    isWebp : boolean
}

export const Choose : FC<ChooseProps> = ({isWebp}) => {
    const about = useTypedSelector(state => state.start.choose);

    return(
        <section className="choose">
            <div className="container">
                <ChooseVariant about={about.flights} isWebp={isWebp} />
                <ChooseVariant about={about.hotels} isWebp={isWebp} />
            </div>
        </section>
    )
}