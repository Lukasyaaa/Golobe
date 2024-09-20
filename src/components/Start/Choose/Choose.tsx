import React, { FC, Fragment } from "react";
import { useTypedSelector } from "../../../useTypedSelector";
import { ChooseVariant } from "./ChooseVariant";

export const Choose : FC = () => {
    let state = useTypedSelector(store => store.start.choose);

    if(state.flights.link !== "" && state.flights.subtitle !== "" && state.flights.title !== ""){
        if(state.hotels.link !== "" && state.hotels.subtitle !== "" && state.hotels.title !== ""){
            return(
                <section className="start__choose choose">
                    <div className="container">
                        <ChooseVariant about={state.flights} isFlight={true} />
                        <ChooseVariant about={state.hotels} isFlight={false} />
                    </div>
                </section>
            )
        }
        return(
            <section className="start__choose choose">
                <div className="container">
                    <ChooseVariant about={state.flights} isFlight={true} />
                </div>
            </section>
        )
    }
    if(state.hotels.link !== "" && state.hotels.subtitle !== "" && state.hotels.title !== ""){
        return(
            <section className="start__choose choose">
                <div className="container">
                    <ChooseVariant about={state.flights} isFlight={false} />
                </div>
            </section>
        )
    }
    return <Fragment />
}