import React, { type FC } from "react";
import { useTypedSelector } from "../../../store";
import { ChooseOption } from "./Option.tsx";

export const Choose : FC = () => {
    const about = useTypedSelector(state => state.home.choose);
    const {flightsPart, hotelsPart} = about

    return(
        <section className="choose">
            <div className="container">
                {[flightsPart, hotelsPart].map((item, i) => 
                    <ChooseOption key={i} about={item} linkPath="#" />
                )}
            </div>
        </section>
    )
}