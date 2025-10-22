import React, { type FC } from "react";
import { useTypedSelector } from "../../../store";
import { ChooseOption } from "./Option.tsx";

export const Choose : FC = () => {
    const about = useTypedSelector(state => state.home.choose);

    return(
        <section className="choose">
            <div className="container">
                {[about.flightsPart, about.hotelsPart].map((item, i) => 
                    <ChooseOption key={i} about={item} linkPath="#" />
                )}
            </div>
        </section>
    )
}